import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, saveData } from "../../reducer/pinki/FMTSReducer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PDFExportComponent from "../../component/PDFExportComponent";
import { DownloadTableExcel } from "react-export-table-to-excel";

import { RiFileExcel2Fill } from "react-icons/ri";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const FMTSList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [items, setItems] = useState({});
   const tableRef = useRef(null);
  const fmtsdata = useSelector((state) => state.fmtsbook);
  const user = JSON.parse(localStorage.getItem("userdata"));
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (fmtsdata?.data?.data) {
      const filteredData = fmtsdata.data.data.find((item) => item.id === id);
      if (filteredData) {
        setItems(filteredData);
      }
    }
  }, [fmtsdata, id]);
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
  return (
    <>
      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="FMTS List.pdf"
      />
    
      <div
        id="section-to-export"
        className="container w-75"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <h3 style={{ textAlign: "center", textDecoration: "underline" }}>
          OSIS/FMTS
        </h3>

        <table className="table table-bordered">
          <tr>
            {" "}
            <th>Book Foil S.No.:</th> <td>{items.book_foil_no}</td>
          </tr>

          <tr>
            <td colSpan={2}>
              <h5>Failure Details (To be filled by section staff)</h5>
            </td>
          </tr>
          <tr>
            {" "}
            <th>Station: </th>
            <td>{items.station}</td>
          </tr>
          <tr>
            {" "}
            <th>Equipment No.:</th>
            <td>{items.eqpt_no}</td>
          </tr>
          <tr>
            {" "}
            <th>Date/Time:</th>
            <td>
              {items.failure_date}/{items.failure_time}
            </td>
          </tr>
          <tr>
            {" "}
            <th>Item Name:</th>
            <td> {items.item_name}</td>
          </tr>
          <tr>
            {" "}
            <th>Item S.No:</th>
            <td>{items.item_sl_no}</td>
          </tr>
          <tr>
            {" "}
            <th>Details of Failure:</th>
            <td> {items.detail_of_failure}</td>
          </tr>
          <tr>
            {" "}
            <th>Remarks/Deficiency</th>
            <td>{items.remarks_deficiency}</td>
          </tr>
          <tr>
            {" "}
            <th>Attended by:</th>
            <td>{items.attended_by}</td>
          </tr>
        </table>

        <div>
          <strong>Received By:</strong> {items.received_by} <br />
          <strong>Company:</strong> {items.company}
          <br />
          <strong>Designation:</strong> {items.sign_of_je_sse}
        </div>

        <h5>Repair Details (To be filled by repair staff)</h5>
        <table className="table table-bordered">
          <tr>
            {" "}
            <th>Receiving Date:</th>
            <td>{items.receiveing_date}</td>
          </tr>
          <tr>
            {" "}
            <th>H/O By:</th>
            <td>{items.ho_by}</td>
          </tr>
          <tr>
            {" "}
            <th>Physical Status: </th>
            <td> {items.physical_status}</td>
          </tr>
          <tr>
            {" "}
            <th>Operational Status: </th>
            <td> {items.operational_status}</td>
          </tr>
          <tr>
            {" "}
            <th>Details of Fault: </th>
            <td>{items.detail_of_default}</td>
          </tr>
          <tr>
            {" "}
            <th>Details of Rectification: </th>
            <td>{items.rectification_details}</td>
          </tr>
          <tr>
            {" "}
            <th>Replacement Details:</th>
            <td> {items.replacement_details}</td>
          </tr>

          <tr>
            <td colSpan={2}>
              <h5>If Different Item is Issued</h5>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              {" "}
              Is new item: <span>{items.is_newitem==="1" ? "Y" : "No"}</span> &nbsp; |
              &nbsp; Is it repaired: {items.is_repaireditem==="1" ? "Y" : "No"}
              &nbsp;&nbsp; 
            </td>{" "}
          </tr>
          <tr>
            {" "}
            <th>New Item S.No./Repaired Item Detail: </th>
            <td> {items.item_details} &nbsp; &nbsp; | &nbsp; &nbsp; {items.old_fmts_no}  </td>
          </tr>
        </table>
        <h5>Additional Information</h5>
        <div>Remarks: {items.remarks}</div>
        <div>Date Rectified: {items.rectified_date}</div>
        <div>
          Repaired By: {items.rectified_by} <br />
        </div>
        <div>
          HO To: {items.ho} <br />
          HO Date: {items.ho_date} <br />
        </div>
        <div>
          {items.status === "0" || user.role === "Admin" ? (
            <div className="d-flex justify-content-center gap-2">
              <Link
                to={`/edit/${slug}`}
                state={{ id: items.id }}
                className="btn btn-primary"
              >
                Edit
              </Link>
              <button
                type="submit"
                onClick={() => {
                  handleSave(items.id);
                }}
              >
                Submit
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default FMTSList;
