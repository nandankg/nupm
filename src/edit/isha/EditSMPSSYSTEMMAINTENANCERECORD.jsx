import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchData, editData } from "../../reducer/isha/SMPSSYSTEMMAINTENANCERECORDReducer"
import { Breadcrumbs } from '@mui/material';
import stationData from "../../station.json";
const EditSMPSSYSTEMMAINTENANCERECORD = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    console.log(id);
    const dispatch = useDispatch();
    const pm = useSelector((state) => state.smpssystem);
    console.log(pm.data.data);
    const [items, setItems] = useState([]);
    const itmm = pm.data.data;
    console.log(items);
    useEffect(() => {
        dispatch(fetchData());
        setItems(pm.data.data);
    }, []);
    useEffect(() => {
        setItems(pm.data.data);
    }, [pm]);
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
        month: fd.month,
        station: fd.station,
        smps: fd.smps,
        st: fd.st,
        et: fd.et,
        o1: fd.o1,
        o2: fd.o2,
        o3: fd.o3,
        o4: fd.o4,
        o5: fd.o5,
        o6: fd.o6,
        o7: fd.o7,
        o8: fd.o8,
        o9: fd.o9,
        o10: fd.o10,
        o11: fd.o11,
        o12: fd.o12,
        o13: fd.o13,
        o14: fd.o14,
        o15: fd.o15,
        o16: fd.o16,
        o17: fd.o17,
        o18: fd.o18,
        o19: fd.o19,
        o20: fd.o20,
        o21: fd.o21,
        o22: fd.o22,
        o23: fd.o23,
        o24: fd.o24,
        i1: fd.i1,
        i2: fd.i2,
        i3: fd.i3,
        i4: fd.i4,
        i5: fd.i5,
        i6: fd.i6,
        i7: fd.i7,
        i8: fd.i8,
        i9: fd.i9,
        i10: fd.i10,
        i11: fd.i11,
        i12: fd.i12,
        i13: fd.i13,
        i14: fd.i14,
        i15: fd.i15,
        i16: fd.i16,
        i17: fd.i17,
        i18: fd.i18,
        i19: fd.i19,
        i20: fd.i20,
        i21: fd.i21,
        i22: fd.i22,
        i23: fd.i23,
        i24: fd.i24,
        a1: fd.a1,
        a2: fd.a2,
        a3: fd.a3,
        a4: fd.a4,
        a5: fd.a5,
        a6: fd.a6,
        a7: fd.a7,
        a8: fd.a8,
        a9: fd.a9,
        a10: fd.a10,
        a11: fd.a11,
        a12: fd.a12,
        a13: fd.a13,
        a14: fd.a14,
        a15: fd.a15,
        a16: fd.a16,
        a17: fd.a17,
        a18: fd.a18,
        a19: fd.a19,
        a20: fd.a20,
        a21: fd.a21,
        a22: fd.a22,
        a23: fd.a23,
        a24: fd.a24,
        F1: fd.F1,
        F2: fd.F2,
        F3: fd.F3,
        F4: fd.F4,
        F5: fd.F5,
        F6: fd.F6,
        a111: fd.a111,
        a112: fd.a112,
        a113: fd.a113,
        a114: fd.a114,
        a115: fd.a115,
        a116: fd.a116,
        sc: fd.sc,
        acv: fd.acv,
        uvc: fd.uvc,
        lc: fd.lc,
        rs1: fd.rs1,
        rs2: fd.rs2,
        ss1: fd.ss1,
        ss2: fd.ss2,
        ss3: fd.ss3,
        ss4: fd.ss4,
        b: fd.b,
        l: fd.l,
        c: fd.c,
        ea: fd.ea,
        remark: fd.remark,
        sj: fd.sj,
        em1: fd.em1,
        em2: fd.em2,
    };
    const [formValues, setFormValues] = useState(basicInitialValues);
    console.log(formValues);
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(editData(formValues));
        navigate("/list/smps_sys_mntc_register");
    };
    return (
        <>
            <div className="container">
                <div role="presentation " className="bredcrumbs">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit">
                            SMPS SYSTEM MAINTENANCE RECORD (ANNEXURE-G)
                        </Link>
                        <Link underline="hover" color="inherit">
                            Edit
                        </Link>
                    </Breadcrumbs>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 form-container" style={{ marginLeft: "0", marginRight: "0", maxWidth: "90%" }}>
                        <form onSubmit={handleSubmit}>
                            <div className=" mb-3 form-heading-container">
                                <h3 className="form-heading"> EDIT : SMPS SYSTEM MAINTENANCE RECORD</h3>
                                <span className="line-box" style={{ width: "650px" }}></span>
                            </div>
                            <table>
                                <div className="row mb-3">
                                   
                                    <div className="col-md 4"style={{ width: "900px" }}>
                                        <label htmlFor="inputstation" className="form-label">
                                            Station
                                        </label>
                                        <select
                                            className="form-control"
                                            id="station"
                                            value={formValues.station}
                                            onChange={(e) =>
                                                setFormValues({ ...formValues, station: e.target.value })
                                            }
                                            required
                                        >
                                            <option value="">Select Station</option>
                                            {stationData
                                                .filter((station) => station["Station Name"]) // Exclude entries with null station names
                                                .map((station) => (
                                                    <option
                                                        key={station["STATION Code"]}
                                                        value={station["Station Name"]}
                                                    >
                                                        {station["Station Name"]}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="col-md 12">
                                        <label for="inputName" className="form-label">
                                            SMPS RATING:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputName"
                                            value={formValues.smps}
                                            onChange={(e) =>
                                                setFormValues({
                                                    ...formValues,
                                                    smps: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                <div className="col-md 4" >
                                        <label for="inputName" className="form-label">
                                            MONTH:
                                        </label>
                                        <input
                                            type="month"
                                            className="form-control"
                                            id="inputName"
                                            value={formValues.month}
                                            onChange={(e) =>
                                                setFormValues({
                                                    ...formValues,
                                                    month: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                   
                                    <div className="col-md 4">
                                        <label for="inputName" className="form-label">
                                            START TIME:
                                        </label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            id="inputName"
                                            value={formValues.st}
                                            onChange={(e) =>
                                                setFormValues({
                                                    ...formValues,
                                                    st: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col-md 4">
                                        <label for="inputName" className="form-label">
                                            END TIME:
                                        </label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            id="inputName"
                                            value={formValues.et}
                                            onChange={(e) =>
                                                setFormValues({
                                                    ...formValues,
                                                    et: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </table>
                            <table>
                                <tr>
                                    <th style={{ width: "200px" }}>CELL NO</th>
                                    <th style={{ width: "200px" }}>1</th>
                                    <th style={{ width: "200px" }}>2</th>
                                    <th style={{ width: "200px" }}>3</th>
                                    <th style={{ width: "200px" }}>4</th>
                                    <th style={{ width: "200px" }}>5</th>
                                    <th style={{ width: "200px" }}>6</th>
                                </tr>
                                <tr>
                                    <td>ON FLOAT</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o1}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o1: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        value={formValues.o2}
                                        className="form-control"
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o2: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o3}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o3: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o4}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o4: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o5}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o5: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o6}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o6: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>
                                <tr>
                                    <td>INITIAL READING</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i1}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i1: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i2}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i2: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i3}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i3: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i4}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i4: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i5}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i5: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i6}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i6: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>
                                <tr>
                                    <td>AFTER 1.5 Hrs</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a1}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a1: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a2}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a2: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a3}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a3: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a4}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a4: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a5}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a5: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a6}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a6: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>

                                <tr>
                                    <th style={{ width: "200px" }}>CELL NO</th>
                                    <th style={{ width: "200px" }}>7</th>
                                    <th style={{ width: "200px" }}>8</th>
                                    <th style={{ width: "200px" }}>9</th>
                                    <th style={{ width: "200px" }}>10</th>
                                    <th style={{ width: "200px" }}>11</th>
                                    <th style={{ width: "200px" }}>12</th>
                                </tr>
                                <tr>
                                    <td>ON FLOAT</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o7}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o7: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o8}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o8: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o9}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o9: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o10}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o10: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o11}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o11: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        value={formValues.o12}
                                        className="form-control"
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o12: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>
                                <tr>
                                    <td>INITIAL READING</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i7}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i7: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i8}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i8: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i10}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i10: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i11}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i11: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i12}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i12: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i6}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i6: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>
                                <tr>
                                    <td>AFTER 1.5 Hrs</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a7}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a7: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a8}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a8: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a9}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a9: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a10}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a10: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a11}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a11: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a12}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a12: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>

                                <tr>
                                    <th style={{ width: "200px" }}>CELL NO</th>
                                    <th style={{ width: "200px" }}>13</th>
                                    <th style={{ width: "200px" }}>14</th>
                                    <th style={{ width: "200px" }}>15</th>
                                    <th style={{ width: "200px" }}>16</th>
                                    <th style={{ width: "200px" }}>17</th>
                                    <th style={{ width: "200px" }}>18</th>
                                </tr>
                                <tr>
                                    <td>ON FLOAT</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o13}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o13: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o14}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o14: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o15}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o15: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o16}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o16: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o17}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o17: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o18}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o18: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>
                                <tr>
                                    <td>INITIAL READING</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i13}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i13: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i14}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i14: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i15}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i15: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i16}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i16: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i17}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i17: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i18}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i18: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>
                                <tr>
                                    <td>AFTER 1.5 Hrs</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a13}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a13: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a14}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a14: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a15}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a15: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a16}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a16: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a17}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a17: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a18}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a18: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>

                                <tr>
                                    <th style={{ width: "200px" }}>CELL NO</th>
                                    <th style={{ width: "200px" }}>19</th>
                                    <th style={{ width: "200px" }}>20</th>
                                    <th style={{ width: "200px" }}>21</th>
                                    <th style={{ width: "200px" }}>22</th>
                                    <th style={{ width: "200px" }}>23</th>
                                    <th style={{ width: "200px" }}>24</th>
                                </tr>
                                <tr>
                                    <td>ON FLOAT</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o19}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o19: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o20}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o20: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o21}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o21: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o22}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o22: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o23}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o23: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.o24}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                o24: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>
                                <tr>
                                    <td>INITIAL READING</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i19}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i19: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i20}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i20: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i21}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i21: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i22}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i22: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i23}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i23: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.i24}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                i24: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>
                                <tr>
                                    <td>AFTER 1.5 Hrs</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a19}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a19: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a20}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a20: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a21}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a21: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a22}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a22: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a23}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a23: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a24}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a24: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>

                                <tr>
                                    <th style={{ width: "200px" }}> SPARE CELL NO</th>
                                    <th style={{ width: "200px" }}>1</th>
                                    <th style={{ width: "200px" }}>2</th>
                                    <th style={{ width: "200px" }}>3</th>
                                    <th style={{ width: "200px" }}>4</th>
                                    <th style={{ width: "200px" }}>5</th>
                                    <th style={{ width: "200px" }}>6</th>
                                </tr>
                                <tr>
                                    <td>ON FLOAT</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.F1}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                F1: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.F2}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                F2: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.F3}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                F3: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.F4}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                F4: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.F5}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                F5: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.F6}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                F6: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>
                                <tr>

                                    <td>AFTER 1 Hrs</td>
                                    <td> <input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a111}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a111: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a112}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a112: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a113}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a113: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a114}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a114: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a115}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a115: e.target.value,
                                            })
                                        }
                                    /> </td>
                                    <td><input
                                        type="Text"
                                        className="form-control"
                                        value={formValues.a116}
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                a116: e.target.value,
                                            })
                                        }
                                    /> </td>
                                </tr>

                            </table>
                            <div className=" row mb-3">

                                <label for="inputName" className="form-label" style={{ width: "400px" }}>
                                    SPARE CELL CHARGER OUTPUT VOLTAGE:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.sc}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            sc: e.target.value,
                                        })
                                    }
                                />
                                <label for="inputName" className="form-label" >
                                    ACV of BB1 after 1.5 Hrs.
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.acv}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            acv: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className='row'>
                                <label for="inputName" className="form-label" >
                                    UNDER VOLTAGE CELLS
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.uvc}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            uvc: e.target.value,
                                        })
                                    }
                                />
                                <label for="inputName" className="form-label" >
                                    LEAKY CELLS
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.lc}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            lc: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className='row'>
                                <label for="inputName" className="form-label" >
                                    REPLACEMENT STATUS
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.rs1}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            rs1: e.target.value,
                                        })
                                    }
                                />
                                <label for="inputName" className="form-label" >
                                    REPLACEMENT STATUS
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formValues.rs2}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            rs2: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="row" >
                                <label for="inputName" className="form-label" style={{ textAlign: "left" }}>
                                    SMR STATUS:
                                </label>
                                <label for="inputName" className="form-label" style={{ textAlign: "left" }}>
                                    SMR1:
                                </label>
                                <input
                                    type="remarks"
                                    className="form-control"
                                    value={formValues.ss1}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            ss1: e.target.value,
                                        })
                                    }
                                />
                                <label for="inputName" className="form-label" style={{ textAlign: "left" }}>
                                    SMR2:
                                </label>
                                <input
                                    type="remarks"
                                    className="form-control"
                                    value={formValues.ss2}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            ss2: e.target.value,
                                        })
                                    }
                                />
                                <label for="inputName" className="form-label" style={{ textAlign: "left" }}>
                                    SMR3:
                                </label>
                                <input
                                    type="remarks"
                                    className="form-control"
                                    value={formValues.ss3}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            ss3: e.target.value,
                                        })
                                    }
                                />
                                <label for="inputName" className="form-label" style={{ textAlign: "left" }}>
                                    SMR4:
                                </label>
                                <input
                                    type="remarks"
                                    className="form-control"
                                    value={formValues.ss4}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            ss4: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="row" >
                                <label for="inputName" className="form-label" style={{ textAlign: "left" }}>
                                    Battery Terminals Cleaned
                                </label>
                                <input
                                    type="remarks"
                                    className="form-control"
                                    value={formValues.b}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            b: e.target.value,
                                        })
                                    }
                                />
                                <label for="inputName" className="form-label" style={{ textAlign: "left" }}>
                                    Loose Connection Checked
                                </label>
                                <input
                                    type="remarks"
                                    className="form-control"
                                    value={formValues.l}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            l: e.target.value,
                                        })
                                    }
                                />
                                <label for="inputName" className="form-label" style={{ textAlign: "left" }}>
                                    Cell Leakage Checked
                                </label>
                                <input
                                    type="remarks"
                                    className="form-control"
                                    value={formValues.c}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            c: e.target.value,
                                        })
                                    }
                                />
                                <label for="inputName" className="form-label" style={{ textAlign: "left" }}>
                                    Earth Pit Status
                                </label>
                                <input
                                    type="remarks"
                                    className="form-control"
                                    value={formValues.ea}
                                    id="inputName"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            ea: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="row" >
                                <div className='col-12'>
                                    <label for="inputName" className="form-label" style={{ textAlign: "left" }}>
                                        REMARKS:
                                    </label>
                                    <input
                                        type="remarks"
                                        className="form-control"
                                        value={formValues.remark}
                                        id="inputName"
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                remark: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-12 text-center pt-3">
                                <button type="submit" className="btn btn-primary mt-3">
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
export default EditSMPSSYSTEMMAINTENANCERECORD