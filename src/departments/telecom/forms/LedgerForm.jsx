import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";
import { validateForm } from "../validation";
import { addData } from "../../../reducer/store/DtrIssueStoreReducer";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const LedgerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState([
    {
      date: "",
      fromWhomReceivedOrIssued: "",
      refOfReceiptOrIssueNote: "",
      receiptQty: "",
      issuedQty: "",
      balanceQty: "",
      signOfIssuer: "",
      signOfControllingOfficer: "",
      remarks: "",
    }
  ]);

  const handleInputChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
    
    // Auto-calculate balance quantity
    if (field === 'receiptQty' || field === 'issuedQty') {
      const receipt = parseFloat(newFormData[index].receiptQty) || 0;
      const issued = parseFloat(newFormData[index].issuedQty) || 0;
      const previousBalance = index > 0 ? (parseFloat(formData[index - 1].balanceQty) || 0) : 0;
      newFormData[index].balanceQty = (previousBalance + receipt - issued).toString();
      setFormData(newFormData);
    }
  };

  const handleAddRow = () => {
    setFormData([
      ...formData,
      {
        date: "",
        fromWhomReceivedOrIssued: "",
        refOfReceiptOrIssueNote: "",
        receiptQty: "",
        issuedQty: "",
        balanceQty: "",
        signOfIssuer: "",
        signOfControllingOfficer: "",
        remarks: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    if (formData.length > 1) {
      const newFormData = formData.filter((_, i) => i !== index);
      setFormData(newFormData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await dispatch(addData(formData));
      navigate(`/list/${slug}`);
    } catch (error) {
      console.error('Error saving form:', error);
      setErrors({ submit: 'Error saving form. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TelecomFormLayout 
      title="Ledger Register"
      subtitle="Telecom Department - Material Ledger"
      onSubmit={handleSubmit}
      loading={loading}
    >
      {errors.submit && (
        <div className="alert alert-danger mb-3">
          {errors.submit}
        </div>
      )}
      
      <div className="alert alert-info">
        <i className="fas fa-info-circle me-2"></i>
        <strong>Note:</strong> Ledger data is automatically populated through DTR Receipt and DTR Issue forms. 
        You can also manually add entries using the form below.
      </div>

      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-ledger me-2"></i>
            Ledger Entries
          </h6>
          <button 
            type="button" 
            className="btn btn-light btn-sm"
            onClick={handleAddRow}
          >
            <i className="fas fa-plus me-1"></i>
            Add Row
          </button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-sm mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{width: '10%'}}>Date</th>
                  <th style={{width: '15%'}}>From/To Whom</th>
                  <th style={{width: '12%'}}>Receipt/Issue Ref</th>
                  <th style={{width: '8%'}}>Receipt Qty</th>
                  <th style={{width: '8%'}}>Issued Qty</th>
                  <th style={{width: '8%'}}>Balance Qty</th>
                  <th style={{width: '12%'}}>Issuer Sign</th>
                  <th style={{width: '12%'}}>Officer Sign</th>
                  <th style={{width: '12%'}}>Remarks</th>
                  <th style={{width: '3%'}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={row.date}
                        onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={row.fromWhomReceivedOrIssued}
                        onChange={(e) => handleInputChange(index, 'fromWhomReceivedOrIssued', e.target.value)}
                        placeholder="From/To whom"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={row.refOfReceiptOrIssueNote}
                        onChange={(e) => handleInputChange(index, 'refOfReceiptOrIssueNote', e.target.value)}
                        placeholder="Reference no."
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={row.receiptQty}
                        onChange={(e) => handleInputChange(index, 'receiptQty', e.target.value)}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={row.issuedQty}
                        onChange={(e) => handleInputChange(index, 'issuedQty', e.target.value)}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm bg-light"
                        value={row.balanceQty}
                        readOnly
                        step="0.01"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={row.signOfIssuer}
                        onChange={(e) => handleInputChange(index, 'signOfIssuer', e.target.value)}
                        placeholder="Issuer signature"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={row.signOfControllingOfficer}
                        onChange={(e) => handleInputChange(index, 'signOfControllingOfficer', e.target.value)}
                        placeholder="Officer signature"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={row.remarks}
                        onChange={(e) => handleInputChange(index, 'remarks', e.target.value)}
                        placeholder="Remarks"
                      />
                    </td>
                    <td>
                      {formData.length > 1 && (
                        <button 
                          type="button" 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveRow(index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default LedgerForm;