import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";
import { validateForm } from "../validation";
import { formatDate } from "../../../data/formatDate";
import { addData } from "../../../reducer/GatePassReducer";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const GatePassBookForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: formatDate(new Date()),
    org: "",
    dept: "Telecom",
    bookno: "",
    pageno: "",
    return_type: "",
    items: Array(10).fill({
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
    employee_id: "",
    department: "s&t",
    unit: "Telecom",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  const [activeItems, setActiveItems] = useState(1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Handle change for items array
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = formValues.items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormValues({
      ...formValues,
      items: updatedItems,
    });
  };

  const handleIssuerChange = (field, value) => {
    setFormValues({
      ...formValues,
      issuerdetail: {
        ...formValues.issuerdetail,
        [field]: value,
      },
    });
  };

  const handleReceiverChange = (field, value) => {
    setFormValues({
      ...formValues,
      receiverdetail: {
        ...formValues.receiverdetail,
        [field]: value,
      },
    });
  };

  const handleAddRow = () => {
    if (activeItems < formValues.items.length) {
      setActiveItems(activeItems + 1);
    }
  };

  const handleRemoveRow = () => {
    if (activeItems > 1) {
      setActiveItems(activeItems - 1);
      // Clear the data of the removed row
      const updatedItems = [...formValues.items];
      updatedItems[activeItems - 1] = {
        itmdespt: "",
        partno: "",
        serialno: "",
        location: "",
        qty: "",
        dftsrv: "",
        remark: "",
      };
      setFormValues({ ...formValues, items: updatedItems });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      // Validate form
      const formErrors = validateForm('transactionRegister', formValues);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        setLoading(false);
        return;
      }
      
      // Filter only active items
      const submitData = {
        ...formValues,
        items: formValues.items.slice(0, activeItems)
      };
      
      await dispatch(addData(submitData));
      navigate(`/list/${slug}`);
    } catch (error) {
      console.error('Error saving form:', error);
      setErrors({ submit: 'Error saving form. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TelecomFormLayout 
      title="Gate Pass Book"
      subtitle="Telecom Department - Gate Pass Register"
      onSubmit={handleSubmit}
      loading={loading}
    >
      {errors.submit && (
        <div className="alert alert-danger mb-3">
          {errors.submit}
        </div>
      )}
      
      {/* Basic Information */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h6 className="mb-0">
            <i className="fas fa-info-circle me-2"></i>
            Gate Pass Information
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="date"
                name="date"
                label="Date"
                value={formValues.date}
                onChange={handleChange}
                required
                error={errors.date}
              />
            </div>
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="custom-select"
                name="dept"
                label="Department"
                value={formValues.dept}
                onChange={handleChange}
                options={[
                  { value: "Operation", label: "Operation" },
                  { value: "Signalling", label: "Signalling" },
                  { value: "AFC Mainline", label: "AFC Mainline" },
                  { value: "Telecom", label: "Telecom" },
                  { value: "AFC Store", label: "AFC Store" },
                ]}
                required
                error={errors.dept}
              />
            </div>
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="custom-select"
                name="return_type"
                label="Returnable/Non-Returnable"
                value={formValues.return_type}
                onChange={handleChange}
                options={[
                  { value: "Returnable", label: "Returnable" },
                  { value: "Non-Returnable", label: "Non-Returnable" },
                ]}
                required
                error={errors.return_type}
              />
            </div>
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="text"
                name="org"
                label="Organisation"
                value={formValues.org}
                onChange={handleChange}
                placeholder="Organization/Vendor name"
                error={errors.org}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="bookno"
                label="Book No."
                value={formValues.bookno}
                onChange={handleChange}
                placeholder="Gate pass book number"
                error={errors.bookno}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="pageno"
                label="Page No."
                value={formValues.pageno}
                onChange={handleChange}
                placeholder="Page number"
                error={errors.pageno}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-list me-2"></i>
            Items Details
          </h6>
          <div>
            <button 
              type="button" 
              className="btn btn-light btn-sm me-2"
              onClick={handleAddRow}
              disabled={activeItems >= formValues.items.length}
            >
              <i className="fas fa-plus me-1"></i>
              Add Row
            </button>
            <button 
              type="button" 
              className="btn btn-outline-light btn-sm"
              onClick={handleRemoveRow}
              disabled={activeItems <= 1}
            >
              <i className="fas fa-minus me-1"></i>
              Remove Row
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-sm mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{width: '5%'}}>#</th>
                  <th style={{width: '25%'}}>Item Description</th>
                  <th style={{width: '12%'}}>Part No.</th>
                  <th style={{width: '12%'}}>Serial No.</th>
                  <th style={{width: '15%'}}>Location</th>
                  <th style={{width: '8%'}}>Qty</th>
                  <th style={{width: '10%'}}>D/S</th>
                  <th style={{width: '13%'}}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {formValues.items.slice(0, activeItems).map((item, index) => (
                  <tr key={index}>
                    <td className="text-center fw-bold">{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="itmdespt"
                        value={item.itmdespt}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Item description"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="partno"
                        value={item.partno}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Part number"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="serialno"
                        value={item.serialno}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Serial number"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="location"
                        value={item.location}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Location"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        name="qty"
                        value={item.qty}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Qty"
                        min="0"
                      />
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        name="dftsrv"
                        value={item.dftsrv}
                        onChange={(e) => handleItemChange(index, e)}
                      >
                        <option value="">Select</option>
                        <option value="Defective">Defective</option>
                        <option value="Serviceable">Serviceable</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="remark"
                        value={item.remark}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Remarks"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Issuer Details */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">
          <h6 className="mb-0">
            <i className="fas fa-user-tie me-2"></i>
            Details of Issuer
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="nameissuer"
                label="Name"
                value={formValues.issuerdetail.nameissuer}
                onChange={(e) => handleIssuerChange('nameissuer', e.target.value)}
                required
                error={errors.nameissuer}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="designationissuer"
                label="Designation"
                value={formValues.issuerdetail.designationissuer}
                onChange={(e) => handleIssuerChange('designationissuer', e.target.value)}
                required
                error={errors.designationissuer}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="employee-id"
                name="empidissuer"
                label="Employee ID"
                value={formValues.issuerdetail.empidissuer}
                onChange={(e) => handleIssuerChange('empidissuer', e.target.value)}
                required
                error={errors.empidissuer}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="date"
                name="dateissuer"
                label="Date"
                value={formValues.issuerdetail.dateissuer}
                onChange={(e) => handleIssuerChange('dateissuer', e.target.value)}
                required
                error={errors.dateissuer}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Receiver Details */}
      <div className="card mb-4">
        <div className="card-header bg-warning text-dark">
          <h6 className="mb-0">
            <i className="fas fa-user-check me-2"></i>
            Details of Receiver
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="namereceiver"
                label="Name"
                value={formValues.receiverdetail.namereceiver}
                onChange={(e) => handleReceiverChange('namereceiver', e.target.value)}
                required
                error={errors.namereceiver}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="designationreceiver"
                label="Designation"
                value={formValues.receiverdetail.designationreceiver}
                onChange={(e) => handleReceiverChange('designationreceiver', e.target.value)}
                required
                error={errors.designationreceiver}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="employee-id"
                name="empidreceiver"
                label="Employee ID"
                value={formValues.receiverdetail.empidreceiver}
                onChange={(e) => handleReceiverChange('empidreceiver', e.target.value)}
                required
                error={errors.empidreceiver}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="date"
                name="datereceiver"
                label="Date"
                value={formValues.receiverdetail.datereceiver}
                onChange={(e) => handleReceiverChange('datereceiver', e.target.value)}
                required
                error={errors.datereceiver}
              />
            </div>
          </div>
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default GatePassBookForm;