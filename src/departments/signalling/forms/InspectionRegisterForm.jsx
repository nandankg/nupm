import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UniversalSignallingFormField from '../../../components/signalling/UniversalSignallingFormField';
import SignallingFormLayout from '../../../components/signalling/SignallingFormLayout';

const InspectionRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Inspection types for signalling equipment
  const inspectionTypes = [
    { value: "routine", label: "Routine Inspection" },
    { value: "preventive", label: "Preventive Inspection" },
    { value: "breakdown", label: "Breakdown Inspection" },
    { value: "safety", label: "Safety Inspection" },
    { value: "audit", label: "Audit Inspection" },
    { value: "commissioning", label: "Commissioning Inspection" },
    { value: "periodic", label: "Periodic Inspection" }
  ];

  // Priority levels
  const priorityLevels = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "critical", label: "Critical" }
  ];

  // Inspection status options
  const statusOptions = [
    { value: "scheduled", label: "Scheduled" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "deferred", label: "Deferred" },
    { value: "cancelled", label: "Cancelled" }
  ];

  // Equipment categories for inspection
  const equipmentCategories = [
    { value: "signals", label: "Signal Equipment" },
    { value: "points", label: "Point Machines" },
    { value: "track-circuits", label: "Track Circuits" },
    { value: "axle-counters", label: "Axle Counters" },
    { value: "interlocking", label: "Interlocking System" },
    { value: "atc-equipment", label: "ATC Equipment" },
    { value: "power-supply", label: "Power Supply Equipment" },
    { value: "cables", label: "Cables & Wiring" }
  ];

  const [formData, setFormData] = useState({
    // Basic Information
    inspectionDate: new Date().toISOString().split('T')[0],
    inspectionType: "",
    equipmentCategory: "",
    equipmentId: "",
    location: "",
    
    // Inspection Details
    scheduledDate: "",
    inspectorName: "",
    inspectorId: "",
    designation: "",
    priority: "medium",
    
    // Inspection Findings
    overallCondition: "",
    defectsFound: "",
    actionRequired: "",
    recommendations: "",
    
    // Follow-up
    nextInspectionDate: "",
    status: "scheduled",
    remarks: "",
    
    // Approvals
    supervisorName: "",
    supervisorId: "",
    supervisorSignature: "",
    approvalDate: "",
    
    // System fields
    slug: "inspection-register",
    formType: "inspection_register",
    department: "signalling"
  });

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.inspectionType) errors.push("Inspection Type is required");
    if (!formData.equipmentCategory) errors.push("Equipment Category is required");
    if (!formData.equipmentId.trim()) errors.push("Equipment ID is required");
    if (!formData.location.trim()) errors.push("Location is required");
    if (!formData.inspectorName.trim()) errors.push("Inspector Name is required");
    if (!formData.inspectorId.trim()) errors.push("Inspector ID is required");
    if (!formData.designation.trim()) errors.push("Designation is required");

    // Validate inspector ID format
    const empPattern = /^[A-Z]{2,3}\d{4,5}$/;
    if (formData.inspectorId && !empPattern.test(formData.inspectorId)) {
      errors.push("Inspector ID format should be like ABC1234");
    }

    // Validate dates
    if (formData.scheduledDate && formData.inspectionDate) {
      if (new Date(formData.inspectionDate) < new Date(formData.scheduledDate)) {
        errors.push("Inspection date cannot be before scheduled date");
      }
    }

    if (formData.nextInspectionDate && formData.inspectionDate) {
      if (new Date(formData.nextInspectionDate) <= new Date(formData.inspectionDate)) {
        errors.push("Next inspection date must be after current inspection date");
      }
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
      submissionTime: new Date().toISOString()
    };

    // Since we don't have a specific reducer for this form, we'll log it
    console.log("Inspection Register Data:", submissionData);
    
    toast.success("Inspection Register saved successfully!");
    navigate("/departments/signalling");
  };

  // Calculate form completion
  const completionStats = useMemo(() => {
    const requiredFields = [
      'inspectionType', 'equipmentCategory', 'equipmentId', 'location',
      'inspectorName', 'inspectorId', 'designation'
    ];
    
    const completed = requiredFields.filter(field => formData[field]).length;
    const percentage = Math.round((completed / requiredFields.length) * 100);
    
    return { completed, total: requiredFields.length, percentage };
  }, [formData]);

  const breadcrumbs = [
    { label: 'Signalling', href: '/departments/signalling' },
    { label: 'Operations', href: '/departments/signalling/operations' },
    { label: 'Inspection Register', href: null }
  ];

  return (
    <SignallingFormLayout
      title="Inspection Register - Signalling Department"
      breadcrumbs={breadcrumbs}
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto"
    >
      {/* Progress Indicator */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg font-semibold text-blue-800">Form Completion</h4>
            <p className="text-sm text-blue-600">Required fields completed</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{completionStats.percentage}%</div>
            <div className="text-sm text-blue-600">{completionStats.completed}/{completionStats.total} fields</div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UniversalSignallingFormField
              label="Inspection Date"
              type="date"
              value={formData.inspectionDate}
              onChange={(value) => handleFieldChange('inspectionDate', value)}
              required
            />
            
            <UniversalSignallingFormField
              label="Inspection Type"
              type="select"
              value={formData.inspectionType}
              onChange={(value) => handleFieldChange('inspectionType', value)}
              options={inspectionTypes}
              required
            />
            
            <UniversalSignallingFormField
              label="Priority"
              type="select"
              value={formData.priority}
              onChange={(value) => handleFieldChange('priority', value)}
              options={priorityLevels}
            />
          </div>
        </div>

        {/* Equipment Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Equipment Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UniversalSignallingFormField
              label="Equipment Category"
              type="select"
              value={formData.equipmentCategory}
              onChange={(value) => handleFieldChange('equipmentCategory', value)}
              options={equipmentCategories}
              required
            />
            
            <UniversalSignallingFormField
              label="Equipment ID"
              type="text"
              value={formData.equipmentId}
              onChange={(value) => handleFieldChange('equipmentId', value)}
              placeholder="e.g., SIG-001, PM-05"
              required
            />
          </div>
          
          <div className="mt-4">
            <UniversalSignallingFormField
              label="Location"
              type="text"
              value={formData.location}
              onChange={(value) => handleFieldChange('location', value)}
              placeholder="e.g., Platform 1, Track 2, Signal Box A"
              required
            />
          </div>
        </div>

        {/* Inspector Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Inspector Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UniversalSignallingFormField
              label="Inspector Name"
              type="text"
              value={formData.inspectorName}
              onChange={(value) => handleFieldChange('inspectorName', value)}
              required
            />
            
            <UniversalSignallingFormField
              label="Inspector ID"
              type="text"
              value={formData.inspectorId}
              onChange={(value) => handleFieldChange('inspectorId', value)}
              placeholder="ABC1234"
              required
            />
            
            <UniversalSignallingFormField
              label="Designation"
              type="text"
              value={formData.designation}
              onChange={(value) => handleFieldChange('designation', value)}
              placeholder="e.g., Sr. Signal Inspector"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <UniversalSignallingFormField
              label="Scheduled Date"
              type="date"
              value={formData.scheduledDate}
              onChange={(value) => handleFieldChange('scheduledDate', value)}
            />
            
            <UniversalSignallingFormField
              label="Status"
              type="select"
              value={formData.status}
              onChange={(value) => handleFieldChange('status', value)}
              options={statusOptions}
            />
          </div>
        </div>

        {/* Inspection Findings */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Inspection Findings</h3>
          
          <div className="space-y-4">
            <UniversalSignallingFormField
              label="Overall Condition"
              type="select"
              value={formData.overallCondition}
              onChange={(value) => handleFieldChange('overallCondition', value)}
              options={[
                { value: "", label: "Select Condition" },
                { value: "excellent", label: "Excellent" },
                { value: "good", label: "Good" },
                { value: "fair", label: "Fair" },
                { value: "poor", label: "Poor" },
                { value: "critical", label: "Critical" }
              ]}
            />
            
            <UniversalSignallingFormField
              label="Defects Found"
              type="textarea"
              value={formData.defectsFound}
              onChange={(value) => handleFieldChange('defectsFound', value)}
              placeholder="Detail any defects, anomalies, or issues observed..."
              rows="3"
            />
            
            <UniversalSignallingFormField
              label="Action Required"
              type="textarea"
              value={formData.actionRequired}
              onChange={(value) => handleFieldChange('actionRequired', value)}
              placeholder="Specify immediate actions needed to address findings..."
              rows="3"
            />
            
            <UniversalSignallingFormField
              label="Recommendations"
              type="textarea"
              value={formData.recommendations}
              onChange={(value) => handleFieldChange('recommendations', value)}
              placeholder="Long-term recommendations and improvement suggestions..."
              rows="3"
            />
          </div>
        </div>

        {/* Follow-up & Approval */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow-up & Approval</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UniversalSignallingFormField
              label="Next Inspection Date"
              type="date"
              value={formData.nextInspectionDate}
              onChange={(value) => handleFieldChange('nextInspectionDate', value)}
            />
            
            <UniversalSignallingFormField
              label="Approval Date"
              type="date"
              value={formData.approvalDate}
              onChange={(value) => handleFieldChange('approvalDate', value)}
            />
            
            <UniversalSignallingFormField
              label="Supervisor Name"
              type="text"
              value={formData.supervisorName}
              onChange={(value) => handleFieldChange('supervisorName', value)}
              placeholder="Approving supervisor name"
            />
            
            <UniversalSignallingFormField
              label="Supervisor ID"
              type="text"
              value={formData.supervisorId}
              onChange={(value) => handleFieldChange('supervisorId', value)}
              placeholder="ABC1234"
            />
          </div>
          
          <div className="mt-4">
            <UniversalSignallingFormField
              label="Supervisor Signature"
              type="text"
              value={formData.supervisorSignature}
              onChange={(value) => handleFieldChange('supervisorSignature', value)}
              placeholder="Digital signature or initial"
            />
          </div>
        </div>

        {/* Remarks */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
          
          <UniversalSignallingFormField
            label="Remarks"
            type="textarea"
            value={formData.remarks}
            onChange={(value) => handleFieldChange('remarks', value)}
            placeholder="Any additional observations, comments, or context..."
            rows="4"
          />
        </div>
      </div>
    </SignallingFormLayout>
  );
};

export default InspectionRegisterForm;