import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { editData, fetchData } from "../../reducer/manshi/LabFaultyReducer";

const Editlab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const LabF = useSelector((state) => state.Lab);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (LabF) {
      setSlug(LabF.slug);
    }
  }, [LabF]);
  console.log(LabF.data.data);
  const [items, setItems] = useState([]);
  const itmm = LabF.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(LabF.data.data);
  }, [dispatch]);

  useEffect(() => {
    setItems(LabF.data.data);
  }, [LabF]);

  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  const fd = filteredData[0];

  const basicInitialValues = {
    id: fd.id,
    date: fd.date,
    ReceivedFrom: fd.ReceivedFrom,
    Description: fd.Description,
    ItemSerialNumber: fd.ItemSerialNumber,
    EFRNo: fd.EFRNo,
    DateOfReplacement: fd.EFRNo_Date,
    TestingLocation: fd.TestingLocation,
    DateTestingFrom: fd.DateTestingFrom,
    DateTestingTo: fd.DateTestingTo,
    FinalStatus: fd.FinalStatus,
    TestingStaff: fd.TestingStaff,
    Remark: fd.Remark,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Lab Faulty Register
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading">Lab Faulty Item Register</h3>
                <div className="heading-line"></div>
              </div>
              {/* First Row: Received From, EFR No & Date of Replacement */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label
                    htmlFor="ReceivedFrom"
                    style={{ textAlign: "left", display: "block" }}
                  >
                    Received From (With Gear ID)
                  </label>
                  <input
                    type="text"
                    id="ReceivedFrom"
                    name="ReceivedFrom"
                    value={formValues.ReceivedFrom}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="EFRNoAndDate"
                    style={{ textAlign: "left", display: "block" }}
                  >
                    EFR No & Date of Replacement
                  </label>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        id="EFRNo"
                        name="EFRNo"
                        value={formValues.EFRNo}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="EFR No"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="date"
                        id="DateOfReplacement"
                        name="DateOfReplacement"
                        value={formValues.DateOfReplacement}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Second Row: Item Description, Item Serial Number */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="Description">Item Description</label>
                  <input
                    type="text"
                    id="Description"
                    name="Description"
                    value={formValues.Description}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="ItemSerialNumber">Item Serial Number</label>
                  <input
                    type="text"
                    id="ItemSerialNumber"
                    name="ItemSerialNumber"
                    value={formValues.ItemSerialNumber}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Third Row: Testing Location, Date of Testing From */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="TestingLocation">Testing Location</label>
                  <input
                    type="text"
                    id="TestingLocation"
                    name="TestingLocation"
                    value={formValues.TestingLocation}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="TestingStaff">Name of Testing Staff</label>
                  <input
                    type="text"
                    id="TestingStaff"
                    name="TestingStaff"
                    value={formValues.TestingStaff}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Fourth Row: Date of Testing To, Final Status, Testing Staff */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="DateTestingTo">Date of Testing To</label>
                  <input
                    type="date"
                    id="DateTestingTo"
                    name="DateTestingTo"
                    value={formValues.DateTestingTo}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="FinalStatus">Final Status</label>
                  <input
                    type="text"
                    id="FinalStatus"
                    name="FinalStatus"
                    value={formValues.FinalStatus}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="TestingStaff">Date of Testing From</label>
                  <input
                    type="date"
                    id="DateTestingFrom"
                    name="DateTestingFrom"
                    value={formValues.DateTestingFrom}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Fifth Row: Remark */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="Remark">Remark</label>
                  <input
                    type="text"
                    id="Remark"
                    name="Remark"
                    value={formValues.Remark}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary px-3">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editlab;
