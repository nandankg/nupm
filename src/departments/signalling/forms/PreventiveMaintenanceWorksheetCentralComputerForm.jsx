import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addData,
  updateData,
  removeData,
} from "../../redux/signalling/preventiveMaintenanceWorksheetCentralComputerSlice";
import { formatDate } from "../../utils/dateHelper";
import { 
  FormContainer, 
  FormSection, 
  FormRow, 
  FormField, 
  SelectField,
  DateField,
  TextInput,
  CheckboxGroup,
  RemarkField,
  ActionField,
  DeficiencyField,
  SignatureSection,
  SectionHeader
} from "../../../components/signalling/UniversalSignallingComponents";

const PreventiveMaintenanceWorksheetCentralComputerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentEntry, entries, loading } = useSelector(
    (state) => state.preventiveMaintenanceWorksheetCentralComputer
  );

  const initialFormState = {
    date: "",
    station: "",
    activities: Array(29).fill({
      CCServerRack: "No",
      NetworkRack: "No",
      CCHSServerNetworkRack: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),
    staff1_name: "--",
    staff1_desg: "--",
    staff1_employee: "--",
    staff1_sign: "--",
    staff2_name: "--",
    staff2_desg: "--",
    staff2_employee: "--",
    staff2_sign: "--",
    staff3_name: "--",
    staff3_desg: "--",
    staff3_employee: "--",
    staff3_sign: "--",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (currentEntry) {
      setFormData(currentEntry);
    }
  }, [currentEntry]);

  const maintenanceActivities = [
    "Checking of all Cable connection and dressing",
    "Checking of physical condition of all cable (specially for Rodent cut)",
    "Checking of any opening inside rack",
    "Checking of Fan status of Racks and Equipments",
    "Checking of power indication of Rack",
    "Checking of status of KMS",
    "Checking of LED indication of all the 20 drive of Main storage",
    "Checking of LED indication of all the 10 drive of Backup storage",
    "Checking of health Status of all the server inside Rack",
    "Checking of health Status of all the Networking equipment inside rack",
    "Checking of health Status of the Tape Library",
    "Checking and ensuring that no excessive heat accumulated inside rack",
    "Checking of LED indication of NTP servers",
    "Checking of health Status of all the Networking equipment inside CER rack",
    "Cleaning of Rack",
    "Exterior cleaning of equipments in the rack",
    "Internal cleaning of CC servers.",
    "Internal cleaning of CC Storage devices and Tape Library including tapes.",
    "Internal cleaning of CC networking equipments.",
    "Internal cleaning of Firewall",
    "Internal cleaning of L2 switch and LIU in CER",
    "Check Voltage between neutral & earth in the rack",
    "Checking of the storage (Fare On DB, AVW DB)",
    "Check Patch updates of servers.",
    "Check Firmware of firewall",
    "Check LAN status of all the equipments in the rack",
    "Checking of room temperature",
    "Check all the services of the server",
    "Check if Add Value Website is working",
  ];

  const handleInputChange = (field, value, index, subField) => {
    if (index !== undefined && subField) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].map((item, idx) => 
          idx === index ? { ...item, [subField]: value } : item
        )
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCheckboxChange = (index, checkboxField) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.map((item, idx) => 
        idx === index 
          ? { ...item, [checkboxField]: item[checkboxField] === "No" ? "Yes" : "No" }
          : item
      )
    }));
  };

  const handleSelectAllChange = (index, isChecked) => {
    const checkboxFields = ["CCServerRack", "NetworkRack", "CCHSServerNetworkRack"];
    
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.map((item, idx) => {
        if (idx === index) {
          const updatedItem = { ...item };
          checkboxFields.forEach(field => {
            updatedItem[field] = isChecked ? "Yes" : "No";
          });
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentEntry) {
      dispatch(updateData(formData));
    } else {
      dispatch(addData(formData));
    }
    navigate("/signalling/preventive-maintenance-worksheet-central-computer/list");
  };

  const handleReset = () => {
    setFormData(initialFormState);
  };

  const handleDelete = () => {
    if (currentEntry && window.confirm("Are you sure you want to delete this entry?")) {
      dispatch(removeData(currentEntry.id));
      navigate("/signalling/preventive-maintenance-worksheet-central-computer/list");
    }
  };

  return (
    <FormContainer
      title="Preventive Maintenance Worksheet of Central Computer (Yearly)"
      onSubmit={handleSubmit}
      loading={loading}
    >
      <FormSection>
        <FormRow>
          <FormField md={6}>
            <DateField
              label="Date"
              value={formData.date}
              onChange={(value) => handleInputChange("date", value)}
              required
            />
          </FormField>
          
          <FormField md={6}>
            <SelectField
              label="Station"
              value={formData.station}
              onChange={(value) => handleInputChange("station", value)}
              required
            />
          </FormField>
        </FormRow>
      </FormSection>

      <FormSection>
        <SectionHeader title="Central Computer Maintenance Activities" />
        
        {maintenanceActivities.map((activity, index) => {
          const checkboxFields = ["CCServerRack", "NetworkRack", "CCHSServerNetworkRack"];
          const isAllSelected = checkboxFields.every(
            field => formData.activities[index][field] === "Yes"
          );

          return (
            <div key={index} className="border rounded p-3 mb-3">
              <FormRow>
                <FormField md={12}>
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">{activity}</label>
                    </div>
                    
                    <div className="col-md-2">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`selectAll_${index}`}
                          checked={isAllSelected}
                          onChange={(e) => handleSelectAllChange(index, e.target.checked)}
                        />
                        <label className="form-check-label small" htmlFor={`selectAll_${index}`}>
                          {isAllSelected ? "Uncheck All" : "Check All"}
                        </label>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="d-flex gap-3">
                        {checkboxFields.map((field, fieldIndex) => (
                          <div key={field} className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`${field}_${index}`}
                              checked={formData.activities[index][field] === "Yes"}
                              onChange={() => handleCheckboxChange(index, field)}
                            />
                            <label className="form-check-label small" htmlFor={`${field}_${index}`}>
                              {field === "CCServerRack" ? "CC Server Rack" :
                               field === "NetworkRack" ? "Network Rack" :
                               "CC/HS Server Network Rack"}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FormField>
              </FormRow>

              <FormRow>
                <FormField md={4}>
                  <RemarkField
                    label="Remarks/Deficiencies"
                    value={formData.activities[index].remark}
                    onChange={(value) => handleInputChange("activities", value, index, "remark")}
                  />
                </FormField>
                
                <FormField md={3}>
                  <ActionField
                    label="Action Taken"
                    value={formData.activities[index].action}
                    onChange={(value) => handleInputChange("activities", value, index, "action")}
                  />
                </FormField>
                
                <FormField md={5}>
                  <DeficiencyField
                    label="Why Deficiency Could Not Be Rectified"
                    value={formData.activities[index].deficiency}
                    onChange={(value) => handleInputChange("activities", value, index, "deficiency")}
                  />
                </FormField>
              </FormRow>
            </div>
          );
        })}
      </FormSection>

      <SignatureSection
        title="Staff Details"
        staff={[
          {
            name: formData.staff1_name,
            designation: formData.staff1_desg,
            employeeNo: formData.staff1_employee,
            signature: formData.staff1_sign,
            onNameChange: (value) => handleInputChange("staff1_name", value),
            onDesignationChange: (value) => handleInputChange("staff1_desg", value),
            onEmployeeNoChange: (value) => handleInputChange("staff1_employee", value),
            onSignatureChange: (value) => handleInputChange("staff1_sign", value),
          },
          {
            name: formData.staff2_name,
            designation: formData.staff2_desg,
            employeeNo: formData.staff2_employee,
            signature: formData.staff2_sign,
            onNameChange: (value) => handleInputChange("staff2_name", value),
            onDesignationChange: (value) => handleInputChange("staff2_desg", value),
            onEmployeeNoChange: (value) => handleInputChange("staff2_employee", value),
            onSignatureChange: (value) => handleInputChange("staff2_sign", value),
          },
          {
            name: formData.staff3_name,
            designation: formData.staff3_desg,
            employeeNo: formData.staff3_employee,
            signature: formData.staff3_sign,
            onNameChange: (value) => handleInputChange("staff3_name", value),
            onDesignationChange: (value) => handleInputChange("staff3_desg", value),
            onEmployeeNoChange: (value) => handleInputChange("staff3_employee", value),
            onSignatureChange: (value) => handleInputChange("staff3_sign", value),
          },
        ]}
        includeEmployeeNo={true}
      />

      <FormRow>
        <div className="col-12 text-center">
          <div className="btn-group" role="group">
            <button type="submit" className="btn btn-primary">
              {currentEntry ? "Update" : "Save"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
            {currentEntry && (
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </div>
      </FormRow>
    </FormContainer>
  );
};

export default PreventiveMaintenanceWorksheetCentralComputerForm;