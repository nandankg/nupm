import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import {
  editData,
  fetchData,
} from "../../reducer/pinki/DeadStockReducer";
import { formatDate } from "../../data/formatDate";

const EditDeadStock = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const deadstock = useSelector((state) => state.deadstock);
  console.log(deadstock.data.data);
  const [items, setItems] = useState([]);
  const itmm = deadstock.data.data;
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(deadstock.data.data);
  }, [dispatch]);

  useEffect(() => {
    if (deadstock.data && deadstock.data.data) {
      setItems(deadstock.data.data);
      setSlug(deadstock.slug);
      // setFilteredItems(deadstock.data.data);
    }
  }, [deadstock]);

  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

  const fd = filteredData ? filteredData[0] : {};

  const basicInitialValues = {
    id: fd.id || "",
    nameofitem: fd.name,
    quantity: fd.quantity,
    units: fd.unit,
    unitrate: fd.unitrate,
    amount: fd.amount,
    Purchaseorderno: fd.Purchaseorderno,
    remark: fd.remark,
    date: fd.date,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  useEffect(() => {
    setFormValues(basicInitialValues);
  }, [fd]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Dead Stock
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading"> Dead Stock Register</h3>
              <div className="heading-line"></div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputdate" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="inputdate"
                name="date"
                value={formValues.date}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputname" className="form-label">
                Name of Item
              </label>
              <input
                type="text"
                className="form-control"
                id="inputname"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputquant" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="inputquant"
                name="quantity"
                value={formValues.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputunit" className="form-label">
                Unit
              </label>
              <input
                type="text"
                className="form-control"
                id="inputunit"
                name="unit"
                value={formValues.units}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputunitrate" className="form-label">
                Unit Rate in Rs.
              </label>
              <input
                type="number"
                className="form-control"
                id="inputunitrate"
                name="unitrate"
                value={formValues.unitrate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputamount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="inputamount"
                name="amount"
                value={formValues.amount}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputpurchaseorderno" className="form-label">
                Purchase order No.
              </label>
              <input
                type="number"
                className="form-control"
                id="inputpurchaseorderno"
                name="Purchaseorderno"
                value={formValues.Purchaseorderno}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputremark" className="form-label">
                Remark
              </label>
              <input
                type="text"
                className="form-control"
                id="inputremark"
                name="remark"
                value={formValues.remark}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDeadStock;
