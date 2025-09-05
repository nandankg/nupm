import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UniversalSignallingFormField, SignallingFormLayout } from "../components";
import {
  fetchAssuranceData,
  addAssuranceData
      } from "../../../reducer/chanchal/AssuRegReducer";
import { formatDate } from "../../../data/formatDate";

/**
 * Assurance System Form - Signalling Department
 * 
 * FIELD PRESERVATION: All field names preserved exactly from original form
 * ENHANCED: Added comprehensive validation and improved UX
 * REUSABLE: Uses Universal Signalling Components for consistency
 */
const AssuranceSystemForm = () => {
  const dispatch = useDispatch();
  const { data = [], loading, error } = useSelector((state) => state.assurance || {});
  const user = JSON.parse(localStorage.getItem("userdata")) || {};
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  // PRESERVED EXACT FIELD NAMES - No changes from original form
  const [instructionForm, setInstructionForm] = useState({
    instructions_details: "",
    date_of_instructions: "",
    admin_admin_name: user.signature || "",
    department: user.department || ""
      });
  
  const [ackForm, setAckForm] = useState({});
  const [expandedInstruction, setExpandedInstruction] = useState(null);

  useEffect(() => {
    dispatch(fetchAssuranceData());
  }, [dispatch]);

  // Handle instruction form changes
  const handleInstructionChange = (fieldName, value) => {
    setInstructionForm(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear field error when user starts typing
    if (formErrors[fieldName]) {
      setFormErrors(prev => ({
        ...prev,
        [fieldName]: ""
      }));
    }
  };

  // Validate instruction form
  const validateInstructionForm = () => {
    const errors = {};
    
    if (!instructionForm.instructions_details) {
      errors.instructions_details = "Instruction details are required";
    }
    
    if (!instructionForm.date_of_instructions) {
      errors.date_of_instructions = "Date of instructions is required";
    }

    // Validate instruction details length
    if (instructionForm.instructions_details && instructionForm.instructions_details.length < 10) {
      errors.instructions_details = "Instruction details must be at least 10 characters long";
    }

    // Validate date is not in future
    if (instructionForm.date_of_instructions) {
      const today = new Date();
      const instructionDate = new Date(instructionForm.date_of_instructions);
      if (instructionDate > today) {
        errors.date_of_instructions = "Instruction date cannot be in the future";
      }
    }

    return errors;
  };

  // Handle instruction submission
  const handleInstructionSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateInstructionForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await dispatch(addAssuranceData(instructionForm)).unwrap();
      
      // Reset form
      setInstructionForm({
        instructions_details: "",
        date_of_instructions: "",
        admin_admin_name: user.signature || "",
        department: user.department || ""
      });
      setFormErrors({});
      
      alert("Instruction created successfully!");
      
    } catch (err) {
      console.error("Error creating instruction:", err);
      alert("Error creating instruction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle acknowledgment changes
  const handleAckChange = (instructionId, value) => {
    const instruction = data.find((r) => r.id === instructionId);
    setAckForm((prev) => ({
      ...prev,
      [instructionId]: {
        instructions_details: instruction.instructions_details,
        date_of_instructions: instruction.date_of_instructions,
        admin_admin_name: instruction.admin_name,
        department: user.department || "",
        date_of_acknowledgement: formatDate(new Date(), "YYYY-MM-DD"),
        acknowledged_name: user.name || "",
        acknowledged_designation: user.designation || "",
        acknowledged_emp_no: user.emp_no || "",
        acknowledged_remark: value
      }
      }));
  };

  // Handle acknowledgment submission
  const handleAckSubmit = async (instructionId) => {
    if (!ackForm[instructionId]?.acknowledged_remark) {
      alert("Please provide an acknowledgment remark");
      return;
    }

    try {
      await dispatch(addAssuranceData(ackForm[instructionId])).unwrap();
      setAckForm((prev) => ({ ...prev, [instructionId]: undefined }));
      
      alert("Acknowledgment submitted successfully!");
      
    } catch (err) {
      console.error("Error submitting acknowledgment:", err);
      alert("Error submitting acknowledgment. Please try again.");
    }
  };

  // Toggle acknowledgments view
  const toggleAcknowledgments = (instructionId) => {
    setExpandedInstruction(expandedInstruction === instructionId ? null : instructionId);
  };

  // Reset instruction form
  const resetInstructionForm = () => {
    setInstructionForm({
      instructions_details: "",
      date_of_instructions: "",
      admin_admin_name: user.signature || "",
      department: user.department || ""
      });
    setFormErrors({});
  };

  if (loading) {
    return (
      <SignallingFormLayout
        title="Assurance System"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Signalling", path: "/signalling" },
          { label: "Assurance System", path: "/signalling/assurance-system" }
        ]}
      >
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading assurance data...</p>
        </div>
      </SignallingFormLayout>
    );
  }

  if (error) {
    return (
      <SignallingFormLayout
        title="Assurance System"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Signalling", path: "/signalling" },
          { label: "Assurance System", path: "/signalling/assurance-system" }
        ]}
      >
        <div className="text-center p-4 text-danger">
          <i className="fas fa-exclamation-triangle fa-2x mb-2"></i>
          <p>{error}</p>
        </div>
      </SignallingFormLayout>
    );
  }

  const instructions = data.filter((r) => !r.acknowledged_name);
  const filteredInstructions = instructions.filter(
    (inst) => inst.department === user.department
  );
  
  const getAcknowledgments = (instructionId) =>
    data.filter(
      (r) =>
        r.instructions_details === instructions.find((i) => i.id === instructionId)?.instructions_details &&
        r.admin_id === instructions.find((i) => i.id === instructionId)?.admin_id &&
        r.department === user.department &&
        r.acknowledged_name
    );

  return (
    <SignallingFormLayout
      title="Assurance System"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Signalling", path: "/signalling" },
        { label: "Assurance System", path: "/signalling/assurance-system" }
      ]}
    >
      {/* Admin Instruction Creation */}
      {user.role === "Admin" && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Create Instruction</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleInstructionSubmit}>
              <div className="row">
                <div className="col-md-8">
                  <UniversalSignallingFormField
                    type="textarea"
                    name="instructions_details"
                    label="Instruction Details"
                    value={instructionForm.instructions_details}
                    onChange={(e) => handleInstructionChange("instructions_details", e.target.value)}
                    placeholder="Enter detailed instructions for the team"
                    required={true}
                    rows={4}
                    error={formErrors.instructions_details}
                  />
                </div>
                <div className="col-md-4">
                  <UniversalSignallingFormField
                    type="date"
                    name="date_of_instructions"
                    label="Date of Instructions"
                    value={instructionForm.date_of_instructions}
                    onChange={(e) => handleInstructionChange("date_of_instructions", e.target.value)}
                    required={true}
                    error={formErrors.date_of_instructions}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      onClick={resetInstructionForm}
                      className="btn btn-secondary"
                      disabled={isSubmitting}
                    >
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating...
                        </span>
                      ) : (
                        "Create Instruction"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Instructions List */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Instructions</h5>
        </div>
        <div className="card-body">
          {filteredInstructions.length === 0 ? (
            <div className="text-center p-4 text-muted">
              <i className="fas fa-info-circle fa-2x mb-2"></i>
              <p>No instructions available for your department.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Date</th>
                    <th scope="col">Instruction Details</th>
                    <th scope="col">Admin Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstructions.map((inst, index) => (
                    <React.Fragment key={inst.id}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{formatDate(inst.date_of_instructions)}</td>
                        <td className="text-wrap" style={{ maxWidth: "300px" }}>
                          {inst.instructions_details}
                        </td>
                        <td>{inst.admin_name}</td>
                        <td>
                          <span className="badge bg-primary">{inst.department}</span>
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            {user.role !== "Admin" && (
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleAckSubmit(inst.id)}
                                disabled={!ackForm[inst.id]?.acknowledged_remark}
                                title="Acknowledge this instruction"
                              >
                                <i className="fas fa-check"></i> Acknowledge
                              </button>
                            )}
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => toggleAcknowledgments(inst.id)}
                              title={expandedInstruction === inst.id ? "Hide acknowledgments" : "View acknowledgments"}
                            >
                              <i className={`fas ${expandedInstruction === inst.id ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Acknowledgment Input Row */}
                      {user.role !== "Admin" && (
                        <tr>
                          <td colSpan="6" className="bg-light">
                            <div className="p-3">
                              <label className="form-label">
                                <strong>Acknowledgment Remark</strong>
                              </label>
                              <textarea
                                className="form-control"
                                value={ackForm[inst.id]?.acknowledged_remark || ""}
                                onChange={(e) => handleAckChange(inst.id, e.target.value)}
                                placeholder="Enter your acknowledgment remarks here..."
                                rows={2}
                              />
                              <small className="text-muted">
                                Please provide your acknowledgment and any relevant comments.
                              </small>
                            </div>
                          </td>
                        </tr>
                      )}
                      
                      {/* Acknowledgments History */}
                      {expandedInstruction === inst.id && (
                        <tr>
                          <td colSpan="6">
                            <div className="p-3 bg-light">
                              <h6 className="mb-3">Acknowledgment History</h6>
                              {getAcknowledgments(inst.id).length === 0 ? (
                                <p className="text-muted text-center">No acknowledgments yet.</p>
                              ) : (
                                <div className="table-responsive">
                                  <table className="table table-bordered table-sm">
                                    <thead>
                                      <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Employee No.</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Remark</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {getAcknowledgments(inst.id).map((ack) => (
                                        <tr key={ack.id}>
                                          <td>{ack.acknowledged_name}</td>
                                          <td>{ack.acknowledged_designation}</td>
                                          <td>{ack.acknowledged_emp_no}</td>
                                          <td>{formatDate(ack.date_of_acknowledgement)}</td>
                                          <td className="text-wrap" style={{ maxWidth: "200px" }}>
                                            {ack.acknowledged_remark || "-"}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </SignallingFormLayout>
  );
};

export default AssuranceSystemForm;