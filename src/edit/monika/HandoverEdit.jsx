import React from "react";
import {
  fetchData,
  editData,
} from "../../reducer/monika/HandoverrecordReducer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../data/formatDate";

function HandoverEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const handoverlist = useSelector((state) => state.handover);
  console.log(handoverlist.data.data);
  const [items, setItems] = useState([]);
  const itmm = handoverlist.data.data;
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(handoverlist.data.data);
  }, []);
  useEffect(() => {
    setItems(handoverlist.data.data);
    setSlug(handoverlist.slug);
  }, [handoverlist]);
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
    time: fd.time,
    changeTo: fd.changeTo,
    changeFrom: fd.changeFrom,
    reason: fd.reason,
    signOfSC: fd.signOfSC,
    remark: fd.remark,
    Employ_id: fd.Employ_id,
    department: fd.department,
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
            <Link
              underline="hover"
              color="inherit"
              to="/form/control-take-over-handover-register"
            >
              Handover Record
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
                {/* <h3 className="form-heading"> Handover Record Register</h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label for="inputTime" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputTime"
                    value={formValues.time}
                    onChange={(e) =>
                      setFormValues({ ...formValues, time: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label for="inputchangedFrom" className="form-label">
                    Change From
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputchangedFrom"
                    value={formValues.changeFrom}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        changeFrom: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label for="inputchangeTo" className="form-label">
                    Change To
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputchangeTo"
                    value={formValues.changeTo}
                    onChange={(e) =>
                      setFormValues({ ...formValues, changeTo: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-3">
                  <label for="inputreason" className="form-label">
                    Reason
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreason"
                    value={formValues.reason}
                    onChange={(e) =>
                      setFormValues({ ...formValues, reason: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                {/* <div className="col-6">
                  <label for="inputreason" className="form-label">
                    Signature Of SC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreason"
                    onChange={(e) =>
                      setFormValues({ ...formValues, signOfSC: e.target.value })
                    }
                    required
                  />
                </div> */}

                <div className="col-md-12">
                  <label for="inputremark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremark"
                    value={formValues.remark}
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
                    }
                    required
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

export default HandoverEdit;
