import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UniversalSignallingFormField, SignallingFormLayout } from '../components';
import { ledgerSignallingValidationSchema } from '../validation/signallingValidationSchemas';

const LedgerSignallingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoize user data parsing to avoid re-parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);

  const [formData, setFormData] = useState([
    {
      date: '',
      particulars: '',
      voucherNo: '',
      receipts: '',
      payments: '',
      balance: '',
      remarks: ''
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    formData.forEach((row, index) => {
      // Validate required fields
      if (!row.date) {
        newErrors[`${index}.date`] = 'Date is required';
      }
      if (!row.particulars) {
        newErrors[`${index}.particulars`] = 'Particulars are required';
      }
      if (!row.voucherNo) {
        newErrors[`${index}.voucherNo`] = 'Voucher number is required';
      }
      
      // Validate receipts and payments are numbers
      if (row.receipts && isNaN(row.receipts)) {
        newErrors[`${index}.receipts`] = 'Receipts must be a number';
      }
      if (row.payments && isNaN(row.payments)) {
        newErrors[`${index}.payments`] = 'Payments must be a number';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBalance = (rowIndex) => {
    let totalReceipts = 0;
    let totalPayments = 0;

    // Calculate cumulative balance up to current row
    for (let i = 0; i <= rowIndex; i++) {
      const row = formData[i];
      totalReceipts += parseFloat(row.receipts || 0);
      totalPayments += parseFloat(row.payments || 0);
    }

    return (totalReceipts - totalPayments).toFixed(2);
  };

  const handleInputChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index] = {
      ...newFormData[index],
      [field]: value
    };

    // Auto-calculate balance for financial fields
    if (field === 'receipts' || field === 'payments') {
      newFormData[index].balance = calculateBalance(index);
    }

    setFormData(newFormData);

    // Clear field error when user starts typing
    if (errors[`${index}.${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${index}.${field}`];
        return newErrors;
      });
    }
  };

  const handleAddRow = () => {
    const newRow = {
      date: '',
      particulars: '',
      voucherNo: '',
      receipts: '',
      payments: '',
      balance: '',
      remarks: ''
    };
    
    setFormData([...formData, newRow]);
  };

  const updatedFormData = newFormData.map((row, i) => ({
  ...row,
  department: 'Signalling',
  submittedBy: user?.name || 'Unknown User',
  submittedAt: new Date().toISOString(),
  entries: formData,
  totalReceipts: formData.reduce((sum, row) => sum + parseFloat(row.receipts || 0), 0),
  totalPayments: formData.reduce((sum, row) => sum + parseFloat(row.payments || 0), 0),
  finalBalance: formData.length > 0 ? formData[formData.length - 1].balance : '0.00'
}));

console.log('Ledger Signalling Data:', updatedFormData);


  const handleReset = () => {
    setFormData([
      {
        date: '',
        particulars: '',
        voucherNo: '',
        receipts: '',
        payments: '',
        balance: '',
        remarks: ''
      }
    ]);
    setErrors({});
    toast.info('Form reset successfully');
  };

  return (
    <SignallingFormLayout
      title="Ledger - Signalling Department"
      description="Maintain financial records for signalling department transactions"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-blue-50">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">S.No.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Particulars</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Voucher No.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Receipts (₹)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Payments (₹)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Balance (₹)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Remarks</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    <UniversalSignallingFormField
                      type="text"
                      value={row.serialNumber || (index + 1).toString()}
                      onChange={(value) => handleInputChange(index, 'serialNumber', value)}
                      className="w-16 text-center"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <UniversalSignallingFormField
                      type="date"
                      value={row.date}
                      onChange={(value) => handleInputChange(index, 'date', value)}
                      required
                      error={errors[`${index}.date`]}
                      className="w-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <UniversalSignallingFormField
                      type="textarea"
                      value={row.particulars}
                      onChange={(value) => handleInputChange(index, 'particulars', value)}
                      placeholder="Description of transaction"
                      required
                      error={errors[`${index}.particulars`]}
                      className="w-full min-h-[60px]"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <UniversalSignallingFormField
                      type="text"
                      value={row.voucherNo}
                      onChange={(value) => handleInputChange(index, 'voucherNo', value)}
                      placeholder="Voucher/Bill No."
                      required
                      error={errors[`${index}.voucherNo`]}
                      className="w-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <UniversalSignallingFormField
                      type="number"
                      value={row.receipts}
                      onChange={(value) => handleInputChange(index, 'receipts', value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      error={errors[`${index}.receipts`]}
                      className="w-full text-right"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <UniversalSignallingFormField
                      type="number"
                      value={row.payments}
                      onChange={(value) => handleInputChange(index, 'payments', value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      error={errors[`${index}.payments`]}
                      className="w-full text-right"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <UniversalSignallingFormField
                      type="text"
                      value={calculateBalance(index)}
                      className="w-full text-right font-semibold bg-gray-100"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <UniversalSignallingFormField
                      type="textarea"
                      value={row.remarks}
                      onChange={(value) => handleInputChange(index, 'remarks', value)}
                      placeholder="Additional notes"
                      className="w-full min-h-[60px]"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={handleAddRow}
                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
                        title="Add Row"
                      >
                        +
                      </button>
                      {formData.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(index)}
                          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                          title="Remove Row"
                        >
                          -
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-blue-50 font-semibold">
              <tr>
                <td colSpan="4" className="border border-gray-300 px-4 py-2 text-right">
                  <strong>Totals:</strong>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  <strong>₹ {formData.reduce((sum, row) => sum + parseFloat(row.receipts || 0), 0).toFixed(2)}</strong>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  <strong>₹ {formData.reduce((sum, row) => sum + parseFloat(row.payments || 0), 0).toFixed(2)}</strong>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  <strong>₹ {formData.length > 0 ? calculateBalance(formData.length - 1) : '0.00'}</strong>
                </td>
                <td colSpan="2" className="border border-gray-300 px-4 py-2"></td>
              </tr>
            </tfoot>
          </table>
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
            type="button"
            onClick={handleAddRow}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            disabled={loading}
          >
            Add Entry
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
              'Save Ledger'
            )}
          </button>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default LedgerSignallingForm;