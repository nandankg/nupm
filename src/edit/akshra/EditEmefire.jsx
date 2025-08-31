import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
} from "../../reducer/akshra/EmefiremandrillReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const EditEmefire = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const emefireList = useSelector((state) => state.emedrill);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (emefireList) {
      setSlug(emefireList.slug);
    }
  }, [emefireList]);

  console.log(emefireList.data.data);
  const [items, setItems] = useState([]);
  const itmm = emefireList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(emefireList.data.data);
  }, []);
  useEffect(() => {
    setItems(emefireList.data.data);
  }, [emefireList]);
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
    date: fd.date,
    station: fd.station,
    pflevel1: fd.fireman_pflevel,
    concourse1: fd.fireman_concourse,
    ground1: fd.fireman_ground,
    pflevel: fd.emergency_pflevel,
    concourse: fd.emergency_concourse,
    ground: fd.emergency_ground,
    detailsofthedrillperformed: fd.detailsofthedrillperformed,
    nameofsc: fd.nameofsc,
    empid: fd.empid,
    sigofsc: fd.sigofsc,
    remark: fd.remark1,
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
              EMERGENCY/FIREMAN EXIT DRILL REGISTER
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
                  {" "}
                  EDIT: EMERGENCY/FIREMAN EXIT DRILL REGISTER
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputStation" className="form-label">
                    Station
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputStation"
                    value={formValues.station}
                    onChange={(e) =>
                      setFormValues({ ...formValues, station: e.target.value })
                    }
                  />
                </div>
              </div>
              <b>FIREMAN EXIT DOOR STATUS</b>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor=" inputPflevel1" className="form-label">
                    PF LEVEL1
                  </label>

                  <input
                    className="form-check-input ms-1"
                    type="checkbox"
                    name="checkboxNoLabel1"
                    id="checkboxNoLabel1"
                    aria-label="..."
                    value={formValues.pflevel1}
                    onChange={(e) =>
                      setFormValues({ ...formValues, pflevel1: e.target.value })
                    }
                  />
                </div>
                <div className="col -md -6">
                  <label htmlFor="inputConcourse1" className="form-label">
                    Concourse1
                  </label>
                  <input
                    className="form-check-input ms-1"
                    type="checkbox"
                    name="checkboxNoLabel1"
                    id="checkboxNoLabel1"
                    aria-label="..."
                    value={formValues.concourse1}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        concourse1: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputGround" className="form-label">
                    Ground1
                  </label>
                  <input
                    className="form-check-input ms-1"
                    type="checkbox"
                    name="checkboxNoLabel1"
                    id="checkboxNoLabel1"
                    aria-label="..."
                    value={formValues.concourse1}
                    onChange={(e) =>
                      setFormValues({ ...formValues, ground1: e.target.value })
                    }
                  />
                </div>
              </div>

              <b> EMERGENCY EXIT DOOR STATUS</b>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputPflevel" className="form-label">
                    PF Level2
                  </label>
                  <input
                    className="form-check-input ms-1"
                    type="checkbox"
                    name="checkboxNoLabel1"
                    id="checkboxNoLabel2"
                    aria-label="..."
                    value={formValues.pflevel}
                    onChange={(e) =>
                      setFormValues({ ...formValues, pflevel: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputConcourse" className="form-label">
                    Concourse2
                  </label>
                  <input
                    className="form-check-input ms-1"
                    type="checkbox"
                    name="checkboxNoLabel1"
                    id="checkboxNoLabel2"
                    aria-label="..."
                    value={formValues.concourse}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        concourse: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputGround" className="form-label">
                    Ground2
                  </label>
                  <input
                    className="form-check-input ms-1"
                    type="checkbox"
                    name="checkboxNoLabel2"
                    id="checkboxNoLabel2"
                    aria-label="..."
                    value={formValues.ground}
                    onChange={(e) =>
                      setFormValues({ ...formValues, ground: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label
                    htmlFor="inputDetailsofthedrillperformed"
                    className="form-label"
                  >
                    Details Of the drill performed
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDetailsofthedrillperformed"
                    value={formValues.detailsofthedrillperformed}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        detailsofthedrillperformed: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputNameofsc" className="form-label">
                    Name of SC
                  </label>
                  <input
                    type="current user"
                    className="form-control"
                    id="inputNameofsc"
                    value={formValues.nameofsc}
                    onChange={(e) =>
                      setFormValues({ ...formValues, nameofsc: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputEmpid" className="form-label">
                    Emp.id
                  </label>
                  <input
                    type="empid"
                    className="form-control"
                    id="inputEmpid"
                    value={formValues.empid}
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputSignofsc" className="form-label">
                    Signature of SC
                  </label>
                  <input
                    type="sign"
                    className="form-control"
                    id="inputSignofsc"
                    value={formValues.sigofsc}
                    onChange={(e) =>
                      setFormValues({ ...formValues, sigofsc: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">
                    RemarkS
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    value={formValues.remark}
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

export default EditEmefire;
