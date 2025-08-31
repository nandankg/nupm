import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UniversalSignallingFormField from '../../../components/signalling/UniversalSignallingFormField';
import SignallingFormLayout from '../../../components/signalling/SignallingFormLayout';
import { addData } from '../../../reducer/manshi/ShuntReducer';

const ShuntSignalMaintenanceRecordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Quarterly maintenance activities with their requirements
  const quarterlyActivities = [
    { label: "Cleaning of Aspect Housing & LED Unit", type: "status", category: "cleaning" },
    { label: "LED Functioning", type: "status", category: "electrical" },
    { label: "Earthing Verification", type: "status", category: "electrical" },
    { label: "Cleaning of MSB", type: "status", category: "cleaning" },
    { label: "Tightening of all terminations inside MSB & Signal Unit", type: "status", category: "maintenance" },
    { label: "Proper illumination of LED", type: "status", category: "electrical" },
    { label: "Tightening of all Nuts & Bolts", type: "status", category: "maintenance" },
    { label: "Healthiness of all Supports, Brackets & Foundation etc.", type: "status", category: "structural" },
    { label: "Corrosion Observed/Painting Needed", type: "status", category: "structural" },
    { label: "Voltage Check in LED Unit Pivot Aspect", type: "measurement", category: "electrical", unit: "V" },
    { label: "Current Check in LED Unit Pivot Aspect", type: "measurement", category: "electrical", unit: "A" },
    { label: "Voltage Check in LED Unit ON Aspect", type: "measurement", category: "electrical", unit: "V" },
    { label: "Current Check in LED Unit ON Aspect", type: "measurement", category: "electrical", unit: "A" },
    { label: "Voltage Check in LED Unit OFF Aspect", type: "measurement", category: "electrical", unit: "V" },
    { label: "Current Check in LED Unit OFF Aspect", type: "measurement", category: "electrical", unit: "A" }
  ];

  const quarterlyRanges = [
    "January-March",
    "April-June", 
    "July-September",
    "October-December"
  ];

  const [formData, setFormData] = useState({
    // Basic Information
    date: new Date().toISOString().split('T')[0],
    quarterlyRange: "January-March",
    signalNo: "",
    ixl: "",
    
    // Activity Data
    activities: quarterlyActivities.map(() => ({
      status: "",
      value: "",
      unit: "",
      remarks: ""
    })),
    
    // Form completion
    overallRemarks: "",
    signature: "",
    name: "",
    designation: "",
    empno: "",
    csign: "",
    
    // System fields
    slug: "shunt-signal-maintenance",
    formType: "shunt_signal_maintenance",
    department: "signalling"
  });

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleActivityChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.map((activity, i) =>
        i === index ? { ...activity, [field]: value } : activity
      )
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.signalNo.trim()) errors.push("Signal Number is required");
    if (!formData.empno.trim()) errors.push("Employee Number is required");
    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.designation.trim()) errors.push("Designation is required");

    // Validate employee number format
    const empPattern = /^[A-Z]{2,3}\d{4,5}$/;
    if (formData.empno && !empPattern.test(formData.empno)) {
      errors.push("Employee Number format should be like ABC1234");
    }

    // Check if at least 80% of activities are completed
    const completedActivities = formData.activities.filter(activity => 
      activity.status || activity.value
    ).length;
    
    const completionPercentage = (completedActivities / quarterlyActivities.length) * 100;
    if (completionPercentage < 80) {
      errors.push("At least 80% of maintenance activities must be completed");
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      toast.error(`Form validation failed:\n${errors.join('\n')}`);
      return;
    }

    // Prepare data for submission
    const submissionData = {
      ...formData,
      // Legacy format compatibility
      quarterly: formData.activities.map(activity => ({
        date: formData.date,
        unit: activity.unit,
        val: activity.status || activity.value
      })),
      remarks: formData.overallRemarks,
      V1: formData.date
    };

    dispatch(addData(submissionData));
    toast.success("Shunt Signal Maintenance Record saved successfully!");
    navigate(`/list/${formData.slug}`);
  };

  // Calculate completion statistics
  const completionStats = useMemo(() => {
    const completed = formData.activities.filter(a => a.status || a.value).length;
    const critical = formData.activities.filter(a => a.status === 'Not OK').length;
    const percentage = Math.round((completed / quarterlyActivities.length) * 100);
    
    return { completed, total: quarterlyActivities.length, critical, percentage };
  }, [formData.activities]);

  const renderActivitySection = (title, activities, categoryFilter) => {
    const filteredActivities = activities
      .map((activity, index) => ({ ...activity, originalIndex: index }))
      .filter(activity => activity.category === categoryFilter);

    if (filteredActivities.length === 0) return null;

    return (
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
        <div className="space-y-3">
          {filteredActivities.map(({ label, type, unit, originalIndex }) => (
            <div key={originalIndex} className="bg-white p-3 rounded border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-800">
                    {originalIndex + 1}. {label}
                  </span>
                </div>
                
                <div className="flex gap-2 items-center">
                  {type === "status" ? (
                    <select
                      value={formData.activities[originalIndex].status}
                      onChange={(e) => handleActivityChange(originalIndex, 'status', e.target.value)}
                      className="px-2 py-1 border rounded text-sm min-w-[100px]"
                    >
                      <option value="">Select</option>
                      {(originalIndex === 0 || originalIndex === 3 || originalIndex === 6) ? (
                        <>
                          <option value="Done">Done</option>
                          <option value="Not Done">Not Done</option>
                          <option value="NA">NA</option>
                        </>
                      ) : (
                        <>
                          <option value="OK">OK</option>
                          <option value="Not OK">Not OK</option>
                        </>
                      )}
                    </select>
                  ) : (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Value"
                        value={formData.activities[originalIndex].value}
                        onChange={(e) => handleActivityChange(originalIndex, 'value', e.target.value)}
                        className="px-2 py-1 border rounded text-sm w-20"
                      />
                      <span className="text-xs text-gray-600">{unit}</span>
                    </div>
                  )}
                  
                  <input
                    type="text"
                    placeholder="Remarks"
                    value={formData.activities[originalIndex].remarks}
                    onChange={(e) => handleActivityChange(originalIndex, 'remarks', e.target.value)}
                    className="px-2 py-1 border rounded text-sm w-32"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const breadcrumbs = [
    { label: 'Signalling', href: '/departments/signalling' },
    { label: 'PM Maintenance', href: '/departments/signalling/pm-maintenance' },
    { label: 'Shunt Signal Maintenance Record', href: null }
  ];

  return (
    <SignallingFormLayout
      title="Shunt Signal Maintenance Record - Quarterly"
      breadcrumbs={breadcrumbs}
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto"
    >
      {/* Status Dashboard */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{completionStats.percentage}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completionStats.completed}</div>
            <div className="text-sm text-gray-600">Activities Done</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{completionStats.critical}</div>
            <div className="text-sm text-gray-600">Not OK</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{completionStats.total}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <UniversalSignallingFormField
          label="Date"
          type="date"
          value={formData.date}
          onChange={(value) => handleFieldChange('date', value)}
          required
        />
        
        <UniversalSignallingFormField
          label="Quarterly Period"
          type="select"
          value={formData.quarterlyRange}
          onChange={(value) => handleFieldChange('quarterlyRange', value)}
          options={quarterlyRanges.map(range => ({ value: range, label: range }))}
          required
        />
        
        <UniversalSignallingFormField
          label="Signal Number"
          type="text"
          value={formData.signalNo}
          onChange={(value) => handleFieldChange('signalNo', value)}
          placeholder="e.g., SH-01"
          required
        />
      </div>

      {/* Maintenance Activities by Category */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Maintenance Activities</h3>
        
        {renderActivitySection("Cleaning Activities", quarterlyActivities, "cleaning")}
        {renderActivitySection("Electrical Checks", quarterlyActivities, "electrical")}
        {renderActivitySection("Mechanical Maintenance", quarterlyActivities, "maintenance")}
        {renderActivitySection("Structural Inspection", quarterlyActivities, "structural")}
      </div>

      {/* Overall Remarks */}
      <div className="mt-6">
        <UniversalSignallingFormField
          label="Overall Remarks"
          type="textarea"
          value={formData.overallRemarks}
          onChange={(value) => handleFieldChange('overallRemarks', value)}
          placeholder="Any additional observations or maintenance notes..."
          rows="3"
        />
      </div>

      {/* Personnel Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <UniversalSignallingFormField
          label="Employee Number"
          type="text"
          value={formData.empno}
          onChange={(value) => handleFieldChange('empno', value)}
          placeholder="ABC1234"
          required
        />
        
        <UniversalSignallingFormField
          label="Name"
          type="text"
          value={formData.name}
          onChange={(value) => handleFieldChange('name', value)}
          required
        />
        
        <UniversalSignallingFormField
          label="Designation"
          type="text"
          value={formData.designation}
          onChange={(value) => handleFieldChange('designation', value)}
          placeholder="e.g., Sr. Technician"
          required
        />
        
        <UniversalSignallingFormField
          label="Signature"
          type="text"
          value={formData.signature}
          onChange={(value) => handleFieldChange('signature', value)}
          placeholder="Digital signature or initial"
        />
      </div>
    </SignallingFormLayout>
  );
};

export default ShuntSignalMaintenanceRecordForm;