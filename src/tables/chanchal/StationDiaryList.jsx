import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  addStationDiary,
  fetchData,
  saveData,
} from "../../reducer/chanchal/StationDiaryReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaFilePdf } from "react-icons/fa6";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const StationDiaryList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "StationDiaryList.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const StationDiaryList = useSelector((state) => state.stationDiary);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const itmm = StationDiaryList.data.data;
  // const user = { role: "Admin" }; // Mock user object

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  let filteredItems;

  if (itmm) {
    filteredItems = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredItems);
  }
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`/list/${slug}`);
  };

  const shiftactivity = [
    { activity: "Checking of all Signalling sub-system as per check list" },
    {
      activity:
        "Availability of Tools,Test Equipments, Peripherals, Application Drawings and Manuals as per list. (Remarks for deficiency, if any to initiate Replenishment for the same)",
    },
    { activity: "Checking of SER Temperature & Humidity Reading" },
    {
      activity:
        "Checking of spares available as per List.(Remarks for deficiency, if any to initiate Replenishment for the same)",
    },
    {
      activity:
        "Checking of Signalling Equipment installed in SCR (LATS/VDU/LRB/ESP/EKT etc.)",
    },
    { activity: "Faulty AC in SER" },
    { activity: "Availability of Consumable Items" },
    { activity: "Point Operation from VDU/LATS" },
    { activity: "Error Code, Variables & Logs on SDM" },
    { activity: "CLC Changeover" },
    { activity: "Shift Preventive/ Corrective maintenance details" },
    { activity: "Gang Member List" },
    { activity: "Remark" },
  ];

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/form/station-diary-signalling"
            >
              STATION DIARY (SIGNALLING)
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> STATION DIARY (SIGNALLING) </h3>
        <span className="line-box"></span>

        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="StationDiary_table"
            sheet="StationDiary_table"
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

        <div ref={targetRef}>
          {filteredItems?.map((data) => {
            return (
              <div key={data.id}>
                {/* // <div ref={tableRef} key={indexsc}>
                        //     <div style={{ overflow: "scroll", height: "70vh" }}> */}
                <table className="table" ref={tableRef}>
                  <thead
                    style={{
                      position: "sticky",
                      top: "0",
                      backgroundColor: "#fff",
                    }}
                  >
                    <tr>
                      <th className="text-start" colSpan="1">
                        Station: {data?.Station}{" "}
                      </th>
                      <th className="text-start" colSpan="3">
                        IXL Zone: {data?.Zone}{" "}
                      </th>
                      <th className="text-start" colSpan="3">
                        Date: {data?.date}
                      </th>
                    </tr>
                    <tr>
                      <th rowSpan="2">Activity </th>
                      <th colSpan="6">Shift: {data?.range} </th>
                    </tr>
                    <tr>
                      <th colSpan={2}>Status </th>
                      <th colSpan={2}>Check </th>
                      <th colSpan={2}>Remarks </th>
                    </tr>
                  </thead>

                  <tbody>
                    {shiftactivity.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-start">
                            <b> {item.activity} </b>
                          </td>
                          <td colSpan={2}>
                            {data?.shift && data.shift[index]
                              ? data.shift[index].val
                              : "N/A"}
                          </td>
                          <td colSpan={2}>
                            {data?.shift && data.shift[index]
                              ? data.shift[index].checked
                              : "N/A"}
                          </td>
                          <td colSpan={2}>
                            {data?.shift && data.shift[index]
                              ? data.shift[index].Remarks
                              : "N/A"}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="fw-bold">
                      <th colSpan={1}> </th>
                      <td colSpan={3} className="text-start">
                        Charge Taken Over By
                      </td>
                      <td colSpan={3} className="text-start">
                        {" "}
                        Charge Handed Over By
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Name:</td>
                      <td colSpan={3}>{data.A_Ntaken}</td>
                      <td colSpan={3}>{data.A_Nhanded}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Employee No:</td>
                      <td colSpan={3}>{data.A_Etaken}</td>
                      <td colSpan={3}>{data.A_Ehanded}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Designation:</td>
                      <td colSpan={3}>{data.A_Dtaken}</td>
                      <td colSpan={3}>{data.A_Dhanded}</td>
                    </tr>
                    {/* <tr>
                      <td className="fw-bold">Sign:</td>
                      <td colSpan={3}>{data.A_Staken}</td>
                      <td colSpan={3}>{data.A_Shanded}</td>
                    </tr> */}
                  </tbody>
                </table>

                <td className=" mb-3">
                  {data.status === "0" || user.role === "Admin" ? (
                    <div>
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: data.id }}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        onClick={() => {
                          handleSave(data.id);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StationDiaryList;
