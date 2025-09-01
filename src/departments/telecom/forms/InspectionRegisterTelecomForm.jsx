import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const InspectionRegisterTelecomForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    inspectionType: "",
    inspectedBy: "",
    location: "",
    equipmentInspected: "",
    findings: "",
    recommendations: "",
    actionRequired: "",
    completionDate: "",
    status: "Open",
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
    <TelecomFormLayout title="Inspection Register" onSubmit={handleSubmit} loading={loading}>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField type="date" name="date" label="Inspection Date" value={formValues.date} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="custom-select" 
            name="inspectionType" 
            label="Inspection Type" 
            value={formValues.inspectionType} 
            onChange={handleChange}
            options={[
              { value: "Routine", label: "Routine Inspection" },
              { value: "Safety", label: "Safety Inspection" },
              { value: "Audit", label: "Audit Inspection" },
              { value: "Compliance", label: "Compliance Check" }
            ]}
            required 
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField type="text" name="inspectedBy" label="Inspected By" value={formValues.inspectedBy} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField type="location-type" name="location" label="Location" value={formValues.location} onChange={handleChange} required />
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default InspectionRegisterTelecomForm;