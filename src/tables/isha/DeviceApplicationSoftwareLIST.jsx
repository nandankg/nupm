import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { MdPictureAsPdf } from "react-icons/md";
import {
  fetchData,
  saveData,
} from "../../reducer/isha/DeviceApplicationSoftwareReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaFilePdf } from "react-icons/fa6";
import { RiFileExcel2Fill } from "react-icons/ri";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DeviceApplicationSoftwareLIST = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "DeviceApplicationSoftwareLIST.pdf",
  });
  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const Softwareupdatelist = useSelector((state) => state.Softwareupdate);
  const [slug, setSlug] = useState("");

  console.log(slug);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  console.log(Softwareupdatelist.data.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (Softwareupdatelist.data.data) {
      setItems(Softwareupdatelist.data.data);
      setSlug(Softwareupdatelist.slug);
      setFilteredItems(Softwareupdatelist.data.data);
    }
  }, [Softwareupdatelist]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const version = row.version ? row.version.toLowerCase() : "";
      const refno = row.refno ? row.refno.toLowerCase() : "";
      const safno = row.safno ? row.safno.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (version.includes(searchValue.toLowerCase()) ||
          safno.includes(searchValue.toLowerCase()) ||
          refno.includes(searchValue.toLowerCase())) &&
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
              Device Application Software
            </Link>
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              Register
            </Link>
          </Breadcrumbs>

          <h3> Device Application Software</h3>
          <span className="line-box"></span>
        </div>
        <div className="d-flex justify-content-between">
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
                {/*button className="btn btn-primary">
                <FaFilter />
              </button> */}
              </Link>
              <DownloadTableExcel
                filename="DeviceApplicationSoftwareLIST"
                sheet="DeviceApplicationSoftwareLIST"
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
                <th>Software Version</th>
                <th>SW. Release Date </th>
                <th colSpan={2}>Deployment</th>
                <th>Release Note File Ref.No.</th>
                <th>PTW/SAF No.</th>
                <th>Remark</th>
                <th>Sign</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>Start Date</th>
                <th>End Date</th>
                <th></th>
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
                  <td>{item.version}</td>
                  <td>{item.release_date}</td>
                  <td>{item.startdate}</td>
                  <td>{item.enddate}</td>
                  <td>{item.refno}</td>
                  <td>{item.safno}</td>
                  <td>{item.remarks}</td>
                  <td>{item.sign}</td>
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

export default DeviceApplicationSoftwareLIST;
