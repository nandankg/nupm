import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UniversalSignallingFormField, SignallingFormLayout } from '../components';
import { handoverTakingOverValidationSchema } from '../validation/signallingValidationSchemas';

const HandoverTakingOverNoteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoize user data parsing to avoid re-parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);

  const [formData, setFormData] = useState({
    date: '',
    shiftStartTime: '',
    shiftEndTime: '',
    handoverOfficerName: '',
    handoverOfficerDesignation: '',
    handoverOfficerSign: '',
    takingOfficerName: '',
    takingOfficerDesignation: '',
    takingOfficerSign: '',
    systemsHandedOver: '',
    equipmentCondition: '',
    pendingWork: '',
    criticalObservations: '',
    safetyIssues: '',
    keyIssues: '',
    documentStatus: '',
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
    if (!formData.shiftStartTime) {
      newErrors.shiftStartTime = 'Shift start time is required';
    }
    if (!formData.shiftEndTime) {
      newErrors.shiftEndTime = 'Shift end time is required';
    }
    if (!formData.handoverOfficerName) {
      newErrors.handoverOfficerName = 'Handover officer name is required';
    }
    if (!formData.takingOfficerName) {
      newErrors.takingOfficerName = 'Taking over officer name is required';
    }
    if (!formData.systemsHandedOver) {
      newErrors.systemsHandedOver = 'Systems handed over details are required';
    }

    // Time validation
    if (formData.shiftStartTime && formData.shiftEndTime) {
      const startTime = new Date(`1970-01-01T${formData.shiftStartTime}:00`);
      const endTime = new Date(`1970-01-01T${formData.shiftEndTime}:00`);
      
      // Handle overnight shifts
      if (endTime <= startTime) {
        endTime.setDate(endTime.getDate() + 1);
      }
      
      const duration = (endTime - startTime) / (1000 * 60 * 60); // Hours
      if (duration > 12) {
        newErrors.shiftEndTime = 'Shift duration seems too long (>12 hours)';
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
        formType: 'handover-taking-over-note',
        department: 'Signalling',
        submittedBy: user?.name || 'Unknown User',
        submittedAt: new Date().toISOString(),
        ...formData
      };

      console.log('Handover Taking Over Note Data:', submissionData);
      
      // Here you would dispatch to your Redux store or make API call
      // dispatch(saveHandoverTakingOverData(submissionData));
      
      toast.success('Handover note saved successfully!');
      // navigate('/signalling/handover-taking-over-list');
      
    } catch (error) {
      console.error('Error saving handover note:', error);
      toast.error('Failed to save handover note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      date: '',
      shiftStartTime: '',
      shiftEndTime: '',
      handoverOfficerName: '',
      handoverOfficerDesignation: '',
      handoverOfficerSign: '',
      takingOfficerName: '',
      takingOfficerDesignation: '',
      takingOfficerSign: '',
      systemsHandedOver: '',
      equipmentCondition: '',
      pendingWork: '',
      criticalObservations: '',
      safetyIssues: '',
      keyIssues: '',
      documentStatus: '',
      remarks: ''
    });
    setErrors({});
    toast.info('Form reset successfully');
  };

  return (
    <SignallingFormLayout
      title="Handover Taking Over Note"
      description="Official record for shift handover and duty transfer"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UniversalSignallingFormField
            type="date"
            label="Date"
            value={formData.date}
            onChange={(value) => handleInputChange('date', value)}
            required
            error={errors.date}
          />
          <UniversalSignallingFormField
            type="time"
            label="Shift Start Time"
            value={formData.shiftStartTime}
            onChange={(value) => handleInputChange('shiftStartTime', value)}
            required
            error={errors.shiftStartTime}
          />
          <UniversalSignallingFormField
            type="time"
            label="Shift End Time"
            value={formData.shiftEndTime}
            onChange={(value) => handleInputChange('shiftEndTime', value)}
            required
            error={errors.shiftEndTime}
          />
        </div>

        {/* Handover Officer Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">Handover Officer Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Officer Name"
              value={formData.handoverOfficerName}
              onChange={(value) => handleInputChange('handoverOfficerName', value)}
              placeholder="Enter handover officer name"
              required
              error={errors.handoverOfficerName}
            />
            <UniversalSignallingFormField
              type="text"
              label="Designation"
              value={formData.handoverOfficerDesignation}
              onChange={(value) => handleInputChange('handoverOfficerDesignation', value)}
              placeholder="Enter designation"
              error={errors.handoverOfficerDesignation}
            />
            <UniversalSignallingFormField
              type="text"
              label="Signature"
              value={formData.handoverOfficerSign}
              onChange={(value) => handleInputChange('handoverOfficerSign', value)}
              placeholder="Digital signature/ID"
              error={errors.handoverOfficerSign}
            />
          </div>
        </div>

        {/* Taking Over Officer Information */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-4">Taking Over Officer Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Officer Name"
              value={formData.takingOfficerName}
              onChange={(value) => handleInputChange('takingOfficerName', value)}
              placeholder="Enter taking over officer name"
              required
              error={errors.takingOfficerName}
            />
            <UniversalSignallingFormField
              type="text"
              label="Designation"
              value={formData.takingOfficerDesignation}
              onChange={(value) => handleInputChange('takingOfficerDesignation', value)}
              placeholder="Enter designation"
              error={errors.takingOfficerDesignation}
            />
            <UniversalSignallingFormField
              type="text"
              label="Signature"
              value={formData.takingOfficerSign}
              onChange={(value) => handleInputChange('takingOfficerSign', value)}
              placeholder="Digital signature/ID"
              error={errors.takingOfficerSign}
            />
          </div>
        </div>

        {/* Systems and Equipment Information */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-orange-800 mb-4">Systems & Equipment Status</h4>
          <div className="space-y-4">
            <UniversalSignallingFormField
              type="textarea"
              label="Systems Handed Over"
              value={formData.systemsHandedOver}
              onChange={(value) => handleInputChange('systemsHandedOver', value)}
              placeholder="List all signalling systems and equipment handed over with their current status"
              rows={4}
              required
              error={errors.systemsHandedOver}
            />
            <UniversalSignallingFormField
              type="textarea"
              label="Equipment Condition"
              value={formData.equipmentCondition}
              onChange={(value) => handleInputChange('equipmentCondition', value)}
              placeholder="Describe the current condition of all equipment"
              rows={3}
              error={errors.equipmentCondition}
            />
          </div>
        </div>

        {/* Operational Status */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-yellow-800 mb-4">Operational Status</h4>
          <div className="space-y-4">
            <UniversalSignallingFormField
              type="textarea"
              label="Pending Work"
              value={formData.pendingWork}
              onChange={(value) => handleInputChange('pendingWork', value)}
              placeholder="List any pending work, maintenance, or issues that need attention"
              rows={3}
              error={errors.pendingWork}
            />
            <UniversalSignallingFormField
              type="textarea"
              label="Critical Observations"
              value={formData.criticalObservations}
              onChange={(value) => handleInputChange('criticalObservations', value)}
              placeholder="Any critical observations or issues that require immediate attention"
              rows={3}
              error={errors.criticalObservations}
            />
            <UniversalSignallingFormField
              type="textarea"
              label="Safety Issues"
              value={formData.safetyIssues}
              onChange={(value) => handleInputChange('safetyIssues', value)}
              placeholder="Report any safety concerns or hazards identified during the shift"
              rows={2}
              error={errors.safetyIssues}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-purple-800 mb-4">Additional Information</h4>
          <div className="space-y-4">
            <UniversalSignallingFormField
              type="textarea"
              label="Key Issues"
              value={formData.keyIssues}
              onChange={(value) => handleInputChange('keyIssues', value)}
              placeholder="List any key issues, incidents, or important events during the shift"
              rows={3}
              error={errors.keyIssues}
            />
            <UniversalSignallingFormField
              type="text"
              label="Document Status"
              value={formData.documentStatus}
              onChange={(value) => handleInputChange('documentStatus', value)}
              placeholder="Status of logs, registers, and other documents"
              error={errors.documentStatus}
            />
            <UniversalSignallingFormField
              type="textarea"
              label="General Remarks"
              value={formData.remarks}
              onChange={(value) => handleInputChange('remarks', value)}
              placeholder="Any additional remarks or information"
              rows={3}
              error={errors.remarks}
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
              'Save Handover Note'
            )}
          </button>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default HandoverTakingOverNoteForm;