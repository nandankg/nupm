import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addData,
  updateData,
  removeData,
} from "../../redux/signalling/pmLogbookHalfYearlyOtherMainlineSlice";
import { formatDate } from "../../utils/dateHelper";
import { 
  FormContainer, 
  FormSection, 
  FormRow, 
  FormField, 
  SectionHeader,
  SignatureSection,
  SelectField,
  DateField,
  MonthField,
  TextInput,
  CheckboxGroup,
  RemarkField,
  ActionField,
  DeficiencyField
} from "../../../components/signalling/UniversalSignallingComponents";

const PmLogbookHalfYearlyOtherMainlineForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentEntry, entries, loading } = useSelector(
    (state) => state.pmLogbookHalfYearlyOtherMainline
  );

  const initialFormState = {
    stn_name: "",
    date: formatDate(new Date()),
    month: new Date().getMonth(),
    activities1: Array(8).fill({
      SC1: "No",
      SC2: "No",
      SC3: "No",
      SC4: "No",
      SC5: "No",
      SC6: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),
    activities2: Array(9).fill({
      avm1: "No",
      avm2: "No",
      avm3: "No",
      avm4: "No",
      avm5: "No",
      avm6: "No",
      remarkavm: "",
      actionavm: "",
      deficiencyavm: "",
    }),
    activities3: Array(8).fill({
      swt1: "No",
      swt2: "No",
      swt3: "No",
      swt4: "No",
      swt5: "No",
      swt6: "No",
      remarkswt: "",
      actionswt: "",
      deficiencyswt: "",
    }),
    staff1_name: "--",
    staff1_desg: "--",
    staff1_sign: "--",
    staff2_name: "--",
    staff2_desg: "--",
    staff2_sign: "--",
    staff3_name: "--",
    staff3_desg: "--",
    staff3_sign: "--",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (currentEntry) {
      setFormData(currentEntry);
    }
  }, [currentEntry]);

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

  const handleCheckboxChange = (field, index, subField) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, idx) => 
        idx === index 
          ? { ...item, [subField]: item[subField] === "No" ? "Yes" : "No" }
          : item
      )
    }));
  };

  const handleSelectAllChange = (field, index, checkboxFields, isChecked) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, idx) => {
        if (idx === index) {
          const updatedItem = { ...item };
          checkboxFields.forEach(checkboxField => {
            updatedItem[checkboxField] = isChecked ? "Yes" : "No";
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
    navigate("/signalling/pm-logbook-half-yearly-other-mainline/list");
  };

  const handleReset = () => {
    setFormData(initialFormState);
  };

  const handleDelete = () => {
    if (currentEntry && window.confirm("Are you sure you want to delete this entry?")) {
      dispatch(removeData(currentEntry.id));
      navigate("/signalling/pm-logbook-half-yearly-other-mainline/list");
    }
  };

  const scActivities = [
    "Check Fixing & Alignment of all modules of SC",
    "Checking of all Cable connection and dressing",
    "Check Date and Time",
    "Cleaning of SC Server (interior & exterior)",
    "Cleaning and checking of sub modules of SC ( Printer, Keyboard and Mouse etc)",
    "Cleaning of SC HDD and check their proper fitment",
    "Test different modes in device manager by applying and releasing on equipments",
    "Check working of redundant power supply of SC server",
  ];

  const avmActivities = [
    "Check the serviceability of AVM",
    "Checking of all Cable connection and dressing ",
    "Check Date and Time",
    "Check Station ID",
    "Check Device ID",
    "Check Lubrication of all locks with silicone oil",
    "Card Reader Test",
    "Passenger Information Display (PID) Test",
    "Check LAN Status (Ping Server)",
  ];

  const swtActivities = [
    "Check Fixing & Alignment of all modules of Switch Rack",
    "Checking of all Cable connection and dressing ",
    "Check internal fan status of Switches",
    "Cleaning of Switch Rack and its fan",
    "Internal cleaning of L3 switch",
    "External cleaning of Switch",
    "Test of redundant link",
    "Check if Switches are working normal and all equipments are on LAN",
  ];

  const renderActivitySection = (activities, field, checkboxPrefix, remarkField, actionField, deficiencyField, sectionTitle) => {
    const checkboxFields = Array.from({ length: 6 }, (_, i) => `${checkboxPrefix}${i + 1}`);
    
    return (
      <FormSection key={field}>
        <SectionHeader title={sectionTitle} />
        
        <FormRow>
          <div className="col-md-4">
            <strong>Description</strong>
          </div>
          <div className="col-md-6 text-center">
            <strong>{sectionTitle}</strong>
          </div>
          <div className="col-md-2">
            <strong>Actions</strong>
          </div>
        </FormRow>

        {activities.map((activity, index) => {
          const isAllSelected = checkboxFields.every(
            field => formData[field][index][field] === "Yes"
          );

          return (
            <FormRow key={index}>
              <div className="col-md-4">
                <label className="form-label">{activity}</label>
              </div>
              
              <div className="col-md-1">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`selectAll_${field}_${index}`}
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAllChange(field, index, checkboxFields, e.target.checked)}
                  />
                  <label className="form-check-label small" htmlFor={`selectAll_${field}_${index}`}>
                    {isAllSelected ? "Uncheck All" : "Check All"}
                  </label>
                </div>
              </div>

              <div className="col-md-3">
                <CheckboxGroup
                  fields={checkboxFields}
                  values={formData[field][index]}
                  onChange={(checkboxField) => handleCheckboxChange(field, index, checkboxField)}
                  inline
                />
              </div>

              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-4">
                    <RemarkField
                      value={formData[field][index][remarkField]}
                      onChange={(value) => handleInputChange(field, value, index, remarkField)}
                      placeholder="Remark"
                    />
                  </div>
                  <div className="col-md-4">
                    <ActionField
                      value={formData[field][index][actionField]}
                      onChange={(value) => handleInputChange(field, value, index, actionField)}
                      placeholder="Action Taken"
                    />
                  </div>
                  <div className="col-md-4">
                    <DeficiencyField
                      value={formData[field][index][deficiencyField]}
                      onChange={(value) => handleInputChange(field, value, index, deficiencyField)}
                      placeholder="Deficiency"
                    />
                  </div>
                </div>
              </div>
            </FormRow>
          );
        })}
      </FormSection>
    );
  };

  return (
    <FormContainer
      title="AFC Preventive Maintenance-OTHERS(Half Yearly) (ANNEXURE-B)"
      onSubmit={handleSubmit}
      loading={loading}
    >
      <FormSection>
        <FormRow>
          <FormField md={4}>
            <SelectField
              label="Station"
              value={formData.stn_name}
              onChange={(value) => handleInputChange("stn_name", value)}
              required
            />
          </FormField>
          
          <FormField md={4}>
            <DateField
              label="Date"
              value={formData.date}
              onChange={(value) => handleInputChange("date", value)}
            />
          </FormField>
          
          <FormField md={4}>
            <MonthField
              label="Month"
              value={formData.month}
              onChange={(value) => handleInputChange("month", value)}
            />
          </FormField>
        </FormRow>
      </FormSection>

      {renderActivitySection(
        scActivities, 
        "activities1", 
        "SC", 
        "remark", 
        "action", 
        "deficiency", 
        "Station Computer (SC)"
      )}

      {renderActivitySection(
        avmActivities, 
        "activities2", 
        "avm", 
        "remarkavm", 
        "actionavm", 
        "deficiencyavm", 
        "Automatic Vending Machine (AVM)"
      )}

      {renderActivitySection(
        swtActivities, 
        "activities3", 
        "swt", 
        "remarkswt", 
        "actionswt", 
        "deficiencyswt", 
        "Switch"
      )}

      <SignatureSection
        staff={[
          {
            name: formData.staff1_name,
            designation: formData.staff1_desg,
            signature: formData.staff1_sign,
            onNameChange: (value) => handleInputChange("staff1_name", value),
            onDesignationChange: (value) => handleInputChange("staff1_desg", value),
            onSignatureChange: (value) => handleInputChange("staff1_sign", value),
          },
          {
            name: formData.staff2_name,
            designation: formData.staff2_desg,
            signature: formData.staff2_sign,
            onNameChange: (value) => handleInputChange("staff2_name", value),
            onDesignationChange: (value) => handleInputChange("staff2_desg", value),
            onSignatureChange: (value) => handleInputChange("staff2_sign", value),
          },
          {
            name: formData.staff3_name,
            designation: formData.staff3_desg,
            signature: formData.staff3_sign,
            onNameChange: (value) => handleInputChange("staff3_name", value),
            onDesignationChange: (value) => handleInputChange("staff3_desg", value),
            onSignatureChange: (value) => handleInputChange("staff3_sign", value),
          },
        ]}
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

export default PmLogbookHalfYearlyOtherMainlineForm;