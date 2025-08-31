import React from "react";
import { addData, addEscalator } from "../../reducer/monika/EscalatorReducer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, editData } from "../../reducer/monika/EscalatorReducer";
import { formatDate } from "../../data/formatDate";

function EscalatorEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);

  const EscalatorList = useSelector((state) => state.Escalator);
  console.log(EscalatorList.data.data);
  const [items, setItems] = useState([]);
  const itmm = EscalatorList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(EscalatorList.data.data);
  }, []);
  useEffect(() => {
    setItems(EscalatorList.data.data);
    setSlug(EscalatorList.slug);
  }, [EscalatorList]);
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
    date: formatDate(fd.date),
    station: fd.station,
    esc_no: fd.esc_no,
    operation_offon: fd.operation_offon,
    operation_emergency: fd.operation_emergency,
    from_time: fd.from_time,
    to_time: fd.to_time,
    timeTaken: fd.timeTaken,
    remarks: fd.remarks,
    Employ_id: fd.Employ_id,
    name_of_sc: fd.name_of_sc,
    Station_name: fd.Station_name,
    department: fd.department,
    TCEmploy_id: fd.TCEmploy_id,
    name_of_tc: fd.name_of_tc,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Replace 'addDocument' with the actual action creator from your redux slice
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/form/night_escalator_drill_register"
            >
              Escalator Drill
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                {/* <h3 className="form-heading"> Escalator Drill </h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputDate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDate"
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputESC.NO" className="form-label">
                    ESC. NO
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputESC.NO"
                    value={formValues.esc_no}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        esc_no: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputTimeFrom" className="form-label">
                    Time (From)
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputinputTimeFrom"
                    value={formValues.from_time}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        from_time: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputTimeTo" className="form-label">
                    Time (To)
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputinputTimeTo"
                    value={formValues.to_time}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        to_time: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputOperationModeOff" className="form-label">
                    Operation Mode(Off)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputOperationModeOff"
                    value={formValues.operation_offon}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        operation_offon: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="inputOperationModeEmergency"
                    className="form-label"
                  >
                    Operation Mode(Emergency)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputOperationModeEmergency"
                    value={formValues.operation_emergency}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        operation_emergency: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputTotalTimeTaken" className="form-label">
                    Total Time Taken
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTotalTimeTaken"
                    value={formValues.timeTaken}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        timeTaken: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className="col-3">
                  <label htmlFor="inputNameOfSC" className="form-label">
                    Name Of SC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNameOfSC"
                    value={formValues.name_of_sc}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        name_of_sc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="inputEmpId" className="form-label">
                    Emp.Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmpId"
                    value={formValues.Employ_id}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Employ_id: e.target.value,
                      })
                    }
                  />
                </div> */}
                <div className="col-6">
                  <label htmlFor="inputRemarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemarks"
                    value={formValues.remarks}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        remarks: e.target.value,
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
}

export default EscalatorEdit;
