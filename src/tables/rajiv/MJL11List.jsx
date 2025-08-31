import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchData, saveData } from "../../reducer/rajiv/MJL11Reducer";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function MJL11List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = location.state;
  const user = JSON.parse(localStorage.getItem("userdata"));

  const biweeklyActivities = [
    {
      category: "Visual Inspection",
      activity: "Checking for Absence of Ballast & Debris",
    },
    {
      category: "Visual Inspection",
      activity:
        "Checking for the control arm in good condition and properly secured",
    },
    {
      category: "Visual Inspection",
      activity: "Checking for Good Sliding Condition of the Brass Piston",
    },
    {
      category: "Visual Inspection",
      activity: "Checking for the Point itself in Good Condition.",
    },
    {
      category: "Visual Inspection",
      activity:
        "Checking for Proper Operating of the point by Manual Operation",
    },
    {
      category: "Visual Inspection",
      activity:
        "Checking for Proper Operating of the point by Power Operation.	",
    },
    {
      category: "Visual Inspection",
      activity: "Oiling in chair plates till ACD (if required)",
    },
    {
      category: "Visual Inspection",
      activity: "Checking of 6mm U-Spacer",
    },
  ];

  const monthlyActivities = [
    {
      category: "General",
      activity: "Checking for any Abnormal Appearance of Parts.",
    },
    {
      category: "General",
      activity: "Checking for Presence and Condition of Split Pins",
    },
    {
      category: "General",
      activity: "Checking for condition & tightening of all screws and bolts.",
    },
    {
      category: "Maintenance of MJ L11",
      activity:
        "Checking for Case, Cover & Gear Box Housing in Good Conditions. ",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for Internal Gear Box Components in Good Condition. ",
    },
    {
      category: "Maintenance of MJ L11",
      activity:
        "Checking for Crank- Pin/ Crown, Roller & Lyre in Good Condition. ",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for Absence of any Abnormal Oxidation. ",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for incoming Wires Properly Secured.",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for Electrical Contacts in Good Condition.",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Cleaning Inside the MJ L11.",
    },
    {
      category: "Maintenance of MJ L11",
      activity:
        "Oiling of Gears, Teeth of Crank- Pin Crown & Control Shaft Bearings.",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Greasing of Internal Part of the Lyre.",
    },
    {
      category: "Maint. of Drives",
      activity: "Removing of the Surplus of old Grease from all axles.",
    },
    {
      category: "Maint. of Drives",
      activity: "Greasing of all axles.",
    },
    {
      category: "Maint. of VCC Detector",
      activity: "Checking for Wiring & Contacts in Good Condition.",
    },
    {
      category: "Maint. of VCC Detector",
      activity: "Oil in each Hole over the Camshafts.",
    },
    {
      category: "",
      activity: "Oiling of chair plates till ACD",
    },
    {
      category: "",
      activity:
        "Checking of tightning and condition of all roddings of points, stretcher bar and second drive",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Contact Between the Locking Crank Slide & Plastic Sleeve.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Cleaning of all Greased parts of the VCC.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Lubrication of the Internal Corridor of the VCC Frame.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Lubrication of the Locking Piece.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Lubrication of the Stabilization Roller. ",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Lubrication with Motor Oil of the Shaft of the Locking Crank. ",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Screws or Nuts Fixing the Base Plate.  ",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Screws fixing the Frame on the Base Plate ",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Screws fixing the Frame on the Rail Foot.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Bolt fixing the frame on the Rail Web.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Bolts fixing the Locking Crank on to the Switch- Blade.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Screws fixing the Plastic Sleeve Support on the Base Plate.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Screws fixing wear pads on the Locking Crank Assembly.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Condition & Tightening of Screws fixing the wear plate on the Base Plate.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for contact between the Locking Crank  Slide and Plastic sleeve.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Check C arm Bolt Spacing(0.5mm to 1mm)",
    },
    {
      category: "Final Testing",
      activity: "Gauge testing with 2 mm  test piece",
    },
    {
      category: "Final Testing",
      activity: "Gauge testing with 5 mm  test piece",
    },
    {
      category: "Final Testing",
      activity: "Measurement of Opening of Switch Blade-LHS[160mm-163mm]",
    },
    {
      category: "Final Testing",
      activity: "Measurement of Opening of Switch Blade-RHS[160mm-163mm]",
    },
    {
      category: "Final Testing",
      activity: "Track Locking",
    },
    {
      category: "Final Testing",
      activity: "Checking of 6mm U-Spacer",
    },
    {
      category: "Final Testing",
      activity:
        "Measurement of gap between C arm locking head and VCC frame (Gap  >1mm)",
    },
    {
      category: "Final Testing",
      activity: "Checking of mark of shoe",
    },
    {
      category: "Final Testing",
      activity: "Meaurement of gap at brake pad assembly (Gap >1mm)",
    },
  ];

  const quarterlyActivities1 = [
    {
      category: "Maintenance of Drives",
      activity: "Checking for Condition & Tightening of all Fittings & Bolts.",
    },
    {
      category: "Maintenance of Drives",
      activity:
        "Checking for Condition & Tightening of all nuts securing the Forks.",
    },
    {
      category: "Maintenance of Drives",
      activity: "Checking of all Rods in Good Condition.",
    },
    {
      category: "Maintenance of Drives",
      activity: "Checking for Presence & Condition of All Split Pins.",
    },
    {
      category: "Maintenance of Drives",
      activity: "Checking for wear on crank pins.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Checking for Wear of Insulating Bushes & Washers on Axles.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Checking for Wear of the Locking Crank Pad.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity: "Checking for Wear of the Locking Piece.",
    },
    {
      category: "Maintenance of VCC Clamp Lock",
      activity:
        "Checking for Wear of the Locking Crank Supporting Shoe (presence of the chamfer).",
    },
    {
      category: "Maintenance of VCC Detector",
      activity:
        "Checking for Wear of the Locking Crank Joint (when gap on shim plates).",
    },
    {
      category: "Maintenance of VCC Detector",
      activity: "Checking of Finger Working with Switch Rail Open Condition.",
    },
    {
      category: "Maintenance of VCC Detector",
      activity:
        "Checking for the good compression stroke of contact blades of detector.",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for good sliding stroke of the cam assembly.",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for Condition & Tightening of all Fittings & Bolts.",
    },
    {
      category: "Maintenance of MJ L11",
      activity:
        "Measurement of the Manual/ Motor establishment Contact Distance.",
    },
    {
      category: "Maintenance of MJ L11",
      activity:
        "Measurement of the Clearance of the Dog Clutch on Motor Position.",
    },
    {
      category: "Maintenance of MJ L11",
      activity: "Checking for Gap Between Plastic Control Roller & dog Clutch.",
    },
    {
      category: "Maintenance of PMDB",
      activity: "PMDB Cleaning and Checking of proper dressing.",
    },
    {
      category: "Maintenance of PMDB",
      activity: "Verification of terminal condition and Earthing of Box.",
    },
    {
      category: "Maintenance of PMDB",
      activity:
        "Verification of availability of connection details in the Box.",
    },
  ];
  const quarterlyActivities2 = [
    {
      supcategory: "RUNNING CURRENT(AMPERES)",
      category: "NORMAL",
      activity: "R",
    },
    {
      supcategory: "RUNNING CURRENT(AMPERES)",
      category: "NORMAL",
      activity: "Y",
    },
    {
      supcategory: "RUNNING CURRENT(AMPERES)",

      category: "NORMAL",
      activity: "B",
    },
    {
      supcategory: "RUNNING CURRENT(AMPERES)",
      category: "REVERSE",
      activity: "R",
    },
    {
      supcategory: "RUNNING CURRENT(AMPERES)",
      category: "REVERSE",
      activity: "Y",
    },
    {
      supcategory: "RUNNING CURRENT(AMPERES)",
      category: "REVERSE",
      activity: "B",
    },
    {
      supcategory: "OBSTRUCTION CURRENT (AMPERES)",
      category: "NORMAL",
      activity: "R",
    },
    {
      supcategory: "OBSTRUCTION CURRENT (AMPERES)",
      category: "NORMAL",
      activity: "Y",
    },
    {
      supcategory: "OBSTRUCTION CURRENT (AMPERES)",

      category: "NORMAL",
      activity: "B",
    },
    {
      supcategory: "OBSTRUCTION CURRENT (AMPERES)",
      category: "REVERSE",
      activity: "R",
    },
    {
      supcategory: "OBSTRUCTION CURRENT (AMPERES)",
      category: "REVERSE",
      activity: "Y",
    },
    {
      supcategory: "OBSTRUCTION CURRENT (AMPERES)",
      category: "REVERSE",
      activity: "B",
    },
  ];

  const halfYearlyActivities = [
    { category: "General", activity: "EKT Functional Test" },
    { category: "General", activity: "Cleaning of EKT box" },
    {
      category: "General",
      activity: "Checking of EKT box LED status",
    },
    {
      category: "General",
      activity: "Checking of proper functioning of EKT Switch",
    },
    {
      category: "General",
      activity: "EKT removal/insertion from VDU",
    },
    {
      category: "General",
      activity: "EKT removal/insertion from ATS",
    },
    {
      category: "General",
      activity: "Checking of any abnormality, wear tear of EKT box",
    },
  ];
  const mjl11List = useSelector((state) => state.MJL11);
  const [slug, setSlug] = useState(getLastParameter().trim());

  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename:
      "PM-Point Machine maintenance record Main Line Point Machine(MJ).pdf",
  });
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const itmm = mjl11List.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }
  useEffect(() => {
    if (mjl11List.data && mjl11List.data.data) {
      setItems(mjl11List.data.data);
      setFilteredItems(mjl11List.data.data);
    }
  }, [mjl11List]);

  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
  //
  return (
    <div className="container" style={{ maxWidth: "98%" }}>
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            PM-Point Machine maintenance record Main Line Point Machine(MJ){" "}
          </Link>
          <Link underline="hover" color="inherit">
            View
          </Link>
        </Breadcrumbs>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex gap-3">
            <Link to="">
              {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
            </Link>
            <DownloadTableExcel
              filename="PMMJ_table"
              sheet="PMMJ_table"
              currentTableRef={tableRef.current}
            >
              <button className="btn" style={{ border: "1px solid #0baa9a " }}>
                <RiFileExcel2Fill color="#0baa9a " size={25} />
              </button>
            </DownloadTableExcel>
            <button
              className="btn"
              onClick={() => toPDF()}
              style={{
                border: "1px solid #0baa9a",
              }}
            >
              <MdPictureAsPdf size={"25px"} color="#850d04" />
            </button>
          </div>
        </div>
      </div>
      <div ref={targetRef}>
        {filteredData?.map((data) => {
          return (
            <>
              <table className="table" ref={tableRef}>
                <thead style={{ position: "sticky", top: "0" }}>
                  <tr>
                    <th className="text-start">Point No : {data?.pointNo} </th>
                    <th className="text-start">Date : {data?.date} </th>
                    <th colSpan={"3"}>Station :<br/>{data?.station} </th>
                    <th colSpan={2}>JAN</th>
                    <th colSpan={2}>FEB</th>
                    <th colSpan={2}> MAR</th>
                    <th colSpan={2}>APR</th>
                    <th colSpan={2}>MAY</th>
                    <th colSpan={2}>JUN</th>
                    <th colSpan={2}>JUL</th>
                    <th colSpan={2}>AUG</th>
                    <th colSpan={2}>SEP</th>
                    <th colSpan={2}>OCT</th>
                    <th colSpan={2}>NOV</th>
                    <th colSpan={2}>DEC</th>
                  </tr>
                  <tr>
                    <th>S.NO.</th>
                    <th>Type</th>
                    <th colSpan={2}>Details of Maint.. Activity</th>
                    <th>Periodic</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.biweekly?.[0]?.status != null ? (
                    <>
                      {biweeklyActivities?.map((item, index) => {
                        const months = [
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ];
                        const showCategory =
                          index === 0 ||
                          biweeklyActivities[index - 1]?.category !==
                            item?.category;

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            {showCategory && (
                              <td rowSpan={8}>{item.category}</td>
                            )}
                            <td colSpan={2}>{item.activity}</td>
                            <td>Biweekly</td>
                            {months.map((month, monthIndex) => {
                              const matchedMonth = data?.biweekly?.find(
                                (entry) => entry.month === month
                              );

                              return (
                                <React.Fragment key={monthIndex}>
                                  {matchedMonth ? (
                                    <>
                                      <td>{matchedMonth.status}</td>
                                      <td>{matchedMonth.status}</td>
                                    </>
                                  ) : (
                                    <>
                                      <td></td>
                                      <td></td>
                                    </>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}

                  {data?.monthly?.[0]?.status != null ? (
                    <>
                      {monthlyActivities?.map((item, index) => {
                        const months = [
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ];

                        let showCategory = true;

                        if (
                          index > 0 &&
                          monthlyActivities[index - 1].category ===
                            item.category
                        ) {
                          showCategory = false;
                        }

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{showCategory ? item?.category : ""}</td>
                            <td colSpan={2}>{item?.activity}</td>
                            <td>Monthly</td>
                            {months.map((month) => (
                              <React.Fragment key={month}>
                                {data?.monthly[index].month === month ? (
                                  <td colSpan={2}>
                                    {data?.monthly[index].status}
                                  </td>
                                ) : (
                                  <>
                                    <td></td>
                                    <td></td>
                                  </>
                                )}
                              </React.Fragment>
                            ))}
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                  {data?.quarterly1?.[0]?.status != null ? (
                    <>
                      {quarterlyActivities1?.map((item, index) => {
                        const months = [
                          "January-March",
                          "Feb",
                          "March",
                          "April-June",
                          "May",
                          "June",
                          "July-September",
                          "August",
                          "September",
                          "October-December",
                          "Nov",
                          "December",
                        ];

                        let showCategory = true;

                        if (
                          index > 0 &&
                          quarterlyActivities1[index - 1].category ===
                            item.category
                        ) {
                          showCategory = false;
                        }

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{showCategory ? item?.category : ""}</td>
                            <td colSpan={2}>{item?.activity}</td>
                            <td>Quarterly</td>
                            {months.map((month) => (
                              <React.Fragment key={month}>
                                {data?.quarterly1[index]?.range === month ? (
                                  <td colSpan={8}>
                                    {data?.quarterly1[index]?.status}
                                  </td>
                                ) : (
                                  <>
                                    <td></td>
                                    <td></td>
                                  </>
                                )}
                              </React.Fragment>
                            ))}
                          </tr>
                        );
                      })}
                      <tr>
                        <td colSpan={29}>
                          <b>CURRENT MEASUREMENT OF POINT MACHINE</b>
                        </td>
                      </tr>
                    </>
                  ) : (
                    ""
                  )}
                  {data?.quarterly2?.[0]?.status != null ? (
                    <>
                      {quarterlyActivities2?.map((item, index) => {
                        const months = [
                          "January-March",
                          "Feb",
                          "March",
                          "April-June",
                          "May",
                          "June",
                          "July-September",
                          "August",
                          "September",
                          "October-December",
                          "Nov",
                          "December",
                        ];

                        let showCategory = true;

                        if (
                          index > 0 &&
                          quarterlyActivities2[index - 1].category ===
                            item.category
                        ) {
                          showCategory = false;
                        }

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{showCategory ? item?.supcategory : ""}</td>
                            <td>{showCategory ? item?.category : ""}</td>
                            <td>{item?.activity}</td>
                            <td>Quarterly</td>
                            {months.map((month) => (
                              <React.Fragment key={month}>
                                {data?.quarterly2[index]?.range == month ? (
                                  <td colSpan={8}>
                                    {data?.quarterly2[index]?.status}
                                  </td>
                                ) : (
                                  <>
                                    <td></td>
                                    <td></td>
                                  </>
                                )}
                              </React.Fragment>
                            ))}
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                  {data?.halfYearly?.[0]?.status != null ? (
                    <>
                      <tr>
                        <td colSpan={29}>
                          <b>EKT Maintenance</b>
                        </td>
                      </tr>
                      {halfYearlyActivities?.map((item, index) => {
                        const months = [
                          "January-June",
                          "Feb",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July-December",
                          "August",
                          "Sep",
                          "Oct",
                          "Nov",
                          "December",
                        ];

                        let showCategory = true;

                        if (
                          index > 0 &&
                          halfYearlyActivities[index - 1].category ===
                            item.category
                        ) {
                          showCategory = false;
                        }

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            {showCategory ? (
                              <td rowSpan={7}>
                                {showCategory ? item.category : ""}
                              </td>
                            ) : (
                              ""
                            )}
                            <td colSpan={2}>{item?.activity}</td>
                            <td>Half Yearly</td>
                            {months.map((month) => (
                              <React.Fragment key={month}>
                                {data?.halfYearly[index]?.range === month ? (
                                  <td colSpan={12}>
                                    {data?.halfYearly[index]?.status}
                                  </td>
                                ) : (
                                  <>
                                    <td></td>
                                    <td></td>
                                  </>
                                )}
                              </React.Fragment>
                            ))}
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}

                  <tr>
                    <td>Remarks</td>
                    <td className="text-start" colSpan={4}>
                      {data?.remarks}
                    </td>
                    <td colSpan={24}></td>
                  </tr>
                  <tr>
                    <td>Signature</td>
                    <td className="text-start" colSpan={4}>
                      {data?.signature}
                    </td>
                    <td colSpan={24}></td>
                  </tr>
                  <tr>
                    <td>Name, Designation & Emp. No.</td>
                    <td className="text-start" colSpan={4}>
                      {data?.name}, {data?.designation} , {data.empno}
                    </td>
                    <td colSpan={24}></td>
                  </tr>
                  <tr>
                    <td>Counter Signature</td>
                    <td className="text-start" colSpan={4}>
                      {data?.csign}
                    </td>
                    <td colSpan={24}></td>
                  </tr>
                </tbody>
              </table>
              <td className="d-flex gap-3 mt-3 justify-content-end">
                {data.status === "0" || user?.role == "Admin" ? (
                  <div className="d-flex ">
                    <Link
                      to={`/edit/${slug}`}
                      state={{ id: data.id }}
                      className="btn btn-primary align-content-center mx-3"
                    >
                      Edit
                    </Link>
                    <button
                      type="submit"
                      onClick={() => {
                        handleSave(data.id);
                      }}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </td>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default MJL11List;
