import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/rajiv/OperationLiftRescueReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";

const user = JSON.parse(localStorage.getItem("userdata"));
const OperationLiftRescueEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const LiftRescueList = useSelector((state) => state.LiftRescue);
  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState();
  const itmm = LiftRescueList.data.data;
  useEffect(() => {
    dispatch(fetchData());
    setItems(LiftRescueList.data.data);
  }, []);
  useEffect(() => {
    setItems(LiftRescueList.data.data);
    setSlug(LiftRescueList.slug);
  }, [LiftRescueList]);
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
  }
  const fd = filteredData[0];
  const basicInitialValues = {
    id: fd.id,
    date: fd.date,
    station: fd.station,
    lift_no: fd.lift_no,
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
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: "Operation Lift Rescue form.pdf",
  });
  const handleSave = () => {
    dispatch(saveData(id));
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/">
              Lift Rescue Drill Register
            </Link>
            <Link underline="hover" color="inherit" to="/">
              Edit
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <button className="btn btn-primary" onClick={() => toPDF()}>
              <MdPictureAsPdf size={"25px"} color="#fff" />
              {/* Export To Pdf */}
            </button>
            <form onSubmit={handleSubmit}>
              <div ref={targetRef}>
                <div className="mb-3 form-heading-container"></div>
                <div className="row mb-3">
                  <div className="col-md-4">
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
                      disabled
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputESC.NO" className="form-label">
                      Name Of SC
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputESC.NO"
                      value={formValues.name_of_sc}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          name_of_sc: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputLift No." className="form-label">
                      Lift No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLift No."
                      value={formValues.lift_no}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          lift_no: e.target.value,
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
                  <div className="col-3">
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

                  <div className="col-3">
                    <label htmlFor="inputNameOfTC" className="form-label">
                      Name Of TC
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputNameOfTC"
                      value={formValues.name_of_tc}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          name_of_tc: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="inputEmpId" className="form-label">
                      Emp.Id Of Tc
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmpId"
                      value={formValues.TCEmploy_id}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          TCEmploy_id: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-3">
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

export default OperationLiftRescueEdit;
