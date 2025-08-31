import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/chanchal/PASDrillReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json"; // Update the path to your station.json

const PASDrillEdit = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const PASDrillList = useSelector((state) => state.pASDrill);
  console.log(PASDrillList.data.data);
  const [items, setItems] = useState([]);
  const itmm = PASDrillList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(PASDrillList.data.data);
  }, []);
  useEffect(() => {
    setItems(PASDrillList.data.data);
  }, [PASDrillList]);
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
    station: fd.station,
    name_of_sc: fd.name_of_sc,
    empid: fd.empid,
    disrecorded: fd.msg_disp_recoreded,
    discreated: fd.msg_disp_created,
    annorecorded: fd.msg_annc_recoreded,
    annomanual: fd.msg_annc_manual,
    pilocation: fd.pids_location,
    pistatus: fd.pids_status,
    palocation: fd.pas_location,
    pastatus: fd.pas_status,
    nameoftc: fd.nameoftc,
    empidoftc: fd.empidoftc,
    remark: fd.remark,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate("/list/pidspas-drill");
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PIDS/PAS Drill
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
                <h3 className="form-heading">Edit : PIDS/PAS Drill</h3>
                <div className="heading-line"></div>
              </div>

              <div className="row mb-3">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="inputDate" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={formValues.date}
                      id="inputDate"
                      onChange={(e) =>
                        setFormValues({ ...formValues, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputstation" className="form-label">
                      Station
                    </label>
                    <select
                      className="form-control"
                      id="station"
                      value={formValues.station}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          station: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select Station</option>
                      {stationData
                        .filter((station) => station["Station Name"]) // Exclude entries with null station names
                        .map((station) => (
                          <option
                            key={station["STATION Code"]}
                            value={station["Station Name"]}
                          >
                            {station["Station Name"]}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* <div className="col-md-6">
                    <label for="inputStation" className="form-label">
                      {" "}
                      Station{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.station}
                      id="inputStation"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          station: e.target.value,
                        })
                      }
                    />
                  </div> */}
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="inputname_of_sc" className="form-label">
                      {" "}
                      Name of sc{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.name_of_sc}
                      id="inputname_of_sc"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          name_of_sc: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputempid" className="form-label">
                      {" "}
                      Employee ID{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.empid}
                      id="inputempid"
                      onChange={(e) =>
                        setFormValues({ ...formValues, empid: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <h3 className="text-center">Message</h3>
                  <div className="col-md-6">
                    <h5 className="text-center">Displayed</h5>
                    <label for="inputdisrecorded" className="form-label">
                      Recorded
                    </label>
                    <input
                      type="Text"
                      className="form-control"
                      value={formValues.disrecorded}
                      id="inputdisrecorded"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          disrecorded: e.target.value,
                        })
                      }
                    />
                    <label for="inputdiscreated" className="form-label">
                      Created
                    </label>
                    <input
                      type="Text"
                      className="form-control"
                      value={formValues.discreated}
                      id="inputdiscreated"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          discreated: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6 ">
                    <h5 className="text-center">Announce</h5>

                    <label for="inputannorecorded" className="form-label">
                      Recorded
                    </label>
                    <input
                      type="Text"
                      className="form-control"
                      value={formValues.annorecorded}
                      id="inputannorecorded"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          annorecorded: e.target.value,
                        })
                      }
                    />
                    <label for="inputannomanual" className="form-label">
                      Manual
                    </label>
                    <input
                      type="Text"
                      className="form-control"
                      value={formValues.annomanual}
                      id="inputannomanual"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          annomanual: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <h5 className="text-center">PIDS</h5>
                  <div className="col-md-6 ">
                    <label for="inputpilocation" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.pilocation}
                      id="inputpilocation"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          pilocation: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6 ">
                    <label for="inputpistatus" className="form-label">
                      Status
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.pistatus}
                      id="inputpistatus"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          pistatus: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <h5 className="text-center">PAS</h5>
                  <div className="col-md-6 ">
                    <label for="inputpalocation" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.palocation}
                      id="inputpalocation"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          palocation: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6 ">
                    <label for="inputpastatus" className="form-label">
                      Status
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.pastatus}
                      id="inputpastatus"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          pastatus: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="inputnameoftc" className="form-label">
                      Name of TC
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.nameoftc}
                      id="inputnameoftc"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          nameoftc: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputempidoftc" className="form-label">
                      Emp. Id of TC
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.empidoftc}
                      id="inputempidoftc"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          empidoftc: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
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

export default PASDrillEdit;
