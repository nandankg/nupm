import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../reducer/IncidentRegisterSignalsReducer";
import { Breadcrumbs } from "@mui/material";
import { formatDate } from "../data/formatDate";

const EditIncident = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const incidentregister = useSelector((state) => state.data);
  console.log(incidentregister.data.data);
  const [items, setItems] = useState([]);
  const itmm = incidentregister.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
    setItems(incidentregister.data.data);
  }, []);
  useEffect(() => {
    setItems(incidentregister.data.data);
  }, [incidentregister]);
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
    S_No: fd.sNo,
    date: formatDate(new Date().toDateString()),
    time: fd.time,
    details: fd.details,
    reportedto: fd.reportedto,
    sign: fd.sign,
    remarks: fd.remarks,
    empid: fd.empid,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate("/incidentlist");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Incident Signals
            </Link>
            <Link underline="hover" color="inherit">
              Edit
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  EDIT: Incident Register Signals
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputdetails" className="form-label">
                    Details Of Incident
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdetails"
                    onChange={(e) =>
                      setFormValues({ ...formValues, details: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputreported to" className="form-label">
                    Reported To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reportedto: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputempid"
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-12">
                  <label for="inputremarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
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

export default EditIncident;
