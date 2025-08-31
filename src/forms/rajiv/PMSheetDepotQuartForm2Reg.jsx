import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPMSheetDepotQuartForm2 } from "../reducer/PMSheetDepotQuartForm2Reducer";

const PMSheetDepotQuartForm2Reg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialCellState = {
    onFloat: "",
    initialReading: "",
    after1_5Hours: "",
  };

  const initialSpareCellState = {
    initialReadingOnFloat: "",
    finalReading: "",
    commonOutputVoltage: "",
  };

  const [formData, setFormData] = useState({
    station: "--",
    upsRating: "",
    batteryCapacity: "",
    Date: new Date().toLocaleDateString(),
    month: new Date().getMonth(),
    startTime: "",
    endTime: "",
    temperature: "",
    BatteryTerminalsCleaned: false,
    LooseConnectionChecked: false,
    CellLeakageChecked: false,
    batteryVoltageBefore: "",
    batteryVoltageAfter: "",
    batteryCharge: "",
    chargingAfterLoadTest: "",
    loadDuringTestUPS1: {
      UPS1U: "",
      UPS1V: "",
      UPS1W: "",
    },
    loadDuringTestUPS2: {
      UPS2U: "",
      UPS2V: "",
      UPS2W: "",
    },
    cellVoltage: Array(240).fill(initialCellState),
    spareCells: Array(6).fill(initialSpareCellState),
    signSSEJE: "",
    signEM: "",
    // Adding state for Battery Bank-2
    startTimeBB2: "",
    endTimeBB2: "",
    temperatureBB2: "",
    BatteryTerminalsCleanedBB2: false,
    LooseConnectionCheckedBB2: false,
    CellLeakageCheckedBB2: false,
    batteryVoltageBeforeBB2: "",
    batteryVoltageAfterBB2: "",
    batteryChargeBB2: "",
    chargingAfterLoadTestBB2: "",
    loadDuringTestUPS1BB2: {
      UPS1UBB2: "",
      UPS1VBB2: "",
      UPS1WBB2: "",
    },
    loadDuringTestUPS2BB2: {
      UPS2UBB2: "",
      UPS2VBB2: "",
      UPS2WBB2: "",
    },
    cellVoltageBB2: Array(240).fill(initialCellState),
    spareCellsBB2: Array(6).fill(initialSpareCellState),
    signSSEJEBB2: "",
    signEMBB2: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleCellChange = (index, field, value) => {
    const newCellVoltage = [...formData.cellVoltage];
    newCellVoltage[index] = { ...newCellVoltage[index], [field]: value };
    setFormData({ ...formData, cellVoltage: newCellVoltage });
  };

  const handleSpareCellChange = (index, field, value) => {
    const newSpareCells = [...formData.spareCells];
    newSpareCells[index] = { ...newSpareCells[index], [field]: value };
    setFormData({ ...formData, spareCells: newSpareCells });
  };

  const handleNestedChange = (parentName, field, value) => {
    setFormData({
      ...formData,
      [parentName]: {
        ...formData[parentName],
        [field]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPMSheetDepotQuartForm2(formData));
    navigate("/PMSheetDepotQuartForm2/list");
  };

  return (
    <div className="container" style={{ maxWidth: "1300px" }}>
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="">PM Sheet Depot Quartly Form 2</Link>
          <Link to="">Register</Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container" style={{ maxWidth: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <label>Start Time:</label>
                <br />
                <input
                  type="time"
                  name="startTime"
                  className="form-control"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>End Time:</label>
                <br />
                <input
                  type="time"
                  name="endTime"
                  className="form-control"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Average Temperature:</label>
                <input
                  type="text"
                  name="temperature"
                  className="form-control"
                  value={formData.temperature}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label>
                  Battery Terminals Cleaned &nbsp;
                  <input
                    type="checkbox"
                    name="BatteryTerminalsCleaned"
                    checked={formData.BatteryTerminalsCleaned}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="col-md-4">
                <label>
                  Loose Connection Checked &nbsp;
                  <input
                    type="checkbox"
                    name="LooseConnectionChecked"
                    checked={formData.LooseConnectionChecked}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="col-md-4">
                <label>
                  {" "}
                  Cell Leakage Checked &nbsp;
                  <input
                    type="checkbox"
                    name="CellLeakageChecked"
                    checked={formData.CellLeakageChecked}
                    onChange={handleChange}
                  />
                </label>
              </div>{" "}
            </div>

            <div className="row mb-2">
              <div className="col-md-3">
                <label style={{ fontSize: "12px" }} className="text-start">
                  Battery Voltage Before Load Test:
                  <input
                    type="text"
                    className="form-control"
                    name="batteryVoltageBefore"
                    value={formData.batteryVoltageBefore}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="col-md-3">
                <label style={{ fontSize: "12px" }} className="text-start">
                  Battery Voltage After Load Test:
                  <input
                    type="text"
                    name="batteryVoltageAfter"
                    className="form-control"
                    value={formData.batteryVoltageAfter}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="col-md-3">
                <label style={{ fontSize: "12px" }} className="text-start">
                  Battery Charge Percentage (%)
                  <input
                    type="text"
                    name="batteryCharge"
                    className="form-control"
                    value={formData.batteryCharge}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="col-md-3">
                <label style={{ fontSize: "12px" }} className="text-start">
                  Charging Current After Load Test{" "}
                  <input
                    type="text"
                    name="chargingAfterLoadTest"
                    className="form-control"
                    value={formData.chargingAfterLoadTest}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-2">
                <label style={{ fontSize: "12px" }} className="text-start">
                  Load During Test UPS1 U:
                  <input
                    type="text"
                    className="form-control"
                    name="loadDuringTestUPS1U"
                    value={formData.loadDuringTestUPS1.UPS1U}
                    onChange={(e) =>
                      handleNestedChange(
                        "loadDuringTestUPS1",
                        "UPS1U",
                        e.target.value
                      )
                    }
                  />
                </label>
              </div>
              <div className="col-md-2">
                <label style={{ fontSize: "12px" }} className="text-start">
                  Load During Test UPS1 V:
                  <input
                    type="text"
                    className="form-control"
                    name="loadDuringTestUPS1V"
                    value={formData.loadDuringTestUPS1.UPS1V}
                    onChange={(e) =>
                      handleNestedChange(
                        "loadDuringTestUPS1",
                        "UPS1V",
                        e.target.value
                      )
                    }
                  />
                </label>
              </div>
              <div className="col-md-2">
                <label style={{ fontSize: "12px" }} className="text-start">
                  Load During Test UPS1 W:
                  <input
                    type="text"
                    className="form-control"
                    name="loadDuringTestUPS1W"
                    value={formData.loadDuringTestUPS1.UPS1W}
                    onChange={(e) =>
                      handleNestedChange(
                        "loadDuringTestUPS1",
                        "UPS1W",
                        e.target.value
                      )
                    }
                  />
                </label>
              </div>

              <div className="col-md-2">
                <label style={{ fontSize: "12px" }} className="text-start">
                  Load During Test UPS2 U:
                  <input
                    type="text"
                    className="form-control"
                    name="loadDuringTestUPS2U"
                    value={formData.loadDuringTestUPS2.UPS2U}
                    onChange={(e) =>
                      handleNestedChange(
                        "loadDuringTestUPS2",
                        "UPS2U",
                        e.target.value
                      )
                    }
                  />
                </label>
              </div>
              <div className="col-md-2">
                <label style={{ fontSize: "12px" }} className="text-start">
                  Load During Test UPS2 V:
                  <input
                    type="text"
                    className="form-control"
                    name="loadDuringTestUPS2V"
                    value={formData.loadDuringTestUPS2.UPS2V}
                    onChange={(e) =>
                      handleNestedChange(
                        "loadDuringTestUPS2",
                        "UPS2V",
                        e.target.value
                      )
                    }
                  />
                </label>
              </div>
              <div className="col-md-2">
                <label style={{ fontSize: "12px" }} className="text-start">
                  Load During Test UPS2 W:
                  <input
                    type="text"
                    className="form-control"
                    name="loadDuringTestUPS2W"
                    value={formData.loadDuringTestUPS2.UPS2W}
                    onChange={(e) =>
                      handleNestedChange(
                        "loadDuringTestUPS2",
                        "UPS2W",
                        e.target.value
                      )
                    }
                  />
                </label>
              </div>
            </div>
            {/* Cell Voltage Inputs */}
            <div className="row">
              <div className="px-0 col-md-12 d-flex justify-content-between">
                <div className="col-md-4 d-flex gap-2">
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "0",
                      display: "contents",
                    }}
                    className="text-start"
                  >
                    Cell No.
                  </label>
                  <label
                    style={{ fontSize: "13px", marginRight: "0" }}
                    className="text-start"
                  >
                    On Float
                    <br /> (Voltage)
                  </label>
                  <label
                    style={{ fontSize: "13px", marginRight: "0" }}
                    className="text-start"
                  >
                    Initial Reading
                    <br /> (On Load)
                  </label>
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "0",
                      borderRight: "1px solid black",
                    }}
                    className="text-start"
                  >
                    After 1.5 Hours
                    <br /> (On Load)
                  </label>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "0",
                      display: "contents",
                    }}
                    className="text-start"
                  >
                    Cell No.
                  </label>
                  <label
                    style={{ fontSize: "13px", marginRight: "0" }}
                    className="text-start"
                  >
                    On Float
                    <br /> (Voltage)
                  </label>
                  <label
                    style={{ fontSize: "13px", marginRight: "0" }}
                    className="text-start"
                  >
                    Initial Reading
                    <br /> (On Load)
                  </label>
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "0",
                      borderRight: "1px solid black",
                    }}
                    className="text-start"
                  >
                    After 1.5 Hours
                    <br /> (On Load)
                  </label>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "0",
                      display: "contents",
                    }}
                    className="text-start"
                  >
                    Cell No.
                  </label>
                  <label
                    style={{ fontSize: "13px", marginRight: "0" }}
                    className="text-start"
                  >
                    On Float
                    <br /> (Voltage)
                  </label>
                  <label
                    style={{ fontSize: "13px", marginRight: "0" }}
                    className="text-start"
                  >
                    Initial Reading
                    <br /> (On Load)
                  </label>
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "0",
                    }}
                    className="text-start"
                  >
                    After 1.5 Hours
                    <br /> (On Load)
                  </label>
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap " style={{ columnGap: "30px" }}>
              {formData.cellVoltage.map((cell, index) => (
                <div
                  key={index}
                  className="row  col-md-4 d-flex justify-content-between"
                >
                  <label
                    style={{ fontSize: "12px", display: "contents" }}
                    className="text-decoration-underline text-start f-none "
                  >
                    Cell {index + 1}
                  </label>
                  <div className="col-3">
                    <label
                      style={{ fontSize: "12px", marginRight: "0" }}
                      className="text-start "
                    >
                      <input
                        type="text"
                        className="form-control"
                        value={cell.onFloat}
                        onChange={(e) =>
                          handleCellChange(index, "onFloat", e.target.value)
                        }
                      />
                    </label>
                  </div>
                  <div className="col-3">
                    <label
                      style={{ fontSize: "12px", marginRight: "0" }}
                      className="text-start"
                    >
                      <input
                        type="text"
                        className="form-control"
                        value={cell.initialReading}
                        onChange={(e) =>
                          handleCellChange(
                            index,
                            "initialReading",
                            e.target.value
                          )
                        }
                      />
                    </label>
                  </div>
                  <div className="col-3">
                    <label
                      style={{ fontSize: "12px", marginRight: "0" }}
                      className="text-start"
                    >
                      <input
                        type="text"
                        className="form-control"
                        value={cell.after1_5Hours}
                        onChange={(e) =>
                          handleCellChange(
                            index,
                            "after1_5Hours",
                            e.target.value
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {/* Spare Cell Inputs */}
            <div className="row">
              <div className="px-0 col-md-12 d-flex justify-content-between">
                <div className="col-md-4 d-flex gap-2">
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "0",
                      display: "contents",
                    }}
                    className="text-start"
                  >
                    Spare Cell No.
                  </label>
                  <label
                    style={{ fontSize: "13px", marginRight: "0" }}
                    className="text-start"
                  >
                    On Float
                    <br />
                  </label>
                  <label
                    style={{ fontSize: "13px", marginRight: "0" }}
                    className="text-start"
                  >
                    Reading After 1 Hr.
                    <br />
                  </label>
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "0",
                      borderRight: "1px solid black",
                    }}
                    className="text-start"
                  >
                    Spare Cell Charger Output Voltage
                  </label>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "0",
                      display: "contents",
                    }}
                    className="text-start"
                  >
                    Spare Cell No.
                  </label>
                  <label
                    style={{ fontSize: "13px", marginRight: "0" }}
                    className="text-start"
                  >
                    On Float
                    <br />
                  </label>
                  <label
                    style={{ fontSize: "13px", marginRight: "0" }}
                    className="text-start"
                  >
                    Reading After 1 Hr.
                    <br />
                  </label>
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "0",
                      borderRight: "1px solid black",
                    }}
                    className="text-start"
                  >
                    Spare Cell Charger
                    <br />
                    Output Voltage
                  </label>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "0",
                      display: "contents",
                    }}
                    className="text-start"
                  >
                    Spare Cell No.
                  </label>
                  <label
                    style={{ fontSize: "13px", marginRight: "0" }}
                    className="text-start"
                  >
                    On Float
                    <br />
                  </label>
                  <label
                    style={{ fontSize: "13px", marginRight: "0" }}
                    className="text-start"
                  >
                    Reading After 1 Hr.
                    <br />
                  </label>
                  <label
                    style={{
                      fontSize: "13px",
                      marginRight: "0",
                      borderRight: "1px solid black",
                    }}
                    className="text-start"
                  >
                    Spare Cell Charger Output Voltage
                  </label>
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap " style={{ columnGap: "30px" }}>
              {formData.spareCells.map((cell, index) => (
                <div
                  key={index}
                  className="row  col-md-4 d-flex justify-content-between"
                >
                  <label
                    style={{ fontSize: "12px", display: "contents" }}
                    className="text-decoration-underline text-start f-none "
                  >
                    Spare Cell {index + 1}
                  </label>
                  <div className="col-3">
                    <label
                      style={{ fontSize: "12px", marginRight: "0" }}
                      className="text-start "
                    >
                      <input
                        type="text"
                        className="form-control"
                        value={cell.initialReadingOnFloat}
                        onChange={(e) =>
                          handleSpareCellChange(
                            index,
                            "initialReadingOnFloat",
                            e.target.value
                          )
                        }
                      />
                    </label>
                  </div>
                  <div className="col-3">
                    <label
                      style={{ fontSize: "12px", marginRight: "0" }}
                      className="text-start"
                    >
                      <input
                        type="text"
                        className="form-control"
                        value={cell.finalReading}
                        onChange={(e) =>
                          handleSpareCellChange(
                            index,
                            "finalReading",
                            e.target.value
                          )
                        }
                      />
                    </label>
                  </div>
                  <div className="col-3">
                    <label
                      style={{ fontSize: "12px", marginRight: "0" }}
                      className="text-start"
                    >
                      <input
                        type="text"
                        className="form-control"
                        value={cell.commonOutputVoltage}
                        onChange={(e) =>
                          handleSpareCellChange(
                            index,
                            "commonOutputVoltage",
                            e.target.value
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>Sign of SSE/JE: </label>
                <input
                  type="text"
                  className="form-control"
                  name="signSSEJE"
                  value={formData.signSSEJE}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label>Sign of E&M:</label>
                <input
                  type="text"
                  className="form-control"
                  name="signEM"
                  value={formData.signEM}
                  onChange={handleChange}
                />
              </div>
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

export default PMSheetDepotQuartForm2Reg;
