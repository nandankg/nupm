import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  saveData,
} from "../../reducer/pinki/HandingTakingNoteReducer";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
const HandingTakingNoteList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Handing_Taking.pdf" });
  const handingtaking = useSelector((state) => state.handingtakingnote);
  const [slug, setSlug] = useState("");

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Items per page
  const user = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (handingtaking.data && handingtaking.data.data) {
      setItems(handingtaking.data.data);
      setSlug(handingtaking.slug);
      setFilteredItems(handingtaking.data.data);
    }
  }, [handingtaking]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const partNo = row.partNo ? row.partNo.toLowerCase() : "";
      const serialNo = row.contactNo ? row.contactNo.toLowerCase() : "";
      const locationFrom = row.locationFrom
        ? row.locationFrom.toLowerCase()
        : "";
      const authRefNo = row.authRefNo ? row.authRefNo.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (partNo.includes(searchValue.toLowerCase()) ||
          serialNo.includes(searchValue.toLowerCase()) ||
          locationFrom.includes(searchValue.toLowerCase()) ||
          authRefNo.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
    setCurrentPage(1); // Reset to the first page after filtering
  };
  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
  console.log(items);
  console.log(filteredItems);

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            to="/form/permanent-loan-register"
          >
            Handing Taking Register
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <div className="text-center mb-4">
        <h3>उत्तर प्रदेश मेट्रो रेल कॉर्पोरेशन लिमिटेड</h3>
        <h3>UTTAR PRADESH METRO RAIL CORPORATION LIMITED</h3>
        <h4>
          Handing / Taking Over Note For PLL (Permanent Loan Ledger) Items
        </h4>
      </div>

      <span className="line-box"></span>
      <div className="d-flex justify-content-between align-items-center mt-3">
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
          </div>
          <div className="d-flex gap-3">
            <Link to="">
              {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
            </Link>
            <DownloadTableExcel
              filename="Handing_Taking_table"
              sheet="Handing_Taking_table"
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
        <table className="table" ref={tableRef}>
          <thead className="tableheader">
            <tr>
              <th rowSpan={2}>Sr. No.</th>
              <th rowSpan={2}>Date</th>
              <th rowSpan={2}>Item Description</th>
              <th rowSpan={2}>Part No.</th>
              <th rowSpan={2}>Serial No.</th>
              <th colSpan={2}>Location</th>
              <th rowSpan={2}>Qty.</th>
              <th rowSpan={2}>Defective/Serviceable/ Repaired</th>
              <th rowSpan={2}>Auth. Ref. No.</th>
              <th colSpan={4}>Handed Over By</th>
              <th colSpan={4}>Taken Over By</th>
              <th rowSpan={2}>Forwarded by (if any)</th>
              <th rowSpan={2}>Counter Name</th>
              <th rowSpan={2}>Remarks</th>
              <th rowSpan={2}>Action</th>
            </tr>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Emp ID</th>
              <th>Date</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Emp ID</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.itemDescription}</td>
                <td>{item.partNo}</td>
                <td>{item.serialNo}</td>
                <td>{item.locationFrom}</td>
                <td>{item.locationTo}</td>
                <td>{item.qty}</td>
                <td>{item.condition}</td>
                <td>{item.authRefNo}</td>
                <td>{item.name_handed}</td>
                {/* <td>{item.sign_handed}</td> */}
                <td>{item.designation_handed}</td>
                <td>{item.emp_id_handed}</td>
                <td>{item.date_handed}</td>
                <td>{item.name_taken}</td>
                {/* <td>{item.sign_taken}</td> */}
                <td>{item.designation_taken}</td>
                <td>{item.empid_taken}</td>
                <td>{item.date_taken}</td>
                <td>{item.forwarded_by}</td>
                <td>{item.counter_sign}</td>
                <td>{item.remarks}</td>

                <td>
                  {item.status === "0" || user.role === "Admin" ? (
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: item.id }}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        onClick={() => {
                          handleSave(item.id);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
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
  );
};

export default HandingTakingNoteList;
