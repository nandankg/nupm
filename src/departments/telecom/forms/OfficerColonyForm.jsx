import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const OfficerColonyForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const basicInitialValues = {
    date: "",
    station: "",
    residentName: "",
    employeeId: "",
    department: "Telecom",
    designation: "",
    quarterNumber: "",
    blockNumber: "",
    residenceType: "",
    contactNumber: "",
    emailAddress: "",
    emergencyContact: "",
    emergencyContactNumber: "",
    allotmentDate: "",
    occupancyStatus: "",
    familyMembers: "",
    vehicleDetails: "",
    maintenanceRequests: [
      {
        id: 1,
        category: "Electrical",
        description: "",
        priority: "medium",
        status: "pending",
        requestDate: "",
        completionDate: "",
        remarks: ""
      }
    ],
    utilityConnections: {
      electricity: {
        connected: "no",
        meterNumber: "",
        connectionDate: "",
        lastReading: "",
        remarks: ""
      },
      water: {
        connected: "no",
        connectionNumber: "",
        connectionDate: "",
        lastReading: "",
        remarks: ""
      },
      gas: {
        connected: "no",
        connectionNumber: "",
        connectionDate: "",
        remarks: ""
      },
      internet: {
        connected: "no",
        serviceProvider: "",
        connectionDate: "",
        planDetails: "",
        remarks: ""
      }
    },
    securityDetails: {
      gatePassIssued: "no",
      gatePassNumber: "",
      securityDeposit: "",
      keyStatus: "",
      accessCardNumber: "",
      parkingAllotted: "no",
      parkingSlotNumber: "",
      remarks: ""
    },
    maintenanceHistory: "",
    specialRequirements: "",
    colonyRules: "",
    complianceStatus: "",
    notes: "",
    supervisorName: "",
    supervisorId: "",
    supervisorDateTime: "",
    maintainerName: "",
    maintainerId: "",
    maintainerDateTime: "",
    employee_id: "",
    unit: ""
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUtilityChange = (utility, field, value) => {
    setFormValues({
      ...formValues,
      utilityConnections: {
        ...formValues.utilityConnections,
        [utility]: {
          ...formValues.utilityConnections[utility],
          [field]: value
        }
      }
    });
  };

  const handleSecurityChange = (field, value) => {
    setFormValues({
      ...formValues,
      securityDetails: {
        ...formValues.securityDetails,
        [field]: value
      }
    });
  };

  const handleMaintenanceRequestChange = (index, field, value) => {
    const updatedRequests = formValues.maintenanceRequests.map((request, i) => {
      if (i === index) {
        return { ...request, [field]: value };
      }
      return request;
    });
    setFormValues({ ...formValues, maintenanceRequests: updatedRequests });
  };

  const handleAddMaintenanceRequest = () => {
    const newRequest = {
      id: formValues.maintenanceRequests.length + 1,
      category: "",
      description: "",
      priority: "medium",
      status: "pending",
      requestDate: "",
      completionDate: "",
      remarks: ""
    };
    setFormValues({
      ...formValues,
      maintenanceRequests: [...formValues.maintenanceRequests, newRequest]
    });
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
    <TelecomFormLayout title="Officer Colony Management System" onSubmit={handleSubmit} loading={loading}>
      <div className="text-center mb-4 border-bottom pb-3">
        <h3 className="text-primary">OFFICER COLONY MANAGEMENT SYSTEM</h3>
        <h5 className="text-secondary">Residential Quarter Allocation & Maintenance Register</h5>
        <p className="text-muted">Complete Resident Management & Facility Tracking</p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField type="date" name="date" label="Registration Date" value={formValues.date} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField type="location-type" name="station" label="Station/Location" value={formValues.station} onChange={handleChange} required />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Resident Information</h5>
      <div className="row">
        <div className="col-md-4">
          <UniversalTelecomFormField type="text" name="residentName" label="Resident Name" value={formValues.residentName} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="employee-id" name="employeeId" label="Employee ID" value={formValues.employeeId} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="text" name="designation" label="Designation" value={formValues.designation} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="text" name="quarterNumber" label="Quarter Number" value={formValues.quarterNumber} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="text" name="blockNumber" label="Block Number" value={formValues.blockNumber} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="text" name="residenceType" label="Residence Type" value={formValues.residenceType} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="text" name="contactNumber" label="Contact Number" value={formValues.contactNumber} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="email" name="emailAddress" label="Email Address" value={formValues.emailAddress} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="date" name="allotmentDate" label="Allotment Date" value={formValues.allotmentDate} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="text" name="emergencyContact" label="Emergency Contact Name" value={formValues.emergencyContact} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="text" name="emergencyContactNumber" label="Emergency Contact Number" value={formValues.emergencyContactNumber} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <UniversalTelecomFormField type="text" name="occupancyStatus" label="Occupancy Status" value={formValues.occupancyStatus} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField type="textarea" name="familyMembers" label="Family Members Details" value={formValues.familyMembers} onChange={handleChange} rows={3} />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField type="textarea" name="vehicleDetails" label="Vehicle Details" value={formValues.vehicleDetails} onChange={handleChange} rows={3} />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Utility Connections</h5>
      {Object.keys(formValues.utilityConnections).map((utility) => (
        <div key={utility} className="border rounded p-3 mb-3 bg-light">
          <h6 className="text-secondary text-capitalize">{utility} Connection</h6>
          <div className="row">
            <div className="col-md-3">
              <UniversalTelecomFormField 
                type="checkbox" 
                name={`${utility}_connected`} 
                label="Connected" 
                value={formValues.utilityConnections[utility].connected === "yes"} 
                onChange={(e) => handleUtilityChange(utility, "connected", e.target.checked ? "yes" : "no")} 
              />
            </div>
            {utility === "electricity" && (
              <>
                <div className="col-md-3">
                  <UniversalTelecomFormField 
                    type="text" 
                    name={`${utility}_meterNumber`} 
                    label="Meter Number" 
                    value={formValues.utilityConnections[utility].meterNumber} 
                    onChange={(e) => handleUtilityChange(utility, "meterNumber", e.target.value)} 
                  />
                </div>
                <div className="col-md-3">
                  <UniversalTelecomFormField 
                    type="text" 
                    name={`${utility}_lastReading`} 
                    label="Last Reading" 
                    value={formValues.utilityConnections[utility].lastReading} 
                    onChange={(e) => handleUtilityChange(utility, "lastReading", e.target.value)} 
                  />
                </div>
              </>
            )}
            {utility === "water" && (
              <>
                <div className="col-md-3">
                  <UniversalTelecomFormField 
                    type="text" 
                    name={`${utility}_connectionNumber`} 
                    label="Connection Number" 
                    value={formValues.utilityConnections[utility].connectionNumber} 
                    onChange={(e) => handleUtilityChange(utility, "connectionNumber", e.target.value)} 
                  />
                </div>
                <div className="col-md-3">
                  <UniversalTelecomFormField 
                    type="text" 
                    name={`${utility}_lastReading`} 
                    label="Last Reading" 
                    value={formValues.utilityConnections[utility].lastReading} 
                    onChange={(e) => handleUtilityChange(utility, "lastReading", e.target.value)} 
                  />
                </div>
              </>
            )}
            {utility === "gas" && (
              <div className="col-md-3">
                <UniversalTelecomFormField 
                  type="text" 
                  name={`${utility}_connectionNumber`} 
                  label="Connection Number" 
                  value={formValues.utilityConnections[utility].connectionNumber} 
                  onChange={(e) => handleUtilityChange(utility, "connectionNumber", e.target.value)} 
                />
              </div>
            )}
            {utility === "internet" && (
              <>
                <div className="col-md-3">
                  <UniversalTelecomFormField 
                    type="text" 
                    name={`${utility}_serviceProvider`} 
                    label="Service Provider" 
                    value={formValues.utilityConnections[utility].serviceProvider} 
                    onChange={(e) => handleUtilityChange(utility, "serviceProvider", e.target.value)} 
                  />
                </div>
                <div className="col-md-3">
                  <UniversalTelecomFormField 
                    type="text" 
                    name={`${utility}_planDetails`} 
                    label="Plan Details" 
                    value={formValues.utilityConnections[utility].planDetails} 
                    onChange={(e) => handleUtilityChange(utility, "planDetails", e.target.value)} 
                  />
                </div>
              </>
            )}
            <div className="col-md-3">
              <UniversalTelecomFormField 
                type="date" 
                name={`${utility}_connectionDate`} 
                label="Connection Date" 
                value={formValues.utilityConnections[utility].connectionDate} 
                onChange={(e) => handleUtilityChange(utility, "connectionDate", e.target.value)} 
              />
            </div>
            <div className="col-md-12 mt-2">
              <UniversalTelecomFormField 
                type="textarea" 
                name={`${utility}_remarks`} 
                label="Remarks" 
                value={formValues.utilityConnections[utility].remarks} 
                onChange={(e) => handleUtilityChange(utility, "remarks", e.target.value)} 
                rows={2}
              />
            </div>
          </div>
        </div>
      ))}

      <h5 className="mt-4 text-primary border-bottom pb-2">Security & Access Details</h5>
      <div className="row">
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="checkbox" 
            name="gatePassIssued" 
            label="Gate Pass Issued" 
            value={formValues.securityDetails.gatePassIssued === "yes"} 
            onChange={(e) => handleSecurityChange("gatePassIssued", e.target.checked ? "yes" : "no")} 
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="text" 
            name="gatePassNumber" 
            label="Gate Pass Number" 
            value={formValues.securityDetails.gatePassNumber} 
            onChange={(e) => handleSecurityChange("gatePassNumber", e.target.value)} 
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="text" 
            name="securityDeposit" 
            label="Security Deposit" 
            value={formValues.securityDetails.securityDeposit} 
            onChange={(e) => handleSecurityChange("securityDeposit", e.target.value)} 
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="text" 
            name="keyStatus" 
            label="Key Status" 
            value={formValues.securityDetails.keyStatus} 
            onChange={(e) => handleSecurityChange("keyStatus", e.target.value)} 
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="text" 
            name="accessCardNumber" 
            label="Access Card Number" 
            value={formValues.securityDetails.accessCardNumber} 
            onChange={(e) => handleSecurityChange("accessCardNumber", e.target.value)} 
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="checkbox" 
            name="parkingAllotted" 
            label="Parking Allotted" 
            value={formValues.securityDetails.parkingAllotted === "yes"} 
            onChange={(e) => handleSecurityChange("parkingAllotted", e.target.checked ? "yes" : "no")} 
          />
        </div>
        <div className="col-md-3">
          <UniversalTelecomFormField 
            type="text" 
            name="parkingSlotNumber" 
            label="Parking Slot Number" 
            value={formValues.securityDetails.parkingSlotNumber} 
            onChange={(e) => handleSecurityChange("parkingSlotNumber", e.target.value)} 
          />
        </div>
        <div className="col-md-3">
        </div>
        <div className="col-md-12">
          <UniversalTelecomFormField 
            type="textarea" 
            name="securityRemarks" 
            label="Security Remarks" 
            value={formValues.securityDetails.remarks} 
            onChange={(e) => handleSecurityChange("remarks", e.target.value)} 
            rows={3}
          />
        </div>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Maintenance Requests</h5>
      {formValues.maintenanceRequests.map((request, index) => (
        <div key={request.id} className="border rounded p-3 mb-3 bg-light">
          <h6 className="text-secondary">Request #{index + 1}</h6>
          <div className="row">
            <div className="col-md-3">
              <UniversalTelecomFormField 
                type="text" 
                name={`maintenance_category_${index}`} 
                label="Category" 
                value={request.category} 
                onChange={(e) => handleMaintenanceRequestChange(index, "category", e.target.value)} 
              />
            </div>
            <div className="col-md-3">
              <UniversalTelecomFormField 
                type="text" 
                name={`maintenance_priority_${index}`} 
                label="Priority" 
                value={request.priority} 
                onChange={(e) => handleMaintenanceRequestChange(index, "priority", e.target.value)} 
              />
            </div>
            <div className="col-md-3">
              <UniversalTelecomFormField 
                type="text" 
                name={`maintenance_status_${index}`} 
                label="Status" 
                value={request.status} 
                onChange={(e) => handleMaintenanceRequestChange(index, "status", e.target.value)} 
              />
            </div>
            <div className="col-md-3">
              <UniversalTelecomFormField 
                type="date" 
                name={`maintenance_requestDate_${index}`} 
                label="Request Date" 
                value={request.requestDate} 
                onChange={(e) => handleMaintenanceRequestChange(index, "requestDate", e.target.value)} 
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField 
                type="textarea" 
                name={`maintenance_description_${index}`} 
                label="Description" 
                value={request.description} 
                onChange={(e) => handleMaintenanceRequestChange(index, "description", e.target.value)} 
                rows={3}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField 
                type="textarea" 
                name={`maintenance_remarks_${index}`} 
                label="Remarks" 
                value={request.remarks} 
                onChange={(e) => handleMaintenanceRequestChange(index, "remarks", e.target.value)} 
                rows={3}
              />
            </div>
            <div className="col-md-6">
              <UniversalTelecomFormField 
                type="date" 
                name={`maintenance_completionDate_${index}`} 
                label="Completion Date" 
                value={request.completionDate} 
                onChange={(e) => handleMaintenanceRequestChange(index, "completionDate", e.target.value)} 
              />
            </div>
          </div>
        </div>
      ))}
      
      <div className="mb-3">
        <button type="button" className="btn btn-secondary" onClick={handleAddMaintenanceRequest}>
          Add Maintenance Request
        </button>
      </div>

      <h5 className="mt-4 text-primary border-bottom pb-2">Additional Information</h5>
      <div className="row">
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="textarea" 
            name="maintenanceHistory" 
            label="Maintenance History" 
            value={formValues.maintenanceHistory} 
            onChange={handleChange} 
            rows={4}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="textarea" 
            name="specialRequirements" 
            label="Special Requirements" 
            value={formValues.specialRequirements} 
            onChange={handleChange} 
            rows={4}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="textarea" 
            name="colonyRules" 
            label="Colony Rules & Regulations Compliance" 
            value={formValues.colonyRules} 
            onChange={handleChange} 
            rows={4}
          />
        </div>
        <div className="col-md-6">
          <UniversalTelecomFormField 
            type="textarea" 
            name="complianceStatus" 
            label="Compliance Status" 
            value={formValues.complianceStatus} 
            onChange={handleChange} 
            rows={4}
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
        <div className="col-md-6">
          <div className="border rounded p-3 bg-light">
            <h6 className="text-secondary">Supervisor</h6>
            <UniversalTelecomFormField type="text" name="supervisorName" label="Name" value={formValues.supervisorName} onChange={handleChange} required />
            <UniversalTelecomFormField type="employee-id" name="supervisorId" label="Employee ID" value={formValues.supervisorId} onChange={handleChange} required />
            <UniversalTelecomFormField type="date-time" name="supervisorDateTime" label="Date & Time" value={formValues.supervisorDateTime} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="col-md-6">
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

export default OfficerColonyForm;