import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/isha/GrievanceReducer";
import { formatDate, formatTime } from "../../data/formatDate";
const Grievance = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
 
  const dispatch = useDispatch();
  const grievanc = useSelector((state) => state.grievance);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (grievanc) {
      setSlug(grievanc.slug);
    }
  }, [grievanc]);
  const basicInitialValues = {
    date:  formatDate(new Date().toDateString()),
    Test_date:"",
    employee_no :"",
    noe: "",
    des: "",
    gd: "",
    remark: "",
    io:"",
    sign:"",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
            GRIEVANCE REGISTER
            </Link>
            <Link underline="hover" color="inherit" >
            Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{maxWidth:"95%"}}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading"> GRIEVANCE REGISTER</h3>
                <span className="line-box" style={{ width: "300px" }}></span>
              </div>
              <div className="row mb-3">
              <div className="col-md-4">
                <label for="inputchangeTo" className="form-label">
                Emp Name
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputchangeTo"
                  onChange={(e) =>
                    setFormValues({ ...formValues, noe: e.target.value })
                  }
                 
                />
              </div>
                <div className="col-4">
                <label for="inputreason" className="form-label">
                Designation
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputreason"
                  onChange={(e) =>
                    setFormValues({ ...formValues, des: e.target.value })
                  }
                 
                />
              </div>
              <div className="col-4">
                <label for="inputreason" className="form-label">
                Emp ID
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputreason"
                  onChange={(e) =>
                    setFormValues({ ...formValues, employee_no: e.target.value })
                  }
                 
                />
              </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputchangeTo" className="form-label">
                Test Date
                </label>
                <input
                  type="date"required
                  className="form-control"
                  id="inputchangeTo"
                  onChange={(e) =>
                    setFormValues({ ...formValues, Test_date: e.target.value })
                  }
                 
                />
              </div>
                <div className="col-6">
                <label for="inputreason" className="form-label">
                Grievance Details
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputreason"
                  onChange={(e) =>
                    setFormValues({ ...formValues, gd: e.target.value })
                  }
                 
                />
              </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputchangeTo" className="form-label">
                Inspecting offical Name
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputchangeTo"
                  onChange={(e) =>
                    setFormValues({ ...formValues, io: e.target.value })
                  }
                 
                />
              </div>
                
              <div className="col-6">
                <label for="inputreason" className="form-label">
                Emp ID
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputreason"
                  onChange={(e) =>
                    setFormValues({ ...formValues, sign: e.target.value })
                  }
                 
                />
              </div>
              </div>
              <div className="row">
              <div className="col-md-12">
                  <label for="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
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

export default Grievance;
