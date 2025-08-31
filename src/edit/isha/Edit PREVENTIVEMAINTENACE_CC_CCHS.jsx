import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editData, fetchData } from '../../reducer/isha/PREVENTIVEMAINTENACE_CC_CCHSReducer';
import { Breadcrumbs } from '@mui/material';
import stationData from "../../station.json";
const EditPREVENTIVEMAINTENACE_CC_CCHS = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);

  const afcpreventive = useSelector((state) => state.PMLOGBOOK9);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(afcpreventive.data.data);
  const [items, setItems] = useState([]);
  const itmm = afcpreventive.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(afcpreventive.data.data);
  }, []);
  useEffect(() => {
    if (afcpreventive) {
      setSlug(afcpreventive.slug);
    }
  }, [afcpreventive]);
  let dt = [];
  let filteredData;
  console.log(itmm);
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    // console.log(filteredData[0]);
  }
  const fd = filteredData[0];
  const initialFormState = {
    id: fd.id,
    station: fd.station,
    date: fd.date,
    activities1: fd.activities1,
    activities2: fd.activities2,
    station: fd.station,
    staff1_name: fd.staff1_name,
    staff1_desg: fd.staff1_desg,
    staff1_sign: fd.staff1_sign,
    staff2_name: fd.staff2_name,
    staff2_desg: fd.staff2_desg,
    staff2_sign: fd.staff2_sign,
    staff3_name: fd.staff3_name,
    staff3_desg: fd.staff3_desg,
    staff3_sign: fd.staff3_sign,
   
  };
  const [formValues, setFormValues] = useState(initialFormState);
  console.log(formValues);

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
          if (key.startsWith("CC")) {
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
          if (keys.startsWith("C")) {
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
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const labels = [
    "Check Date and Time ",
    "Check Physical condition of all connecting cables and their dressing",
    "Cleaning of  WS CPU (interior & exterior) ",
    "Cleaning and checking of sub modules of WS ( Keyboard and Mouse etc)",
    "Check if all equipments are on LAN ",
    "Check if Fare on client and their sub modules are working",
    "Check if task scheduler are working ( where it is applicable) ",
    "Check if ping services are working (where it is applicable) ",
  ];
  const labels1 = [
    "Check Date and Time",
    " Check Physical condition of all connecting cables and their dressing ",
    " Fixing & Alignment of all modules of BIM,TIM (belt, roller, stacker, hopper etc) ",
    "Cleaning of  CPU (interior & exterior) ",
    "Cleaning and checking of sub modules ( BIM device , CPD device, TDM, Keyboard and Mouse etc) ",
    "Check if all equipments are on LAN ",
    "Check if FareON client and their sub modules are working",
    "Test the functionality of the devices ",
    "Check if external CRW is working",
  ];
  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PREVENTIVE MAINTENACE WORKSHEET OF CC/CCHS  WORKSTATIONS, CC BIM,TIM & CPD ( HALF YEARLY)
            </Link>
            <Link underline="hover" color="inherit">
              Edit
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="form-container" style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}>

            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">EDIT:PREVENTIVE MAINTENACE WORKSHEET OF CC/CCHS WORKSTATIONS,CC BIM,TIM & CPD</h3>
                <span className="line-box" style={{ width: "100%" }}></span>
              </div>
              <div className="row">
              <div className="col-md-6">
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
              <div className="col-md-6">
              <label htmlFor="inputstation" className="form-label">
                    Date
                  </label>
                <input type="date" 
                 className="form-control"
                 id="date"
                 value={formValues.date}
               onChange={(e) =>
                 setFormValues({ ...formValues, date: e.target.value })
               }
                />

              </div>
              </div>
              <div className='row mb-3'>
                <label className='col-md-4' style={{ textAlign: "left" }}>Description</label>
                <label className="col-md-9" style={{ textAlign: "center" }}>CC</label>
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
                <label className="col-md-9" style={{ textAlign: "center" }}>C</label>
                <label className='col-md-6' style={{ textAlign: "right" }}>Remarks</label>
                <label className='col-md-3' style={{ textAlign: "center" }}>Action Taken</label>
                <label className='col-md-7' style={{ textAlign: "left" }}>Deficiency</label>
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
                  <label htmlFor="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={formValues.staff1_name}
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
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.staff1_desg}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff1_desg: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.staff1_sign}
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
                  <label htmlFor="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.staff2_name}
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
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.staff2_desg}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff2_desg: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.staff2_sign}
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
                  <label htmlFor="inputName" className="form-label">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.staff3_name}
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
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.staff3_desg}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        staff3_desg: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.staff3_sign}
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
    "CC1",
    "CC2",
    "CC3",
    "CC4",
    "CC5",
    "CC6",
    "CC7",
    "CCH1",
    "CCH2",
    "CCH3",
  ].every((g) => formValues[workKey][index][g] === "✔");

  return (
    <div className="row mb-3">
      <div className="col-md-12">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center col-md-4 flex-wrap ">
          <label
              className="form-label mb-0"
              style={{ textAlign: "left", flex: "none", width: "fit-content" }}
            >
              {label} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="checkbox"
                id={`${workKey}SelectAll${index}`}
                checked={isAllSelected}
                value={formValues[workKey][index]}
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
            </label>
          </div>

          <div className="d-flex gap-2 justify-content-between">
            {["CC1", "CC1", "CC3", "CC4", "CC5", "CC6", "CC7", "CCH1", "CCH2", "CCH3"].map(
               (g) => (
                <div key={g}>
                  <input
                    type="checkbox"
                    id={`${workKey}${g}${index}`}
                    name={`${workKey}${g}${index}`}
                    checked={formValues[workKey][index][g] === "✔"}
                    value={formValues[workKey][index][g]}
                    onChange={() => handleInputChange(workKey, index, g)}
                  />
                  <label>{g}</label>
                </div>
              )
            )}
          </div>

          </div>
          <div className="row mt-0">
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
    "C1",
    "C2",
    "C3",
    "C4",
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
              {label} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="checkbox"
                id={`${workKeys}SelectAll${indexs}`}
                checked={isAllSelected}
                onChange={(e) =>
                  handleSelectAllChanges(workKeys, indexs, e.target.checked)
                }
              />
              <label
                style={{ fontSize: "14px" }}
                htmlFor={`${workKeys}SelectAll${indexs}`}
              >
                {isAllSelected ? "UnCheck All" : "Check All"}
              </label>
            </label>
          </div>

          <div className="d-flex gap-4 justify-content-between">
            {["C1", "C2", "C3", "C4"].map(
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


          <div className="col-md-4">

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
          <div className="col-md-4">
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




export default EditPREVENTIVEMAINTENACE_CC_CCHS;