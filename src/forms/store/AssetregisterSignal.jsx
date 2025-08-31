import React, { useState, useEffect } from "react";
import {
  addDtrsig,
  addData,
} from "../../reducer/store/AssetregistersignalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import station from "../../data/station.json";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import Papa from "papaparse";
const user = JSON.parse(localStorage.getItem("userdata"));

const deprt = user?.department;
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
const AssetregisterSignal = () => {
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const assetregisters = useSelector((state) => state.assetregister);
  const [slug, setSlug] = useState("");
  const [station, setStation] = useState(""); // State for station
    const [availableSystems, setAvailableSystems] = useState([]); // Systems based on station
    const [availableGearIds, setAvailableGearIds] = useState([]); // Ge
	 const [stationsData, setStationsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [sno, setSno] = useState(1);
  console.log(slug);
  useEffect(() => {
    if (assetregisters) {
      setSlug(assetregisters.slug);
    }
  }, [assetregisters]);
  useEffect(() => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      today.getDate().toString().padStart(2, "0");
    setCurrentDate(date);
  }, []); // Empty dependency array means this effect will only run once after the initial render

  const [formData, setFormData] = useState({
    station: "",
    system :"",
    gearid :"",
    dateOfInstallation: "",
    descriptionOfMaterial: "",
    makeModelPartNo: "",
    serialNo: "",
    quantity: "",
    location: "",
    remarks: "",
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

// Handle station change and update available systems
const handleStationChange = (e) => {
  const selectedStation = e.target.value;
  setStation(selectedStation);
  setFormData({
    ...formData,
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
  setFormData({ ...formData, system: selectedSystem, gearid: "" });
  if (stationsData[station] && stationsData[station][selectedSystem]) {
    setAvailableGearIds(stationsData[station][selectedSystem]);
  } else {
    setAvailableGearIds([]);
  }
};
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formData));
    navigate(`/list/${slug}`);
  };

  return (
    <div className="container mt-5">
      <h1>Asset Register {deprt}</h1>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container">
          <form onSubmit={handleSubmit}>
          <div className="row">
                {/* Station Dropdown */}
            <div className="col-md-6">
              <label htmlFor="inputStation" className="form-label">
                Station
              </label>
              <select
                id="inputStation"
                className="form-select"
                required
                value={station}
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
                value={formData.system}
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
                value={formData.gearid}
                onChange={(e) =>
                  setFormData({ ...formData, gearid: e.target.value })
                }
                disabled={!formData.system}
              >
                <option value="">Select Gear ID</option>
                {availableGearIds.map((gearId) => (
                  <option key={gearId} value={gearId}>
                    {gearId}
                  </option>
                ))}
              </select>
            </div>

              </div>
            <div className="row">
              <div className="col-md-6 mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="dateOfInstallation" className="form-label">
                  Date of Installation
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfInstallation"
                  name="dateOfInstallation"
                  value={formData.dateOfInstallation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="descriptionOfMaterial" className="form-label">
                  Description of Material
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descriptionOfMaterial"
                  name="descriptionOfMaterial"
                  value={formData.descriptionOfMaterial}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="makeModelPartNo" className="form-label">
                  Make/Model/Part No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="makeModelPartNo"
                  name="makeModelPartNo"
                  value={formData.makeModelPartNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="serialNo" className="form-label">
                  Serial No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="serialNo"
                  name="serialNo"
                  value={formData.serialNo}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
            </div>

           
            <div className="mb-3">
              <label htmlFor="remarks" className="form-label">
                Remarks
              </label>
              <textarea
                className="form-control"
                id="remarks"
                name="remarks"
                rows="3"
                value={formData.remarks}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssetregisterSignal;
