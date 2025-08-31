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
import { fetchData, saveData } from "../../reducer/rajiv/SMPSReducer";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function SMPSList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userdata"));

  const smps = [
    {
      category: "Details of Maintenance Activity",
      label: "All Indications (Availabilty)",
    },
    {
      category: "Redundancy check",
      label: "Input-1 Switched OFF  & Input-2 Switch ON",
    },
    {
      category: "Redundancy check",
      label: "Output Voltage",
    },
    {
      category: "Redundancy check",
      label: "Input-1 Switched ON & Input-2 Switch OFF",
    },
    {
      category: "Redundancy check",
      label: "Output Voltage",
    },
  ];
  const list = useSelector((state) => state.SMPS);

  const range = ["Jan-Jun", "Jul-Dec"];

  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "SMPS Six montly.pdf" });
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const [slug, setSlug] = useState(getLastParameter().trim());
  useEffect(() => {
    if (list.data && list.data.data) {
      setItems(list.data.data);
      setFilteredItems(list.data.data);
    }
  }, [list]);
  const itmm = list.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }

  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
  console.log(items);
  return (
    <div className="container" style={{ maxWidth: "98%" }}>
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            SMPS SIX MONTHLY MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit">
            View
          </Link>
        </Breadcrumbs>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        {/* <input
          type="search"
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Here."
        /> */}
        <div className="d-flex align-items-center gap-3">
          {/* <div className="date-box">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue.startOf("day"))}
                sx={{
                  ".MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#00b3a1",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00b3a1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#00b3a1",
                    },
                  },
                }}
              />
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(newValue) => setToDate(newValue.endOf("day"))}
                sx={{
                  ".MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#00b3a1",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00b3a1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#00b3a1",
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </div> */}
          <div className="d-flex gap-3">
            <Link to="">
              {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
            </Link>
            <DownloadTableExcel
              filename="SMPS_table"
              sheet="SMPS_table"
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
      <div>
        {" "}
        <div ref={targetRef}>
          {filteredData?.map((data, index) => {
            return (
              <>
                <table className="table" ref={tableRef}>
                  <thead>
                    <tr>
                      <th colSpan={3} className="text-start">
                        Revision - 00
                      </th>
                      <th>O&M/SIGNAL/ LOG /MISC/24</th>
                    </tr>
                    <tr>
                      <th colSpan={4}>SMPS SIX MONTHLY MAINTENANCE RECORD</th>
                    </tr>
                    <tr>
                      <th className="text-start" colSpan={3}>
                        SMPS : {data?.smps}
                      </th>
                      <th className="text-start">Station :{data?.station}</th>
                    </tr>
                    <tr>
                      <th rowSpan={2}>S.No.</th>
                      <th rowSpan={2}>Details of Maintenance Activity</th>
                      <th>JAN-JUN</th>
                      <th>JUL-DEC</th>
                    </tr>

                    <tr>
                      <th>
                        Date -{" "}
                        {data?.activity?.[0].range == "Jan-Jun"
                          ? data?.date
                          : ""}
                      </th>
                      <th>
                        Date -{" "}
                        {data?.activity?.[0].range == "Jul-Dec"
                          ? data?.date
                          : ""}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* activity 1  */}

                    {smps?.map((item, index) => {
                      return index == 1 ? (
                        <>
                          <tr>
                            <td></td>
                            <td className="text-start" colSpan={3}>
                              {" "}
                              <b>Redundancy check</b>
                            </td>
                          </tr>
                          <tr>
                            <td>{index + 1}</td>
                            <td className="text-start"> {item.label}</td>
                            {range?.map((range) => (
                              <>
                                {data?.activity?.[index].range == range ? (
                                  <>
                                    <td>{data.activity?.[index].value}</td>
                                  </>
                                ) : (
                                  <>
                                    <td></td>
                                  </>
                                )}
                              </>
                            ))}
                          </tr>
                        </>
                      ) : (
                        <tr>
                          <td>{index + 1}</td>
                          <td className="text-start"> {item.label}</td>
                          {range?.map((range) => (
                            <>
                              {data?.activity?.[index].range == range ? (
                                <>
                                  <td>{data.activity?.[index].value}</td>
                                </>
                              ) : (
                                <>
                                  <td></td>
                                </>
                              )}
                            </>
                          ))}
                        </tr>
                      );
                    })}

                    <tr>
                      <td colSpan={2} className="text-start">
                        <b>Remarks : </b> {data?.remarks}
                      </td>
                      <td></td>
                      <td></td>
                    </tr>

                    <tr>
                      <td colSpan={2} className="text-start">
                        <b>Name, Designation , EmpNo : </b>{" "}
                        {data?.employee_name}, {data?.designation},{" "}
                        {data?.user_id}
                      </td>
                      <td></td>
                      <td></td>
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
    </div>
  );
}

export default SMPSList;
