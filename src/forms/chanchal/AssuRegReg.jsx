import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAssuranceData,
  addAssuranceData,
} from "../../reducer/chanchal/AssuRegReducer";
import { formatDate } from "../../data/formatDate";


const AssuranceSystem = () => {
  const dispatch = useDispatch();
  const { data = [], loading, error } = useSelector((state) => state.assurance || {});
  const user = JSON.parse(localStorage.getItem("userdata")) || {};
  const [instructionForm, setInstructionForm] = useState({
    instructions_details: "",
    date_of_instructions: "",
    admin_id: user.employeeid || "",
    admin_name: user.signature || "",
    department: user.department || "",
  });
  const [ackForm, setAckForm] = useState({});
  const [expandedInstruction, setExpandedInstruction] = useState(null);

  useEffect(() => {
    dispatch(fetchAssuranceData());
  }, [dispatch]);

  const handleInstructionChange = (e) => {
    const { name, value } = e.target;
    setInstructionForm({ ...instructionForm, [name]: value });
  };

  const handleInstructionSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addAssuranceData(instructionForm)).unwrap();
      setInstructionForm({
        instructions_details: "",
        date_of_instructions: "",
        admin_id: user.employeeid || "",
        admin_name: user.signature || "",
        department: user.department || "",
      });
    } catch (err) {
      // Error handled by reducer's showToastOnce
    }
  };

  const handleAckChange = (instructionId, value) => {
    const instruction = data.find((r) => r.id === instructionId);
    setAckForm((prev) => ({
      ...prev,
      [instructionId]: {
        instructions_details: instruction.instructions_details,
        date_of_instructions: instruction.date_of_instructions,
        admin_id: instruction.admin_id,
        admin_name: instruction.admin_name,
        department: user.department || "",
        date_of_acknowledgement: formatDate(new Date(), "YYYY-MM-DD"),
        acknowledged_name: user.name || "",
        acknowledged_designation: user.designation || "",
        acknowledged_emp_no: user.emp_no || "",
        acknowledged_remark: value,
      },
    }));
  };

  const handleAckSubmit = async (instructionId) => {
    try {
      await dispatch(addAssuranceData(ackForm[instructionId])).unwrap();
      setAckForm((prev) => ({ ...prev, [instructionId]: undefined }));
    } catch (err) {
      // Error handled by reducer's showToastOnce
    }
  };

  const toggleAcknowledgments = (instructionId) => {
    setExpandedInstruction(expandedInstruction === instructionId ? null : instructionId);
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-danger">{error}</div>;
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
    <div className="container mt-4">
      <h2 className="mb-4">Assurance System</h2>

      {user.role === "Admin" && (
        <div className="card mb-4">
          <div className="card-header">Create Instruction</div>
          <div className="card-body">
            <form onSubmit={handleInstructionSubmit}>
              <div className="mb-3">
                <label htmlFor="instructions_details" className="form-label">
                  Instruction Details
                </label>
                <textarea
                  className="form-control"
                  id="instructions_details"
                  name="instructions_details"
                  value={instructionForm.instructions_details}
                  onChange={handleInstructionChange}
                  required
                  rows="4"
                  aria-label="Instruction Details"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date_of_instructions" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date_of_instructions"
                  name="date_of_instructions"
                  value={instructionForm.date_of_instructions}
                  onChange={handleInstructionChange}
                  required
                  aria-label="Date of Instruction"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create Instruction
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">Instructions</div>
        <div className="card-body">
          {filteredInstructions.length === 0 ? (
            <p className="text-muted">No instructions available.</p>
          ) : (
            <table
              className="table table-bordered table-striped"
              aria-label="Instructions Table"
            >
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
                      <td>{inst.instructions_details}</td>
                      <td>{inst.admin_name}</td>
                      <td>{inst.department}</td>
                      <td>
                        {user.role !== "Admin" && (
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleAckSubmit(inst.id)}
                            disabled={!ackForm[inst.id]?.acknowledged_remark}
                            aria-label={`Acknowledge instruction ${inst.id}`}
                          >
                            Acknowledge
                          </button>
                        )}
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => toggleAcknowledgments(inst.id)}
                          aria-label={`Toggle acknowledgments for instruction ${inst.id}`}
                        >
                          {expandedInstruction === inst.id
                            ? "Hide Acknowledgments"
                            : "View Acknowledgments"}
                        </button>
                      </td>
                    </tr>
                    {user.role !== "Admin" && (
                      <tr>
                        <td colSpan="6">
                          <div className="p-2">
                            <label
                              htmlFor={`remark-${inst.id}`}
                              className="form-label"
                            >
                              Acknowledgment Remark
                            </label>
                            <textarea
                              className="form-control"
                              id={`remark-${inst.id}`}
                              value={ackForm[inst.id]?.acknowledged_remark || ""}
                              onChange={(e) =>
                                handleAckChange(inst.id, e.target.value)
                              }
                              aria-label={`Remark for instruction ${inst.id}`}
                            />
                          </div>
                        </td>
                      </tr>
                    )}
                    {expandedInstruction === inst.id && (
                      <tr>
                        <td colSpan="6">
                          <table className="table table-bordered mt-2">
                            <thead>
                              <tr>
                                <th scope="col">Acknowledged Name</th>
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
                                  <td>{ack.acknowledged_remark || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};


export default AssuranceSystem;