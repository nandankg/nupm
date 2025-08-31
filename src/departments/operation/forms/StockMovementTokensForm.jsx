import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm, stockMovementValidation } from "../validation/operationValidationSchemas";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const StockMovementTokensForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const [formData, setFormData] = useState({
    date: '',
    station: '',
    netOpeningStock: { ok: 0, defective: 0, emergency: 0 },
    tokenMovement: [],
    closingStock: [],
    netOpeningStockOK: '',
    receivedFromGates: '',
    receivedFromOtherStation: '',
    refundedCancelledTokens: '',
    looseTokens: '',
    receivedFromRCC: '',
    tokenLeftInGates: '',
    sentToOtherStation: '',
    totalTokenSale: '',
    grossClosingStock: '',
    okGrossClosingStock: '',
    netOKGrossClosingStock: '',
    netClosingStock: { ok: 0, defective: 0, emergency: 0 },
    netForTheDayStock: { ok: 0, defective: 0, emergency: 0 },
  });

  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // PRESERVED EXACT STATIONS ARRAY
  const stations = [
    "ABST", "ABST-CHBG", "ABST-DGPI", "ABST-MWYA", "ALL STATIONS", "ALMB", "ALMB-ABST", "ALMB-CHBG", "ALMB-DGPI", "ALMB-IDNM", "ALMB-MWYA", "ALMB-SGNG", "AMSM", "AMSM-CCAP", "AMSM-TPNR", "ASNS-KDSS", "BSNM", "BSNM-ITC", "BTNT", "BTNT-IDNM", "CCAP", "CCAP-AMSM", "CCAP-NEUTRAL SECTION", "CHBG", "CHBG-HSGJ", "DCC", "Depot Entry Line", "Depot Exit Line", "DGPI", "DGPI-CHBG", "HSGJ", "HSGJ-MSPA", "HSGJ-SHVA", "HZNJ", "HZNJ-CHBG", "HZNJ-KDSS", "HZNJ-NEUTRAL SECTION", "IDNM", "ITC", "ITC-BSNM", "KDSS", "KDSS-VSVM", "KRNM", "KRNM-ABST", "KRNM-ALMB", "KRNM-CHBG", "KRNM-DGPI", "KRNM-MWYA", "KRNM-SGNG", "LHMT", "LHMT-BSNM", "MSPA", "MSPA RSS", "MSPA-IDNM", "MWYA", "MWYA-ABST", "MWYA-CHBG", "MWYA-DGPI", "NEUTRAL SECTION TO MSPA", "OCC", "SGNG", "SGNG TO ABST", "SGNG,SHVA,MWYA,KDSS,LHMT", "SGNG-ABST", "SGNG-ALMB", "SGNG-CHBG", "SGNG-DGPI", "SGNG-MWYA", "SHVA", "SHVA-HZNJ", "TEST TRACK", "TPNR", "TPNR Depot Entry", "TPNR Depot Exit", "TPNR-ABST", "TPNR-ALMB", "TPNR-AMSM", "TPNR-CHBG", "TPNR-DGPI", "TPNR-KRNM", "TPNR-MWYA", "TPNR-SGNG", "VSVM", "VSVM-ITC", "VSVM-KDSS"
  ];

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formData.date) {
      errors.date = "Date is required";
    }
    
    if (!formData.station) {
      errors.station = "Station is required";
    }

    // Business rule validations for stock numbers
    if (formData.netOpeningStock.ok < 0 || formData.netOpeningStock.defective < 0 || formData.netOpeningStock.emergency < 0) {
      errors.netOpeningStock = "Stock quantities cannot be negative";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // PRESERVED EXACT TOKEN MOVEMENT ADD FUNCTION
  const handleTokenMovementAdd = () => {
    setFormData(prev => ({
      ...prev,
      tokenMovement: [...prev.tokenMovement, { equipment: '', noOfTokens: '', from: '', to: '', time: '', empNo: '', containerNo: '' }]
    }));
  };

  // PRESERVED EXACT CLOSING STOCK ADD FUNCTION
  const handleClosingStockAdd = () => {
    setFormData(prev => ({
      ...prev,
      closingStock: [...prev.closingStock, { ContNo: '', Qty: '', location: '' }]
    }));
  };

  // PRESERVED EXACT INPUT CHANGE HANDLER
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // PRESERVED EXACT TOKEN MOVEMENT CHANGE HANDLER
  const handleTokenMovementChange = (index, field, value) => {
    const newMovement = [...formData.tokenMovement];
    newMovement[index][field] = value;
    setFormData(prev => ({ ...prev, tokenMovement: newMovement }));
  };

  // PRESERVED EXACT CLOSING STOCK CHANGE HANDLER
  const handleClosingStockChange = (index, field, value) => {
    const newClosing = [...formData.closingStock];
    newClosing[index][field] = value;
    setFormData(prev => ({ ...prev, closingStock: newClosing }));
  };

  // Handle stock changes for nested objects
  const handleStockChange = (stockType, stockCategory, value) => {
    setFormData(prev => ({
      ...prev,
      [stockType]: {
        ...prev[stockType],
        [stockCategory]: parseInt(value) || 0
      }
    }));
  };

  // PRESERVED EXACT SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    dispatch(addData({ formType: slug, values: formData }))
      .then(() => {
        console.log("Form Data Submitted:", formData);
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

  // Breadcrumb items
  const breadcrumbItems = [
    { text: "Stock Movement", to: "#" },
    { text: "Tokens", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="Stock Movement Record"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="medium"
      formId="25"
      containerWidth="100%"
    >
      {/* PRESERVED EXACT DATE AND STATION ROW */}
      <div className="row mb-3">
        <div className="col-md-6">
          <UniversalOperationFormField
            type="date"
            name="date"
            label="Date"
            value={formData.date}
            onChange={handleInputChange}
            required={true}
            error={formErrors.date}
          />
        </div>
        
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="station" className="form-label">
              Station
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.station ? 'is-invalid' : ''}`}
              name="station"
              onChange={handleInputChange}
              required
              value={formData.station}
            >
              <option value="">Select a Station</option>
              {stations.map((stn, index) => (
                <option key={index} value={stn}>
                  {stn}
                </option>
              ))}
            </select>
            {formErrors.station && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.station}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT NET OPENING STOCK SECTION */}
      <div className="mb-4">
        <h5 className="mb-3">Net Opening Stock</h5>
        <div className="row mb-3">
          <div className="col-md-4">
            <UniversalOperationFormField
              type="number"
              name="ok"
              label="OK Stock"
              value={formData.netOpeningStock.ok}
              onChange={(e) => handleStockChange('netOpeningStock', 'ok', e.target.value)}
              min="0"
              error={formErrors.netOpeningStock}
            />
          </div>
          
          <div className="col-md-4">
            <UniversalOperationFormField
              type="number"
              name="defective"
              label="Defective Stock"
              value={formData.netOpeningStock.defective}
              onChange={(e) => handleStockChange('netOpeningStock', 'defective', e.target.value)}
              min="0"
            />
          </div>
          
          <div className="col-md-4">
            <UniversalOperationFormField
              type="number"
              name="emergency"
              label="Emergency Stock"
              value={formData.netOpeningStock.emergency}
              onChange={(e) => handleStockChange('netOpeningStock', 'emergency', e.target.value)}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT TOKEN MOVEMENT SECTION */}
      <div className="mb-4">
        <h5 className="mb-3">Token Movement for the Day</h5>
        {formData.tokenMovement.map((movement, idx) => (
          <div key={idx} className="row mb-2 border p-2">
            <div className="col-md-2">
              <UniversalOperationFormField
                type="text"
                name="equipment"
                label="Equipment"
                value={movement.equipment}
                onChange={(e) => handleTokenMovementChange(idx, 'equipment', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <UniversalOperationFormField
                type="number"
                name="noOfTokens"
                label="No Of Tokens"
                value={movement.noOfTokens}
                onChange={(e) => handleTokenMovementChange(idx, 'noOfTokens', e.target.value)}
                min="0"
              />
            </div>
            <div className="col-md-2">
              <UniversalOperationFormField
                type="text"
                name="from"
                label="From"
                value={movement.from}
                onChange={(e) => handleTokenMovementChange(idx, 'from', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <UniversalOperationFormField
                type="text"
                name="to"
                label="To"
                value={movement.to}
                onChange={(e) => handleTokenMovementChange(idx, 'to', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <UniversalOperationFormField
                type="time"
                name="time"
                label="Time"
                value={movement.time}
                onChange={(e) => handleTokenMovementChange(idx, 'time', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <UniversalOperationFormField
                type="employee"
                name="empNo"
                label="Emp No"
                value={movement.empNo}
                onChange={(e) => handleTokenMovementChange(idx, 'empNo', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <UniversalOperationFormField
                type="text"
                name="containerNo"
                label="Container No"
                value={movement.containerNo}
                onChange={(e) => handleTokenMovementChange(idx, 'containerNo', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success mb-3"
          onClick={handleTokenMovementAdd}
        >
          + Add Token Movement
        </button>
      </div>

      {/* PRESERVED EXACT MAIN FORM FIELDS SECTION */}
      <div className="row mb-4">
        <div className="col-md-6">
          {["netOpeningStockOK", "receivedFromGates", "receivedFromOtherStation", "refundedCancelledTokens", "looseTokens", "receivedFromRCC"].map((field, idx) => (
            <div key={idx} className="mb-3">
              <UniversalOperationFormField
                type="number"
                name={field}
                label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                value={formData[field]}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          ))}
        </div>
        
        <div className="col-md-6">
          {["tokenLeftInGates", "sentToOtherStation", "totalTokenSale", "grossClosingStock", "okGrossClosingStock", "netOKGrossClosingStock"].map((field, idx) => (
            <div key={idx} className="mb-3">
              <UniversalOperationFormField
                type="number"
                name={field}
                label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                value={formData[field]}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* PRESERVED EXACT LOCATION OF CLOSING STOCK SECTION */}
      <div className="mb-4">
        <h5 className="mb-3">Location of Closing Stock</h5>
        {formData.closingStock.map((stock, idx) => (
          <div key={idx} className="row mb-2 border p-2">
            <div className="col-md-4">
              <UniversalOperationFormField
                type="text"
                name="ContNo"
                label="Cont No"
                value={stock.ContNo}
                onChange={(e) => handleClosingStockChange(idx, 'ContNo', e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <UniversalOperationFormField
                type="number"
                name="Qty"
                label="Qty"
                value={stock.Qty}
                onChange={(e) => handleClosingStockChange(idx, 'Qty', e.target.value)}
                min="0"
              />
            </div>
            <div className="col-md-4">
              <UniversalOperationFormField
                type="text"
                name="location"
                label="Location"
                value={stock.location}
                onChange={(e) => handleClosingStockChange(idx, 'location', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-success mb-3"
          onClick={handleClosingStockAdd}
        >
          + Add Closing Stock
        </button>
      </div>

      {/* PRESERVED EXACT FOR THE DAY SECTION */}
      <div className="mb-4">
        <h5 className="mb-3">For the Day</h5>
        <div className="row mb-3">
          <div className="col-md-4">
            <UniversalOperationFormField
              type="number"
              name="ok"
              label="OK Stock"
              value={formData.netForTheDayStock.ok}
              onChange={(e) => handleStockChange('netForTheDayStock', 'ok', e.target.value)}
              min="0"
            />
          </div>
          
          <div className="col-md-4">
            <UniversalOperationFormField
              type="number"
              name="defective"
              label="Defective Stock"
              value={formData.netForTheDayStock.defective}
              onChange={(e) => handleStockChange('netForTheDayStock', 'defective', e.target.value)}
              min="0"
            />
          </div>
          
          <div className="col-md-4">
            <UniversalOperationFormField
              type="number"
              name="emergency"
              label="Emergency Stock"
              value={formData.netForTheDayStock.emergency}
              onChange={(e) => handleStockChange('netForTheDayStock', 'emergency', e.target.value)}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT CLOSING STOCK SECTION */}
      <div className="mb-4">
        <h5 className="mb-3">Closing Stock</h5>
        <div className="row mb-3">
          <div className="col-md-4">
            <UniversalOperationFormField
              type="number"
              name="ok"
              label="OK Stock"
              value={formData.netClosingStock.ok}
              onChange={(e) => handleStockChange('netClosingStock', 'ok', e.target.value)}
              min="0"
            />
          </div>
          
          <div className="col-md-4">
            <UniversalOperationFormField
              type="number"
              name="defective"
              label="Defective Stock"
              value={formData.netClosingStock.defective}
              onChange={(e) => handleStockChange('netClosingStock', 'defective', e.target.value)}
              min="0"
            />
          </div>
          
          <div className="col-md-4">
            <UniversalOperationFormField
              type="number"
              name="emergency"
              label="Emergency Stock"
              value={formData.netClosingStock.emergency}
              onChange={(e) => handleStockChange('netClosingStock', 'emergency', e.target.value)}
              min="0"
            />
          </div>
        </div>
      </div>
    </OperationFormLayout>
  );
};

export default StockMovementTokensForm;