import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, editData } from "../../reducer/isha/AttendanceReducer";

const EditAttendanceRegister = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    console.log(id);
    const dispatch = useDispatch();
    const attendanceregister = useSelector((state) => state.attendance);
    const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(attendanceregister.data.data);
  const [items, setItems] = useState([]);
  const itmm = attendanceregister.data.data;
  console.log(items);
  useEffect(() => {
    if (attendanceregister) {
      setSlug(attendanceregister.slug);
    }
    dispatch(fetchData());
    setItems(attendanceregister.data.data);
  }, []);
  useEffect(() => {
    setItems(attendanceregister.data.data);
  }, [attendanceregister]);
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
    date:  fd.date,
    month: fd.month,
    attendance_Register: fd.attendance_Register,
    employeeName: fd.employeeName,
    employeeID: fd.employeeID,
    attendance: fd.attendance,
    remark: fd.remark,
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
                            ATTENDANCE REGISTER
                        </Link>
                        <Link underline="hover" color="inherit">
                        Edit
                        </Link>
                    </Breadcrumbs>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 form-container"style={{ maxWidth: "95%" }}>    
                        <form onSubmit={handleSubmit}>
                            <div className=" mb-3 form-heading-container" >
                                <h3 className="form-heading">Edit : ATTENDANCE REGISTER</h3>
                                <span className="line-box" style={{ width: "480px" }}></span>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <label for="inputTimein" className="form-label">
                                        Attendance Register:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputTimein"
                                        value={formValues.attendance_Register}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, attendance_Register: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label for="inputTimeout" className="form-label">
                                        MONTH:
                                    </label>
                                    <input
                                        type="month"
                                        className="form-control"
                                        id="inputTimeout"
                                        value={formValues.month}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, month: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label for="inputchangeTo" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputchangeTo"
                                        value={formValues.employeeName}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, employeeName: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="col-6">
                                    <label for="inputreason" className="form-label">
                                      Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="inputreason"
                                        value={formValues.date}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, date: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="col-6">
                                    <label for="inputreason" className="form-label">
                                        EMP ID
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputreason"
                                        value={formValues.employeeID}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, employeeID: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                        <label for="inputname" className="form-label">
                                        Attendance
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputname"
                                            value={formValues.attendance}
                                            onChange={(e) =>
                                                setFormValues({ ...formValues, attendance: e.target.value })
                                            }
                                        />
                                    </div>
                               
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label for="inputRemark" className="form-label">
                                        Remarks
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputRemark"
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
                            </form >
                    </div>
                
            </div >
        </div >
        
    </>
);
};

export default EditAttendanceRegister;
