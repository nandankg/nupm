import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  saveData,
} from "../../reducer/rajiv/FoundReceivedCashReducer";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { FaFilter } from "react-icons/fa";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const FoundReceivedCashList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const foundReceivedCashList = useSelector((state) => state.foundReceivedCash);
  console.log(foundReceivedCashList);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Found Received Cash.pdf" });
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 10; // Items per page

  // Fetch data when the component mounts
  useEffect(() => {
    const delayedFunction = () => {
      dispatch(fetchData());
    };

    // Set a timeout to call the function after 3 seconds
    const timeout = setTimeout(delayedFunction, 2000); // 3000ms = 3 seconds

    // Clean up the timeout if the component unmounts before the delay
    return () => clearTimeout(timeout); // Cleanup interval on unmount
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);
  useEffect(() => {
    if (foundReceivedCashList.data && foundReceivedCashList.data.data) {
      setItems(foundReceivedCashList.data.data);
      setFilteredItems(foundReceivedCashList.data.data);
    }
  }, [foundReceivedCashList]);
  const user = JSON.parse(localStorage.getItem("userdata"));

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const names = row.name ? row.name.toLowerCase() : "";
      const empid = row.Employ_id ? row.Employ_id.toLowerCase() : "";
      const name_receiving_person = row.name_receiving_person
        ? row.name_receiving_person.toLowerCase()
        : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (names.includes(searchValue.toLowerCase()) ||
          name_receiving_person.includes(searchValue.toLowerCase()) ||
          empid.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
    setCurrentPage(1);
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
      <div className="container" style={{ maxWidth: "100%" }}>
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="">
              Details Related to Found/Received Cash
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
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
                filename="FoundReceivedCash_table"
                sheet="FoundReceivedCash_table"
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
          <table className="table" ref={tableRef}>
            <thead>
              <tr>
                <th rowSpan={2}>S_No</th>
                <th rowSpan={2} style={{ width: "200px" }}>
                  Date
                </th>
                <th rowSpan={2}>Time</th>
                <th rowSpan={2} style={{ width: "100px" }}>
                  Name of Person handing over cash
                </th>
                <th rowSpan={2}>Package / Purse</th>
                <th colSpan={4}>Description of Cash</th>

                <th rowSpan={2}>Any other Identifiable/unique e mark</th>
                <th rowSpan={2}>Place Cash Found</th>
                <th rowSpan={2}>Remark if any</th>
                <th rowSpan={2} style={{ width: "100px" }}>
                  Name and Sign of receiving Person
                </th>
                <th rowSpan={2} style={{ width: "150px" }}>
                  Sent to TPNR "Lost and Found Office" On
                </th>
                <th rowSpan={2}>Sign of SM/SC</th>
                <th rowSpan={2} style={{ width: "150px" }}>
                  Actions
                </th>
              </tr>
              <tr>
                <th>Denomination</th>
                <th>No.</th>
                <th></th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.name}</td>
                  <td>{item.package}</td>

                  <td className="nested">
                    <tr style={{ width: "100%" }}>
                      {" "}
                      {item?.descriptionCash?.[0]?.value} x&nbsp;
                    </tr>
                    <tr>{item?.descriptionCash?.[1]?.value} x&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[2]?.value} x&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[3]?.value} x&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[4]?.value} x&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[5]?.value} x&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[6]?.value} x&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[7]?.value} x&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[8]?.value} x&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[9]?.value} x&nbsp;</tr>
                    Grand Total :
                  </td>
                  <td className="nested">
                    <tr>{item?.descriptionCash?.[0]?.quantity}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[1]?.quantity}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[2]?.quantity}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[3]?.quantity}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[4]?.quantity}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[5]?.quantity}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[6]?.quantity}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[7]?.quantity}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[8]?.quantity}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[9]?.quantity}&nbsp;</tr>
                  </td>
                  <td className="nested">
                    <tr>=</tr>
                    <tr>=</tr>
                    <tr>=</tr>
                    <tr>=</tr>
                    <tr>=</tr>
                    <tr>=</tr>
                    <tr>=</tr>
                    <tr>=</tr>
                    <tr>=</tr>
                    <tr>=</tr>
                  </td>
                  <td className="nested">
                    <tr> {item?.descriptionCash?.[0]?.total}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[1]?.total}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[2]?.total}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[3]?.total}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[4]?.total}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[5]?.total}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[6]?.total}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[7]?.total}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[8]?.total}&nbsp;</tr>
                    <tr>{item?.descriptionCash?.[9]?.total}&nbsp;</tr>
                    {item?.descriptionCash?.[0]?.total +
                      item?.descriptionCash?.[1]?.total +
                      item?.descriptionCash?.[2]?.total +
                      item?.descriptionCash?.[3]?.total +
                      item?.descriptionCash?.[4]?.total +
                      item?.descriptionCash?.[5]?.total +
                      item?.descriptionCash?.[6]?.total +
                      item?.descriptionCash?.[7]?.total +
                      item?.descriptionCash?.[8]?.total +
                      item?.descriptionCash?.[9]?.total}
                  </td>
                  <td>{item.unique_mark}</td>
                  <td>{item.place_cash}</td>
                  <td>{item.remark}</td>
                  <td>{item.name_receiving_person}</td>
                  <td>{item.sent_toTPNR}</td>
                  <td>{item.signOfSC}</td>

                  <td className="">
                    {item.status === "0" || user?.role == "Admin" ? (
                      <div className="d-flex flex-column ">
                        <Link
                          to={`/edit/${slug}`}
                          state={{ id: item.id }}
                          className="btn btn-primary "
                        >
                          Edit
                        </Link>
                        <br />
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
        </div>{" "}
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

export default FoundReceivedCashList;
