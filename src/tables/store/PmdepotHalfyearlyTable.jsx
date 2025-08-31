import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import PDFExportComponent from "../../component/PDFExportComponent";
import {
  fetchData,
  saveData,
} from "../../reducer/store/HalfYearlyMaintenanceFormReducer";
const PmdepotHalfyearlyTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const PMsheetMonthlyList = useSelector((state) => state.pmdepothalfyearly);
  const user = JSON.parse(localStorage.getItem("userdata"));

  console.log(PMsheetMonthlyList);
  const [slug, setSlug] = useState("");
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "PM Sheet Depot HalfYearly.pdf",
  });

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (PMsheetMonthlyList.data && PMsheetMonthlyList.data.data) {
      setItems(PMsheetMonthlyList.data.data);
      setFilteredItems(PMsheetMonthlyList.data.data);
      setSlug(PMsheetMonthlyList.slug);
    }
  }, [PMsheetMonthlyList]);

  const itmm = PMsheetMonthlyList.data.data;
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
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PM Sheet Half Yearly
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
                filename="pmdepotmonthly_table"
                sheet="pmdepotmonthly_table"
                currentTableRef={tableRef.current}
              >
                <button
                  className="btn"
                  style={{ border: "1px solid #0baa9a " }}
                >
                  <RiFileExcel2Fill color="#0baa9a " size={25} />
                </button>
              </DownloadTableExcel>

              <PDFExportComponent
                contentId="section-to-export"
                filename="PMSheetMonthly.pdf"
              />
            </div>
          </div>
        </div>
        <div ref={targetRef} id="section-to-export">
        
            
        <div className="container mt-4">
            <h2 className="mb-3">PM Depot Halfyearly Table</h2>
            <table className="table table-bordered">
            <thead className="table-light">
            <tr>
                      <th colSpan={2} className="text-start">
                        Station :{filteredData[0].station}{" "}
                      </th>
                      <th>Date : {filteredData[0].date}</th>
                      <th colSpan={2}>
                        DOC Annexure-II, version 1.0{" "}
                      </th>
                    </tr>
               
                    <tr>
                        <th>System Name</th>
                        <th>Activity</th>
                        <th>Zones</th>
                        <th>Remark</th>
                        <th>Checked</th>
                    </tr>
                </thead>
                <tbody>
                

                    
                    {filteredData[0].systems.map((system) => (
                        system.activities.map((activity, index) => (
                            <tr key={`${system.id}-${activity.id}`}>
                                {index === 0 && (
                                    <td rowSpan={system.activities.length}>{system.name}</td>
                                )}
                                <td>{activity.label}</td>
                                <td>
                                    {activity.BCC1 && activity.BCC1.zones ? activity.BCC1.values.join(", ") : "-"}
                                </td>
                                <td>{activity.remark || "-"}</td>
                                <td>{activity.checked === "yes" ? "✔" : "✖"}</td>
                            </tr>
                        ))
                    ))}
                    <tr> <th>NOTES : </th> <th colSpan={4}>{filteredData[0].notes}</th></tr>
                    <tr><td>Supervisor Name</td><td>{filteredData[0].SName}</td><td>Supervisor Employee ID</td><td colSpan={2}>{filteredData[0].SempId}</td></tr>
                    <tr><td>Maintainer  Name</td><td>{filteredData[0].MName}</td><td>Maintainer  Employee ID</td><td colSpan={2}>{filteredData[0].MempId}</td></tr>
                </tbody>
            </table>
        </div>

                <td className="d-flex gap-3 mt-3 justify-content-end">
                  {filteredData[0].status === "0" || user?.role == "Admin" ? (
                    <div className="d-flex ">
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: filteredData[0].id }}
                        className="btn btn-primary align-content-center mx-3"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          handleSave(filteredData[0].id);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
            
         

        </div>
      </div>
    </>
  );
};

export default PmdepotHalfyearlyTable;
