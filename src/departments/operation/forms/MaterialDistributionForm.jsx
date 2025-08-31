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

const MaterialDistributionForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    Issued_By_Emp_No: "",
    Issued_To_Emp_No: "",
    Issued_By_Name: "",
    Issued_To_Name: "",
    Designation: "",
    Item_Type: "",
    Item_name: "",
    Batch: "",
    quantity: "",
    issue_date: "",
    return_date: "",
    condition: "",
    Remarks: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.Item_name) {
      newErrors.Item_name = "Item name is required";
    }
    if (!formData.Item_Type) {
      newErrors.Item_Type = "Item type is required";
    }
    if (!formData.Issued_By_Name) {
      newErrors.Issued_By_Name = "Issuer name is required";
    }
    if (!formData.Issued_By_Emp_No) {
      newErrors.Issued_By_Emp_No = "Issuer employee number is required";
    }
    if (!formData.Issued_To_Name) {
      newErrors.Issued_To_Name = "Recipient name is required";
    }
    if (!formData.Issued_To_Emp_No) {
      newErrors.Issued_To_Emp_No = "Recipient employee number is required";
    }
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Valid quantity is required";
    }
    if (!formData.issue_date) {
      newErrors.issue_date = "Issue date is required";
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

  const itemTypeOptions = [
    { value: "", label: "Select Item Type" },
    { value: "Safety Equipment", label: "Safety Equipment" },
    { value: "Tools", label: "Tools" },
    { value: "Uniforms", label: "Uniforms" },
    { value: "Stationery", label: "Stationery" },
    { value: "IT Equipment", label: "IT Equipment" },
    { value: "Maintenance Supplies", label: "Maintenance Supplies" },
    { value: "Training Materials", label: "Training Materials" },
    { value: "Emergency Equipment", label: "Emergency Equipment" },
    { value: "Communication Equipment", label: "Communication Equipment" },
    { value: "Others", label: "Others" }
  ];

  const designationOptions = [
    { value: "", label: "Select Designation" },
    { value: "Train Operator", label: "Train Operator" },
    { value: "Station Controller", label: "Station Controller" },
    { value: "Maintenance Engineer", label: "Maintenance Engineer" },
    { value: "Safety Officer", label: "Safety Officer" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Technician", label: "Technician" },
    { value: "Assistant Manager", label: "Assistant Manager" },
    { value: "Manager", label: "Manager" },
    { value: "Trainee", label: "Trainee" },
    { value: "Others", label: "Others" }
  ];

  const conditionOptions = [
    { value: "", label: "Select Condition" },
    { value: "New", label: "New" },
    { value: "Good", label: "Good" },
    { value: "Fair", label: "Fair" },
    { value: "Used", label: "Used" },
    { value: "Refurbished", label: "Refurbished" }
  ];

  return (
    <OperationFormLayout 
      title="COET - Material Distribution Register"
      description="Track distribution and return of materials and equipment"
    >
      <Form onSubmit={handleSubmit}>
        {/* Item Information */}
        <div className="form-section">
          <h5 className="section-title">Item Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Item Name"
                value={formData.Item_name}
                onChange={(value) => handleChange("Item_name", value)}
                required
                error={errors.Item_name}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Item Type"
                value={formData.Item_Type}
                onChange={(value) => handleChange("Item_Type", value)}
                options={itemTypeOptions}
                required
                error={errors.Item_Type}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Quantity"
                value={formData.quantity}
                onChange={(value) => handleChange("quantity", value)}
                min="1"
                required
                error={errors.quantity}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Batch/Serial Number"
                value={formData.Batch}
                onChange={(value) => handleChange("Batch", value)}
                helpText="Batch number or serial number"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Condition"
                value={formData.condition}
                onChange={(value) => handleChange("condition", value)}
                options={conditionOptions}
              />
            </Col>
          </Row>
        </div>

        {/* Issuer Information */}
        <div className="form-section">
          <h5 className="section-title">Issuer Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Issued By Name"
                value={formData.Issued_By_Name}
                onChange={(value) => handleChange("Issued_By_Name", value)}
                required
                error={errors.Issued_By_Name}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Issued By Employee Number"
                value={formData.Issued_By_Emp_No}
                onChange={(value) => handleChange("Issued_By_Emp_No", value)}
                required
                error={errors.Issued_By_Emp_No}
              />
            </Col>
          </Row>
        </div>

        {/* Recipient Information */}
        <div className="form-section">
          <h5 className="section-title">Recipient Information</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Issued To Name"
                value={formData.Issued_To_Name}
                onChange={(value) => handleChange("Issued_To_Name", value)}
                required
                error={errors.Issued_To_Name}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="employee-id"
                label="Issued To Employee Number"
                value={formData.Issued_To_Emp_No}
                onChange={(value) => handleChange("Issued_To_Emp_No", value)}
                required
                error={errors.Issued_To_Emp_No}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Designation"
                value={formData.Designation}
                onChange={(value) => handleChange("Designation", value)}
                options={designationOptions}
              />
            </Col>
          </Row>
        </div>

        {/* Distribution Dates */}
        <div className="form-section">
          <h5 className="section-title">Distribution Schedule</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="date"
                label="Issue Date"
                value={formData.issue_date}
                onChange={(value) => handleChange("issue_date", value)}
                max={today}
                required
                error={errors.issue_date}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="date"
                label="Expected Return Date"
                value={formData.return_date}
                onChange={(value) => handleChange("return_date", value)}
                min={formData.issue_date || today}
                helpText="Expected date for item return (if applicable)"
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
            value={formData.Remarks}
            onChange={(value) => handleChange("Remarks", value)}
            rows={3}
            helpText="Add any additional notes about the material distribution"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Material Distribution Record
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default MaterialDistributionForm;