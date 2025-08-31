import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { addData } from "../../reducer/chanchal/StationDiaryReducer";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json"; // Update the path to your station.json


const shiftactivity = [
  {
    category: "Details of Maintenance Activity",
    activity: "Checking of all Signalling sub-system as per check list",
  },
  {
    category: "Details of Maintenance Activity",
    activity:
      "Availability of Tools,Test Equipments, Peripherals, Application Drawings and Manuals as per list. (Remarks for deficiency, if any to initiate Replenishment for the same)",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "Checking of SER Temperature & Humidity Reading",
  },
  {
    category: "Details of Maintenance Activity",
    activity:
      "Checking of spares available as per List.(Remarks for deficiency, if any to initiate Replenishment for the same)",
  },
  {
    category: "Details of Maintenance Activity",
    activity:
      "Checking of Signalling Equipment installed in SCR (LATS/VDU/LRB/ESP/EKT etc.)",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "Faulty AC in SER",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "Availability of Consumable Items",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "Point Operation from VDU/LATS",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "Error Code, Variables & Logs on SDM",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "CLC Changeover",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "Shift Preventive/ Corrective maintenance details",
  },
  {
    category: "Details of Maintenance Activity",
    activity: "Gang Member List",
  },
 
];
const shiftRanges = ["Shift A", "Shift B", "Shift C"];

