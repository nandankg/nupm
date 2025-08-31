import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/rajiv/ImprestRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const ImprestReg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imprestRegisterList = useSelector((state) => state.imprestRegister);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    setSlug(imprestRegisterList.slug);
  }, [imprestRegisterList]);

  const [formData, setFormData] = useState({
    date: "",
    imprest_no: "",
    billdetail: [
      {
        billNo: "",
        item_name: "",
        name_Address: "",
        qty: 0,
        rate: 0,
        amount: 0,
        gst: 0,
        totalAmount: 0,
      },
    ],
  });

  const handleChange = (e, index, field) => {
    const { value } = e.target;
    let gst=0;
    const newBillDetails = [...formData.billdetail];
    newBillDetails[index][field] = field.includes("qty") || field.includes("rate") || field.includes("gst")
      ? parseFloat(value) || 0
      : value;
    newBillDetails[index].amount = newBillDetails[index].qty * newBillDetails[index].rate;
    gst=newBillDetails[index].amount*newBillDetails[index].gst/100;
    newBillDetails[index].totalAmount = newBillDetails[index].amount + gst;

    setFormData({ ...formData, billdetail: newBillDetails });
  };

  const addBillDetail = () => {
    setFormData({
      ...formData,
      billdetail: [
        ...formData.billdetail,
        { billNo: "", item_name: "", name_Address: "", qty: 0, rate: 0, amount: 0, gst: 0, totalAmount: 0 },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addData(formData));
    navigate(`/list/${slug}`);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Imprest Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Imprest No.</label>
          <input type="text" className="form-control" value={formData.imprest_no} onChange={(e) => setFormData({ ...formData, imprest_no: e.target.value })} required />
        </div>
        </div>
        <h5>Bill Details</h5>
        {formData.billdetail.map((bill, index) => (
          <div key={index}>
          <div className="row mb-3" >
            <div className="col-md-4">
            <label className="form-label">Bill No</label>
              <input type="text" className="form-control" placeholder="Bill No" value={bill.billNo} onChange={(e) => handleChange(e, index, "billNo")} required />
            </div>
            </div>
            <div className="row mb-3">
            <div className="col-md-6">
            <label className="form-label">Item Name</label>
              <input type="text" className="form-control" placeholder="Item Name" value={bill.item_name} onChange={(e) => handleChange(e, index, "item_name")} required />
            </div>
            <div className="col-md-6">
            <label className="form-label">Name & Address</label>
              <input type="text" className="form-control" placeholder="Name & Address" value={bill.name_Address} onChange={(e) => handleChange(e, index, "name_Address")} required />
            </div>
            </div>
            <div className="row mb-3">
            <div className="col">
            <label className="form-label">Qty</label>
              <input type="number" className="form-control" placeholder="Qty" value={bill.qty} onChange={(e) => handleChange(e, index, "qty")} required />
            </div>
            <div className="col">
            <label className="form-label">Rate</label>
              <input type="number" className="form-control" placeholder="Rate" value={bill.rate} onChange={(e) => handleChange(e, index, "rate")} required />
            </div>
            <div className="col">
            <label className="form-label">GST</label>
              <input type="number" className="form-control" placeholder="GST" value={bill.gst} onChange={(e) => handleChange(e, index, "gst")} required />
            </div>
            <div className="col">
            <label className="form-label">Total Amount</label>
              <input type="number" className="form-control" placeholder="Total Amount" value={bill.totalAmount} readOnly />
            </div>
          </div>
          </div>
        ))}
        <button type="button" className="btn btn-primary mb-3" onClick={addBillDetail}>
          Add Bill Detail
        </button>
        <br />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};


export default ImprestReg;
