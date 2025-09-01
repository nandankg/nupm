import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";
import { validateForm } from "../validation";
import { formatDate } from "../../../data/formatDate";
import { addAssetRegister } from "../../../reducer/store/AssetRegisterReducer";
import stationData from "../../../data/station.json";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const AssetRegisterTelecomForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sNo, setSNo] = useState(1);

  // Telecom-specific systems and equipment data
  const telecomSystemsData = {
    "Communication Systems": {
      "Telephone": ["IPBX-1", "IPBX-2", "Media Gateway", "VoIP Switch"],
      "Radio": ["RCP", "SCR", "Handportable", "MTS-4", "Base Station"],
      "Public Address": ["PA Amplifier", "Platform Speakers", "Microphone", "Control Unit"]
    },
    "Data & Network": {
      "FOTS": ["DSW", "ASW", "CCTV Switch", "Fiber Patch Panel"],
      "Network": ["Core Switch", "Access Switch", "Router", "Firewall", "Server"],
      "Data Storage": ["NAS", "SAN", "Backup Server", "Database Server"]
    },
    "Surveillance": {
      "CCTV": ["NVR", "Camera", "Monitor", "PTZ Camera", "Video Matrix"],
      "Recording": ["DVR", "Storage Array", "Backup System", "Playback Station"]
    },
    "Information Systems": {
      "PIDS": ["Display Unit", "Control Server", "LED Panel", "Driver Board"],
      "Clock": ["Master Clock", "Sub-Master Clock", "Platform Clock", "Analog Clock"],
      "OAIT": ["Switch", "Control Unit", "Interface Panel"]
    },
    "Access & Safety": {
      "ACS": ["AMC-1", "AMC-2", "PSU", "EML", "Door Controller"],
      "Fire": ["Fire Panel", "Smoke Detector", "Heat Detector", "Sounder"],
      "Security": ["Access Panel", "Card Reader", "Biometric", "CCTV"]
    },
    "Power Systems": {
      "UPS": ["UPS-1", "UPS-2", "Battery Bank", "ATS Rack", "ELCB", "SCVS"],
      "SMPS": ["SMPS-1", "SMPS-2", "SMR", "Power Supply", "Distribution"],
      "Power Distribution": ["ACDB", "DCDB", "MCB", "Distribution Panel"]
    },
    "Environmental": {
      "HVAC": ["AC Unit", "Ventilation", "Temperature Sensor", "Humidity Sensor"],
      "Monitoring": ["BMS", "Environmental Panel", "Alarm System"]
    }
  };

  const [availableSystems, setAvailableSystems] = useState([]);
  const [availableGearIds, setAvailableGearIds] = useState([]);
  const [station, setStation] = useState("");

  const basicInitialValues = {
    S_No: "",
    station: "",
    system: "",
    gearID: "",
    Dateofinstallation: "",
    DescriptionOfMaterial: "",
    make: "",
    serialno: "",
    qty: "",
    location: "",
    remark: "",
    employeeName: "",
    employeeID: "",
    designation: "",
    assetTag: "",
    condition: "Good",
    warrantyPeriod: "",
    vendor: "",
    purchaseDate: "",
    installationDate: "",
    maintenanceSchedule: "",
    department: "Telecom",
    unit: "s&t",
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

  // Handle station change and update available systems
  const handleStationChange = (e) => {
    const selectedStation = e.target.value;
    setStation(selectedStation);
    setFormValues({
      ...formValues,
      station: selectedStation,
      system: "",
      gearID: "",
    });
    
    // For telecom, all systems are available at all stations
    setAvailableSystems(Object.keys(telecomSystemsData));
  };

  // Handle system change and update available gear IDs
  const handleSystemChange = (e) => {
    const selectedSystem = e.target.value;
    setFormValues({ ...formValues, system: selectedSystem, gearID: "" });
    
    if (telecomSystemsData[selectedSystem]) {
      // Get all equipment from all subsystems
      const allEquipment = [];
      Object.keys(telecomSystemsData[selectedSystem]).forEach(subsystem => {
        telecomSystemsData[selectedSystem][subsystem].forEach(equipment => {
          allEquipment.push(`${subsystem} - ${equipment}`);
        });
      });
      setAvailableGearIds(allEquipment);
    } else {
      setAvailableGearIds([]);
    }
  };

  const handleEmployeeIdChange = (e) => {
    const empID = e.target.value;
    setFormValues({ 
      ...formValues, 
      employeeID: empID,
      employeeName: empID ? `Employee ${empID}` : "",
      designation: empID ? "Telecom Technician" : ""
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
      
      // Validate required fields
      if (!formValues.station || !formValues.system || !formValues.location) {
        setErrors({ submit: 'Please fill all required fields: Station, System, and Location' });
        setLoading(false);
        return;
      }

      // Add auto-generated fields
      const submitData = {
        ...formValues,
        S_No: sNo,
        submissionDate: new Date().toISOString(),
        assetTag: `TEL-${formValues.station}-${sNo.toString().padStart(4, '0')}`,
      };
      
      await dispatch(addAssetRegister(submitData));
      
      // Auto-increment serial number
      const newSrno = sNo + 1;
      setSNo(newSrno);
      
      // Reset form
      setFormValues(basicInitialValues);
      setStation("");
      setAvailableSystems([]);
      setAvailableGearIds([]);

      navigate(`/list/${slug}`);
    } catch (error) {
      console.error('Error saving Asset Register:', error);
      setErrors({ submit: 'Error saving data. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TelecomFormLayout 
      title="Asset Register"
      subtitle="Telecom Department - Asset Management Register"
      onSubmit={handleSubmit}
      loading={loading}
    >
      {errors.submit && (
        <div className="alert alert-danger mb-3">
          {errors.submit}
        </div>
      )}
      
      {/* Asset Basic Information */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h6 className="mb-0">
            <i className="fas fa-info-circle me-2"></i>
            Asset Information
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="date"
                name="Dateofinstallation"
                label="Date of Installation"
                value={formValues.Dateofinstallation}
                onChange={handleChange}
                required
                error={errors.Dateofinstallation}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="DescriptionOfMaterial"
                label="Description of Material"
                value={formValues.DescriptionOfMaterial}
                onChange={handleChange}
                placeholder="Detailed description of the asset"
                required
                error={errors.DescriptionOfMaterial}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="make"
                label="Make"
                value={formValues.make}
                onChange={handleChange}
                placeholder="Manufacturer name"
                error={errors.make}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="serialno"
                label="Serial No."
                value={formValues.serialno}
                onChange={handleChange}
                placeholder="Serial number"
                error={errors.serialno}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="number"
                name="qty"
                label="Quantity"
                value={formValues.qty}
                onChange={handleChange}
                placeholder="Number of units"
                error={errors.qty}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Location & System Details */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-map-marker-alt me-2"></i>
            Location & System Details
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="custom-select"
                name="station"
                label="Station"
                value={station}
                onChange={handleStationChange}
                options={stationData
                  .filter((station) => station["Station Name"])
                  .map((station) => ({
                    value: station["Station Name"],
                    label: station["Station Name"]
                  }))}
                required
                error={errors.station}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="custom-select"
                name="system"
                label="System"
                value={formValues.system}
                onChange={handleSystemChange}
                options={availableSystems.map(system => ({
                  value: system,
                  label: system
                }))}
                required
                error={errors.system}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="custom-select"
                name="gearID"
                label="Equipment/Gear ID"
                value={formValues.gearID}
                onChange={handleChange}
                options={availableGearIds.map(gear => ({
                  value: gear,
                  label: gear
                }))}
                error={errors.gearID}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="location"
                label="Location"
                value={formValues.location}
                onChange={handleChange}
                placeholder="Specific location (e.g., TER Room, Platform 1)"
                required
                error={errors.location}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="custom-select"
                name="condition"
                label="Asset Condition"
                value={formValues.condition}
                onChange={handleChange}
                options={[
                  { value: "Excellent", label: "Excellent" },
                  { value: "Good", label: "Good" },
                  { value: "Fair", label: "Fair" },
                  { value: "Poor", label: "Poor" },
                  { value: "Critical", label: "Critical" },
                  { value: "Out of Service", label: "Out of Service" }
                ]}
                required
                error={errors.condition}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Purchase & Warranty Information */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white">
          <h6 className="mb-0">
            <i className="fas fa-receipt me-2"></i>
            Purchase & Warranty Information
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="vendor"
                label="Vendor/Supplier"
                value={formValues.vendor}
                onChange={handleChange}
                placeholder="Vendor company name"
                error={errors.vendor}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="date"
                name="purchaseDate"
                label="Purchase Date"
                value={formValues.purchaseDate}
                onChange={handleChange}
                error={errors.purchaseDate}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="warrantyPeriod"
                label="Warranty Period"
                value={formValues.warrantyPeriod}
                onChange={handleChange}
                placeholder="e.g., 2 years, 36 months"
                error={errors.warrantyPeriod}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="text"
                name="assetTag"
                label="Asset Tag"
                value={formValues.assetTag || `TEL-${formValues.station || 'XXX'}-${sNo.toString().padStart(4, '0')}`}
                onChange={handleChange}
                placeholder="Auto-generated asset tag"
                error={errors.assetTag}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField
                type="custom-select"
                name="maintenanceSchedule"
                label="Maintenance Schedule"
                value={formValues.maintenanceSchedule}
                onChange={handleChange}
                options={[
                  { value: "Daily", label: "Daily" },
                  { value: "Weekly", label: "Weekly" },
                  { value: "Monthly", label: "Monthly" },
                  { value: "Quarterly", label: "Quarterly" },
                  { value: "Half-Yearly", label: "Half-Yearly" },
                  { value: "Yearly", label: "Yearly" },
                  { value: "As Required", label: "As Required" }
                ]}
                error={errors.maintenanceSchedule}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Employee Information */}
      <div className="card mb-4">
        <div className="card-header bg-warning text-dark">
          <h6 className="mb-0">
            <i className="fas fa-user me-2"></i>
            Responsible Employee Information
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="employee-id"
                name="employeeID"
                label="Employee ID"
                value={formValues.employeeID}
                onChange={handleEmployeeIdChange}
                placeholder="Enter Employee ID"
                required
                error={errors.employeeID}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="employeeName"
                label="Employee Name"
                value={formValues.employeeName}
                onChange={handleChange}
                className="bg-light"
                error={errors.employeeName}
              />
            </div>
            <div className="col-md-4">
              <UniversalTelecomFormField
                type="text"
                name="designation"
                label="Designation"
                value={formValues.designation}
                onChange={handleChange}
                className="bg-light"
                error={errors.designation}
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
            name="remark"
            label="Remarks"
            value={formValues.remark}
            onChange={handleChange}
            placeholder="Any additional remarks, maintenance notes, or special instructions"
            error={errors.remark}
          />
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default AssetRegisterTelecomForm;