import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  addStationDiary,
  fetchData,
  saveData,
} from "../../reducer/akshra/ChecklistReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaFilePdf } from "react-icons/fa6";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { filterTableData } from "../../component/tableUtils";
const ChecklistAfc = ({ checkk }) => {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "afchalfyearly.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const addafcHalf = useSelector((state) => state.checkk);
  //const [slug, setSlug] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 10; // Items per page
  //console.log(slug);
  console.log(addafcHalf.data.data);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (addafcHalf.data && addafcHalf.data.data) {
      setItems(addafcHalf.data.data);
      //setSlug(addafcHalf.slug);
      setFilteredItems(addafcHalf.data.data);
    }
  }, [addafcHalf]);

  useEffect(() => {
    const newData = filterTableData(items, searchValue, fromDate, toDate);
    setFilteredItems(newData);
  }, [searchValue, fromDate, toDate]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/form/pm-logbook-half-yearly-tvm-mainline"
            >
              AFC Preventive Maintenance (HALF YEARLY)
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> AFC Preventive Maintenance (HALF YEARLY) </h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="search"
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Here."
          />
          <div className="d-flex align-items-center gap-3">
            <div className="date-box">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From Date"
                  value={fromDate}
                  onChange={(newValue) =>
                    setFromDate(newValue ? newValue.startOf("day") : null)
                  }
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
                  onChange={(newValue) =>
                    setToDate(newValue ? newValue.endOf("day") : null)
                  }
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
            </div>

            <div className="d-flex gap-3">
              <Link to="">
                {/* <button className="btn btn-primary">
              <FaFilter />
            </button> */}
              </Link>
              <DownloadTableExcel
                filename="Afc_halfyearly_table"
                sheet="Afc_halfyearly_table"
                currentTableRef={tableRef.current}
              >
                <button
                  className="btn "
                  style={{ border: "1px solid #0baa9a " }}
                >
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
          <table className="table">
            <thead
              style={{
                position: "sticky",
                top: "0",
                backgroundColor: "#fff",
              }}
            >
              <tr>
                <th className="text-start">Date & Time</th>
                <th className="text-start">Station</th>
                <th className="text-start">Employee ID</th>
                <th className="text-start">Emp Name</th>
                <th className="text-start">Form ID</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {items.map((itm, index) => (
                <tr key={index}>
                  <td>{itm.created_at}</td>
                  <td>{itm.station}</td>
                  <td>{itm.user_id}</td>
                  <td>{itm.employee_name}</td>
                  <td>{itm.id}</td>
                  <td>
                    <Link
                      to={`/view/pm-logbook-half-yearly-tvm-mainline`}
                      state={{ id: itm.id }}
                      className="btn btn-primary"
                    >
                      View
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/edit/pm-logbook-half-yearly-tvm-mainline`}
                      state={{ id: itm.id }}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex gap-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`btn btn-primary   ${
                index + 1 === currentPage ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChecklistAfc;
