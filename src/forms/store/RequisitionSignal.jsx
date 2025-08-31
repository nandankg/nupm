import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/store/RequisitionReducer";
import stationData from "../../station.json";
const user = JSON.parse(localStorage.getItem("userdata"));
// console.log(token);
const deprt = user?.department;
console.log(deprt);
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const RequisitionSignal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [date, setDate] = useState(new Date());
  const gatepass = useSelector((state) => state.requisition || []);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);
  const[item,setItem]=useState([
      {
        description: "",
        demandedQuantity: "",
        issuedQuantity: "",
        dtrPageNo: "",
        remarks: "",
      },
    ])
    const handleAddRow = () => {
      setItem([...item,    {
        description: "",
        demandedQuantity: "",
        issuedQuantity: "",
        dtrPageNo: "",
        remarks: "",
      }]);
    };
  useEffect(() => {
    if (gatepass) {
      setSlug(gatepass.slug);
    }
  }, [gatepass]);
  const [formData, setFormData] = useState({
    book_no: "",
    
    date: "",
    from: "",
    store_type: "",
    name: "",
    designation: "",
    empId: "",
    issued_name:"",
    issued_designation:"",
    issued_empID:"",
    receiver_name:"",
    receiver_designation:"",
    receiver_empID:"",
    employee_name:"",
    department:"",
    employee_id:"",
    station: "",
    maintenace_installation: "",
    items:  Array(18).fill(
      {
        description: "",
        demandedQuantity: "",
        issuedQuantity: "",
        dtrPageNo: "",
        remarks: "",
      },
    ),
    
    approved_by: "",
    approverDesignation: "",
    approverEmpId: "",
    section_incharge: "",
    section_incharge_designation: "",
    section_incharge_Id: "",
    issuerSign: "",
    receiverSign: "",
  });

  const handleChange = (e, field, index) => {
    if (index !== undefined) {
      const updatedItems = [...formData.items];
      updatedItems[index][field] = e.target.value;
      setFormData({ ...formData, items: updatedItems });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };
  // Handle change for items array
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = formData.items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    dispatch(addData(formData));
    navigate(`/list/${slug}`);
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
              value={formData.book_no}
              onChange={(e) => handleChange(e, "book_no")}
            />
          </div>
          
           
          <div className="col-md-4">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.date}
              onChange={(e) => handleChange(e, "date")}
            />
          </div>
       
          <div className="col-md-4">
            <label>Department</label>
            <input
              type="text"
              className="form-control"
              value={formData.department}
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
              value={formData.issued_name}
              onChange={(e) => handleChange(e, "issued_name")}
            />
          </div>
          <div className="col-md-4">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={formData.issued_designation}
              onChange={(e) => handleChange(e, "issued_designation")}
            />
          </div>
          <div className="col-md-4">
            <label>Emp ID</label>
            <input
              type="text"
              className="form-control"
              value={formData.issued_empID}
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
              value={formData.receiver_name}
              onChange={(e) => handleChange(e, "receiver_name")}
            />
          </div>
          <div className="col-md-4">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={formData.receiver_designation}
              onChange={(e) => handleChange(e, "receiver_designation")}
            />
          </div>
          <div className="col-md-4">
            <label>Emp ID</label>
            <input
              type="text"
              className="form-control"
              value={formData.receiver_empID}
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
              value={formData.section_incharge}
              onChange={(e) => handleChange(e, "section_incharge")}
            />
          </div>
          <div className="col-md-4">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={formData.section_incharge_designation}
              onChange={(e) => handleChange(e, "section_incharge_designation")}
            />
          </div>
          <div className="col-md-4">
            <label>Emp ID</label>
            <input
              type="text"
              className="form-control"
              value={formData.section_incharge_Id}
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
                  value={formData.station}
                  onChange={(e) =>
                    setFormData({ ...formData, station: e.target.value })
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
              value={formData.maintenace_installation}
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
            {item.map((itm, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                        value={formData.items[index].description}
                        onChange={(e) => handleItemChange(index, e)}
                    
                   
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    name="demandedQuantity"
                        value={formData.items[index].demandedQuantity}
                        onChange={(e) => handleItemChange(index, e)}
                   
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    name="issuedQuantity"
                    value={formData.items[index].issuedQuantity}
                    onChange={(e) => handleItemChange(index, e)}

                 
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="dtrPageNo"
                    value={formData.items[index].dtrPageNo}
                    onChange={(e) => handleItemChange(index, e)}

                     />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="remarks"
                    value={formData.items[index].remarks}
                    onChange={(e) => handleItemChange(index, e)}


                     />
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
        <button
                style={{ fontSize: 9,width:250 }}
                type="button"
                className="btn btn-secondary me-3"
                onClick={handleAddRow}
              >
                ADD Row
              </button>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Approved By</label>
            <input
              type="text"
              className="form-control"
              value={formData.approved_by}
              onChange={(e) => handleChange(e, "approved_by")}
            />
          </div>
          <div className="col-md-6">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={formData.approverDesignation}
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
              value={formData.approverEmpId}
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

export default RequisitionSignal;
