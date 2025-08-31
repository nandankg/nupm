import React, { useState, useEffect } from "react";

import { addAgent, addData } from "../../reducer/akshra/AgentissueReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const Agentissue = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  //const [station, setStation] = useState("Ranchi");
  // const [afcgateno, setAfcgateno] = useState("123");
  const AGentissueList = useSelector((state) => state.agent);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (AGentissueList) {
      setSlug(AGentissueList.slug);
    }
  }, [AGentissueList]);
  const basicInitialValues = {
    //date: date.toDateString(),

    sno: sNo,
    name: "current user",
    designation: "",
    empid: "empid",
    date: "",
    //signature: "sign",
    cardno: "",
    date2: "",
    //sign: "sign",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    const newsno = sNo + 1;
    setSNo(newsno);

    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              AGENT ID ISSUE CARD
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">AGENT ID ISSUE CARD REGISTER</h3>
                <div className="heading-line"></div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputName" className="form-label">
                    NAME
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputDesignation" className="form-label">
                    DESIGNATION
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputDesignation"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        designation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputEmpid" className="form-label">
                    EMP ID
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputEmpid"
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputDate" className="form-label">
                    DATE
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputDate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                {/*  <div className="col-6">
                  <label htmlFor="inputSignature" className="form-label">
                    SIGNATURE
                  </label>
                  <input
                    type="sign"
                    className="form-control"
                    id="inputSignature"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signature: e.target.value,
                      })
                    }
                  />
                </div>*/}
                <div className="col-6">
                  <label htmlFor="inputCardno" className="form-label">
                    CARD NO.
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="inputCardno"
                    min="1"
                    onChange={(e) =>
                      setFormValues({ ...formValues, cardno: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputDate2" className="form-label">
                    DATE
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    id="inputDate2"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date2: e.target.value })
                    }
                  />
                </div>
                {/*<div className="col-6">
                  <label htmlFor="inputSign" className="form-label">
                    SIGNATURE
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSign"
                    onChange={(e) =>
                      setFormValues({ ...formValues, sign: e.target.value })
                    }
                  />
                </div>*/}
              </div>

              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary">
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

export default Agentissue;
