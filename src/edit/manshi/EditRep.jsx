import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { editData, fetchData } from "../../reducer/manshi/ReplacementReducer";
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
export const EditRep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const RepF = useSelector((state) => state.Rep);
  const [slug, setSlug] = useState("");
  const [station, setStation] = useState(""); // State for station
  const [stationsData, setStationsData] = useState({});
    const [availableSystems, setAvailableSystems] = useState([]); // Systems based on station
    const [availableGearIds, setAvailableGearIds] = useState([]); // Gear IDs based on system
    const [loading, setLoading] = useState(true);
  console.log(slug);
  useEffect(() => {
    if (RepF) {
      setSlug(RepF.slug);
    }
  }, [RepF]);
  console.log(RepF.data.data);
  const [items, setItems] = useState([]);
  const itmm = RepF.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(RepF.data.data);
  }, [dispatch]);

  useEffect(() => {
    setItems(RepF.data.data);
  }, [RepF]);

  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

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




  const fd = filteredData[0];

  const basicInitialValues = {
    id: fd.id,
    system: fd.system,
	station: fd.station,
	system: fd.system,
	
    emp_name: fd.emp_name,
    DateOfReplacement: fd.DateOfReplacement,
    HardwareSoftware: fd.HardwareSoftware,
    Description: fd.Description,
    gearid: fd.GearID,
    OldSrNo: fd.OldSrNo,
    NewSrNo: fd.NewSrNo,
    ReasonOfReplacement: fd.ReasonOfReplacement,
    Signature: fd.Signature,
    Remark: fd.Remark,
    empid: fd.employee_id,
	unit:fd.unit,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/">
            Replacement Register
          </Link>
          <Link underline="hover" color="inherit">
            Edit
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 form-heading-container">
              {/* <h3 className="form-heading">Replacement Register Signals</h3>
              <div className="heading-line"></div> */}
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="DateOfReplacement">Date of Replacement</label>
                <input
                  type="date"
                  id="DateOfReplacement"
                  name="DateOfReplacement"
                  value={formValues.DateOfReplacement}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="HardwareSoftware">Hardware/Software</label>
                <select
                  id="HardwareSoftware"
                  name="HardwareSoftware"
                  value={formValues.HardwareSoftware}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select an option</option>
                  <option value="Software">Software</option>
                  <option value="Hardware">Hardware</option>
                </select>
              </div>{" "}
              <div className="col-md-4">
                <label htmlFor="Description">Description</label>
                <input
                  type="text"
                  id="Description"
                  name="Description"
                  value={formValues.Description}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
			<div className="row mb-3">
			 <div className="col-md-4">
                <label htmlFor="Description">Quantity</label>
                <input
                  type="text"
                  id="Description"
                  name="Signature"
                  value={formValues.Signature}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
			  <div className="col-md-4">
                <label htmlFor="Description">Denomination</label>
                <input
                  type="text"
                  id="Description"
                  name="unit"
                  value={formValues.unit}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
			</div>
            <div className="row mb-3">
               {/* Station Dropdown */}
            <div className="col-md-6">
              <label htmlFor="inputStation" className="form-label">
                Station
              </label>
              <select
                id="inputStation"
                className="form-select"
                required
                value={formValues.station}
                onChange={handleStationChange}
              >
                <option value="">Select Station</option>
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
                <option value="">Select Gear ID</option>
                {availableGearIds.map((gearId) => (
                  <option key={gearId} value={gearId}>
                    {gearId}
                  </option>
                ))}
              </select>
            </div>

              <div className="col-md-4">
                <label htmlFor="ReasonOfReplacement">
                  Reason Of Replacement
                </label>
                <input
                  type="text"
                  id="ReasonOfReplacement"
                  name="ReasonOfReplacement"
                  value={formValues.ReasonOfReplacement}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="OldSrNo">Old Sr. No</label>
                <input
                  type="text"
                  id="OldSrNo"
                  name="OldSrNo"
                  value={formValues.OldSrNo}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="NewSrNo">New Sr. No</label>
                <input
                  type="text"
                  id="NewSrNo"
                  name="NewSrNo"
                  value={formValues.NewSrNo}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="Remark">Remark</label>
                <input
                  type="text"
                  id="Remark"
                  name="Remark"
                  value={formValues.Remark}
                  onChange={handleChange}
                  className="form-control"
                />
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
  );
};
export default EditRep;
