import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
} from "../../reducer/monika/IncidentRegisterSignalsReducer";
import { Breadcrumbs } from "@mui/material";
import { formatDate } from "../../data/formatDate";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditIncident = () => {
  const navigate = useNavigate();
  const [slug, setSlug] = useState(getLastParameter().trim());
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
    empname:fd.empname,
    desig:fd.desig,
    remarks: fd.remarks,
    empid: fd.empid,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
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
                <div className="col-md-6">
                  <label for="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                     value={formValues.date}
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputtime" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputtime"
                    value={formValues.time}
                    onChange={(e) =>
                      setFormValues({ ...formValues, time: e.target.value })
                    }
                  />
                </div>
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
                    value={formValues.details}
                    onChange={(e) =>
                      setFormValues({ ...formValues, details: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-4">
                  <label for="inputreported to" className="form-label">
                  Reported by
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    value={formValues.empname}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        empname: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputreported to" className="form-label">
                  Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    value={formValues.desig}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        desig: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputreported to" className="form-label">
                  Emp ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    value={formValues.empid}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        empid: e.target.value,
                      })
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

                

                <div className="col-md-12">
                  <label for="inputremarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    value={formValues.remarks}
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
