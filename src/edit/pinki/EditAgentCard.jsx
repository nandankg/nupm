import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { editData, fetchData } from "../../reducer/pinki/AgentCardReducer";
import { formatDate } from "../../data/formatDate";

const EditAgentCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  console.log(id);
  const dispatch = useDispatch();
  const agentcard = useSelector((state) => state.agentcard);
  console.log(agentcard.data.data);
  const [items, setItems] = useState([]);
  const itmm = agentcard.data.data;
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(agentcard.data.data);
  }, []);

  useEffect(() => {
    setItems(agentcard.data.data);
    setSlug(agentcard.slug);
  }, [agentcard]);

  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

  const fd = filteredData ? filteredData[0] : {};

  const basicInitialValues = {
    id: fd.id || "",
    date1: fd.date1,
    date2: fd.date2,
    // time: fd.name || "",
    name: fd.name || "",
    designation: fd.designation || "",
    empid: fd.empid || "",
    signature: fd.agentcardversion || "",
    cardno: fd.cardno || "",
    sign: fd.agentcardversion || "",
    actions: fd.agentcardversion || "",
    remarks: fd.remarks || "",
    
    
    
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
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
              Agent Card
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading"> Agent Card Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputname" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputname"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputdesign" className="form-label">
                  Designation
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputdesign"
                  name="designation"
                  value={formValues.designation}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputempid" className="form-label">
                  Emp ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputempid"
                  name="empid"
                  value={formValues.empid}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputdate1" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputdate1"
                  name="date1"
                  value={formValues.date1}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputcardno" className="form-label">
                  Card No.
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputcardno"
                  name="cardno"
                  min="1"
                  value={formValues.cardno}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputdate2" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputdate2"
                  name="date2"
                  value={formValues.date2}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputremark" className="form-label">
                  Remark
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputremark"
                  name="remarks"
                  value={formValues.remarks}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="f-btn btn ">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAgentCard;
