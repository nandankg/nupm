import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, editData } from "../../reducer/monika/DailycheckReducer";
import { formatDate } from "../../data/formatDate";
import { setSelectedId } from "../../reducer/RedirectReducer";
function DailycheckRegisterEdit() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const { id } = location.state;
  // console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const DailycheckRegisterList = useSelector((state) => state.Dailycheck);
  const sid = useSelector((state) => state.redirect);
  const [id, setId] = useState(sid.selectedId);
  console.log(DailycheckRegisterList.data.data);
  const [items, setItems] = useState([]);
  const [systems, setSystems] = useState([]);
  const itmm = DailycheckRegisterList.data.data;
  console.log(id);
  useEffect(() => {
    dispatch(fetchData());
    setItems(DailycheckRegisterList.data.data);
  }, []);
  useEffect(() => {
    setItems(DailycheckRegisterList.data.data);
    setSlug(DailycheckRegisterList.slug);
  }, [DailycheckRegisterList]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

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
  ];
  const temp = [
    {
      label: "SERVER ROOM TEMP",
      mor: "server_Temp_morning",
      eve: "server_Temp_evening",
    },
  ];

  const fd = filteredData[0];
  const basicInitialValues = {
    id: fd.id,
    remark: fd.remarks,
    date: formatDate(fd.date),
    job1_morningstatus: fd.job1_morningstatus,
    job1_eveningstatus: fd.job1_eveningstatus,
    job2_morningstatus: fd.job2_morningstatus,
    job2_eveningstatus: fd.job2_eveningstatus,
    job3_morningstatus: fd.job3_morningstatus,
    job3_eveningstatus: fd.job3_eveningstatus,
    job4_morningstatus: fd.job4_morningstatus,
    job4_eveningstatus: fd.job4_eveningstatus,
    job5_morningstatus: fd.job5_morningstatus,
    job5_eveningstatus: fd.job5_eveningstatus,
    job6_morningstatus: fd.job6_morningstatus,
    job6_eveningstatus: fd.job6_eveningstatus,
    job7_morningstatus: fd.job2_morningstatus,
    job7_eveningstatus: fd.job7_eveningstatus,
    job8_morningstatus: fd.job8_morningstatus,
    job8_eveningstatus: fd.job8_eveningstatus,
    job9_morningstatus: fd.job9_morningstatus,
    job9_eveningstatus: fd.job9_eveningstatus,
    job10_morningstatus: fd.job10_morningstatus,
    job10_eveningstatus: fd.job10_eveningstatus,
    job11_morningstatus: fd.job11_morningstatus,
    job11_eveningstatus: fd.job11_eveningstatus,
    job12_morningstatus: fd.job12_morningstatus,
    job12_eveningstatus: fd.job12_eveningstatus,
    job13_eveningstatus: fd.job13_eveningstatus,
    job13_morningstatus: fd.job13_morningstatus,
    job14_eveningstatus: fd.job14_eveningstatus,
    job14_morningstatus: fd.job14_morningstatus,
    job15_eveningstatus: fd.job15_eveningstatus,
    job15_morningstatus: fd.job15_morningstatus,
    job16_eveningstatus: fd.job16_eveningstatus,
    job16_morningstatus: fd.job16_morningstatus,
    job17_eveningstatus: fd.job17_eveningstatus,
    job17_morningstatus: fd.job17_morningstatus,
    job18_eveningstatus: fd.job18_eveningstatus,
    job18_morningstatus: fd.job18_morningstatus,
    job19_eveningstatus: fd.job19_eveningstatus,
    job19_morningstatus: fd.job19_morningstatus,
    job20_morningstatus: fd.job20_morningstatus,
    job21_eveningstatus: fd.job21_eveningstatus,
    job21_morningstatus: fd.job21_morningstatus,
    job22_morningstatus: fd.job22_morningstatus,
    job22_eveningstatus: fd.job22_eveningstatus,
    job23_morningstatus: fd.job23_morningstatus,
    job23_eveningstatus: fd.job23_eveningstatus,
    job24_morningstatus: fd.job24_morningstatus,
    job24_eveningstatus: fd.job24_eveningstatus,
    job25_morningstatus: fd.job25_morningstatus,
    job25_eveningstatus: fd.job25_eveningstatus,
    job26_morningstatus: fd.job26_morningstatus,
    job26_eveningstatus: fd.job26_eveningstatus,
    job27_morningstatus: fd.job27_morningstatus,
    job27_eveningstatus: fd.job27_eveningstatus,
    job28_morningstatus: fd.job28_morningstatus,
    job28_eveningstatus: fd.job28_eveningstatus,
    job29_morningstatus: fd.job29_morningstatus,
    job29_eveningstatus: fd.job29_eveningstatus,
    job30_morningstatus: fd.job30_morningstatus,
    job30_eveningstatus: fd.job30_eveningstatus,
    job31_morningstatus: fd.job31_morningstatus,
    job31_eveningstatus: fd.job31_eveningstatus,
    job32_morningstatus: fd.job32_morningstatus,
    job32_eveningstatus: fd.job32_eveningstatus,
    server_Temp_morning: fd.server_Temp_morning,
    server_Temp_evening: fd.server_Temp_evening,
    work_Temp_morning: fd.work_Temp_morning,
    work_Temp_evening: fd.work_Temp_evening,
    Sdc_Temp_morning: fd.Sdc_Temp_morning,
    Sdc_Temp_evening: fd.Sdc_Temp_evening,
    name_morning: fd.name_morning,
    name_evening: fd.name_evening,
    emp_no_morning: fd.emp_no_morning,
    emp_no_evening: fd.emp_no_evening,
    sign_morning: fd.sign_morning,
    sign_evening: fd.sign_evening,
    morningtime: fd.morningtime,
    eveningtime: fd.eveningtime,
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  const [selectAllMorning, setSelectAllMorning] = useState(false);
  const [selectAllEvening, setSelectAllEvening] = useState(false);

  console.log(formValues);
  const handleChange = (jobIndex, period, value) => {
    setFormValues({
      ...formValues,
      [`job${jobIndex}_${period}status`]: value ? "yes" : "no",
    });
  };
  const handleTempChange = (period, value) => {
    setFormValues({
      ...formValues,
      [period]: value,
    });
  };
  const handleSelectAllChange = (period, value) => {
    const updatedFormValues = { ...formValues };
    jobLabels.forEach((_, index) => {
      const jobIndex = index + 1;
      updatedFormValues[`job${jobIndex}_${period}status`] = value ? "yes" : "";
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
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/form/daily-checklist-register-sdc"
            >
              Daily Check
            </Link>
            <Link underline="hover" color="inherit">
              Edit
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                {/* <h3 className="form-heading">Daily Check Register</h3>
                <div className="heading-line"></div> */}
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
                            value={formValues[itm.mor]}
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
                            value={formValues[itm.eve]}
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
                  );
                })}
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
                      style={{ width: 450 }}
                      id="inputNAME"
                      value={formValues.remark}
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
                      value={formValues.name_morning}
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
                      value={formValues.name_evening}
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
                      value={formValues.emp_no_morning}
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
                      value={formValues.emp_no_evening}
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
}

export default DailycheckRegisterEdit;
