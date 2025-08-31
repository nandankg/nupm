import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/redux/tableDataSlice";
import { dtrissue } from "../../utils/formUtils";
import Breadcrumbs from "@mui/material/Breadcrumbs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const UnreadableCardRefundEdit = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [formData, setformData] = useState({});

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch]);

  // Initialize form values when data is loaded
  useEffect(() => {
    if (loanregister?.data?.data) {
      const filteredData = loanregister.data.data.find(
        (item) => item.id === id
      );
      if (filteredData) {
        setformData(filteredData);
      }
    }
  }, [loanregister, id]);
  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData({ formType: slug, values: formData }));
    navigate(`/list/${slug}`);
  };

    const handleSave = () => {
    dispatch(saveData(id));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Sr. No. */}
      <div className='container'>
        <h4>UnreadableCardRefundForm</h4>
        <div className='row mb-2'>
          <div className='col-md-4'>
        <label htmlFor="srNo">Sr. No.:</label>
        <input
          type="number"
          id="srNo"
          name="srNo"
            className="form-control"
          value={formData.srNo}
          onChange={handleChange}
        />
      </div>

      {/* Station */}
      <div className='col-md-4'>
        <label htmlFor="station">Station:</label>
        <input
          type="text"
          id="station"
          name="station"
            className="form-control"
          value={formData.station}
          onChange={handleChange}
        />
      </div>

      {/* Date of Receipt */}
      <div className='col-md-4'>
        <label htmlFor="dateOfReceipt">Date of Receipt:</label>
        <input
          type="date"
          id="dateOfReceipt"
          name="dateOfReceipt"
            className="form-control"
          value={formData.dateOfReceipt}
          onChange={handleChange}
        />
      </div>
      </div>
      {/* Receipt Memo No. */}
      <div className='row mb-2'>
      <div className='col-md-4'>
        <label htmlFor="receiptMemoNo">Receipt Memo No.:</label>
        <input
          type="text"
          id="receiptMemoNo"
          name="receiptMemoNo"
            className="form-control"
          value={formData.receiptMemoNo}
          onChange={handleChange}
        />
      </div>

      {/* CSC Engrave ID */}
      <div className='col-md-4'>
        <label htmlFor="cscEngraveID">CSC Engrave ID:</label>
        <input
          type="text"
          id="cscEngraveID"
          name="cscEngraveID"
            className="form-control"
          value={formData.cscEngraveID}
          onChange={handleChange}
        />
      </div>

      {/* Physical Condition */}
      <div className='col-md-4'>
        <label htmlFor="physicalCondition">Physical Condition:</label>
        <input
          type="text"
          id="physicalCondition"
          name="physicalCondition"
            className="form-control"
          value={formData.physicalCondition}
          onChange={handleChange}
        />
      </div>
