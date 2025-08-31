import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/monika/DailycheckReducer";
import { formatDate } from "../../data/formatDate";

const DailycheckRegister = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const DailycheckRegisterList = useSelector((state) => state.Dailycheck);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (DailycheckRegisterList) {
      setSlug(DailycheckRegisterList.slug);
    }
  }, [DailycheckRegisterList]);
  const jobLabels = [
    "Check Health status of all server and storage",
    "Check LED indication of Storage drive and networking equipments",
    "Check master clock LED status on NTP servers",
    "Check any pending or failed transaction files of previous day & current day in CC",
    "Check if excessive heat accumulated inside all Rack",
    "Check if any abnormal sound coming from OCC equipment and racks",
    "Check LAN status of all station and OCC equipment",
    // "Check Services AVW windows service on web Server-2 ( WEB-1 it should be OFF and WEB-2 it should be ON) in CC",
    "Check if web top up website are working",
    "Check device communication of Individual devices and SC( i.e. each devices should send data to CC)",
    "Check CC and CCHS backups (veritas application)",
    "Check NMS status ( Ops manager)",
    "Check tracing of all Ring of CC",
    "Check APP and DB cluster status of CC & CCHS",
    "Check CCHS services (Watcher, transaction, EOD & Security Service)",
    "Check EOD module( settlement date should be of previous day) in CCHS",
    "Check any pending or failed XDR/XML files of previous day and current day in CCHS",
    "Check FTP and Backup folder transaction file status in CCHS",
    "Check redundancy of Application & DB server of CC and CCHS(Bi-weekly)",

    "Check shared storage of backup, application and DB server( Every Saturday)",
    "Check CC and CCHS housekeeping (Every Saturday)",
    "Checking of SC backup (Every Saturday)",
    "Checking of Space/memory availability in SC (Every Saturday)",
    "Checking of output data cleaner job on SC( Every Saturday)",
    "Check antivirus update (Bi-weekly)",

    "Serviceability of GATE",
    "Serviceability of TOM/EFO",
    "Serviceability of SC",
    "Serviceability of AVM",
    "Serviceability of TVM",
    "Serviceability of RCTM",
    "Check Blacklist and greenlist (every saturady)",
    // "SERVER ROOM TEMP",
    // "WORKSTN ROOM TEMP",
    // "SDC ROOM TEMP",
  ];
  const temp=[{
 label:"SERVER ROOM TEMP",
 mor:"server_Temp_morning",
 eve:"server_Temp_evening"
  }
  ]
  const basicInitialValues = {
    job1_morningstatus: "",
    job1_eveningstatus: "",
    job2_morningstatus: "",
    job2_eveningstatus: "",
    job3_morningstatus: "",
    job3_eveningstatus: "",
    job4_morningstatus: "",
    job4_eveningstatus: "",
    job5_morningstatus: "",
    job5_eveningstatus: "",
    job6_morningstatus: "",
    job6_eveningstatus: "",
    job7_morningstatus: "",
    job7_eveningstatus: "",
    job8_morningstatus: "",
    job8_eveningstatus: "",
    job9_morningstatus: "",
    job9_eveningstatus: "",
    job10_morningstatus: "",
    job10_eveningstatus: "",
    job11_morningstatus: "",
    job11_eveningstatus: "",
    job12_morningstatus: "",
    job12_eveningstatus: "",
    job13_eveningstatus: "",
    job13_morningstatus: "",
    job14_eveningstatus: "",
    job14_morningstatus: "",
    job15_eveningstatus: "",
    job15_morningstatus: "",
    job16_eveningstatus: "",
    job16_morningstatus: "",
    job17_eveningstatus: "",
    job17_morningstatus: "",
    job18_eveningstatus: "",
    job18_morningstatus: "",
    job19_eveningstatus: "",
    job19_morningstatus: "",
    job20_eveningstatus: "",
    job20_morningstatus: "",
    job21_eveningstatus: "",
    job21_morningstatus: "",
    job22_eveningstatus: "",
    job22_morningstatus: "",
    job23_eveningstatus: "",
    job23_morningstatus: "",
    job24_eveningstatus: "",
    job24_morningstatus: "",
    job25_eveningstatus: "",
    job25_morningstatus: "",
    job26_eveningstatus: "",
    job26_morningstatus: "",
    job27_eveningstatus: "",
    job27_morningstatus: "",
    job28_eveningstatus: "",
    job28_morningstatus: "",
    job29_eveningstatus: "",
    job29_morningstatus: "",
    job30_eveningstatus: "",
    job30_morningstatus: "",
    job31_eveningstatus: "",
    job31_morningstatus: "",
    job32_eveningstatus: "",
    job32_morningstatus: "",
    server_Temp_morning: "",
    server_Temp_evening: "",
    work_Temp_morning: "",
    work_Temp_evening: "",
    Sdc_Temp_morning: "",
    Sdc_Temp_evening: "",
    remark:"",
    name_morning: "",
    name_evening: "",
    emp_no_morning: "",
    emp_no_evening: "",
    sign_morning: "",
    sign_evening: "",
    date: "",
    morningtime: "",
    eveningtime: "",
    employee_id: "21",
    department: "s&t",
    unit: "AFC-SDC",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const [selectAllMorning, setSelectAllMorning] = useState(false);
  const [selectAllEvening, setSelectAllEvening] = useState(false);

  const handleChange = (jobIndex, period, value) => {
    setFormValues({
      ...formValues,
      [`job${jobIndex}_${period}status`]: value ? "yes" : "no",
    });
  };

  const handleTempChange = ( period, value) => {
    setFormValues({
      ...formValues,
      [period]: value ,
    });
  };
  const handleSelectAllChange = (period, value) => {
    const updatedFormValues = { ...formValues };
    jobLabels.forEach((_, index) => {
      const jobIndex = index + 1;
      updatedFormValues[`job${jobIndex}_${period}status`] = value ? "yes" : "no";
    });
    setFormValues(updatedFormValues);
  };

  const handleSelectAllMorningChange = (e) => {
    setSelectAllMorning(e.target.checked);
    handleSelectAllChange("morning", e.target.checked);
  };

  const handleSelectAllEveningChange = (e) => {
    setSelectAllEvening(e.target.checked);
    handleSelectAllChange("evening", e.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Daily Check
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between form-label gap-3">
                  <input type="date" name="date" placeholder="date" onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          date: e.target.value,
                        })
                      }/>
                  <div className="d-flex gap-3">
                  <input type="time" name="morningtime" placeholder="morning time" onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          morningtime: e.target.value,
                        })
                      }/>
                     <input type="time" name="eveningtime" placeholder="evening time" onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          eveningtime: e.target.value,
                        })
                      }/>
                  </div>
                </div>
              <div>
                <div className="d-flex justify-content-between form-label">
                  <span>Description</span>
                  <div className="d-flex gap-3">
                    <span>Morning</span>
                    <span>Evening</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12 d-flex align-items-center">
                    <label className="form-label text-start m-0">
                      Select All
                    </label>
                    <div className="d-flex gap-5">
                      <input
                        type="checkbox"
                        style={{ width: "20px", height: "20px" }}
                        id="select-all-morning"
                        checked={selectAllMorning}
                        onChange={handleSelectAllMorningChange}
                      />
                      <input
                        type="checkbox"
                        style={{ width: "20px", height: "20px" }}
                        id="select-all-evening"
                        checked={selectAllEvening}
                        onChange={handleSelectAllEveningChange}
                      />
                    </div>
                  </div>
                </div>
                {jobLabels.map((label, index) => {
                  const jobIndex = index + 1;
                  return (
                    <div className="row mb-3" key={jobIndex}>
                      <div className="col-md-12 d-flex align-items-center">
                        <label className="form-label text-start m-0">
                          {label}
                        </label>
                        <div className="d-flex gap-5">
                          <input
                            type="checkbox"
                            style={{ width: "20px", height: "20px" }}
                            id={`morning-${jobIndex}`}
                            checked={
                              formValues[`job${jobIndex}_morningstatus`] ===
                              "yes"
                            }
                            onChange={(e) =>
                              handleChange(
                                jobIndex,
                                "morning",
                                e.target.checked
                              )
                            }
                          />
                          <input
                            type="checkbox"
                            style={{ width: "20px", height: "20px" }}
                            id={`evening-${jobIndex}`}
                            checked={
                              formValues[`job${jobIndex}_eveningstatus`] ===
                              "yes"
                            }
                            onChange={(e) =>
                              handleChange(
                                jobIndex,
                                "evening",
                                e.target.checked
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
 {temp.map((itm, index) => {
                 
                  return (
                    <div className="row mb-3" key={index}>
                      <div className="col-md-12 d-flex align-items-center">
                        <label className="form-label text-start m-0">
                          {itm.label}
                        </label>
                        <div className="d-flex gap-5">
                      <input
                        type="text"
                      id={`inputTemp-${index}`}
                      placeholder="Morning"
                        
                      onChange={(e) =>
                        handleTempChange(
                          itm.mor,
                          
                          e.target.value
                        )
                      }
                      />
                      <input
                          type="text"
                          id={`inputTemp-${index}`}
                          placeholder="Evening"
                        onChange={(e) =>
                          handleTempChange(
                            itm.eve,
                            
                            e.target.value
                          )
                        }
                      />
                    </div>
                        </div>
                        </div>
                  )
                })
              }


              </div>
              <div className="row mb-3">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  <label
                    htmlFor="inputNAME"
                    className="form-label text-start m-0"
                  >
                    Remark
                  </label>
                  <div className="mb-2">
                    <input
                      type="text"
                      style={{width:450}}
                      id="inputNAME"
                      placeholder="Remark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark: e.target.value,
                        })
                      }
                    />
                   
                </div>
              </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  <label
                    htmlFor="inputNAME"
                    className="form-label text-start m-0"
                  >
                    Staff Name
                  </label>
                  <div className="d-flex gap-3">
                    <input
                      type="text"
                      id="inputNAME"
                      placeholder="Morning"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          name_morning: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      id="inputSDCROOM"
                      placeholder="Evening"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          name_evening: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  <label
                    htmlFor="inputEMPNO"
                    className="form-label text-start m-0"
                  >
                    Staff Emp No
                  </label>
                  <div className="d-flex gap-3">
                    <input
                      type="text"
                      id="inputEMPNO"
                      placeholder="Morning"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          emp_no_morning: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      id="inputSDCROOM"
                      placeholder="Evening"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          emp_no_evening: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              {/* <div className="row mb-3">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  <label
                    htmlFor="inputSIGN"
                    className="form-label text-start m-0"
                  >
                    Staff Sign
                  </label>
                  <div className="d-flex gap-3">
                    <input
                      type="text"
                      id="inputSIGN"
                      placeholder="Morning"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          sign_morning: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      id="inputSIGN"
                      placeholder="Evening"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          sign_evening: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div> */}

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
  );
};

export default DailycheckRegister;
