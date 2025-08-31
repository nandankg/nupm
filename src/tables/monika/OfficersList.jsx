import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { fetchData, saveData } from "../../reducer/monika/OfficerReducer";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";

import { RiFileExcel2Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const OfficersLists = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "OfficersList.pdf" });

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");
  const user = JSON.parse(localStorage.getItem("userdata"));

  console.log(slug);

  const OfficersList = useSelector((state) => state.Officers);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const itmm = OfficersList.data.data;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (OfficersList.data && OfficersList.data.data) {
      setItems(OfficersList.data.data);
      setSlug(OfficersList.slug);
      setFilteredItems(OfficersList.data.data);
    }
  }, [OfficersList]);
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }

  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);

  const handleFilter = () => {
    const newData = items.filter((row) => {
      const station = row.station ? row.station.toLowerCase() : "";
      const esc_no = row.esc_no ? row.esc_no.toLowerCase() : "";
      const remarks = row.remarks ? row.remarks.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (station.includes(searchValue.toLowerCase()) ||
          esc_no.includes(searchValue.toLowerCase()) ||
          remarks.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };

  console.log(OfficersList);
  // useEffect(() => {
  //   // Initialize items from local storage
  //   const storedItems = JSON.parse(localStorage.getItem("OfficersList")) || [];
  //   if (storedItems.length > 0) {
  //     console.log("Initializing from local storage:", storedItems);
  //     dispatch(addOfficers(storedItems));
  //   }
  // }, [dispatch]);
  // useEffect(() => {
  //   // Initialize items from local storage
  //   const storedItems = JSON.parse(localStorage.getItem("OfficersList")) || [];
  //   if (storedItems.length > 0) {
  //     console.log("Initializing from local storage:", storedItems);
  //     dispatch(addOfficers(storedItems));
  //   }
  // }, []);

  // useEffect(() => {
  //   // Sync local storage with Redux store
  //   console.log("Updating local storage:", OfficersList);
  //   if (OfficersList?.length > 0) {
  //     localStorage.setItem("OfficersList", JSON.stringify(OfficersList));
  //   }
  // }, [OfficersList]);

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Location: Officers Colony
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        {/* <h3>Location: Officers Colony</h3>
        <span className="line-box"></span> */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-3">
              <Link to="">
                {/* <button className="btn btn-primary">
              <FaFilter />
            </button> */}
              </Link>
              <DownloadTableExcel
                filename="OfficersList_table"
                sheet="OfficersList_table"
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
 <div className="container mx-auto p-4" ref={targetRef}>
      <h2 className="text-2xl font-bold mb-4">Officers Telecom Checklist</h2>
      {filteredData.map((record, recordIndex) => (
        <div key={record.form_id} className="mb-8">
          <table
            className="table table-bordered table-striped w-full bg-white shadow rounded"
            aria-label="Officers Telecom Checklist Table" ref={tableRef}
          >
            <thead className="bg-gray-50">
			<tr>
			<th>Form Id</th> <th>{record.form_id}</th><th>Date</th><th>{formatDate(record.date)}</th><th></th>
			
			</tr>
              <tr>
               
                <th scope="col" className="px-4 py-2">S.No.</th>
                <th scope="col" className="px-4 py-2">System</th>
                <th scope="col" className="px-4 py-2">Activity</th>
                <th scope="col" className="px-4 py-2">Status</th>
                <th scope="col" className="px-4 py-2">Remark</th>
              </tr>
            
            </thead>
            <tbody>
              {record.systems.flatMap((system, systemIndex) =>
                system.activities.map((activity, activityIndex) => {
                  const isFirstActivity = activityIndex === 0;
                  const globalIndex =
                    record.systems
                      .slice(0, systemIndex)
                      .reduce((sum, s) => sum + s.activities.length, 0) +
                    activityIndex;
                  return (
                    <tr key={`${record.form_id}-${system.id}-${activity.id}`}>
                      <td className="px-4 py-2">{globalIndex + 1}</td>
                      {isFirstActivity && (
                        <td
                          className="px-4 py-2"
                          rowSpan={system.activities.length}
                        >
                          {system.name}
                        </td>
                      )}
                      <td className="px-4 py-2">{activity.label}</td>
                      <td className="px-4 py-2">
                        {activity.checked === "yes" ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2">{activity.remark || "-"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="2" className="px-4 py-2 font-bold">
                  Staff Name:
                </td>
                <td colSpan="5" className="px-4 py-2">
                  {record.staffname || "-"}
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="px-4 py-2 font-bold">
                  Final Remark:
                </td>
                <td colSpan="5" className="px-4 py-2">
                  {record.remarks || "-"}
                </td>
              </tr>
			  <tr><td className=" ">
                {record.status === "0" || user?.role == "Admin" ? (
                  <div className="d-flex gap-2">
                    <Link
                      to={`/edit/${slug}`}
                      state={{ id: record.id }}
                      className="btn btn-primary align-content-center"
                    >
                      Edit
                    </Link>
                    <button
                      type="submit"
                      onClick={() => {
                        handleSave(record.id);
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
            </tfoot>
          </table>
        </div>
      ))}
    </div>
      </div>
    </>
  );
};

export default OfficersLists;
