import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UniversalSignallingFormField from '../../../components/signalling/UniversalSignallingFormField';
import SignallingFormLayout from '../../../components/signalling/SignallingFormLayout';
import { addData } from '../../../reducer/rajiv/QuarterlyTrainInspection';

const QuarterlyTrainInspectionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STF-DL Antenna Inspection Activities
  const antennaActivities = [
    "General Condition of Metallic Support for fixing Dampers with Train Body",
    "Tightness of all screws and fixing of Metallic Support with train body",
    "Physical Condition of Dampers",
    "Tightness of all screws & fixing of Dampers with the Metallic support (Torque 19Nm)",
    "Screws lengths inside the dampers (must be <5mm)",
    "Tightness of all screws & Fixing of dampers with Lateral plates (Torque 19Nm)",
    "Fixing of STF-DL Antenna with the lateral plates & tightness of all screws (Torque 21Nm)",
    "Locking of the screws & availability of lock washers : Nord-Lock",
    "Physical Condition of STF-DL Antenna",
    "Fixing of grounding braid to the conductor point on the support",
    "Tightness of SAIB connector (STF-DL Antenna side)",
    "Tightness of SAIB connector (Car Body Side)",
    "Clamping of jumper cable",
    "STF-DL Antenna height from Rail Level Nominal=180 mm [105mm<Expected<225mm]",
    "Lateral Gap[Less than +/- 60 mm]",
    "Status of Tilting, Pitching & Yawning",
    "Object Free Zone around antenna [Dmin< 50mm]",
    "General Condition of STF-DL inter car jumper connector & jumper Cable (DMC-TC)"
  ];

  // Odometer Inspection Activities
  const odometerActivities = [
    "Physical Condition of Odometer",
    "Physical Condition of Odometer Cable",
    "Fixing & tightness all Allen screws of odometer (Torque 32Nm)",
    "General Condition of odometer inter car jumper connector & jumper Cable (DMC-TC)"
  ];

  const quarterlyRanges = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];

  const [formData, setFormData] = useState({
    // Basic Information
    trainSet: "",
    date: new Date().toISOString().split('T')[0],
    quarterlyRange: "Jan-Mar",
    
    // Antenna Activities - CC1 and CC2 cars
    antennaActivities: antennaActivities.map(() => ({
      CC1: "",
      CC2: "",
      remarks: ""
    })),
    
    // Odometer Activities - CC1 and CC2 cars
    odometerActivities: odometerActivities.map(() => ({
      CC1: "",
      CC2: "",
      remarks: ""
    })),
    
    // Section remarks
    antennaRemarks: "",
    odometerRemarks: "",
    
    // Personnel Information
    signature: "",
    name: "",
    designation: "",
    empcsign: "",
    
    // System fields
    slug: "quarterly-train-inspection",
    formType: "quarterly_train_inspection",
    department: "signalling"
  });

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleActivityChange = (section, index, car, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((activity, i) =>
        i === index ? { ...activity, [car]: value } : activity
      )
    }));
  };

  const handleActivityRemarkChange = (section, index, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((activity, i) =>
        i === index ? { ...activity, remarks: value } : activity
      )
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.trainSet.trim()) errors.push("Train Set is required");
    if (!formData.empid.trim()) errors.push("Employee ID is required");
    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.designation.trim()) errors.push("Designation is required");

    // Validate employee ID format
    const empPattern = /^[A-Z]{2,3}\d{4,5}$/;
    if (formData.empid && !empPattern.test(formData.empid)) {
      errors.push("Employee ID format should be like ABC1234");
    }

    // Check if at least 80% of antenna activities are completed
    const antennaCompleted = formData.antennaActivities.filter(activity => 
      activity.CC1 || activity.CC2
    ).length;
    
    const antennaCompletionPercentage = (antennaCompleted / antennaActivities.length) * 100;
    if (antennaCompletionPercentage < 80) {
      errors.push("At least 80% of antenna inspection activities must be completed");
    }

    // Check if at least 80% of odometer activities are completed  
    const odometerCompleted = formData.odometerActivities.filter(activity =>
      activity.CC1 || activity.CC2
    ).length;
    
    const odometerCompletionPercentage = (odometerCompleted / odometerActivities.length) * 100;
    if (odometerCompletionPercentage < 80) {
      errors.push("At least 80% of odometer inspection activities must be completed");
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

    // Prepare data for submission in legacy format
    const submissionData = {
        // FIXED: Remove client-side IDs - form_id is auto-generated by database
      ...formData,
      // Legacy format compatibility
      quarterly1: formData.antennaActivities.map(activity => ({
        range: formData.quarterlyRange,
        CC1: activity.CC1,
        CC2: activity.CC2
      })),
      quarterly2: formData.odometerActivities.map(activity => ({
        range: formData.quarterlyRange,
        CC1: activity.CC1,
        CC2: activity.CC2
      })),
      qActivity1Remarks: formData.antennaRemarks,
      qActivity2Remarks: formData.odometerRemarks
    };

    dispatch(addData(submissionData));
    toast.success("Quarterly Train Inspection Record saved successfully!");
    navigate(`/list/${formData.slug}`);
  };

  // Calculate completion statistics
  const completionStats = useMemo(() => {
    const antennaCompleted = formData.antennaActivities.filter(a => a.CC1 || a.CC2).length;
    const odometerCompleted = formData.odometerActivities.filter(a => a.CC1 || a.CC2).length;
    const totalCompleted = antennaCompleted + odometerCompleted;
    const totalActivities = antennaActivities.length + odometerActivities.length;
    
    const antennaCritical = formData.antennaActivities.filter(a => 
      a.CC1 === 'not Ok' || a.CC2 === 'not Ok'
    ).length;
    const odometerCritical = formData.odometerActivities.filter(a =>
      a.CC1 === 'not Ok' || a.CC2 === 'not Ok'
    ).length;
    
    const percentage = Math.round((totalCompleted / totalActivities) * 100);
    
    return { 
      completed: totalCompleted, 
      total: totalActivities, 
      critical: antennaCritical + odometerCritical, 
      percentage 
    };
  }, [formData.antennaActivities, formData.odometerActivities]);

  const renderActivitySection = (title, activities, section, sectionKey) => (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>
      
      {/* Headers */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex-1"></div>
        <div className="flex gap-4 items-center text-sm font-medium text-gray-600">
          <span className="w-16 text-center">CC1</span>
          <span className="w-16 text-center">CC2</span>
          <span className="w-32 text-center">Remarks</span>
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="bg-white p-3 rounded border">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800">
                  {index + 1}. {activity}
                </span>
              </div>
              
              <div className="flex gap-2 items-center">
                <select
                  value={formData[section][index].CC1}
                  onChange={(e) => handleActivityChange(section, index, 'CC1', e.target.value)}
                  className="px-2 py-1 border rounded text-sm w-16"
                >
                  <option value="">-</option>
                  <option value="ok">Ok</option>
                  <option value="not Ok">Not Ok</option>
                </select>
                
                <select
                  value={formData[section][index].CC2}
                  onChange={(e) => handleActivityChange(section, index, 'CC2', e.target.value)}
                  className="px-2 py-1 border rounded text-sm w-16"
                >
                  <option value="">-</option>
                  <option value="ok">Ok</option>
                  <option value="not Ok">Not Ok</option>
                </select>
                
                <input
                  type="text"
                  placeholder="Activity remarks"
                  value={formData[section][index].remarks}
                  onChange={(e) => handleActivityRemarkChange(section, index, e.target.value)}
                  className="px-2 py-1 border rounded text-sm w-32"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Section Remarks */}
      <div className="mt-4">
        <UniversalSignallingFormField
          label={`${title} - Overall Remarks`}
          type="textarea"
          value={formData[sectionKey]}
          onChange={(value) => handleFieldChange(sectionKey, value)}
          placeholder={`Overall remarks for ${title.toLowerCase()}...`}
          rows="2"
        />
      </div>
    </div>
  );

  const breadcrumbs = [
    { label: 'Signalling', href: '/departments/signalling' },
    { label: 'PM Maintenance', href: '/departments/signalling/pm-maintenance' },
    { label: 'Quarterly ATC On-board Inspection', href: null }
  ];

  return (
    <SignallingFormLayout
      title="Quarterly On-board ATC Underframe Inspection"
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
            <div className="text-sm text-gray-600">Not OK Items</div>
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
          label="Train Set"
          type="text"
          value={formData.trainSet}
          onChange={(value) => handleFieldChange('trainSet', value)}
          placeholder="e.g., TS-001"
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
          label="Inspection Date"
          type="date"
          value={formData.date}
          onChange={(value) => handleFieldChange('date', value)}
          required
        />
      </div>

      {/* Activity Note */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Activity:</strong> ATC On-board Inspection - Underframe
            </p>
            <p className="text-xs text-yellow-600 mt-1">
              Inspect both CC1 and CC2 cars for each activity. Mark activities as "Ok" or "Not Ok" and add specific remarks where needed.
            </p>
          </div>
        </div>
      </div>

      {/* Inspection Activities */}
      <div className="space-y-6">
        {renderActivitySection(
          "I) Underframe STF-DL Antenna Inspection",
          antennaActivities,
          "antennaActivities",
          "antennaRemarks"
        )}
        
        {renderActivitySection(
          "II) Underframe Odometer Inspection",
          odometerActivities,
          "odometerActivities",
          "odometerRemarks"
        )}
      </div>

      {/* Personnel Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t">
        <UniversalSignallingFormField
          label="Employee ID"
          type="text"
          value={formData.empid}
          onChange={(value) => handleFieldChange('empid', value)}
          placeholder="ABC1234"
          required
        />
        
        <UniversalSignallingFormField
          label="Inspector Name"
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

      {/* Counter Sign */}
      <div className="mt-4">
        <UniversalSignallingFormField
          label="Counter Sign (Supervisor)"
          type="text"
          value={formData.csign}
          onChange={(value) => handleFieldChange('csign', value)}
          placeholder="Supervisor signature or initial"
        />
      </div>
    </SignallingFormLayout>
  );
};

export default QuarterlyTrainInspectionForm;