import { useState, useCallback, useRef } from 'react';
import { apiService } from '../services/apiService';

export const useApiMutation = (
  mutationFn,
  {
    onSuccess = null,
    onError = null,
    onSettled = null,
  } = {}
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const isMountedRef = useRef(true);

  const mutate = useCallback(async (variables) => {
    setLoading(true);
    setError(null);

    try {
      const result = await mutationFn(variables);
      
      if (isMountedRef.current) {
        setData(result);
        onSuccess?.(result, variables);
      }
      
      return result;
    } catch (err) {
      if (isMountedRef.current) {
        setError(err);
        onError?.(err, variables);
      }
      throw err;
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        onSettled?.();
      }
    }
  }, [mutationFn, onSuccess, onError, onSettled]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    mutate,
    data,
    loading,
    error,
    reset,
    isSuccess: !loading && !error && data !== null,
    isError: !loading && error !== null,
  };
};