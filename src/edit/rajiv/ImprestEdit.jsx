import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/rajiv/ImprestRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";

const user = JSON.parse(localStorage.getItem("userdata"));

const ImprestEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const dispatch = useDispatch();
  const imprestRegisterList = useSelector((state) => state.imprestRegister);
  const [slug, setSlug] = useState("");
  const [formData, setFormData] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Update formData and slug when imprestRegisterList changes
  useEffect(() => {
    if (imprestRegisterList.data.data && id) {
      const filteredData = imprestRegisterList.data.data.find((itm) => itm.id === id);
      if (filteredData) {
        setFormData(filteredData);
        setSlug(imprestRegisterList.slug || "");
      }
    }
  }, [imprestRegisterList, id]);

  // Handle input changes for bill details
  const handleChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const newBillDetails = prevData.billdetail.map((bill, i) =>
        i === index
          ? {
              ...bill,
              [field]:
                field.includes("qty") || field.includes("rate") || field.includes("gst")
                  ? parseFloat(value) || 0
                  : value,
            }
          : bill
      );

      newBillDetails[index].amount = newBillDetails[index].qty * newBillDetails[index].rate;
      newBillDetails[index].totalAmount =
        newBillDetails[index].amount + newBillDetails[index].gst;

      return { ...prevData, billdetail: newBillDetails };
    });
  };

  // Add a new bill detail
  const addBillDetail = () => {
    setFormData((prevData) => ({
      ...prevData,
      billdetail: [
        ...prevData.billdetail,
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
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData || !formData.id) {
      alert("Error: No valid form data or ID found.");
      return;
    }

    try {
      console.log("Submitting:", formData); // Debug payload
      await dispatch(editData(formData)).unwrap();
      navigate(`/list/${slug}`);
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const { toPDF, targetRef } = usePDF({
    filename: "Imprest Register form.pdf",
  });

  // Show loading state if formData is not yet initialized
  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Imprest Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.date || ""}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Imprest No.</label>
            <input
              type="text"
              className="form-control"
              value={formData.imprest_no || ""}
              onChange={(e) => setFormData({ ...formData, imprest_no: e.target.value })}
            />
          </div>
        </div>
        <h5>Bill Details</h5>
        {formData.billdetail.map((bill, index) => (
          <div key={index}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Bill No</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bill No"
                  value={bill.billNo || ""}
                  onChange={(e) => handleChange(e, index, "billNo")}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item Name"
                  value={bill.item_name || ""}
                  onChange={(e) => handleChange(e, index, "item_name")}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Name & Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name & Address"
                  value={bill.name_Address || ""}
                  onChange={(e) => handleChange(e, index, "name_Address")}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Qty</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Qty"
                  value={bill.qty || 0}
                  onChange={(e) => handleChange(e, index, "qty")}
                />
              </div>
              <div className="col">
                <label className="form-label">Rate</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Rate"
                  value={bill.rate || 0}
                  onChange={(e) => handleChange(e, index, "rate")}
                />
              </div>
              <div className="col">
                <label className="form-label">GST</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="GST"
                  value={bill.gst || 0}
                  onChange={(e) => handleChange(e, index, "gst")}
                />
              </div>
              <div className="col">
                <label className="form-label">Total Amount</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Total Amount"
                  value={bill.totalAmount || 0}
                  readOnly
                />
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

export default ImprestEdit;