const StationDiaryReg = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const espshift = useSelector((state) => state.stationDiary || []);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (espshift) {
      setSlug(espshift.slug);
    }
  }, [espshift]);

  const [shiftRange, setShiftRange] = useState("Shift A");
  const [formValues, setFormValues] = useState({
    Station: "",
    date: "",
    shift: shiftactivity.map(() => ({
      checked: "",
      val: "",
      Remarks: "",
    })),
    range: "Shift A",
    A_Staken: "",
    A_Shanded: "",
    A_Ntaken: "",
    A_Nhanded: "",
    A_Dtaken: "",
    A_Dhanded: "",
    A_Etaken: "",
    A_Ehanded: "",
    employee_id: "",
    department: "",
    unit: "",
  });

  const shiftRangeHandler = (event) => {
    const selectedRange = event.target.value;
    setShiftRange(selectedRange);
    setFormValues((prevValues) => ({
      ...prevValues,
      pointNo: selectedRange,
      range: selectedRange, // Update name with selectedRange
    }));
  };

  const handleChange = (index, field, value) => {
    setFormValues((prevValues) => {
      const updatedShift = prevValues.shift.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prevValues, shift: updatedShift };
    });
  };

  // Import user data for auto-fill
  const user = JSON.parse(localStorage.getItem("userdata"));
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate required fields
    if (!formValues.Station || !formValues.date || !formValues.range) {
      alert('Please fill all required fields: Station, Date, and Shift');
      return;
    }
    
    try {
      // Show loading state
      const submitButton = event.target.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Saving...';
      submitButton.disabled = true;
      
      // Add timestamp and employee auto-fill
      const submitData = {
        ...formValues,
        submissionDate: new Date().toISOString(),
        // Auto-populate employee data
        employee_id: formValues.employee_id || (user?.profileid || 'AUTO_EMP_001'),
        department: formValues.department || (user?.department || 'Signalling'),
        unit: formValues.unit || 'SIGNALLING',
      };
      
      // Save to local storage as backup
      const backupData = JSON.parse(localStorage.getItem('stationDiaryBackup') || '[]');
      backupData.push({...submitData, id: Date.now().toString(), status: 'pending'});
      localStorage.setItem('stationDiaryBackup', JSON.stringify(backupData));
      
      // Dispatch to API
      const result = await dispatch(addData(submitData)).unwrap();
      
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      
      if (result.success || result.message?.includes('success')) {
        alert('Station Diary saved successfully!');
        // Reset form
        setFormValues({
          Station: '',
          date: '',
          shift: shiftactivity.map(() => ({
            checked: '',
            val: '',
            Remarks: '',
          })),
          range: 'Shift A',
          A_Staken: '',
          A_Shanded: '',
          A_Ntaken: '',
          A_Nhanded: '',
          A_Dtaken: '',
          A_Dhanded: '',
          A_Etaken: '',
          A_Ehanded: '',
          employee_id: '',
          department: '',
          unit: '',
        });
        setShiftRange('Shift A');
        
        navigate(`/list/${slug}`);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error saving Station Diary:', error);
      alert('Error saving data. Data has been saved locally and will be synced when connection is available.');
      
      // Reset button state
      const submitButton = event.target.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.textContent = 'Save';
        submitButton.disabled = false;
      }
    }
  };

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            STATION DIARY (SIGNALLING)
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>

      <div className="row justify-content-center">
        <div
          className="form-container "
          style={{ marginLeft: "0", marginRight: "0", maxWidth: "94%" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              <h3 className="form-heading">STATION DIARY (SIGNALLING)</h3>
              <div className="heading-line"></div>
            </div>
            <div className="d-flex row mb-3">
              <div className="col-md-2 ml-5">
                <label htmlFor="inputstation" className="form-label">
                  Station *
                </label>
                <select
                  className="form-control"
                  id="station"
                  value={formValues.Station}
                  onChange={(e) =>
                    setFormValues({ ...formValues, Station: e.target.value })
                  }
                  required
                >
                  <option value="">Select Station</option>
                  {stationData
                    .filter((station) => 
                      station["Station Name"] && 
                      !station["Station Name"].includes('AFC') && 
                      !station["Station Name"].includes('Store')
                    ) // Exclude AFC and Store entries
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
              {/* <div className="col-md-2 ml-5">
                <label htmlFor="station" className="form-label">
                  Station
                </label>
                <select
                  id="station"
                  name="station"
                  className="form-control"
                  // style={{ margin: "0 10px 10px 0", paddingRight: "50px" }}
                  value={formValues.Station}
                  onChange={(e) =>
                    setFormValues({ ...formValues, Station: e.target.value })
                  }
                >
                  <option> Select Station </option>
                  <option>Signal 1 </option>
                  <option>Signal 2 </option>
                  <option>Signal 3 </option>
                </select>
              </div> */}
              <div className="col-md-2">
                <label htmlFor="shift" className="form-label">
                  Shift *
                </label>
                <select
                  onChange={shiftRangeHandler}
                  value={shiftRange}
                  name="shiftRange"
                  className="form-control"
                  style={{ margin: "0 10px 10px 0" }}
                >
                  {shiftRanges.map((range, index) => (
                    <option key={index} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <label for="inputZone" className="form-label">
                  IXL Zone
                </label>
                <select
                  type="text"
                  className="form-control"
                  id="inputZone"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      Zone: e.target.value,
                    })
                  }
                >
                  <option>Select Zone</option>
                  <option>TPD</option>
                  <option>TPNR</option>
                  <option>HSGJ</option>
                  <option>IDNM</option>
                </select>
              </div>
              <div className="col-md-2 " style={{ marginLeft: "270px" }}>
                <label htmlFor="org" className="form-label">
                  Date *
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="org"
                  name="date"
                  onChange={(e) =>
                    setFormValues({ ...formValues, date: e.target.value })
                  }
                />
              </div>
            </div>
            {shiftactivity.map((activity, index) => {
              const shouldPrintCategory =
                index === 0 ||
                activity.category !== shiftactivity[index - 1].category;

              // ||shiftActivities[index - 1].category;

              return (
                <div key={index} className="mb-3">
                  {shouldPrintCategory && (
                    <div className="row">
                      <label className="form-label mb-1">
                        {activity.category}
                        {/* {activity.Sno} */}
                      </label>
                    </div>
                  )}
                  {activity.activity==="CLC Changeover"?(
                    
                  <label
                    className="form-label mb-0 d-flex justify-content-between align-items-center"
                    style={{ textAlign: "left" }}
                  >
                    {activity.activity}
                    <div className="d-flex gap-3 col-md-6">
                      <select
                        className=" "
                        id="dept"
                        name="dept"
                        onChange={(e) =>
                          handleChange(index, "val", e.target.value, "shift")
                        }
                        value={formValues.shift[index].val}
                      >
                        <option>Select </option>
                        <option>N</option>
                        <option>R</option>
                        <option>N to R</option>
                        <option>R to N</option>
                        {/* <option>R-N</option>
                                                <option>N/A</option> */}
                      </select>

                      
                      <input
                        type="text"
                        placeholder="Remarks"
                        value={formValues.shift[index].Remarks} // Ensure value is correctly mapped
                        onChange={(e) =>
                          handleChange(index, "Remarks", e.target.value)
                        } // Correctly set Remarks
                      />
                      </div>
                  </label>
                  
                      ):( <label
                    className="form-label mb-0 d-flex justify-content-between align-items-center"
                    style={{ textAlign: "left" }}
                  >
                    {activity.activity}
                    <div className="d-flex gap-3 col-md-6">
                     

                      <select
                        className=" "
                        id="dept"
                        name="dept"
                        onChange={(e) =>
                          handleChange(
                            index,
                            "checked",
                            e.target.value,
                            "shift"
                          )
                        }
                        value={formValues.shift[index].checked}
                      >
                        <option>Select Status</option>
                        <option value="DONE">DONE</option>
                        <option value="NOT DONE">NOT DONE</option>
                        <option value="OK">OK</option>
                        <option value="NOK">NOK</option>
                        <option value="N/A">None</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Remarks"
                        value={formValues.shift[index].Remarks} // Ensure value is correctly mapped
                        onChange={(e) =>
                          handleChange(index, "Remarks", e.target.value)
                        } // Correctly set Remarks
                      />
                      </div>
                      </label>
                      )}
                      {/* <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Remarks"
                                                value={formValues.shift[index]?.Remarks}
                                                id="inputRemarks"
                                                onChange={(e) =>
                                                    setFormValues({
                                                        ...formValues,
                                                        Remarks: e.target.value,
                                                    })
                                                }
                                            /> */}
                    </div>
                 
              );
            })}

            <div className="row mb-3">
              <h4 className="text-center p-3"> Charge Taken Over By</h4>
              {/* <h5 className="fw-bold p-3">Shift A : </h5> */}

              <div className="col-md-4">
                <label for="inputA_Ntaken" className="form-label">
                  Name
                </label>
                <input
                  type="Text"
                  className="form-control"
                  id="inputA_Ntaken"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      A_Ntaken: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-4">
                <label for="inputA_Etaken" className="form-label">
                  Employee No
                </label>
                <input
                  type="Text"
                  className="form-control"
                  id="inputA_Etaken"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      A_Etaken: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-4">
                <label for="inputA_Dtaken" className="form-label">
                  Designation
                </label>
                <input
                  type="Text"
                  className="form-control"
                  id="inputA_Dtaken"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      A_Dtaken: e.target.value,
                    })
                  }
                />
              </div>
              {/* <div className="col-md-3">
                <label for="inputA_Staken" className="form-label">
                  Sign
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputA_Staken"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      A_Staken: e.target.value,
                    })
                  }
                />
              </div> */}
            </div>
            <div className="row mb-3">
              <h4 className="text-center p-3"> Charge Handed Over By</h4>
              {/* <h5 className="fw-bold p-3">Shift A : </h5> */}
              <div className="col-md-4">
                <label for="inputA_Nhanded" className="form-label">
                  Name
                </label>
                <input
                  type="Text"
                  className="form-control"
                  id="inputA_Nhanded"
                  required
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      A_Nhanded: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-4">
                <label for="inputA_Ehanded" className="form-label">
                  Employee No
                </label>
                <input
                  type="Text"
                  className="form-control"
                  id="inputA_Ehanded"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      A_Ehanded: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-4">
                <label for="inputA_Dhanded" className="form-label">
                  Designation
                </label>
                <input
                  type="Text"
                  className="form-control"
                  id="inputA_Dhanded"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      A_Dhanded: e.target.value,
                    })
                  }
                />
              </div>
              {/* <div className="col-md-3">
                <label for="inputA_Shanded" className="form-label">
                  Sign
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputA_Shanded"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      A_Shanded: e.target.value,
                    })
                  }
                />
              </div> */}
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
  );
};
export default StationDiaryReg;
