import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/redux/tableDataSlice";
import stationData from "../../station.json";

const user = JSON.parse(localStorage.getItem("userdata"));

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const EditRequisitionSignal = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const dispatch = useDispatch();
  const assetreg = useSelector((state) => state.data);

  const [formValues, setFormValues] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch, slug]);

  // Initialize form values when data is loaded
  useEffect(() => {
    if (assetreg?.data?.data && id) {
      const filteredData = assetreg.data.data.find((item) => item.id === id);
      if (filteredData) {
        setFormValues({
          ...filteredData,
          items: filteredData.items || [], // Ensure items is an array
        });
      }
    }
  }, [assetreg, id]);

  const handleChange = (e, field, index) => {
    if (index !== undefined) {
      setFormValues((prev) => ({
        ...prev,
        items: prev.items.map((item, i) =>
          i === index ? { ...item, [field]: e.target.value } : item
        ),
      }));
    } else {
      setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues || !formValues.id) {
      alert("Error: No valid form data or ID found.");
      return;
    }
    try {
      console.log("Submitting Data:", formValues);
      await dispatch(editData({ formType: slug, values: formValues })).unwrap();
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
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="border p-4">
        <div className="mb-3 text-center">
          <h5>UTTAR PRADESH METRO RAIL CORPORATION LIMITED</h5>
          <h6>REQUISITION SLIP</h6>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label>Requisition Slip Number</label>
            <input
              type="text"
              className="form-control"
              value={formValues.book_no || ""}
              onChange={(e) => handleChange(e, "book_no")}
            />
          </div>
          <div className="col-md-4">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={formValues.date || ""}
              onChange={(e) => handleChange(e, "date")}
            />
          </div>
          <div className="col-md-4">
            <label>Department</label>
            <input
              type="text"
              className="form-control"
              value={formValues.department || ""}
              onChange={(e) => handleChange(e, "department")}
            />
          </div>
        </div>

        <h4>Issuer Details</h4>
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Issuer Name</label>
            <input
              type="text"
              className="form-control"
              value={formValues.issued_name || ""}
              onChange={(e) => handleChange(e, "issued_name")}
            />
          </div>
          <div className="col-md-4">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={formValues.issued_designation || ""}
              onChange={(e) => handleChange(e, "issued_designation")}
            />
          </div>
          <div className="col-md-4">
            <label>Emp ID</label>
            <input
              type="text"
              className="form-control"
              value={formValues.issued_empID || ""}
              onChange={(e) => handleChange(e, "issued_empID")}
            />
          </div>
        </div>

        <h4>Receiver Details</h4>
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={formValues.receiver_name || ""}
              onChange={(e) => handleChange(e, "receiver_name")}
            />
          </div>
          <div className="col-md-4">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={formValues.receiver_designation || ""}
              onChange={(e) => handleChange(e, "receiver_designation")}
            />
          </div>
          <div className="col-md-4">
            <label>Emp ID</label>
            <input
              type="text"
              className="form-control"
              value={formValues.receiver_empID || ""}
              onChange={(e) => handleChange(e, "receiver_empID")}
            />
          </div>
        </div>

        <h4>Section Incharge Details</h4>
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={formValues.section_incharge || ""}
              onChange={(e) => handleChange(e, "section_incharge")}
            />
          </div>
          <div className="col-md-4">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={formValues.section_incharge_designation || ""}
              onChange={(e) => handleChange(e, "section_incharge_designation")}
            />
          </div>
          <div className="col-md-4">
            <label>Emp ID</label>
            <input
              type="text"
              className="form-control"
              value={formValues.section_incharge_Id || ""}
              onChange={(e) => handleChange(e, "section_incharge_Id")}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="inputstation" className="form-label">
              Station
            </label>
            <select
              className="form-control"
              id="station"
              value={formValues.station || ""}
              onChange={(e) => handleChange(e, "station")}
              required
            >
              <option value="">Select Station</option>
              {stationData
                .filter((station) => station["Station Name"])
                .map((station) => (
                  <option
                    key={station["STATION Code"]}
                    value={station["Station Name"]}
                  >
                    {station["Station Name"]}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-6">
            <label>Maintenance/Installation Purpose</label>
            <input
              type="text"
              className="form-control"
              value={formValues.maintenace_installation || ""}
              onChange={(e) => handleChange(e, "maintenace_installation")}
            />
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Description of Material</th>
              <th>Demanded Quantity</th>
              <th>Issued Quantity</th>
              <th>DTR Page No. & Date</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {formValues.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.description || ""}
                    onChange={(e) => handleChange(e, "description", index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.demandedQuantity || ""}
                    onChange={(e) => handleChange(e, "demandedQuantity", index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.issuedQuantity || ""}
                    onChange={(e) => handleChange(e, "issuedQuantity", index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.dtrPageNo || ""}
                    onChange={(e) => handleChange(e, "dtrPageNo", index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.remarks || ""}
                    onChange={(e) => handleChange(e, "remarks", index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Approved By</label>
            <input
              type="text"
              className="form-control"
              value={formValues.approved_by || ""}
              onChange={(e) => handleChange(e, "approved_by")}
            />
          </div>
          <div className="col-md-6">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={formValues.approverDesignation || ""}
              onChange={(e) => handleChange(e, "approverDesignation")}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Emp ID</label>
            <input
              type="text"
              className="form-control"
              value={formValues.approverEmpId || ""}
              onChange={(e) => handleChange(e, "approverEmpId")}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditRequisitionSignal;