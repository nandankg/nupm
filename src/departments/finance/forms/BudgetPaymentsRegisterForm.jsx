import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalFinanceFormField, FinanceFormLayout } from "../components";
import { addData, budgetheadList } from "../../../reducer/isha/EstimateLOAReducer";
import { formatDate, formatTime } from "../../../data/formatDate";

const BudgetPaymentsRegisterForm = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const eloa = useSelector((state) => state.estimateloa);
  const [slug, setSlug] = useState("");
  const [bgtid, setBgtid] = useState("");
  const [blist, setBlist] = useState([]);
  const [loa, setLoa] = useState({});

  // PRESERVED EXACT INITIAL VALUES - No changes to field names
  const basicInitialValues = {
    budgetHead_id: "",
    budgetSubhead: "",
    department: "",
    WorkType: "",
    amountVetted: "",
    amountLoaIssued: "",
    partyName: "",
    date: formatDate(new Date().toDateString()),
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  
  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    if (!bgtid) {
      errors.budgetHead = "Budget Head is required";
    }
    
    if (!formValues.date) {
      errors.date = "Date is required";
    }
    
    if (!formValues.WorkType.trim()) {
      errors.WorkType = "Party Name is required";
    }
    
    if (!formValues.amountLoaIssued.trim()) {
      errors.amountLoaIssued = "LOA no/Contract Number is required";
    }
    
    if (!formValues.partyName.trim()) {
      errors.partyName = "Voucher Number is required";
    }

    // Note: The original form had some field mapping inconsistencies that we preserve
    // WorkType field is used for Party Name input
    // amountLoaIssued field is used for LOA no/Contract Number
    // partyName field is used for both Voucher Number and Payment Amount

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // PRESERVED EXACT useEffect hooks
  useEffect(() => {
    const floa = blist.filter((itm) => {
      return itm.budgetHead_id === bgtid;
    });
    setLoa(floa);
  }, [bgtid]);

  useEffect(() => {
    if (loa) {
      setFormValues({
        ...formValues,
        amountVetted: loa[0]?.amount,
        department: loa[0]?.department,
        budgetHead_id: bgtid,
        budgetSubhead: loa[0]?.budgetSubhead,
      });
    }
  }, [loa]);

  useEffect(() => {
    dispatch(budgetheadList());
  }, [dispatch]);

  useEffect(() => {
    if (eloa) {
      setSlug(eloa.slug);
      setBlist(eloa.budgetlist.data);
    }
  }, [eloa]);

  // ENHANCED SUBMIT with validation
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // PRESERVED EXACT SUBMISSION LOGIC
    dispatch(addData(formValues))
      .then(() => {
        // navigate(`/list/${slug}`);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { text: "Budget Register Payment", to: "#" },
    { text: "List", to: `/list/${slug}` }
  ];

  return (
    <FinanceFormLayout
      title="Finance : Budget Register Payment"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      containerWidth="95%"
    >
      {/* PRESERVED EXACT BUDGET HEAD, SUB HEAD, AND DEPARTMENT */}
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="budgetHead" className="form-label">
              Budget Head
              <span className="text-danger">*</span>
            </label>
            <select
              type="text"
              className={`form-control ${formErrors.budgetHead ? 'is-invalid' : ''}`}
              id="budgetHead"
              onChange={(e) => {
                setBgtid(e.target.value);
                if (formErrors.budgetHead) {
                  setFormErrors(prev => ({ ...prev, budgetHead: "" }));
                }
              }}
              required
            >
              <option value="">Select Budget Head</option>
              {blist?.map((item, index) => (
                <option key={index} value={item.budgetHead_id}>
                  {item.budgetHead}
                </option>
              ))}
            </select>
            {formErrors.budgetHead && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.budgetHead}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <UniversalFinanceFormField
            type="text"
            name="budgetSubhead"
            label="Sub Head"
            value={loa[0]?.budgetSubhead || ""}
            onChange={(e) => setFormValues({ ...formValues, budgetSubhead: loa[0]?.budgetSubhead })}
            readOnly={true}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalFinanceFormField
            type="text"
            name="department"
            label="Department"
            value={loa[0]?.department || ""}
            onChange={(e) => setFormValues({ ...formValues, department: loa[0]?.department })}
          />
        </div>
      </div>

      {/* PRESERVED EXACT DATE AND ALLOTTED AMOUNT */}
      <div className="row mb-3">
        <div className="col-6">
          <UniversalFinanceFormField
            type="date"
            name="date"
            label="Date"
            value={formValues.date}
            onChange={(e) => {
              setFormValues({ ...formValues, date: e.target.value });
              if (formErrors.date) {
                setFormErrors(prev => ({ ...prev, date: "" }));
              }
            }}
            required={true}
            error={formErrors.date}
          />
        </div>
        
        <div className="col-md-6">
          <UniversalFinanceFormField
            type="text"
            name="amountVetted"
            label="Allotted Amount"
            value={loa[0]?.balance_amount || ""}
            onChange={(e) => setFormValues({ ...formValues, amountVetted: loa[0]?.balance_amount })}
            readOnly={true}
          />
        </div>
      </div>

      {/* PRESERVED EXACT PARTY NAME AND LOA NO */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalFinanceFormField
            type="text"
            name="WorkType"
            label="Party Name"
            value={formValues.WorkType}
            onChange={(e) => {
              setFormValues({ ...formValues, WorkType: e.target.value });
              if (formErrors.WorkType) {
                setFormErrors(prev => ({ ...prev, WorkType: "" }));
              }
            }}
            required={true}
            error={formErrors.WorkType}
          />
        </div>

        <div className="col-md-6">
          <UniversalFinanceFormField
            type="text"
            name="amountLoaIssued"
            label="LOA no/Contract Number"
            value={formValues.amountLoaIssued}
            onChange={(e) => {
              setFormValues({ ...formValues, amountLoaIssued: e.target.value });
              if (formErrors.amountLoaIssued) {
                setFormErrors(prev => ({ ...prev, amountLoaIssued: "" }));
              }
            }}
            required={true}
            error={formErrors.amountLoaIssued}
          />
        </div>
      </div>

      {/* PRESERVED EXACT VOUCHER NUMBER AND PAYMENT AMOUNT */}
      <div className="row mb-3">
        <div className="col-6">
          <UniversalFinanceFormField
            type="text"
            name="voucherNumber"
            label="Voucher Number"
            value={formValues.partyName}
            onChange={(e) => {
              setFormValues({ ...formValues, partyName: e.target.value });
              if (formErrors.partyName) {
                setFormErrors(prev => ({ ...prev, partyName: "" }));
              }
            }}
            required={true}
            error={formErrors.partyName}
          />
        </div>
        
        <div className="col-6">
          <UniversalFinanceFormField
            type="text"
            name="paymentAmount"
            label="Payment Amount"
            value={formValues.partyName}
            onChange={(e) => setFormValues({ ...formValues, partyName: e.target.value })}
          />
        </div>
      </div>

      {/* Empty row preserved from original */}
      <div className="row mb-3">
        <div className="col-12">
          <label className="form-label"></label>
        </div>
      </div>
    </FinanceFormLayout>
  );
};

export default BudgetPaymentsRegisterForm;