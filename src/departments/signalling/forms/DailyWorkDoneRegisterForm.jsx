import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UniversalSignallingFormField, SignallingFormLayout } from '../components';
import { dailyWorkDoneValidationSchema } from '../validation/signallingValidationSchemas';

const DailyWorkDoneRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoize user data parsing to avoid re-parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);

  const [formData, setFormData] = useState({
    date: '',
    range: 'Daily',
    system: '',
    frequency: '',
    maintenanceActivity: '',
    supervisor: '',
    gangMember: '',
    ondutysign: '',
    remarks: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Frequency options
  const frequencyOptions = [
    'Daily',
    'Weekly', 
    'Fortnightly',
    'Monthly',
    'Quarterly',
    'Half-yearly',
    'Yearly',
    'Other'
  ];

  // Common signalling systems
  const signallingSystems = [
    'Color Light Signal',
    'Shunt Signal',
    'Point Machine',
    'Track Circuit',
    'Axle Counter',
    'Signal Cable',
    'Junction Box',
    'ATS Cabinet',
    'DCS Equipment',
    'ESP System',
    'SMPS',
    'Control Panel',
    'Relay Room Equipment',
    'Location Box',
    'Earth Connection',
    'Fan/Ventilation',
    'Other'
  ];

  // Common maintenance activities
  const maintenanceActivities = [
    'Visual Inspection',
    'Cleaning',
    'Lubrication',
    'Voltage/Current Check',
    'Signal Testing',
    'Lamp Replacement',
    'Cable Testing',
    'Point Operation Check',
    'Relay Testing',
    'Battery Check',
    'Earth Testing',
    'Preventive Maintenance',
    'Repair Work',
    'Calibration',
    'Safety Check',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.system) {
      newErrors.system = 'System is required';
    }
    if (!formData.frequency) {
      newErrors.frequency = 'Frequency is required';
    }
    if (!formData.maintenanceActivity) {
      newErrors.maintenanceActivity = 'Maintenance activity is required';
    }
    if (!formData.supervisor) {
      newErrors.supervisor = 'Supervisor name is required';
    }
    if (!formData.gangMember) {
      newErrors.gangMember = 'Gang member details are required';
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
        formType: 'daily-work-done-register',
        department: 'Signalling',
        submittedBy: user?.name || 'Unknown User',
        submittedAt: new Date().toISOString(),
        ...formData
      };

      console.log('Daily Work Done Data:', submissionData);
      
      // Here you would dispatch to your Redux store or make API call
      // dispatch(saveDailyWorkDoneData(submissionData));
      
      toast.success('Work record saved successfully!');
      // navigate('/signalling/daily-work-done-list');
      
    } catch (error) {
      console.error('Error saving work record:', error);
      toast.error('Failed to save work record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      date: '',
      range: 'Daily',
      system: '',
      frequency: '',
      maintenanceActivity: '',
      supervisor: '',
      gangMember: '',
      ondutysign: '',
      remarks: ''
    });
    setErrors({});
    toast.info('Form reset successfully');
  };

  return (
    <SignallingFormLayout
      title="Daily Work Done Register"
      description="Record daily maintenance and work activities for signalling systems"
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
            type="select"
            label="Work Range"
            value={formData.range}
            onChange={(value) => handleInputChange('range', value)}
            options={[
              { value: 'Daily', label: 'Daily' },
              { value: 'Weekly', label: 'Weekly' },
              { value: 'Monthly', label: 'Monthly' },
              { value: 'Periodic', label: 'Periodic' }
            ]}
            required
            error={errors.range}
          />
        </div>

        {/* System and Maintenance Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">System & Maintenance Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniversalSignallingFormField
              type="select"
              label="System"
              value={formData.system}
              onChange={(value) => handleInputChange('system', value)}
              options={[
                { value: '', label: 'Select System' },
                ...signallingSystems.map(system => ({
                  value: system,
                  label: system
                }))
              ]}
              required
              error={errors.system}
            />
            <UniversalSignallingFormField
              type="select"
              label="Frequency"
              value={formData.frequency}
              onChange={(value) => handleInputChange('frequency', value)}
              options={[
                { value: '', label: 'Select Frequency' },
                ...frequencyOptions.map(freq => ({
                  value: freq,
                  label: freq
                }))
              ]}
              required
              error={errors.frequency}
            />
          </div>
          
          <div className="mt-4">
            <UniversalSignallingFormField
              type="select"
              label="Maintenance Activity"
              value={formData.maintenanceActivity}
              onChange={(value) => handleInputChange('maintenanceActivity', value)}
              options={[
                { value: '', label: 'Select Activity' },
                ...maintenanceActivities.map(activity => ({
                  value: activity,
                  label: activity
                }))
              ]}
              required
              error={errors.maintenanceActivity}
            />
          </div>
        </div>

        {/* Staff Information */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-4">Staff Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Supervisor"
              value={formData.supervisor}
              onChange={(value) => handleInputChange('supervisor', value)}
              placeholder="Enter supervisor name"
              required
              error={errors.supervisor}
            />
            <UniversalSignallingFormField
              type="text"
              label="On Duty Sign"
              value={formData.ondutysign}
              onChange={(value) => handleInputChange('ondutysign', value)}
              placeholder="Digital signature/ID"
              error={errors.ondutysign}
            />
          </div>
          
          <div className="mt-4">
            <UniversalSignallingFormField
              type="textarea"
              label="Gang Members"
              value={formData.gangMember}
              onChange={(value) => handleInputChange('gangMember', value)}
              placeholder="List names and IDs of gang members involved in the work"
              rows={3}
              required
              error={errors.gangMember}
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
            placeholder="Detailed description of work done, observations, issues encountered, etc."
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
              'Save Work Record'
            )}
          </button>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default DailyWorkDoneRegisterForm;