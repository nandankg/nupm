import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addComRecReg, addData } from "../../reducer/chanchal/ComRecRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../data/formatDate";

const ComRecRegReg = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const ComRecRegList = useSelector((state) => state.comRecReg);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (ComRecRegList) {
      setSlug(ComRecRegList.slug);
    }
  }, [ComRecRegList]);

  const basicInitialValues = {
    S_No: sNo,
    Name: "",
    Empid: "",
    Designation: "",
    CompType: "",
    CompValFrom: "",
    NextComDueDate: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    console.log(formValues);
    // const newSrno = sNo + 1;
    // setSNo(newSrno);
    // navigate("/list/competency-record-register");
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Competency Record Register
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
                <h3 className="form-heading">Competency Record Register </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    {" "}
                    Name{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputEmp" className="form-label">
                    {" "}
                    Emp id{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmp"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Empid: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 ">
                  <label for="inputDesignation" className="form-label">
                    Designation
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputlocation"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Designation: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputCompType" className="form-label">
                    Competency Type
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputCompType"
                    onChange={(e) =>
                      setFormValues({ ...formValues, CompType: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputCompValFrom" className="form-label">
                    Competency Valid From
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputCompValFrom"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        CompValFrom: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-6">
                  <label for="inputNextComDueDate" className="form-label">
                    Next Competency Due Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputNextComDueDate"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        NextComDueDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary px-3">
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

export default ComRecRegReg;
