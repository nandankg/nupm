import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/pinki/DeadStockReducer";
import { formatDate, formatTime } from "../../data/formatDate";

const DeadStock = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deadstock = useSelector((state) => state.deadstock);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (deadstock) {
      setSlug(deadstock.slug);
    }
  }, [deadstock]);

  const [time] = useState(new Date().toLocaleTimeString());

  const basicInitialValues = {
    date: "",
    time: formatTime(new Date().toString),
    name: "",
    quantity: "",
    unit: "",
    unitrate: "",
    amount: "",
    Purchaseorderno: "",
    remark: "",
    actions: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <div className="container">
        <div role="presentation" className="breadcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" >
              Dead Stock
            </Link>
            <Link underline="hover" color="inherit" to="/register">
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
                  required
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
                <label htmlFor="inputquantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputquantity"
                  name="quantity"
                  min="1"
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
                  value={formValues.unit}
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
                  min="1"
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
                  min="1"
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
                  min="1"
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
    </>
  );
};

export default DeadStock;
