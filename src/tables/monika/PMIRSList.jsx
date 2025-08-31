import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchData, saveData } from "../../reducer/monika/PMIRSReducer";
import { useLocation, useNavigate } from "react-router-dom";

function PMIRSList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "PMIRSList.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);

  const PMIRSList = useSelector((state) => state.PMIRS);
  const [data, setdata] = useState([]);
  const [filteredItems, setfilteredItems] = useState([]);
  const itmm = PMIRSList.data.data;

  console.log();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (PMIRSList.data && PMIRSList.data.data) {
      setdata(PMIRSList.data.data);
      setSlug(PMIRSList.slug);
      setfilteredItems(PMIRSList.data.data);
    }
  }, [PMIRSList]);

  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }
  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);
  const handleFilter = () => {
    const newData = data.filter((row) => {
      const station = row.station ? row.station.toLowerCase() : "";
      const esc_no = row.esc_no ? row.esc_no.toLowerCase() : "";
      const nameOfSc = row.name_of_sc ? row.name_of_sc.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (station.includes(searchValue.toLowerCase()) ||
          esc_no.includes(searchValue.toLowerCase()) ||
          nameOfSc.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setfilteredItems(newData);
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };

  const biweeklyActivities = [
    {
      category: "Cleaning",
      activity: "Cleaning the area surrounding the IRS (debris…)",
    },
    {
      category: "Cleaning",
      activity: "Cleaning inside the IRS any accumulation of dust",
    },
    {
      category: "Cleaning",
      activity: "Cleaning inside the IRS any surplus of old grease",
    },
    {
      category: "Checks",
      activity: "Security",
    },
    {
      category: "Checks",
      activity: "Condition / Deterioration",
    },
    {
      category: "Checks",
      activity: "Obstructions	",
    },
    {
      category: "Checks",
      activity: "Condition of rods for proper working ",
    },
    {
      category: "Checks",
      activity: "Detection 2 MM / 5 MM",
    },
    {
      category: "Checks",
      activity: "Presence of Oil / Moisture",
    },

    {
      category: "Checks",
      activity: "Turnout itself in good condition",
    },
    {
      category: "Checks",
      activity: "Blades and Stock-Rails in good condition",
    },
    {
      category: "Checks",
      activity: "Absence of any abnormal appearance",
    },
    {
      category: "Checks",
      activity:
        "Absence of ballast & debris obstructing the movement of Claw Locks",
    },
    {
      category: "Checks",
      activity: "Cleaning of surplus of old grease",
    },
    {
      category: "Checks",
      activity: "Contact between blades and Stock-Rails (Less than 1.5 mm gap)",
    },
  ];

  const monthlyActivities = [
    {
      category: "Maintenance of IRS point machine",
      activity: "Oiling of Reduction Gearing",
    },
    {
      category: "Maintenance of IRS point machine",
      activity: "Greasing of the worm and worm-wheel",
    },
    {
      category: "Maintenance of IRS point machine",
      activity: "Cleaning and greasing of Drive bar",
    },
    {
      category: "Maintenance of IRS point machine",
      activity: "Cleaning and greasing of Detector bar ",
    },
    {
      category: "Maintenance of IRS point machine",
      activity: "Cleaning and greasing of Locking bar ",
    },
    {
      category: "Maintenance of IRS point machine",
      activity: "Power Operation ",
    },
    {
      category: "Maintenance of IRS point machine",
      activity: "Manual Operation ",
    },
    {
      category: "Maintenance of IRS point machine",
      activity: "Tightning of electrical termination.",
    },
    {
      category: "Maintenance of IRS point machine",
      activity: "Detection 2 MM / 5 MM",
    },
    {
      category: "Maintenance of IRS point machine",
      activity: "Opening (Left in mm)",
    },
    {
      category: "Maintenance of IRS point machine",
      activity: "Opening (Right in mm)",
    },

    {
      category: "Maintenance of Claw Locks",
      activity: "Condition and tightening of all fastening",
    },
    {
      category: "Maintenance of Claw Locks",
      activity: "Presence and condition of all split pins",
    },

    {
      category: "Maintenance of Drives and Back-Drives",
      activity: "Condition and tighting of all bolts",
    },
    {
      category: "Maintenance of Drives and Back-Drives",
      activity: "Condition of all rods",
    },
    {
      category: "Maintenance of Drives and Back-Drives",
      activity: "Presence and tightening of all bolts securing adjusting forks",
    },
    {
      category: "Maintenance of Drives and Back-Drives",
      activity: "Presence and condition of all split pins",
    },
  ];

  const quarterlyActivities = [
    {
      category: "Cleaning and Lubrication",
      activity: "Greasing of the worm and worm-wheel",
    },
    {
      category: "Cleaning and Lubrication",
      activity: "Cleaning of commutator ",
    },
    {
      category: "Cleaning and Lubrication",
      activity: "Incoming Power Cable",
    },
    {
      category: "Cleaning and Lubrication",
      activity:
        "Visual Inspection of Electrical Contacts Assmbly for accumilation of carbon ",
    },
    {
      category: "Cleaning and Lubrication",
      activity: "External adequate Lubrication",
    },
    {
      category: "Cleaning and Lubrication",
      activity: "Electrical Connections",
    },
    {
      category: "Cleaning and Lubrication",
      activity: "Hand Operation",
    },
    {
      category: "Cleaning and Lubrication",
      activity: "Detection Contacts & Rollers-Visual check",
    },

    {
      category: "Maintenance of Claw Locks:-",
      activity: "Checking wearing of Claw-Locks",
    },
    {
      category: "Maintenance of Claw Locks:-",
      activity: "Cleaning and Lubrication",
    },
    {
      category: "Maintenance of Claw Locks:-",
      activity: "Cleaning of surplus of old grease and dust",
    },
    {
      category: "Maintenance of Claw Locks:-",
      activity: "Greasing of Locking Parts corridors",
    },
    {
      category: "Maintenance of Claw Locks:-",
      activity: "Greasing of Sliding surfaces of Locking Clips",
    },
    {
      category: "Maintenance of Claw Locks:-",
      activity: "Greasing of eccentric axle (With a M10 Greaser & Grease Gun)",
    },

    {
      category: "Measurements",
      activity: "Measurement of peak current (N)",
    },
    {
      category: "Measurements",
      activity: "Measurement of peak current (R)",
    },
    {
      category: "Measurements",
      activity: "Measurement of working current (N)",
    },
    {
      category: "Measurements",
      activity: "Measurement of working current ( R)",
    },
    {
      category: "Measurements",
      activity: "Measurement of obstruction current (N)",
    },

    {
      category: "Measurements",
      activity: "Measurement of obstruction current (R)",
    },
    {
      category: "Measurements",
      activity: "Measurement of working Voltage (R)",
    },
    {
      category: "Measurements",
      activity: "Measurement of working Voltage (N)",
    },
    {
      category: "Maintenance of PMDB",
      activity: "PMDB Cleaning and Checking of proper dressing",
    },
    {
      category: "Maintenance of PMDB",
      activity: "Verification of terminal condition and Earthing of Box",
    },
    {
      category: "Maintenance of PMDB",
      activity: "Verification of availability of connection details in the Box",
    },
  ];

  console.log(filteredItems);
  return (
    <div className="container" style={{ maxWidth: "98%" }}>
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
          PM-Point Machine Maintenance Record Depot Point Machine(IRS)
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>

      <div className="d-flex justify-content-between align-datas-center mt-3">
        <div className="d-flex align-datas-center gap-3">
          <div className="d-flex gap-3">
            <Link to="">
              {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
            </Link>
            <DownloadTableExcel
              filename="PMIRS_table"
              sheet="PMIRS_table"
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
                <thead>
                  <tr>
                    <th className="text-start" colspan={4}>
                      Point No : {data?.pointNo}{" "}
                    </th>
                    <th colSpan={8} className="text-centre">
                      
                    </th>
                    <th colSpan={14} className="text-start">
                      IXL {data?.ixl}
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={"4"}></th>
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
                    let showCategory = true;

                    if (
                      index > 0 &&
                      biweeklyActivities[index - 1].category === item.category
                    ) {
                      showCategory = false;
                    }
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        {showCategory ? (
                          <td>{showCategory ? item.category : ""}</td>
                        ) : (
                          <td></td>
                        )}
                        <td colSpan={2}>{item?.activity}</td>
                        <td>Biweekly</td>
                        {months?.map((month) => (
                          <>
                            {data?.biweekly[index].month == month ? (
                              <>
                                <td>{data?.biweekly[index].status}</td>
                                <td>{data?.biweekly[index].status}</td>
                              </>
                            ) : (
                              <>
                                <td></td>
                                <td></td>
                              </>
                            )}
                          </>
                        ))}
                      </tr>
                    );
                  })}
                  <tr>
                    <td>
                      <b>S.No</b>
                    </td>
                    <td></td>
                    <td colSpan={2}>
                      <b>Details of Maintenance Activity</b>
                    </td>
                    <td colSpan={26}></td>
                  </tr>
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
                      monthlyActivities[index - 1].category === item.category
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
                              <td colSpan={2}>{data?.monthly[index].status}</td>
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
                    <td>
                      <b>S.No</b>
                    </td>
                    <td></td>
                    <td colSpan={2}>
                      <b>Details of Maintenance Activity</b>
                    </td>
                    <td colSpan={26}></td>
                  </tr>
                  {quarterlyActivities?.map((item, index) => {
                    const months = [
                      "January-April",
                      "Feb",
                      "March",
                      "April",
                      "May-August",
                      "June",
                      "July",
                      "August",
                      "September-December",
                      "Oct",
                      "Nov",
                      "December",
                    ];

                    let showCategory = true;

                    if (
                      index > 0 &&
                      quarterlyActivities[index - 1].category === item.category
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
                            {data?.quarterly[index]?.range === month ? (
                              <td colSpan={8}>
                                {data?.quarterly[index]?.status}
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
                  <tr></tr>

                  <tr>
                    <td colSpan={29}>
                      
                    </td>
                  </tr>

                  <tr>
                    <td>Remarks</td>
                    <td className="text-start" colSpan={4}>
                      {data?.remarks}
                    </td>
                    <td colSpan={24}></td>
                  </tr>
                  <tr>
                    {/* <td>Signature</td> */}
                    {/* <td className="text-start" colSpan={4}>
                      {data?.signature}
                    </td> */}
                    {/* <td colSpan={24}></td> */}
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
              <td className=" ">
                {data.status === "0" || user?.role == "Admin" ? (
                  <div className="d-flex gap-2">
                    <Link
                      to={`/edit/${slug}`}
                      state={{ id: data.id }}
                      className="btn btn-primary align-content-center"
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

export default PMIRSList;
