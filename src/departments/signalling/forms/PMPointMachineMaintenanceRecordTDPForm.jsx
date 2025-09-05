import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UniversalSignallingFormField, SignallingFormLayout } from '../components';
import { pmPointMachineTDPValidationSchema } from '../validation/signallingValidationSchemas';

const PMPointMachineMaintenanceRecordTDPForm = () => {
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
    tdpLocation: '',
    tdpType: 'Outdoor',
    tdpModel: '',
    installationDate: '',
    lastMaintenanceDate: '',
    periodicity: 'Monthly',
    maintenanceType: 'Routine',
    name: '',
    designation: '',
    empNo: '',
    signature: '',
    supervisorName: '',
    supervisorSign: '',
    remarks: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // TDP-specific maintenance activities
  const tdpMaintenanceActivities = [
    { category: "Visual Inspection", activity: "Check TDP housing for physical damage", critical: true },
    { category: "Visual Inspection", activity: "Inspect cable connections and terminations", critical: true },
    { category: "Visual Inspection", activity: "Check for water ingress or moisture", critical: true },
    { category: "Visual Inspection", activity: "Verify proper sealing of enclosure", critical: false },
    { category: "Electrical Tests", activity: "Test input voltage levels", critical: true, unit: "V" },
    { category: "Electrical Tests", activity: "Test output current levels", critical: true, unit: "A" },
    { category: "Electrical Tests", activity: "Check insulation resistance", critical: true, unit: "MΩ" },
    { category: "Electrical Tests", activity: "Verify earth continuity", critical: true, unit: "Ω" },
    { category: "Functional Tests", activity: "Test normal point operation", critical: true },
    { category: "Functional Tests", activity: "Test reverse point operation", critical: true },
    { category: "Functional Tests", activity: "Check detection circuits", critical: true },
    { category: "Functional Tests", activity: "Test indication feedback", critical: false },
    { category: "Mechanical Checks", activity: "Check TDP mounting and fixings", critical: true },
    { category: "Mechanical Checks", activity: "Inspect drive mechanism operation", critical: true },
    { category: "Mechanical Checks", activity: "Check mechanical travel limits", critical: true },
    { category: "Mechanical Checks", activity: "Verify locking mechanism", critical: true },
    { category: "Maintenance", activity: "Clean internal components", critical: false },
    { category: "Maintenance", activity: "Apply appropriate lubrication", critical: false },
    { category: "Maintenance", activity: "Tighten loose connections", critical: true },
    { category: "Maintenance", activity: "Replace worn components if necessary", critical: false }
  ];

  const [activityData, setActivityData] = useState(
    tdpMaintenanceActivities.map(activity => ({
      ...activity,
      status: '',
      measurement: '',
      action: '',
      remarks: ''
    }))
  );

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
    if (!formData.tdpLocation) {
      newErrors.tdpLocation = 'TDP location is required';
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

    // Date validation
    if (formData.installationDate && formData.lastMaintenanceDate) {
      const installDate = new Date(formData.installationDate);
      const lastMaintDate = new Date(formData.lastMaintenanceDate);
      if (lastMaintDate < installDate) {
        newErrors.lastMaintenanceDate = 'Last maintenance date cannot be before installation date';
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

  const handleActivityChange = (index, field, value) => {
    setActivityData(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    );
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
        // FIXED: Remove client-side IDs - form_id is auto-generated by database
        formType: 'pm-point-machine-maintenance-record-tdp',
        department: 'Signalling',
        submittedBy: user?.name || 'Unknown User',
        submittedAt: new Date().toISOString(),
        ...formData,
        activities: activityData,
        criticalIssuesCount: activityData.filter(a => a.critical && a.status === 'Not OK').length,
        completionPercentage: Math.round((activityData.filter(a => a.status !== '').length / activityData.length) * 100)
      };

      console.log('PM Point Machine TDP Maintenance Data:', submissionData);
      
      // Here you would dispatch to your Redux store or make API call
      // dispatch(savePMPointMachineTDPData(submissionData));
      
      toast.success('PM Point Machine TDP maintenance record saved successfully!');
      // navigate('/signalling/pm-point-machine-tdp-list');
      
    } catch (error) {
      console.error('Error saving PM TDP record:', error);
      toast.error('Failed to save PM TDP record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      date: '',
      station: '',
      pointNo: '',
      tdpLocation: '',
      tdpType: 'Outdoor',
      tdpModel: '',
      installationDate: '',
      lastMaintenanceDate: '',
      periodicity: 'Monthly',
      maintenanceType: 'Routine',
      name: '',
      designation: '',
      empNo: '',
      signature: '',
      supervisorName: '',
      supervisorSign: '',
      remarks: ''
    });
    setActivityData(
      tdpMaintenanceActivities.map(activity => ({
        ...activity,
        status: '',
        measurement: '',
        action: '',
        remarks: ''
      }))
    );
    setErrors({});
    toast.info('Form reset successfully');
  };

  const criticalIssues = activityData.filter(a => a.critical && a.status === 'Not OK').length;
  const completionPercentage = Math.round((activityData.filter(a => a.status !== '').length / activityData.length) * 100);

  return (
    <SignallingFormLayout
      title="PM - Point Machine Maintenance Record TDP"
      description="Preventive Maintenance record for Track Drive Point (TDP) machine with comprehensive testing"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">TDP Information</h4>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <UniversalSignallingFormField
              type="text"
              label="TDP Location"
              value={formData.tdpLocation}
              onChange={(value) => handleInputChange('tdpLocation', value)}
              placeholder="Enter TDP location"
              required
              error={errors.tdpLocation}
            />
            <UniversalSignallingFormField
              type="select"
              label="TDP Type"
              value={formData.tdpType}
              onChange={(value) => handleInputChange('tdpType', value)}
              options={[
                { value: 'Outdoor', label: 'Outdoor' },
                { value: 'Indoor', label: 'Indoor' },
                { value: 'Weatherproof', label: 'Weatherproof' }
              ]}
              error={errors.tdpType}
            />
            <UniversalSignallingFormField
              type="text"
              label="TDP Model"
              value={formData.tdpModel}
              onChange={(value) => handleInputChange('tdpModel', value)}
              placeholder="Enter TDP model"
              error={errors.tdpModel}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <UniversalSignallingFormField
              type="text"
              label="Serial Number"
              value={formData.serialNumber}
              onChange={(value) => handleInputChange('serialNumber', value)}
              placeholder="Enter serial number"
              error={errors.serialNumber}
            />
            <UniversalSignallingFormField
              type="date"
              label="Installation Date"
              value={formData.installationDate}
              onChange={(value) => handleInputChange('installationDate', value)}
              error={errors.installationDate}
            />
            <UniversalSignallingFormField
              type="date"
              label="Last Maintenance Date"
              value={formData.lastMaintenanceDate}
              onChange={(value) => handleInputChange('lastMaintenanceDate', value)}
              error={errors.lastMaintenanceDate}
            />
          </div>
        </div>

        {/* Maintenance Configuration */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-4">Maintenance Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniversalSignallingFormField
              type="select"
              label="Periodicity"
              value={formData.periodicity}
              onChange={(value) => handleInputChange('periodicity', value)}
              options={[
                { value: 'Weekly', label: 'Weekly' },
                { value: 'Monthly', label: 'Monthly' },
                { value: 'Quarterly', label: 'Quarterly' },
                { value: 'Half Yearly', label: 'Half Yearly' }
              ]}
              error={errors.periodicity}
            />
            <UniversalSignallingFormField
              type="select"
              label="Maintenance Type"
              value={formData.maintenanceType}
              onChange={(value) => handleInputChange('maintenanceType', value)}
              options={[
                { value: 'Routine', label: 'Routine' },
                { value: 'Preventive', label: 'Preventive' },
                { value: 'Corrective', label: 'Corrective' },
                { value: 'Emergency', label: 'Emergency' }
              ]}
              error={errors.maintenanceType}
            />
          </div>
        </div>

        {/* Status Dashboard */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-yellow-800 mb-4">Maintenance Status</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{completionPercentage}%</div>
              <div className="text-sm text-gray-600">Completion</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${criticalIssues > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {criticalIssues}
              </div>
              <div className="text-sm text-gray-600">Critical Issues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {activityData.filter(a => a.action).length}
              </div>
              <div className="text-sm text-gray-600">Actions Required</div>
            </div>
          </div>
        </div>

        {/* TDP Maintenance Activities */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">TDP Maintenance Activities</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 text-left">Category</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Activity</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Critical</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Status</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Measurement</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Action Required</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((activity, index) => (
                  <tr key={index} className={`hover:bg-gray-50 ${activity.critical ? 'bg-red-50' : ''}`}>
                    <td className="border border-gray-300 px-2 py-2 text-sm font-semibold">
                      {activity.category}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-sm">
                      {activity.activity}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      {activity.critical ? (
                        <span className="text-red-600 font-bold">●</span>
                      ) : (
                        <span className="text-gray-400">○</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <UniversalSignallingFormField
                        type="select"
                        value={activity.status}
                        onChange={(value) => handleActivityChange(index, 'status', value)}
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
                        onChange={(value) => handleActivityChange(index, 'measurement', value)}
                        placeholder={activity.unit ? `Value (${activity.unit})` : "Value"}
                        className="w-full text-sm"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <UniversalSignallingFormField
                        type="textarea"
                        value={activity.action}
                        onChange={(value) => handleActivityChange(index, 'action', value)}
                        placeholder="Action required"
                        rows={1}
                        className="w-full text-sm"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <UniversalSignallingFormField
                        type="textarea"
                        value={activity.remarks}
                        onChange={(value) => handleActivityChange(index, 'remarks', value)}
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

        {/* Technician Information */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-orange-800 mb-4">Personnel Information</h4>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <UniversalSignallingFormField
              type="text"
              label="Technician Signature"
              value={formData.signature}
              onChange={(value) => handleInputChange('signature', value)}
              placeholder="Digital signature/ID"
              error={errors.signature}
            />
            <UniversalSignallingFormField
              type="text"
              label="Supervisor Name"
              value={formData.supervisorName}
              onChange={(value) => handleInputChange('supervisorName', value)}
              placeholder="Enter supervisor name"
              error={errors.supervisorName}
            />
            <UniversalSignallingFormField
              type="text"
              label="Supervisor Signature"
              value={formData.supervisorSign}
              onChange={(value) => handleInputChange('supervisorSign', value)}
              placeholder="Supervisor signature/ID"
              error={errors.supervisorSign}
            />
          </div>
        </div>

        {/* General Remarks */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-purple-800 mb-4">Overall Assessment</h4>
          <UniversalSignallingFormField
            type="textarea"
            label="General Remarks"
            value={formData.remarks}
            onChange={(value) => handleInputChange('remarks', value)}
            placeholder="Overall TDP condition, recommendations, and any additional observations"
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
              'Save TDP PM Record'
            )}
          </button>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default PMPointMachineMaintenanceRecordTDPForm;