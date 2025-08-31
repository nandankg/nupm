import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/redux/tableDataSlice";
import { dtrissue } from "../../utils/formUtils";
import Breadcrumbs from "@mui/material/Breadcrumbs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditTsrreg = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const navigate = useNavigate();
  const location = useLocation();
   const today = new Date().toISOString().split("T")[0];
    const [impdate,setImpdate]=useState("");
  const { id } = location.state;
console.log(loanregister)
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userdata"));

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch]);

  const itmm = loanregister.data.data;
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
   
  }
 const fd = filteredData[0];
 const initialFormState = {
  id: fd.id,
 tsrImposition: {
  
  dateTime: fd.tsrImposition.dateTime,
  details: fd.tsrImposition.details,
  authority: fd.tsrImposition.authority,
  reason: fd.tsrImposition.reason,
  tcName: fd.tsrImposition.tcName,
  tcEmpId: fd.tsrImposition.tcEmpId,
  accName: fd.tsrImposition.accName,
  accEmpId: fd.tsrImposition.accEmpId,
  remarks: fd.tsrImposition.remarks,
},
tsrAlteration: {
  dateTime: fd.tsrAlteration.dateTime,
  details: fd.tsrAlteration.details,
  authority: fd.tsrAlteration.authority,
  tcName: fd.tsrAlteration.tcName,
  tcEmpId: fd.tsrAlteration.tcEmpId,
  accName:fd.tsrAlteration.accName,
  accEmpId: fd.tsrAlteration.accEmpId,
  remarks: fd.tsrAlteration.remarks,
},
tsrCancellation: {
  dateTime: fd.tsrCancellation.dateTime,
  authority: fd.tsrCancellation.authority,
  tcName: fd.tsrCancellation.tcName,
  tcEmpId: fd.tsrCancellation.tcEmpId,
  accName: fd.tsrCancellation.accName,
  accEmpId: fd.tsrCancellation.accEmpId,
  remarks: fd.tsrCancellation.remarks,
},
 };
  

  const [formValues, setFormValues] = useState(initialFormState);
  console.log(formValues);

  // useEffect(() => {
  //   if (loanregister?.data?.data) {
  //     const filteredData = loanregister.data.data.find(
  //       (item) => item.id==id
  //     );
  //     if (filteredData) {
  //       setFormValues(filteredData);
  //     }
  //   }
  // }, [loanregister, id]);
  console.log(formValues);
  const handleChange = (section, field, value) => {
    setFormValues({
      ...formValues,
      [section]: {
        ...formValues[section],
        [field]: value,
      },
    });
    if(section==='tsrImposition' && field==='dateTime'){
      setImpdate(value)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    dispatch(editData({ formType: slug, values: formValues }));
    navigate(`/list/${slug}`);
  };

    const handleSave = () => {
    dispatch(saveData(id));
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">TSR  Form</h2>
      <Form onSubmit={handleSubmit} className="p-4 border rounded">
      <h5>TSR Imposition</h5>
      <Row>
        <Col md={6}><Form.Group><Form.Label>Date & Time</Form.Label><Form.Control type="datetime-local" value={formValues.tsrImposition?.dateTime} onChange={(e) => handleChange("tsrImposition", "dateTime", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Details</Form.Label><Form.Control type="text" value={formValues.tsrImposition.details} onChange={(e) => handleChange("tsrImposition", "details", e.target.value)} /></Form.Group></Col>
      </Row>
      <Row>
        <Col md={6}><Form.Group><Form.Label>Authority</Form.Label><Form.Control type="text" value={formValues.tsrImposition.authority} onChange={(e) => handleChange("tsrImposition", "authority", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Reason</Form.Label><Form.Control type="text" value={formValues.tsrImposition.reason} onChange={(e) => handleChange("tsrImposition", "reason", e.target.value)} /></Form.Group></Col>
      </Row>
       <Row>
              <Col md={6}><Form.Group><Form.Label>TC Name</Form.Label><Form.Control type="text"  value={formValues.tsrImposition.tcName}onChange={(e) => handleChange("tsrImposition", "tcName", e.target.value)} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>TC Emp. ID</Form.Label><Form.Control type="text"  value={formValues.tsrImposition.tcEmpId}onChange={(e) => handleChange("tsrImposition", "tcEmpId", e.target.value)} /></Form.Group></Col>
            </Row>
            <Row>
              <Col md={6}><Form.Group><Form.Label>ACC Name</Form.Label><Form.Control type="text" value={formValues.tsrImposition.accName} onChange={(e) => handleChange("tsrImposition", "accName", e.target.value)} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>ACC Emp. ID</Form.Label><Form.Control type="text"  value={formValues.tsrImposition.accEmpId}onChange={(e) => handleChange("tsrImposition", "accEmpId", e.target.value)} /></Form.Group></Col>
            </Row>
           
      <Form.Group><Form.Label>Remarks</Form.Label><Form.Control as="textarea" value={formValues.tsrImposition.remarks} onChange={(e) => handleChange("tsrImposition", "remarks", e.target.value)} /></Form.Group>
      
      <h5 className="mt-3">TSR Alteration</h5>
      <Row>
        <Col md={6}><Form.Group><Form.Label>Date & Time</Form.Label><Form.Control type="datetime-local" min={impdate} value={formValues.tsrAlteration.dateTime} onChange={(e) => handleChange("tsrAlteration", "dateTime", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Details</Form.Label><Form.Control type="text" value={formValues.tsrAlteration.details} onChange={(e) => handleChange("tsrAlteration", "details", e.target.value)} /></Form.Group></Col>
      </Row>
      <Row>
              <Col md={6}><Form.Group><Form.Label>TC Name</Form.Label><Form.Control type="text"  value={formValues.tsrAlteration.tcName}onChange={(e) => handleChange("tsrAlteration", "tcName", e.target.value)} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>TC Emp. ID</Form.Label><Form.Control type="text"  value={formValues.tsrAlteration.tcEmpId}onChange={(e) => handleChange("tsrAlteration", "tcEmpId", e.target.value)} /></Form.Group></Col>
            </Row>
            <Row>
              <Col md={6}><Form.Group><Form.Label>ACC Name</Form.Label><Form.Control type="text" value={formValues.tsrAlteration.accName} onChange={(e) => handleChange("tsrAlteration", "accName", e.target.value)} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>ACC Emp. ID</Form.Label><Form.Control type="text"  value={formValues.tsrAlteration.accEmpId}onChange={(e) => handleChange("tsrAlteration", "accEmpId", e.target.value)} /></Form.Group></Col>
            </Row>
      <Form.Group><Form.Label>Remarks</Form.Label><Form.Control as="textarea" value={formValues.tsrAlteration.remarks} onChange={(e) => handleChange("tsrAlteration", "remarks", e.target.value)} /></Form.Group>
      
      <h5 className="mt-3">TSR Cancellation</h5>
      <Row>
        <Col md={6}><Form.Group><Form.Label>Date & Time</Form.Label><Form.Control type="datetime-local" min={impdate} value={formValues.tsrCancellation.dateTime} onChange={(e) => handleChange("tsrCancellation", "dateTime", e.target.value)} /></Form.Group></Col>
        <Col md={6}><Form.Group><Form.Label>Authority</Form.Label><Form.Control type="text" value={formValues.tsrCancellation.authority} onChange={(e) => handleChange("tsrCancellation", "authority", e.target.value)} /></Form.Group></Col>
      </Row>
      <Row>
              <Col md={6}><Form.Group><Form.Label>TC Name</Form.Label><Form.Control type="text"  value={formValues.tsrCancellation.tcName}onChange={(e) => handleChange("tsrCancellation", "tcName", e.target.value)} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>TC Emp. ID</Form.Label><Form.Control type="text"  value={formValues.tsrCancellation.tcEmpId}onChange={(e) => handleChange("tsrCancellation", "tcEmpId", e.target.value)} /></Form.Group></Col>
            </Row>
            <Row>
              <Col md={6}><Form.Group><Form.Label>ACC Name</Form.Label><Form.Control type="text" value={formValues.tsrCancellation.accName} onChange={(e) => handleChange("tsrCancellation", "accName", e.target.value)} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>ACC Emp. ID</Form.Label><Form.Control type="text"  value={formValues.tsrCancellation.accEmpId}onChange={(e) => handleChange("tsrCancellation", "accEmpId", e.target.value)} /></Form.Group></Col>
            </Row>
      <Form.Group><Form.Label>Remarks</Form.Label><Form.Control as="textarea" value={formValues.tsrCancellation.remarks} onChange={(e) => handleChange("tsrCancellation", "remarks", e.target.value)} /></Form.Group>
      
      <Button type="submit" className="mt-3">Update</Button>
    </Form>
    </div>  );
};

export default EditTsrreg;
