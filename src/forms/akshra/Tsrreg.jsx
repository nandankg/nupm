import React, { useState, useEffect } from "react";

import { addTsrreg } from "../../reducer/akshra/TsrrReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

import { addData } from "../../reducer/redux/tableDataSlice";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const Tssreg = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [station, setStation] = useState("Ranchi");
  const [afcgateno, setAfcgateno] = useState("123");
  const tsreg = useSelector((state) => state.tsrrr);
  const [slug, setSlug] = useState(getLastParameter().trim());
 
  const basicInitialValues = {
    
    date: "",
    time: "",
    detailstsr: "",
    authority: "",
    reasonimposing: "",
    ImpositionRemark:"",
    cancellationdate: "",
    cancellationtime: "",
    autcancellation: "",
    detailafter: "",
    nameoftc: "",
    empid: "",
    nameofscc: "",
    empidofacc: "",
    cancellationremark:"",
    alterationdate: "",
    alterationtime: "",
    autalteration: "",
    tsrafteralteration : "",
    nameoftc: "",
    empid: "",
    nameofscc: "",
    empidofacc: "",
    alterationremark:"",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
 const handleSubmit = (e) => {
       e.preventDefault();
      dispatch(addData({formType:slug,values:formValues}));
          console.log("Form Data Submitted:", formValues);
         navigate(`/list/${slug}`);
     };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              TSR
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form className onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">TSR Register</h3>
                <div className="heading-line"></div>
              </div>
              {/* <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="inputsno" className="form-label">
                  S_NO.
                </label>
                <input
                  type="Number"
                  className="form-control"
                  id="inputsno"
                  onChange={(e) =>
                    setFormValues({ ...formValues, sno: e.target.value })
                  }
                />
               </div>
               </div>*/}

              <h5>IMPOSITION DETAIL</h5>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputDate" className="form-label">
                    Date of Imposition
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputTime" className="form-label">
                    Time of Imposition
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    //id="inputTime"
                    //name="appt"
                    //min="09:00"
                    //max="18:00"
                    placeholder="Time"
                    onChange={(e) =>
                      setFormValues({ ...formValues, time: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputDetailstsr" className="form-label">
                    Details of TSR imposed in section(Block id/KP/Chalnage/Mast
                    no.)
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputDetailstsr"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        detailstsr: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputAuthority" className="form-label">
                    Authority/Dept instruction for imposing TSR
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputAuthority"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        authority: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="inputReasonimposing" className="form-label">
                    Reason of imposing of TSR in brief
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputReasonimposing"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reasonimposing: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>CANCELLATION/ALTERATION DETAILS</h5>
                  <label htmlFor="inputCancellationdate" className="form-label">
                    Date of Cancellation/Alteration of TSR
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputCancellationdate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        cancellationdate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputCancellationtime" className="form-label">
                    Time of Cancellation/Alteration of TSR
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputCancellationtime"
                    //name="appt"
                    // min="09:00"
                    // max="18:00"
                    placeholder="Time"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        cancellationtime: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="inputAutcancellation" className="form-label">
                    Authority/Dept Instruction for Cancellation/Alteration of
                    TSR
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAutcancellation"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        autcancellation: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="inputDetailafter" className="form-label">
                    Details(after attention)TSR Removed/Altered
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDetailafter"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        detailafter: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputNameoftc" className="form-label">
                    Name of TC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNameoftc"
                    onChange={(e) =>
                      setFormValues({ ...formValues, nameoftc: e.target.value })
                    }
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="inputEmpid" className="form-label">
                    Emp.id of TC
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputEmpid"
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputNameofscc" className="form-label">
                    Name of ACC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNameofscc"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        nameofscc: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputEmpidofacc" className="form-label">
                    EMP.id of ACC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmpidofacc"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        empidofacc: e.target.value,
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tssreg;
