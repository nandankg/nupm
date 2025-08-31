import { useState, useCallback } from 'react';
import { operationService } from '../services/operationService';
import { showToastOnce } from '../../../component/toastUtils';

// Custom hook for operation form management
export const useOperationForm = (formType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const submitForm = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await operationService.saveData(formType, formData);
      setData(response);
      
      // Show success toast
      showToastOnce('success', 'Form submitted successfully!');
      
      return response;
    } catch (err) {
      setError(err.message);
      
      // Show error toast
      showToastOnce('error', `Error: ${err.message}`);
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [formType]);

  const editForm = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await operationService.editData(formType, formData);
      setData(response);
      
      // Show success toast
      showToastOnce('success', 'Form updated successfully!');
      
      return response;
    } catch (err) {
      setError(err.message);
      
      // Show error toast
      showToastOnce('error', `Error: ${err.message}`);
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [formType]);

  const fetchData = useCallback(async (useCache = true) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await operationService.viewData(formType, useCache);
      setData(response);
      return response;
    } catch (err) {
      setError(err.message);
      
      // Show error toast
      showToastOnce('error', `Error fetching data: ${err.message}`);
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [formType]);

  return {
    loading,
    error,
    data,
    submitForm,
    editForm,
    fetchData,
  };
};