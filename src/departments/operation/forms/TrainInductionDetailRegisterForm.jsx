import React, { useState, useEffect } from "react";
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

const TrainInductionDetailRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const today = new Date().toISOString().split("T")[0];
  
  const [formData, setFormData] = useState({
    serviceid: "",
    date: "",
    trainset: "",
    traininductedfrom: "",
    entrymode: "",
    maininlineinduction: "",
    scheduledeparture: "",
    actualdeparture: "",
    depotarrival: "",
    initialkm: "",
    finalkm: "",
    runningkms: "",
    loco: "",
    trainoperator: "",
    trainoperatorid: "",
    trainenginer: "",
    trainenginerid: "",
    remarks: ""
  });

  const [errors, setErrors] = useState({});

  // Calculate running KMs automatically
  useEffect(() => {
    const initial = parseInt(formData.initialkm) || 0;
    const final = parseInt(formData.finalkm) || 0;
    const runningkms = final - initial;
    if (runningkms >= 0) {
      setFormData(prev => ({
        ...prev,
        runningkms: runningkms.toString()
      }));
    }
  }, [formData.initialkm, formData.finalkm]);

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
    
    if (!formData.serviceid) {
      newErrors.serviceid = "Train ID/Service ID is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.initialkm) {
      newErrors.initialkm = "Initial KM is required";
    }
    if (!formData.finalkm) {
      newErrors.finalkm = "Final KM is required";
    }
    if (parseInt(formData.finalkm) < parseInt(formData.initialkm)) {
      newErrors.finalkm = "Final KM cannot be less than Initial KM";
    }
    if (!formData.trainoperator) {
      newErrors.trainoperator = "Train Operator name is required";
    }
    if (!formData.trainoperatorid) {
      newErrors.trainoperatorid = "Train Operator ID is required";
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

  const trainInductionOptions = [
    { value: "", label: "Select" },
    { value: "Depot", label: "Depot" },
    { value: "MSPA platform", label: "MSPA Platform" },
    { value: "MSPA Siding", label: "MSPA Siding" },
    { value: "Others", label: "Others" }
  ];

  const entryModeOptions = [
    { value: "", label: "Select" },
    { value: "ATO", label: "ATO" },
    { value: "ATP", label: "ATP" },
    { value: "ROS", label: "ROS" },
    { value: "RM", label: "RM" },
    { value: "SCS", label: "SCS" }
  ];

  return (
    <OperationFormLayout 
      title="Train Induction Detail Register"
      description="Record train induction details for mainline operations"
    >
      <Form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-section">
          <h5 className="section-title">Basic Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="train-id"
                label="Train ID/Service ID"
                value={formData.serviceid}
                onChange={(value) => handleChange("serviceid", value)}
                required
                error={errors.serviceid}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="date"
                label="Date"
                value={formData.date}
                onChange={(value) => handleChange("date", value)}
                max={today}
                required
                error={errors.date}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="number"
                label="Train Set"
                value={formData.trainset}
                onChange={(value) => handleChange("trainset", value)}
                min="0"
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="Train Inducted From"
                value={formData.traininductedfrom}
                onChange={(value) => handleChange("traininductedfrom", value)}
                options={trainInductionOptions}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="select"
                label="MODE ATO/ATP/ROS/RM/SCS (Train Entered into Mainline)"
                value={formData.entrymode}
                onChange={(value) => handleChange("entrymode", value)}
                options={entryModeOptions}
              />
            </Col>
          </Row>
        </div>

        {/* Timing Information */}
        <div className="form-section">
          <h5 className="section-title">Timing Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="time"
                label="Mainline Induction (From M/L Entry Signal)"
                value={formData.maininlineinduction}
                onChange={(value) => handleChange("maininlineinduction", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="time"
                label="Schedule Departure"
                value={formData.scheduledeparture}
                onChange={(value) => handleChange("scheduledeparture", value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="time"
                label="Actual Departure"
                value={formData.actualdeparture}
                onChange={(value) => handleChange("actualdeparture", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="date"
                label="Date of Depot Arrival/Stabling"
                value={formData.depotarrival}
                onChange={(value) => handleChange("depotarrival", value)}
                max={today}
              />
            </Col>
          </Row>
        </div>

        {/* Distance Information */}
        <div className="form-section">
          <h5 className="section-title">Distance Information</h5>
          <Row>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Initial KMs"
                value={formData.initialkm}
                onChange={(value) => handleChange("initialkm", value)}
                min="0"
                required
                error={errors.initialkm}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Final KMs"
                value={formData.finalkm}
                onChange={(value) => handleChange("finalkm", value)}
                min="0"
                required
                error={errors.finalkm}
              />
            </Col>
            <Col md={4}>
              <UniversalOperationFormField
                type="number"
                label="Running KMs (Auto-calculated)"
                value={formData.runningkms}
                readOnly
                helpText="Automatically calculated as Final KMs - Initial KMs"
              />
            </Col>
          </Row>
        </div>

        {/* Personnel Information */}
        <div className="form-section">
          <h5 className="section-title">Personnel Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Train Operator"
                value={formData.trainoperator}
                onChange={(value) => handleChange("trainoperator", value)}
                required
                error={errors.trainoperator}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Train Operator ID"
                value={formData.trainoperatorid}
                onChange={(value) => handleChange("trainoperatorid", value)}
                required
                error={errors.trainoperatorid}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Train Engineer"
                value={formData.trainenginer}
                onChange={(value) => handleChange("trainenginer", value)}
              />
            </Col>
            <Col md={6}>
              <UniversalOperationFormField
                type="employee-id"
                label="Train Engineer ID"
                value={formData.trainenginerid}
                onChange={(value) => handleChange("trainenginerid", value)}
              />
            </Col>
          </Row>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h5 className="section-title">Additional Information</h5>
          <Row>
            <Col md={6}>
              <UniversalOperationFormField
                type="text"
                label="Locomotive"
                value={formData.loco}
                onChange={(value) => handleChange("loco", value)}
              />
            </Col>
          </Row>
          <UniversalOperationFormField
            type="textarea"
            label="Remarks"
            value={formData.remarks}
            onChange={(value) => handleChange("remarks", value)}
            rows={3}
          />
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Submit Train Induction Details
          </Button>
        </div>
      </Form>
    </OperationFormLayout>
  );
};

export default TrainInductionDetailRegisterForm;