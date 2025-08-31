import { React, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { formatDate } from "../data/formatDate";
import { editData, fetchData } from "../reducer/OutstandRecRegReducer";
import station from "../data/station.json";
const OutStandingRecRegEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sno, setSno] = useState(1);
  const [date, setDate] = useState(new Date());
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const outstandvar = useSelector((state) => state.outstandrecstore || []);
  console.log(outstandvar.data.data);
  const [items, setItems] = useState([]);
  const itmm = outstandvar.data.data;
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(outstandvar.data.data);
  }, []);

  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (outstandvar) {
      setSlug(outstandvar.slug);
    }
  }, [outstandvar]);

  useEffect(() => {
    setItems(outstandvar.data.data);
  }, [outstandvar]);
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
    //from form
    sno: 1,
    id: fd.id,
    date: formatDate(new Date().toString()),
    letter_no: fd.letter_no,
    station_name:fd.station_name,
    operator_name: fd.operator_name,
    osamount: fd.osamount,
    emp_no: fd.emp_no,
    working_id: fd.working_id,
    tom_no: fd.tom_no,
    shift_no: fd.shift_no,
    Date_send: fd.Date_send,
    notgenamount: fd.notgenamount,
    genamount: fd.genamount,
    sigofsc: fd.sigofsc,
    reason: fd.reason,
    detailback: fd.detailback,
    gremark: fd.gremark,
    remark: fd.remark,
    Employ_id: fd.Employ_id,
    department: fd.department,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    const newSrno = sno + 1;
    setSno(newSrno);
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{ minWidth: "100%" }}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  Edit Outstanding Record Register
                </h3>
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
                    value={formValues.operator_name}
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
                    value={formValues.emp_no}
                    onChange={(e) =>
                      setFormValues({ ...formValues, emp_no: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="letterno" className="form-label">
                    Letter No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="letterno"
                    value={formValues.letter_no}
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
                    value={formValues.working_id}
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
                    value={formValues.tom_no}
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
                    value={formValues.shift_no}
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
                    value={formValues.osamount}
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
                    className="form-control"
                    id="inputgateno"
                    value={formValues.Date_send}
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
                    placeholder="Letter No."
                    value={formValues.notgenamount}
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
                    placeholder="Letter No."
                    value={formValues.genamount}
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
                    value={formValues.gremark}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        gremark: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>
                <div className="col-md-4">
                  <label htmlFor="reason" className="form-label">
                    Reason
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="reason"
                    value={formValues.reason}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reason: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="detail" className="form-label text-start">
                    Details Back From OCC/RCC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="detail"
                    value={formValues.detailback}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        detailback: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="remark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="reamrk"
                    value={formValues.remark}
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

export default OutStandingRecRegEdit;
