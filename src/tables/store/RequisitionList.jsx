import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { usePDF } from "react-to-pdf";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import {
  addData,
  fetchData,
  saveData,
} from "../../reducer/store/RequisitionReducer";
const user = JSON.parse(localStorage.getItem("userdata"));
const deprt = user?.department;
const RequisitionSlip = () => {
  const { toPDF, targetRef } = usePDF({ filename: "gatepassbook.pdf" });
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  const requisition = useSelector((state) => state.requisition || []);
  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState("");
  console.log(requisition);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  //   const location = useLocation();
  //   const { id } = location.state;
  const id = 1;
  const itmm = requisition.data.data;
  //   const [filteredData, setFilteredData] = useState([]);
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
  }

  console.log(filteredData);
  const [requisitionData, setRequisitionData] = useState({
    storeSerialNo: "",
    pageNo: "",
    date: "",
    from: "",
    dept: "",
    name: "",
    designation: "",
    empId: "",
    station: "",
    purpose: "",
    items: [
      {
        description: "",
        demandedQuantity: "",
        issuedQuantity: "",
        dtrPageNo: "",
        remarks: "",
      },
      {
        description: "",
        demandedQuantity: "",
        issuedQuantity: "",
        dtrPageNo: "",
        remarks: "",
      },
      {
        description: "",
        demandedQuantity: "",
        issuedQuantity: "",
        dtrPageNo: "",
        remarks: "",
      },
      {
        description: "",
        demandedQuantity: "",
        issuedQuantity: "",
        dtrPageNo: "",
        remarks: "",
      },
      {
        description: "",
        demandedQuantity: "",
        issuedQuantity: "",
        dtrPageNo: "",
        remarks: "",
      },
    ],
    approvedBy: "",
    approverDesignation: "",
    approverEmpId: "",
    issuerSign: "",
    receiverSign: "",
  });

  useEffect(() => {
    if (requisition.data && requisition.data.data) {
      setItems(requisition.data.data);
      setSlug(requisition.slug);
      setFilteredItems(requisition.data.data);
    }
  }, [requisition]);

  const handleSave = (id) => {
    dispatch(saveData(id));
  };

  return (
    <div
      className="container border p-4 mt-4"
      style={{ maxWidth: "900px", fontSize: "0.9rem" }}
    >
      <div className="d-flex align-items-center gap-3">
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
        {requisitionData.map((item, index) => (
          <div>
            <div className="text-center mb-3">
              <h5>उत्तर प्रदेश मेट्रो रेल कॉर्पोरेशन लिमिटेड</h5>
              <h5>UTTAR PRADESH METRO RAIL CORPORATION LIMITED</h5>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <div>Store Serial No.: {item.book_no}</div>
              <div>Original Copy</div>
              <div>Page No: {item.original_copyPageNo}</div>
            </div>
            <h6 className="text-center mb-3">
              आवश्यकता पत्रिका (REQUISITION SLIP)
            </h6>

            <div className="mb-3">
              <p>To,</p>
              <p>The Store-in-Charge,</p>
              <p>DCC Building, Transport Nagar Metro Depot, Lucknow</p>
              <p>Please issue the following material to the Self / Bearer:</p>
              <p>
                {item.receiver_name} - {item.issued_designation}, Emp. ID:
                {item.issued_empID}
              </p>
              <p>For Station: {item.station_name}</p>
              <p>Maintenance/Installation: {item.issued_type}</p>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <div>Date: {item.date}</div>
              <div>From: {item.from}</div>
              <div>Dept.: {item.department}</div>
            </div>

            <table className="table table-bordered text-center">
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
                {item.items.map((itm, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{itm.description}</td>
                    <td>{itm.demandedQuantity}</td>
                    <td>{itm.issuedQuantity}</td>
                    <td>{itm.dtrPageNo}</td>
                    <td>{itm.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="row mt-4">
              <div className="col-md-6">
                <p>Approved By: {item.approvedBy}</p>
                <p>Signature: ___________________</p>
                <p>Name: {item.approvedBy}</p>
                <p>Designation: {item.approverDesignation}</p>
                <p>Emp. ID: {item.approverEmpId}</p>
              </div>
              <div className="col-md-6">
                <p>Issuer's Sign: {item.issuerSign}</p>
                <p>Receiver's Sign: {item.receiverSign}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequisitionSlip;
