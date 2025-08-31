import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  fetchData,
  saveData,
} from "../../reducer/isha/CSCInitializationDetailRegisterReducer";

const CSCInitializationDetailRegisterList = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({
    filename: "CSCInitializationDetailRegisterList.pdf",
  });
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const CSCInitialization = useSelector(
    (state) => state.CSCInitializationDetail
  );
  const [slug, setSlug] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  console.log(slug);

  console.log(CSCInitialization.data.data);
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (CSCInitialization.data.data && CSCInitialization.data.data) {
      setItems(CSCInitialization.data.data);
      setSlug(CSCInitialization.slug);
      setFilteredItems(CSCInitialization.data.data);
    }
  }, [CSCInitialization]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const sns = row.sns ? row.sns.toLowerCase() : "";
      const nrc = row.nrc ? row.nrc.toLowerCase() : "";
      const tq = row.tq ? row.tq.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;
      return (
        (sns.includes(searchValue.toLowerCase()) ||
          nrc.includes(searchValue.toLowerCase()) ||
          tq.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
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
            <Link underline="hover" color="inherit">
              CSC Initialization Detail Register
            </Link>
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="mb-3 form-heading-container">
          <h3> CSC Initialization Detail Register</h3>
          <span className="line-box" style={{ width: "500px" }}></span>
        </div>

        <div className="d-flex justify-content-between align-datas-center mt-3">
          <input
            type="search"
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Here."
          />
          <div className="d-flex align-datas-center gap-3">
            <div className="date-box">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label=" From Date"
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
                {/*button className="btn btn-primary">
                <FaFilter />
              </button> */}
              </Link>
              <DownloadTableExcel
                filename="CSCInitializationDetailRegisterList"
                sheet="CSCInitializationDetailRegisterList"
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
                style={{ border: "1px solid #0baa9a" }}
              >
                <MdPictureAsPdf size={"25px"} color="#850d04" />
              </button>
            </div>
          </div>
        </div>
        <div ref={targetRef} style={{ maxWidth: "95%" }}>
          <table className="table" ref={tableRef}>
            <thead>
              <tr>
                <th>Serial Number Card Start</th>
                <th>Serial Number Card End</th>
                <th>Box No.</th>
                <th>Device No.</th>
                <th>Total Qty.</th>
                <th>No.of Rejected Card</th>
                <th> No.of Initilised Card</th>
                <th>Signature</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.sns}</td>
                  <td>{item.sne}</td>
                  <td>{item.bn}</td>
                  <td>{item.dn}</td>
                  <td>{item.tq} </td>
                  <td>{item.nrc}</td>
                  <td>{item.nic}</td>
                  <td>{item.signature}</td>

                  <td className=" ">
                    {item.status === "0" ? (
                      <div className="d-flex">
                        <Link
                          to={`/edit/${slug}`}
                          state={{ id: item.id }}
                          className="btn btn-primary align-content-center"
                        >
                          Edit
                        </Link>
                        <button
                          type="submit"
                          onClick={() => {
                            handleSave(item.id);
                          }}
                          className="btn btn-primary"
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

export default CSCInitializationDetailRegisterList;
