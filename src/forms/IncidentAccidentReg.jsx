import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import {
  addData,
  addInciAcdRegReducer,
} from "../reducer/IncidentAccidentRegReducer";
import { formatDate } from "../data/formatDate";
import { formatTime } from "../data/formatDate";

const IncidentAccidentReg = () => {
  const navigate = useNavigate();
  const [sno, setSno] = useState(1);
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("abc");
  const [repotime, setReporttime] = useState(new Date());
  const dispatch = useDispatch();
  const [train, setTrain] = useState("12");
  const [trainset, setTrainSet] = useState("12");
  const [opname, setOpName] = useState("op");
  const [emp_id, setEmpId] = useState("123");
  const [rectime, setRectTime] = useState("1");
  const [detension, setDetention] = useState("123");

  const inaccreg = useSelector((state) => state.inacregstore);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (inaccreg) {
      setSlug(inaccreg.slug);
    }
  }, [inaccreg]);

  const basicInitialValues = {
    sno: sno,
    date: formatDate(new Date().toString()),
    location: "",
    repotime: formatTime(new Date().toString),
    train: "",
    trainset: "",
    opname: "",
    emp_id: "",
    rectime: "",
    detension: "",
    sigofcc: "sign",
    detailincident: "",
    remark: "",
    Employ_id: "",
    department: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    const newSrno = sno + 1;
    setSno(newSrno);
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
       
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Incident/Accident Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="inputStation" className="form-label">
                    Name of Train Operator
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="inputStation"
                    placeholder="Name"
                    onChange={(e) =>
                      setFormValues({ ...formValues, opname: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputgateno" className="form-label">
                    Emp ID of TO
                  </label>
                  <input
                    type="Text"
                    required
                    className="form-control"
                    id="inputgateno"
                    placeholder="Id"
                    onChange={(e) =>
                      setFormValues({ ...formValues, emp_id: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputgateno" className="form-label">
                    Train Set
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="inputgateno"
                    min="1"
                    onChange={(e) =>
                      setFormValues({ ...formValues, trainset: e.target.value })
                    }
                  />
                  <br />
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputgateno" className="form-label">
                    Train No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputgateno"
                    onChange={(e) =>
                      setFormValues({ ...formValues, train: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="inputgateno" className="form-label">
                    Reporting Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputgateno"
                    onChange={(e) =>
                      setFormValues({ ...formValues, repotime: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputgateno" className="form-label">
                    Rectified Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputgateno"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        rectime: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputgateno" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputgateno"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        location: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputgateno" className="form-label">
                    Detention
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputgateno"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        detension: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputCity"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">
                    Detail of Incident
                  </label>
                  <input
                    type="Area"
                    className="form-control"
                    id="inputCity"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        detailincident: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">
                    Remark by CC/CDI
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
                    }
                  />
                </div>
                <div className="col-12 text-center pt-3">
                  <button type="submit" className="btn btn-primary px-3">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncidentAccidentReg;
