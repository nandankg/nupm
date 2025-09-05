import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UniversalSignallingFormField, SignallingFormLayout } from '../components';
import { contractWorkDoneValidationSchema } from '../validation/signallingValidationSchemas';

const ContractWorkDoneRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoize user data parsing to avoid re-parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);

  const [formData, setFormData] = useState({
    date: '',
    contractorName: '',
    contractorId: '',
    workOrderNo: '',
    workOrderDate: '',
    workDescription: '',
    workLocation: '',
    workStartDate: '',
    workCompletionDate: '',
    plannedDuration: '',
    actualDuration: '',
    workStatus: 'In Progress',
    workQuality: '',
    supervisorName: '',
    supervisorId: '',
    contractValue: '',
    amountPaid: '',
    balanceAmount: '',
    paymentStatus: 'Pending',
    materialsProvided: '',
    laborForce: '',
    safetyCompliance: 'Yes',
    qualityCheck: 'Pending',
    completionCertificate: 'No',
    defectsLiability: '',
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
    if (!formData.contractorName) {
      newErrors.contractorName = 'Contractor name is required';
    }
    if (!formData.workOrderNo) {
      newErrors.workOrderNo = 'Work order number is required';
    }
    if (!formData.workDescription) {
      newErrors.workDescription = 'Work description is required';
    }
    if (!formData.workLocation) {
      newErrors.workLocation = 'Work location is required';
    }
    if (!formData.supervisorName) {
      newErrors.supervisorName = 'Supervisor name is required';
    }

    // Date validation
    if (formData.workStartDate && formData.workCompletionDate) {
      const startDate = new Date(formData.workStartDate);
      const completionDate = new Date(formData.workCompletionDate);
      if (completionDate < startDate) {
        newErrors.workCompletionDate = 'Completion date cannot be earlier than start date';
      }
    }

    // Financial validation
    if (formData.contractValue && isNaN(formData.contractValue)) {
      newErrors.contractValue = 'Contract value must be a number';
    }
    if (formData.amountPaid && isNaN(formData.amountPaid)) {
      newErrors.amountPaid = 'Amount paid must be a number';
    }
    
    // Balance amount calculation validation
    if (formData.contractValue && formData.amountPaid) {
      const contract = parseFloat(formData.contractValue);
      const paid = parseFloat(formData.amountPaid);
      if (paid > contract) {
        newErrors.amountPaid = 'Amount paid cannot exceed contract value';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBalanceAmount = () => {
    if (formData.contractValue && formData.amountPaid) {
      const contract = parseFloat(formData.contractValue) || 0;
      const paid = parseFloat(formData.amountPaid) || 0;
      return (contract - paid).toFixed(2);
    }
    return '0.00';
  };

  const calculateActualDuration = () => {
    if (formData.workStartDate && formData.workCompletionDate) {
      const startDate = new Date(formData.workStartDate);
      const completionDate = new Date(formData.workCompletionDate);
      const diffTime = Math.abs(completionDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays.toString();
    }
    return '';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-calculate balance amount
    if (field === 'contractValue' || field === 'amountPaid') {
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          balanceAmount: calculateBalanceAmount()
        }));
      }, 100);
    }

    // Auto-calculate actual duration
    if (field === 'workStartDate' || field === 'workCompletionDate') {
      setTimeout(() => {
        const duration = calculateActualDuration();
        if (duration) {
          setFormData(prev => ({
            ...prev,
            actualDuration: duration
          }));
        }
      }, 100);
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
        formType: 'contract-work-done-register',
        department: 'Signalling',
        submittedBy: user?.name || 'Unknown User',
        submittedAt: new Date().toISOString(),
        ...formData,
        balanceAmount: calculateBalanceAmount(),
        actualDuration: calculateActualDuration()
      };

      console.log('Contract Work Done Register Data:', submissionData);
      
      // Here you would dispatch to your Redux store or make API call
      // dispatch(saveContractWorkDoneData(submissionData));
      
      toast.success('Contract work record saved successfully!');
      // navigate('/signalling/contract-work-done-list');
      
    } catch (error) {
      console.error('Error saving contract work record:', error);
      toast.error('Failed to save contract work record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      date: '',
      contractorName: '',
      contractorId: '',
      workOrderNo: '',
      workOrderDate: '',
      workDescription: '',
      workLocation: '',
      workStartDate: '',
      workCompletionDate: '',
      plannedDuration: '',
      actualDuration: '',
      workStatus: 'In Progress',
      workQuality: '',
      supervisorName: '',
      supervisorId: '',
      contractValue: '',
      amountPaid: '',
      balanceAmount: '',
      paymentStatus: 'Pending',
      materialsProvided: '',
      laborForce: '',
      safetyCompliance: 'Yes',
      qualityCheck: 'Pending',
      completionCertificate: 'No',
      defectsLiability: '',
      remarks: ''
    });
    setErrors({});
    toast.info('Form reset successfully');
  };

  return (
    <SignallingFormLayout
      title="Contract Work Done Register"
      description="Register for tracking contractor work completion and payments"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UniversalSignallingFormField
            type="date"
            label="Entry Date"
            value={formData.date}
            onChange={(value) => handleInputChange('date', value)}
            required
            error={errors.date}
          />
          <UniversalSignallingFormField
            type="text"
            label="Work Order No."
            value={formData.workOrderNo}
            onChange={(value) => handleInputChange('workOrderNo', value)}
            placeholder="Enter work order number"
            required
            error={errors.workOrderNo}
          />
        </div>

        {/* Contractor Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">Contractor Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Contractor Name"
              value={formData.contractorName}
              onChange={(value) => handleInputChange('contractorName', value)}
              placeholder="Enter contractor name"
              required
              error={errors.contractorName}
            />
            <UniversalSignallingFormField
              type="text"
              label="Contractor ID"
              value={formData.contractorId}
              onChange={(value) => handleInputChange('contractorId', value)}
              placeholder="Contractor registration ID"
              error={errors.contractorId}
            />
            <UniversalSignallingFormField
              type="date"
              label="Work Order Date"
              value={formData.workOrderDate}
              onChange={(value) => handleInputChange('workOrderDate', value)}
              error={errors.workOrderDate}
            />
          </div>
        </div>

        {/* Work Details */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-4">Work Details</h4>
          <div className="space-y-4">
            <UniversalSignallingFormField
              type="textarea"
              label="Work Description"
              value={formData.workDescription}
              onChange={(value) => handleInputChange('workDescription', value)}
              placeholder="Detailed description of work to be done"
              rows={3}
              required
              error={errors.workDescription}
            />
            <UniversalSignallingFormField
              type="text"
              label="Work Location"
              value={formData.workLocation}
              onChange={(value) => handleInputChange('workLocation', value)}
              placeholder="Specific location where work is being done"
              required
              error={errors.workLocation}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <UniversalSignallingFormField
                type="date"
                label="Work Start Date"
                value={formData.workStartDate}
                onChange={(value) => handleInputChange('workStartDate', value)}
                error={errors.workStartDate}
              />
              <UniversalSignallingFormField
                type="date"
                label="Work Completion Date"
                value={formData.workCompletionDate}
                onChange={(value) => handleInputChange('workCompletionDate', value)}
                error={errors.workCompletionDate}
              />
              <UniversalSignallingFormField
                type="select"
                label="Work Status"
                value={formData.workStatus}
                onChange={(value) => handleInputChange('workStatus', value)}
                options={[
                  { value: 'Not Started', label: 'Not Started' },
                  { value: 'In Progress', label: 'In Progress' },
                  { value: 'Completed', label: 'Completed' },
                  { value: 'On Hold', label: 'On Hold' },
                  { value: 'Cancelled', label: 'Cancelled' }
                ]}
                error={errors.workStatus}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UniversalSignallingFormField
                type="text"
                label="Planned Duration (Days)"
                value={formData.plannedDuration}
                onChange={(value) => handleInputChange('plannedDuration', value)}
                placeholder="Planned duration in days"
                error={errors.plannedDuration}
              />
              <UniversalSignallingFormField
                type="text"
                label="Actual Duration (Days)"
                value={formData.actualDuration}
                onChange={(value) => handleInputChange('actualDuration', value)}
                placeholder="Auto-calculated from dates"
                error={errors.actualDuration}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Supervision */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-orange-800 mb-4">Supervision & Quality</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniversalSignallingFormField
              type="text"
              label="Supervisor Name"
              value={formData.supervisorName}
              onChange={(value) => handleInputChange('supervisorName', value)}
              placeholder="Name of supervising officer"
              required
              error={errors.supervisorName}
            />
            <UniversalSignallingFormField
              type="text"
              label="Supervisor ID"
              value={formData.supervisorId}
              onChange={(value) => handleInputChange('supervisorId', value)}
              placeholder="Supervisor employee ID"
              error={errors.supervisorId}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <UniversalSignallingFormField
              type="select"
              label="Work Quality"
              value={formData.workQuality}
              onChange={(value) => handleInputChange('workQuality', value)}
              options={[
                { value: '', label: 'Select Quality' },
                { value: 'Excellent', label: 'Excellent' },
                { value: 'Good', label: 'Good' },
                { value: 'Satisfactory', label: 'Satisfactory' },
                { value: 'Poor', label: 'Poor' },
                { value: 'Rejected', label: 'Rejected' }
              ]}
              error={errors.workQuality}
            />
            <UniversalSignallingFormField
              type="select"
              label="Safety Compliance"
              value={formData.safetyCompliance}
              onChange={(value) => handleInputChange('safetyCompliance', value)}
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
                { value: 'Partial', label: 'Partial' }
              ]}
              error={errors.safetyCompliance}
            />
            <UniversalSignallingFormField
              type="select"
              label="Quality Check"
              value={formData.qualityCheck}
              onChange={(value) => handleInputChange('qualityCheck', value)}
              options={[
                { value: 'Pending', label: 'Pending' },
                { value: 'Passed', label: 'Passed' },
                { value: 'Failed', label: 'Failed' },
                { value: 'Conditional', label: 'Conditional' }
              ]}
              error={errors.qualityCheck}
            />
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-purple-800 mb-4">Financial Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UniversalSignallingFormField
              type="number"
              label="Contract Value (₹)"
              value={formData.contractValue}
              onChange={(value) => handleInputChange('contractValue', value)}
              placeholder="Total contract value"
              step="0.01"
              error={errors.contractValue}
            />
            <UniversalSignallingFormField
              type="number"
              label="Amount Paid (₹)"
              value={formData.amountPaid}
              onChange={(value) => handleInputChange('amountPaid', value)}
              placeholder="Amount paid so far"
              step="0.01"
              error={errors.amountPaid}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <UniversalSignallingFormField
              type="text"
              label="Balance Amount (₹)"
              value={calculateBalanceAmount()}
              placeholder="Auto-calculated balance"
              readOnly
              className="bg-gray-100"
            />
            <UniversalSignallingFormField
              type="select"
              label="Payment Status"
              value={formData.paymentStatus}
              onChange={(value) => handleInputChange('paymentStatus', value)}
              options={[
                { value: 'Pending', label: 'Pending' },
                { value: 'Partial', label: 'Partial' },
                { value: 'Completed', label: 'Completed' },
                { value: 'On Hold', label: 'On Hold' }
              ]}
              error={errors.paymentStatus}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-yellow-800 mb-4">Additional Information</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UniversalSignallingFormField
                type="text"
                label="Labor Force"
                value={formData.laborForce}
                onChange={(value) => handleInputChange('laborForce', value)}
                placeholder="Number of workers employed"
                error={errors.laborForce}
              />
              <UniversalSignallingFormField
                type="select"
                label="Completion Certificate"
                value={formData.completionCertificate}
                onChange={(value) => handleInputChange('completionCertificate', value)}
                options={[
                  { value: 'No', label: 'No' },
                  { value: 'Yes', label: 'Yes' },
                  { value: 'Pending', label: 'Pending' }
                ]}
                error={errors.completionCertificate}
              />
            </div>
            <UniversalSignallingFormField
              type="textarea"
              label="Materials Provided"
              value={formData.materialsProvided}
              onChange={(value) => handleInputChange('materialsProvided', value)}
              placeholder="List of materials provided by contractor/department"
              rows={2}
              error={errors.materialsProvided}
            />
            <UniversalSignallingFormField
              type="textarea"
              label="Defects Liability Period"
              value={formData.defectsLiability}
              onChange={(value) => handleInputChange('defectsLiability', value)}
              placeholder="Defects liability period and conditions"
              rows={2}
              error={errors.defectsLiability}
            />
            <UniversalSignallingFormField
              type="textarea"
              label="Remarks"
              value={formData.remarks}
              onChange={(value) => handleInputChange('remarks', value)}
              placeholder="Additional remarks or observations"
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
              'Save Contract Record'
            )}
          </button>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default ContractWorkDoneRegisterForm;