import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import stationData from "../data/station.json";
import { addcentcomp, addData } from "../reducer/CentCompPreReducer";
import { formatDate } from "../data/formatDate";
const CentCompPreventiveForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addcentcomp = useSelector((state) => state.centcompstate);
    const [slug, setSlug] = useState("");
    console.log(slug);
    useEffect(() => {
      if (addcentcomp) {
        setSlug(addcentcomp.slug);
      }
    }, [addcentcomp]);

    const initialFormState = {
        
        // date: new Date().toLocaleDateString(),
        Date: formatDate(new Date().toString()),
        month: new Date().getMonth(),
        activities: Array(6).fill({
            SC1: "NO",
            SC2: "NO",
            SC3: "NO",
            SC4: "NO",
            remark: "",
            action: "",
            deficiency: "",
        }),
        staff1_name: "--",
        staff1_desg: "--",
        staff1_id: "--",
        staff1_sign: "--",
        staff2_name: "--",
        staff2_desg: "--",
        staff2_id: "--",
        staff2_sign: "--",
        staff3_name: "--",
        staff3_desg: "--",
        staff3_id: "--",
        staff3_sign: "--",
        employee_id: "",
        department: "",
        unit: "",
    };
    const [formValues, setFormValues] = useState(initialFormState);

    const handleInputChangesc = (workKeysc, indexsc, keysc, value = null) => {
        const updatedWorkArray = formValues[workKeysc].map((item, idsc) => {
            if (idsc === indexsc) {
                return {
                    ...item,
                    [keysc]: value !== null ? value : item[keysc] === "NO" ? "yes" : "NO",
                };
            }
            return item;
        });

        setFormValues({ ...formValues, [workKeysc]: updatedWorkArray });
    };

    const handleSelectAllChangesc = (workKeysc, indexsc, isChecked) => {
        const updatedWorkArray = formValues[workKeysc].map((item, idsc) => {
            if (idsc === indexsc) {
                const updatedItem = { ...item };
                for (let keysc in updatedItem) {
                    if (keysc.startsWith("S")) {
                        updatedItem[keysc] = isChecked ? "yes" : "NO";
                    }
                }
                return updatedItem;
            }
            return item;
        });

        setFormValues({ ...formValues, [workKeysc]: updatedWorkArray });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addData(formValues));
        navigate(`/list/${slug}`);
    };

    const label = [
        "Checking of all Cable connection and dressing",
        "Check internal fan status of Switches/racks",
        "External Cleaning of equipments      ",
        "External and Internal Cleaning of Switches/racks",
        "Check if Switches are working normal and all equipments are on LAN and sending data properly and check supervision services",
        "Check if Add Values Websites is Working",
    ];
    return (
        <>
            <div className="container">
                

                <div className="row justify-content-center">
                    <div
                        className="form-container "
                        style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className=" mb-3 form-heading-container">
                                <h3 className="form-heading">Preventive Maintenance worksheet of central computer (Yearly)</h3>
                                <div className="heading-line"></div>
                            </div>
                            <div className="col-md-3 text-center justify-content-center">
                                <label htmlFor="inputdate" className="form-label">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    className="form-control"
                                    id="inputdate"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            Date: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-md-6">
                <label htmlFor="inputstation" className="form-label">
                  Station
                </label>
                <select
                  className="form-control"
                  id="station"
                  onChange={(e) =>
                    setFormValues({ ...formValues, staff1_sign: e.target.value })
                  }
                  
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
                            <hr style={{ borderBlockStyle: 'double', borderBlockColor: '#f7b3a1', borderWidth: '5px' }} />
                            <div className='row mb-3'>
                                <label className='col-md-3' style={{ textAlign: "left", minWidth:'350px'}}>Description</label>
                                <label className="col-md-3" style={{ textAlign: "left" ,fontSize:11 }}>Isolator,  UPS-EC Rack-EC  CER-AFC</label>
                                <label className='col-md-2' style={{ textAlign: "left" }}> Remarks/Defeiciencies </label>
                                <label className='col-md-2' style={{ textAlign: "left" }}>Action Taken</label>
                                <label className='col-md-2' style={{ textAlign: "left" }}>Deficiency</label>
                            </div>
                            {label.map((label, indexsc) => (
                                <FormSection
                                    keysc={indexsc}
                                    label={label}
                                    formValues={formValues}
                                    handleInputChangesc={handleInputChangesc}
                                    handleSelectAllChangesc={handleSelectAllChangesc}
                                    workKeysc="activities"
                                    indexsc={indexsc}
                                />
                            ))}
                            

                            <hr style={{ borderBlockStyle: 'double', borderBlockColor: '#f7b3a1', borderWidth: '5px' }} />
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="inputName" className="form-label">
                                        Staff Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputName"
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                staff1_name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputempid" className="form-label">
                                        Desgination
                                    </label>
                                    <input
                                        type="Text"
                                        className="form-control"
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                staff1_desg: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="id" className="form-label">
                                        Employee No.
                                    </label>
                                    <input
                                        type="Text"
                                        className="form-control"
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                            staff1_id: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                               
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="inputName" className="form-label">
                                        Staff Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputName"
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                staff2_name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputempid" className="form-label">
                                        Desgination
                                    </label>
                                    <input
                                        type="Text"
                                        className="form-control"
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                staff2_desg: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="id" className="form-label">
                                        Employee No.
                                    </label>
                                    <input
                                        type="Text"
                                        className="form-control"
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                            staff2_id: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="inputName" className="form-label">
                                        Staff Name
                                    </label>
                                    <input
                                        type="text"
                                        
                                        className="form-control"
                                        id="inputName"
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                staff3_name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputempid" className="form-label">
                                        Desgination
                                    </label>
                                    <input
                                        type="Text"
                                        className="form-control"
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                                staff3_desg: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="id" className="form-label">
                                        Employee No.
                                    </label>
                                    <input
                                        type="Text"
                                        className="form-control"
                                        onChange={(e) =>
                                            setFormValues({
                                                ...formValues,
                                            staff3_id: e.target.value,
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

const FormSection = ({
    label,
    formValues,
    handleInputChangesc,
    handleSelectAllChangesc,
    workKeysc,
    indexsc,
}) => {
    const isAllSelected = [
        "SC1",
        "SC2",
        "SC3",
        "SC4",
    ].every((SC) => formValues[workKeysc][indexsc][SC] === "yes");
    const handleCheckboxChange = (SC) => {
        handleInputChangesc(workKeysc, indexsc, SC, formValues[workKeysc][indexsc][SC] === "yes" ? "NO" : "yes");
    };
    return (
        <div className="row mb-3">
            <div className="col-md-7">
                <div className="d-flex align-items-start justify-content-between gap-3">
                    <div className="d-flex align-items-center col-md-4 flex-wrap ">
                        <label
                            className="form-label mb-0"
                            style={{ textAlign: "left", flex: "None", width: "fit-content"}}
                        >
                            {label} &nbsp;
                            </label>
                            </div>
                            <div className="col-md-2">
                            <input
                                type="checkbox"
                                style={{ width: "20px", height: "20px" }}
                                id={`${workKeysc}SelectAll${indexsc}`}
                                checked={isAllSelected}
                                onChange={(e) =>
                                    handleSelectAllChangesc(workKeysc, indexsc, e.target.checked)
                                }
                            />
                            <label
                                style={{ fontSize: "14px" }}
                                htmlFor={`${workKeysc}SelectAll${indexsc}`}
                            >
                                {isAllSelected ? "UnCheck All" : "Check All"}
                            </label>
                      
                    </div>
                    <div className="d-flex gap-4 justify-content-between" style={{ minWidth:'200px'}}>
                        {["SC1", "SC2", "SC3", "SC4"].map(
                            (s) => (
                                <div key={s}>
                                    <input
                                        type="checkbox"
                                        style={{ width: "15px", height: "15px" }}
                                        id={`${workKeysc}${s}${indexsc}`}
                                        name={`${workKeysc}${s}${indexsc}`}
                                        checked={formValues[workKeysc][indexsc][s] === "yes"}
                                        onChange={() => handleInputChangesc(workKeysc, indexsc, s)}
                                    />
                                    <label style={{ display: "none" }}>{s}</label>
                                </div>
                            )
                        )}
                    </div>
                    <div className="col-md-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder=" Remarks/Defeiciencies "
                            value={formValues[workKeysc][indexsc].remark}
                            onChange={(e) =>
                                handleInputChangesc(workKeysc, indexsc, "remark", e.target.value)
                            }
                        />
                    </div>
                    <div className="col-md-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Action Taken"
                            value={formValues[workKeysc][indexsc].action}
                            onChange={(e) =>
                                handleInputChangesc(workKeysc, indexsc, "action", e.target.value)
                            }
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Deficiency"
                            value={formValues[workKeysc][indexsc].deficiency}
                            onChange={(e) =>
                                handleInputChangesc(workKeysc, indexsc, "deficiency", e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CentCompPreventiveForm;