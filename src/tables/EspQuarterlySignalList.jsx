import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";

import {
  fetchData,
  saveData,
} from "../reducer/ESPQuarterlyMaintananceSignalReducer";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function ESPQuarterlyList() {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("userdata"));
  const { toPDF, targetRef } = usePDF({ filename: "ESP-QuarterlyList.pdf" });

  const [fromDate, setFromdate] = useState(null);
  const [toDate, setTodate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  const add = useSelector((state) => state.espquarterlystate || []);

  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);

  const location = useLocation();
  const { id } = location.state;
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const itmm = add.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }

  useEffect(() => {
    if (add.data && add.data.data) {
      setItems(add.data.data);

      setFilteredItems(add.data.data);
    }
  }, [add]);

  const handleSave = (id) => {
    dispatch(saveData(id));
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 500)
  };

  const espquateractivity = [
    { activity: " ESP Functional Test" },
    { activity: " LED status" },
    { activity: " Condition of glass,hammer,chain" },
    // { activity: " ESP Functional Test" },
    // { activity: " LED status" },
    // { activity: " Condition of glass,hammer,chain" },
    // { activity: " ESP Functional Test" },
    // { activity: " LED status" },
    // { activity: " Condition of glass,hammer,chain" },
  ];

  return (
    <div className="container" style={{ maxWidth: "98%" }}>
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to={`/form/${slug}`}>
            ESP QUARTERLY MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <h3> ESP QUARTERLY MAINTENANCE RECORD </h3>
      <span className="line-box"></span>
      <div className="d-flex justify-content-between align-items-center">
        {/* <input
          type="search"
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Here."
        /> */}
        <div className="d-flex align-items-center gap-3 mt-3">
          <div className="d-flex gap-3">
            <Link to="">
              {/* <button className="btn btn-primary">
                                <FaFilter />
                            </button> */}
            </Link>
            <DownloadTableExcel
              filename="ESP-Quarterly-list_table"
              sheet="ESP-Quarterly-list_table"
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
        {filteredData?.map((item, indexsc) => (
          <div ref={tableRef} key={indexsc}>
            <>
              <table className="table">
                <thead
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#fff",
                  }}
                >
                  <tr>
                    <th className="text-start">Revision - 00</th>
                    <th colSpan={2}>O&M/SIGNAL/ LOG /ESP/10</th>
                  </tr>
                  <tr>
                    <th colSpan={3}>ESP QUARTERLY MAINTENANCE RECORD</th>
                  </tr>
                  <tr>
                    <th className="text-start">STATION : {item?.station}</th>
                    <th colSpan={2} className="text-start">
                      DATE : {item?.date}
                    </th>
                  </tr>
                  <tr>
                    <th rowSpan={2}>Details of Maintenance Activity</th>
                    <th colSpan={2}>
                      {item?.quarterly[0]?.range || "Range (Quarter)"}
                    </th>
                  </tr>
                  <tr>
                    <th>Name of ESP</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {espquateractivity.map((activities, index) => {
                    // Fetch the quarterly data based on index
                    const quarterlyData = item.quarterly[index];

                    // Initialize variables for each quarter date
                    const status = quarterlyData
                      ? quarterlyData.checked
                      : "N/A";

                    return (
                      <tr key={index}>
                        <td className="text-start">{activities.activity}</td>
                        <td>{quarterlyData ? quarterlyData.val : "N/A"}</td>
                        <td>{status}</td>
                      </tr>
                    );
                  })}

                  <tr>
                    <th className="text-start">Remarks</th>
                    <td className="text-start" colSpan={2}>
                      {item?.remarks}
                    </td>
                  </tr>

                  <tr>
                    <th className="text-start">Name, Designation & Emp. No.</th>
                    <td className="text-start" colSpan={2}>
                      {item?.name}, {item?.designation}, {item?.empno}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start">Counter Name</th>
                    <td className="text-start" colSpan={2}>
                      {item?.countersign}
                    </td>
                  </tr>
                </tbody>
                <tr>
                  <td className=" " colSpan={3}>
                    {item.status === "0" || user.role === "Admin" ? (
                      <div>
                        <Link
                          to={`/edit/${slug}`}
                          state={{ id: item.id }}
                          className="btn btn-primary align-content-center mx-3"
                          style={{ width: "120px", padding: "10px" }}
                        >
                          Edit
                        </Link>
                        <button
                          type="submit"
                          onClick={() => handleSave(item.id)}
                          style={{ width: "120px", padding: "10px" }}
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </table>
            </>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ESPQuarterlyList;
