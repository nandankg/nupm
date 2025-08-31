import { React, useState } from "react";
import { Breadcrumbs } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../data/formatDate";
import { addData, addTEREntry } from "../reducer/TER_Entry_Reducer";
import Header from "../component/Header";
import { formatTime } from "../data/formatDate";

const TER_Entry_Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [s_no, setSno] = useState(1);

  const terentry = useSelector((state) => state.terentrystate || []);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (terentry) {
      setSlug(terentry.slug);
    }
  }, [terentry]);

  const basicInitialValues = {
    s_no: s_no,
    date: "",
    name: "",
    emp_id: "",
    desg: "",
    e_time: "",
    purpose: "",
    ex_time: "",
    V_sign: "",
    D_sign: "",
    remark: "",
    employee_id: "",
    department: "",
    unit: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    const newsrno = s_no + 1;
    setSno(newsrno);
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          
         
          <div className="row justify-content-center">
            <div className="col-md-8 form-container">
              <form onSubmit={handleSubmit}>
                <div className=" mb-3 form-heading-container">
                  <h3 className="form-heading">TER Entry Register</h3>
                  <div className="heading-line"></div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="name" className="form-label pb-4">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      id="date"
                      placeholder="Enter Date "
                      onChange={(e) =>
                        setFormValues({ ...formValues, date: e.target.value })
                      }
                    />
                  </div>
                  </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="name" className="form-label pb-4">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="name"
                      placeholder="Enter Name "
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="empid" className="form-label pb-4">
                      Emp.No./ID No.
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="empid"
                      placeholder="Enter ID"
                      onChange={(e) =>
                        setFormValues({ ...formValues, emp_id: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="desg" className="form-label text-start">
                      Dasignation/ Department
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="desg"
                      placeholder="Enter Designation"
                      onChange={(e) =>
                        setFormValues({ ...formValues, desg: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="e_time" className="form-label pb-4">
                      Entry Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="e_time"
                      onChange={(e) =>
                        setFormValues({ ...formValues, e_time: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="purpose" className="form-label">
                      Purpose of Visit
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="purpose"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          purpose: e.target.value,
                        })
                      }
                    />
                    <br />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="e_time" className="form-label">
                      Exit Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="e_time"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          ex_time: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="v_sign" className="form-label">
                      Visitor's Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="v_sign"
                      onChange={(e) =>
                        setFormValues({ ...formValues, V_sign: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="d_sign" className="form-label">
                      Name on Duty
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="d_sign"
                      onChange={(e) =>
                        setFormValues({ ...formValues, D_sign: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="remark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="remark"
                      placeholder="Remark"
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
      </div>
    </>
  );
};

export default TER_Entry_Register;
