import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalFinanceFormField, FinanceFormLayout } from "../components";
import { estimateLoaAddData as addData, estimateLoaBudgetheadList as budgetheadList, estimateLoaSubheadList as subheadList } from "../redux/transactionSlice";
import { formatDate, formatTime } from "../../../data/formatDate";

const EstimateAndLOABudgetRegisterForm = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [budgetHead, setBudgetHead] = useState([]);
  const [subHead, setSubHead] = useState([]);
  const dispatch = useDispatch();
  const eloa = useSelector((state) => state.financeTransaction);
  const [slug, setSlug] = useState("");
  const [bdata, setBdata] = useState("");
  const [blist, setBlist] = useState([]);
  const [loa, setLoa] = useState({});

  // PRESERVED EXACT INITIAL VALUES - No changes to field names
  const basicInitialValues = {
    budgetHead_id: "",
    budgetHead: "",
    budgetSubhead: "",
    financialYear: "2025-26",
    department: "",
    WorkType: "",
    amountVetted: "",
    amountLoaIssued: "",
    partyName: "",
    date: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  
  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    if (!formValues.budgetHead) {
      errors.budgetHead = "Budget Head is required";
    }
    
    if (!formValues.financialYear) {
      errors.financialYear = "Financial Year is required";
    }
    
    if (!formValues.department) {
      errors.department = "Department is required";
    }
    
    if (!formValues.budgetSubhead) {
      errors.budgetSubhead = "Sub Head is required";
    }
    
    if (!formValues.date) {
      errors.date = "Date is required";
    }
    
    if (!formValues.WorkType.trim()) {
      errors.WorkType = "Type Of Work is required";
    }
    
    if (!formValues.amountVetted) {
      errors.amountVetted = "Total Estimated Amount Vetted is required";
    } else if (isNaN(formValues.amountVetted) || parseFloat(formValues.amountVetted) <= 0) {
      errors.amountVetted = "Amount Vetted must be a valid positive number";
    }
    
    if (!formValues.amountLoaIssued) {
      errors.amountLoaIssued = "Amount For Which LOA Issued is required";
    } else if (isNaN(formValues.amountLoaIssued) || parseFloat(formValues.amountLoaIssued) <= 0) {
      errors.amountLoaIssued = "LOA Amount must be a valid positive number";
    }
    
    if (!formValues.partyName.trim()) {
      errors.partyName = "Party Name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // PRESERVED EXACT FUNCTION
  const bheadSubmit = (e) => {
    const bgid = e.target.value;
    const floa = subHead.filter((itm) => {
      return itm.id == bgid;
    });
    setBdata(floa);
    
    // Clear error when user selects
    if (formErrors.budgetSubhead) {
      setFormErrors(prev => ({ ...prev, budgetSubhead: "" }));
    }
  };

  // PRESERVED EXACT useEffect hooks
  useEffect(() => {
    if (bdata) {
      setFormValues({
        ...formValues,
        budgetHead_id: bdata[0]?.budgetHead_id,
        department: bdata[0]?.department,
        budgetHead: bdata[0]?.budgetHead,
        budgetSubhead: bdata[0]?.budgetSubhead,
      });
    }
  }, [bdata]);

  useEffect(() => {
    dispatch(budgetheadList());
  }, [dispatch]);

  useEffect(() => {
    if (eloa) {
      setSlug(eloa.slugs?.estimateLoa || 'estimate-and-loa-budget-register');
      setBudgetHead(eloa?.budgetHeadList || []);
      setSubHead(eloa?.subHeadList || []);
    }
  }, [eloa]);

  // PRESERVED EXACT BUSINESS LOGIC - Amount validation
  useEffect(() => {
    let budgeramt = parseFloat(bdata[0]?.balance_amount);
    formValues.amountLoaIssued = parseFloat(formValues.amountLoaIssued);
    if (formValues.amountVetted > budgeramt) {
      alert(" Amount vetted cannot be greater than Balance Budget Amount");
      setFormValues({
        ...formValues,
        amountVetted: 0,
      });
    }
  }, [formValues.amountVetted]);

  useEffect(() => {
    let budgeramt = parseFloat(bdata[0]?.balance_amount);
    formValues.amountVetted = parseFloat(formValues.amountVetted);
    formValues.amountLoaIssued = parseFloat(formValues.amountLoaIssued);
    if (formValues.amountLoaIssued > budgeramt) {
      alert("LOA Amount cant be greater than Balance Budget Amount");
      setFormValues({
        ...formValues,
        amountLoaIssued: 0,
      });
    }
  }, [formValues.amountLoaIssued]);

  // PRESERVED EXACT FUNCTION
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budgetHead") {
      setSubHead([]);
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
    // Clear field error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // PRESERVED EXACT FUNCTION
  const getSubhead = (e) => {
    const depart = e.target.value;
    setFormValues({
      ...formValues,
      department: depart,
    });
    
    // Clear department error
    if (formErrors.department) {
      setFormErrors(prev => ({ ...prev, department: "" }));
    }

    dispatch(subheadList({ budgetHead: formValues.budgetHead, financialYear: formValues.financialYear, department: depart }))
      .then((response) => {
        setSubHead(response.payload.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

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
        navigate(`/list/${slug}`);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Department options - PRESERVED EXACTLY
  const departmentOptions = [
    "signalling", "telecom", "Operation", "sdc", "Finance", "Mainline"
  ];

  // Breadcrumb items
  const breadcrumbItems = [
    { text: "Estimate and LOA", to: "#" },
    { text: "List", to: `/list/${slug}` }
  ];

  return (
    <FinanceFormLayout
      title="Finance : Estimate and LOA"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      containerWidth="95%"
    >
      {/* PRESERVED EXACT BUDGET HEAD AND FINANCIAL YEAR */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalFinanceFormField
            type="select"
            name="budgetHead"
            label="Budget Head"
            value={formValues.budgetHead}
            onChange={handleChange}
            options={budgetHead || []}
            required={true}
            error={formErrors.budgetHead}
            placeholder="Select Budget Head"
          />
        </div>
        
        <div className="col-md-6">
          <UniversalFinanceFormField
            type="select"
            name="financialYear"
            label="Financial Year"
            value={formValues.financialYear}
            onChange={handleChange}
            options={["2025-26"]}
            required={true}
            error={formErrors.financialYear}
            placeholder="Select FY"
          />
        </div>
      </div>

      {/* PRESERVED EXACT DEPARTMENT AND SUB HEAD */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalFinanceFormField
            type="select"
            name="department"
            label="Department"
            value={formValues.department}
            onChange={getSubhead}
            options={departmentOptions}
            required={true}
            error={formErrors.department}
            placeholder="Select Department"
          />
        </div>
        
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="subHead" className="form-label">
              Sub Head
              <span className="text-danger">*</span>
            </label>
            <select
              type="text"
              className={`form-control ${formErrors.budgetSubhead ? 'is-invalid' : ''}`}
              id="subHead"
              name="subHead"
              onChange={bheadSubmit}
              required
            >
              <option value="">Select Sub-Head</option>
              {subHead?.map((sub, index) => (
                <option key={index} value={sub.id}>{sub.budgetSubhead}</option>
              ))}
            </select>
            {formErrors.budgetSubhead && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.budgetSubhead}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT DATE AND WORK TYPE */}
      <div className="row mb-3">
        <div className="col-6">
          <UniversalFinanceFormField
            type="date"
            name="date"
            label="Date"
            value={formValues.date}
            onChange={(e) => setFormValues({ ...formValues, date: e.target.value })}
            required={true}
            error={formErrors.date}
          />
        </div>

        <div className="col-md-6">
          <UniversalFinanceFormField
            type="text"
            name="WorkType"
            label="Type Of Work"
            value={formValues.WorkType}
            onChange={(e) => setFormValues({ ...formValues, WorkType: e.target.value })}
            required={true}
            error={formErrors.WorkType}
          />
        </div>
      </div>

      {/* PRESERVED EXACT AMOUNT FIELDS */}
      <div className="row mb-3">
        <div className="col-md-4">
          <UniversalFinanceFormField
            type="text"
            name="balanceBudgetAmount"
            label="Balance Budget Amount"
            value={bdata[0]?.balance_amount || ""}
            readOnly={true}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalFinanceFormField
            type="text"
            name="amountVetted"
            label="Total Estimated Amount Vetted"
            value={formValues.amountVetted}
            onChange={(e) => setFormValues({ ...formValues, amountVetted: e.target.value })}
            required={true}
            error={formErrors.amountVetted}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalFinanceFormField
            type="number"
            name="amountLoaIssued"
            label="Amount For Which LOA Issued"
            value={formValues.amountLoaIssued}
            onChange={(e) => setFormValues({ ...formValues, amountLoaIssued: e.target.value })}
            required={true}
            error={formErrors.amountLoaIssued}
          />
        </div>
      </div>

      {/* PRESERVED EXACT PARTY NAME */}
      <div className="row mb-3">
        <div className="col-12">
          <UniversalFinanceFormField
            type="text"
            name="partyName"
            label="Party Name"
            value={formValues.partyName}
            onChange={(e) => setFormValues({ ...formValues, partyName: e.target.value })}
            required={true}
            error={formErrors.partyName}
          />
        </div>
      </div>

      {/* PRESERVED EXACT NOTE */}
      <div className="row mb-3">
        <div className="col-12">
          <label className="form-label">
            NOTE : Estimated Amount will be deducted form Original
            Budget(Previous Form) if Revised Amount is not allotted
          </label>
        </div>
      </div>
    </FinanceFormLayout>
  );
};

export default EstimateAndLOABudgetRegisterForm;