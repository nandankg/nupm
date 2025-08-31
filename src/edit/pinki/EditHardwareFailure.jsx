import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import {
  editData,
  fetchData,
} from "../../reducer/pinki/HardwareFailureReducer";

import Papa from "papaparse";


// Function to load file data from the public folder
const loadFileData = async (filePath) => {
  try {
    const response = await fetch(`/${filePath}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};
const EditHardwareFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const hardwarefailure = useSelector((state) => state.hardwarefailure);
  console.log(hardwarefailure.data.data);
  const [items, setItems] = useState([]);
  const [sno, setSno] = useState(1);
  const [system, setSystem] = useState(""); // State for system dropdown
  const [gearId, setGearId] = useState(""); // State for gear ID dropdown
 const [stationsData, setStationsData] = useState({});
  const [station, setStation] = useState(""); // State for station
  const [availableSystems, setAvailableSystems] = useState([]); // Systems based on station
  const [availableGearIds, setAvailableGearIds] = useState([]); // Gear IDs based on system
	const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    sno: sno,
    date_of_replace:"",
    idescrip: "",
    gearid: "",
    old_sr_no: "",
    new_sr_no: "",
    reason_of_replace: "",
    date_of_sending: "",
    date_of_receiving: "",
    date_of_restoration: "",
    sign: "",
    remark: "",
    action: "",
    emp_name: "", // Added EMP Name
    emp_id: "", // Added EMP ID
    system: "", //Added System
    denomination: "", //Added Denomination
    quantity: "", // Added Quantity
    station: "", // Added Station
  });
  // Loading and parsing CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const csvData = await loadFileData("gear_c.csv");
        Papa.parse(csvData, {
          header: false,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim().replace(/^"|"$/g, ""),
          transform: (value) => {
            const cleaned = value.trim().replace(/^"|"$/g, "");
            return cleaned === "" ? null : cleaned;
          },
          complete: (results) => {
            const data = results.data;
            const stationMap = {};

            // Processing CSV rows to build stationsData
            data.forEach((row) => {
              const [station, system, subsystem, ...gearIds] = row;
              if (!station || !system) return; // Skip invalid rows

              if (!stationMap[station]) {
                stationMap[station] = {};
              }
              if (!stationMap[station][system]) {
                stationMap[station][system] = [];
              }

              // Add non-null gear IDs, handling EKT groups specially
              gearIds.forEach((gearId) => {
                if (gearId) {
                  if (system === "EKT" && gearId.includes("Group")) {
                    // Split EKT groups into individual gear IDs
                    const ids = gearId
                      .split("\n")
                      .slice(1)
                      .map((id) => id.trim())
                      .filter((id) => id);
                    stationMap[station][system].push(...ids);
                  } else {
                    stationMap[station][system].push(gearId);
                  }
                }
              });

              // Remove duplicates
              stationMap[station][system] = [...new Set(stationMap[station][system])];
            });

            setStationsData(stationMap);
            setLoading(false);
          },
          error: (err) => {
            console.error("Error parsing CSV:", err);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Error loading CSV:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);
  const itmm = hardwarefailure.data.data;
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(hardwarefailure.data.data);
  }, [dispatch]);

  useEffect(() => {
    if (hardwarefailure.data && hardwarefailure.data.data) {
      setItems(hardwarefailure.data.data);
      setSlug(hardwarefailure.slug);
    }
  }, [hardwarefailure]);

  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

  const fd = filteredData ? filteredData[0] : {};

  const basicInitialValues = {
    id: fd.id || "",
    sno: "1",
    date_of_replace: fd.date_of_replace || "",
    idescrip: fd.idescrip || "",
    gearid: fd.gearid || "",
    old_sr_no: fd.old_sr_no || "",
    new_sr_no: fd.new_sr_no || "",
    reason_of_replace: fd.reason_of_replace || "",
    date_of_sending: fd.date_of_sending || "",
    date_of_receiving: fd.date_of_receiving || "",
    date_of_restoration: fd.date_of_restoration || "",
    remark: fd.remark || "",
    emp_id: fd.emp_id || "", //updated
    emp_name: fd.emp_name || "", //updated
    system: fd.system || "", //updated
    denomination: fd.denomination || "", //updated
    quantity: fd.quantity || "", //updated
    station: fd.station || "", //updated
    date: formatDate(new Date().toDateString()),
  };

  // const [formValues, setFormValues] = useState(basicInitialValues);

  useEffect(() => {
    setFormValues(basicInitialValues);
  }, [fd]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  // Handle station change and update available systems
  const handleStationChange = (e) => {
    const selectedStation = e.target.value;
    setStation(selectedStation);
    setFormValues({
      ...formValues,
      station: selectedStation,
      system: "",
      gearid: "",
    }); // Reset system and gearid
    if (stationsData[selectedStation]) {
      setAvailableSystems(Object.keys(stationsData[selectedStation]));
    } else {
      setAvailableSystems([]);
    }
  };

  // Handle system change and update available gear IDs
  const handleSystemChange = (e) => {
    const selectedSystem = e.target.value;
    setFormValues({ ...formValues, system: selectedSystem, gearid: "" });
    if (stationsData[station] && stationsData[station][selectedSystem]) {
      setAvailableGearIds(stationsData[station][selectedSystem]);
    } else {
      setAvailableGearIds([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation" className="breadcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Hardware Failure
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading">Hardware Failure Register</h3>
                <div className="heading-line"></div>
              </div>

              {/* Station Dropdown */}
              <div className="col-md-6">
                <label htmlFor="inputStation" className="form-label">
                  Station
                </label>
                <select
                  id="inputStation"
                  className="form-select"
                  value={station}
                  onChange={handleStationChange}
                  disabled
                >
                  <option value="">{formValues.station}</option>
                  {Object.keys(stationsData).map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </div>

              {/* System Dropdown */}
              <div className="col-md-6">
                <label htmlFor="inputSystem" className="form-label">
                  System
                </label>
                <select
                  id="inputSystem"
                  className="form-select"
                  value={formValues.system}
                  onChange={handleSystemChange}
                  disabled={!station}
                >
                  <option value="">Select System</option>
                  <option>{formValues.system}</option>
                  {availableSystems.map((system) => (
                    <option key={system} value={system}>
                      {system}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gear ID Dropdown */}
              <div className="col-md-6">
                <label htmlFor="inputGearId" className="form-label">
                  Gear ID
                </label>
                <select
                  id="inputGearId"
                  className="form-select"
                  value={formValues.gearid}
                  onChange={(e) =>
                    setFormValues({ ...formValues, gearid: e.target.value })
                  }
                  disabled={!formValues.system}
                >
                  <option value="">{formValues.gearid}</option>

                  {availableGearIds.map((gearId) => (
                    <option key={gearId} value={gearId}>
                      {gearId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="inputdate" className="form-label">
                  Date of Replacement
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputdate"
                  value={formValues.date_of_replace}
                  name="date"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      date_of_replace: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputides" className="form-label">
                  Item Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputides"
                  value={formValues.idescrip}
                  onChange={(e) =>
                    setFormValues({ ...formValues, idescrip: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputosno" className="form-label">
                  Old Sr.No
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputosno"
                  value={formValues.old_sr_no}
                  onChange={(e) =>
                    setFormValues({ ...formValues, old_sr_no: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputnsno" className="form-label">
                  New Sr.No
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputnsno"
                  value={formValues.new_sr_no}
                  onChange={(e) =>
                    setFormValues({ ...formValues, new_sr_no: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputreason" className="form-label">
                  Reason of Replacement
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputreason"
                  value={formValues.reason_of_replace}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      reason_of_replace: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputsdate" className="form-label">
                  Date of Sending
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputsdate"
                  value={formValues.date_of_sending}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      date_of_sending: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputrdate" className="form-label">
                  Date of Receiving
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputrdate"
                  value={formValues.date_of_receiving}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      date_of_receiving: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputrestore" className="form-label">
                  Date of Restoration
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputrestore"
                  value={formValues.date_of_restoration}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      date_of_restoration: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputdenomination" className="form-label">
                  Denomination
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputdenomination"
                  value={formValues.denomination}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      denomination: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputquantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputquantity"
                  value={formValues.quantity}
                  onChange={(e) =>
                    setFormValues({ ...formValues, quantity: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputremark" className="form-label">
                  Remarks
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputremark"
                  value={formValues.remark}
                  onChange={(e) =>
                    setFormValues({ ...formValues, remark: e.target.value })
                  }
                />
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary">
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

export default EditHardwareFailure;
