import { API_CONFIG, AUTH_CONFIG, getDefaultHeaders } from '../config/apiConfig';

// In-memory cache for API responses
const cache = new Map();
const pendingRequests = new Map();

// Utility to create cache key
const createCacheKey = (url, options = {}) => {
  const method = options.method || 'GET';
  const body = options.body || '';
  return `${method}:${url}:${body}`;
};

// Cache management
const getCachedResponse = (cacheKey) => {
  const cached = cache.get(cacheKey);
  if (!cached) return null;
  
  const { data, timestamp } = cached;
  const now = Date.now();
  
  if (now - timestamp > API_CONFIG.cacheTimeout) {
    cache.delete(cacheKey);
    return null;
  }
  
  return data;
};

const setCachedResponse = (cacheKey, data) => {
  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });
};

// Clear cache for specific patterns
export const clearCache = (pattern) => {
  if (!pattern) {
    cache.clear();
    return;
  }
  
  for (const [key] of cache) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
};

// Retry logic with exponential backoff
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const makeRequestWithRetry = async (url, options = {}, attempt = 1) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...getDefaultHeaders(),
        ...options.headers,
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (attempt < API_CONFIG.retryAttempts && !error.name === 'AbortError') {
      const delay = API_CONFIG.retryDelay * Math.pow(2, attempt - 1);
      await sleep(delay);
      return makeRequestWithRetry(url, options, attempt + 1);
    }
    throw error;
  }
};

// Core API service
class ApiService {
  async get(url, options = {}) {
    const cacheKey = createCacheKey(url, { method: 'GET' });
    
    // Check cache first
    const cachedResponse = getCachedResponse(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Check for pending identical requests (deduplication)
    if (pendingRequests.has(cacheKey)) {
      return pendingRequests.get(cacheKey);
    }
    
    // Make new request
    const requestPromise = makeRequestWithRetry(url, {
      ...options,
      method: 'GET',
    }).then(data => {
      setCachedResponse(cacheKey, data);
      pendingRequests.delete(cacheKey);
      return data;
    }).catch(error => {
      pendingRequests.delete(cacheKey);
      throw error;
    });
    
    pendingRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  async post(url, data = {}, options = {}) {
    const response = await makeRequestWithRetry(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Clear cache after mutations
    clearCache(url.split('/').slice(-2).join('/'));
    return response;
  }

  async put(url, data = {}, options = {}) {
    const response = await makeRequestWithRetry(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    
    // Clear cache after mutations
    clearCache(url.split('/').slice(-2).join('/'));
    return response;
  }

  async delete(url, options = {}) {
    const response = await makeRequestWithRetry(url, {
      ...options,
      method: 'DELETE',
    });
    
    // Clear cache after mutations
    clearCache(url.split('/').slice(-2).join('/'));
    return response;
  }

  // Batch requests for performance
  async batch(requests) {
    const promises = requests.map(({ method, url, data, options }) => {
      switch (method.toLowerCase()) {
        case 'get':
          return this.get(url, options);
        case 'post':
          return this.post(url, data, options);
        case 'put':
          return this.put(url, data, options);
        case 'delete':
          return this.delete(url, options);
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    });

    return Promise.allSettled(promises);
  }

  // Authentication helpers
  setAuthToken(token) {
    localStorage.setItem(AUTH_CONFIG.tokenKey, token);
  }

  clearAuthToken() {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
    localStorage.removeItem(AUTH_CONFIG.refreshKey);
    localStorage.removeItem(AUTH_CONFIG.userKey);
    clearCache(); // Clear all cache on logout
  }

  isAuthenticated() {
    return !!localStorage.getItem(AUTH_CONFIG.tokenKey);
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;