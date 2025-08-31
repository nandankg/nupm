import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
} from "../../reducer/chanchal/StationDiaryReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json"; // Update the path to your station.json

const StationDiaryEdit = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const StationDiaryList = useSelector((state) => state.stationDiary);
  console.log(StationDiaryList.data.data);
  const [items, setItems] = useState([]);
  const itmm = StationDiaryList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(StationDiaryList.data.data);
  }, []);
  useEffect(() => {
    setItems(StationDiaryList.data.data);
  }, [StationDiaryList]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

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
    {
      category: "Details of Maintenance Activity",
      activity: "Remark",
    },
  ];
  const shiftRanges = ["Shift A", "Shift B", "Shift C"];

  const [shiftRange, setShiftRange] = useState("Shift A");

  const fd = filteredData[0];
  const [formValues, setFormValues] = useState({
    id: fd.id,
    Station: fd.Station,
    date: formatDate(new Date().toDateString()),
    shift: shiftactivity.map(() => ({
      // range: "Shift A",
      checked: fd.checked,
      val: fd.val,
      Remarks: fd.Remarks,
    })),
    // shift: fd.shift,
    range: fd.range,
    A_Staken: fd.A_Staken,
    A_Shanded: fd.A_Shanded,
    A_Ntaken: fd.A_Ntaken,
    A_Nhanded: fd.A_Nhanded,
    A_Dtaken: fd.A_Dtaken,
    A_Dhanded: fd.A_Dhanded,
    A_Etaken: fd.A_Etaken,
    A_Ehanded: fd.A_Ehanded,
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
  });

  // const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate("/list/station-diary-signalling");
  };

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
              <h3 className="form-heading">
                Edit : STATION DIARY (SIGNALLING)
              </h3>
              <div className="heading-line"></div>
            </div>
            <div className="d-flex row mb-3">
              <div className="col-md-2 ml-5">
                <label htmlFor="inputstation" className="form-label">
                  Station
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
                  <option>Signal 1 </option>
                  <option>Signal 2 </option>
                  <option>Signal 3 </option>
                </select>
              </div> */}
              <div className="col-md-2">
                <label htmlFor="shift" className="form-label">
                  Shift
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
                  value={formValues.Zone}
                  id="inputZone"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      Zone: e.target.value,
                    })
                  }
                >
                  <option>TPD</option>
                  <option>TPNR</option>
                  <option>HSGJ</option>
                  <option>IDNM</option>
                </select>
              </div>
              <div className="col-md-2 " style={{ marginLeft: "270px" }}>
                <label htmlFor="org" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={formValues.date}
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
                        <option>N/A</option>
                        <option>N,R,N</option>
                        <option>R,R to N</option>
                        {/* <option>N-R</option>
                                                <option>R-R</option>
                                                <option>R-N</option>
                                                <option>N/A</option> */}
                      </select>

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
                        <option value="OK">OK</option>
                        <option value="NOK">NOK</option>
                        <option value="N/A">N/A</option>
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
                </div>
              );
            })}

            <div className="row mb-3">
              <h4 className="text-center  p-3"> Charge Taken Over By</h4>
              {/* <h5 className="fw-bold p-3">Shift A : </h5> */}

              <div className="col-md-4">
                <label for="inputA_Ntaken" className="form-label">
                  Name
                </label>
                <input
                  type="Text"
                  className="form-control"
                  value={formValues.A_Ntaken}
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
                  value={formValues.A_Etaken}
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
                  value={formValues.A_Dtaken}
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
                  value={formValues.A_Staken}
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
              <h4 className="text-center  p-3"> Charge Handed Over By</h4>
              {/* <h5 className="fw-bold p-3">Shift A : </h5> */}
              <div className="col-md-4">
                <label for="inputA_Nhanded" className="form-label">
                  Name
                </label>
                <input
                  type="Text"
                  className="form-control"
                  value={formValues.A_Nhanded}
                  id="inputA_Nhanded"
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
                  value={formValues.A_Ehanded}
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
                  value={formValues.A_Dhanded}
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
                  value={formValues.A_Shanded}
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

export default StationDiaryEdit;

