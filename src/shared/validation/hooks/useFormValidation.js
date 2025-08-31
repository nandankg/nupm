import { useState, useCallback, useMemo } from 'react';

/**
 * Custom Hook for Form Validation
 * 
 * Provides comprehensive form validation functionality with real-time validation,
 * error handling, and submission management. This hook replaces the scattered
 * validation logic across 226+ forms with a centralized, reusable solution.
 * 
 * Features:
 * - Real-time field validation
 * - Form-level validation
 * - Custom validation rules
 * - Error state management
 * - Submission handling
 * - Performance optimized
 * 
 * Usage:
 * const { 
 *   register, 
 *   handleSubmit, 
 *   formState: { errors, isValid, isSubmitting }
 * } = useFormValidation(validationSchema);
 */

export const useFormValidation = (
  validationSchema = {}, 
  options = {}
) => {
  const {
    mode = 'onChange', // 'onChange', 'onBlur', 'onSubmit'
    reValidateMode = 'onChange',
    defaultValues = {},
    onSubmit = () => {},
    onError = () => {}
  } = options;

  // Form state management
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  // Memoized validation schema for performance
  const schema = useMemo(() => validationSchema, [validationSchema]);

  /**
   * Validates a single field against its validation rules
   */
  const validateField = useCallback(async (fieldName, value, allFormData = formData) => {
    const fieldSchema = schema[fieldName];
    if (!fieldSchema) return null;

    // Required validation
    if (fieldSchema.required && fieldSchema.required.value) {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return fieldSchema.required.message || `${fieldName} is required`;
      }
    }

    // Pattern validation
    if (fieldSchema.pattern && value) {
      if (!fieldSchema.pattern.value.test(value)) {
        return fieldSchema.pattern.message || `${fieldName} format is invalid`;
      }
    }

    // Min/Max length validation
    if (fieldSchema.minLength && value) {
      if (value.length < fieldSchema.minLength.value) {
        return fieldSchema.minLength.message || 
               `${fieldName} must be at least ${fieldSchema.minLength.value} characters`;
      }
    }

    if (fieldSchema.maxLength && value) {
      if (value.length > fieldSchema.maxLength.value) {
        return fieldSchema.maxLength.message || 
               `${fieldName} cannot exceed ${fieldSchema.maxLength.value} characters`;
      }
    }

    // Min/Max value validation (for numbers)
    if (fieldSchema.min && value !== '' && value !== null) {
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue < fieldSchema.min.value) {
        return fieldSchema.min.message || 
               `${fieldName} must be at least ${fieldSchema.min.value}`;
      }
    }

    if (fieldSchema.max && value !== '' && value !== null) {
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue > fieldSchema.max.value) {
        return fieldSchema.max.message || 
               `${fieldName} cannot exceed ${fieldSchema.max.value}`;
      }
    }

    // Custom validation functions
    if (fieldSchema.validate) {
      if (typeof fieldSchema.validate === 'function') {
        const result = await fieldSchema.validate(value, allFormData);
        if (result !== true && typeof result === 'string') {
          return result;
        }
      } else if (typeof fieldSchema.validate === 'object') {
        for (const [validatorName, validator] of Object.entries(fieldSchema.validate)) {
          const result = await validator(value, allFormData);
          if (result !== true && typeof result === 'string') {
            return result;
          }
        }
      }
    }

    return null; // No errors
  }, [schema, formData]);

  /**
   * Validates all form fields
   */
  const validateForm = useCallback(async (data = formData) => {
    const newErrors = {};
    
    for (const fieldName of Object.keys(schema)) {
      const fieldError = await validateField(fieldName, data[fieldName], data);
      if (fieldError) {
        newErrors[fieldName] = fieldError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [schema, validateField, formData]);

  /**
   * Handles field value changes with validation
   */
  const handleFieldChange = useCallback(async (fieldName, value) => {
    // Update form data
    const newFormData = { ...formData, [fieldName]: value };
    setFormData(newFormData);

    // Mark field as touched
    setTouched(prev => ({ ...prev, [fieldName]: true }));

    // Validate field if mode is onChange
    if (mode === 'onChange' && touched[fieldName]) {
      const fieldError = await validateField(fieldName, value, newFormData);
      setErrors(prev => ({
        ...prev,
        [fieldName]: fieldError
      }));
    }
  }, [formData, mode, touched, validateField]);

  /**
   * Handles field blur events
   */
  const handleFieldBlur = useCallback(async (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));

    // Validate field on blur if mode is onBlur
    if (mode === 'onBlur' || mode === 'onChange') {
      const fieldError = await validateField(fieldName, formData[fieldName]);
      setErrors(prev => ({
        ...prev,
        [fieldName]: fieldError
      }));
    }
  }, [mode, validateField, formData]);

  /**
   * Register function to connect form fields
   */
  const register = useCallback((fieldName, fieldOptions = {}) => {
    return {
      name: fieldName,
      value: formData[fieldName] || fieldOptions.defaultValue || '',
      onChange: (event) => {
        const value = event.target ? event.target.value : event;
        handleFieldChange(fieldName, value);
      },
      onBlur: () => handleFieldBlur(fieldName),
      'aria-invalid': !!errors[fieldName],
      'aria-describedby': errors[fieldName] ? `${fieldName}-error` : undefined,
      required: schema[fieldName]?.required?.value || false
    };
  }, [formData, handleFieldChange, handleFieldBlur, errors, schema]);

  /**
   * Form submission handler
   */
  const handleSubmit = useCallback((submitHandler) => {
    return async (event) => {
      if (event) {
        event.preventDefault();
      }

      setIsSubmitting(true);
      setIsSubmitSuccessful(false);

      try {
        // Validate entire form
        const isValid = await validateForm();

        if (isValid) {
          await submitHandler(formData);
          setIsSubmitSuccessful(true);
          
          // Call success callback
          if (onSubmit) {
            onSubmit(formData);
          }
        } else {
          // Call error callback
          if (onError) {
            onError(errors);
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        if (onError) {
          onError({ submit: 'Form submission failed' });
        }
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [formData, validateForm, errors, onSubmit, onError]);

  /**
   * Reset form to initial state
   */
  const reset = useCallback((newDefaultValues = defaultValues) => {
    setFormData(newDefaultValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSubmitSuccessful(false);
  }, [defaultValues]);

  /**
   * Set form values programmatically
   */
  const setValue = useCallback(async (fieldName, value, shouldValidate = false) => {
    const newFormData = { ...formData, [fieldName]: value };
    setFormData(newFormData);

    if (shouldValidate) {
      const fieldError = await validateField(fieldName, value, newFormData);
      setErrors(prev => ({
        ...prev,
        [fieldName]: fieldError
      }));
    }
  }, [formData, validateField]);

  /**
   * Get field error
   */
  const getFieldError = useCallback((fieldName) => {
    return errors[fieldName] || null;
  }, [errors]);

  /**
   * Check if form is valid
   */
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0 && Object.keys(touched).length > 0;
  }, [errors, touched]);

  /**
   * Check if field is dirty (has been modified)
   */
  const isDirty = useMemo(() => {
    return Object.keys(formData).some(
      key => formData[key] !== (defaultValues[key] || '')
    );
  }, [formData, defaultValues]);

  return {
    // Form data and state
    formData,
    formState: {
      errors,
      touched,
      isValid,
      isSubmitting,
      isSubmitSuccessful,
      isDirty
    },
    
    // Field registration and helpers
    register,
    setValue,
    getFieldError,
    
    // Form actions
    handleSubmit,
    reset,
    validateForm,
    validateField,
    
    // Event handlers
    handleFieldChange,
    handleFieldBlur
  };
};

/**
 * Simplified hook for basic form validation
 */
export const useSimpleValidation = (schema, defaultValues = {}) => {
  return useFormValidation(schema, {
    mode: 'onChange',
    defaultValues,
    onSubmit: null,
    onError: null
  });
};

/**
 * Hook specifically for railway forms with common patterns
 */
export const useRailwayFormValidation = (schema, options = {}) => {
  const railwayDefaults = {
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    station: '',
    reportedBy: '',
    ...options.defaultValues
  };

  return useFormValidation(schema, {
    ...options,
    defaultValues: railwayDefaults
  });
};

export default useFormValidation;