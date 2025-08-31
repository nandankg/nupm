import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../../reducer/redux/tableDataSlice";
import { Form, Button, Row, Col } from "react-bootstrap";
import { OperationFormLayout } from "../components/OperationFormLayout";
import { UniversalOperationFormField } from "../components/UniversalOperationFormField";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const BioDataRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    spouseName: "",
    bloodGroup: "",
    nationality: "",
    religion: "",
    category: "",
    contactNumber: "",
    alternateNumber: "",
    emailAddress: "",
    permanentAddress: "",
    currentAddress: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelation: "",
    department: "",
    designation: "",
    dateOfJoining: "",
    employeeType: "",
    reportingManager: "",
    workLocation: "",
    qualification: "",
    experience: "",
    skills: "",
    languages: "",
    medicalFitness: "",
    remarks: ""
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employeeId) {
      newErrors.employeeId = "Employee ID is required";
    }
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    if (!formData.designation) {
      newErrors.designation = "Designation is required";
    }
    if (!formData.dateOfJoining) {
      newErrors.dateOfJoining = "Date of joining is required";
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

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" }
  ];

  const maritalStatusOptions = [
    { value: "", label: "Select Marital Status" },
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorced", label: "Divorced" },
    { value: "Widowed", label: "Widowed" }
  ];

  const bloodGroupOptions = [
    { value: "", label: "Select Blood Group" },
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" }
  ];

  const categoryOptions = [
    { value: "", label: "Select Category" },
    { value: "General", label: "General" },
    { value: "OBC", label: "OBC" },
    { value: "SC", label: "SC" },
    { value: "ST", label: "ST" },
    { value: "Others", label: "Others" }
  ];

  const departmentOptions = [
    { value: "", label: "Select Department" },
    { value: "Operations", label: "Operations" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Safety", label: "Safety" },
    { value: "Training (COET)", label: "Training (COET)" },
    { value: "Engineering", label: "Engineering" },
    { value: "Finance", label: "Finance" },
    { value: "Administration", label: "Administration" },
    { value: "Human Resources", label: "Human Resources" }
  ];

  const employeeTypeOptions = [
    { value: "", label: "Select Employee Type" },
    { value: "Permanent", label: "Permanent" },
    { value: "Contract", label: "Contract" },
    { value: "Temporary", label: "Temporary" },
    { value: "Trainee", label: "Trainee" },
    { value: "Consultant", label: "Consultant" }
  ];

  const relationshipOptions = [
    { value: "", label: "Select Relationship" },
    { value: "Father", label: "Father" },
    { value: "Mother", label: "Mother" },
    { value: "Spouse", label: "Spouse" },
    { value: "Brother", label: "Brother" },
    { value: "Sister", label: "Sister" },
    { value: "Son", label: "Son" },
    { value: "Daughter", label: "Daughter" },
    { value: "Others", label: "Others" }
  ];

  const medicalFitnessOptions = [
    { value: "", label: "Select Medical Fitness" },
    { value: "Fit", label: "Fit" },
    { value: "Fit with Restrictions", label: "Fit with Restrictions" },
    { value: "Temporarily Unfit", label: "Temporarily Unfit" },
    { value: "Permanently Unfit", label: "Permanently Unfit" },
    { value: "Pending", label: "Pending Medical Examination" }
  ];

  return (
    <OperationFormLayout 
      title="Bio Data Register"
      description="Employee biographical data and personal information registry"
    >
      <Form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-section">
          <h5 className="section-title">Basic Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Employee ID"
                value={formData.employeeId}
                onChange={(value) => handleChange("employeeId", value)}
                required
                error={errors.employeeId}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Full Name"
                value={formData.fullName}
                onChange={(value) => handleChange("fullName", value)}
                required
                error={errors.fullName}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Father's Name"
                value={formData.fatherName}
                onChange={(value) => handleChange("fatherName", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Mother's Name"
                value={formData.motherName}
                onChange={(value) => handleChange("motherName", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={(value) => handleChange("dateOfBirth", value)}
                max={today}
                required
                error={errors.dateOfBirth}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Gender"
                value={formData.gender}
                onChange={(value) => handleChange("gender", value)}
                options={genderOptions}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Blood Group"
                value={formData.bloodGroup}
                onChange={(value) => handleChange("bloodGroup", value)}
                options={bloodGroupOptions}
              />
            </Col>
          </Row>
        </div>

        {/* Personal Details */}
        <div className="form-section">
          <h5 className="section-title">Personal Details</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Marital Status"
                value={formData.maritalStatus}
                onChange={(value) => handleChange("maritalStatus", value)}
                options={maritalStatusOptions}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Spouse Name"
                value={formData.spouseName}
                onChange={(value) => handleChange("spouseName", value)}
                helpText="If married"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Nationality"
                value={formData.nationality}
                onChange={(value) => handleChange("nationality", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Religion"
                value={formData.religion}
                onChange={(value) => handleChange("religion", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Category"
                value={formData.category}
                onChange={(value) => handleChange("category", value)}
                options={categoryOptions}
              />
            </Col>
          </Row>
        </div>

        {/* Contact Information */}
        <div className="form-section">
          <h5 className="section-title">Contact Information</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="tel"
                label="Contact Number"
                value={formData.contactNumber}
                onChange={(value) => handleChange("contactNumber", value)}
                pattern="[0-9]{10}"
                required
                error={errors.contactNumber}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="tel"
                label="Alternate Number"
                value={formData.alternateNumber}
                onChange={(value) => handleChange("alternateNumber", value)}
                pattern="[0-9]{10}"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="email"
                label="Email Address"
                value={formData.emailAddress}
                onChange={(value) => handleChange("emailAddress", value)}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Permanent Address"
            value={formData.permanentAddress}
            onChange={(value) => handleChange("permanentAddress", value)}
            rows={2}
          />
          <UniversalOperationFormField
            type="textarea"
            label="Current Address"
            value={formData.currentAddress}
            onChange={(value) => handleChange("currentAddress", value)}
            rows={2}
            helpText="Leave blank if same as permanent address"
          />
        </div>

        {/* Emergency Contact */}
        <div className="form-section">
          <h5 className="section-title">Emergency Contact</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Emergency Contact Name"
                value={formData.emergencyContactName}
                onChange={(value) => handleChange("emergencyContactName", value)}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="tel"
                label="Emergency Contact Number"
                value={formData.emergencyContactNumber}
                onChange={(value) => handleChange("emergencyContactNumber", value)}
                pattern="[0-9]{10}"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Relationship"
                value={formData.emergencyContactRelation}
                onChange={(value) => handleChange("emergencyContactRelation", value)}
                options={relationshipOptions}
              />
            </Col>
          </Row>
        </div>

        {/* Official Information */}
        <div className="form-section">
          <h5 className="section-title">Official Information</h5>
          <Row>
            <Col md={4}>
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
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Designation"
                value={formData.designation}
                onChange={(value) => handleChange("designation", value)}
                required
                error={errors.designation}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Date of Joining"
                value={formData.dateOfJoining}
                onChange={(value) => handleChange("dateOfJoining", value)}
                max={today}
                required
                error={errors.dateOfJoining}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Employee Type"
                value={formData.employeeType}
                onChange={(value) => handleChange("employeeType", value)}
                options={employeeTypeOptions}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Reporting Manager"
                value={formData.reportingManager}
                onChange={(value) => handleChange("reportingManager", value)}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Work Location"
                value={formData.workLocation}
                onChange={(value) => handleChange("workLocation", value)}
                helpText="Station/depot/office"
              />
            </Col>
          </Row>
        </div>

        {/* Professional Details */}
        <div className="form-section">
          <h5 className="section-title">Professional Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Qualification"
                value={formData.qualification}
                onChange={(value) => handleChange("qualification", value)}
                helpText="Highest educational qualification"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Total Experience"
                value={formData.experience}
                onChange={(value) => handleChange("experience", value)}
                helpText="Total years of experience"
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Key Skills"
            value={formData.skills}
            onChange={(value) => handleChange("skills", value)}
            rows={2}
            helpText="Technical and soft skills"
          />
          <UniversalOperationFormField
            type="text"
            label="Languages Known"
            value={formData.languages}
            onChange={(value) => handleChange("languages", value)}
            helpText="Languages with proficiency level"
          />
        </div>

        {/* Medical Information */}
        <div className="form-section">
          <h5 className="section-title">Medical Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Medical Fitness Status"
                value={formData.medicalFitness}
                onChange={(value) => handleChange("medicalFitness", value)}
                options={medicalFitnessOptions}
              />
            </Col>
          </Row>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h5 className="section-title">Additional Information</h5>
          <UniversalOperationFormField
            type="textarea"
            label="Remarks"
            value={formData.remarks}
            onChange={(value) => handleChange("remarks", value)}
            rows={3}
            helpText="Any additional information or special notes"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Bio Data Record
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default BioDataRegisterForm;