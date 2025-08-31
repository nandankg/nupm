import React, { useState, useEffect } from "react";
import { addAfcgate, addData } from "../reducer/FirstAidRegisterReducer";
import Header from "../component/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { formatDate } from "../data/formatDate";
import { formatTime } from "../data/formatDate";

const FirstAidRegister = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const dispatch = useDispatch();
  const [name1, setName1] = useState("abc");
  const [sno, setSno] = useState(1);
  const [designation1, setDesignation1] = useState("mca");
  const [name2, setName2] = useState("def");
  const [designation2, setDesignation2] = useState("med");
  const [afcgate, setAfcgate] = useState("");

  const firstaidvar = useSelector((state) => state.firstaidstore);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (firstaidvar) {
      setSlug(firstaidvar.slug);
    }
  }, [firstaidvar]);
  const basicInitialValues = {
    sno: sno,

    date: formatDate(new Date().toString()),
    time: formatTime(new Date().toString()),
    name1: "",
    designation1: "",
    name2: "",
    designation2: "",
    itemsConsumed: "",
    Employ_id: "",
    department: "",
    //itemsqtyused: "",
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
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              First Aid
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
                <h3 className="form-heading">First Aid Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputStation" className="form-label">
                    First Aid Provided To
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="inputname1"
                    placeholder="name e.g. ram"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name1: e.target.value })
                    }
                  />

                  <br />
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    id="inputdestination1"
                    placeholder="Enter Designation"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        designation1: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="firstaidby" className="form-label">
                    First Aid Provided By
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="firstaidby"
                    placeholder="name"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name2: e.target.value })
                    }
                  />
                  <br />
                  <br />
                  <input
                    type="Text"
                    className="form-control"
                    id="inputdestination2"
                    placeholder="Enter Designation"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        designation2: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="department"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        department: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="emp_id" className="form-label">
                    Employ Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emp_id"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Employ_id: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    id="date"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row md-3">
                <p className="text-center">You save a life, Great Work!</p>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="inputCity" className="form-label">
                      Items & Quantity consumed
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          itemsConsumed: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="col-12 text-center pt-3">
                  <button type="submit" className="btn btn-primary">
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

export default FirstAidRegister;
