import { useState, useEffect, useCallback, useRef } from 'react';
import { apiService } from '../services/apiService';

export const useApiQuery = (
  url,
  options = {},
  dependencies = [],
  {
    enabled = true,
    refetchOnMount = true,
    refetchInterval = null,
    useCache = true,
    onSuccess = null,
    onError = null,
  } = {}
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  
  const isMountedRef = useRef(true);
  const intervalRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await apiService.request(url, options, useCache);
      
      if (isMountedRef.current) {
        setData(result);
        setLastFetch(new Date());
        onSuccess?.(result);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err);
        onError?.(err);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [url, JSON.stringify(options), useCache, enabled, onSuccess, onError]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (enabled && (refetchOnMount || !data)) {
      fetchData();
    }
  }, [fetchData, enabled, refetchOnMount, ...dependencies]);

  useEffect(() => {
    if (refetchInterval && enabled) {
      intervalRef.current = setInterval(fetchData, refetchInterval);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [fetchData, refetchInterval, enabled]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
    lastFetch,
    isStale: lastFetch && Date.now() - lastFetch.getTime() > 5 * 60 * 1000,
  };
};