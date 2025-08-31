import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  addData,
  saveData,
} from "../../reducer/chanchal/AssuRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const user = JSON.parse(localStorage.getItem("userdata"));

const AssuRegEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const dispatch = useDispatch();
  const AssuRegList = useSelector((state) => state.assuReg);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [formValues, setFormValues] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Initialize form values when data is loaded
  useEffect(() => {
    if (AssuRegList?.data?.data && id) {
      const filteredData = AssuRegList.data.data.find((itm) => itm.id === id);
      if (filteredData) {
        setFormValues({
          id: filteredData.id,
          S_No: filteredData.S_No || 1,
          date: filteredData.date || formatDate(new Date().toDateString()),
          instructions_details: filteredData.instructions_details || "",
          acknowledged_name: filteredData.acknowledged_name || "",
          acknowledged_designation: filteredData.acknowledged_designation || "",
          acknowledged_emp_no: filteredData.acknowledged_emp_no || "",
          acknowledged_sign: filteredData.acknowledged_sign || "",
          remark: filteredData.remark || "",
        });
      }
    }
  }, [AssuRegList, id]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formValues || !formValues.id) {
      alert("Error: No valid form data or ID found.");
      return;
    }
    try {
      console.log("Submitting:", formValues); // Debug payload
      await dispatch(editData(formValues)).unwrap();
      alert("Acknowledged Updated Successfully");
      navigate(`/list/${slug}`);
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  // Show loading state if formValues is not yet initialized
  if (!formValues) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Assurance Register
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">Edit: Assurance Register</h3>
              <div className="heading-line"></div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="inputDate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={formValues.date}
                  id="inputDate"
                  onChange={(e) =>
                    setFormValues({ ...formValues, date: e.target.value })
                  }
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputdetIntAss" className="form-label">
                  Details Of Instruction/Assurance
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputdetIntAss"
                  value={formValues.instructions_details}
                  readOnly={user?.role !== "Admin"}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      instructions_details: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputemp_no" className="form-label">
                  Employee No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formValues.acknowledged_emp_no}
                  id="inputemp_no"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      acknowledged_emp_no: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formValues.acknowledged_name}
                  id="inputName"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      acknowledged_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputdesignation" className="form-label">
                  Designation
                </label>
                <select
                  className="form-control"
                  value={formValues.acknowledged_designation}
                  id="inputdesignation"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      acknowledged_designation: e.target.value,
                    })
                  }
                >
                  <option value="">Select designation</option>
                  <option>Supervisor</option>
                  <option>Maintainer</option>
                  <option>AM</option>
                </select>
              </div>
              <div className="col-md-12">
                <label htmlFor="inputRemark" className="form-label">
                  Remark
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formValues.remark}
                  id="inputRemark"
                  onChange={(e) =>
                    setFormValues({ ...formValues, remark: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-12 text-center pt-3">
              <button type="submit" className="btn btn-primary me-4">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssuRegEdit;