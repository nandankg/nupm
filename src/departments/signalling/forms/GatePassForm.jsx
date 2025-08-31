import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import { addData } from "../../../reducer/GatePassReducer";
import { formatDate } from "../../../data/formatDate";

/**
 * Gate Pass Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const GatePassForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gatepass = useSelector((state) => state.gatepassstore || []);
  
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (gatepass) {
      setSlug(gatepass.slug);
    }
  }, [gatepass]);

  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const basicInitialValues = {
    date: "",
    org: "",
    dept: "",
    bookno: "",
    pageno: "",
    return_type: "",
    items: Array(18).fill({
      itmdespt: "",
      partno: "",
      serialno: "",
      location: "",
      qty: "",
      dftsrv: "",
      remark: "",
    }),
    issuerdetail: {
      nameissuer: "",
      designationissuer: "",
      empidissuer: "",
      dateissuer: formatDate(new Date()),
    },
    receiverdetail: {
      namereceiver: "",
      designationreceiver: "",
      empidreceiver: "",
      datereceiver: formatDate(new Date()),
    },
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  const [item, setItem] = useState([
    {
      itmdespt: "",
      partno: "",
      serialno: "",
      location: "",
      qty: "",
      dftsrv: "",
      remark: "",
    },
  ]);

  // Department options
  const departmentOptions = [
    { value: "", label: "Select Department" },
    { value: "Operation", label: "Operation" },
    { value: "Signalling", label: "Signalling" },
    { value: "AFC Mainline", label: "AFC Mainline" },
    { value: "Telecom", label: "Telecom" },
    { value: "AFC Store", label: "AFC Store" }
  ];

  // Return type options
  const returnTypeOptions = [
    { value: "", label: "Select" },
    { value: "Returnable", label: "Returnable" },
    { value: "Non-Returnable", label: "Non Returnable" }
  ];

  // Defective/Serviceable options
  const dftsrvOptions = [
    { value: "", label: "Select" },
    { value: "Defective", label: "Defective" },
    { value: "Serviceable", label: "Serviceable" }
  ];

  // Add new row to dynamic items
  const handleAddRow = () => {
    setItem([...item, {
      itmdespt: "",
      partno: "",
      serialno: "",
      location: "",
      qty: "",
      dftsrv: "",
      remark: "",
    }]);
  };

  // Handle basic form field changes
  const handleChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear field error when user starts typing
    if (formErrors[fieldName]) {
      setFormErrors(prev => ({
        ...prev,
        [fieldName]: ""
      }));
    }
  };

  // Handle change for items array
  const handleItemChange = (index, fieldName, value) => {
    const updatedItems = formValues.items.map((item, i) =>
      i === index ? { ...item, [fieldName]: value } : item
    );
    setFormValues(prev => ({
      ...prev,
      items: updatedItems
    }));

    // Update dynamic item state for display
    if (index < item.length) {
      const updatedDisplayItems = item.map((displayItem, i) =>
        i === index ? { ...displayItem, [fieldName]: value } : displayItem
      );
      setItem(updatedDisplayItems);
    }
  };

  // Handle issuer detail changes
  const handleIssuerChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      issuerdetail: {
        ...prev.issuerdetail,
        [fieldName]: value
      }
    }));
  };

  // Handle receiver detail changes
  const handleReceiverChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      receiverdetail: {
        ...prev.receiverdetail,
        [fieldName]: value
      }
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formValues.date) {
      errors.date = "Date is required";
    }
    
    if (!formValues.dept) {
      errors.dept = "Department is required";
    }
    
    if (!formValues.return_type) {
      errors.return_type = "Return type is required";
    }

    // Validate at least one item is filled
    const hasValidItem = formValues.items.some(item => 
      item.itmdespt || item.partno || item.serialno
    );
    if (!hasValidItem) {
      errors.items = "At least one item must be specified";
    }

    // Validate issuer details
    if (!formValues.issuerdetail.nameissuer) {
      errors.issuerdetail = "Issuer name is required";
    }
    
    if (!formValues.issuerdetail.empidissuer) {
      errors.issuerdetail = "Issuer employee ID is required";
    }

    // Validate receiver details
    if (!formValues.receiverdetail.namereceiver) {
      errors.receiverdetail = "Receiver name is required";
    }
    
    if (!formValues.receiverdetail.empidreceiver) {
      errors.receiverdetail = "Receiver employee ID is required";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Preserve exact field structure for API compatibility
      const submissionData = {
        ...formValues,
        slug: slug || "gate-pass-register"
      };

      dispatch(addData(submissionData));
      
      // Success feedback
      alert("Gate Pass saved successfully!");
      navigate(`/list/${slug}`);
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error saving gate pass. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormValues(basicInitialValues);
    setItem([{
      itmdespt: "",
      partno: "",
      serialno: "",
      location: "",
      qty: "",
      dftsrv: "",
      remark: "",
    }]);
    setFormErrors({});
  };

  return (
    <SignallingFormLayout
      title="Gate Pass Book"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Gate Pass", path: "/signalling/gate-pass" }
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Information */}
        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="date"
              name="date"
              label="Date"
              value={formValues.date}
              onChange={(e) => handleChange("date", e.target.value)}
              required={true}
              error={formErrors.date}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="select"
              name="dept"
              label="Department"
              value={formValues.dept}
              onChange={(e) => handleChange("dept", e.target.value)}
              options={departmentOptions}
              required={true}
              error={formErrors.dept}
            />
          </div>
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="select"
              name="return_type"
              label="Returnable/Non-Returnable"
              value={formValues.return_type}
              onChange={(e) => handleChange("return_type", e.target.value)}
              options={returnTypeOptions}
              required={true}
              error={formErrors.return_type}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <UniversalSignallingFormField
              type="text"
              name="org"
              label="Organisation"
              value={formValues.org}
              onChange={(e) => handleChange("org", e.target.value)}
              placeholder="Organisation name"
              error={formErrors.org}
            />
          </div>
        </div>

        {/* Items Section */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Items Details</h5>
            {formErrors.items && (
              <small className="text-danger">{formErrors.items}</small>
            )}
          </div>
          <div className="card-body">
            {item.map((itm, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-1">
                  {index === 0 && (
                    <label className="form-label">No</label>
                  )}
                  <input
                    type="text"
                    className="form-control"
                    value={index + 1}
                    readOnly
                  />
                </div>
                <div className="col-md-3">
                  {index === 0 && (
                    <label className="form-label">Item Description</label>
                  )}
                  <input
                    type="text"
                    className="form-control"
                    name="itmdespt"
                    value={formValues.items[index]?.itmdespt || ""}
                    onChange={(e) => handleItemChange(index, "itmdespt", e.target.value)}
                    placeholder="Item description"
                  />
                </div>
                <div className="col-md-1">
                  {index === 0 && (
                    <label className="form-label">Prt No</label>
                  )}
                  <input
                    type="text"
                    className="form-control"
                    name="partno"
                    value={formValues.items[index]?.partno || ""}
                    onChange={(e) => handleItemChange(index, "partno", e.target.value)}
                    placeholder="Part number"
                  />
                </div>
                <div className="col-md-1">
                  {index === 0 && (
                    <label className="form-label">Srl No</label>
                  )}
                  <input
                    type="text"
                    className="form-control"
                    name="serialno"
                    value={formValues.items[index]?.serialno || ""}
                    onChange={(e) => handleItemChange(index, "serialno", e.target.value)}
                    placeholder="Serial number"
                  />
                </div>
                <div className="col-md-2">
                  {index === 0 && (
                    <label className="form-label">Location</label>
                  )}
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formValues.items[index]?.location || ""}
                    onChange={(e) => handleItemChange(index, "location", e.target.value)}
                    placeholder="Location"
                  />
                </div>
                <div className="col-md-1">
                  {index === 0 && (
                    <label className="form-label">Qty</label>
                  )}
                  <input
                    type="text"
                    className="form-control"
                    name="qty"
                    value={formValues.items[index]?.qty || ""}
                    onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                    placeholder="Quantity"
                  />
                </div>
                <div className="col-md-1">
                  {index === 0 && (
                    <label className="form-label">D/S</label>
                  )}
                  <select
                    className="form-control"
                    name="dftsrv"
                    value={formValues.items[index]?.dftsrv || ""}
                    onChange={(e) => handleItemChange(index, "dftsrv", e.target.value)}
                  >
                    {dftsrvOptions.map((option, optIndex) => (
                      <option key={optIndex} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  {index === 0 && (
                    <label className="form-label">Remark</label>
                  )}
                  <input
                    type="text"
                    className="form-control"
                    name="remark"
                    value={formValues.items[index]?.remark || ""}
                    onChange={(e) => handleItemChange(index, "remark", e.target.value)}
                    placeholder="Remarks"
                  />
                </div>
              </div>
            ))}
            
            <button
              type="button"
              className="btn btn-secondary me-3"
              onClick={handleAddRow}
              style={{ fontSize: 9, width: 250 }}
            >
              ADD Row
            </button>
          </div>
        </div>

        {/* Issuer Details */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Detail of Issuer</h5>
            {formErrors.issuerdetail && (
              <small className="text-danger">{formErrors.issuerdetail}</small>
            )}
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="text"
                  name="nameissuer"
                  label="Name"
                  value={formValues.issuerdetail.nameissuer}
                  onChange={(e) => handleIssuerChange("nameissuer", e.target.value)}
                  placeholder="Issuer name"
                  required={true}
                />
              </div>
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="text"
                  name="designationissuer"
                  label="Designation"
                  value={formValues.issuerdetail.designationissuer}
                  onChange={(e) => handleIssuerChange("designationissuer", e.target.value)}
                  placeholder="Issuer designation"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="date"
                  name="dateissuer"
                  label="Date"
                  value={formValues.issuerdetail.dateissuer}
                  onChange={(e) => handleIssuerChange("dateissuer", e.target.value)}
                  required={true}
                />
              </div>
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="text"
                  name="empidissuer"
                  label="Emp ID"
                  value={formValues.issuerdetail.empidissuer}
                  onChange={(e) => handleIssuerChange("empidissuer", e.target.value)}
                  placeholder="Employee ID"
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Receiver Details */}
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Details of Receiver</h5>
            {formErrors.receiverdetail && (
              <small className="text-danger">{formErrors.receiverdetail}</small>
            )}
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="text"
                  name="namereceiver"
                  label="Name"
                  value={formValues.receiverdetail.namereceiver}
                  onChange={(e) => handleReceiverChange("namereceiver", e.target.value)}
                  placeholder="Receiver name"
                  required={true}
                />
              </div>
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="text"
                  name="designationreceiver"
                  label="Designation"
                  value={formValues.receiverdetail.designationreceiver}
                  onChange={(e) => handleReceiverChange("designationreceiver", e.target.value)}
                  placeholder="Receiver designation"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="date"
                  name="datereceiver"
                  label="Date"
                  value={formValues.receiverdetail.datereceiver}
                  onChange={(e) => handleReceiverChange("datereceiver", e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <UniversalSignallingFormField
                  type="text"
                  name="empidreceiver"
                  label="Emp ID"
                  value={formValues.receiverdetail.empidreceiver}
                  onChange={(e) => handleReceiverChange("empidreceiver", e.target.value)}
                  placeholder="Employee ID"
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </span>
                ) : (
                  "Save Gate Pass"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </SignallingFormLayout>
  );
};

export default GatePassForm;