import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";

import { initializeFormValues } from "../../utils/formUtils";

import station from "../../data/station.json";
import {
  fetchData,
  saveData,
  editData,
} from "../../reducer/redux/tableDataSlice";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const RequisitionSlipList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const user = JSON.parse(localStorage.getItem("userdata"));
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const assetreg = useSelector((state) => state.data);
  const [formValues, setFormValues] = useState({});
  const { toPDF, targetRef } = usePDF({ filename: "requisition.pdf" });
  console.log(assetreg);
  const[items,setItems]=useState([]);
  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch]);

  // Initialize form values when data is loaded
  useEffect(() => {
    if (assetreg?.data?.data) {
      const filteredData = assetreg.data.data.find((item) => item.id === id);
      if (filteredData) {
        setFormValues(filteredData);
      }
    }
  }, [assetreg, id]);

  useEffect(() => {
    // Filter out rows where all fields are null
    if(formValues.items && formValues.items.length > 0){
  const filtItem = formValues.items.filter(
  (item) =>
    Object.values(item).some((value) => value !== null)
  );
  setItems(filtItem);
}
  },[formValues])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(formValues);

  const handleSave = () => {
    dispatch(saveData({ formType: slug, id }));
    navigate(`/list/${slug}`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center gap-3 mt-3">
        <div className="d-flex gap-3">
          <button
            className="btn"
            onClick={() => toPDF()}
            style={{
              border: "1px solid #0baa9a",
            }}
          >
            <MdPictureAsPdf size={"25px"} color="#850d04" />
          </button>
        </div>
      </div>
      <div ref={targetRef}>
        <div className="mb-4">
          <h1>Requisition Slip</h1>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Date</th>
                <td>{formValues.date}</td>
                <th> Requisition Slip Number</th>
                <td>{formValues.book_no}</td>
              </tr>
            
              <tr>
                <th>Department</th>
                <td>{formValues.department}</td>
                <th>Station Name</th>
                <td>{formValues.station}</td>
              </tr>
            </tbody>
          </table>

                        <h4>Section Incharge</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{formValues.section_incharge}</td>
                <th>Designation</th>
                <td>{formValues.section_incharge_designation}</td>
                <th>Employee ID</th>
                <td>{formValues.section_incharge_Id}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Items Section */}
        <div className="mb-4">
          <h4>Items</h4>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Demanded Quantity</th>
                <th>Issued Quantity</th>
                <th>DTR Page No</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {formValues.items && formValues.items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.description || "-"}</td>
                    <td>{item.demandedQuantity || "-"}</td>
                    <td>{item.issuedQuantity || "-"}</td>
                    <td>{item.dtrPageNo || "-"}</td>
                    <td>{item.remarks || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No items available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
<h4>Issued By</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{formValues.issued_name}</td>
                <th>Designation</th>
                <td>{formValues.issued_designation}</td>
                <th>Employee ID</th>
                <td>{formValues.issued_empID}</td>
              </tr>
            </tbody>
          </table>

          <h4>Receiver Information</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{formValues.receiver_name}</td>
                <th>Designation</th>
                <td>{formValues.receiver_designation}</td>
                <th>Employee ID</th>
                <td>{formValues.receiver_empID}</td>
              </tr>
              </tbody>
              </table>

        {/* Approved By Section */}
        <div className="mb-4">
          <h4>Approval Information</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Approved By</th>
                <td>{formValues.approved_by}</td>
                <th>Approver ID</th>
                <td>{formValues.approverEmpId}</td>
                <th>Approver Designation</th>
                <td>{formValues.approverDesignation}</td>
              </tr>
              <tr></tr>
              <tr>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td className="d-flex gap-3 mt-3 justify-content-end">
                  {formValues.status === "0" || user?.role === "Admin" ? (
                    <div className="d-flex ">
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: formValues.id }}
                        className="btn btn-primary align-content-center mx-3"
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        onClick={() => {
                          handleSave(formValues.id);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequisitionSlipList;
