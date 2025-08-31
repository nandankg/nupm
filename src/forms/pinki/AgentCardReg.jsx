import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/pinki/AgentCardReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const AgentCardReg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const agentcard = useSelector((state) => state.agentcard);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (agentcard) {
      setSlug(agentcard.slug);
    }
  }, [agentcard]);

  const basicInitialValues = {
    time: time,
    name: "",
    designation: "",
    empid: "",
    date1: "",
    signature: "sign",
    cardno: "",
    date2: "",
    sign: "sign",
    remarks: "", //added
    actions: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      name: e.target.value,
                    })
                  }
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
                  required
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
                  required
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

export default AgentCardReg;
