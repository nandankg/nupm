import React, { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import {
  addLats,
  fetchData,
  saveData,
} from "../../reducer/isha/LATSVDUReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const LATS = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "lats.pdf" });
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const lats = useSelector((state) => state.Latsvdu);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(lats.data.data);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (lats.data.data && lats.data.data) {
      setItems(lats.data.data);
      setFilteredItems(lats.data.data);
    }
  }, [lats]);

  useEffect(() => {
    if (lats) {
      setSlug(lats.slug);
    }
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const station = row.station ? row.station.toLowerCase() : "";
      const result = row.result ? row.result.toLowerCase() : "";
      const TCEmploy_id = row.TCEmploy_id ? row.TCEmploy_id.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (station.includes(searchValue.toLowerCase()) ||
          result.includes(searchValue.toLowerCase()) ||
          TCEmploy_id.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };

  const [value, setValue] = React.useState(dayjs("2024-06-28"));

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              LATS/VDU
            </Link>
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              Resigter
            </Link>
          </Breadcrumbs>
        </div>
        <h3>LATS/VDU</h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="search"
            name="search"
            placeholder="Search Here."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="d-flex align-items-center gap-3">
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
                filename="lats table"
                sheet="lats"
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

        <div ref={targetRef}>
          <table
            className="table"
            style={{ width: "100%", overflowX: "scroll" }}
            ref={tableRef}
          >
            <thead>
              <tr>
                <th rowSpan={2}>S_No</th>
                <th rowSpan={2}>Date</th>
                <th rowSpan={2}>Station</th>
                <th rowSpan={2}>Name of SC</th>
                <th rowSpan={2}>Emp. Id.</th>
                <th colSpan={2}>TIME CONTROL TRANSFER</th>
                <th rowSpan={2}>LATS/VDU Function/Result</th>
                <th rowSpan={2}>Signature of SC</th>
                <th rowSpan={2}>TC Emp ID</th>
                <th rowSpan={2}>Remarks</th>
                <th rowSpan={2} style={{ width: "150px" }}>
                  Actions
                </th>
              </tr>
              <tr>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.station}</td>
                  <td>{item.Employ_id}</td>
                  <td>{item.Employ_id}</td>
                  <td>{item.time_from}</td>
                  <td>{item.time_to}</td>
                  <td>{item.result}</td>
                  <td>{item.Employ_id}</td>
                  <td>{item.TCEmploy_id}</td>
                  <td>{item.remarks}</td>
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

export default LATS;
