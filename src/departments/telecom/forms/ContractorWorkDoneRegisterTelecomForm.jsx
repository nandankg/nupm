import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const ContractorWorkDoneRegisterTelecomForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    contractorName: "",
    workDescription: "",
    location: "",
    startDate: "",
    completionDate: "",
    status: "In Progress",
    amount: "",
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
      // await dispatch(addData(formValues));
      navigate("/list");
    } catch (error) {
      console.error('Error saving form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TelecomFormLayout title="Contractor Work Done Register" onSubmit={handleSubmit} loading={loading}>
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
            name="contractorName"
            label="Contractor Name"
            value={formValues.contractorName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <UniversalTelecomFormField
            type="textarea"
            name="workDescription"
            label="Work Description"
            value={formValues.workDescription}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="location-type"
            name="location"
            label="Location"
            value={formValues.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="custom-select"
            name="status"
            label="Status"
            value={formValues.status}
            onChange={handleChange}
            options={[
              { value: "Not Started", label: "Not Started" },
              { value: "In Progress", label: "In Progress" },
              { value: "Completed", label: "Completed" },
              { value: "On Hold", label: "On Hold" }
            ]}
            required
          />
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default ContractorWorkDoneRegisterTelecomForm;