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

const TSRRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];
  const [impdate, setImpdate] = useState("");

  const [formData, setFormData] = useState({
    tsrImposition: {
      dateTime: "",
      details: "",
      authority: "",
      reason: "",
      tcName: "",
      tcEmpId: "",
      accName: "",
      accEmpId: "",
      remarks: "",
    },
    tsrAlteration: {
      dateTime: "",
      details: "",
      authority: "",
      tcName: "",
      tcEmpId: "",
      accName: "",
      accEmpId: "",
      remarks: "",
    },
    tsrCancellation: {
      dateTime: "",
      authority: "",
      tcName: "",
      tcEmpId: "",
      accName: "",
      accEmpId: "",
      remarks: "",
    },
  });

  const handleChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
    if (section === 'tsrImposition' && field === 'dateTime') {
      setImpdate(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addData({ formType: slug, values: formData }));
    navigate(`/list/${slug}`);
  };

  return (
    <OperationFormLayout 
      title="TSR Register"
      description="Temporary Speed Restriction Register - Imposition, Alteration & Cancellation"
    >
      <Form onSubmit={handleSubmit}>
        {/* TSR Imposition Section */}
        <div className="form-section">
          <h5 className="section-title">TSR Imposition</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="datetime-local"
                label="Date & Time"
                required
                max={today}
                onChange={(value) => handleChange("tsrImposition", "dateTime", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Details"
                required
                onChange={(value) => handleChange("tsrImposition", "details", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Authority"
                required
                onChange={(value) => handleChange("tsrImposition", "authority", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Reason"
                required
                onChange={(value) => handleChange("tsrImposition", "reason", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="TC Name"
                required
                onChange={(value) => handleChange("tsrImposition", "tcName", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="TC Employee ID"
                required
                onChange={(value) => handleChange("tsrImposition", "tcEmpId", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="ACC Name"
                required
                onChange={(value) => handleChange("tsrImposition", "accName", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="ACC Employee ID"
                required
                onChange={(value) => handleChange("tsrImposition", "accEmpId", value)}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Remarks"
            onChange={(value) => handleChange("tsrImposition", "remarks", value)}
          />
        </div>

        {/* TSR Alteration Section */}
        <div className="form-section">
          <h5 className="section-title">TSR Alteration</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="datetime-local"
                label="Date & Time"
                min={impdate}
                onChange={(value) => handleChange("tsrAlteration", "dateTime", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Details"
                onChange={(value) => handleChange("tsrAlteration", "details", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Authority/Dept"
                onChange={(value) => handleChange("tsrAlteration", "authority", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="TC Name"
                onChange={(value) => handleChange("tsrAlteration", "tcName", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="TC Employee ID"
                onChange={(value) => handleChange("tsrAlteration", "tcEmpId", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="ACC Name"
                onChange={(value) => handleChange("tsrAlteration", "accName", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="ACC Employee ID"
                onChange={(value) => handleChange("tsrAlteration", "accEmpId", value)}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Remarks"
            onChange={(value) => handleChange("tsrAlteration", "remarks", value)}
          />
        </div>

        {/* TSR Cancellation Section */}
        <div className="form-section">
          <h5 className="section-title">TSR Cancellation</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="datetime-local"
                label="Date & Time"
                min={impdate}
                onChange={(value) => handleChange("tsrCancellation", "dateTime", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Authority"
                onChange={(value) => handleChange("tsrCancellation", "authority", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="TC Name"
                onChange={(value) => handleChange("tsrCancellation", "tcName", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="TC Employee ID"
                onChange={(value) => handleChange("tsrCancellation", "tcEmpId", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="ACC Name"
                onChange={(value) => handleChange("tsrCancellation", "accName", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="ACC Employee ID"
                onChange={(value) => handleChange("tsrCancellation", "accEmpId", value)}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Remarks"
            onChange={(value) => handleChange("tsrCancellation", "remarks", value)}
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Submit TSR Register
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default TSRRegisterForm;