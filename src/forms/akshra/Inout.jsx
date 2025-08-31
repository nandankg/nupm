import React, { useState, useEffect } from "react";

import { addInout, addData } from "../../reducer/akshra/InoutReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const Inout = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const INoutList = useSelector((state) => state.inoutreg);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (INoutList) {
      setSlug(INoutList.slug);
    }
  }, [INoutList]);
  //const [station, setStation] = useState("Ranchi");
  // const [afcgateno, setAfcgateno] = useState("123");
  const basicInitialValues = {
    //date: date.toDateString(),

    sno: sNo,
    filename: "",
    type: "empid",
    sentby: "",
    indate: "",
    time1: "",
    outdate: "",
    time2: "",
    markedto: "",
    remarks: "",
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
              IN/OUT DOCUMENT
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "75%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">IN/OUT REGISTER</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputFilename" className="form-label">
                    FILE NAME
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputFilename"
                    onChange={(e) =>
                      setFormValues({ ...formValues, filename: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputType" className="form-label">
                    TYPE
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputType"
                    onChange={(e) =>
                      setFormValues({ ...formValues, type: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputSentby" className="form-label">
                    SENT BY
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputSentby"
                    onChange={(e) =>
                      setFormValues({ ...formValues, sentby: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputIndate" className="form-label">
                    IN DATE
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({ ...formValues, indate: e.target.value })
                    }
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="inputTime" className="form-label">
                    TIME
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputTime"
                    placeholder="Time"
                    onChange={(e) =>
                      setFormValues({ ...formValues, time1: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputOutdate" className="form-label">
                    OUT DATE
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputOutdate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({ ...formValues, outdate: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputTime" className="form-label">
                    TIME
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputTime"
                    placeholder="Time"
                    onChange={(e) =>
                      setFormValues({ ...formValues, time2: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputMarkedto" className="form-label">
                    MARKED TO
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputMarkedto"
                    placeholder=" marked"
                    onChange={(e) =>
                      setFormValues({ ...formValues, markedto: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
                    }
                  />
                </div>
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

export default Inout;
