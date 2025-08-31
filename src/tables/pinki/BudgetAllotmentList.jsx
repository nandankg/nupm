import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { RiFileExcel2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchData, saveData } from "../../reducer/pinki/BudgetAllotmentReducer";

const BudgetAllotmentList = () => {
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Budget Allotment.pdf" });
  const budgetallotment = useSelector((state) => state.budgetallotment);
  const [slug, setSlug] = useState("");

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Items per page

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (budgetallotment.data && budgetallotment.data.data) {
      setItems(budgetallotment.data.data);
      setSlug(budgetallotment.slug);
      setFilteredItems(budgetallotment.data.data);
    }
  }, [budgetallotment]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const name = row.name ? row.name.toLowerCase() : "";
      const contactNo = row.contactNo ? row.contactNo.toLowerCase() : "";
      const handing_over_Memo_no = row.handing_over_Memo_no
        ? row.handing_over_Memo_no.toLowerCase()
        : "";
      const address = row.address ? row.address.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
          (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (name.includes(searchValue.toLowerCase()) ||
          contactNo.includes(searchValue.toLowerCase()) ||
          handing_over_Memo_no.includes(searchValue.toLowerCase()) ||
          address.includes(searchValue.toLowerCase())) &&
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
  };

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            to="/form/expenditure-budget-register"
          >
            Budget Allotment
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <h3>Budget Allotment (Finance Department) List</h3>
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
            <DownloadTableExcel
              filename="BudgetAllotment_table"
              sheet="BudgetAllotment_table"
              currentTableRef={tableRef.current}
            >
              <button
                className="btn"
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
        <table className="table border" ref={tableRef}>
          <thead className="tableheader">
            <tr>
              <th>S.No.</th>
              <th>Budget Head</th>
              <th>Sub Head</th>
              <th>Financial Year</th>
              <th>Department</th>
              <th>Budget Type</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.budgetHead}</td>
                <td>{item.subHead}</td>
                <td>{item.financialYear}</td>
                <td>{item.department}</td>
                <td>{item.budgetType}</td>
                <td>{item.amount}</td>
                <td>
                  {item.status === "0" ? (
                    <div>
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: item.id }}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        style={{
                          padding: "6px 10px",
                          backgroundColor: "#399a63",
                          border: "1px solid #28a745",
                          color: "white",
                        }}
                        onClick={() => handleSave(item.id)}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <span>Submitted</span>
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

export default BudgetAllotmentList;
