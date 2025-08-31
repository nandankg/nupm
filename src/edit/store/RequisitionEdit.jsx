import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useLocation } from "react-router-dom";
import { editData, fetchData } from "../../reducer/store/RequisitionReducer";
import stationData from "../../station.json";
import { getDate } from "date-fns";
const user = JSON.parse(localStorage.getItem("userdata"));
// console.log(token);
const deprt = user?.department;
console.log(deprt);
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const RequisitionEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const assetreg = useSelector((state) => state.requisition);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  let filteredData;
  const itmm = assetreg.data.data;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  let fd = filteredData[0];
  // Initialize form values when data is loaded
  // useEffect(() => {
  //   if (assetreg.data.data) {
  //     const filteredData = assetreg.data.data.find((item) => item.id === id);
  //     if (filteredData) {
  //       setFormValues(filteredData);
  //     }
  //   }
  // }, [assetreg, id]);

  const [formValues, setFormValues] = useState({
    storeSerialNo: fd.storeSerialNo,
    pageNo: fd.pageNo,
    date: fd.date,
    from: fd.from,
    store_type: fd.store,
    name: fd.name,
    designation: fd.designation,
    empId: fd.empId,
    station: fd.station,
    purpose: fd.purpose,
    items: [
      {
        description: fd.items[0].description,
        demandedQuantity: fd.items[0].demandedQuantity,
        issuedQuantity: fd.items[0].issuedQuantity,
        dtrPageNo: fd.items[0].dtrPageNo,
        remarks: fd.items[0].remarks,
      },
      {
        description: fd.items[1].description,
        demandedQuantity: fd.items[1].demandedQuantity,
        issuedQuantity: fd.items[1].issuedQuantity,
        dtrPageNo: fd.items[1].dtrPageNo,
        remarks: fd.items[1].remarks,
      },
      {
        description: fd.items[2].description,
        demandedQuantity: fd.items[2].demandedQuantity,
        issuedQuantity: fd.items[2].issuedQuantity,
        dtrPageNo: fd.items[2].dtrPageNo,
        remarks: fd.items[2].remarks,
      },
      {
        description: fd.items[3].description,
        demandedQuantity: fd.items[3].demandedQuantity,
        issuedQuantity: fd.items[3].issuedQuantity,
        dtrPageNo: fd.items[3].dtrPageNo,
        remarks: fd.items[3].remarks,
      },
      {
        description: fd.items[4].description,
        demandedQuantity: fd.items[4].demandedQuantity,
        issuedQuantity: fd.items[4].issuedQuantity,
        dtrPageNo: fd.items[4].dtrPageNo,
        remarks: fd.items[4].remarks,
      },
    ],
    approved_by: fd.approved_by,
    approverDesignation: fd.approverDesignation,
    approverEmpId: fd.approverEmpId,
    issuerSign: "",
    receiverSign: "",
  });
  console.log(formValues);
  const handleChange = (e, field, index) => {
    if (index !== undefined) {
      const updatedItems = [...formValues.items];
      updatedItems[index][field] = e.target.value;
      setFormValues({ ...formValues, items: updatedItems });
    } else {
      setFormValues({ ...formValues, [field]: e.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${assetreg.slug}`);
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="border p-4">
        <div className="mb-3 text-center">
          <h5>UTTAR PRADESH METRO RAIL CORPORATION LIMITED</h5>
          <h6>REQUISITION SLIP</h6>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label>Requisition Slip Number.</label>
            <input
              type="text"
              className="form-control"
              value={formValues.storeSerialNo}
              onChange={(e) => handleChange(e, "storeSerialNo")}
            />
          </div>
          
           
          <div className="col-md-4">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={formValues.date}
              onChange={(e) => handleChange(e, "date")}
            />
          </div>
       
          <div className="col-md-4">
            <label>Department</label>
            <input
              type="text"
              className="form-control"
              value={formValues.department}
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
              value={formValues.issued_name}
              onChange={(e) => handleChange(e, "issued_name")}
            />
          </div>
          <div className="col-md-4">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={formValues.issued_designation}
              onChange={(e) => handleChange(e, "issued_designation")}
            />
          </div>
          <div className="col-md-4">
            <label>Emp ID</label>
            <input
              type="text"
              className="form-control"
              value={formValues.issued_empID}
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
              value={formValues.receiver_name}
              onChange={(e) => handleChange(e, "receiver_name")}
            />
          </div>
          <div className="col-md-4">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={formValues.receiver_designation}
              onChange={(e) => handleChange(e, "receiver_designation")}
            />
          </div>
          <div className="col-md-4">
            <label>Emp ID</label>
            <input
              type="text"
              className="form-control"
              value={formValues.receiver_empID}
              onChange={(e) => handleChange(e, "receiver_empID")}
            />
          </div>
        </div>
        <h4>Section Incharge Details</h4>
        <div className="row mb-3">
          <div className="col-md-4">
            <label> Name</label>
            <input
              type="text"
              className="form-control"
              value={formValues.employee_name}
              onChange={(e) => handleChange(e, "employee_name")}
            />
          </div>
          <div className="col-md-4">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={formValues.approverDesignation}
              onChange={(e) => handleChange(e, "approverDesignation")}
            />
          </div>
          <div className="col-md-4">
            <label>Emp ID</label>
            <input
              type="text"
              className="form-control"
              value={formValues.employee_id}
              onChange={(e) => handleChange(e, "employee_id")}
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
                  value={formValues.station}
                  onChange={(e) =>
                    setFormValues({ ...formValues, station: e.target.value })
                  }
                  required
                >
                  <option value="">Select Station</option>
                  {stationData
                    .filter((station) => station["Station Name"]) // Exclude entries with null station names
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
              value={formValues.purpose}
              onChange={(e) => handleChange(e, "purpose")}
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
                    value={item.description}
                    onChange={(e) => handleChange(e, "description", index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.demandedQuantity}
                    onChange={(e) => handleChange(e, "demandedQuantity", index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.issuedQuantity}
                    onChange={(e) => handleChange(e, "issuedQuantity", index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.dtrPageNo}
                    onChange={(e) => handleChange(e, "dtrPageNo", index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={item.remarks}
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
              value={formValues.approved_by}
              onChange={(e) => handleChange(e, "approved_by")}
            />
          </div>
          <div className="col-md-6">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={formValues.approverDesignation}
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
              value={formValues.approverEmpId}
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

export default RequisitionEdit;
