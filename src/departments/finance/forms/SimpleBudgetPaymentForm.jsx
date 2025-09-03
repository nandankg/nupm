import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../../data/formatDate";
import { addData } from "../redux/budgetSlice";

const SimpleBudgetPaymentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Budget = useSelector((state) => state.Budget);
  const [slug, setSlug] = useState("");
  
  useEffect(() => {
    if (Budget) {
      setSlug(Budget.slug);
    }
  }, [Budget]);

  // PRESERVED EXACT INITIAL VALUES - No changes
  const basicInitialValues = {
    voucherno: "",
    paymentAmount: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  
  // NEW: Form validation states (without changing existing functionality)
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // NEW: Form validation function
  const validateForm = () => {
    const errors = {};
    
    if (!formValues.paymentAmount.trim()) {
      errors.paymentAmount = "Payment Amount is required";
    } else if (isNaN(formValues.paymentAmount) || parseFloat(formValues.paymentAmount) <= 0) {
      errors.paymentAmount = "Payment Amount must be a valid positive number";
    }
    
    if (!formValues.voucherno.trim()) {
      errors.voucherno = "Voucher No is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ENHANCED SUBMIT with validation
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // PRESERVED EXACT SUBMISSION LOGIC
    dispatch(addData(formValues))
      .then(() => {
        navigate("/table/BudgetPayment");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // PRESERVED EXACT CHANGE HANDLER with validation enhancement
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    
    // Clear field error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Helper function to display errors
  const renderFieldError = (fieldName) => {
    return formErrors[fieldName] ? (
      <div className="text-danger small mt-1" role="alert">
        {formErrors[fieldName]}
      </div>
    ) : null;
  };

  return (
    <div className="container">
      {/* PRESERVED EXACT BREADCRUMBS */}
      <div role="presentation" className="bredcrumbs">
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
            {/* PRESERVED EXACT HEADING */}
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">
                Finance Department Budget Register(Payment)
              </h3>
              <div className="heading-line"></div>
            </div>

            {/* PRESERVED EXACT FORM FIELDS with validation */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="paymentAmount" className="form-label">
                  Payment Amount
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="paymentAmount"
                  name="paymentAmount"
                  value={formValues.paymentAmount}
                  onChange={handleChange}
                  className={`form-control ${formErrors.paymentAmount ? 'is-invalid' : ''}`}
                  required
                />
                {renderFieldError('paymentAmount')}
              </div>
              
              <div className="col-md-6">
                <label htmlFor="voucherno" className="form-label">
                  Voucher No.
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="voucherno"
                  name="voucherno"
                  value={formValues.voucherno}
                  onChange={handleChange}
                  className={`form-control ${formErrors.voucherno ? 'is-invalid' : ''}`}
                  required
                />
                {renderFieldError('voucherno')}
              </div>
            </div>

            {/* PRESERVED EXACT SUBMIT BUTTON */}
            <div className="col-12 text-center pt-3">
              <button 
                type="submit" 
                className="btn btn-primary px-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimpleBudgetPaymentForm;