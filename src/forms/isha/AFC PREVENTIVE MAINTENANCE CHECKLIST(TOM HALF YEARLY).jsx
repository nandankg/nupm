import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import { addAfcpreventive, addData } from '../../reducer/isha/AFCHALFMONTLYReducer';
import { formatDate, formatTime } from "../../data/formatDate";
import stationData from "../../station.json";
const AFCPREVENTIVEMAINTENANCCHECKLISTHalfYearly = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const afcpreventive = useSelector((state) => state.AFCPREVENTIVEMAINTENANCECHECKLIST);
   const [slug, setSlug] = useState("");
   console.log(slug);
   useEffect(() => {
      if (afcpreventive) {
         setSlug(afcpreventive.slug);
      }
   }, [afcpreventive]);

  const initialFormState = {
    stn_name: "",
    date: formatDate(new Date().toDateString()),
    month: new Date().getMonth(),
    activities1: Array(16).fill({
      TOM1: "❌",
      TOM2: "❌",
      TOM3: "❌",
      TOM4: "❌",
      TOM5: "❌",
      TOM6: "❌",
      TOM7: "❌",
      remark: "",
      action: "",
      deficiency: "",
    }),
    activities2: Array(6).fill({
      EC1: "❌",
      EC2: "❌",
      EC3: "❌",
      EC4: "❌",
      EC5: "❌",
      EC6: "❌",
      EC7: "❌",
      remarks: "",
      actions: "",
      deficiency1: "",
    }),
    staff1_name: "",
    staff1_desg: "",
    staff1_sign: "",
    staff2_name: "",
    staff2_desg: "",
    staff2_sign: "",
    staff3_name: "",
    staff3_desg: "",
    staff3_sign: "",
  };

  const [formValues, setFormValues] = useState(initialFormState);

  const handleInputChange = (workKey, index, key, value = null) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [key]: value !== null ? value : item[key] === "❌" ? "✔" : "❌",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };

  const handleInputChanges = (workKeys, indexs, keys, value = null) => {
    const updatedWorkArray = formValues[workKeys].map((item, idxx) => {
      if (idxx === indexs) {
        return {
          ...item,
          [keys]: value !== null ? value : item[keys] === "❌" ? "✔" : "❌",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeys]: updatedWorkArray });
  };

  const handleSelectAllChange = (workKey, index, isChecked) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item };
        for (let key in updatedItem) {
          if (key.startsWith("TOM")) {
            updatedItem[key] = isChecked ? "✔" : "❌";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };

  const handleSelectAllChanges = (workKeys, indexs, isChecked) => {
    const updatedWorkArray = formValues[workKeys].map((item, idxx) => {
      if (idxx === indexs) {
        const updatedItem = { ...item };
        for (let keys in updatedItem) {
          if (keys.startsWith("EC")) {
            updatedItem[keys] = isChecked ? "✔" : "❌";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKeys]: updatedWorkArray });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  const labels = [
   "Check Fixing & Alignment of all modules of TOM",
    "Checking of all Cable connection and dressing",
    "Check Date and Time",
    "Check Lubrication of all locks with silicone oil",
    "Cleaning of Opto sensor,Antenna,Token tray,Reject bin,Token box,token path,token hopper",
    "Cleaning of all modules of TOM",
    " Cleaning of Trench",
    "Card Reader Writer (CRW) Test",
    "Printer Test",
    "Passenger Dispaly Unit (PDU) Test",
    "Token Dispensing Machine (TDM) Test",
    "Touch Screen Test",
    "Counter Communication System Test",
    "Keyboard, Mouse Test",
    "Check LAN Status",
    "Check Power strip",
  ];

  const labels1 = [
    "Checking of all Cable connection and dressing",
    " Tightening of all Electrical Connection in EC",
    " Checking of all indicators",
    "Cleaning of Isolator and all Electrical Cabinet",
    "ELCB  Push Button Operation",
    "Testing of Isolator Mode selector",
  ];


  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
            AFC PREVENTIVE MAINTENANCE CHECKLIST(TOM HALF YEARLY)
            </Link>
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
            List
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="form-container" style={{ marginLeft: "0", marginRight: "0", maxWidth: "99%" }}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading"> AFC PREVENTIVE MAINTENANCE CHECKLIST(TOM HALF YEARLY)</h3>
                <span className="line-box" style={{width:"900px"}}></span>
              </div>
              <div className='row mb-3'>
              <div className="col-md-12">
              <label htmlFor="inputstation" className="form-label">
                    Station
                  </label>
                  <select
                    className="form-control"
                    id="station"
                  onChange={(e) =>
                    setFormValues({ ...formValues, stn_name: e.target.value })
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
              </div>
              <div className='row mb-3'>
                <label className='col-md-4' style={{ textAlign: "left" }}>Description</label>
                <label className="col-md-9" style={{ textAlign: "center" }}>TOM</label>
                
              </div>
              {labels.map((label, index) => (
                <FormSection
                  key={index}
                  label={label}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  handleSelectAllChange={handleSelectAllChange}
                  workKey="activities1"
                  index={index}
                />
              ))}

              <div className='row mb-3'>
                <label className='col-md-4' style={{ textAlign: "left" }}>Description</label>
                <label className="col-md-14" style={{ textAlign: "right" }}>EC</label>
                <label className='col-md-6' style={{ textAlign: "right" }}>Remarks</label>
                <label className='col-md-3' style={{ textAlign: "right" }}>Action Taken</label>
                <label className='col-md-7' style={{ textAlign: "center" }}>Deficiency</label>
              </div>
              {labels1.map((label, indexs) => (
                <FormSection1
                  keys={indexs}
                  label={label}
                  formValues={formValues}
                  handleInputChanges={handleInputChanges}
                  handleSelectAllChanges={handleSelectAllChanges}
                  workKeys="activities2"
                  indexs={indexs}
                />
              ))}
<div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputName" className="form-label">
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
                  <label for="inputempid" className="form-label">
                    Designation
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
                  <label for="inputempid" className="form-label">
                  ID
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff1_sign: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputName" className="form-label">
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
                  <label for="inputempid" className="form-label">
                    Designation
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
                  <label for="inputempid" className="form-label">
                  ID
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_sign: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputName" className="form-label">
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
                  <label for="inputempid" className="form-label">
                    Designation
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
                  <label for="inputempid" className="form-label">
                  ID
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_sign: e.target.value,
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
  handleInputChange,
  handleSelectAllChange,
  workKey,
  index,
}) => {
  const isAllSelected = [
    "TOM1",
    "TOM2",
    "TOM3",
    "TOM4",
    "TOM5",
    "TOM6",
    "TOM7",
  ].every((g) => formValues[workKey][index][g] === "✔");

  return (
    <div className="row mb-3">
      <div className="col-md-7">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center col-md-12 flex-wrap ">
            <label
              className="form-label mb-0"
              style={{ textAlign: "left", flex: "none", width: "fit-content" }}
            >
              {label} 
              </label>
              </div>
              <div className='col-md-2'>
              <input
                type="checkbox"
                id={`${workKey}SelectAll${index}`}
                checked={isAllSelected}
                onChange={(e) =>
                  handleSelectAllChange(workKey, index, e.target.checked)
                }
              />
              <label
                style={{ fontSize: "14px" }}
                htmlFor={`${workKey}SelectAll${index}`}
              >
                {isAllSelected ? "UnCheck All" : "Check All"}
              </label>
            
          </div>

          <div className="d-flex gap-2 justify-content-between">
            {["TOM1", "TOM2", "TOM3", "TOM4", "TOM5","TOM6","TOM7"].map(
              (g) => (
                <div key={g}>
                  <input
                    type="checkbox"
                    id={`${workKey}${g}${index}`}
                    name={`${workKey}${g}${index}`}
                    checked={formValues[workKey][index][g] === "✔"}
                    onChange={() => handleInputChange(workKey, index, g)}
                  />
                  <label>{g}</label>
                </div>
              )
            )}
          </div>

          </div>
          <div className="row mt-2">
          <div className="col-md-4">
            <label>Remarks/Deficiencies</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].remark}
              onChange={(e) =>
                handleInputChange(workKey, index, "remark", e.target.value)
              }
            />
          </div>
          <div className="col-md-3">
            <label>Action Taken</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].action}
              onChange={(e) =>
                handleInputChange(workKey, index, "action", e.target.value)
              }
            />
          </div>
          <div className="col-md-5">
            <label>Why Deficiency Could Not Be Rectified</label>
            <input
              type="text"
              className="form-control"
              value={formValues[workKey][index].deficiency}
              onChange={(e) =>
                handleInputChange(workKey, index, "deficiency", e.target.value)
              }
            />
          </div>
        </div>

       



      </div>
    </div>



  );

};
const FormSection1 = ({
  label,
  formValues,
  handleInputChanges,
  handleSelectAllChanges,
  workKeys,
  indexs,
}) => {
  const isAllSelected = [
   "EC1",
      "EC2",
      "EC3",
      "EC4",
      "EC5",
      "EC6",
      "EC7",
  ].every((c) => formValues[workKeys][indexs][c] === "✔");

  return (
    <div className="row mb-3">
      <div className="col-md-7">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center col-md-6 flex-wrap ">
            <label
              className="form-label mb-0"
              style={{ textAlign: "left", flex: "none", width: "fit-content" }}
            >
              {label} 
              </label>
              </div>
              <div className='col-md-2'>
              <input
                type="checkbox"
                id={`${workKeys}SelectAll${indexs}`}
                checked={isAllSelected}
                onChange={(e) =>
                  handleSelectAllChanges(workKeys, indexs, e.target.checked)
                }
              />
              <label
                style={{ fontSize: "14px"  }}
                htmlFor={`${workKeys}SelectAll${indexs}`}
              >
                {isAllSelected ? "UnCheck All" : "Check All"}
              </label>
            
          </div>

          <div className="d-flex gap-0 justify-content-between">
            {["EC1", "EC2", "EC3", "EC4", "EC5","EC6","EC7"].map(
              (c) => (
                <div keys={c}>
                  <input
                    type="checkbox"
                    id={`${workKeys}${c}${indexs}`}
                    name={`${workKeys}${c}${indexs}`}
                    checked={formValues[workKeys][indexs][c] === "✔"}
                    onChange={() => handleInputChanges(workKeys, indexs, c)}
                  />
                  <label>{c}</label>
                </div>
              )
            )}
          </div>


          <div className="col-md-3">

            <input
              type="text"
              className="form-control"
              value={formValues[workKeys][indexs].remarks}
              onChange={(e) =>
                handleInputChanges(workKeys, indexs, "remarks", e.target.value)
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              value={formValues[workKeys][indexs].actions}
              onChange={(e) =>
                handleInputChanges(workKeys, indexs, "actions", e.target.value)
              }
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              value={formValues[workKeys][indexs].deficiency1}
              onChange={(e) =>
                handleInputChanges(workKeys, indexs, "deficiency1", e.target.value)
              }
            />
          </div>

        </div>



      </div>
    </div>



  );

};




export default AFCPREVENTIVEMAINTENANCCHECKLISTHalfYearly;