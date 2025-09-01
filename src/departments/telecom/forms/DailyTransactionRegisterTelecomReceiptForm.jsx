import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const DailyTransactionRegisterTelecomReceiptForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    voucherNo: "",
    receivedFrom: "",
    itemDescription: "",
    quantity: "",
    unitPrice: "",
    totalAmount: "",
    purpose: "",
    receivedBy: "",
    remarks: "",
    employee_id: "",
    department: "Telecom"
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    
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
      navigate("/list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TelecomFormLayout title="Daily Transaction Register - Receipt" onSubmit={handleSubmit} loading={loading}>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField type="date" name="date" label="Date" value={formValues.date} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField type="text" name="receivedFrom" label="Received From" value={formValues.receivedFrom} onChange={handleChange} required />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <UniversalTelecomFormField type="textarea" name="itemDescription" label="Item Description" value={formValues.itemDescription} onChange={handleChange} required />
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default DailyTransactionRegisterTelecomReceiptForm;