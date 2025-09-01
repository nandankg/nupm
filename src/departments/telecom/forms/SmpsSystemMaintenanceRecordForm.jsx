import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const SmpsSystemMaintenanceRecordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    station: "",
    month: "",
    additionalData: {
      averageTemp: "",
      chargingCurrentAfterLoadTest: "",
      batteryTerminalsCleaned: "",
      looseConnectionChecked: "",
      cellLeakageChecked: "",
      loadDuringTestSMPS1: {
        U: "",
        V: "",
        W: "",
      },
      loadDuringTestSMPS2: {
        U: "",
        V: "",
        W: "",
      },
      batteryVoltageBeforeLoadTest: "",
      batteryVoltageAfterLoadTest: "",
      batteryChargePercentage: "",
      inputVoltageRange: "",
      outputVoltageStability: "",
      rippleVoltage: "",
      efficiency: "",
      powerFactor: "",
      harmonicDistortion: "",
      thermalPerformance: "",
      fanOperation: "",
      alarmFunctionality: "",
      displayReadings: "",
    },
    systemChecks: [
      {
        id: 1,
        category: "Power Input Systems",
        activities: [
          { id: 1, label: "Input voltage monitoring and stability check", checked: "no", remark: "" },
          { id: 2, label: "Input current measurement and harmonic analysis", checked: "no", remark: "" },
          { id: 3, label: "Power factor correction verification", checked: "no", remark: "" },
          { id: 4, label: "Input filter and surge protection testing", checked: "no", remark: "" }
        ]
      },
      {
        id: 2,
        category: "Power Conversion & Output",
        activities: [
          { id: 1, label: "Output voltage regulation and stability testing", checked: "no", remark: "" },
          { id: 2, label: "Load regulation under varying conditions", checked: "no", remark: "" },
          { id: 3, label: "Ripple and noise measurement", checked: "no", remark: "" },
          { id: 4, label: "Efficiency calculation and verification", checked: "no", remark: "" }
        ]
      },
      {
        id: 3,
        category: "Battery Management System",
        activities: [
          { id: 1, label: "Battery charging profile verification", checked: "no", remark: "" },
          { id: 2, label: "Float voltage and equalize charge testing", checked: "no", remark: "" },
          { id: 3, label: "Temperature compensation functionality", checked: "no", remark: "" },
          { id: 4, label: "Battery health monitoring and reporting", checked: "no", remark: "" }
        ]
      },
      {
        id: 4,
        category: "Protection & Safety Systems",
        activities: [
          { id: 1, label: "Over-voltage and under-voltage protection testing", checked: "no", remark: "" },
          { id: 2, label: "Over-current and short circuit protection", checked: "no", remark: "" },
          { id: 3, label: "Thermal protection and cooling system check", checked: "no", remark: "" },
          { id: 4, label: "Earth fault and insulation resistance testing", checked: "no", remark: "" }
        ]
      }
    ],
    rows: [
      {
        cellNo: Array.from({ length: 24 }, (_, i) => (i + 1).toString()),
        onFloatVoltage: Array.from({ length: 24 }, () => ""),
        initialReadingOnLoad: Array.from({ length: 24 }, () => ""),
        after1Point5Hours: Array.from({ length: 24 }, () => ""),
      },
    ],
    maintenanceActions: "",
    systemPerformance: "",
    recommendations: "",
    nextMaintenanceDate: "",
    notes: "",
    technicalOfficerName: "",
    technicalOfficerId: "",
    technicalOfficerDateTime: "",
    supervisorName: "",
    supervisorId: "",
    supervisorDateTime: "",
    maintainerName: "",
    maintainerId: "",
    maintainerDateTime: "",
    employee_id: "",
    department: "Telecom"
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAdditionalDataChange = (name, value) => {
    setFormValues({
      ...formValues,
      additionalData: {
        ...formValues.additionalData,
        [name]: value,
      },
    });
  };

  const handleNestedDataChange = (parent, key, value) => {
    setFormValues({
      ...formValues,
      additionalData: {
        ...formValues.additionalData,
        [parent]: {
          ...formValues.additionalData[parent],
          [key]: value,
        },
      },
    });
  };

  const handleRowChange = (rowIndex, field, colIndex, value) => {
    const updatedRows = [...formValues.rows];
    updatedRows[rowIndex][field][colIndex] = value;
    setFormValues({ ...formValues, rows: updatedRows });
  };

  const handleAddRow = () => {
    setFormValues({
      ...formValues,
      rows: [
        ...formValues.rows,
        {
          cellNo: Array.from({ length: 24 }, (_, i) => (i + 1 + 24 * formValues.rows.length).toString()),
          onFloatVoltage: Array.from({ length: 24 }, () => ""),
          initialReadingOnLoad: Array.from({ length: 24 }, () => ""),
          after1Point5Hours: Array.from({ length: 24 }, () => ""),
        },
      ],
    });
  };

  const handleSystemCheck = (categoryId, activityId, checked) => {
    const updatedChecks = formValues.systemChecks.map((category) => {
      if (category.id === categoryId) {
        const updatedActivities = category.activities.map((activity) => {
          if (activity.id === activityId) {
            return { ...activity, checked: checked ? "yes" : "no" };
          }
          return activity;
        });
        return { ...category, activities: updatedActivities };
      }
      return category;
    });
    setFormValues({ ...formValues, systemChecks: updatedChecks });
  };

  const handleSystemRemark = (categoryId, activityId, remark) => {
    const updatedChecks = formValues.systemChecks.map((category) => {
      if (category.id === categoryId) {
        const updatedActivities = category.activities.map((activity) => {
          if (activity.id === activityId) {
            return { ...activity, remark };
          }
          return activity;
        });
        return { ...category, activities: updatedActivities };
      }
      return category;
    });
    setFormValues({ ...formValues, systemChecks: updatedChecks });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      navigate("/list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TelecomFormLayout title="SMPS System Maintenance Record" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4 border-bottom pb-3">
        <h3 className="text-primary">SMPS SYSTEM MAINTENANCE RECORD</h3>
        <h5 className="text-secondary">Switched Mode Power Supply Maintenance & Testing</h5>
        <p className="text-muted">Complete System Performance Analysis & Battery Management</p>
      </div>

      <div className="row">
        <div className="col-md-4">
          <UniversalTelecomFormField type="date" name="date" label="Maintenance Date" value={formValues.date} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="location-type" name="station" label="Station" value={formValues.station} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="text" name="month" label="Month" value={formValues.month} onChange={handleChange} required />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">System Performance Parameters</h5>
      <div className="row">
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="temperature-reading"
            name="averageTemp"
            label="Average Temperature"
            value={formValues.additionalData.averageTemp}
            onChange={(e) => handleAdditionalDataChange("averageTemp", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="technical-parameter"
            name="chargingCurrentAfterLoadTest"
            label="Charging Current After Load Test"
            value={formValues.additionalData.chargingCurrentAfterLoadTest}
            onChange={(e) => handleAdditionalDataChange("chargingCurrentAfterLoadTest", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="voltage-reading"
            name="inputVoltageRange"
            label="Input Voltage Range"
            value={formValues.additionalData.inputVoltageRange}
            onChange={(e) => handleAdditionalDataChange("inputVoltageRange", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="voltage-reading"
            name="outputVoltageStability"
            label="Output Voltage Stability"
            value={formValues.additionalData.outputVoltageStability}
            onChange={(e) => handleAdditionalDataChange("outputVoltageStability", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="technical-parameter"
            name="rippleVoltage"
            label="Ripple Voltage"
            value={formValues.additionalData.rippleVoltage}
            onChange={(e) => handleAdditionalDataChange("rippleVoltage", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="technical-parameter"
            name="efficiency"
            label="System Efficiency (%)"
            value={formValues.additionalData.efficiency}
            onChange={(e) => handleAdditionalDataChange("efficiency", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="technical-parameter"
            name="powerFactor"
            label="Power Factor"
            value={formValues.additionalData.powerFactor}
            onChange={(e) => handleAdditionalDataChange("powerFactor", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="technical-parameter"
            name="harmonicDistortion"
            label="Harmonic Distortion (%)"
            value={formValues.additionalData.harmonicDistortion}
            onChange={(e) => handleAdditionalDataChange("harmonicDistortion", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="text"
            name="thermalPerformance"
            label="Thermal Performance"
            value={formValues.additionalData.thermalPerformance}
            onChange={(e) => handleAdditionalDataChange("thermalPerformance", e.target.value)}
          />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Load Testing - SMPS1</h5>
      <div className="row">
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="technical-parameter"
            name="U"
            label="U Phase"
            value={formValues.additionalData.loadDuringTestSMPS1.U}
            onChange={(e) => handleNestedDataChange("loadDuringTestSMPS1", "U", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="technical-parameter"
            name="V"
            label="V Phase"
            value={formValues.additionalData.loadDuringTestSMPS1.V}
            onChange={(e) => handleNestedDataChange("loadDuringTestSMPS1", "V", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="technical-parameter"
            name="W"
            label="W Phase"
            value={formValues.additionalData.loadDuringTestSMPS1.W}
            onChange={(e) => handleNestedDataChange("loadDuringTestSMPS1", "W", e.target.value)}
          />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Load Testing - SMPS2</h5>
      <div className="row">
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="technical-parameter"
            name="U"
            label="U Phase"
            value={formValues.additionalData.loadDuringTestSMPS2.U}
            onChange={(e) => handleNestedDataChange("loadDuringTestSMPS2", "U", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="technical-parameter"
            name="V"
            label="V Phase"
            value={formValues.additionalData.loadDuringTestSMPS2.V}
            onChange={(e) => handleNestedDataChange("loadDuringTestSMPS2", "V", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="technical-parameter"
            name="W"
            label="W Phase"
            value={formValues.additionalData.loadDuringTestSMPS2.W}
            onChange={(e) => handleNestedDataChange("loadDuringTestSMPS2", "W", e.target.value)}
          />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Battery System Information</h5>
      <div className="row">
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="voltage-reading"
            name="batteryVoltageBeforeLoadTest"
            label="Battery Voltage Before Load Test"
            value={formValues.additionalData.batteryVoltageBeforeLoadTest}
            onChange={(e) => handleAdditionalDataChange("batteryVoltageBeforeLoadTest", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="voltage-reading"
            name="batteryVoltageAfterLoadTest"
            label="Battery Voltage After Load Test"
            value={formValues.additionalData.batteryVoltageAfterLoadTest}
            onChange={(e) => handleAdditionalDataChange("batteryVoltageAfterLoadTest", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="technical-parameter"
            name="batteryChargePercentage"
            label="Battery Charge %"
            value={formValues.additionalData.batteryChargePercentage}
            onChange={(e) => handleAdditionalDataChange("batteryChargePercentage", e.target.value)}
          />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">System Status Checks</h5>
      <div className="row">
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="text"
            name="batteryTerminalsCleaned"
            label="Battery Terminals Cleaned"
            value={formValues.additionalData.batteryTerminalsCleaned}
            onChange={(e) => handleAdditionalDataChange("batteryTerminalsCleaned", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="text"
            name="looseConnectionChecked"
            label="Loose Connection Checked"
            value={formValues.additionalData.looseConnectionChecked}
            onChange={(e) => handleAdditionalDataChange("looseConnectionChecked", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="text"
            name="cellLeakageChecked"
            label="Cell Leakage Checked"
            value={formValues.additionalData.cellLeakageChecked}
            onChange={(e) => handleAdditionalDataChange("cellLeakageChecked", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="text"
            name="fanOperation"
            label="Fan Operation Status"
            value={formValues.additionalData.fanOperation}
            onChange={(e) => handleAdditionalDataChange("fanOperation", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="text"
            name="alarmFunctionality"
            label="Alarm Functionality"
            value={formValues.additionalData.alarmFunctionality}
            onChange={(e) => handleAdditionalDataChange("alarmFunctionality", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField
            type="text"
            name="displayReadings"
            label="Display Readings"
            value={formValues.additionalData.displayReadings}
            onChange={(e) => handleAdditionalDataChange("displayReadings", e.target.value)}
          />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Detailed System Checks</h5>
      {formValues.systemChecks.map((category) => (
        <div key={category.id} className="system-category mb-4 border rounded p-3 bg-light">
          <h6 className="text-secondary mb-3">{category.category}</h6>
          {category.activities.map((activity) => (
            <div key={activity.id} className="activity-row mb-3 p-2 border rounded bg-white">
              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex align-items-center">
                    <UniversalTelecomFormField
                      type="checkbox"
                      name={`activity_${category.id}_${activity.id}`}
                      label={activity.label}
                      value={activity.checked === "yes"}
                      onChange={(e) => handleSystemCheck(category.id, activity.id, e.target.checked)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <UniversalTelecomFormField
                    type="text"
                    name={`remark_${category.id}_${activity.id}`}
                    label="Remark"
                    value={activity.remark}
                    onChange={(e) => handleSystemRemark(category.id, activity.id, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <h5 className="mt-4 text-primary border-bottom pb-2">Battery Cell Voltage Readings (24 Cells)</h5>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Row Type</th>
              {Array.from({ length: 24 }, (_, i) => (
                <th key={i + 1}>Cell {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formValues.rows.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <tr>
                  <td>ON FLOAT (VOLTAGE)</td>
                  {row.onFloatVoltage.map((value, colIndex) => (
                    <td key={colIndex}>
                      <UniversalTelecomFormField
                        type="voltage-reading"
                        name={`onFloat_${rowIndex}_${colIndex}`}
                        value={value}
                        onChange={(e) =>
                          handleRowChange(rowIndex, "onFloatVoltage", colIndex, e.target.value)
                        }
                        placeholder={`${colIndex + 1 + 24 * rowIndex}`}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>INITIAL READING (ON LOAD)</td>
                  {row.initialReadingOnLoad.map((value, colIndex) => (
                    <td key={colIndex}>
                      <UniversalTelecomFormField
                        type="voltage-reading"
                        name={`initialReading_${rowIndex}_${colIndex}`}
                        value={value}
                        onChange={(e) =>
                          handleRowChange(rowIndex, "initialReadingOnLoad", colIndex, e.target.value)
                        }
                        placeholder={`${colIndex + 1 + 24 * rowIndex}`}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>AFTER 1.5 HRS (ON LOAD)</td>
                  {row.after1Point5Hours.map((value, colIndex) => (
                    <td key={colIndex}>
                      <UniversalTelecomFormField
                        type="voltage-reading"
                        name={`after1Point5_${rowIndex}_${colIndex}`}
                        value={value}
                        onChange={(e) =>
                          handleRowChange(rowIndex, "after1Point5Hours", colIndex, e.target.value)
                        }
                        placeholder={`${colIndex + 1 + 24 * rowIndex}`}
                      />
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-3">
        <button type="button" className="btn btn-secondary" onClick={handleAddRow}>
          Add Battery Row (Next 24 Cells)
        </button>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Maintenance Summary</h5>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="textarea"
            name="maintenanceActions"
            label="Maintenance Actions Performed"
            value={formValues.maintenanceActions}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="textarea"
            name="systemPerformance"
            label="System Performance Assessment"
            value={formValues.systemPerformance}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="textarea"
            name="recommendations"
            label="Recommendations"
            value={formValues.recommendations}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField
            type="date"
            name="nextMaintenanceDate"
            label="Next Maintenance Date"
            value={formValues.nextMaintenanceDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12">
          <UniversalTelecomFormField
            type="textarea"
            name="notes"
            label="Additional Notes"
            value={formValues.notes}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>

      <h6 className="mt-5 text-primary border-bottom pb-2">Authorization</h6>
      <div className="row">
        <div className="col-md-4">
          <div className="border rounded p-3 bg-light">
            <h6 className="text-secondary">Technical Officer</h6>
            <UniversalTelecomFormField type="text" name="technicalOfficerName" label="Name" value={formValues.technicalOfficerName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="technicalOfficerId" label="Employee ID" value={formValues.technicalOfficerId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="technicalOfficerDateTime" label="Date & Time" value={formValues.technicalOfficerDateTime} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="border rounded p-3 bg-light">
            <h6 className="text-secondary">Supervisor</h6>
            <UniversalTelecomFormField type="text" name="supervisorName" label="Name" value={formValues.supervisorName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="supervisorId" label="Employee ID" value={formValues.supervisorId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="supervisorDateTime" label="Date & Time" value={formValues.supervisorDateTime} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="border rounded p-3 bg-light">
            <h6 className="text-secondary">Maintainer</h6>
            <UniversalTelecomFormField type="text" name="maintainerName" label="Name" value={formValues.maintainerName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="maintainerId" label="Employee ID" value={formValues.maintainerId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="maintainerDateTime" label="Date & Time" value={formValues.maintainerDateTime} onChange={handleChange} required />
          </div>
        </div>
      </div>
    </TelecomFormLayout>
  );
};

export default SmpsSystemMaintenanceRecordForm;