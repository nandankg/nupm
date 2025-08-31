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

const LibraryBookIssueRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    borrowerName: "",
    employeeId: "",
    designation: "",
    department: "",
    contactNumber: "",
    bookTitle: "",
    bookAuthor: "",
    bookISBN: "",
    bookCategory: "",
    accessionNumber: "",
    issueDate: "",
    dueDate: "",
    returnDate: "",
    renewalCount: "",
    condition: "",
    librarian: "",
    librarianEmpId: "",
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
    
    if (!formData.borrowerName) {
      newErrors.borrowerName = "Borrower name is required";
    }
    if (!formData.employeeId) {
      newErrors.employeeId = "Employee ID is required";
    }
    if (!formData.bookTitle) {
      newErrors.bookTitle = "Book title is required";
    }
    if (!formData.accessionNumber) {
      newErrors.accessionNumber = "Accession number is required";
    }
    if (!formData.issueDate) {
      newErrors.issueDate = "Issue date is required";
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }
    if (formData.dueDate && formData.issueDate && formData.dueDate <= formData.issueDate) {
      newErrors.dueDate = "Due date must be after issue date";
    }
    if (formData.returnDate && formData.issueDate && formData.returnDate < formData.issueDate) {
      newErrors.returnDate = "Return date cannot be before issue date";
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

  const bookCategoryOptions = [
    { value: "", label: "Select Category" },
    { value: "Railway Operations", label: "Railway Operations" },
    { value: "Safety & Security", label: "Safety & Security" },
    { value: "Technical Manuals", label: "Technical Manuals" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Engineering", label: "Engineering" },
    { value: "Management", label: "Management" },
    { value: "Training Materials", label: "Training Materials" },
    { value: "Reference Books", label: "Reference Books" },
    { value: "Journals", label: "Journals" },
    { value: "Standards & Codes", label: "Standards & Codes" },
    { value: "General", label: "General" }
  ];

  const conditionOptions = [
    { value: "", label: "Select Condition" },
    { value: "Excellent", label: "Excellent" },
    { value: "Good", label: "Good" },
    { value: "Fair", label: "Fair" },
    { value: "Poor", label: "Poor" },
    { value: "Damaged", label: "Damaged" }
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
    { value: "Others", label: "Others" }
  ];

  // Calculate due date (default 14 days from issue date)
  const calculateDueDate = (issueDate) => {
    if (!issueDate) return "";
    const issue = new Date(issueDate);
    issue.setDate(issue.getDate() + 14);
    return issue.toISOString().split("T")[0];
  };

  // Auto-calculate due date when issue date changes
  React.useEffect(() => {
    if (formData.issueDate && !formData.dueDate) {
      const calculatedDueDate = calculateDueDate(formData.issueDate);
      setFormData(prev => ({
        ...prev,
        dueDate: calculatedDueDate
      }));
    }
  }, [formData.issueDate]);

  return (
    <OperationFormLayout 
      title="COET - Library Book Issue Register"
      description="Track library book lending and returns for training materials"
    >
      <Form onSubmit={handleSubmit}>
        {/* Borrower Information */}
        <div className="form-section">
          <h5 className="section-title">Borrower Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Borrower Name"
                value={formData.borrowerName}
                onChange={(value) => handleChange("borrowerName", value)}
                required
                error={errors.borrowerName}
              />
            </Col>
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
          </Row>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Designation"
                value={formData.designation}
                onChange={(value) => handleChange("designation", value)}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Department"
                value={formData.department}
                onChange={(value) => handleChange("department", value)}
                options={departmentOptions}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="tel"
                label="Contact Number"
                value={formData.contactNumber}
                onChange={(value) => handleChange("contactNumber", value)}
                pattern="[0-9]{10}"
                helpText="10-digit mobile number"
              />
            </Col>
          </Row>
        </div>

        {/* Book Information */}
        <div className="form-section">
          <h5 className="section-title">Book Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Book Title"
                value={formData.bookTitle}
                onChange={(value) => handleChange("bookTitle", value)}
                required
                error={errors.bookTitle}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Author"
                value={formData.bookAuthor}
                onChange={(value) => handleChange("bookAuthor", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="ISBN"
                value={formData.bookISBN}
                onChange={(value) => handleChange("bookISBN", value)}
                helpText="International Standard Book Number"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Book Category"
                value={formData.bookCategory}
                onChange={(value) => handleChange("bookCategory", value)}
                options={bookCategoryOptions}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="text"
                label="Accession Number"
                value={formData.accessionNumber}
                onChange={(value) => handleChange("accessionNumber", value)}
                required
                error={errors.accessionNumber}
                helpText="Library catalog number"
              />
            </Col>
          </Row>
        </div>

        {/* Issue/Return Details */}
        <div className="form-section">
          <h5 className="section-title">Issue & Return Details</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Issue Date"
                value={formData.issueDate}
                onChange={(value) => handleChange("issueDate", value)}
                max={today}
                required
                error={errors.issueDate}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Due Date"
                value={formData.dueDate}
                onChange={(value) => handleChange("dueDate", value)}
                min={formData.issueDate}
                required
                error={errors.dueDate}
                helpText="Auto-calculated as 14 days from issue date"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="date"
                label="Return Date"
                value={formData.returnDate}
                onChange={(value) => handleChange("returnDate", value)}
                min={formData.issueDate}
                max={today}
                error={errors.returnDate}
                helpText="Leave blank if not returned"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Renewal Count"
                value={formData.renewalCount}
                onChange={(value) => handleChange("renewalCount", value)}
                min="0"
                max="3"
                helpText="Number of renewals (max 3)"
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="select"
                label="Book Condition"
                value={formData.condition}
                onChange={(value) => handleChange("condition", value)}
                options={conditionOptions}
                helpText="Condition when issued/returned"
              />
            </Col>
          </Row>
        </div>

        {/* Librarian Details */}
        <div className="form-section">
          <h5 className="section-title">Librarian Details</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Librarian Name"
                value={formData.librarian}
                onChange={(value) => handleChange("librarian", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Librarian Employee ID"
                value={formData.librarianEmpId}
                onChange={(value) => handleChange("librarianEmpId", value)}
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
            helpText="Additional notes about book issue/return"
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Library Book Record
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default LibraryBookIssueRegisterForm;