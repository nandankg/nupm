import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addData, addpolicectdreg } from "../reducer/PoliceCtdRegReducer";
import Header from "../component/Header";
import { formatDate } from "../data/formatDate";
import { formatTime } from "../data/formatDate";

const PoliceCtdRegister = () => {
  const navigate = useNavigate();
  const [s_no, setSno] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const dispatch = useDispatch();
  const [pname, setPName] = useState("abc");
  const [address, setAddress] = useState("abc");
  const [contno, setContNo] = useState("abc");
  const [error, setError] = useState("");

  const policectd = useSelector((state) => state.policectdstate);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (policectd) {
      setSlug(policectd.slug);
    }
  }, [policectd]);

  const basicInitialValues = {
    s_no: s_no,
    date: formatDate(new Date().toString()),
    time: formatTime(new Date().toString()),
    pname: "",
    address: "",
    contno: "",
    handoverto: "",
    reason: "",
    handovermemo: "",
    sign: "sign",
    remark: "",
    formtype: "",
    Employ_id: "",
    department: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValues.contno.length !== 10) {
      setError("Contact number must be exactly 10 digits.");
    } else {
      setError("");
      alert("Form submitted successfully!");
    }
    dispatch(addData(formValues));
    const newSrno = s_no + 1;
    setSno(newSrno);
    navigate(`/list/${slug}`);
  };
  const handleContactChange = (e) => {
    const value = e.target.value;
    // Allow only digits and limit to 10 characters
    if (/^\d{0,10}$/.test(value)) {
      setFormValues({ ...formValues, contno: value });
      setError(""); // Clear error while typing valid digits
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Police Custody Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="name" className="form-label text-start">
                    Name of The Person
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    onChange={(e) =>
                      setFormValues({ ...formValues, pname: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="address"
                    placeholder="e.g.UP"
                    onChange={(e) =>
                      setFormValues({ ...formValues, address: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="contno" className="form-label">
                    Contact No.
                  </label>
                  <input
                    type="contact"
                    placeholder="Enter contact number"
                    value={formValues.contno}
                    className="form-control"
                    onChange={handleContactChange}
                  />
                  {error && (
                    <p style={{ color: "red", marginTop: "5px" }}>{error}</p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="handoverto" className="form-label">
                    Handed Over To
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="handoverto"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        handoverto: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="reason" className="form-label">
                    Reason in Brief
                  </label>
                  <textarea
                    className="form-control"
                    id="reason"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reason: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>
                <div className="col-md-4">
                  <label htmlFor="handovermemo" className="form-label">
                    Handed Over Memo No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="handovermemo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        handovermemo: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label htmlFor="remark" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="remark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-9">
                  <label htmlFor="remark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="remark"
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

export default PoliceCtdRegister;

// include date and emp_id mandatory
