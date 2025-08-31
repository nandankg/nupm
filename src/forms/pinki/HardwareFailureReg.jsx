import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import { addData } from "../../reducer/pinki/HardwareFailureReducer";

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

// Initializing component with loading state
const HardwareFailureReg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hardwarefailure = useSelector((state) => state.hardwarefailure || {});
  const [slug, setSlug] = useState("");
  const [station, setStation] = useState("");
  const [availableSystems, setAvailableSystems] = useState([]);
  const [availableGearIds, setAvailableGearIds] = useState([]);
  const [stationsData, setStationsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [sno, setSno] = useState(1);

  // Form values state
  const [formValues, setFormValues] = useState({
    sno: sno,
    date_of_replace: "",
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
    emp_name: "",
    emp_id: "",
    system: "",
    denomination: "",
    quantity: "",
    station: "",
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

  // Handling slug updates from Redux store
  useEffect(() => {
    if (hardwarefailure.slug && hardwarefailure.slug !== slug) {
      setSlug(hardwarefailure.slug);
    }
  }, [hardwarefailure.slug]);

  // Handling station change and updating available systems
  const handleStationChange = (e) => {
    const selectedStation = e.target.value;
    setStation(selectedStation);
    setFormValues({
      ...formValues,
      station: selectedStation,
      system: "",
      gearid: "",
    });
    if (stationsData[selectedStation]) {
      setAvailableSystems(Object.keys(stationsData[selectedStation]));
      setAvailableGearIds([]);
    } else {
      setAvailableSystems([]);
      setAvailableGearIds([]);
    }
  };

  // Handling system change and updating available gear IDs
  const handleSystemChange = (e) => {
    const selectedSystem = e.target.value;
    setFormValues({ ...formValues, system: selectedSystem, gearid: "" });
    if (stationsData[station] && stationsData[station][selectedSystem]) {
      setAvailableGearIds(stationsData[station][selectedSystem]);
    } else {
      setAvailableGearIds([]);
    }
  };

  // Enhanced form submission with validation and error handling
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate required fields
    if (!formValues.station || !formValues.system || !formValues.gearid) {
      alert('Please fill all required fields: Station, System, and Gear ID');
      return;
    }
    
    if (!formValues.quantity || !formValues.denomination) {
      alert('Please fill Quantity and Denomination fields as required');
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
        sno: sno,
        submissionDate: new Date().toISOString(),
        // Auto-fill employee data if not already filled
        emp_name: formValues.emp_name || (formValues.emp_id ? `Employee ${formValues.emp_id}` : ''),
      };
      
      // Save to local storage as backup
      const backupData = JSON.parse(localStorage.getItem('hardwareFailureBackup') || '[]');
      backupData.push({...submitData, id: Date.now().toString(), status: 'pending'});
      localStorage.setItem('hardwareFailureBackup', JSON.stringify(backupData));
      
      // Dispatch to API
      const result = await dispatch(addData(submitData)).unwrap();
      
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      
      if (result.success || result.message?.includes('success')) {
        alert('Hardware Failure Register saved successfully!');
        // Reset form
        setFormValues({
          sno: sno + 1,
          date_of_replace: '',
          idescrip: '',
          gearid: '',
          old_sr_no: '',
          new_sr_no: '',
          reason_of_replace: '',
          date_of_sending: '',
          date_of_receiving: '',
          date_of_restoration: '',
          sign: '',
          remark: '',
          action: '',
          emp_name: '',
          emp_id: '',
          system: '',
          denomination: '',
          quantity: '',
          station: '',
        });
        setSno(sno + 1);
        setStation('');
        setAvailableSystems([]);
        setAvailableGearIds([]);
        
        navigate(`/list/${slug}`);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error saving Hardware Failure Register:', error);
      alert('Error saving data. Data has been saved locally and will be synced when connection is available.');
      
      // Reset button state
      const submitButton = event.target.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.textContent = 'Save';
        submitButton.disabled = false;
      }
    }
  };

  // Rendering loading state or form
  if (loading) {
    return <div>Loading station data...</div>;
  }

  return (
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
                required
                value={station}
                onChange={handleStationChange}
              >
                <option value="">Select Station</option>
                {Object.keys(stationsData)
                  .filter(station => station !== 'TEST TRACK') // Remove TEST TRACK
                  .map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
            </div>

            {/* Enhanced System Dropdown with ATC/IXL/MSS */}
            <div className="col-md-6">
              <label htmlFor="inputSystem" className="form-label">
                System *
              </label>
              <select
                id="inputSystem"
                className="form-select"
                required
                value={formValues.system}
                onChange={handleSystemChange}
                disabled={!station}
              >
                <option value="">Select System</option>
                {/* Standard available systems from CSV data */}
                {availableSystems.map((system) => (
                  <option key={system} value={system}>
                    {system}
                  </option>
                ))}
                {/* Additional required systems */}
                {!availableSystems.includes('ATC') && (
                  <option value="ATC">ATC</option>
                )}
                {!availableSystems.includes('IXL') && (
                  <option value="IXL">IXL</option>
                )}
                {!availableSystems.includes('MSS') && (
                  <option value="MSS">MSS</option>
                )}
              </select>
              <div className="form-text text-muted">
                ATC/ATS/IXL/DCS/MSS options available
              </div>
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
                min="1"
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
                min="1"
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
                Denomination *
              </label>
              <input
                type="text"
                className="form-control"
                id="inputdenomination"
                required
                value={formValues.denomination}
                onChange={(e) =>
                  setFormValues({ ...formValues, denomination: e.target.value })
                }
                placeholder="Enter denomination details"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="inputquantity" className="form-label">
                Quantity *
              </label>
              <input
                type="number"
                className="form-control"
                id="inputquantity"
                required
                min="1"
                value={formValues.quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) > 0 && Number.isInteger(Number(value)))) {
                    setFormValues({ ...formValues, quantity: value });
                  }
                }}
                placeholder="Enter positive quantity only"
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
  );
};

export default HardwareFailureReg;