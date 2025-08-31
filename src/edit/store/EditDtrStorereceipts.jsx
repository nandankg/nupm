import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
const EditDtrStorereceipts = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const navigate = useNavigate();
  const location = useLocation();
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
  
  }
  
  // if (items.length > 0) {
  //   filteredData = items.filter((itm) => itm.id === id);
  // }
  const fd = filteredData && filteredData[0] ? filteredData[0] : {};
  const basicInitialValues = {
    id: fd.id || "",
    date: fd.date || "",
    station: fd.station || "",
    scEmp:  fd.scEmp || "",
    scName: fd.scName || "",
    craEmp: fd.craEmp || "",
    craName: fd.craName || "",
    openingStock: fd.openingStock || "",
    transactions: fd.transactions || "",
    closingStock:fd.closingStock || "",

     
    };
   const [formValues, setFormValues] = useState(basicInitialValues);
   const [formData, setFormData] = useState(basicInitialValues);
  
    useEffect(() => {
      if (fd) {
        setFormValues(basicInitialValues);
      }
    }, [fd]);


  // Initialize form values when data is loaded
  // useEffect(() => {
  //   if (loanregister?.data?.data) {
  //     id=parseInt(id)
  //     const filteredData = loanregister.data.data.find(
  //       (item) => item.id === id
  //     );
  //     if (filteredData) {
  //       setFormData(filteredData);
  //     }
  //   }
  // }, [loanregister, id]);
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStockChange = (type, field, value) => {
    setFormData({ ...formData, [type]: { ...formData[type], [field]: value } });
  };

  const handleTransactionChange = (index, field, value) => {
    const updatedTransactions = [...formData.transactions];
    updatedTransactions[index] = { ...updatedTransactions[index], [field]: value };
    setFormData({ ...formData, transactions: updatedTransactions });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData({ formType: slug, values: formData }));
    navigate(`/list/${slug}`);
  };

    const handleSave = () => {
    dispatch(saveData(id));
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Edit Stock Movement</h2>
      <Form onSubmit={handleSubmit} className="p-4 border rounded">
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Station</Form.Label>
            <Form.Control type="text" name="station" value={formData.station} onChange={handleChange} required />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>SC Emp</Form.Label>
            <Form.Control type="text" name="scEmp" value={formData.scEmp} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>SC Name</Form.Label>
            <Form.Control type="text" name="scName" value={formData.scName} onChange={handleChange} required />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>CRA Emp</Form.Label>
            <Form.Control type="text" name="craEmp" value={formData.craEmp} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>CRA Name</Form.Label>
            <Form.Control type="text" name="craName" value={formData.craName} onChange={handleChange} required />
          </Form.Group>
        </Col>
      </Row>
      <h5 className="mt-3">Opening Stock</h5>
      <Row>
        {Object.keys(formData.openingStock).map((key) => (
          <Col md={2} key={key}>
            <Form.Group>
              <Form.Label>{key}</Form.Label>
              <Form.Control type="number" value={formData.openingStock[key]} onChange={(e) => handleStockChange("openingStock", key, e.target.value)} />
            </Form.Group>
          </Col>
        ))}
      </Row>
      
      <h5 className="mt-3">Stock Transactions</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Issue Card ID</th>
            <th>Card Type</th>
            <th>Tick if Sold</th>
            <th>Status</th>
            <th>CSC ID</th>
            <th>AFC Amt</th>
            <th>Actual</th>
            <th>Diff</th>
          </tr>
        </thead>
        <tbody>
          {formData.transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><Form.Control type="text" value={transaction.issueCardId} onChange={(e) => handleTransactionChange(index, "issueCardId", e.target.value)} /></td>
              <td><Form.Control type="text" value={transaction.cardType} onChange={(e) => handleTransactionChange(index, "cardType", e.target.value)} /></td>
              <td><Form.Check type="checkbox" checked={transaction.sold} onChange={(e) => handleTransactionChange(index, "sold", e.target.checked)} /></td>
              <td><Form.Control type="text" value={transaction.status} onChange={(e) => handleTransactionChange(index, "status", e.target.value)} /></td>
              <td><Form.Control type="text" value={transaction.cscId} onChange={(e) => handleTransactionChange(index, "cscId", e.target.value)} /></td>
              <td><Form.Control type="number" value={transaction.afcAmt} onChange={(e) => handleTransactionChange(index, "afcAmt", e.target.value)} /></td>
              <td><Form.Control type="number" value={transaction.actual} onChange={(e) => handleTransactionChange(index, "actual", e.target.value)} /></td>
              <td><Form.Control type="number" value={transaction.diff} onChange={(e) => handleTransactionChange(index, "diff", e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <h5 className="mt-3">Closing Stock</h5>
      <Row>
        {Object.keys(formData.closingStock).map((key) => (
          <Col md={2} key={key}>
            <Form.Group>
              <Form.Label>{key}</Form.Label>
              <Form.Control type="number" value={formData.closingStock[key]} onChange={(e) => handleStockChange("closingStock", key, e.target.value)} />
            </Form.Group>
          </Col>
        ))}
      </Row>
      
      <Button type="submit" className="mt-3">Submit</Button>
    </Form>
    </div>  );
};

export default EditDtrStorereceipts;
