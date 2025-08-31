import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { RiFileExcel2Fill } from "react-icons/ri";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import {
  fetchData,
  saveData,
} from "../../reducer/monika/FirstAidRegisterReducer";
const FirstAidRegisterList = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "FirstAidRegister list.pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Items per page
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const FirstAidRegisterList = useSelector((state) => state.FirstAid);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (FirstAidRegisterList.data && FirstAidRegisterList.data.data) {
      setItems(FirstAidRegisterList.data.data);
      setSlug(FirstAidRegisterList.slug);

      setFilteredItems(FirstAidRegisterList.data.data);
    }
  }, [FirstAidRegisterList]);

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const itemsConsumed = row.itemsConsumed
        ? row.itemsConsumed.toLowerCase()
        : "";
      const providedByDesignation = row.providedByDesignation
        ? row.providedByDesignation.toLowerCase()
        : "";
      const providedByName = row.providedByName
        ? row.providedByName.toLowerCase()
        : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (itemsConsumed.includes(searchValue.toLowerCase()) ||
          providedByDesignation.includes(searchValue.toLowerCase()) ||
          providedByName.includes(searchValue.toLowerCase())) &&
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

  console.log(items);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            First Aid Register List
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      {/* <h3>First Aid Register</h3>
      <span className="line-box"></span> */}
      <div className="d-flex justify-content-between">
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
              filename="FirstAidRegister_table"
              sheet="FirstAidRegister_table"
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
      </div>
      <div ref={targetRef}>
        <table className="table" ref={tableRef}>
          <thead>
            <th colSpan={11}>First Aid Register</th>
            <tr>
              <th rowSpan={2}>S.No.</th>
              <th rowSpan={2}>Date</th>
              <th rowSpan={2}>Time</th>
              <th colSpan={2}>First Aid Provided To</th>
              <th colSpan={2}>First Aid Provided By</th>
              <th rowSpan={2}>Item Quantity Consumed</th>
              <th rowSpan={2}>Action</th>
            </tr>

            <tr>
              <th>Name</th>
              <th>Designation</th>

              <th>Name</th>
              <th>Designation</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.providedToName}</td>
                <td>{item.providedToDesignation}</td>
                <td>{item.providedByName}</td>
                <td>{item.providedByDesignation}</td>
                <td>{item.itemsConsumed}</td>

                <td className=" ">
                  {item.status === "0" || user?.role == "Admin" ? (
                    <div className="d-flex gap-2">
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

export default FirstAidRegisterList;
