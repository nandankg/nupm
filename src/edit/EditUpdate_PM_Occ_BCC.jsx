import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../data/formatDate";
import { editData, fetchData } from "../reducer/Update_Check_List_PM_occ_bcc_Red";

const Update_Check_List_PM_occ_bcc_Edit = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [date, setDate] = useState(new Date());
    const { id } = location.state;
    console.log(id);
    const dispatch = useDispatch();
    const add = useSelector((state) => state.updatepmoccbcc || []);
    console.log(add.data.data);
    const [items, setItems] = useState([]);
    const itmm = add.data.data;
    console.log(items);

    useEffect(() => {
        dispatch(fetchData());
        setItems(add.data.data);
    }, []);

    const [slug, setSlug] = useState("");
    console.log(slug);
    useEffect(() => {
      if (add) {
        setSlug(add.slug);
        console.log(slug);
      }
    }, [add]);

    useEffect(() => {
        setItems(add.data.data);
    }, [add]);
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
        //from api
        id: fd.id,
        systems: fd.systems,
        Notes: fd.notes,
        name: fd.verifiedname,
        employee_id: fd.employee_id,
        department: fd.department,
        unit: fd.unit,
    };
    const [formValues, setFormValues] = useState(basicInitialValues);
    console.log(formValues);

    const handleInputChange = (workKey, index, key, value = null) => {
        const updatedWorkArray = formValues[workKey].map((item, idx) => {
            if (idx === index) {
                return {
                    ...item,
                    [key]: value !== null ? value : item[key] === "NO" ? "yes" : "NO",
                };
            }
            return item;
        });

        setFormValues({ ...formValues, [workKey]: updatedWorkArray });
    };

    const handleSelectAllChange = (workKey, index, isChecked) => {
        const updatedWorkArray = formValues[workKey].map((item, idx) => {
            if (idx === index) {
                const updatedItem = { ...item };
                for (let key in updatedItem) {
                    if (key.startsWith("ch1")) {
                        updatedItem[key] = isChecked ? "yes" : "NO";
                    }
                }
                return updatedItem;
            }
            return item;
        });

        setFormValues({ ...formValues, [workKey]: updatedWorkArray });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(editData(formValues));
        navigate(`/list/${slug}`);
    };
    const label = [
        "Checking of OCC/BCC Controller HMI",
        "Checking of PAS equipment in CER",
        "Monitor of Alarms in NMS",
        "Check for alarm indications in Core SW",
        "Observe Working of Systems in NMS",
        "Visual Inspection of LED Status of DSW & ASW",
        "Monitor of Alarms in NMS",
        "Check camera in operator clients",
        "Check CLSTR,ENTZ,BVMS-1,BVMS-2 and its HDD LED status",
        "Check and clear alarms in CCTV HMI",
        "Monitoring of System Using Configuration Client Application",
        "Observe the Working of NMS system",
        "Visual Inspection of MCLK",
        "Monitor of Alarms in NMS",
        "Check working of RCP and HP in BCC Theatre by making test call",
        "Monitor RCW and check Status of Interface Icons",
        "Monitor of Alarms in NMS",
        "Check All equipmets in MSO Rack",
        "Check All equipmets in Radio-CAD Rack",
        "Check AVLS NMS",
        "Check Internode and PRI Calls Functionality",
        " Monitoring of Alarms in NMS",
        "Observe the working of DLC of all OCC/BCC controller",
        "Monitoring of Alarms in NMS",
        "Check for availability of Recordings in PlayBack Station",
        "Check the Status of CDRS Server(Telephone,Radio-PAS)",
        "Check the Status of ACS Server",
        "Monitoring of Alarms in NMS",
        "Check the Status of IBS Server",
        "Monitoring of Alarms in NMS",
        "Check the Status of UPS & SMPS Server",
        "Monitoring of Alarms in NMS",
        "Check the Status of OA/IT Server",
        "Monitoring of Alarms in NMS",
        "Check status of AC & Note CER and UPS(60KVA) Temperature (Maintained below 30°C)"

    ];
    return (
        <>
         <div className="container">
              
                <div className="row justify-content-center">
                    <div className="form-container" style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}>
                        <form onSubmit={handleSubmit}>
                            <div className=" mb-3 form-heading-container">
                                <h3 className="form-heading">Edit Update PM List OCC and BCC</h3>
                                <div className="heading-line"></div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-md-4' style={{ textAlign: "left" }}>Activity</label>
                                <label className="col-md-9" style={{ textAlign: "right" }}>Checkbox</label>
                                <label className='col-md-3' style={{ textAlign: "left" }}>Date</label>
                                <label className='col-md-3' style={{ textAlign: "left" }}>Emp_ID</label>
                                {/* <label className='col-md-3' style={{ textAlign: "left" }}>Signature</label> */}
                                <label className='col-md-3' style={{ textAlign: "left" }}>Remarks</label>
                            </div>
                            {label.map((label, index) => (
                                <FormSection
                                    key={index}
                                    label={label}
                                    formValues={formValues}
                                    handleInputChange={handleInputChange}
                                    handleSelectAllChange={handleSelectAllChange}
                                    workKey="systems"
                                    index={index}
                                />
                            ))}

                            <div className="col-md-12">
                                <label htmlFor="inputName" className="form-label">
                                Notes for Installation & other pending issues:
                                </label>
                                <textarea
                                
                                    className="form-control"
                                    id="inputName"
                                    value={formValues.Notes}
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            Notes: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="inputName" className="form-label">
                                    Name of SE/JE Verified :
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputName"
                                    value={formValues.name}
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-12 text-center pt-3">
                                <button type="submit" className="btn btn-primary px-3">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </>
    )
};
const FormSection = ({
    label,
    formValues,
    handleInputChange,
    handleSelectAllChange,
    workKey,
    index,
}) => {
    const isAllSelected = ["check"].every((g) => formValues[workKey][index][g] === "yes");

    const handleCheckboxChange = (g) => {
        handleInputChange(workKey, index, g, formValues[workKey][index][g] === "yes" ? "NO" : "yes");
    };

    return (
        <div className="row mb-3">
            <div className="col-md-12">
                <div className="d-flex align-items-start justify-content-between">
                    <div className="d-flex align-items-center col-md-3 flex-wrap">
                        <label
                            className="form-label mb-0"
                            style={{ textAlign: "left", flex: "none", width: "fit-content" }}
                        >
                            {label} &nbsp;
                        </label>
                    </div>
                    <div className="d-flex gap-3 justify-content-between">
                        {["check"].map((g) => (
                            <div key={g}>
                                <input
                                    type="checkbox"
                                    style={{ width: "20px", height: "20px" }}
                                    id={`${workKey}${g}${index}`}
                                    name={`${workKey}${g}${index}`}
                                    checked={formValues[workKey][index][g] === "yes"}
                                    onChange={() => handleCheckboxChange(g)}
                                />
                                <label style={{ display: "none" }}>{g}</label>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control"
                            value={formValues[workKey][index].date}
                            onChange={(e) =>
                                handleInputChange(workKey, index, "date", e.target.value)
                            }
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="text"
                            placeholder="Emp Id"
                            className="form-control"
                            value={formValues[workKey][index].Emp_id}
                            onChange={(e) =>
                                handleInputChange(workKey, index, "Emp_id", e.target.value)
                            }
                        />
                    </div>
                    {/* <div className="col-md-2">
                        <input
                            type="text"
                            placeholder="Signature"
                            className="form-control"
                            value={formValues[workKey][index].Emp_sign}
                            onChange={(e) =>
                                handleInputChange(workKey, index, "Emp_sign", e.target.value)
                            }
                        />
                    </div> */}
                    <div className="col-md-2">
                        <input
                            type="text"
                            placeholder="Remark"
                            className="form-control"
                            value={formValues[workKey][index].remark}
                            onChange={(e) =>
                                handleInputChange(workKey, index, "remark", e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Update_Check_List_PM_occ_bcc_Edit;