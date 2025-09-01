import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";
import { validateForm } from "../validation";
import { formatDate } from "../../../data/formatDate";
import { addData } from "../../../reducer/pinki/FMTSReducer";
import stationData from "../../../data/station.json";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const FmtsForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    book_foil_no: "",
    station: "",
    eqpt_no: "",
    failure_date: "",
    failure_time: "",
    item_name: "",
    item_sl_no: "",
    detail_of_failure: "",
    remarks_deficiency: "",
    attended_by: "",
    received_by: "",
    company: "",
    received_date: "",
    sign_of_je_sse: "",
    detail_of_default: "",
    rdate: "",
    hoby: "",
    pstatus: "",
    ostatus: "",
    rdetail: "",
    dofrectification: "",
    remark: "",
    daterectified: "",
    ho: "",
    hodate: "",
    rectified_by: "",
    isNewItem: null,
    isRepairedItem: null,
    oldOsisFmtsNo: "",
    itemDetails: "",
    employee_id: "",
    department: "s&t",
    unit: "Telecom",
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

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value === "true",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      // Validate form
      const formErrors = validateForm('assetRegister', formValues);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        setLoading(false);
        return;
      }
      
      await dispatch(addData(formValues));
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
      title="FMTS Book"
      subtitle="Fault Maintenance Tracking System"
      onSubmit={handleSubmit}
      loading={loading}
    >
      {errors.submit && (
        <div className="alert alert-danger mb-3">
          {errors.submit}
        </div>
      )}
      
      {/* Book Information */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h6 className="mb-0">
            <i className="fas fa-book me-2"></i>
            FMTS Book Information
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <UniversalTelecomFormField
                type="number"
                name="book_foil_no"
                label="Book Foil Sr. No."
                value={formValues.book_foil_no}
                onChange={handleChange}
                required
                error={errors.book_foil_no}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Failure Details */}
      <div className="card mb-4">
        <div className="card-header bg-danger text-white">
          <h6 className="mb-0">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Failure Details (To be filled by section staff)
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="custom-select"
                name="station"
                label="Station"
                value={formValues.station}
                onChange={handleChange}
                options={stationData
                  .filter((station) => station["Station Name"])
                  .map((station) => ({
                    value: station["STATION Code"],
                    label: station["Station Name"] || station["STATION Code"]
                  }))}
                required
                error={errors.station}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="equipment-id"
                name="eqpt_no"
                label="Equipment No."
                value={formValues.eqpt_no}
                onChange={handleChange}
                required
                error={errors.eqpt_no}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="date"
                name="failure_date"
                label="Failure Date"
                value={formValues.failure_date}
                onChange={handleChange}
                required
                error={errors.failure_date}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="time-only"
                name="failure_time"
                label="Failure Time"
                value={formValues.failure_time}
                onChange={handleChange}
                required
                error={errors.failure_time}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="item_name"
                label="Item Name"
                value={formValues.item_name}
                onChange={handleChange}
                required
                error={errors.item_name}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="item_sl_no"
                label="Item Serial No."
                value={formValues.item_sl_no}
                onChange={handleChange}
                error={errors.item_sl_no}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-12">
              <UniversalTelecomFormField
                type="textarea"
                name="detail_of_failure"
                label="Details of Failure"
                value={formValues.detail_of_failure}
                onChange={handleChange}
                placeholder="Detailed description of the failure"
                required
                error={errors.detail_of_failure}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="remarks_deficiency"
                label="Remarks/Deficiency"
                value={formValues.remarks_deficiency}
                onChange={handleChange}
                placeholder="Additional remarks or deficiency details"
                error={errors.remarks_deficiency}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="attended_by"
                label="Attended By"
                value={formValues.attended_by}
                onChange={handleChange}
                placeholder="Name of person who attended"
                error={errors.attended_by}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Received By Details */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-user-check me-2"></i>
            Received By Details
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="received_by"
                label="Name"
                value={formValues.received_by}
                onChange={handleChange}
                required
                error={errors.received_by}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="company"
                label="Company"
                value={formValues.company}
                onChange={handleChange}
                error={errors.company}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="sign_of_je_sse"
                label="Designation"
                value={formValues.sign_of_je_sse}
                onChange={handleChange}
                error={errors.sign_of_je_sse}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="date"
                name="received_date"
                label="Received Date"
                value={formValues.received_date}
                onChange={handleChange}
                required
                error={errors.received_date}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Repair Details */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">
          <h6 className="mb-0">
            <i className="fas fa-tools me-2"></i>
            Repair Details (To be filled by receiver/repair staff)
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="date"
                name="rdate"
                label="Receiving Date"
                value={formValues.rdate}
                onChange={handleChange}
                error={errors.rdate}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="hoby"
                label="H/O By"
                value={formValues.hoby}
                onChange={handleChange}
                error={errors.hoby}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="pstatus"
                label="Physical Status"
                value={formValues.pstatus}
                onChange={handleChange}
                error={errors.pstatus}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="ostatus"
                label="Operational Status"
                value={formValues.ostatus}
                onChange={handleChange}
                error={errors.ostatus}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-12">
              <UniversalTelecomFormField
                type="textarea"
                name="detail_of_default"
                label="Details of Fault"
                value={formValues.detail_of_default}
                onChange={handleChange}
                placeholder="Detailed description of the fault"
                error={errors.detail_of_default}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-12">
              <UniversalTelecomFormField
                type="textarea"
                name="rdetail"
                label="Replacement Details"
                value={formValues.rdetail}
                onChange={handleChange}
                placeholder="Details of parts replaced"
                error={errors.rdetail}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-12">
              <UniversalTelecomFormField
                type="textarea"
                name="dofrectification"
                label="Details of Rectification"
                value={formValues.dofrectification}
                onChange={handleChange}
                placeholder="Steps taken to rectify the issue"
                error={errors.dofrectification}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="textarea"
                name="remark"
                label="Remarks"
                value={formValues.remark}
                onChange={handleChange}
                placeholder="Additional remarks"
                error={errors.remark}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="date"
                name="daterectified"
                label="Date Rectified"
                value={formValues.daterectified}
                onChange={handleChange}
                error={errors.daterectified}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-12">
              <UniversalTelecomFormField
                type="text"
                name="rectified_by"
                label="Rectified By (Name & Emp Code)"
                value={formValues.rectified_by}
                onChange={handleChange}
                placeholder="Name and employee code of person who rectified"
                error={errors.rectified_by}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="ho"
                label="H/O To"
                value={formValues.ho}
                onChange={handleChange}
                placeholder="Handed over to"
                error={errors.ho}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="date"
                name="hodate"
                label="H/O Date"
                value={formValues.hodate}
                onChange={handleChange}
                error={errors.hodate}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Replacement Item Details */}
      <div className="card mb-4">
        <div className="card-header bg-warning text-dark">
          <h6 className="mb-0">
            <i className="fas fa-exchange-alt me-2"></i>
            Replacement Item Details (If different item given in lieu)
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Is it new item?</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input
                    type="radio"
                    name="isNewItem"
                    value="true"
                    checked={formValues.isNewItem === true}
                    onChange={handleRadioChange}
                    className="form-check-input"
                    id="newItemYes"
                  />
                  <label className="form-check-label" htmlFor="newItemYes">
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="isNewItem"
                    value="false"
                    checked={formValues.isNewItem === false}
                    onChange={handleRadioChange}
                    className="form-check-input"
                    id="newItemNo"
                  />
                  <label className="form-check-label" htmlFor="newItemNo">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Is it repaired item?</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input
                    type="radio"
                    name="isRepairedItem"
                    value="true"
                    checked={formValues.isRepairedItem === true}
                    onChange={handleRadioChange}
                    className="form-check-input"
                    id="repairedItemYes"
                  />
                  <label className="form-check-label" htmlFor="repairedItemYes">
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="isRepairedItem"
                    value="false"
                    checked={formValues.isRepairedItem === false}
                    onChange={handleRadioChange}
                    className="form-check-input"
                    id="repairedItemNo"
                  />
                  <label className="form-check-label" htmlFor="repairedItemNo">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {formValues.isRepairedItem === true && (
            <div className="row">
              <div className="col-md-12">
                <UniversalTelecomFormField
                  type="number"
                  name="oldOsisFmtsNo"
                  label="Old OSIS/FMTS No."
                  value={formValues.oldOsisFmtsNo}
                  onChange={handleChange}
                  placeholder="Enter old OSIS/FMTS number"
                  error={errors.oldOsisFmtsNo}
                />
              </div>
            </div>
          )}
          
          <div className="row">
            <div className="col-md-12">
              <UniversalTelecomFormField
                type="textarea"
                name="itemDetails"
                label="New Item S.No./Repaired Item Details"
                value={formValues.itemDetails}
                onChange={handleChange}
                placeholder="Enter new item serial number or repaired item details"
                error={errors.itemDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default FmtsForm;