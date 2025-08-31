import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { fetchData, saveData } from "../../reducer/monika/DailycheckReducer";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { setSelectedId } from "../../reducer/RedirectReducer";
import { RiFileExcel2Fill } from "react-icons/ri";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLocation, useNavigate } from "react-router-dom";

const DailycheckRegisterList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "DailycheckRegisterList.pdf",
  });

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");
  const user = JSON.parse(localStorage.getItem("userdata"));
  const DailycheckRegisterList = useSelector((state) => state.Dailycheck);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const itmm = DailycheckRegisterList.data.data;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (DailycheckRegisterList.data && DailycheckRegisterList.data.data) {
      setItems(DailycheckRegisterList.data.data);
      setSlug(DailycheckRegisterList.slug);
      setFilteredItems(DailycheckRegisterList.data.data);
    }
  }, [DailycheckRegisterList]);
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
      const empId = row.empId ? row.empId.toLowerCase() : "";

      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (station.includes(searchValue.toLowerCase()) ||
          id.includes(searchValue.toLowerCase()) ||
          empId.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setFilteredItems(newData);
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
  const goToEdit = (id) => {
    dispatch(setSelectedId(id)); // Save ID in Redux
    navigate(`/edit/${slug}`);
  };
  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Daily Check Register List
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      {/* <h3> Daily Check Register List</h3>
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
              filename="DailycheckRegisterList_table"
              sheet="DailycheckRegisterList_table"
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
      {filteredData.map((item, index) => (
        <>
          <div ref={targetRef}>
            <h2>Daily Check Register</h2>
            <table ref={tableRef} style={{ textAlign: "left", width: "100%" }}>
              <thead>
                <tr>
                  <th rowspan="2">SYSTEM</th>
                  <th rowspan="2">S.No</th>
                  <th rowspan="2">JOB DETAILS</th>
                  <th> MORNING TIME <br/>{item.morningtime}</th>
                  <th> EVENING TIME<br/>{item.eveningtime}</th>
                </tr>
                <tr>
                  <th>Status</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <td
                   
                    style={{ writingMode: "vertical-lr", textAlign: "center" }}
                  >
                  
                  </td>
                  <td className="text-start"></td>
                  <td className="text-start">
                  DATE : {item.date}
                  </td>
                  <td className="text-start"></td>
                  <td className="text-start"></td>
                </tr>
                <tr>
                  <td
                    rowspan="24"
                    style={{ writingMode: "vertical-lr", textAlign: "center" }}
                  >
                    CC-CCHS
                  </td>
                  <td className="text-start">1</td>
                  <td className="text-start">
                    Check Health status of all server and storage
                  </td>
                  <td className="text-start">{item.job1_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job1_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">2</td>
                  <td className="text-start">
                    Check LED indication of Storage drive and networking
                    equipments
                  </td>
                  <td className="text-start">{item.job2_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job2_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">3</td>
                  <td className="text-start">
                    Check master clock LED status on NTP servers
                  </td>
                  <td className="text-start">{item.job3_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job3_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">4</td>
                  <td className="text-start">
                    Check any pending or failed transaction files of previous
                    day & current day in CC
                  </td>
                  <td className="text-start">{item.job4_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job4_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">5</td>
                  <td className="text-start">
                    Check if excessive heat accumulated inside all Rack
                  </td>
                  <td className="text-start">{item.job5_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job5_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">6</td>
                  <td className="text-start">
                    Check if any abnormal sound coming from OCC equipment and
                    racks
                  </td>
                  <td className="text-start">{item.job6_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job6_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">7</td>
                  <td className="text-start">
                    Check LAN status of all station and OCC equipment.
                  </td>
                  <td className="text-start">{item.job7_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job7_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                {/* <tr>
                  <td className="text-start">8</td>
                  <td className="text-start">
                    Check Services AVW windows service on web Server-2 (WEB-1 it
                    should be OFF and WEB-2 it should be ON) in CC
                  </td>
                  <td className="text-start">{item.job8_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job8_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr> */}
                <tr>
                  <td className="text-start">8</td>
                  <td className="text-start">
                    Check if web top up website are working
                  </td>
                  <td className="text-start">{item.job8_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job8_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">9</td>
                  <td className="text-start">
                    Check device communication of Individual devices and SC
                    (i.e. each devices should send data to CC)
                  </td>
                  <td className="text-start">{item.job9_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job9_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">10</td>
                  <td className="text-start">
                    Check CC and CCHS backups (veritas application)
                  </td>
                  <td className="text-start">{item.job10_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job10_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">11</td>
                  <td className="text-start">Check NMS status (Ops manager)</td>
                  <td className="text-start">{item.job11_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job11_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">12</td>
                  <td className="text-start">
                    Check tracing of all Ring of CC
                  </td>
                  <td className="text-start">{item.job12_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job12_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">13</td>
                  <td className="text-start">
                    Check APP and DB cluster status of CC & CCHS
                  </td>
                  <td className="text-start">{item.job13_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job13_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">14</td>
                  <td className="text-start">
                    Check CCHS services (Watcher, transaction, EOD & Security
                    Service)
                  </td>
                  <td className="text-start">{item.job14_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job14_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">15</td>
                  <td className="text-start">
                    Check EOD module (settlement date should be of previous day)
                    in CCHS
                  </td>
                  <td className="text-start">{item.job15_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job15_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">16</td>
                  <td className="text-start">
                    Check any pending or failed XDR/XML files of previous day
                    and current day in CCHS
                  </td>
                  <td className="text-start">{item.job16_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job16_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">17</td>
                  <td className="text-start">
                    Check FTP and Backup folder transaction file status in CCHS
                  </td>
                  <td className="text-start">{item.job17_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job17_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">18</td>
                  <td className="text-start">
                    Check redundancy of Application & DB server of CC and CCHS
                    (Bi-weekly)
                  </td>
                  <td className="text-start">{item.job18_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job18_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">19</td>
                  <td className="text-start">
                    Check shared storage of backup, application and DB server
                    (Every Saturday)
                  </td>
                  <td className="text-start">{item.job19_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job19_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">20</td>
                  <td className="text-start">
                    Check CC and CCHS housekeeping (Every Saturday)
                  </td>
                  <td className="text-start">{item.job20_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job20_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">21</td>
                  <td className="text-start">
                    Checking of SC backup (Every Saturday)
                  </td>
                  <td className="text-start">{item.job21_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job21_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">22</td>
                  <td className="text-start">
                    Checking of Space/memory availability in SC (Every Saturday)
                  </td>
                  <td className="text-start">{item.job22_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job22_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">23</td>
                  <td className="text-start">
                    Checking of output data cleaner job on SC (Every Saturday)
                  </td>
                  <td className="text-start">{item.job23_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job23_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">24</td>
                  <td className="text-start">
                    Check antivirus update (Bi-weekly)
                  </td>
                  <td className="text-start">{item.job24_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job24_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">GATE</td>
                  <td className="text-start">25</td>
                  <td className="text-start">Serviceability of GATE</td>
                  <td className="text-start">{item.job25_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job25_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">TOM/EFO</td>
                  <td className="text-start">26</td>
                  <td className="text-start">Serviceability of TOM/EFO</td>
                  <td className="text-start">{item.job26_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job26_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">SC</td>
                  <td className="text-start">27</td>
                  <td className="text-start">Serviceability of SC</td>
                  <td className="text-start">{item.job27_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job27_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">AVM</td>
                  <td className="text-start">28</td>
                  <td className="text-start">Serviceability of AVM</td>
                  <td className="text-start">{item.job28_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job28_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">TVM</td>
                  <td className="text-start">29</td>
                  <td className="text-start">Serviceability of TVM</td>
                  <td className="text-start">{item.job29_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job29_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">RCTM</td>
                  <td className="text-start">30</td>
                  <td className="text-start">Serviceability of RCTM</td>
                  <td className="text-start">{item.job30_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job30_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start"></td>
                  <td className="text-start">32</td>
                  <td className="text-start">Check Blacklist and greenlist (every saturady)</td>
                  <td className="text-start">{item.job31_morningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                  <td className="text-start">{item.job31_eveningstatus=== 'yes' ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td className="text-start">SERVER ROOM</td>
                  <td className="text-start">33</td>
                  <td className="text-start">Room Temp.</td>
                  <td className="text-start">{item.server_Temp_morning}</td>
                  <td className="text-start">{item.server_Temp_evening}</td>
                </tr>
                <tr>
                  <td className="text-start">Remark</td>
                  <td className="text-start">34</td>
                  <td className="text-start" colSpan="3">
                    {item.remarks}
                  </td>
                </tr>

                <tr>
                  <th colSpan={2}>Staff details</th>
                  <th colspan={1}>Morning</th>
                  <th colspan={2}>Evening</th>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    Name
                  </td>
                  <td className="text-start" colspan={1}>
                    {item.name_morning}
                  </td>
                  <td className="text-start" colspan={2}>
                    {item.name_evening}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan={2}>
                    Emp No
                  </td>
                  <td className="text-start" colspan={1}>
                    {item.emp_no_morning}
                  </td>
                  <td className="text-start" colspan={2}>
                    {item.emp_no_evening}
                  </td>
                </tr>
                <tr>
                  {/* <td className="text-start" colSpan={2}>
                    Sign
                  </td> */}
                  {/* <td className="text-start" colspan={1}>
                    {item.sign_morning}
                  </td> */}
                  {/* <td className="text-start" colspan={2}>
                    {item.sign_evening}
                  </td> */}
                </tr>
              </tbody>
            </table>
          </div>
          <td className="">
            {item.status === "0" || user?.role == "Admin" ? (
              <div className="d-flex gap-3">
                <button
                  className="btn btn-success"
                  onClick={() => goToEdit(item.id)}
                >
                  Edit
                </button>

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
        </>
      ))}
    </div>
  );
};

export default DailycheckRegisterList;
