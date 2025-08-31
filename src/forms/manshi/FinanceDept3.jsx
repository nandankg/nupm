import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import { addData } from "../../reducer/manshi/BudgetAllotmentReducer";

const FinanceDept3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Budget = useSelector((state) => state.Budget);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (Budget) {
      setSlug(Budget.slug);
    }
  }, [Budget]);
  const basicInitialValues = {
    voucherno: "",
    paymentAmount: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate("/table/BudgetPayment");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Budget Register(Payment)
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">
                Finance Department Budget Register(Payment)
              </h3>
              <div className="heading-line"></div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="paymentAmount">Payment Amount</label>
                <input
                  type="text"
                  id="paymentAmount"
                  name="paymentAmount"
                  value={formValues.paymentAmount}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="voucherno">Voucher No.</label>
                <input
                  type="text"
                  id="voucherno"
                  name="voucherno"
                  value={formValues.voucherno}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-12 text-center pt-3">
              <button type="submit" className="btn btn-primary px-3">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinanceDept3;
