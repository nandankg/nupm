import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { RiFileExcel2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  addLabFaulty,
  fetchData,
  saveData,
} from "../../reducer/manshi/LabFaultyReducer";
const LabFaultyList = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "lab_Faulty_Register.pdf" });
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Items per page
  const dispatch = useDispatch();
  const LabF = useSelector((state) => state.Lab);
  const [slug, setSlug] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (LabF.data && LabF.data.data) {
      setItems(LabF.data.data);
      setSlug(LabF.slug);
      setFilteredItems(LabF.data.data);
    }
  }, [LabF]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const ItemSerialNumber = row.ItemSerialNumber
        ? row.ItemSerialNumber.toLowerCase()
        : "";
      const EFRNo = row.EFRNo ? row.EFRNo.toLowerCase() : "";
      const TestingLocation = row.TestingLocation
        ? row.TestingLocation.toLowerCase()
        : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (ItemSerialNumber.includes(searchValue.toLowerCase()) ||
          EFRNo.includes(searchValue.toLowerCase()) ||
          TestingLocation.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
    setCurrentPage(1); // Reset to the first page after filtering
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
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
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              Lab Faulty
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>

        <h3>Lab Faulty List </h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="search"
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Here."
          />
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
              filename="Lab_Faulty_List"
              sheet="Lab_Faulty_List"
              currentTableRef={tableRef.current}
            >
              <button className="btn " style={{ border: "1px solid #0baa9a " }}>
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

        <div ref={targetRef} className="table-container">
          <table className="table" ref={tableRef}>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Date</th>
                <th>Received From (With Gear ID)</th>
                <th>Item Description</th>
                <th>Item Sr. No.</th>
                <th>EFR NO & Date Of Replacement</th>
                <th>Testing Location</th>
                <th>Date Of Testing From</th>
                <th>Date Of Testing To</th>
                <th>Final Status</th>
                <th>Name & Sign Of Testing Staff</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ minWidth: "150px" }}>{item.date}</td>
                  <td>{item.ReceivedFrom}</td>
                  <td>{item.Description}</td>
                  <td>{item.ItemSerialNumber}</td>
                  <td>{`${item.EFRNo} - ${item.EFRNo_Date}`}</td>
                  <td>{item.TestingLocation}</td>
                  <td>{item.DateTestingFrom}</td>
                  <td>{item.DateTestingTo}</td>
                  <td>{item.FinalStatus}</td>
                  <td>{item.TestingStaff}</td>
                  <td>{item.Remark}</td>
                  <td>
                    {item.status === "0" ? (
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
                          className="btn btn-success"
                          onClick={() => {
                            handleSave(item.id);
                          }}
                          style={{
                            padding: "6px 10px",
                            backgroundColor: "#339a63",
                            color: "white",
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
    </>
  );
};

export default LabFaultyList;
