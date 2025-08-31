import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/rajiv/jobCardReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formConfig } from "../../config/formConfig"; // Centralized configuration
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import CheckboxInput from "../../components/CheckboxInput";
import TextArea from "../../components/TextArea";

const DynamicForm = ({ formType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const config = formConfig[formType]; // Load configuration for the form type
  const [formValues, setFormValues] = useState(() => {
    // Initialize state from configuration
    const initialValues = {};
    config.fields.forEach((field) => {
      initialValues[field.name] = field.defaultValue || "";
    });
    return initialValues;
  });

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addData(formValues));
    navigate(config.redirectPath);
  };

  return (
    <div className="container">
      <div className="breadcrumbs" role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <Link to="">{config.title}</Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container">
          <form onSubmit={handleSubmit}>
            {config.fields.map((field) => {
              switch (field.type) {
                case "text":
                case "number":
                case "date":
                case "time":
                  return (
                    <TextInput
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      value={formValues[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  );
                case "select":
                  return (
                    <SelectInput
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      value={formValues[field.name]}
                      options={field.options}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  );
                case "checkbox":
                  return (
                    <CheckboxInput
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      checked={formValues[field.name]}
                      onChange={(e) =>
                        handleChange(field.name, e.target.checked)
                      }
                    />
                  );
                case "textarea":
                  return (
                    <TextArea
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      value={formValues[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  );
                default:
                  return null;
              }
            })}
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
