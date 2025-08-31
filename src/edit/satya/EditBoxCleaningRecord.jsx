import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  addCleaning,
  addData,
  editData,
  fetchData,
} from "../../reducer/satya/BoxCleaningRecordReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import stationData from "../../station.json";

const EditBoxCleaningRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const boxcleaning = useSelector((state) => state.boxindoor);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(boxcleaning.data.data);
  const [items, setItems] = useState([]);
  const itmm = boxcleaning.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(boxcleaning.data.data);
  }, []);
  useEffect(() => {
    if (boxcleaning) {
      setSlug(boxcleaning.slug);
    }
  }, [boxcleaning]);
  let dt = [];
  let filteredData;
  console.log(itmm);
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
    station: fd.station,
    cabinet: fd.cabinet,
    dateofmaintenance: fd.dateofmaintenance,
    maintenanceschedule: fd.maintenanceschedule,
    checklist1: fd.checklist1,
    checklist2: fd.checklist2,
    checklist3: fd.checklist3,
    blank1: fd.blank1,
    blank2: fd.blank2,
    blank3: fd.blank3,
    remarks: fd.remarks,
    countersign:fd.countersign,
    name: fd.name,
    designation: fd.designation,
    empno: fd.empno,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  const { toPDF, targetRef } = usePDF({
    filename: "Indoor Box Cleaning Form.pdf",
  });

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Cleaning Activity-Indoor
            </Link>
            <Link underline="hover" color="inherit">
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
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  EDIT: BOX CLEANING QUATERLY MAINTENANCE RECORD
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputmaintenanceschedule" className="form-label">
                    Maintenance Schedule
                  </label>
                  <select
                    className="form-control"
                    id="inputmaintenanceschedule"
                    value={formValues.maintenanceschedule}
                    onChange={(e) =>
                      setFormValues({ ...formValues, station: e.target.value })
                    }
                  >
                  <option>None</option>
                    <option>JAN-MAR</option>
                    <option>APR-JUN</option>
                    <option>JUL-SEP</option>
                    <option>OCT-DEC.</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputstation" className="form-label">
                    Station
                  </label>
                  <select
                    className="form-control"
                    id="inputmonth"
                    value={formValues.station}
                    onChange={(e) =>
                      setFormValues({ ...formValues, station: e.target.value })
                    }
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
                <div className="col-md-4">
                  <label for="inputcabinet" className="form-label">
                    Cabinet
                  </label>
                  <select
                    className="form-control"
                    id="inputcabinet"
                    value={formValues.cabinet}
                    onChange={(e) =>
                      setFormValues({ ...formValues, cabinet: e.target.value })
                    }
                  >
                           <option style={{ textAlign: "center" }}>--select--</option>
                    BoxCleaningRecord     <option>N/A</option>
                  <option>RC</option>
                  <option>BTN</option>
                  <option>CLC</option>
                  <option>ZC</option>
                  <option>LC</option>
                  <option>ATS</option>
                  <option>SMIO</option>
                  <option>PDU</option>
                  <option>ACC</option>
                  <option>OTHER</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label for="inputcubicalname" className="form-label">
                    Date of Maintenance
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputcubicalname"
                    value={formValues.dateofmaintenance}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        dateofmaintenance: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-md-8" style={{ textAlign: "left" }}>
                  Cleaning activity-Indoor
                </label>
                <label className="col-md-6" style={{ textAlign: "center" }}>
                  Done or Not
                </label>
              </div>
              <div
                className="row"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Cleaning of Boxes/Cubical
                </label>

                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputmonth"
                    value={formValues.checklist1}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        checklist1: e.target.value,
                      })
                    }
                  >
                    <option>N/A</option>
                    <option>Done</option>
                    <option>Checked OKAY</option>
                    <option>Checked NOT OKAY</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.blank1}
                    id="inputtext"
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank1: e.target.value })
                    }
                  />
                </div>
              </div>
              <div
                className="row mb-3"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Checking of proper dressing of cubical
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    value={formValues.checklist2}
                    id="inputmonth"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        checklist2: e.target.value,
                      })
                    }
                  >
                    <option>N/A</option>
                    <option>Done</option>
                    <option>Checked OKAY</option>
                    <option>Checked NOT OKAY</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    value={formValues.blank2}
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank2: e.target.value })
                    }
                  />
                </div>
              </div>
              <div
                className="row mb-3"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <label className="col-md-6" style={{ textAlign: "left" }}>
                  Verification of terminal condition
                </label>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    id="inputmonth"
                    value={formValues.checklist3}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        checklist3: e.target.value,
                      })
                    }
                  >
                    <option>N/A</option>
                    <option>Done</option>
                    <option>Checked OKAY</option>
                    <option>Checked NOT OKAY</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    id="inputtext"
                    value={formValues.blank3}
                    onChange={(e) =>
                      setFormValues({ ...formValues, blank3: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
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
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputremarks" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    value={formValues.name}
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                 
                  />
                </div>
                 <div className="col-md-4">
                  <label for="inputremarks" className="form-label">
                   EMP No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    value={formValues.countersign}
                    onChange={(e) =>
                      setFormValues({ ...formValues, countersign: e.target.value })
                    }
                 
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputremarks" className="form-label">
                   Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                     value={formValues.designation}
                    onChange={(e) =>
                      setFormValues({ ...formValues, designation: e.target.value })
                    }
                 
                  />
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary px-3" style={{width:"100px", height: "50px", textAlign: "center"}}>
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

export default EditBoxCleaningRecord;
