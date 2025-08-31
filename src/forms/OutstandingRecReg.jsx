import React, { useState, useRef, useEffect } from "react";
import Header from "../component/Header";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addData,
  addOutstandRecRegRed,
} from "../reducer/OutstandRecRegReducer";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { usePDF } from "react-to-pdf";
import { formatDate } from "../data/formatDate";
import { DownloadTableExcel } from "react-export-table-to-excel";
import station from "../data/station.json";
const OutstandingRecReg = () => {
  const navigate = useNavigate();
  const [s_no, setSno] = useState(1);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [letter_no, setLetterno] = useState(1);
  const [operator_name, setOperaterName] = useState("abc");
  const [osamount, setOsAmount] = useState("123");
  const [emp_no, setEmpNo] = useState("123");
  const [working_id, setWorkingId] = useState("123");
  const [tom_no, setTomNo] = useState("123");
  const [shift_no, setShiftNo] = useState("123");
  const [Date_send, setDateSend] = useState(Date());
  const [notgenamount, setNotGenAmount] = useState("123");
  const [genamount, setGenAmount] = useState("123");

  const [afcgateno, setAfcgateno] = useState("123");
  const outstandvar = useSelector((state) => state.outstandrecstore);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (outstandvar) {
      setSlug(outstandvar.slug);
    }
  }, [outstandvar]);

  const basicInitialValues = {
    s_no: s_no,
    date: formatDate(new Date().toString()),
    letter_no: "",
    station_name:"",
    operator_name: "",
    osamount: "",
    emp_no: "",
    working_id: "",
    tom_no: "",
    shift_no: "",
    Date_send: "",
    notgenamount: "",
    genamount: "",
    sigofsc: "sign",
    reason: "",
    detailback: "",
    gremark: "",
    remark: "",
    Employ_id: "",
    department: "",
    unit:"",
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
        
        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{ minWidth: "100%" }}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Outstanding Record Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label htmlFor="operatorname" className="form-label">
                    Operator Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="0peratorname"
                    placeholder="Name"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        operator_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="empid" className="form-label">
                    Emp.No./File No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="empid"
                    placeholder="Id"
                    onChange={(e) =>
                      setFormValues({ ...formValues, emp_no: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="letterno" className="form-label">
                  Foil no
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="letterno"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        letter_no: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="workid" className="form-label">
                    Working ID (As per OS)
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="workid"
                    placeholder="Id"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        working_id: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>
                <div className='col-md-3'>
                        <label htmlFor="station">Station:</label>
                        <select  className="form-control" name="station_name"     onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        station_name: e.target.value,
                      })
                    } required >
                                           
                                             <option value="">Select a Station</option>
                                             {station.map((stn, index) => (
                                               <option key={index} value={stn["Station Name"]}>
                                                 {stn["Station Name"]}
                                               </option>
                                             ))}
                                             </select>
                      </div>
                <div className="col-md-3">
                  <label htmlFor="tomno" className="form-label">
                    TOM No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="tomno"
                    onChange={(e) =>
                      setFormValues({ ...formValues, tom_no: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="shiftno" className="form-label">
                    Shift No.
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="shiftno"
                    min="1"
                    onChange={(e) =>
                      setFormValues({ ...formValues, shift_no: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="amount" className="form-label">
                    O/S Amount
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="amount"
                    min="1"
                    onChange={(e) =>
                      setFormValues({ ...formValues, osamount: e.target.value })
                    }
                  />
                </div>
              </div>

              <hr
                style={{
                  borderBlockStyle: "double",
                  borderBlockColor: "#850101",
                  borderWidth: "5px",
                }}
              />
              <div className="row mb-3">
                <div className="col-md-3">
                  <label htmlFor="date2" className="form-label text-start">
                    Date of Letter Sent to OCC/RCC
                  </label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    id="inputgateno"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Date_send: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-3">
                  <label
                    htmlFor="notgenamount"
                    className="form-label text-start"
                  >
                    Not Geniune Amount Paid Date vide Letter No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="notgenamount"
                    placeholder="Type of Gate"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        notgenamount: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="genamount" className="form-label text-start">
                    Geniune Amount Paid Date vide Letter No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="genamount"
                    placeholder="Type of Gate"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        genamount: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="genremark" className="form-label text-start">
                    Remarks Genuine not Genuiune
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="genremark"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        gremark: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>
                <div className="col-md-3">
                  <label htmlFor="reason" className="form-label">
                    Reason
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="reason"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reason: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="detail" className="form-label text-start">
                    Details Back From OCC/RCC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="detail"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        detailback: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="detail" className="form-label text-start">
                  SC name/Emp. id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="unit"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        unit: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="remark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="reamrk"
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

export default OutstandingRecReg;
