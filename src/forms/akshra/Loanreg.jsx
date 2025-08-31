import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData, addData } from "../../reducer/redux/tableDataSlice";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formConfig } from "../../data/formConfig"; // Centralized configuration
import TextInput from "../../formcomponents/TextInput";
import SelectInput from "../../formcomponents/SelectInput";
import CheckboxInput from "../../formcomponents/CheckboxInput";
import TextArea from "../../formcomponents/TextArea";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const Loanreg = ({ loanregistertelecom }) => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const config = formConfig.loanregistertelecom; // Load

  console.log(config);
  const [formValues, setFormValues] = useState(() => {
    // Initialize state from configuration
    const initialValues = {};
    config.fields.forEach((field) => {
      initialValues[field.name] = field.defaultValue || "";
    });
    return initialValues;
  });
  console.log(formValues);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addData({ formType: slug, values: formValues }));
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
            <div className=" mb-3 form-heading-container">
              <h3 className="form-heading">{config.title}</h3>
              <div className="heading-line"></div>
            </div>
            <div className="row mb-3">
              {config.fields.map((field) => {
                switch (field.type) {
                  case "text":
                  case "number":
                  case "date":
                  case "time":
                    return (
                      <div className="col-md-6">
                        <TextInput
                          key={field.name}
                          label={field.label}
                          name={field.name}
                          type={field.type}
                          value={formValues[field.name]}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                        />
                      </div>
                    );
                  case "select":
                    return (
                      <div className="col-md-6">
                        <SelectInput
                          key={field.name}
                          label={field.label}
                          name={field.name}
                          value={formValues[field.name]}
                          options={field.options}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                        />
                      </div>
                    );
                  case "checkbox":
                    return (
                      <div className="col-md-6">
                        <CheckboxInput
                          key={field.name}
                          label={field.label}
                          name={field.name}
                          checked={formValues[field.name]}
                          onChange={(e) =>
                            handleChange(field.name, e.target.checked)
                          }
                        />
                      </div>
                    );
                  case "textarea":
                    return (
                      <TextArea
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={formValues[field.name]}
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                      />
                    );
                  default:
                    return null;
                }
              })}
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loanreg;
