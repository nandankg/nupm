import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { OperationFormLayout } from "../components/OperationFormLayout";
import { UniversalOperationFormField } from "../components/UniversalOperationFormField";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const OperationCompetencyRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    department: "",
    section: "",
    assessmentType: "",
    assessor: "",
    assessorEmpId: "",
    competencyRecords: [{
      empId: "",
      empName: "",
      designation: "",
      competencyType: "",
      currentStatus: "",
      assessmentDate: "",
      validityDate: "",
      score: "",
      result: "",
      remarks: "",
      nextAssessmentDue: ""
    }],
    trainingRequirements: [{
      empId: "",
      empName: "",
      trainingType: "",
      requiredBy: "",
      priority: "",
      status: ""
    }],
    certificationDetails: {
      certificateIssued: "",
      issuingAuthority: "",
      validityPeriod: "",
      renewalRequired: ""
    },
    assessorRemarks: "",
    hodApproval: "",
    hodEmpId: "",
    recommendations: "",
    followUpActions: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (arrayName, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultItem]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    if (!formData.assessmentType) {
      newErrors.assessmentType = "Assessment type is required";
    }
    if (!formData.assessor) {
      newErrors.assessor = "Assessor name is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(addData({ formType: slug, values: formData })).unwrap();
      navigate(`/list/${slug}`);
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  const departmentOptions = [
    { value: "", label: "Select Department" },
    { value: "Operations", label: "Operations" },
    { value: "Rolling Stock", label: "Rolling Stock" },
    { value: "Signalling", label: "Signalling" },
    { value: "Traction", label: "Traction" },
    { value: "Civil", label: "Civil" },
    { value: "Telecom", label: "Telecom" },
    { value: "E&M", label: "E&M" }
  ];

  const assessmentTypeOptions = [
    { value: "", label: "Select Assessment Type" },
    { value: "Annual Competency", label: "Annual Competency" },
    { value: "Periodic Refresher", label: "Periodic Refresher" },
    { value: "Post Incident", label: "Post Incident" },
    { value: "Medical Fitness", label: "Medical Fitness" },
    { value: "Safety Certification", label: "Safety Certification" }
  ];

  const competencyTypeOptions = [
    { value: "", label: "Select Competency" },
    { value: "Train Operation", label: "Train Operation" },
    { value: "Signal Operation", label: "Signal Operation" },
    { value: "Platform Duties", label: "Platform Duties" },
    { value: "Emergency Response", label: "Emergency Response" },
    { value: "Equipment Handling", label: "Equipment Handling" },
    { value: "Safety Procedures", label: "Safety Procedures" }
  ];

  const resultOptions = [
    { value: "", label: "Select Result" },
    { value: "Competent", label: "Competent" },
    { value: "Not Competent", label: "Not Competent" },
    { value: "Competent with Conditions", label: "Competent with Conditions" },
    { value: "Retraining Required", label: "Retraining Required" }
  ];

  return (
    <OperationFormLayout 
      title="Operation Competency Register"
      description="Staff competency assessment and certification tracking"
    >
      <Form onSubmit={handleSubmit}>
        {/* Assessment Details */}
        <div className="form-section">
          <h5 className="section-title">Assessment Information</h5>
          <Row>
            <Col md={3}>
              <UniversalOperationFormField
                type="date"
                label="Assessment Date"
                value={formData.date}
                onChange={(value) => handleChange("date", value)}
                max={today}
                required
                error={errors.date}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="select"
                label="Department"
                value={formData.department}
                onChange={(value) => handleChange("department", value)}
                options={departmentOptions}
                required
                error={errors.department}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="text"
                label="Section"
                value={formData.section}
                onChange={(value) => handleChange("section", value)}
              />
            </Col>
            <Col md={3}>
              <UniversalOperationFormField
                type="select"
                label="Assessment Type"
                value={formData.assessmentType}
                onChange={(value) => handleChange("assessmentType", value)}
                options={assessmentTypeOptions}
                required
                error={errors.assessmentType}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Assessor Name"
                value={formData.assessor}
                onChange={(value) => handleChange("assessor", value)}
                required
                error={errors.assessor}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Assessor Employee ID"
                value={formData.assessorEmpId}
                onChange={(value) => handleChange("assessorEmpId", value)}
              />
            </Col>
          </Row>
        </div>

        {/* Competency Records */}
        <div className="form-section">
          <h5 className="section-title">Competency Assessment Records</h5>
          <div className="table-responsive">
            <Table striped bordered size="sm">
              <thead>
                <tr>
                  <th>Emp ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Competency</th>
                  <th>Score</th>
                  <th>Result</th>
                  <th>Valid Until</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.competencyRecords.map((record, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={record.empId}
                        onChange={(e) => handleArrayChange("competencyRecords", index, "empId", e.target.value)}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={record.empName}
                        onChange={(e) => handleArrayChange("competencyRecords", index, "empName", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={record.designation}
                        onChange={(e) => handleArrayChange("competencyRecords", index, "designation", e.target.value)}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={record.competencyType}
                        onChange={(e) => handleArrayChange("competencyRecords", index, "competencyType", e.target.value)}
                        style={{ width: '120px' }}
                      >
                        {competencyTypeOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={record.score}
                        onChange={(e) => handleArrayChange("competencyRecords", index, "score", e.target.value)}
                        style={{ width: '60px' }}
                        min="0"
                        max="100"
                      />
                    </td>
                    <td>
                      <select
                        className="form-control form-control-sm"
                        value={record.result}
                        onChange={(e) => handleArrayChange("competencyRecords", index, "result", e.target.value)}
                        style={{ width: '100px' }}
                      >
                        {resultOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={record.validityDate}
                        onChange={(e) => handleArrayChange("competencyRecords", index, "validityDate", e.target.value)}
                        style={{ width: '120px' }}
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => removeArrayItem("competencyRecords", index)}
                        disabled={formData.competencyRecords.length === 1}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Button 
            size="sm" 
            variant="secondary" 
            onClick={() => addArrayItem("competencyRecords", {
              empId: "",
              empName: "",
              designation: "",
              competencyType: "",
              currentStatus: "",
              assessmentDate: "",
              validityDate: "",
              score: "",
              result: "",
              remarks: "",
              nextAssessmentDue: ""
            })}
          >
            Add Competency Record
          </Button>
        </div>

        {/* Certification Details */}
        <div className="form-section">
          <h5 className="section-title">Certification Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Certificate Issued"
                value={formData.certificationDetails.certificateIssued}
                onChange={(value) => handleChange("certificationDetails", {
                  ...formData.certificationDetails,
                  certificateIssued: value
                })}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Issuing Authority"
                value={formData.certificationDetails.issuingAuthority}
                onChange={(value) => handleChange("certificationDetails", {
                  ...formData.certificationDetails,
                  issuingAuthority: value
                })}
              />
            </Col>
          </Row>
        </div>

        {/* Assessment Summary */}
        <div className="form-section">
          <h5 className="section-title">Assessment Summary</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Assessor Remarks"
            value={formData.assessorRemarks}
            onChange={(value) => handleChange("assessorRemarks", value)}
            rows={3}
            helpText="Overall assessment observations and feedback"
          />
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="HOD Approval"
                value={formData.hodApproval}
                onChange={(value) => handleChange("hodApproval", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="HOD Employee ID"
                value={formData.hodEmpId}
                onChange={(value) => handleChange("hodEmpId", value)}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Recommendations & Follow-up Actions"
            value={formData.followUpActions}
            onChange={(value) => handleChange("followUpActions", value)}
            rows={2}
            helpText="Required actions and recommendations for improvement"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Competency Register
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default OperationCompetencyRegisterForm;