import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";
import { validateForm } from "../validation";
import { formatDate } from "../../../data/formatDate";
import { addParameter } from "../../../reducer/store/ParameterReducer"; // Using existing reducer

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const RequisitionRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sNo, setSNo] = useState(1);

  const basicInitialValues = {
    date: formatDate(new Date().toDateString()),
    requisitionNo: "",
    S_No: "",
    discriptionofmaterial: "",
    demandedquantity: "",
    issuedquantity: "",
    dtrno: "",
    remarks: "",
    requestedBy: "",
    empId: "",
    department: "Telecom",
    unit: "s&t",
    priority: "Medium",
    approvedBy: "",
    issueDate: "",
    receivedBy: "",
    receivedDate: "",
    status: "Pending",
    employee_id: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
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
      
      await dispatch(addParameter(formValues));
      
      // Auto-increment serial number
      const newSrno = sNo + 1;
      setSNo(newSrno);
      
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
      title="Requisition Register"
      subtitle="Material Requisition & Issue Register"
      onSubmit={handleSubmit}
      loading={loading}
    >
      {errors.submit && (
        <div className="alert alert-danger mb-3">
          {errors.submit}
        </div>
      )}
      
      {/* Requisition Details */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h6 className="mb-0">
            <i className="fas fa-file-alt me-2"></i>
            Requisition Details
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
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
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="requisitionNo"
                label="Requisition No."
                value={formValues.requisitionNo}
                onChange={handleChange}
                placeholder="REQ/TEL/YYYY/XXXX"
                required
                error={errors.requisitionNo}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="S_No"
                label="Serial No."
                value={formValues.S_No}
                onChange={handleChange}
                required
                error={errors.S_No}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="requestedBy"
                label="Requested By"
                value={formValues.requestedBy}
                onChange={handleChange}
                required
                error={errors.requestedBy}
              />
            </div>
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="employee-id"
                name="empId"
                label="Employee ID"
                value={formValues.empId}
                onChange={handleChange}
                required
                error={errors.empId}
              />
            </div>
            <div className="col-md-3">
              <UniversalTelecomFormField
                type="priority-level"
                name="priority"
                label="Priority"
                value={formValues.priority}
                onChange={handleChange}
                required
                error={errors.priority}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Material Details */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-boxes me-2"></i>
            Material Details
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <UniversalTelecomFormField
                type="textarea"
                name="discriptionofmaterial"
                label="Description of Material"
                value={formValues.discriptionofmaterial}
                onChange={handleChange}
                placeholder="Detailed description of the material/equipment required"
                required
                error={errors.discriptionofmaterial}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="number"
                name="demandedquantity"
                label="Demanded Quantity"
                value={formValues.demandedquantity}
                onChange={handleChange}
                placeholder="Enter quantity required"
                required
                error={errors.demandedquantity}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="number"
                name="issuedquantity"
                label="Issued Quantity"
                value={formValues.issuedquantity}
                onChange={handleChange}
                placeholder="Enter quantity issued"
                error={errors.issuedquantity}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="dtrno"
                label="DTR No./Page No & Date"
                value={formValues.dtrno}
                onChange={handleChange}
                placeholder="DTR reference number and date"
                error={errors.dtrno}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Approval & Issue Details */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">
          <h6 className="mb-0">
            <i className="fas fa-check-circle me-2"></i>
            Approval & Issue Details
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="approvedBy"
                label="Approved By"
                value={formValues.approvedBy}
                onChange={handleChange}
                error={errors.approvedBy}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="date"
                name="issueDate"
                label="Issue Date"
                value={formValues.issueDate}
                onChange={handleChange}
                error={errors.issueDate}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="custom-select"
                name="status"
                label="Status"
                value={formValues.status}
                onChange={handleChange}
                options={[
                  { value: "Pending", label: "Pending" },
                  { value: "Approved", label: "Approved" },
                  { value: "Partially Issued", label: "Partially Issued" },
                  { value: "Fully Issued", label: "Fully Issued" },
                  { value: "Rejected", label: "Rejected" },
                  { value: "Cancelled", label: "Cancelled" }
                ]}
                required
                error={errors.status}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="receivedBy"
                label="Received By"
                value={formValues.receivedBy}
                onChange={handleChange}
                error={errors.receivedBy}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="date"
                name="receivedDate"
                label="Received Date"
                value={formValues.receivedDate}
                onChange={handleChange}
                error={errors.receivedDate}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Remarks */}
      <div className="row">
        <div className="col-md-12">
          <UniversalTelecomFormField
            type="textarea"
            name="remarks"
            label="Remarks"
            value={formValues.remarks}
            onChange={handleChange}
            placeholder="Any additional remarks or special instructions"
            error={errors.remarks}
          />
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default RequisitionRegisterForm;