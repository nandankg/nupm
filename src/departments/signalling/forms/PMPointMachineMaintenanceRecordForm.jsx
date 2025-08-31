import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UniversalSignallingFormField, SignallingFormLayout } from '../components';
import { pmPointMachineValidationSchema } from '../validation/signallingValidationSchemas';

const PMPointMachineMaintenanceRecordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoize user data parsing to avoid re-parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);

  const [formData, setFormData] = useState({
    date: '',
    station: '',
    pointNo: '',
    ektNo: '',
    ixl: '',
    periodicity: 'Biweekly',
    biweeklyMonth: '',
    monthlyMonth: '',
    quarterlyRange: '',
    halfYearlyRange: '',
    name: '',
    designation: '',
    empNo: '',
    signature: '',
    csign: '',
    remarks: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Biweekly maintenance activities
  const biweeklyActivities = [
    { category: "Cleaning", activity: "Cleaning the area surrounding the IRS (debris…)" },
    { category: "Cleaning", activity: "Cleaning inside the IRS any accumulation of dust" },
    { category: "Cleaning", activity: "Cleaning inside the IRS any surplus of old grease" },
    { category: "Checks", activity: "Security" },
    { category: "Checks", activity: "Condition / Deterioration" },
    { category: "Checks", activity: "Obstructions" },
    { category: "Checks", activity: "Condition of rods for proper working" },
    { category: "Checks", activity: "Detection 2 MM / 5 MM" },
    { category: "Checks", activity: "Presence of Oil / Moisture" },
    { category: "Checks", activity: "Turnout itself in good condition" },
    { category: "Checks", activity: "Blades and Stock-Rails in good condition" },
    { category: "Checks", activity: "Absence of any abnormal appearance" },
    { category: "Checks", activity: "Absence of ballast & debris obstructing the movement of Claw Locks" }
  ];

  // Monthly maintenance activities
  const monthlyActivities = [
    { category: "Cleaning and Lubrication", activity: "Cleaning of commutator" },
    { category: "Cleaning and Lubrication", activity: "Incoming Power Cable" },
    { category: "Cleaning and Lubrication", activity: "Visual Inspection of Electrical Contacts Assembly for accumulation of carbon" },
    { category: "Cleaning and Lubrication", activity: "External adequate Lubrication" },
    { category: "Cleaning and Lubrication", activity: "Electrical Connections" },
    { category: "Cleaning and Lubrication", activity: "Quarterly Use Manual operation" },
    { category: "Cleaning and Lubrication", activity: "Detection Contacts & Rollers-Visual check" }
  ];

  // Claw locks maintenance activities
  const clawLocksActivities = [
    { category: "Maintenance of Claw Locks", activity: "Checking wearing of Claw-Locks" },
    { category: "Maintenance of Claw Locks", activity: "Cleaning and Lubrication" },
    { category: "Maintenance of Claw Locks", activity: "Cleaning of surplus of old grease and dust" },
    { category: "Maintenance of Claw Locks", activity: "Greasing of Locking Parts corridors" },
    { category: "Maintenance of Claw Locks", activity: "Greasing of Sliding surfaces of Locking Clips" },
    { category: "Maintenance of Claw Locks", activity: "Greasing of eccentric axle (With a M10 Greaser & Grease Gun)" }
  ];

  // Measurement activities
  const measurementActivities = [
    { category: "Measurements", activity: "Measurement of peak current (N)", unit: "A" },
    { category: "Measurements", activity: "Measurement of peak current (R)", unit: "A" },
    { category: "Measurements", activity: "Measurement of working current (N)", unit: "A" },
    { category: "Measurements", activity: "Measurement of working current (R)", unit: "A" },
    { category: "Measurements", activity: "Measurement of obstruction current (N)", unit: "A" },
    { category: "Measurements", activity: "Measurement of obstruction current (R)", unit: "A" }
  ];

  const [activityData, setActivityData] = useState({
    biweekly: biweeklyActivities.map(activity => ({
      ...activity,
      status: '',
      measurement: '',
      remarks: ''
    })),
    monthly: monthlyActivities.map(activity => ({
      ...activity,
      status: '',
      measurement: '',
      remarks: ''
    })),
    clawLocks: clawLocksActivities.map(activity => ({
      ...activity,
      status: '',
      measurement: '',
      remarks: ''
    })),
    measurements: measurementActivities.map(activity => ({
      ...activity,
      status: '',
      measurement: '',
      remarks: ''
    }))
  });

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.station) {
      newErrors.station = 'Station is required';
    }
    if (!formData.pointNo) {
      newErrors.pointNo = 'Point number is required';
    }
    if (!formData.name) {
      newErrors.name = 'Technician name is required';
    }
    if (!formData.empNo) {
      newErrors.empNo = 'Employee number is required';
    }

    // Employee ID validation
    const empIdPattern = /^[A-Z]{2,3}\d{4,6}$/;
    if (formData.empNo && !empIdPattern.test(formData.empNo)) {
      newErrors.empNo = 'Employee ID should be 2-3 letters followed by 4-6 digits (e.g., ABC1234)';
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

  const handleActivityChange = (type, index, field, value) => {
    setActivityData(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
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
        formType: 'pm-point-machine-maintenance-record',
        department: 'Signalling',
        submittedBy: user?.name || 'Unknown User',
        submittedAt: new Date().toISOString(),
        ...formData,
        activities: activityData
      };

      console.log('PM Point Machine Maintenance Data:', submissionData);
      
      // Here you would dispatch to your Redux store or make API call
      // dispatch(savePMPointMachineData(submissionData));
      
      toast.success('PM Point Machine maintenance record saved successfully!');
      // navigate('/signalling/pm-point-machine-list');
      
    } catch (error) {
      console.error('Error saving PM record:', error);
      toast.error('Failed to save PM record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      date: '',
      station: '',
      pointNo: '',
      ektNo: '',
      ixl: '',
      periodicity: 'Biweekly',
      biweeklyMonth: '',
      monthlyMonth: '',
      quarterlyRange: '',
      halfYearlyRange: '',
      name: '',
      designation: '',
      empNo: '',
      signature: '',
      csign: '',
      remarks: ''
    });
    setActivityData({
      biweekly: biweeklyActivities.map(activity => ({
        ...activity,
        status: '',
        measurement: '',
        remarks: ''
      })),
      monthly: monthlyActivities.map(activity => ({
        ...activity,
        status: '',
        measurement: '',
        remarks: ''
      })),
      clawLocks: clawLocksActivities.map(activity => ({
        ...activity,
        status: '',
        measurement: '',
        remarks: ''
      })),
      measurements: measurementActivities.map(activity => ({
        ...activity,
        status: '',
        measurement: '',
        remarks: ''
      }))
    });
    setErrors({});
    toast.info('Form reset successfully');
  };

  const renderActivitySection = (title, activities, type) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-50">
            <tr>
              <th className="border border-gray-300 px-2 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-2 py-2 text-left">Activity</th>
              <th className="border border-gray-300 px-2 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-2 py-2 text-left">Measurement</th>
              <th className="border border-gray-300 px-2 py-2 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-2 text-sm font-semibold">
                  {activity.category}
                </td>
                <td className="border border-gray-300 px-2 py-2 text-sm">
                  {activity.activity}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <UniversalSignallingFormField
                    type="select"
                    value={activity.status}
                    onChange={(value) => handleActivityChange(type, index, 'status', value)}
                    options={[
                      { value: '', label: 'Select Status' },
                      { value: 'OK', label: 'OK' },
                      { value: 'Not OK', label: 'Not OK' },
                      { value: 'N/A', label: 'N/A' },
                      { value: 'Repaired', label: 'Repaired' }
                    ]}
                    className="w-full text-sm"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <UniversalSignallingFormField
                    type="text"
                    value={activity.measurement}
                    onChange={(value) => handleActivityChange(type, index, 'measurement', value)}
                    placeholder={activity.unit ? `Enter value (${activity.unit})` : "Enter value"}
                    className="w-full text-sm"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <UniversalSignallingFormField
                    type="textarea"
                    value={activity.remarks}
                    onChange={(value) => handleActivityChange(type, index, 'remarks', value)}
                    placeholder="Remarks"
                    rows={1}
                    className="w-full text-sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <SignallingFormLayout
      title="PM - Point Machine Maintenance Record (Depot Point Machine IRS)"
      description="Preventive Maintenance record for Point Machine with detailed activity tracking"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">Point Machine Information</h4>
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
              type="text"
              label="Station"
              value={formData.station}
              onChange={(value) => handleInputChange('station', value)}
              placeholder="Enter station name"
              required
              error={errors.station}
            />
            <UniversalSignallingFormField
              type="text"
              label="Point No."
              value={formData.pointNo}
              onChange={(value) => handleInputChange('pointNo', value)}
              placeholder="Enter point number"
              required
              error={errors.pointNo}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <UniversalSignallingFormField
              type="text"
              label="EKT No."
              value={formData.ektNo}
              onChange={(value) => handleInputChange('ektNo', value)}
              placeholder="Enter EKT number"
              error={errors.ektNo}
            />
            <UniversalSignallingFormField
              type="text"
              label="IXL"
              value={formData.ixl}
              onChange={(value) => handleInputChange('ixl', value)}
              placeholder="Enter IXL details"
              error={errors.ixl}
            />
          </div>
        </div>

        {/* Periodicity Selection */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-4">Maintenance Periodicity</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniversalSignallingFormField
              type="select"
              label="Periodicity"
              value={formData.periodicity}
              onChange={(value) => handleInputChange('periodicity', value)}
              options={[
                { value: 'Biweekly', label: 'Biweekly' },
                { value: 'Monthly', label: 'Monthly' },
                { value: 'Quarterly', label: 'Quarterly' },
                { value: 'Half Yearly', label: 'Half Yearly' }
              ]}
              required
              error={errors.periodicity}
            />
            {formData.periodicity === 'Biweekly' && (
              <UniversalSignallingFormField
                type="text"
                label="Biweekly Month"
                value={formData.biweeklyMonth}
                onChange={(value) => handleInputChange('biweeklyMonth', value)}
                placeholder="Enter month for biweekly maintenance"
                error={errors.biweeklyMonth}
              />
            )}
            {formData.periodicity === 'Monthly' && (
              <UniversalSignallingFormField
                type="text"
                label="Monthly Month"
                value={formData.monthlyMonth}
                onChange={(value) => handleInputChange('monthlyMonth', value)}
                placeholder="Enter month for monthly maintenance"
                error={errors.monthlyMonth}
              />
            )}
          </div>
        </div>

        {/* Maintenance Activities */}
        {formData.periodicity === 'Biweekly' && 
          renderActivitySection('Biweekly Maintenance Activities', activityData.biweekly, 'biweekly')
        }
        
        {formData.periodicity === 'Monthly' && 
          renderActivitySection('Monthly Maintenance Activities', activityData.monthly, 'monthly')
        }
        
        {renderActivitySection('Claw Locks Maintenance', activityData.clawLocks, 'clawLocks')}
        
        {renderActivitySection('Electrical Measurements', activityData.measurements, 'measurements')}

        {/* Technician Information */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-orange-800 mb-4">Technician Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Technician Name"
              value={formData.name}
              onChange={(value) => handleInputChange('name', value)}
              placeholder="Enter technician name"
              required
              error={errors.name}
            />
            <UniversalSignallingFormField
              type="text"
              label="Designation"
              value={formData.designation}
              onChange={(value) => handleInputChange('designation', value)}
              placeholder="Enter designation"
              error={errors.designation}
            />
            <UniversalSignallingFormField
              type="text"
              label="Employee No."
              value={formData.empNo}
              onChange={(value) => handleInputChange('empNo', value)}
              placeholder="e.g., ABC1234"
              required
              error={errors.empNo}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <UniversalSignallingFormField
              type="text"
              label="Signature"
              value={formData.signature}
              onChange={(value) => handleInputChange('signature', value)}
              placeholder="Digital signature/ID"
              error={errors.signature}
            />
            <UniversalSignallingFormField
              type="text"
              label="Controller Sign"
              value={formData.csign}
              onChange={(value) => handleInputChange('csign', value)}
              placeholder="Controller signature/ID"
              error={errors.csign}
            />
          </div>
        </div>

        {/* General Remarks */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-yellow-800 mb-4">General Remarks</h4>
          <UniversalSignallingFormField
            type="textarea"
            label="Remarks"
            value={formData.remarks}
            onChange={(value) => handleInputChange('remarks', value)}
            placeholder="Overall maintenance remarks and observations"
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
              'Save PM Record'
            )}
          </button>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default PMPointMachineMaintenanceRecordForm;