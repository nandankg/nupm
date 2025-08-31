import React, { useState, useEffect } from "react";
import {
  
  addData,
} from "../../reducer/store/AssetregistersignalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("userdata"));
const deprt = user?.department;

const AssetregisterSignal = () => {
     
  const navigate = useNavigate();
 
  const dispatch = useDispatch();
  const assetregisters = useSelector((state) => state.assetregister);
  const [slug, setSlug] = useState("");
 
      const [gearData, setGearData] = React.useState(null);
      const [loading, setLoading] = React.useState(true);
      const [error, setError] = React.useState(null);
      const [formData, setFormData] = React.useState({
        station: "",
        system: "",
        gearType: "",
        gearName: "",
        dateOfInstallation: "",
        descriptionOfMaterial: "",
        makeModelPartNo: "",
        serialNo: "",
        quantity: "",
        location: "",
        remarks: ""
      });
      const [submitStatus, setSubmitStatus] = React.useState(null);

      // Fetch gear data on component mount
      React.useEffect(() => {
        fetch('../../data/gear_data.json')
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch gear data');
            }
            return response.json();
          })
          .then(data => {
            setGearData(data);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      }, []);

      // Get unique station names
      const stations = gearData ? gearData.stations.map(station => station.StationName) : [];

      // Get systems for selected station
      const systems = formData.station && gearData
        ? gearData.stations.find(station => station.StationName === formData.station)?.Equipment.map(equip => equip.System) || []
        : [];

      // Get gear types for selected system
      const gearTypes = formData.station && formData.system && gearData
        ? gearData.stations
            .find(station => station.StationName === formData.station)
            ?.Equipment.find(equip => equip.System === formData.system)?.GearTypes.map(gearType => gearType.Type) || []
        : [];

      // Get gear names for selected gear type
      const gearNames = formData.station && formData.system && formData.gearType && gearData
        ? gearData.stations
            .find(station => station.StationName === formData.station)
            ?.Equipment.find(equip => equip.System === formData.system)
            ?.GearTypes.find(gearType => gearType.Type === formData.gearType)?.GearNames || []
        : [];

      // Handle form input changes
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value,
          // Reset dependent fields
          ...(name === 'station' ? { system: '', gearType: '', gearName: '' } : {}),
          ...(name === 'system' ? { gearType: '', gearName: '' } : {}),
          ...(name === 'gearType' ? { gearName: '' } : {})
        }));
      };


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formData));
    navigate(`/list/${slug}`);
  };

     if (loading) {
        return (
          <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '500px' }}>
            <p className="text-center text-muted">Loading...</p>
          </div>
        );
      }

      if (error && !submitStatus) {
        return (
          <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '500px' }}>
            <p className="text-center text-danger">Error: {error}</p>
          </div>
        );
      }

      return (
        <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '500px' }}>
          <h1 className="card-title text-center mb-4">Railway Gear Selector</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="station" className="form-label fw-bold">Select Station</label>
              <select
                id="station"
                name="station"
                value={formData.station}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">-- Select Station --</option>
                {stations.map(station => (
                  <option key={station} value={station}>{station}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="system" className="form-label fw-bold">Select System</label>
              <select
                id="system"
                name="system"
                value={formData.system}
                onChange={handleInputChange}
                className="form-select"
                disabled={!formData.station}
                required
              >
                <option value="">-- Select System --</option>
                {systems.map(system => (
                  <option key={system} value={system}>{system}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="gearType" className="form-label fw-bold">Select Gear Type</label>
              <select
                id="gearType"
                name="gearType"
                value={formData.gearType}
                onChange={handleInputChange}
                className="form-select"
                disabled={!formData.system}
                required
              >
                <option value="">-- Select Gear Type --</option>
                {gearTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="gearName" className="form-label fw-bold">Select Gear Name</label>
              <select
                id="gearName"
                name="gearName"
                value={formData.gearName}
                onChange={handleInputChange}
                className="form-select"
                disabled={!formData.gearType}
                required
              >
                <option value="">-- Select Gear Name --</option>
                {gearNames.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="dateOfInstallation" className="form-label fw-bold">Date of Installation</label>
              <input
                type="date"
                id="dateOfInstallation"
                name="dateOfInstallation"
                value={formData.dateOfInstallation}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descriptionOfMaterial" className="form-label fw-bold">Description of Material</label>
              <input
                type="text"
                id="descriptionOfMaterial"
                name="descriptionOfMaterial"
                value={formData.descriptionOfMaterial}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter material description"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="makeModelPartNo" className="form-label fw-bold">Make/Model/Part No</label>
              <input
                type="text"
                id="makeModelPartNo"
                name="makeModelPartNo"
                value={formData.makeModelPartNo}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter make, model, or part number"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="serialNo" className="form-label fw-bold">Serial No</label>
              <input
                type="text"
                id="serialNo"
                name="serialNo"
                value={formData.serialNo}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter serial number"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label fw-bold">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter quantity"
                min="0"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label fw-bold">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter location"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="remarks" className="form-label fw-bold">Remarks</label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter any remarks"
                rows="4"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Submit
            </button>
          </form>

          {submitStatus === 'success' && (
            <div className="alert alert-success mt-3" role="alert">
              Data submitted successfully!
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="alert alert-danger mt-3" role="alert">
              Error: {error}
            </div>
          )}

          {formData.station && formData.system && formData.gearType && formData.gearName && (
            <div className="alert alert-info mt-3" role="alert">
              <strong>Selected:</strong> Station: {formData.station}, System: {formData.system}, Gear Type: {formData.gearType}, Gear Name: {formData.gearName}
            </div>
          )}
        </div>
      );
    }

  export default AssetregisterSignal;