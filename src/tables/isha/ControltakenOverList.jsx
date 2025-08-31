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
} from "../../reducer/isha/ControlTakenOverReducer";

const ControlTakenOverList = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "ControlTakenOver.pdf" });

  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const ControltakenoverList = useSelector((state) => state.Controltakenover);
  const [slug, setSlug] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  console.log(slug);

  console.log(ControltakenoverList.data.data);
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (ControltakenoverList.data.data && ControltakenoverList.data.data) {
      setItems(ControltakenoverList.data.data);
      setSlug(ControltakenoverList.slug);
      setFilteredItems(ControltakenoverList.data.data);
    }
  }, [ControltakenoverList]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const reason = row.reason ? row.reason.toLowerCase() : "";
      const changeFrom = row.changeFrom ? row.changeFrom.toLowerCase() : "";
      const changeTo = row.changeTo ? row.changeTo.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (reason.includes(searchValue.toLowerCase()) ||
          changeFrom.includes(searchValue.toLowerCase()) ||
          changeTo.includes(searchValue.toLowerCase())) &&
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
              Control Taken Over/Handover Record
            </Link>
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="mb-3 form-heading-container">
          <h3> Control Taken Over/Handover Record Register </h3>
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
                filename="ControlTakenOver"
                sheet="ControlTakenOver"
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
          <table className="table" ref={tableRef}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th colSpan={2}>CHANGED</th>
                <th>Reason</th>
                <th>Sign of SC</th>
                <th>Remark</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th>From</th>
                <th>To</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.changeFrom}</td>
                  <td>{item.changeTo}</td>
                  <td>{item.reason}</td>
                  <td>{item.signOfSC}</td>
                  <td>{item.remark}</td>

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

export default ControlTakenOverList;
