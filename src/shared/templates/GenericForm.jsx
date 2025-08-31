import React, { useState, useEffect } from 'react';
import { useOperationForm } from '../api';
import { AccessibleFormField, AccessibleButton, SkipLink } from '../accessibility';
import { useFormValidation } from '../validation';

/**
 * Generic Form Template
 * 
 * This template can handle any UPMRC form by accepting configuration.
 * Replaces 700+ duplicate form files with a single configurable component.
 * 
 * @param {Object} config - Form configuration object
 * @param {string} config.formType - Form type identifier (slug from formlist.md)
 * @param {string} config.title - Form display title
 * @param {string} config.department - Department category
 * @param {Array} config.fields - Field configuration array
 * @param {Object} config.validationSchema - Validation rules
 * @param {Object} config.initialData - Initial form data
 * @param {Function} config.onSuccess - Success callback
 * @param {string} config.module - Module identifier (akshra, manshi, etc.)
 */
const GenericForm = ({ config }) => {
  const {
    formType,
    title,
    department,
    fields = [],
    validationSchema,
    initialData = {},
    onSuccess = () => {},
    module = 'general',
    helpText = '',
    submitButtonText = 'Submit Form'
  } = config;

  const [formData, setFormData] = useState(initialData);
  const { loading, submitForm } = useOperationForm(formType);
  const { register, handleSubmit, formState: { errors, isValid } } = useFormValidation(validationSchema);

  const onSubmit = async (data) => {
    try {
      const submissionData = {
        ...data,
        formType,
        department,
        module,
        submittedAt: new Date().toISOString(),
        submittedBy: getCurrentUser()?.profileid
      };
      
      await submitForm(submissionData);
      onSuccess(submissionData);
    } catch (error) {
      console.error(`${formType} submission error:`, error);
    }
  };

  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem("userdata") || '{}');
    } catch {
      return {};
    }
  };

  const renderField = (fieldConfig, index) => {
    const {
      name,
      label,
      type = 'text',
      required = false,
      options = [],
      placeholder = '',
      helpText = '',
      validation = {},
      gridCol = 'col-md-6',
      ...fieldProps
    } = fieldConfig;

    return (
      <div key={`${name}-${index}`} className={gridCol}>
        <AccessibleFormField
          name={name}
          label={label}
          type={type}
          required={required}
          options={options}
          placeholder={placeholder}
          helpText={helpText}
          {...register(name, validation)}
          error={errors[name]}
          {...fieldProps}
        />
      </div>
    );
  };

  const renderFieldGroups = () => {
    const groups = [];
    for (let i = 0; i < fields.length; i += 2) {
      const fieldPair = fields.slice(i, i + 2);
      groups.push(
        <div key={`group-${i}`} className="row">
          {fieldPair.map((field, idx) => renderField(field, i + idx))}
        </div>
      );
    }
    return groups;
  };

  return (
    <>
      <SkipLink />
      <main id="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="card-title mb-1">{title}</h4>
                      <div className="d-flex gap-2">
                        <span className="badge bg-primary">{department}</span>
                        {module !== 'general' && (
                          <span className="badge bg-secondary">{module.toUpperCase()}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-muted">
                      <small>Form ID: {formType}</small>
                    </div>
                  </div>
                  {helpText && (
                    <p className="text-muted mt-2 mb-0">{helpText}</p>
                  )}
                </div>
                
                <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {renderFieldGroups()}
                    
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-info">
                          <i className="fas fa-info-circle me-2"></i>
                          <strong>Note:</strong> All fields marked with * are required. 
                          Please ensure accuracy as this data is used for operational compliance.
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex justify-content-end gap-2">
                          <button 
                            type="button" 
                            className="btn btn-secondary"
                            disabled={loading}
                            onClick={() => window.history.back()}
                          >
                            Cancel
                          </button>
                          
                          <AccessibleButton
                            type="submit"
                            variant="primary"
                            loading={loading}
                            loadingText="Submitting form data..."
                            disabled={!isValid}
                            ariaLabel={`Submit ${title} form`}
                          >
                            {submitButtonText}
                          </AccessibleButton>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default GenericForm;