</div>
      {/* Passenger Name */}
      <div className='row mb-2'>
      <div className='col-md-4'>
        <label htmlFor="passengerName">Passenger Name:</label>
        <input
          type="text"
          id="passengerName"
          name="passengerName"
            className="form-control"
          value={formData.passengerName}
          onChange={handleChange}
        />
      </div>

      {/* Contact No. */}
      <div className='col-md-4'>
        <label htmlFor="contactNo">Contact No.:</label>
        <input
          type="text"
          id="contactNo"
          name="contactNo"
            className="form-control"
          value={formData.contactNo}
          onChange={handleChange}
        />
      </div>

      {/* SC Emp Name */}
      <div className='col-md-4'>
        <label htmlFor="scEmpName">SC Emp Name:</label>
        <input
          type="text"
          id="scEmpName"
          name="scEmpName"
            className="form-control"
          value={formData.scEmpName}
          onChange={handleChange}
        />
      </div>
      </div>
      <h5>SEND DETAIL</h5>
      <div className='row mb-2'>
      <div className='col-md-4'>
        <label htmlFor="sentDetailsDate">Sent Details Date:</label>
        <input
          type="date"
          id="sentDetailsDate"
          name="sentDetailsDate"
            className="form-control"
          value={formData.sentDetailsDate}
          onChange={handleChange}
        />
      </div>

      {/* Sent to RCC */}
      <div className='col-md-4'>
        <label htmlFor="sentToRCC">Sent to RCC:</label>
        <input
          type="text"
          id="sentToRCC"
          name="sentToRCC"
            className="form-control"
          value={formData.sentToRCC}
          onChange={handleChange}
        />
      </div>

      {/* SC Emp Sent to RCC */}
      <div className='col-md-4'>
        <label htmlFor="scEmpSentToRCC">SC Emp Sent to RCC:</label>
        <input
          type="text"
          id="scEmpSentToRCC"
          name="scEmpSentToRCC"
            className="form-control"
          value={formData.scEmpSentToRCC}
          onChange={handleChange}
        />
      </div>
      </div>
      <h5>Received DETAIL</h5>
      {/* Received Details Date */}
      <div className='row mb-2'>
      <div className='col-md-4'>
        <label htmlFor="receivedDetailsDate">Received Details Date:</label>
        <input
          type="date"
          id="receivedDetailsDate"
          name="receivedDetailsDate"
            className="form-control"
          value={formData.receivedDetailsDate}
          onChange={handleChange}
        />
      </div>

      {/* Received from RCC */}
      <div className='col-md-4'>
        <label htmlFor="receivedFromRCC">Received from RCC:</label>
        <input
          type="text"
          id="receivedFromRCC"
          name="receivedFromRCC"
            className="form-control"
          value={formData.receivedFromRCC}
          onChange={handleChange}
        />
      </div>

      {/* SC Emp Received from RCC */}
      <div className='col-md-4'>
        <label htmlFor="scEmpReceivedFromRCC">SC Emp Received from RCC:</label>
        <input
          type="text"
          id="scEmpReceivedFromRCC"
          name="scEmpReceivedFromRCC"
            className="form-control"
          value={formData.scEmpReceivedFromRCC}
          onChange={handleChange}
        />
      </div>
</div>
      {/* Type of Security */}
      <div className='row mb-2'>
      <div className='col-md-4'>
        <label htmlFor="typeOfSecurity">Type of Security:</label>
        <input
          type="text"
          id="typeOfSecurity"
          name="typeOfSecurity"
            className="form-control"
          value={formData.typeOfSecurity}
          onChange={handleChange}
        />
      </div>

      {/* Refundable */}
      <div className='col-md-4'>
        <label htmlFor="refundable">Refundable:</label>
        <input
          type="text"
          id="refundable"
          name="refundable"
            className="form-control"
          value={formData.refundable}
          onChange={handleChange}
        />
      </div>

      {/* Balance */}
      <div className='col-md-4'>
        <label htmlFor="balance">Balance:</label>
        <input
          type="number"
          id="balance"
          name="balance"
            className="form-control"
          value={formData.balance}
          onChange={handleChange}
        />
      </div>
</div>
      {/* Total Amount */}
      <div className='row mb-2'>
      <div className='col-md-4'>
   
        <label htmlFor="totalAmount">Total Amount:</label>
        <input
          type="number"
          id="totalAmount"
          name="totalAmount"
            className="form-control"
          value={formData.totalAmount}
          onChange={handleChange}
        />
      </div>

      {/* Refund Memo No. */}
      <div className='col-md-4'>
        <label htmlFor="refundMemoNo">Refund Memo No.:</label>
        <input
          type="text"
          id="refundMemoNo"
          name="refundMemoNo"
            className="form-control"
          value={formData.refundMemoNo}
          onChange={handleChange}
        />
      </div>

      {/* Refunded On Date */}
      <div className='col-md-4'>
        <label htmlFor="refundedOnDate">Refunded On Date:</label>
        <input
          type="date"
          id="refundedOnDate"
          name="refundedOnDate"
            className="form-control"
          value={formData.refundedOnDate}
          onChange={handleChange}
        />
      </div>
</div>
      {/* Amount Refunded */}
      <div className='row mb-2'>
      <div className='col-md-4'>
        <label htmlFor="amountRefunded">Amount Refunded:</label>
        <input
          type="number"
          id="amountRefunded"
          name="amountRefunded"
            className="form-control"
          value={formData.amountRefunded}
          onChange={handleChange}
        />
      </div>
</div>
      <button type="submit">Submit</button>
      </div>
    </form> );
};

export default UnreadableCardRefundEdit;
