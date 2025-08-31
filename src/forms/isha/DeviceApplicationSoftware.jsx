import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import {
  addSoftwareUpdate,
  addData,
} from "../../reducer/isha/DeviceApplicationSoftwareReducer";
import { formatDate, formatTime } from "../../data/formatDate";
const DeviceApplicationSoftware = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const dispatch = useDispatch();
  const software = useSelector((state) => state.Softwareupdate);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (software) {
      setSlug(software.slug);
    }
  }, [software]);

  const basicInitialValues = {
    date: formatDate(new Date().toDateString()),
    version: "",
    release_date: "",
    startdate: "",
    enddate: "",
    refno: "",
    safno: "",
    sign: "",
    remarks: "",
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
              Device Application Software
            </Link>
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
              List
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "95%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading"> Device Application Software</h3>
                <div
                  className="heading-line"
                  style={{ alignContent: "500px" }}
                ></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Software Version
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({ ...formValues, version: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    SW. Release Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputempid"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        release_date: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="time" style={{ textAlign: "center" }}>
                  <label for="inputhate" className="form-label">
                    Deployment
                  </label>
                </div>
                <div className="col-6" style={{ textAlign: "center" }}>
                  <label for="inputTimein" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputTimein"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        startdate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6" style={{ textAlign: "center" }}>
                  <label for="inputTimeout" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputTimeout"
                    onChange={(e) =>
                      setFormValues({ ...formValues, enddate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4" style={{ marginTop: "20px" }}>
                  <label for="inputTopic" className="form-label">
                    Release Note File Ref.No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTopic"
                    onChange={(e) =>
                      setFormValues({ ...formValues, refno: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4" style={{ marginTop: "20px" }}>
                  <label for="inputTopic" className="form-label">
                    PTW /SAF No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTopic"
                    onChange={(e) =>
                      setFormValues({ ...formValues, safno: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4" style={{ marginTop: "20px" }}>
                  <label for="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
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

export default DeviceApplicationSoftware;
