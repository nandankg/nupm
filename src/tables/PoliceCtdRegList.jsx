import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import {
  addpolicectdreg,
  fetchData,
  saveData,
} from "../reducer/PoliceCtdRegReducer";

import { DownloadTableExcel } from "react-export-table-to-excel";
import { usePDF } from "react-to-pdf";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const PoliceCtdRegList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [formValues, setFormValues] = useState();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Plicecustodyregister.pdf" });

  const [fromDate, setFromdate] = useState();
  const [toDate, setTodate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  const policectd = useSelector((state) => state.policectdstate || []);
  const [items, setItems] = useState([]);
  console.log(policectd.data.data);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (policectd.data && policectd.data.data) {
      setItems(policectd.data.data);

      setFilteredItems(policectd.data.data);
    }
  }, [policectd]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      // varible should be from api
      const Employ_id_var = row.Employ_id ? row.Employ_id.toLowerCase() : "";
      const handedTo_var = row.handedTo ? row.handedTo.toLowerCase() : "";
      const id = row.id ? String(row.id).toLowerCase() : "";
      const name_var = row.name ? row.name.toLowerCase() : "";

      //so here is the fault
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (Employ_id_var.includes(searchValue.toLowerCase()) ||
          handedTo_var.includes(searchValue.toLowerCase()) ||
          id.includes(searchValue.toLowerCase()) ||
          name_var.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
    setCurrentPage(1);
  };

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
  return (
    <>
      <div className="container">
        <h3>Police Custody Register List</h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="search"
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Here."
          />
          <div className="d-flex align-items-center gap-3 mt-3">
            <div className="date-box">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From Date"
                  value={fromDate}
                  onChange={(newValue) => setFromdate(newValue.startOf("day"))}
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
                  onChange={(newValue) => setTodate(newValue.endOf("day"))}
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
                filename="Policecustody_table"
                sheet="Policecustody_table"
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
          <table className="table" ref={tableRef}>
            <thead>
              <tr>
                <th className="text-center" colSpan={13}>
                  {" "}
                  <h1 style={{ color: "#b41409cc" }}>
                    LUCKNOW METRO RAIL CORPORATION LTD
                  </h1>
                  <span className="line-box"></span>
                </th>
              </tr>
              <tr>
                <th className="text-center" colSpan={13}>
                  <h3> POLICE CUSTODY REGISTER</h3>{" "}
                </th>
              </tr>
              <tr className="text-center">
                <th>S.No.</th>
                <th>Date</th>
                <th>Time</th>
                <th>Name of the Person</th>
                <th>Address</th>
                <th>contact No.</th>
                <th>Handed Over To</th>
                <th>Reason in Brief</th>
                <th>Handing Over Memo No.</th>
                <th>Signature of SC/ASC</th>
                <th>Remark</th>
                <th>Form ID</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.contactNo}</td>
                  <td>{item.handedTo}</td>
                  <td>{item.reason}</td>
                  <td>{item.handing_over_Memo_no}</td>
                  <td>{item.sigofsc}</td>
                  <td>{item.remark}</td>
                  <td>{item.id}</td>
                  <td className=" ">
                    {item.status === "0" || user.role === "Admin" ? (
                      <div>
                        <Link
                          to={`/edit/${slug}`}
                          style={{ width: "120px", padding: "10px" }}
                          state={{ id: item.id }}
                          className="btn btn-primary"
                        >
                          Edit
                        </Link>
                        <button
                          type="submit"
                          style={{
                            width: "120px",
                            padding: "10px",
                            marginTop: "10px",
                          }}
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
        <div className="d-flex gap-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`btn btn-primary ${
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

export default PoliceCtdRegList;
