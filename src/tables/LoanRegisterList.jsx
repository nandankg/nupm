import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { usePDF } from "react-to-pdf";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchData, saveData } from "../reducer/LoanRegisterReducer";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const LoanRegisterList = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [formValues, setFormValues] = useState();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Loanregister.pdf" });

  const [fromDate, setFromdate] = useState(null);
  const [toDate, setTodate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  const policectd = useSelector((state) => state.loanregisterstore || []);
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
      const item_name = row.item_name ? row.item_name.toLowerCase() : "";
      const item_qty = row.item_qty ? row.item_qty.toLowerCase() : "";
      const name_var = row.name ? row.name.toLowerCase() : "";
      const date = dayjs(row.issue_date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate.startOf("day")) ||
              date.isSame(fromDate.startOf("day"))) &&
            (date.isBefore(toDate.endOf("day")) ||
              date.isSame(toDate.endOf("day")))
          : true;

      const matchesSearch =
        item_name.includes(searchValue.toLowerCase()) ||
        item_qty.includes(searchValue.toLowerCase()) ||
        name_var.includes(searchValue.toLowerCase());

      return matchesSearch && isInDateRange;
    });
    setFilteredItems(newData);
  };

  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              Loan Register
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3>Loan Register List</h3>
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
                filename="Loanregister_table"
                sheet="Loanregister_table"
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
                <th colSpan={15}>Loan Register List</th>
              </tr>
              <tr>
                <th>Sr.No.</th>
                <th>Issuing Date</th>
                <th>Issue Time</th>
                <th>Item Name</th>
                <th>QTY</th>
                <th>Name</th>
                <th>Issue to Name Sign</th>
                <th>Issuer Sign</th>
                <th>Return Date</th>
                <th>Return Time</th>
                <th>Balance Qty.</th>
                <th>Return by Sign</th>
                <th>Receiver Sign</th>
                <th>Remark</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.issue_date}</td>
                  <td>{item.issue_time}</td>
                  <td>{item.item_name}</td>
                  <td>{item.item_qty}</td>
                  <td>{item.name}</td>
                  <td>{item.issue_to_name_sign}</td>
                  <td>{item.issuer_sign}</td>
                  <td>{item.return_date}</td>
                  <td>{item.return_time}</td>
                  <td>{item.balance_qty}</td>
                  <td>{item.return_by_sign}</td>
                  <td>{item.receiver_sign}</td>
                  <td>{item.remark}</td>
                  <td className=" ">
                    {item.status === "0" || user.role === "Admin" ? (
                      <div>
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
      </div>
    </>
  );
};

export default LoanRegisterList;
