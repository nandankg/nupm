import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/chanchal/EquFaiRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";

const EquFaiRegEdit = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const EquFaiRegList = useSelector((state) => state.assuReg);
  console.log(EquFaiRegList.data.data);
  const [items, setItems] = useState([]);
  const itmm = EquFaiRegList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(EquFaiRegList.data.data);
  }, []);
  useEffect(() => {
    setItems(EquFaiRegList.data.data);
  }, [EquFaiRegList]);
  let dt = [];
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
    S_No: sNo,
    date: formatDate(new Date().toDateString()),
    time: fd.time,
    location: fd.location,
    type: fd.equipment_type,
    no: fd.equipment_no,
    natdetfai: fd.nature_details,
    reportedto: fd.reported_to,
    reportedtime: fd.reported_time,
    signSM: fd.signSM,
    rectifiedtime: fd.action_time,
    redate: fd.action_date,
    remarkConstaff: fd.concern_remarks,
    signConStaff: fd.signConStaff,
    signatureSM: fd.signatureSM,
    remark: fd.remarks,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate("/list/equipment_failure_register");
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Equipment Failure Station Register
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
                <h3 className="form-heading">
                  Edit : Equipment Failure Station Register{" "}
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-6 ">
                  <label for="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={formValues.date}
                    id="inputdate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>

                <div className="col-6 ">
                  <label for="inputtime" className="form-label">
                    {" "}
                    Time{" "}
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    value={formValues.time}
                    id="inputtime"
                    onChange={(e) =>
                      setFormValues({ ...formValues, time: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6 ">
                  <label for="inputlocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.location}
                    id="inputlocation"
                    onChange={(e) =>
                      setFormValues({ ...formValues, location: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputnatdetfai" className="form-label">
                    Nature & Details of failure
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.natdetfai}
                    id="inputnatdetfai"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        natdetfai: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3 border">
                <h5>Equipment </h5>
                <label for="inputtype" className="form-label">
                  Type
                </label>
                <input
                  type="Text"
                  className="form-control"
                  value={formValues.type}
                  id="inputtype"
                  onChange={(e) =>
                    setFormValues({ ...formValues, type: e.target.value })
                  }
                />
                <label for="inputno" className="form-label">
                  No.
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={formValues.no}
                  id="inputno"
                  onChange={(e) =>
                    setFormValues({ ...formValues, no: e.target.value })
                  }
                />

                <h5> Action Taken</h5>
                <label for="inputrectifiedtime" className="form-label">
                  Rectified Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  value={formValues.rectifiedtime}
                  id="inputrectifiedtime"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      rectifiedtime: e.target.value,
                    })
                  }
                />
                <label for="inputredate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={formValues.redate}
                  id="inputredate"
                  onChange={(e) =>
                    setFormValues({ ...formValues, redate: e.target.value })
                  }
                />
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputreportedto" className="form-label">
                    Reported To
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.reportedto}
                    id="inputreportedto"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reportedto: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-4">
                  <label for="inputreportedtime" className="form-label">
                    Reported Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    value={formValues.reportedtime}
                    id="inputreportedtime"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reportedtime: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputsignSM" className="form-label">
                    {" "}
                    Name of SM/SC{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.signSM}
                    id="inputsignSM"
                    onChange={(e) =>
                      setFormValues({ ...formValues, signSM: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputremarkConstaff" className="form-label">
                    Remark of Concern Staff
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.remarkConstaff}
                    id="inputremarkConstaff"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        remarkConstaff: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6 ">
                  <label for="inputsignConStaff" className="form-label">
                    Name Concern Staff
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.signConStaff}
                    id="inputsignConStaff"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signConStaff: e.target.value,
                      })
                    }
                  />
                </div>

                {/* <div className="col-md-6">
                  <label for="inputsignatureSM" className="form-label">
                    signature SM/SC
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.signatureSM}
                    id="inputsignatureSM"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signatureSM: e.target.value,
                      })
                    }
                  />
                </div> */}
                <div className="col-md-6">
                  <label for="inputCity" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.remark}
                    id="inputCity"
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

export default EquFaiRegEdit;
