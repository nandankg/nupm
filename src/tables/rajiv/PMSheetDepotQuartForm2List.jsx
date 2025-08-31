import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { addPMSheetDepotQuartForm2 } from "../../reducer/rajiv/PMSheetDepotQuartForm2Reducer";
const PMSheetDepotQuartForm2List = () => {
  const dispatch = useDispatch();
  const PMSheetDepotQuartForm2List = useSelector(
    (state) => state.PMSheetDepotQuartForm2
  );
  const user = JSON.parse(localStorage.getItem("userdata"));

  console.log(PMSheetDepotQuartForm2List);
  useEffect(() => {
    // Initialize items from local storage
    const storedItems =
      JSON.parse(localStorage.getItem("PMSheetDepotQuartForm2List")) || [];
    if (storedItems.length > 0) {
      console.log("Initializing from local storage:", storedItems);
      dispatch(addPMSheetDepotQuartForm2(storedItems));
    }
  }, [dispatch]);
  useEffect(() => {
    // Initialize items from local storage
    const storedItems =
      JSON.parse(localStorage.getItem("PMSheetDepotQuartForm2List")) || [];
    if (storedItems.length > 0) {
      console.log("Initializing from local storage:", storedItems);
      dispatch(addPMSheetDepotQuartForm2(storedItems));
    }
  }, []);

  // useEffect(() => {
  //   // Sync local storage with Redux store
  //   console.log("Updating local storage:", PMSheetDepotQuartForm2List);
  //   if (PMSheetDepotQuartForm2List?.length > 0) {
  //     localStorage.setItem(
  //       "PMsheetMonthlyList",
  //       JSON.stringify(PMSheetDepotQuartForm2List)
  //     );
  //   }
  // }, [PMSheetDepotQuartForm2List]);

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/PMSheetDepotQuartForm2/register"
            >
              PM Sheet Depot Quartly Form
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> PM Sheet Depot Quartly Form</h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between">
          <input type="search" name="search" placeholder="Search Here." />
          <div className="d-flex gap-3">
            <Link to="">
              <button className="btn btn-primary">
                <FaFilter />
              </button>
            </Link>
            <Link to="">
              <button className="btn btn-primary">Export</button>
            </Link>
          </div>
        </div>

        {PMSheetDepotQuartForm2List?.toReversed().map((item, index) => {
          return (
            <>
              <table>
                <thead>
                  <tr>
                    <th colSpan={5}>
                      UPS SYSTEM MAINTENANCE RECORD (ANNEXURE-G){" "}
                    </th>
                    <th colSpan={7}>Month : {item.month}</th>
                    <th colSpan={8}>Ref:O&M/TELE-AFC/SOP/03 </th>
                  </tr>
                  <tr>
                    <th colSpan={7}>
                      (UPS Battery Load Test)
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      FREQUENCY: MONTHLY{" "}
                    </th>
                    <th colSpan={4}>BATTERY BANK-1 </th>
                    <th colSpan={9}>DOCUMENT:0&M/Tele/CHO2 </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={3}>STATION: {item.station}</td>
                    <td colSpan={3}>UPS Rating: 120 KVA </td>
                    <td colSpan={5}>Battery Capacity: 600 AH </td>
                    <td colSpan={3}>Date: {item.Date}</td>
                    <td colSpan={3}>Start Time : {item.startTime}</td>
                    <td colSpan={3}>End Time: {item.endTime}</td>
                  </tr>
                  <tr>
                    <td>Average Temp : </td>
                    <td>{item.temperature}</td>
                    <td>Battery Terminals Cleaned: </td>
                    <td colSpan={2}>
                      {item.BatteryTerminalsCleaned == true ? "Yes" : "No"}
                    </td>
                    <td>Loose Connection Checked </td>
                    <td colSpan={2}>
                      {item.LooseConnectionChecked == true ? "Yes" : "No"}
                    </td>{" "}
                    <td>Cell Leakage Checked </td>
                    <td colSpan={2}>
                      {item.CellLeakageChecked == true ? "Yes" : "No"}
                    </td>
                    <td>Battery Voltage Before Load Test </td>
                    <td colSpan={2}>{item.batteryVoltageBefore}</td>
                    <td>Battery Voltage After Load Test </td>
                    <td colSpan={2}>{item.batteryVoltageAfter}</td>
                    <td>Battery Charget % </td>
                    <td colSpan={2}>{item.batteryCharge}</td>
                  </tr>
                  <tr>
                    <td>Charging Current After Load Test </td>
                    <td>{item.chargingAfterLoadTest}</td>
                    <td>Load During Test UPS1 U: </td>
                    <td colSpan={2}>{item.loadDuringTestUPS1.UPS1U}</td>
                    <td>Load During Fest UPS1 V: </td>
                    <td colSpan={2}>{item.loadDuringTestUPS1.UPS1V}</td>{" "}
                    <td>Load During Test UPS1 W: </td>
                    <td colSpan={2}>{item.loadDuringTestUPS1.UPS1W}</td>{" "}
                    <td colSpan={9}></td>
                  </tr>
                  <tr>
                    <td colSpan={2}> </td>
                    <td>Load During Test UPS2 U: </td>
                    <td colSpan={2}>{item.loadDuringTestUPS2.UPS2U}</td>
                    <td>Load During Fest UPS2 V: </td>
                    <td colSpan={2}>{item.loadDuringTestUPS2.UPS2V}</td>
                    <td>Load During Test UPS2 W: </td>
                    <td colSpan={2}>{item.loadDuringTestUPS2.UPS2W}</td>
                    <td colSpan={9}></td>
                  </tr>
                  {[...Array(5)].map((_, cellGroupIndex) => (
                    <React.Fragment key={cellGroupIndex}>
                      <tr>
                        <td colSpan={2} className="text-start">
                          <b>Cell No.</b>
                        </td>
                        {Array.from({ length: 18 }, (_, cellIndex) => (
                          <td key={cellIndex}>
                            <b>{cellGroupIndex * 18 + cellIndex + 1}</b>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td colSpan={2} className="text-start">
                          ON FLOAT (VOLTAGE)
                        </td>
                        {Array.from({ length: 18 }, (_, cellIndex) => (
                          <td key={cellIndex}>
                            {
                              item.cellVoltage[cellGroupIndex * 18 + cellIndex]
                                ?.onFloat
                            }
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td colSpan={2} className="text-start">
                          INITIAL READING(ON LOAD)
                        </td>
                        {Array.from({ length: 18 }, (_, cellIndex) => (
                          <td key={cellIndex}>
                            {
                              item.cellVoltage[cellGroupIndex * 18 + cellIndex]
                                ?.initialReading
                            }
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td colSpan={2} className="text-start">
                          AFTER 1.5 Hrs(ON LOAD)
                        </td>
                        {Array.from({ length: 18 }, (_, cellIndex) => (
                          <td key={cellIndex}>
                            {
                              item.cellVoltage[cellGroupIndex * 18 + cellIndex]
                                ?.after1_5Hours
                            }
                          </td>
                        ))}
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>{" "}
              </table>
              <td className="d-flex gap-3 mt-3 justify-content-end">
                <button className="btn btn-primary ">Edit</button>
                <button className="btn btn-success">Save</button>
              </td>
            </>
          );
        })}
      </div>
    </>
  );
};

export default PMSheetDepotQuartForm2List;
