import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UniversalSignallingFormField, SignallingFormLayout } from '../components';
import { grievanceRegisterValidationSchema } from '../validation/signallingValidationSchemas';

const GrievanceRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoize user data parsing to avoid re-parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);

  const [formData, setFormData] = useState({
    date: '',
    test_date: '',
    employee_no: '',
    noe: '', // Name of Employee
    des: '', // Designation
    gd: '', // Grievance Description
    remark: '',
    io: '', // Investigating Officer
    sign: '',
    grievanceType: '',
    grievanceCategory: '',
    urgencyLevel: 'Medium',
    dateReceived: '',
    investigationStatus: 'Pending',
    actionTaken: '',
    resolutionDate: '',
    satisfactionLevel: '',
    followUpRequired: 'No'
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.employee_no) {
      newErrors.employee_no = 'Employee number is required';
    }
    if (!formData.noe) {
      newErrors.noe = 'Employee name is required';
    }
    if (!formData.des) {
      newErrors.des = 'Designation is required';
    }
    if (!formData.gd) {
      newErrors.gd = 'Grievance description is required';
    }
    if (!formData.grievanceType) {
      newErrors.grievanceType = 'Grievance type is required';
    }

    // Employee number validation
    const empIdPattern = /^[A-Z]{2,3}\d{4,6}$/;
    if (formData.employee_no && !empIdPattern.test(formData.employee_no)) {
      newErrors.employee_no = 'Employee ID should be 2-3 letters followed by 4-6 digits (e.g., ABC1234)';
    }

    // Date validation
    if (formData.dateReceived && formData.date) {
      const dateReceived = new Date(formData.dateReceived);
      const dateLogged = new Date(formData.date);
      if (dateReceived < dateLogged) {
        newErrors.dateReceived = 'Date received cannot be earlier than date logged';
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
        formType: 'grievance-register',
        department: 'Signalling',
        submittedBy: user?.name || 'Unknown User',
        submittedAt: new Date().toISOString(),
        ...formData
      };

      console.log('Grievance Register Data:', submissionData);
      
      // Here you would dispatch to your Redux store or make API call
      // dispatch(saveGrievanceRegisterData(submissionData));
      
      toast.success('Grievance record saved successfully!');
      // navigate('/signalling/grievance-register-list');
      
    } catch (error) {
      console.error('Error saving grievance record:', error);
      toast.error('Failed to save grievance record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      date: '',
      test_date: '',
      employee_no: '',
      noe: '',
      des: '',
      gd: '',
      remark: '',
      io: '',
      sign: '',
      grievanceType: '',
      grievanceCategory: '',
      urgencyLevel: 'Medium',
      dateReceived: '',
      investigationStatus: 'Pending',
      actionTaken: '',
      resolutionDate: '',
      satisfactionLevel: '',
      followUpRequired: 'No'
    });
    setErrors({});
    toast.info('Form reset successfully');
  };

  return (
    <SignallingFormLayout
      title="Grievance Register"
      description="Register to record and track employee grievances and their resolution"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UniversalSignallingFormField
            type="date"
            label="Date"
            value={formData.date}
            onChange={(value) => handleInputChange('date', value)}
            required
            error={errors.date}
          />
          <UniversalSignallingFormField
            type="date"
            label="Date Received"
            value={formData.dateReceived}
            onChange={(value) => handleInputChange('dateReceived', value)}
            error={errors.dateReceived}
          />
        </div>

        {/* Employee Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">Employee Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Employee Number"
              value={formData.employee_no}
              onChange={(value) => handleInputChange('employee_no', value)}
              placeholder="e.g., ABC1234"
              required
              error={errors.employee_no}
            />
            <UniversalSignallingFormField
              type="text"
              label="Name of Employee"
              value={formData.noe}
              onChange={(value) => handleInputChange('noe', value)}
              placeholder="Enter employee name"
              required
              error={errors.noe}
            />
            <UniversalSignallingFormField
              type="text"
              label="Designation"
              value={formData.des}
              onChange={(value) => handleInputChange('des', value)}
              placeholder="Employee designation"
              required
              error={errors.des}
            />
          </div>
        </div>

        {/* Grievance Details */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-red-800 mb-4">Grievance Details</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <UniversalSignallingFormField
                type="select"
                label="Grievance Type"
                value={formData.grievanceType}
                onChange={(value) => handleInputChange('grievanceType', value)}
                options={[
                  { value: '', label: 'Select Type' },
                  { value: 'Workplace Harassment', label: 'Workplace Harassment' },
                  { value: 'Discrimination', label: 'Discrimination' },
                  { value: 'Work Conditions', label: 'Work Conditions' },
                  { value: 'Safety Issues', label: 'Safety Issues' },
                  { value: 'Payment Related', label: 'Payment Related' },
                  { value: 'Leave Related', label: 'Leave Related' },
                  { value: 'Promotion/Transfer', label: 'Promotion/Transfer' },
                  { value: 'Disciplinary Action', label: 'Disciplinary Action' },
                  { value: 'Other', label: 'Other' }
                ]}
                required
                error={errors.grievanceType}
              />
              <UniversalSignallingFormField
                type="select"
                label="Category"
                value={formData.grievanceCategory}
                onChange={(value) => handleInputChange('grievanceCategory', value)}
                options={[
                  { value: '', label: 'Select Category' },
                  { value: 'Administrative', label: 'Administrative' },
                  { value: 'Technical', label: 'Technical' },
                  { value: 'Personal', label: 'Personal' },
                  { value: 'Policy Related', label: 'Policy Related' },
                  { value: 'Service Related', label: 'Service Related' }
                ]}
                error={errors.grievanceCategory}
              />
              <UniversalSignallingFormField
                type="select"
                label="Urgency Level"
                value={formData.urgencyLevel}
                onChange={(value) => handleInputChange('urgencyLevel', value)}
                options={[
                  { value: 'Low', label: 'Low' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'High', label: 'High' },
                  { value: 'Critical', label: 'Critical' }
                ]}
                error={errors.urgencyLevel}
              />
            </div>
            <UniversalSignallingFormField
              type="textarea"
              label="Grievance Description"
              value={formData.gd}
              onChange={(value) => handleInputChange('gd', value)}
              placeholder="Detailed description of the grievance"
              rows={4}
              required
              error={errors.gd}
            />
          </div>
        </div>

        {/* Investigation */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-4">Investigation & Action</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Investigating Officer"
              value={formData.io}
              onChange={(value) => handleInputChange('io', value)}
              placeholder="Name and designation of investigating officer"
              error={errors.io}
            />
            <UniversalSignallingFormField
              type="select"
              label="Investigation Status"
              value={formData.investigationStatus}
              onChange={(value) => handleInputChange('investigationStatus', value)}
              options={[
                { value: 'Pending', label: 'Pending' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Completed', label: 'Completed' },
                { value: 'On Hold', label: 'On Hold' },
                { value: 'Closed', label: 'Closed' }
              ]}
              error={errors.investigationStatus}
            />
          </div>
          <div className="mt-4">
            <UniversalSignallingFormField
              type="textarea"
              label="Action Taken"
              value={formData.actionTaken}
              onChange={(value) => handleInputChange('actionTaken', value)}
              placeholder="Describe the action taken or proposed"
              rows={3}
              error={errors.actionTaken}
            />
          </div>
        </div>

        {/* Resolution & Follow-up */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-yellow-800 mb-4">Resolution & Follow-up</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UniversalSignallingFormField
              type="date"
              label="Test Date"
              value={formData.test_date}
              onChange={(value) => handleInputChange('test_date', value)}
              error={errors.test_date}
            />
            <UniversalSignallingFormField
              type="date"
              label="Resolution Date"
              value={formData.resolutionDate}
              onChange={(value) => handleInputChange('resolutionDate', value)}
              error={errors.resolutionDate}
            />
            <UniversalSignallingFormField
              type="select"
              label="Follow-up Required"
              value={formData.followUpRequired}
              onChange={(value) => handleInputChange('followUpRequired', value)}
              options={[
                { value: 'No', label: 'No' },
                { value: 'Yes', label: 'Yes' },
                { value: 'Pending', label: 'Pending' }
              ]}
              error={errors.followUpRequired}
            />
          </div>
          <div className="mt-4">
            <UniversalSignallingFormField
              type="select"
              label="Employee Satisfaction Level"
              value={formData.satisfactionLevel}
              onChange={(value) => handleInputChange('satisfactionLevel', value)}
              options={[
                { value: '', label: 'Select Satisfaction Level' },
                { value: 'Very Satisfied', label: 'Very Satisfied' },
                { value: 'Satisfied', label: 'Satisfied' },
                { value: 'Neutral', label: 'Neutral' },
                { value: 'Dissatisfied', label: 'Dissatisfied' },
                { value: 'Very Dissatisfied', label: 'Very Dissatisfied' },
                { value: 'Not Disclosed', label: 'Not Disclosed' }
              ]}
              error={errors.satisfactionLevel}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-purple-800 mb-4">Additional Information</h4>
          <div className="space-y-4">
            <UniversalSignallingFormField
              type="textarea"
              label="Remarks"
              value={formData.remark}
              onChange={(value) => handleInputChange('remark', value)}
              placeholder="Additional remarks or observations"
              rows={3}
              error={errors.remark}
            />
            <UniversalSignallingFormField
              type="text"
              label="Signature/Sign-off"
              value={formData.sign}
              onChange={(value) => handleInputChange('sign', value)}
              placeholder="Digital signature or sign-off reference"
              error={errors.sign}
            />
          </div>
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
              'Save Grievance Record'
            )}
          </button>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default GrievanceRegisterForm;