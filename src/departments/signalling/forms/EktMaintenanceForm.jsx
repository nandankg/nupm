import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UniversalSignallingFormField from '../../../components/signalling/UniversalSignallingFormField';
import SignallingFormLayout from '../../../components/signalling/SignallingFormLayout';

const EktMaintenanceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // EKT (Electronic Key Token) maintenance activities
  const maintenanceActivities = [
    {
      category: "Hardware Inspection",
      activities: [
        "EKT Machine Physical Condition Check",
        "Display Unit Functionality Test",
        "Keypad Operation Test", 
        "Printer Unit Check",
        "Power Supply Unit Inspection",
        "Cable Connections Verification",
        "Housing & Cabinet Condition",
        "Ventilation & Cooling Check"
      ]
    },
    {
      category: "Software & Communication",
      activities: [
        "Software Version Verification",
        "Database Backup & Integrity Check",
        "Network Connectivity Test",
        "Communication with Control Office",
        "Token Generation Test",
        "Log File Analysis",
        "Security Certificate Validation",
        "System Response Time Check"
      ]
    },
    {
      category: "Token Operations",
      activities: [
        "Token Issuing Process Test",
        "Token Return Process Test",
        "Emergency Token Procedure",
        "Token Validation Check",
        "Token Storage Verification",
        "Block Section Configuration",
        "Authority Limits Verification",
        "Token Counter Accuracy"
      ]
    },
    {
      category: "Safety Systems",
      activities: [
        "Fail-Safe Operation Test",
        "Emergency Stop Function",
        "Alarm System Check",
        "Interlocking Verification",
        "Safety Circuit Continuity",
        "Ground Fault Protection",
        "Surge Protection Check",
        "Battery Backup Test"
      ]
    }
  ];

  // Maintenance types
  const maintenanceTypes = [
    { value: "daily", label: "Daily Check" },
    { value: "weekly", label: "Weekly Maintenance" },
    { value: "monthly", label: "Monthly Maintenance" },
    { value: "quarterly", label: "Quarterly Maintenance" },
    { value: "half-yearly", label: "Half-Yearly Maintenance" },
    { value: "annual", label: "Annual Maintenance" },
    { value: "breakdown", label: "Breakdown Maintenance" }
  ];

  const [formData, setFormData] = useState({
    // Basic Information
    maintenanceDate: new Date().toISOString().split('T')[0],
    maintenanceType: "",
    ektId: "",
    location: "",
    blockSection: "",
    
    // Personnel Information
    technicianName: "",
    technicianId: "",
    designation: "",
    supervisorName: "",
    supervisorId: "",
    
    // Activity Results
    activities: maintenanceActivities.map(category => ({
      categoryName: category.category,
      items: category.activities.map(activity => ({
        name: activity,
        status: "",
        reading: "",
        remarks: ""
      }))
    })),
    
    // Overall Assessment
    overallCondition: "",
    defectsFound: "",
    correctiveActions: "",
    sparesUsed: "",
    nextMaintenanceDate: "",
    
    // Completion Information
    startTime: "",
    endTime: "",
    totalDuration: "",
    workCompleted: "",
    pendingWork: "",
    recommendations: "",
    
    // System fields
    slug: "ekt-maintenance",
    formType: "ekt_maintenance",
    department: "signalling"
  });

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleActivityChange = (categoryIndex, itemIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.map((category, catIdx) =>
        catIdx === categoryIndex ? {
          ...category,
          items: category.items.map((item, itemIdx) =>
            itemIdx === itemIndex ? { ...item, [field]: value } : item
          )
        } : category
      )
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.maintenanceType) errors.push("Maintenance Type is required");
    if (!formData.ektId.trim()) errors.push("EKT ID is required");
    if (!formData.location.trim()) errors.push("Location is required");
    if (!formData.technicianName.trim()) errors.push("Technician Name is required");
    if (!formData.technicianId.trim()) errors.push("Technician ID is required");
    if (!formData.designation.trim()) errors.push("Designation is required");

    // Validate technician ID format
    const empPattern = /^[A-Z]{2,3}\d{4,5}$/;
    if (formData.technicianId && !empPattern.test(formData.technicianId)) {
      errors.push("Technician ID format should be like ABC1234");
    }

    // Check completion percentage
    const totalActivities = formData.activities.reduce((sum, cat) => sum + cat.items.length, 0);
    const completedActivities = formData.activities.reduce((sum, cat) => 
      sum + cat.items.filter(item => item.status).length, 0
    );
    
    const completionPercentage = (completedActivities / totalActivities) * 100;
    if (completionPercentage < 70) {
      errors.push("At least 70% of maintenance activities must be completed");
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

    // Calculate duration if both times are provided
    let duration = formData.totalDuration;
    if (formData.startTime && formData.endTime && !duration) {
      const start = new Date(`${formData.maintenanceDate}T${formData.startTime}`);
      const end = new Date(`${formData.maintenanceDate}T${formData.endTime}`);
      const diffHours = (end - start) / (1000 * 60 * 60);
      duration = `${diffHours.toFixed(1)} hours`;
    }

    // Prepare data for submission
    const submissionData = {
      ...formData,
      calculatedDuration: duration,
      submissionTime: new Date().toISOString()
    };

    console.log("EKT Maintenance Data:", submissionData);
    
    toast.success("EKT Maintenance Record saved successfully!");
    navigate("/departments/signalling");
  };

  // Calculate completion statistics
  const completionStats = useMemo(() => {
    const totalActivities = formData.activities.reduce((sum, cat) => sum + cat.items.length, 0);
    const completedActivities = formData.activities.reduce((sum, cat) => 
      sum + cat.items.filter(item => item.status).length, 0
    );
    const criticalIssues = formData.activities.reduce((sum, cat) =>
      sum + cat.items.filter(item => item.status === 'Not OK' || item.status === 'Failed').length, 0
    );
    
    const percentage = Math.round((completedActivities / totalActivities) * 100);
    
    return { completed: completedActivities, total: totalActivities, critical: criticalIssues, percentage };
  }, [formData.activities]);

  const renderActivitySection = (category, categoryIndex) => (
    <div key={categoryIndex} className="bg-gray-50 p-4 rounded-lg mb-4">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.categoryName}</h4>
      
      <div className="space-y-3">
        {category.items.map((activity, itemIndex) => (
          <div key={itemIndex} className="bg-white p-3 rounded border">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800">
                  {itemIndex + 1}. {activity.name}
                </span>
              </div>
              
              <div className="flex gap-2 items-center">
                <select
                  value={activity.status}
                  onChange={(e) => handleActivityChange(categoryIndex, itemIndex, 'status', e.target.value)}
                  className="px-2 py-1 border rounded text-sm w-24"
                >
                  <option value="">Select</option>
                  <option value="OK">OK</option>
                  <option value="Not OK">Not OK</option>
                  <option value="N/A">N/A</option>
                  <option value="Pass">Pass</option>
                  <option value="Failed">Failed</option>
                </select>
                
                <input
                  type="text"
                  placeholder="Reading/Value"
                  value={activity.reading}
                  onChange={(e) => handleActivityChange(categoryIndex, itemIndex, 'reading', e.target.value)}
                  className="px-2 py-1 border rounded text-sm w-24"
                />
                
                <input
                  type="text"
                  placeholder="Remarks"
                  value={activity.remarks}
                  onChange={(e) => handleActivityChange(categoryIndex, itemIndex, 'remarks', e.target.value)}
                  className="px-2 py-1 border rounded text-sm w-32"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const breadcrumbs = [
    { label: 'Signalling', href: '/departments/signalling' },
    { label: 'System Maintenance', href: '/departments/signalling/system-maintenance' },
    { label: 'EKT Maintenance Register', href: null }
  ];

  return (
    <SignallingFormLayout
      title="EKT (Electronic Key Token) Maintenance Register"
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
            <div className="text-sm text-gray-600">Issues Found</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{completionStats.total}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Maintenance Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UniversalSignallingFormField
            label="Maintenance Date"
            type="date"
            value={formData.maintenanceDate}
            onChange={(value) => handleFieldChange('maintenanceDate', value)}
            required
          />
          
          <UniversalSignallingFormField
            label="Maintenance Type"
            type="select"
            value={formData.maintenanceType}
            onChange={(value) => handleFieldChange('maintenanceType', value)}
            options={maintenanceTypes}
            required
          />
          
          <UniversalSignallingFormField
            label="EKT Machine ID"
            type="text"
            value={formData.ektId}
            onChange={(value) => handleFieldChange('ektId', value)}
            placeholder="e.g., EKT-01"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <UniversalSignallingFormField
            label="Location"
            type="text"
            value={formData.location}
            onChange={(value) => handleFieldChange('location', value)}
            placeholder="e.g., Station Control Room"
            required
          />
          
          <UniversalSignallingFormField
            label="Block Section"
            type="text"
            value={formData.blockSection}
            onChange={(value) => handleFieldChange('blockSection', value)}
            placeholder="e.g., A-B Section"
          />
        </div>
      </div>

      {/* Personnel Information */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personnel Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UniversalSignallingFormField
            label="Technician Name"
            type="text"
            value={formData.technicianName}
            onChange={(value) => handleFieldChange('technicianName', value)}
            required
          />
          
          <UniversalSignallingFormField
            label="Technician ID"
            type="text"
            value={formData.technicianId}
            onChange={(value) => handleFieldChange('technicianId', value)}
            placeholder="ABC1234"
            required
          />
          
          <UniversalSignallingFormField
            label="Designation"
            type="text"
            value={formData.designation}
            onChange={(value) => handleFieldChange('designation', value)}
            placeholder="e.g., Sr. Signal Technician"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <UniversalSignallingFormField
            label="Supervisor Name"
            type="text"
            value={formData.supervisorName}
            onChange={(value) => handleFieldChange('supervisorName', value)}
          />
          
          <UniversalSignallingFormField
            label="Supervisor ID"
            type="text"
            value={formData.supervisorId}
            onChange={(value) => handleFieldChange('supervisorId', value)}
            placeholder="ABC1234"
          />
        </div>
      </div>

      {/* Maintenance Activities */}
      <div className="space-y-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Maintenance Activities</h3>
        
        {/* Activity Headers */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex justify-between items-center text-sm font-medium text-gray-600 mb-2">
            <span className="flex-1">Activity Description</span>
            <span className="w-24 text-center">Status</span>
            <span className="w-24 text-center">Reading</span>
            <span className="w-32 text-center">Remarks</span>
          </div>
        </div>
        
        {formData.activities.map((category, index) => 
          renderActivitySection(category, index)
        )}
      </div>

      {/* Time Tracking */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Time Tracking</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UniversalSignallingFormField
            label="Start Time"
            type="time"
            value={formData.startTime}
            onChange={(value) => handleFieldChange('startTime', value)}
          />
          
          <UniversalSignallingFormField
            label="End Time"
            type="time"
            value={formData.endTime}
            onChange={(value) => handleFieldChange('endTime', value)}
          />
          
          <UniversalSignallingFormField
            label="Total Duration"
            type="text"
            value={formData.totalDuration}
            onChange={(value) => handleFieldChange('totalDuration', value)}
            placeholder="e.g., 2.5 hours"
          />
        </div>
      </div>

      {/* Assessment & Actions */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Assessment</h3>
        
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
              { value: "satisfactory", label: "Satisfactory" },
              { value: "needs-attention", label: "Needs Attention" },
              { value: "critical", label: "Critical" }
            ]}
          />
          
          <UniversalSignallingFormField
            label="Defects Found"
            type="textarea"
            value={formData.defectsFound}
            onChange={(value) => handleFieldChange('defectsFound', value)}
            placeholder="Detail any defects, faults, or issues identified..."
            rows="3"
          />
          
          <UniversalSignallingFormField
            label="Corrective Actions Taken"
            type="textarea"
            value={formData.correctiveActions}
            onChange={(value) => handleFieldChange('correctiveActions', value)}
            placeholder="Actions taken to resolve issues..."
            rows="3"
          />
          
          <UniversalSignallingFormField
            label="Spares/Materials Used"
            type="textarea"
            value={formData.sparesUsed}
            onChange={(value) => handleFieldChange('sparesUsed', value)}
            placeholder="List any spare parts or materials consumed..."
            rows="2"
          />
        </div>
      </div>

      {/* Work Status & Follow-up */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Work Status & Follow-up</h3>
        
        <div className="space-y-4">
          <UniversalSignallingFormField
            label="Work Completed"
            type="textarea"
            value={formData.workCompleted}
            onChange={(value) => handleFieldChange('workCompleted', value)}
            placeholder="Summary of completed maintenance work..."
            rows="2"
          />
          
          <UniversalSignallingFormField
            label="Pending Work"
            type="textarea"
            value={formData.pendingWork}
            onChange={(value) => handleFieldChange('pendingWork', value)}
            placeholder="Any pending work or deferred items..."
            rows="2"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UniversalSignallingFormField
              label="Next Maintenance Date"
              type="date"
              value={formData.nextMaintenanceDate}
              onChange={(value) => handleFieldChange('nextMaintenanceDate', value)}
            />
            
            <div></div>
          </div>
          
          <UniversalSignallingFormField
            label="Recommendations"
            type="textarea"
            value={formData.recommendations}
            onChange={(value) => handleFieldChange('recommendations', value)}
            placeholder="Recommendations for future maintenance or improvements..."
            rows="3"
          />
        </div>
      </div>
    </SignallingFormLayout>
  );
};

export default EktMaintenanceForm;