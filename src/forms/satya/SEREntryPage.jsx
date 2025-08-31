import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData, addSERentry } from "../../reducer/satya/SEREntryPageReducer";
import { formatDate } from "../../data/formatDate";

const SEREntryPage = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const SERentry = useSelector((state) => state.SERpage);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (SERentry) {
      setSlug(SERentry.slug);
    }
  }, [SERentry]);

  const basicInitialValues = {
    S_No: sNo,
    date: formatDate(date.toString()),
    name: "",
    empid: "",
    desig: "",
    entrytime: "",
    purpose: "",
    exittime: "",
    visitorsign: "",
    signonduty: "",
    remarks: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              SER Room Entry
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
                <h3 className="form-heading">SER Room Entry Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputname" className="form-label">
                    Name{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputname"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Employee Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputempid"
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputdesig" className="form-label">
                    Desig./Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdesig"
                    onChange={(e) =>
                      setFormValues({ ...formValues, desig: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputentrytime" className="form-label">
                    Entry Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputentrytime"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        entrytime: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-6">
                  <label for="inputexittime" className="form-label">
                    Exit Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputexittime"
                    onChange={(e) =>
                      setFormValues({ ...formValues, exittime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputpurpose" className="form-label">
                    Purpose Of Visit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputpurpose"
                    onChange={(e) =>
                      setFormValues({ ...formValues, purpose: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputvisitorsign" className="form-label">
                    Visitor Sign.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputvisitorsign"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        visitorsign: e.target.value,
                      })
                    }
                    required
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
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary mt-3" style={{width:"100px", height: "50px", textAlign: "center"}}>
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

export default SEREntryPage;
