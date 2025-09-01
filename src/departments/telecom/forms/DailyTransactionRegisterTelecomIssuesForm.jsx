import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const DailyTransactionRegisterTelecomIssuesForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    voucherNo: "",
    issuedTo: "",
    itemDescription: "",
    quantity: "",
    unitPrice: "",
    totalAmount: "",
    purpose: "",
    authorizedBy: "",
    remarks: "",
    employee_id: "",
    department: "Telecom"
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    
    // Auto-calculate total amount
    if (name === 'quantity' || name === 'unitPrice') {
      const qty = name === 'quantity' ? parseFloat(value) || 0 : parseFloat(formValues.quantity) || 0;
      const price = name === 'unitPrice' ? parseFloat(value) || 0 : parseFloat(formValues.unitPrice) || 0;
      setFormValues(prev => ({ ...prev, totalAmount: (qty * price).toFixed(2) }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // await dispatch(addData(formValues));
      navigate("/list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TelecomFormLayout title="Daily Transaction Register - Issues" onSubmit={handleSubmit} loading={loading}>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="date"
            name="date"
            label="Date"
            value={formValues.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="text"
            name="voucherNo"
            label="Voucher No."
            value={formValues.voucherNo}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="text"
            name="issuedTo"
            label="Issued To"
            value={formValues.issuedTo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="textarea"
            name="itemDescription"
            label="Item Description"
            value={formValues.itemDescription}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="number"
            name="quantity"
            label="Quantity"
            value={formValues.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="number"
            name="unitPrice"
            label="Unit Price"
            value={formValues.unitPrice}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="number"
            name="totalAmount"
            label="Total Amount"
            value={formValues.totalAmount}
            onChange={handleChange}
            className="bg-light"
            readOnly
          />
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default DailyTransactionRegisterTelecomIssuesForm;