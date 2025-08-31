import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import {
    addData,
    addLats,
} from "../../reducer/isha/AttendanceReducer";
import { formatDate, formatTime } from "../../data/formatDate";

const AttendanceRegister = () => {
    const navigate = useNavigate();
    const [sNo, setSNo] = useState(1);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
    const dispatch = useDispatch();
    const LatsRegister = useSelector((state) => state.attendance);
    const [slug, setSlug] = useState("");
    console.log(slug);
    useEffect(() => {
        if (LatsRegister) {
            setSlug(LatsRegister.slug);
        }
    }, [LatsRegister]);
    const basicInitialValues = {
        S_No: sNo,
        month: "",
        date:"",
        attendance_Register: "",
        employeeName: "",
        employeeID: "",
        attendance: "",
        remark: "",
    };
    const [formValues, setFormValues] = useState(basicInitialValues);
    console.log(formValues);
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addData(formValues));
        const newSrno = sNo + 1;
        setSNo(newSrno);

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
                        <Link underline="hover" color="inherit"to={`/list/${slug}`}>
                        Register
                        </Link>
                    </Breadcrumbs>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 form-container"style={{ maxWidth: "95%" }}>    
                        <form onSubmit={handleSubmit}>
                            <div className=" mb-3 form-heading-container" >
                                <h3 className="form-heading">ATTENDANCE REGISTER</h3>
                                <span className="line-box" style={{ width: "400px" }}></span>
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

export default AttendanceRegister;
