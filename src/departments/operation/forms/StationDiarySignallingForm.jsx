import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UniversalOperationFormField, OperationFormLayout } from "../components";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { validateOperationForm } from "../validation/operationValidationSchemas";
import { formatDate } from "../../../data/formatDate";
import station from "../../../data/station.json";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const StationDiarySignallingForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const stationDiary = useSelector((state) => state.data);

  // PRESERVED EXACT SHIFT ACTIVITY DATA
  const shiftactivity = [
    {
      category: "Details of Maintenance Activity",
      activity: "Checking of all Signalling sub-system as per check list",
    },
    {
      category: "Details of Maintenance Activity",
      activity:
        "Availability of Tools,Test Equipments, Peripherals, Application Drawings and Manuals as per list. (Remarks for deficiency, if any to initiate Replenishment for the same)",
    },
    {
      category: "Details of Maintenance Activity",
      activity: "Checking of SER Temperature & Humidity Reading",
    },
    {
      category: "Details of Maintenance Activity",
      activity:
        "Checking of spares available as per List.(Remarks for deficiency, if any to initiate Replenishment for the same)",
    },
    {
      category: "Details of Maintenance Activity",
      activity:
        "Checking of Signalling Equipment installed in SCR (LATS/VDU/LRB/ESP/EKT etc.)",
    },
    {
      category: "Details of Maintenance Activity",
      activity: "Faulty AC in SER",
    },
    {
      category: "Details of Maintenance Activity",
      activity: "Availability of Consumable Items",
    },
    {
      category: "Details of Maintenance Activity",
      activity: "Point Operation from VDU/LATS",
    },
    {
      category: "Details of Maintenance Activity",
      activity: "Error Code, Variables & Logs on SDM",
    },
    {
      category: "Details of Maintenance Activity",
      activity: "CLC Changeover",
    },
    {
      category: "Details of Maintenance Activity",
      activity: "Shift Preventive/ Corrective maintenance details",
    },
    {
      category: "Details of Maintenance Activity",
      activity: "Gang Member List",
    },
  ];

  // PRESERVED EXACT SHIFT RANGES
  const shiftRanges = ["Shift A", "Shift B", "Shift C"];

  // PRESERVED EXACT INITIAL VALUES - No changes to field names or structure
  const [formData, setFormData] = useState({
    Station: "",
    date: "",
    shift: shiftactivity.map(() => ({
      checked: "",
      val: "",
      Remarks: "",
    })),
    range: "Shift A",
    Zone: "",
    A_Staken: "",
    A_Shanded: "",
    A_Ntaken: "",
    A_Nhanded: "",
    A_Dtaken: "",
    A_Dhanded: "",
    A_Etaken: "",
    A_Ehanded: "",
    employee_id: "",
    department: "",
    unit: "",
    submissionDate: "",
  });

  const [shiftRange, setShiftRange] = useState("Shift A");

  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Import user data for auto-fill
  const user = JSON.parse(localStorage.getItem("userdata")) || {};

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formData.Station) {
      errors.Station = "Station is required";
    }
    
    if (!formData.date) {
      errors.date = "Date is required";
    }

    if (!formData.range) {
      errors.range = "Shift is required";
    }

    // Validate at least one activity is completed
    const hasActivity = formData.shift.some(item => item.checked || item.val);
    if (!hasActivity) {
      errors.activities = "Please complete at least one maintenance activity";
    }

    // Validate charge taken over fields
    if (!formData.A_Ntaken) {
      errors.A_Ntaken = "Name (Charge Taken Over By) is required";
    }

    if (!formData.A_Nhanded) {
      errors.A_Nhanded = "Name (Charge Handed Over By) is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // PRESERVED EXACT SHIFT RANGE HANDLER
  const shiftRangeHandler = (event) => {
    const selectedRange = event.target.value;
    setShiftRange(selectedRange);
    setFormData((prevValues) => ({
      ...prevValues,
      pointNo: selectedRange,
      range: selectedRange,
    }));
  };

  // PRESERVED EXACT CHANGE HANDLER
  const handleChange = (index, field, value) => {
    setFormData((prevValues) => {
      const updatedShift = prevValues.shift.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prevValues, shift: updatedShift };
    });
  };

  // Basic form field handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // PRESERVED EXACT SUBMIT FUNCTION WITH ENHANCED ERROR HANDLING
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      alert('Please fill all required fields and complete at least one maintenance activity.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add timestamp and employee auto-fill
      const submitData = {
        ...formData,
        submissionDate: new Date().toISOString(),
        // Auto-populate employee data
        employee_id: formData.employee_id || (user?.profileid || 'AUTO_EMP_001'),
        department: formData.department || (user?.department || 'Signalling'),
        unit: formData.unit || 'SIGNALLING',
      };
      
      // Save to local storage as backup
      const backupData = JSON.parse(localStorage.getItem('stationDiaryBackup') || '[]');
      backupData.push({...submitData, id: Date.now().toString(), status: 'pending'});
      localStorage.setItem('stationDiaryBackup', JSON.stringify(backupData));
      
      // Dispatch to API
      const result = await dispatch(addData({ formType: slug, values: submitData })).unwrap();
      
      console.log("Form Data Submitted:", submitData);
      alert('Station Diary saved successfully!');
      navigate(`/list/${slug}`);
      
    } catch (error) {
      console.error('Error saving Station Diary:', error);
      alert('Error saving data. Data has been saved locally and will be synced when connection is available.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { text: "STATION DIARY (SIGNALLING)", to: "#" },
    { text: "Register", to: "#" }
  ];

  return (
    <OperationFormLayout
      title="STATION DIARY (SIGNALLING)"
      formType="Operation"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      priority="high"
      formId="31"
      containerWidth="94%"
    >
      {/* PRESERVED EXACT HEADER ROW */}
      <div className='row mb-3'>
        <div className='col-md-2'>
          <div className="mb-3">
            <label htmlFor="Station" className="form-label">
              Station:
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.Station ? 'is-invalid' : ''}`}
              name="Station"
              value={formData.Station}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Station</option>
              {station
                .filter((stn) => 
                  stn["Station Name"] && 
                  !stn["Station Name"].includes('AFC') && 
                  !stn["Station Name"].includes('Store')
                )
                .map((stn) => (
                  <option key={stn["STATION Code"]} value={stn["Station Name"]}>
                    {stn["Station Name"]}
                  </option>
                ))}
            </select>
            {formErrors.Station && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.Station}
              </div>
            )}
          </div>
        </div>

        <div className='col-md-2'>
          <div className="mb-3">
            <label htmlFor="range" className="form-label">
              Shift:
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-control ${formErrors.range ? 'is-invalid' : ''}`}
              onChange={shiftRangeHandler}
              value={shiftRange}
              name="shiftRange"
            >
              {shiftRanges.map((range, index) => (
                <option key={index} value={range}>
                  {range}
                </option>
              ))}
            </select>
            {formErrors.range && (
              <div className="text-danger small mt-1" role="alert">
                {formErrors.range}
              </div>
            )}
          </div>
        </div>

        <div className='col-md-2'>
          <div className="mb-3">
            <label htmlFor="Zone" className="form-label">IXL Zone:</label>
            <select
              className="form-control"
              name="Zone"
              value={formData.Zone}
              onChange={handleInputChange}
            >
              <option value="">Select Zone</option>
              <option value="TPD">TPD</option>
              <option value="TPNR">TPNR</option>
              <option value="HSGJ">HSGJ</option>
              <option value="IDNM">IDNM</option>
            </select>
          </div>
        </div>

        <div className='col-md-2 offset-md-4'>
          <UniversalOperationFormField
            type="date"
            name="date"
            label="Date:"
            value={formData.date}
            onChange={handleInputChange}
            required={true}
            error={formErrors.date}
          />
        </div>
      </div>

      {/* PRESERVED EXACT SHIFT ACTIVITIES SECTION */}
      <div className="mb-4">
        {formErrors.activities && (
          <div className="alert alert-danger" role="alert">
            {formErrors.activities}
          </div>
        )}
        
        {shiftactivity.map((activity, index) => {
          const shouldPrintCategory =
            index === 0 ||
            activity.category !== shiftactivity[index - 1].category;

          return (
            <div key={index} className="mb-3">
              {shouldPrintCategory && (
                <div className="row">
                  <h5 className="form-label mb-2 text-primary">
                    {activity.category}
                  </h5>
                </div>
              )}
              
              <div className="border p-3 mb-2">
                <label className="form-label mb-2 d-flex justify-content-between align-items-start">
                  <span className="col-md-6">{activity.activity}</span>
                  <div className="d-flex gap-3 col-md-6">
                    {activity.activity === "CLC Changeover" ? (
                      <select
                        className="form-control"
                        onChange={(e) => handleChange(index, "val", e.target.value)}
                        value={formData.shift[index].val}
                      >
                        <option value="">Select</option>
                        <option value="N">N</option>
                        <option value="R">R</option>
                        <option value="N to R">N to R</option>
                        <option value="R to N">R to N</option>
                      </select>
                    ) : (
                      <select
                        className="form-control"
                        onChange={(e) => handleChange(index, "checked", e.target.value)}
                        value={formData.shift[index].checked}
                      >
                        <option value="">Select Status</option>
                        <option value="DONE">DONE</option>
                        <option value="NOT DONE">NOT DONE</option>
                        <option value="OK">OK</option>
                        <option value="NOK">NOK</option>
                        <option value="N/A">None</option>
                      </select>
                    )}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Remarks"
                      value={formData.shift[index].Remarks}
                      onChange={(e) => handleChange(index, "Remarks", e.target.value)}
                    />
                  </div>
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* PRESERVED EXACT CHARGE TAKEN OVER SECTION */}
      <h5 className="text-center p-3 bg-light">Charge Taken Over By</h5>
      <div className='row mb-3'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="A_Ntaken"
            label="Name:"
            value={formData.A_Ntaken}
            onChange={handleInputChange}
            required={true}
            error={formErrors.A_Ntaken}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="A_Etaken"
            label="Employee No:"
            value={formData.A_Etaken}
            onChange={handleInputChange}
            error={formErrors.A_Etaken}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="A_Dtaken"
            label="Designation:"
            value={formData.A_Dtaken}
            onChange={handleInputChange}
            error={formErrors.A_Dtaken}
          />
        </div>
      </div>

      {/* PRESERVED EXACT CHARGE HANDED OVER SECTION */}
      <h5 className="text-center p-3 bg-light">Charge Handed Over By</h5>
      <div className='row mb-3'>
        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="A_Nhanded"
            label="Name:"
            value={formData.A_Nhanded}
            onChange={handleInputChange}
            required={true}
            error={formErrors.A_Nhanded}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="A_Ehanded"
            label="Employee No:"
            value={formData.A_Ehanded}
            onChange={handleInputChange}
            error={formErrors.A_Ehanded}
          />
        </div>

        <div className='col-md-4'>
          <UniversalOperationFormField
            type="text"
            name="A_Dhanded"
            label="Designation:"
            value={formData.A_Dhanded}
            onChange={handleInputChange}
            error={formErrors.A_Dhanded}
          />
        </div>
      </div>

      {/* PRESERVED EXACT HIDDEN FIELDS FOR COMPATIBILITY */}
      <input type="hidden" name="employee_id" value={formData.employee_id} />
      <input type="hidden" name="department" value={formData.department} />
      <input type="hidden" name="unit" value={formData.unit} />
    </OperationFormLayout>
  );
};

export default StationDiarySignallingForm;