import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/akshra/InoutReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const EditInout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const INoutList = useSelector((state) => state.inoutreg);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (INoutList) {
      setSlug(INoutList.slug);
    }
  }, [INoutList]);
  console.log(INoutList.data.data);
  const [items, setItems] = useState([]);
  const itmm = INoutList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(INoutList.data.data);
  }, []);
  useEffect(() => {
    setItems(INoutList.data.data);
  }, [INoutList]);
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
    sno: " Number",
    filename: fd.filename,
    type: fd.type,
    sentby: fd.sentby,
    indate: fd.indate,
    time1: fd.intime,
    outdate: fd.outdate,
    time2: fd.outtime,
    markedto: fd.markedto,
    remarks: fd.remarks,
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
              IN/OUT DOCUMENT
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "75%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">IN/OUT REGISTER</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputFilename" className="form-label">
                    FILE NAME
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputFilename"
                    value={formValues.filename}
                    onChange={(e) =>
                      setFormValues({ ...formValues, filename: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputType" className="form-label">
                    TYPE
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputType"
                    value={formValues.type}
                    onChange={(e) =>
                      setFormValues({ ...formValues, type: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputSentby" className="form-label">
                    SENT BY
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputSentby"
                    value={formValues.sentby}
                    onChange={(e) =>
                      setFormValues({ ...formValues, sentby: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputIndate" className="form-label">
                    IN DATE
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={formValues.indate}
                    onChange={(e) =>
                      setFormValues({ ...formValues, indate: e.target.value })
                    }
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="inputTime" className="form-label">
                    TIME
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputTime"
                    name="appt"
                    min="09:00"
                    max="18:00"
                    value={formValues.time1}
                    onChange={(e) =>
                      setFormValues({ ...formValues, time1: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputOutdate" className="form-label">
                    OUT DATE
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputOutdate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={formValues.outdate}
                    onChange={(e) =>
                      setFormValues({ ...formValues, outdate: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputTime" className="form-label">
                    TIME
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputTime"
                    name="appt"
                    min="09:00"
                    max="18:00"
                    value={formValues.time2}
                    onChange={(e) =>
                      setFormValues({ ...formValues, time2: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputMarkedto" className="form-label">
                    MARKED TO
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputMarkedto"
                    placeholder=" marked"
                    value={formValues.markedto}
                    onChange={(e) =>
                      setFormValues({ ...formValues, markedto: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    value={formValues.remarks}
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
                    }
                  />
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

export default EditInout;
