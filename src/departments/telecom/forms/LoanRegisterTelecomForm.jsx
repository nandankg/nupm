import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const LoanRegisterTelecomForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    loanType: "",
    itemDescription: "",
    quantity: "",
    loanedTo: "",
    loanPurpose: "",
    expectedReturnDate: "",
    actualReturnDate: "",
    condition: "Good",
    status: "Issued",
    remarks: "",
    employee_id: "",
    department: "Telecom"
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
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
    <TelecomFormLayout title="Loan Register" onSubmit={handleSubmit} loading={loading}>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField type="date" name="date" label="Loan Date" value={formValues.date} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="custom-select" 
            name="loanType" 
            label="Loan Type" 
            value={formValues.loanType} 
            onChange={handleChange}
            options={[
              { value: "Temporary", label: "Temporary Loan" },
              { value: "Permanent", label: "Permanent Loan" },
              { value: "Emergency", label: "Emergency Loan" }
            ]}
            required 
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <UniversalTelecomFormField type="textarea" name="itemDescription" label="Item Description" value={formValues.itemDescription} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="number" name="quantity" label="Quantity" value={formValues.quantity} onChange={handleChange} required />
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default LoanRegisterTelecomForm;