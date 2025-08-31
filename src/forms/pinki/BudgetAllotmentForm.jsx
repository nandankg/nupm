import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
// import { formatDate, formatTime } from "../../data/formatDate";
import addData from "../../reducer/pinki/BudgetAllotmentReducer";

const BudgetAllotmentForm = () => {
  const navigate = useNavigate();
  const budgetallotment = useSelector((state) => state.budgetallotment);
  const [slug, setSlug] = useState("");
  console.log(slug);

  const basicInitialValues = {
    budgetHead: "",
    subHead: "",
    financialYear: "",
    department: "",
    budgetType: "original",
    amount: "",
  };
  const [formData, setFormData] = useState(basicInitialValues);

  useEffect(() => {
    if (budgetallotment) {
      setSlug(budgetallotment.slug);
    }
  }, [budgetallotment]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   Dispatch to Redux
  //   dispatch(addData(formData))
  //     .then((response) => {
  //       console.log("Budget Allotment submitted", response);
  // dispatch(addData(formData));
  // navigate(`/list/${slug}`);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error submitting the form!", error);
  //     });
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formData));
    // const newS_no = s_no + 1;
    // setS_no(newS_no);
    navigate(`/list/${slug}`);
  };
  console.log(formData);
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
                  value={formData.budgetHead}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label>Sub Head</label>
                <input
                  type="text"
                  name="subHead"
                  className="form-control"
                  value={formData.subHead}
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
                  value={formData.financialYear}
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
                  value={formData.department}
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
                  checked={formData.budgetType === "original"}
                  onChange={handleChange}
                />
                Original Budget Allotment
                <input
                  type="radio"
                  name="budgetType"
                  value="revised"
                  className="ms-3"
                  checked={formData.budgetType === "revised"}
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
                  min="1"
                  className="form-control"
                  value={formData.amount}
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

export default BudgetAllotmentForm;
