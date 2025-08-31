import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm, equipmentFailureValidation } from "../validation/operationValidationSchemas";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const OCCEquipmentFailureForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [impdate, setImpdate] = useState("");
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [fdate, setFdate] = useState("")

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const [formData, setFormData] = useState({
    punctualityClassification: "",
    stationSection: "",
    line: "",
    floorLevel: "",
    department: "",
    failureId: "",
    failureCategory: "",
    equipmentFailed: "",
    equipmentNumber: "",
    stoppedWorking: false,
    trainSetNumber: "",
    dateTimeFailure: "",
    dateTimeRectification: "",
    description: "",
    remarks: "",
    deloggingDate: "",
    reloggedDepartment: ""
  });

  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current date in YYYY-MM-DD format - PRESERVED EXACT FUNCTION
  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  // Get current datetime in YYYY-MM-DDTHH:mm format - PRESERVED EXACT FUNCTION
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  // PRESERVED EXACT STATIONS ARRAY
  const stations = [
    "ABST", "ABST-CHBG", "ABST-DGPI", "ABST-MWYA", "ALL STATIONS", "ALMB", "ALMB-ABST", "ALMB-CHBG", "ALMB-DGPI", "ALMB-IDNM", "ALMB-MWYA", "ALMB-SGNG", "AMSM", "AMSM-CCAP", "AMSM-TPNR", "ASNS-KDSS", "BSNM", "BSNM-ITC", "BTNT", "BTNT-IDNM", "CCAP", "CCAP-AMSM", "CCAP-NEUTRAL SECTION", "CHBG", "CHBG-HSGJ", "DCC", "Depot Entry Line", "Depot Exit Line", "DGPI", "DGPI-CHBG", "HSGJ", "HSGJ-MSPA", "HSGJ-SHVA", "HZNJ", "HZNJ-CHBG", "HZNJ-KDSS", "HZNJ-NEUTRAL SECTION", "IDNM", "ITC", "ITC-BSNM", "KDSS", "KDSS-VSVM", "KRNM", "KRNM-ABST", "KRNM-ALMB", "KRNM-CHBG", "KRNM-DGPI", "KRNM-MWYA", "KRNM-SGNG", "LHMT", "LHMT-BSNM", "MSPA", "MSPA RSS", "MSPA-IDNM", "MWYA", "MWYA-ABST", "MWYA-CHBG", "MWYA-DGPI", "NEUTRAL SECTION TO MSPA", "OCC", "SGNG", "SGNG TO ABST", "SGNG,SHVA,MWYA,KDSS,LHMT", "SGNG-ABST", "SGNG-ALMB", "SGNG-CHBG", "SGNG-DGPI", "SGNG-MWYA", "SHVA", "SHVA-HZNJ", "TEST TRACK", "TPNR", "TPNR Depot Entry", "TPNR Depot Exit", "TPNR-ABST", "TPNR-ALMB", "TPNR-AMSM", "TPNR-CHBG", "TPNR-DGPI", "TPNR-KRNM", "TPNR-MWYA", "TPNR-SGNG", "VSVM", "VSVM-ITC", "VSVM-KDSS"
  ];

  // PRESERVED EXACT DEPARTMENT ARRAY
  const Department = [
    "Rolling Stock", "Signalling", "Telecom", "AFC", "Civil", "Track", "Traction-PSI", "Traction-OHE", "E&M", "Operations", "Security", "Rolling Stock/Signalling", "Rolling Stock/Track", "Telecom/Signalling", "E&M/Civil", "Rolling Stock/Operations", "Rolling Stock/Traction-OHE", "Traction-Telecom", "Traction- SCADA", "Rolling Stock/Signalling/Operations", "Telecom-SCADA", "Signalling/Traction-SCADA", "Rolling Stock/Telecom", "E&M / Telecom", "Civil / Telecom", "Signalling/P-Way", "Others"
  ];

  // PRESERVED EXACT FAILURE ARRAY
  const filure = [
    "A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "B6", "C1", "C2", "C3", "C4", "C5", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "E", "F1", "F2", "F3", "F4", "G", "H1", "H1", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "J1", "J2", "J3", "K1", "K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "K9", "L1", "L2", "L3", "L4"
  ];

  // PRESERVED EXACT EQUIPMENT ARRAY (first 50 for brevity - full list maintained)
  const equipment = [
    "AFC Entry Gate", "AFC Exit Gate", "AFC Wide Gate", "ATP On Board", "ATS", "AVM", "Borewell Automation", "Brakes", "Cab Door", "CCTV", "CCTV Monitor", "CVS", "DDU", "DFMD", "Door", "Escalator", "FACP", "Fire Alarm", "Fire Extinguisher", "Flush", "Gate-Shutter", "Glass", "Hand Faucet", "Help Phone", "Key Board", "Lift", "Lighting", "PACIS", "Partition Door", "PAS", "PIDS", "Platform Monitor", "POS", "Power Socket", "Railing", "RCTM", "RMS", "Saloon Door", "Server", "Sieve", "Signage", "Soap Dispensor", "Station Computer", "TDM", "TETRA", "Tiles", "TOCP", "TOM", "Traction Motor", "TVM", "Urinal", "Washbasin", "Water Pump", "Wire", "X-ray Machine", "TCMS", "Track", "Train-Interior", "PSB", "AFC Bi-directional Gate", "Swing Gate", "Air-conditioner", "Train-External Camera", "Axle Counter", "Train Door", "Free Space Recorder", "Digital Phone", "VOIP", "False Ceiling", "Electrical Switch", "Train Underframe", "Fire Hydrant", "Door Lock", "Station Auxiliary Supply(E&M)", "Structure Damage", "Train Exterior", "Train Smoke Detector", "Fire Pump", "Door Access Control", "WiFi", "Electrical Socket", "RCW", "HVAC", "Water Dispenser", "Borewell Pump", "Train Door/ATP", "CCTV HMI", "RCP", "PEI", "Telephone", "Train Radio", "Stone", "Smoke Detector", "Washroom", "Fan", "Video wall", "Floor", "MCP", "Pump Automation", "IOS", "Pantograph", "Circuit Breaker", "Bogie", "Repeater Panel", "Train Headlight", "Water Tap", "Urinal Sensor", "Train Internal Camera", "Station Clock", "AGTU", "Horn", "WFL", "TBC", "TO Seat", "Train Wiper", "DMI", "Mode Selector", "Fixed Signal", "LATS", "Train DSD", "Detrainment Door", "Train Pneumatic", "Water Tank", "Bulb", "Chair", "EFO", "Autowash Plant", "DRM", "DSD Buzzer", "Transformer", "VCB", "HHMD", "Hand Dryer", "Power Supply", "Counter Communication System", "UPS(PC)", "Train WSP", "Station Auxillary Supply (PSI)", "Tripping", "Others-Rolling Stock", "Others-Civil", "Others-E&M", "Others-Telecom", "Others-AFC", "Others-Track", "Others-Singalling", "Others-OHE", "Others-PSI", "Station HVAC", "Others-IT", "Water Leakage", "Train External Camera", "OHE", "Digital Clock", "Deadman Buzzer", "Point", "Station PC", "DG Set", "Conduit Pipe", "PIDS  Monitor", "Anemometer", "Domestic Pump", "Domestic Pump Automation", "IXL", "ACP", "Train Number Indicator", "Others-PR", "Granite Stone", "Analog Clock", "PEB Structure", "Others", "Signal", "Door Magnet", "All AFC gates", "S/S Supply", "Water Logging", "Station Radio", "PTZ", "Earthing Strip", "Cab Partition Door", "Extension Board", "Bridging Mechanism", "Jockey pump", "Water supply", "Jet Spray", "SCADA", "ATO", "Platform Mirror", "TVF SYSTEM", "TVS", "ECS", "Water Closet", "Water seepage", "AHU", "Potential Transformer", "Train coupler", "DCS", "Door Handle", "Booster Transformer", "SMIO", "Gas Flooding System", "Baffle Ceiling", "Lock", "Tensile roof", "Sticker", "Poster", "Lock key", "Sump Pump", "Water dripping", "Lift Intercom", "UPS", "PRINTER", "PC", "PCE", "BM", "PT Fuse", "Station Cab", "TO Cab", "Emergency Vehicle-OCC", "Others"
  ];

  // PRESERVED EXACT TRAIN SET NUMBERS
  const trainsetno = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations preserving business logic
    if (!formData.punctualityClassification) {
      errors.punctualityClassification = "Punctuality Classification is required";
    }
    
    if (!formData.stationSection) {
      errors.stationSection = "Station/Section is required";
    }
    
    if (!formData.department) {
      errors.department = "Department is required";
    }
    
    if (!formData.equipmentFailed) {
      errors.equipmentFailed = "Equipment Failed is required";
    }
    
    if (!formData.failureCategory) {
      errors.failureCategory = "Failure Category is required";
    }
    
    if (!formData.dateTimeFailure) {
      errors.dateTimeFailure = "Date/Time of Failure is required";
    }
    
    if (!formData.description.trim()) {
      errors.description = "Description of Failure is required";
    }

    // Business rule validations
    if (formData.dateTimeRectification && formData.dateTimeFailure) {
      const failureDateTime = new Date(formData.dateTimeFailure);
      const rectificationDateTime = new Date(formData.dateTimeRectification);
      if (rectificationDateTime < failureDateTime) {
        errors.dateTimeRectification = "Rectification date/time cannot be before failure date/time";
      }
    }

    if (formData.deloggingDate && formData.dateTimeFailure) {
      const failureDateTime = new Date(formData.dateTimeFailure);
      const deloggingDateTime = new Date(formData.deloggingDate);
      if (deloggingDateTime < failureDateTime) {
        errors.deloggingDate = "Delogging date cannot be before failure date/time";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // PRESERVED EXACT CHANGE HANDLER
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    if (name === 'dateTimeFailure') {
      setFdate(value)
    }
    
    // Clear field error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
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
    { text: "Equipment Failure Occ", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="Equipment Failure Occ"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="medium"
      formId="37"
      containerWidth="95%"
    >
      {/* PRESERVED EXACT FIRST ROW: Punctuality, Station/Section, Line */}
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="punctualityClassification" className="form-label">
              Punctuality Classification
              <span className="text-danger">*</span>
            </label>
            <select 
              className={`form-control ${formErrors.punctualityClassification ? 'is-invalid' : ''}`}
              name="punctualityClassification" 
              onChange={handleChange} 
              required
              value={formData.punctualityClassification}
            >
              <option value="">Select</option>
              <option value="More than 5 minutes">More than 5 minutes</option>
              <option value="1-4 Minutes">1-4 Minutes</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.punctualityClassification && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.punctualityClassification}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="stationSection" className="form-label">
              Station/Section
              <span className="text-danger">*</span>
            </label>
            <select 
              className={`form-control ${formErrors.stationSection ? 'is-invalid' : ''}`}
              name="stationSection" 
              onChange={handleChange} 
              required
              value={formData.stationSection}
            >
              <option value="">Select</option>
              <option value="">Select a Station</option>
              {stations.map((stn, index) => (
                <option key={index} value={stn}>
                  {stn}
                </option>
              ))}
            </select>
            {formErrors.stationSection && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.stationSection}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="line" className="form-label">Line</label>
            <select 
              className="form-control"
              name="line" 
              onChange={handleChange}
              value={formData.line}
            >
              <option value="">Select</option>
              <option value="UP">UP</option>
              <option value="DOWN">DOWN</option>
              <option value="Both">Both</option>
              <option value="UP Siding">UP Siding</option>
              <option value="UP Siding">DOWN Siding</option>
            </select>
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT SECOND ROW: Floor Level, Department, Failure ID */}
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="floorLevel" className="form-label">Floor Level</label>
            <select 
              className="form-control"
              name="floorLevel" 
              onChange={handleChange}
              value={formData.floorLevel}
            >
              <option value="">Select</option>
              <option value="Ground">Ground</option>
              <option value="Concourse">Concourse</option>
              <option value="Platform">Platform</option>
              <option value="Track">Track</option>
            </select>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Department
              <span className="text-danger">*</span>
            </label>
            <select 
              className={`form-control ${formErrors.department ? 'is-invalid' : ''}`}
              name="department" 
              onChange={handleChange} 
              required
              value={formData.department}
            >
              <option value="">Select</option>
              {Department.map((stn, index) => (
                <option key={index} value={stn}>
                  {stn}
                </option>
              ))}
            </select>
            {formErrors.department && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.department}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="failureId"
            label="AFC/TELE FAILURE ID"
            value={formData.failureId}
            onChange={handleChange}
            error={formErrors.failureId}
          />
        </div>
      </div>

      {/* PRESERVED EXACT THIRD ROW: Equipment Failed, Failure Category, Equipment Number */}
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="equipmentFailed" className="form-label">
              Equipment Failed
              <span className="text-danger">*</span>
            </label>
            <select 
              className={`form-control ${formErrors.equipmentFailed ? 'is-invalid' : ''}`}
              name="equipmentFailed" 
              onChange={handleChange} 
              required
              value={formData.equipmentFailed}
            >
              <option value="">Select</option>
              {equipment.map((stn, index) => (
                <option key={index} value={stn}>
                  {stn}
                </option>
              ))}
            </select>
            {formErrors.equipmentFailed && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.equipmentFailed}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="failureCategory" className="form-label">
              Failure Category
              <span className="text-danger">*</span>
            </label>
            <select 
              className={`form-control ${formErrors.failureCategory ? 'is-invalid' : ''}`}
              name="failureCategory" 
              onChange={handleChange} 
              required
              value={formData.failureCategory}
            >
              <option value="">Select</option>
              {filure.map((stn, index) => (
                <option key={index} value={stn}>
                  {stn}
                </option>
              ))}
            </select>
            {formErrors.failureCategory && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.failureCategory}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="text"
            name="equipmentNumber"
            label="Equipment Number"
            value={formData.equipmentNumber}
            onChange={handleChange}
            error={formErrors.equipmentNumber}
          />
        </div>
      </div>

      {/* PRESERVED EXACT FOURTH ROW: Stopped Working, Train Set Number, Relogged Department */}
      <div className="row mb-3">
        <div className="col-md-3 d-flex align-items-center">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="stoppedWorking"
              name="stoppedWorking"
              checked={formData.stoppedWorking}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="stoppedWorking">
              Stopped Working
            </label>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="trainSetNumber" className="form-label">Train Set Number</label>
            <select 
              className="form-control"
              name="trainSetNumber" 
              onChange={handleChange}
              value={formData.trainSetNumber}
            >
              <option value="">Select</option>
              {trainsetno.map((stn, index) => (
                <option key={index} value={stn}>
                  {stn}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="col-md-5">
          <div className="mb-3">
            <label htmlFor="reloggedDepartment" className="form-label">Relogged on Department</label>
            <select 
              className="form-control"
              name="reloggedDepartment" 
              onChange={handleChange}
              value={formData.reloggedDepartment}
            >
              <option value="">Select</option>
              {Department.map((stn, index) => (
                <option key={index} value={stn}>
                  {stn}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT DATE/TIME ROW: Failure, Rectification, Delogging */}
      <div className="row mb-3">
        <div className="col-md-4">
          <UniversalOperationFormField
            type="datetime"
            name="dateTimeFailure"
            label="Date/Time of Failure"
            value={formData.dateTimeFailure}
            onChange={handleChange}
            max={getCurrentDateTime()}
            required={true}
            error={formErrors.dateTimeFailure}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="datetime"
            name="dateTimeRectification"
            label="Date/Time of Rectification"
            value={formData.dateTimeRectification}
            onChange={handleChange}
            min={fdate}
            error={formErrors.dateTimeRectification}
          />
        </div>
        
        <div className="col-md-4">
          <UniversalOperationFormField
            type="datetime"
            name="deloggingDate"
            label="Delogging Date"
            value={formData.deloggingDate}
            onChange={handleChange}
            min={fdate}
            error={formErrors.deloggingDate}
          />
        </div>
      </div>

      {/* PRESERVED EXACT DESCRIPTION SECTION */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description of Failure
              <span className="text-danger">*</span>
            </label>
            <textarea
              className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
              rows="3"
              name="description"
              onChange={handleChange}
              required
              value={formData.description}
            />
            {formErrors.description && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.description}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRESERVED EXACT REMARKS SECTION */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="remarks" className="form-label">Remarks</label>
            <textarea
              className="form-control"
              rows="3"
              name="remarks"
              onChange={handleChange}
              value={formData.remarks}
            />
          </div>
        </div>
      </div>
    </OperationFormLayout>
  );
};

export default OCCEquipmentFailureForm;