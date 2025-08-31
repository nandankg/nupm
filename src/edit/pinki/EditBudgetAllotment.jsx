import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import {
  editData,
  fetchData,
} from "../../reducer/pinki/BudgetAllotmentReducer";
import { formatDate } from "../../data/formatDate";

const EditBudgetAllotment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const budgetallotment = useSelector((state) => state.budgetallotment);
  console.log(budgetallotment.data.data);
  const [items, setItems] = useState([]);
  const itmm = budgetallotment.data.data;
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(budgetallotment.data.data);
  }, [dispatch]);

  useEffect(() => {
    if (budgetallotment.data && budgetallotment.data.data) {
      setItems(budgetallotment.data.data);
      setSlug(budgetallotment.slug);
      // setFilteredItems(budgetallotment.data.data);
    }
  }, [budgetallotment]);

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
    budgetHead: fd.budgetHead,
    subHead: fd.subHead,
    financialYear: fd.financialYear,
    department: fd.department,
    budgetType: fd.budgetType,
    amount: fd.amount,
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
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit">
          Budget Allotment
        </Link>
        <Link underline="hover" color="inherit">
          Register
        </Link>
      </Breadcrumbs>

      <div className="row justify-content-center">
        <h1>Finance Department</h1>
        <div
          className="col-md-8 form-container"
          style={{ marginLeft: "0", marginRight: "0", maxWidth: "75%" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">Budget Allotment</h3>
              <div className="heading-line"></div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Budget Head</label>
                <input
                  type="text"
                  name="budgetHead"
                  className="form-control"
                  value={formValues.budgetHead}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label>Sub Head</label>
                <input
                  type="text"
                  name="subHead"
                  className="form-control"
                  value={formValues.subHead}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Financial Year</label>
                <select
                  name="financialYear"
                  className="form-control"
                  value={formValues.financialYear}
                  onChange={handleChange}
                >
                  <option value="">Select FY</option>
                  <option value="2023-24">2023-24</option>
                  <option value="2024-25">2024-25</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Department</label>
                <select
                  name="department"
                  className="form-control"
                  value={formValues.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="IT">IT</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-8">
                <label>Budget Type</label>
                <br />
                <input
                  type="radio"
                  name="budgetType"
                  value="original"
                  checked={formValues.budgetType === "original"}
                  onChange={handleChange}
                />
                Original Budget Allotment
                <input
                  type="radio"
                  name="budgetType"
                  value="revised"
                  className="ms-3"
                  checked={formValues.budgetType === "revised"}
                  onChange={handleChange}
                />
                Revised Budget Allotment
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  value={formValues.amount}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="f-btn btn ">
                Save
              </button>
            </div>
          </form>
          <p className="text-center p-2">
            Note: Revised Budget allotment will be done only if Original budget
            is exhausted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditBudgetAllotment;
