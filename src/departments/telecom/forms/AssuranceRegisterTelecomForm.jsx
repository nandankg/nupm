import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";
import { validateForm } from "../validation";
import { addData } from "../../../reducer/store/AssetRegisterReducer";

const AssuranceRegisterTelecomForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    assuranceType: "",
    assuranceNumber: "",
    issuedTo: "",
    validityPeriod: "",
    amount: "",
    purpose: "",
    conditions: "",
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
      await dispatch(addData(formValues));
      navigate("/list");
    } catch (error) {
      setErrors({ submit: 'Error saving form.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TelecomFormLayout title="Assurance Register" onSubmit={handleSubmit} loading={loading}>
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
            type="custom-select"
            name="assuranceType"
            label="Assurance Type"
            value={formValues.assuranceType}
            onChange={handleChange}
            options={[
              { value: "Performance", label: "Performance Assurance" },
              { value: "Financial", label: "Financial Assurance" },
              { value: "Quality", label: "Quality Assurance" }
            ]}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="text"
            name="assuranceNumber"
            label="Assurance Number"
            value={formValues.assuranceNumber}
            onChange={handleChange}
            required
          />
        </div>
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
      </div>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="text"
            name="validityPeriod"
            label="Validity Period"
            value={formValues.validityPeriod}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="number"
            name="amount"
            label="Amount"
            value={formValues.amount}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <UniversalTelecomFormField
            type="textarea"
            name="purpose"
            label="Purpose"
            value={formValues.purpose}
            onChange={handleChange}
          />
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default AssuranceRegisterTelecomForm;