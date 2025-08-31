import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UniversalSignallingFormField from '../../../components/signalling/UniversalSignallingFormField';
import SignallingFormLayout from '../../../components/signalling/SignallingFormLayout';

const RequisitionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Requisition types
  const requisitionTypes = [
    { value: "material", label: "Material Requisition" },
    { value: "spare-parts", label: "Spare Parts" },
    { value: "tools", label: "Tools & Equipment" },
    { value: "consumables", label: "Consumables" },
    { value: "emergency", label: "Emergency Requisition" },
    { value: "maintenance", label: "Maintenance Items" },
    { value: "testing", label: "Testing Equipment" }
  ];

  // Priority levels
  const priorityLevels = [
    { value: "routine", label: "Routine" },
    { value: "urgent", label: "Urgent" },
    { value: "emergency", label: "Emergency" },
    { value: "critical", label: "Critical" }
  ];

  // Request status options
  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "submitted", label: "Submitted" },
    { value: "approved", label: "Approved" },
    { value: "partially-approved", label: "Partially Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "fulfilled", label: "Fulfilled" }
  ];

  // Item categories
  const itemCategories = [
    { value: "electronic", label: "Electronic Components" },
    { value: "mechanical", label: "Mechanical Parts" },
    { value: "cables", label: "Cables & Wiring" },
    { value: "hardware", label: "Hardware Items" },
    { value: "software", label: "Software/Licenses" },
    { value: "safety", label: "Safety Equipment" },
    { value: "office", label: "Office Supplies" },
    { value: "other", label: "Other" }
  ];

  const [formData, setFormData] = useState({
    // Basic Information
    requisitionDate: new Date().toISOString().split('T')[0],
    requisitionNumber: "",
    requisitionType: "",
    priority: "routine",
    requiredByDate: "",
    
    // Requestor Information
    requestorName: "",
    requestorId: "",
    designation: "",
    department: "Signalling",
    contactNumber: "",
    email: "",
    
    // Items List
    items: [
      {
        description: "",
        category: "",
        specification: "",
        quantity: "",
        unit: "",
        estimatedCost: "",
        justification: "",
        vendorPreference: ""
      }
    ],
    
    // Justification & Purpose
    purpose: "",
    businessJustification: "",
    alternativeOptions: "",
    
    // Budget Information
    budgetCode: "",
    estimatedTotalCost: "",
    budgetYear: new Date().getFullYear().toString(),
    
    // Approvals
    immediateApproverName: "",
    immediateApproverId: "",
    approvalStatus: "draft",
    approvalRemarks: "",
    approvalDate: "",
    
    // Additional Information
    urgencyReason: "",
    deliveryLocation: "",
    specialInstructions: "",
    attachments: "",
    remarks: "",
    
    // System fields
    slug: "requisition",
    formType: "requisition",
    department: "signalling"
  });

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        description: "",
        category: "",
        specification: "",
        quantity: "",
        unit: "",
        estimatedCost: "",
        justification: "",
        vendorPreference: ""
      }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.requisitionType) errors.push("Requisition Type is required");
    if (!formData.requestorName.trim()) errors.push("Requestor Name is required");
    if (!formData.requestorId.trim()) errors.push("Requestor ID is required");
    if (!formData.designation.trim()) errors.push("Designation is required");
    if (!formData.purpose.trim()) errors.push("Purpose is required");

    // Validate requestor ID format
    const empPattern = /^[A-Z]{2,3}\d{4,5}$/;
    if (formData.requestorId && !empPattern.test(formData.requestorId)) {
      errors.push("Requestor ID format should be like ABC1234");
    }

    // Validate required by date
    if (formData.requiredByDate && formData.requisitionDate) {
      if (new Date(formData.requiredByDate) <= new Date(formData.requisitionDate)) {
        errors.push("Required by date must be after requisition date");
      }
    }

    // Validate items
    const validItems = formData.items.filter(item => item.description && item.quantity);
    if (validItems.length === 0) {
      errors.push("At least one item with description and quantity is required");
    }

    // Validate email format if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Invalid email format");
    }

    return errors;
  };

  const calculateTotalCost = () => {
    return formData.items.reduce((total, item) => {
      const cost = parseFloat(item.estimatedCost) || 0;
      const qty = parseFloat(item.quantity) || 0;
      return total + (cost * qty);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      toast.error(`Form validation failed:\n${errors.join('\n')}`);
      return;
    }

    // Auto-calculate total cost
    const totalCost = calculateTotalCost();
    
    // Prepare data for submission
    const submissionData = {
      ...formData,
      calculatedTotalCost: totalCost,
      submissionTime: new Date().toISOString(),
      validItemsCount: formData.items.filter(item => item.description && item.quantity).length
    };

    console.log("Requisition Data:", submissionData);
    
    toast.success("Requisition submitted successfully!");
    navigate("/departments/signalling");
  };

  // Calculate completion stats
  const completionStats = useMemo(() => {
    const requiredFields = [
      'requisitionType', 'requestorName', 'requestorId', 'designation', 'purpose'
    ];
    
    const completed = requiredFields.filter(field => formData[field]).length;
    const validItems = formData.items.filter(item => item.description && item.quantity).length;
    
    const percentage = Math.round(((completed / requiredFields.length) * 0.7 + (validItems > 0 ? 0.3 : 0)) * 100);
    
    return { completed, total: requiredFields.length, validItems, percentage };
  }, [formData]);

  const breadcrumbs = [
    { label: 'Signalling', href: '/departments/signalling' },
    { label: 'Operations', href: '/departments/signalling/operations' },
    { label: 'Requisition', href: null }
  ];

  return (
    <SignallingFormLayout
      title="Material Requisition - Signalling Department"
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
            <div className="text-2xl font-bold text-green-600">{completionStats.validItems}</div>
            <div className="text-sm text-gray-600">Items Added</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">₹{calculateTotalCost().toFixed(2)}</div>
            <div className="text-sm text-gray-600">Est. Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{formData.priority}</div>
            <div className="text-sm text-gray-600">Priority</div>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Requisition Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UniversalSignallingFormField
            label="Requisition Date"
            type="date"
            value={formData.requisitionDate}
            onChange={(value) => handleFieldChange('requisitionDate', value)}
            required
          />
          
          <UniversalSignallingFormField
            label="Requisition Number"
            type="text"
            value={formData.requisitionNumber}
            onChange={(value) => handleFieldChange('requisitionNumber', value)}
            placeholder="Auto-generated if left empty"
          />
          
          <UniversalSignallingFormField
            label="Requisition Type"
            type="select"
            value={formData.requisitionType}
            onChange={(value) => handleFieldChange('requisitionType', value)}
            options={requisitionTypes}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <UniversalSignallingFormField
            label="Priority"
            type="select"
            value={formData.priority}
            onChange={(value) => handleFieldChange('priority', value)}
            options={priorityLevels}
          />
          
          <UniversalSignallingFormField
            label="Required By Date"
            type="date"
            value={formData.requiredByDate}
            onChange={(value) => handleFieldChange('requiredByDate', value)}
          />
        </div>
      </div>

      {/* Requestor Information */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Requestor Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UniversalSignallingFormField
            label="Requestor Name"
            type="text"
            value={formData.requestorName}
            onChange={(value) => handleFieldChange('requestorName', value)}
            required
          />
          
          <UniversalSignallingFormField
            label="Requestor ID"
            type="text"
            value={formData.requestorId}
            onChange={(value) => handleFieldChange('requestorId', value)}
            placeholder="ABC1234"
            required
          />
          
          <UniversalSignallingFormField
            label="Designation"
            type="text"
            value={formData.designation}
            onChange={(value) => handleFieldChange('designation', value)}
            placeholder="e.g., Signal Technician"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <UniversalSignallingFormField
            label="Contact Number"
            type="text"
            value={formData.contactNumber}
            onChange={(value) => handleFieldChange('contactNumber', value)}
            placeholder="10-digit mobile number"
          />
          
          <UniversalSignallingFormField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleFieldChange('email', value)}
            placeholder="official.email@company.com"
          />
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Requested Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            Add Item
          </button>
        </div>
        
        <div className="space-y-4">
          {formData.items.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded border">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800">Item #{index + 1}</h4>
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-600 text-sm hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UniversalSignallingFormField
                  label="Item Description"
                  type="text"
                  value={item.description}
                  onChange={(value) => handleItemChange(index, 'description', value)}
                  placeholder="Detailed description of the item"
                />
                
                <UniversalSignallingFormField
                  label="Category"
                  type="select"
                  value={item.category}
                  onChange={(value) => handleItemChange(index, 'category', value)}
                  options={itemCategories}
                />
                
                <UniversalSignallingFormField
                  label="Specification"
                  type="text"
                  value={item.specification}
                  onChange={(value) => handleItemChange(index, 'specification', value)}
                  placeholder="Technical specifications"
                />
                
                <UniversalSignallingFormField
                  label="Quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(value) => handleItemChange(index, 'quantity', value)}
                  placeholder="Required quantity"
                />
                
                <UniversalSignallingFormField
                  label="Unit"
                  type="text"
                  value={item.unit}
                  onChange={(value) => handleItemChange(index, 'unit', value)}
                  placeholder="e.g., pieces, meters, kg"
                />
                
                <UniversalSignallingFormField
                  label="Estimated Unit Cost (₹)"
                  type="number"
                  step="0.01"
                  value={item.estimatedCost}
                  onChange={(value) => handleItemChange(index, 'estimatedCost', value)}
                  placeholder="Cost per unit"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <UniversalSignallingFormField
                  label="Justification"
                  type="textarea"
                  value={item.justification}
                  onChange={(value) => handleItemChange(index, 'justification', value)}
                  placeholder="Why is this item needed?"
                  rows="2"
                />
                
                <UniversalSignallingFormField
                  label="Vendor Preference"
                  type="text"
                  value={item.vendorPreference}
                  onChange={(value) => handleItemChange(index, 'vendorPreference', value)}
                  placeholder="Preferred supplier (if any)"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purpose & Justification */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Purpose & Justification</h3>
        
        <div className="space-y-4">
          <UniversalSignallingFormField
            label="Purpose"
            type="textarea"
            value={formData.purpose}
            onChange={(value) => handleFieldChange('purpose', value)}
            placeholder="Overall purpose of this requisition..."
            required
            rows="3"
          />
          
          <UniversalSignallingFormField
            label="Business Justification"
            type="textarea"
            value={formData.businessJustification}
            onChange={(value) => handleFieldChange('businessJustification', value)}
            placeholder="Business case and cost-benefit analysis..."
            rows="3"
          />
          
          {formData.priority === "urgent" || formData.priority === "emergency" ? (
            <UniversalSignallingFormField
              label="Urgency Reason"
              type="textarea"
              value={formData.urgencyReason}
              onChange={(value) => handleFieldChange('urgencyReason', value)}
              placeholder="Explain why this requisition is urgent/emergency..."
              rows="2"
            />
          ) : null}
        </div>
      </div>

      {/* Budget & Delivery */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget & Delivery Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UniversalSignallingFormField
            label="Budget Code"
            type="text"
            value={formData.budgetCode}
            onChange={(value) => handleFieldChange('budgetCode', value)}
            placeholder="Budget allocation code"
          />
          
          <UniversalSignallingFormField
            label="Budget Year"
            type="text"
            value={formData.budgetYear}
            onChange={(value) => handleFieldChange('budgetYear', value)}
          />
          
          <UniversalSignallingFormField
            label="Delivery Location"
            type="text"
            value={formData.deliveryLocation}
            onChange={(value) => handleFieldChange('deliveryLocation', value)}
            placeholder="Where items should be delivered"
          />
        </div>
      </div>

      {/* Special Instructions & Remarks */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
        
        <div className="space-y-4">
          <UniversalSignallingFormField
            label="Special Instructions"
            type="textarea"
            value={formData.specialInstructions}
            onChange={(value) => handleFieldChange('specialInstructions', value)}
            placeholder="Any special handling, packaging, or delivery instructions..."
            rows="2"
          />
          
          <UniversalSignallingFormField
            label="Remarks"
            type="textarea"
            value={formData.remarks}
            onChange={(value) => handleFieldChange('remarks', value)}
            placeholder="Any additional comments or information..."
            rows="2"
          />
        </div>
      </div>

      {/* Approval Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Approval Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UniversalSignallingFormField
            label="Immediate Approver Name"
            type="text"
            value={formData.immediateApproverName}
            onChange={(value) => handleFieldChange('immediateApproverName', value)}
            placeholder="Direct supervisor/manager name"
          />
          
          <UniversalSignallingFormField
            label="Approver ID"
            type="text"
            value={formData.immediateApproverId}
            onChange={(value) => handleFieldChange('immediateApproverId', value)}
            placeholder="ABC1234"
          />
          
          <UniversalSignallingFormField
            label="Approval Status"
            type="select"
            value={formData.approvalStatus}
            onChange={(value) => handleFieldChange('approvalStatus', value)}
            options={statusOptions}
          />
          
          <UniversalSignallingFormField
            label="Approval Date"
            type="date"
            value={formData.approvalDate}
            onChange={(value) => handleFieldChange('approvalDate', value)}
          />
        </div>
        
        <div className="mt-4">
          <UniversalSignallingFormField
            label="Approval Remarks"
            type="textarea"
            value={formData.approvalRemarks}
            onChange={(value) => handleFieldChange('approvalRemarks', value)}
            placeholder="Comments from approver..."
            rows="2"
          />
        </div>
      </div>
    </SignallingFormLayout>
  );
};

export default RequisitionForm;