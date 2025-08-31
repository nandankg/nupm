import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UniversalSignallingFormField, SignallingFormLayout } from '../components';
import { dailyTransactionReceiptValidationSchema } from '../validation/signallingValidationSchemas';

const DailyTransactionRegisterReceiptForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoize user data parsing to avoid re-parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);

  const [formData, setFormData] = useState({
    date: '',
    materialId: '',
    materialDesc: '',
    serialNo: '',
    qty: '',
    invoiceChallanNo: '',
    invoiceChallanDate: '',
    forWhatWork: '',
    receivedName: '',
    receivedDesignation: '',
    receivedSign: '',
    ledgerNo: '',
    remarks: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Common signalling materials for dropdown
  const signallingMaterials = [
    { id: '1', name: 'Signal Cables' },
    { id: '2', name: 'Point Machine Parts' },
    { id: '3', name: 'LED Signal Heads' },
    { id: '4', name: 'Track Circuits' },
    { id: '5', name: 'Axle Counters' },
    { id: '6', name: 'Control Cables' },
    { id: '7', name: 'Junction Boxes' },
    { id: '8', name: 'Transformers' },
    { id: '9', name: 'Relays' },
    { id: '10', name: 'Batteries' },
    { id: '11', name: 'SMPS Units' },
    { id: '12', name: 'ATS Equipment' }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.materialDesc) {
      newErrors.materialDesc = 'Material description is required';
    }
    if (!formData.qty) {
      newErrors.qty = 'Quantity is required';
    } else if (parseFloat(formData.qty) <= 0) {
      newErrors.qty = 'Quantity must be greater than 0';
    }
    if (!formData.invoiceChallanNo) {
      newErrors.invoiceChallanNo = 'Invoice/Challan number is required';
    }
    if (!formData.invoiceChallanDate) {
      newErrors.invoiceChallanDate = 'Invoice/Challan date is required';
    }
    if (!formData.receivedName) {
      newErrors.receivedName = 'Receiver name is required';
    }
    if (!formData.receivedDesignation) {
      newErrors.receivedDesignation = 'Receiver designation is required';
    }

    // Date validation
    if (formData.date && formData.invoiceChallanDate) {
      const receiptDate = new Date(formData.date);
      const challanDate = new Date(formData.invoiceChallanDate);
      if (receiptDate < challanDate) {
        newErrors.date = 'Receipt date cannot be earlier than challan date';
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

    // Auto-populate material description when material is selected
    if (field === 'materialId' && value) {
      const selectedMaterial = signallingMaterials.find(m => m.id === value);
      if (selectedMaterial) {
        setFormData(prev => ({
          ...prev,
          materialDesc: selectedMaterial.name
        }));
      }
    }

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
        formType: 'daily-transaction-register-receipt',
        department: 'Signalling',
        submittedBy: user?.name || 'Unknown User',
        submittedAt: new Date().toISOString(),
        ...formData
      };

      console.log('Daily Transaction Receipt Data:', submissionData);
      
      // Here you would dispatch to your Redux store or make API call
      // dispatch(saveDailyTransactionReceiptData(submissionData));
      
      toast.success('Receipt entry saved successfully!');
      // navigate('/signalling/daily-transaction-receipt-list');
      
    } catch (error) {
      console.error('Error saving receipt entry:', error);
      toast.error('Failed to save receipt entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      date: '',
      materialId: '',
      materialDesc: '',
      serialNo: '',
      qty: '',
      invoiceChallanNo: '',
      invoiceChallanDate: '',
      forWhatWork: '',
      receivedName: '',
      receivedDesignation: '',
      receivedSign: '',
      ledgerNo: '',
      remarks: ''
    });
    setErrors({});
    toast.info('Form reset successfully');
  };

  return (
    <SignallingFormLayout
      title="Daily Transaction Register - Receipts"
      description="Record material receipts for signalling department"
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
            type="select"
            label="Select Material"
            value={formData.materialId}
            onChange={(value) => handleInputChange('materialId', value)}
            options={[
              { value: '', label: 'Select Material' },
              ...signallingMaterials.map(material => ({
                value: material.id,
                label: material.name
              }))
            ]}
            error={errors.materialId}
          />
          <UniversalSignallingFormField
            type="text"
            label="Material Description"
            value={formData.materialDesc}
            onChange={(value) => handleInputChange('materialDesc', value)}
            placeholder="Enter material description"
            required
            error={errors.materialDesc}
          />
        </div>

        {/* Quantity and Serial Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UniversalSignallingFormField
            type="text"
            label="Serial No."
            value={formData.serialNo}
            onChange={(value) => handleInputChange('serialNo', value)}
            placeholder="Enter serial number"
            error={errors.serialNo}
          />
          <UniversalSignallingFormField
            type="number"
            label="Quantity"
            value={formData.qty}
            onChange={(value) => handleInputChange('qty', value)}
            placeholder="Enter quantity"
            min="1"
            required
            error={errors.qty}
          />
        </div>

        {/* Invoice/Challan Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-4 text-center">Invoice/Challan Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Invoice/Challan/HO No."
              value={formData.invoiceChallanNo}
              onChange={(value) => handleInputChange('invoiceChallanNo', value)}
              placeholder="Enter invoice/challan number"
              required
              error={errors.invoiceChallanNo}
            />
            <UniversalSignallingFormField
              type="date"
              label="Invoice/Challan/HO Date"
              value={formData.invoiceChallanDate}
              onChange={(value) => handleInputChange('invoiceChallanDate', value)}
              required
              error={errors.invoiceChallanDate}
            />
          </div>
        </div>

        {/* Work Information */}
        <UniversalSignallingFormField
          type="textarea"
          label="For What Work"
          value={formData.forWhatWork}
          onChange={(value) => handleInputChange('forWhatWork', value)}
          placeholder="Describe the purpose/work for which material is received"
          rows={3}
          error={errors.forWhatWork}
        />

        {/* Receiver Information */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-4 text-center">Receiver Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Received By (Name)"
              value={formData.receivedName}
              onChange={(value) => handleInputChange('receivedName', value)}
              placeholder="Enter receiver name"
              required
              error={errors.receivedName}
            />
            <UniversalSignallingFormField
              type="text"
              label="Designation"
              value={formData.receivedDesignation}
              onChange={(value) => handleInputChange('receivedDesignation', value)}
              placeholder="Enter designation"
              required
              error={errors.receivedDesignation}
            />
            <UniversalSignallingFormField
              type="text"
              label="Signature"
              value={formData.receivedSign}
              onChange={(value) => handleInputChange('receivedSign', value)}
              placeholder="Digital signature/ID"
              error={errors.receivedSign}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UniversalSignallingFormField
            type="text"
            label="Ledger No."
            value={formData.ledgerNo}
            onChange={(value) => handleInputChange('ledgerNo', value)}
            placeholder="Enter ledger number"
            error={errors.ledgerNo}
          />
          <UniversalSignallingFormField
            type="textarea"
            label="Remarks"
            value={formData.remarks}
            onChange={(value) => handleInputChange('remarks', value)}
            placeholder="Additional notes or remarks"
            rows={2}
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
              'Save Receipt'
            )}
          </button>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default DailyTransactionRegisterReceiptForm;