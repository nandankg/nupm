import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UniversalSignallingFormField, SignallingFormLayout } from '../components';
import { loanRegisterValidationSchema } from '../validation/signallingValidationSchemas';

const LoanRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoize user data parsing to avoid re-parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);

  const [formData, setFormData] = useState({
    date: '',
    itemdes: '',
    quantity: '',
    denomination: '',
    make: '',
    model: '',
    serialNo: '',
    empname_send: '',
    empid_send: '',
    receivefrom: '',
    empname_recieve: '',
    empid_recieve: '',
    returnable: 'Yes',
    sendto: '',
    sendby: '',
    receivedate: '',
    receiveby: '',
    remarks: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.itemdes) {
      newErrors.itemdes = 'Item description is required';
    }
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    }
    if (!formData.empname_send) {
      newErrors.empname_send = 'Sender employee name is required';
    }
    if (!formData.empid_send) {
      newErrors.empid_send = 'Sender employee ID is required';
    }
    if (!formData.empname_recieve) {
      newErrors.empname_recieve = 'Receiver employee name is required';
    }
    if (!formData.empid_recieve) {
      newErrors.empid_recieve = 'Receiver employee ID is required';
    }

    // Employee ID validation
    const empIdPattern = /^[A-Z]{2,3}\d{4,6}$/;
    if (formData.empid_send && !empIdPattern.test(formData.empid_send)) {
      newErrors.empid_send = 'Employee ID should be 2-3 letters followed by 4-6 digits (e.g., ABC1234)';
    }
    if (formData.empid_recieve && !empIdPattern.test(formData.empid_recieve)) {
      newErrors.empid_recieve = 'Employee ID should be 2-3 letters followed by 4-6 digits (e.g., ABC1234)';
    }

    // Date validation
    if (formData.date && formData.receivedate) {
      const sendDate = new Date(formData.date);
      const receiveDate = new Date(formData.receivedate);
      if (receiveDate < sendDate) {
        newErrors.receivedate = 'Receive date cannot be earlier than send date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setLoading(true);
    try {
      const submissionData = {
        formType: 'loan-register',
        department: 'Signalling',
        submittedBy: user?.name || 'Unknown User',
        submittedAt: new Date().toISOString(),
        ...formData
      };

      console.log('Loan Register Data:', submissionData);
      
      // Here you would dispatch to your Redux store or make API call
      // dispatch(saveLoanRegisterData(submissionData));
      
      toast.success('Loan record saved successfully!');
      // navigate('/signalling/loan-register-list');
      
    } catch (error) {
      console.error('Error saving loan record:', error);
      toast.error('Failed to save loan record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      date: '',
      itemdes: '',
      quantity: '',
      denomination: '',
      make: '',
      model: '',
      serialNo: '',
      empname_send: '',
      empid_send: '',
      receivefrom: '',
      empname_recieve: '',
      empid_recieve: '',
      returnable: 'Yes',
      sendto: '',
      sendby: '',
      receivedate: '',
      receiveby: '',
      remarks: ''
    });
    setErrors({});
    toast.info('Form reset successfully');
  };

  return (
    <SignallingFormLayout
      title="Loan Register"
      description="Maintain records of equipment and materials on loan"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Item Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">Item Information</h4>
          <div className="grid grid-cols-1 gap-6">
            <UniversalSignallingFormField
              type="date"
              label="Date"
              value={formData.date}
              onChange={(value) => handleInputChange('date', value)}
              required
              error={errors.date}
            />
            <UniversalSignallingFormField
              type="textarea"
              label="Item Description"
              value={formData.itemdes}
              onChange={(value) => handleInputChange('itemdes', value)}
              placeholder="Describe the item being loaned"
              rows={3}
              required
              error={errors.itemdes}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UniversalSignallingFormField
                type="text"
                label="Quantity"
                value={formData.quantity}
                onChange={(value) => handleInputChange('quantity', value)}
                placeholder="Enter quantity"
                required
                error={errors.quantity}
              />
              <UniversalSignallingFormField
                type="text"
                label="Denomination/Unit"
                value={formData.denomination}
                onChange={(value) => handleInputChange('denomination', value)}
                placeholder="e.g., Nos, Meters, Kg"
                error={errors.denomination}
              />
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Technical Specifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Make"
              value={formData.make}
              onChange={(value) => handleInputChange('make', value)}
              placeholder="Manufacturer"
              error={errors.make}
            />
            <UniversalSignallingFormField
              type="text"
              label="Model"
              value={formData.model}
              onChange={(value) => handleInputChange('model', value)}
              placeholder="Model number"
              error={errors.model}
            />
            <UniversalSignallingFormField
              type="text"
              label="Serial No."
              value={formData.serialNo}
              onChange={(value) => handleInputChange('serialNo', value)}
              placeholder="Serial number"
              error={errors.serialNo}
            />
          </div>
        </div>

        {/* Sender Information */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-4">Sender Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Employee Name (Sender)"
              value={formData.empname_send}
              onChange={(value) => handleInputChange('empname_send', value)}
              placeholder="Name of person sending"
              required
              error={errors.empname_send}
            />
            <UniversalSignallingFormField
              type="text"
              label="Employee ID (Sender)"
              value={formData.empid_send}
              onChange={(value) => handleInputChange('empid_send', value)}
              placeholder="e.g., ABC1234"
              required
              error={errors.empid_send}
            />
            <UniversalSignallingFormField
              type="text"
              label="Send To"
              value={formData.sendto}
              onChange={(value) => handleInputChange('sendto', value)}
              placeholder="Department/Location"
              error={errors.sendto}
            />
            <UniversalSignallingFormField
              type="text"
              label="Send By"
              value={formData.sendby}
              onChange={(value) => handleInputChange('sendby', value)}
              placeholder="Method of sending"
              error={errors.sendby}
            />
          </div>
        </div>

        {/* Receiver Information */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-orange-800 mb-4">Receiver Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Employee Name (Receiver)"
              value={formData.empname_recieve}
              onChange={(value) => handleInputChange('empname_recieve', value)}
              placeholder="Name of person receiving"
              required
              error={errors.empname_recieve}
            />
            <UniversalSignallingFormField
              type="text"
              label="Employee ID (Receiver)"
              value={formData.empid_recieve}
              onChange={(value) => handleInputChange('empid_recieve', value)}
              placeholder="e.g., XYZ5678"
              required
              error={errors.empid_recieve}
            />
            <UniversalSignallingFormField
              type="text"
              label="Receive From"
              value={formData.receivefrom}
              onChange={(value) => handleInputChange('receivefrom', value)}
              placeholder="Source department/location"
              error={errors.receivefrom}
            />
            <UniversalSignallingFormField
              type="date"
              label="Receive Date"
              value={formData.receivedate}
              onChange={(value) => handleInputChange('receivedate', value)}
              error={errors.receivedate}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <UniversalSignallingFormField
              type="text"
              label="Receive By"
              value={formData.receiveby}
              onChange={(value) => handleInputChange('receiveby', value)}
              placeholder="Method of receiving"
              error={errors.receiveby}
            />
            <UniversalSignallingFormField
              type="select"
              label="Returnable?"
              value={formData.returnable}
              onChange={(value) => handleInputChange('returnable', value)}
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
                { value: 'Conditional', label: 'Conditional' }
              ]}
              required
              error={errors.returnable}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-yellow-800 mb-4">Additional Information</h4>
          <UniversalSignallingFormField
            type="textarea"
            label="Remarks"
            value={formData.remarks}
            onChange={(value) => handleInputChange('remarks', value)}
            placeholder="Additional notes, conditions, or special instructions"
            rows={4}
            error={errors.remarks}
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
            disabled={loading}
          >
            Reset
          </button>
          <button
            type="submit"
            className={`font-bold py-2 px-6 rounded-lg ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              'Save Loan Record'
            )}
          </button>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default LoanRegisterForm;