import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchData,
  addData
} from "../../reducer/redux/tableDataSlice";
import { Form, Button, Row, Col } from "react-bootstrap";
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
  const [impdate,setImpdate]=useState("");
  const loanregister = useSelector((state) => state.data);
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
    if(section==='tsrImposition' && field==='dateTime'){
      setImpdate(value)
    }
  };
const handleSubmit = (e) => {
       e.preventDefault();
      dispatch(addData({formType:slug,values:formData}));
          console.log("Form Data Submitted:", formData);
        navigate(`/list/${slug}`);
     };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded">
      <h5>TSR Imposition</h5>
      <Row>
        <Col md={6}><Form.Group><Form.Label>Date & Time</Form.Label><Form.Control type="datetime-local"max={today} onChange={(e) => handleChange("tsrImposition", "dateTime", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Details</Form.Label><Form.Control type="text" onChange={(e) => handleChange("tsrImposition", "details", e.target.value)} /></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group><Form.Label>Authority</Form.Label><Form.Control type="text" onChange={(e) => handleChange("tsrImposition", "authority", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Reason</Form.Label><Form.Control type="text" onChange={(e) => handleChange("tsrImposition", "reason", e.target.value)} /></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group><Form.Label>TC Name</Form.Label><Form.Control type="text" onChange={(e) => handleChange("tsrImposition", "tcName", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>TC Emp. ID</Form.Label><Form.Control type="number" onChange={(e) => handleChange("tsrImposition", "tcEmpId", e.target.value)} /></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group><Form.Label>ACC Name</Form.Label><Form.Control type="text" onChange={(e) => handleChange("tsrImposition", "accName", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>ACC Emp. ID</Form.Label><Form.Control type="number" onChange={(e) => handleChange("tsrImposition", "accEmpId", e.target.value)} /></Form.Group></Col>
      </Row>
      <Form.Group><Form.Label>Remarks</Form.Label><Form.Control as="textarea" onChange={(e) => handleChange("tsrImposition", "remarks", e.target.value)} /></Form.Group>
      
      <h5 className="mt-3">TSR Alteration</h5>
      <Row>
        <Col md={6}><Form.Group><Form.Label>Date & Time</Form.Label><Form.Control type="datetime-local" min={impdate}  onChange={(e) => handleChange("tsrAlteration", "dateTime", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Details</Form.Label><Form.Control type="text" onChange={(e) => handleChange("tsrAlteration", "details", e.target.value)} /></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group><Form.Label>Authority/Dept</Form.Label><Form.Control type="text" onChange={(e) => handleChange("tsrAlteration", "authority", e.target.value)} /></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group><Form.Label>TC Name</Form.Label><Form.Control type="text" onChange={(e) => handleChange("tsrAlteration", "tcName", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>TC Emp. ID</Form.Label><Form.Control type="number" onChange={(e) => handleChange("tsrAlteration", "tcEmpId", e.target.value)} /></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group><Form.Label>ACC Name</Form.Label><Form.Control type="text" onChange={(e) => handleChange("tsrAlteration", "accName", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>ACC Emp. ID</Form.Label><Form.Control type="number" onChange={(e) => handleChange("tsrAlteration", "accEmpId", e.target.value)} /></Form.Group></Col>
      </Row>
      <Form.Group><Form.Label>Remarks</Form.Label><Form.Control as="textarea" onChange={(e) => handleChange("tsrAlteration", "remarks", e.target.value)} /></Form.Group>
      
      <h5 className="mt-3">TSR Cancellation</h5>
      <Row>
        <Col md={6}><Form.Group><Form.Label>Date & Time</Form.Label><Form.Control type="datetime-local"  min={impdate} onChange={(e) => handleChange("tsrCancellation", "dateTime", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Authority</Form.Label><Form.Control type="text" onChange={(e) => handleChange("tsrCancellation", "authority", e.target.value)} /></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group><Form.Label>TC Name</Form.Label><Form.Control type="text" onChange={(e) => handleChange("tsrCancellation", "tcName", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>TC Emp. ID</Form.Label><Form.Control type="number" onChange={(e) => handleChange("tsrCancellation", "tcEmpId", e.target.value)} /></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group><Form.Label>ACC Name</Form.Label><Form.Control type="text" onChange={(e) => handleChange("tsrCancellation", "accName", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>ACC Emp. ID</Form.Label><Form.Control type="number" onChange={(e) => handleChange("tsrCancellation", "accEmpId", e.target.value)} /></Form.Group></Col>
      </Row>
      <Form.Group><Form.Label>Remarks</Form.Label><Form.Control as="textarea" onChange={(e) => handleChange("tsrCancellation", "remarks", e.target.value)} /></Form.Group>
      
      <Button type="submit" className="mt-3">Submit</Button>
    </Form>
  );
};

export default TSRRegisterForm;
