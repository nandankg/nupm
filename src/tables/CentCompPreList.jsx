import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  addcentcomp,
  fetchData,
  saveData,
} from "../reducer/CentCompPreReducer";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { usePDF } from "react-to-pdf";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";

const CentCompPreventiveList = () => {
  const user = JSON.parse(localStorage.getItem("userdata"));
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({
    filename: "CentralComputer(yearly).pdf",
  });

  const [fromDate, setFromdate] = useState();
  const [toDate, setTodate] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  const addcentcomp = useSelector((state) => state.centcompstate || []);

  console.log(addcentcomp);
  const [items, setItems] = useState([]);
  console.log(addcentcomp.data.data);
  const [slug, setSlug] = useState("");
  console.log(slug);

  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const itmm = addcentcomp.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }

  useEffect(() => {
    if (addcentcomp.data && addcentcomp.data.data) {
      setItems(addcentcomp.data.data);
      setSlug(addcentcomp.slug);
      setFilteredItems(addcentcomp.data.data);
    }
  }, [addcentcomp]);

  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`/list/${slug}`);
  };

  const action = [
    {
      activity: "Visual Inspection",
      Description: "Checking of all Cable connection and dressing",
    },
    {
      activity: "Visual Inspection",
      Description: "Check internal fan status of Switches racks",
    },
    {
      activity: "Cleaning",
      Description: "External cleaning of equipments",
    },
    {
      activity: "Cleaning",
      Description: "External and internal cleaning of switch racks",
    },
    {
      activity: "Module Test",
      Description:
        "Check if Switches are working normal and all equipments are on LAN and sending data properly and check if supervision services ",
    },
    {
      activity: "Module Test",
      Description: "Check if Add Value Website is working ",
    },
  ];

  return (
    <>
      <div className="container">
        
        <h3> PREVENTIVE MAINTENANCE WORKSHEET OF CENTRAL COMPUTER(YEARLY) </h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between align-items-center">
      
          <div className="d-flex align-items-center gap-3 mt-3">
            <div className="d-flex gap-3">
              <DownloadTableExcel
                filename="CentralComputer(Yearly)_table"
                sheet="CentralComputer(Yearly)_table"
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
        <div ref={targetRef}>
          {filteredData?.map((item, index) => (
            <div ref={tableRef} key={index}>
              <table>
                <thead>
                  <tr>
                    <th className="text-center" colSpan={10}>
                      {" "}
                      PREVENTIVE MAINTENANCE WORKSHEET OF CENTRAL
                      COMPUTER(YEARLY)
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={2} rowSpan={2}>
                      Frequency
                    </th>
                    <td rowSpan={2}>Yearly</td>
                    <td colSpan={5} rowSpan={3}></td>
                    <td colSpan={2} className="text-start">
                      Annexure : C
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-start">
                      DOCUMENT: O&M/AFC/OCC/SDC/CH03
                    </td>
                  </tr>
                  <tr>
                    
                    <td colSpan={2}>{item?.date}</td>
                       
                    <td>{item?.staff1_sign}</td>
                    <td colSpan={2} className="text-start">
                      Ref:O&M/TELE-AFC/SOP/02
                    </td>
                  </tr>
                  <tr>
                    <th>Sr.No.</th>
                    <th>Activity</th>
                    <th style={{ width: "350px" }}>DESCRIPTION OF WORK</th>
                    <th style={{ width: "80px" }}>Isolator</th>
                    <th style={{ width: "80px" }}>UPS-EC</th>
                    <th style={{ width: "80px" }}>Server Rack-EC</th>
                    <th style={{ width: "80px" }}>CER-AFC Switch</th>
                    <th style={{ width: "150px" }}>REMARK</th>
                    <th style={{ width: "150px" }}>ACTION TAKEN</th>
                    <th style={{ width: "180px" }}>
                      WHY DEFICIENCY COULD NOT BE RECITIFIED
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item.activities.map((activity, index) => (
                    <>
                      <tr key={`row1-${index}`}>
                        <td>{index + 1}</td>
                        {index === 0 ? (
                          <td rowSpan={2}>Visual Inspection</td>
                        ) : (
                          ""
                        )}
                        {index === 2 ? <td rowSpan={2}>Cleaning</td> : ""}
                        {index === 4 ? (
                          <td rowSpan={2}>Module Testing</td>
                        ) : (
                          " "
                        )}

                        <td className="text-start">
                          {action[index].Description}
                        </td>
                        <td>{activity.SC1}</td>
                        <td>{activity.SC2}</td>
                        <td>{activity.SC3}</td>
                        <td>{activity.SC4}</td>
                        <td>{activity.remark}</td>
                        <td>{activity.action}</td>
                        <td>{activity.deficiency}</td>
                      </tr>
                    </>
                  ))}
                  <tr>
                    <th rowSpan={4} colSpan={3}>
                      STAFF DETAILS
                    </th>
                    <th className="text-center" colSpan={2}>
                      Name
                    </th>
                    <th className="text-center" colSpan={2}>
                      Designation
                    </th>
                    <th className="text-center" colSpan={2}>
                      Employee No.
                    </th>
                    
                  </tr>
                  <tr>
                    <td colSpan={3}>{item.staff1_name}</td>
                    <td colSpan={2}>{item.staff1_desg}</td>
                    <td colSpan={2}>{item.staff1_employee}</td>
                   
                  </tr>
                  <tr>
                    <td colSpan={3}>{item.staff2_name}</td>
                    <td colSpan={2}>{item.staff2_desg}</td>
                    <td colSpan={2}>{item.staff2_employee}</td>
            
                  </tr>
                  <tr>
                    <td colSpan={3}>{item.staff3_name}</td>
                    <td colSpan={2}>{item.staff3_desg}</td>
                    <td colSpan={2}>{item.staff3_employee}</td>
                    
                  </tr>
                </tbody>
                <tr>
                  <td className=" " colSpan={13}>
                    {item.status === "0" || user.role === "Admin" ? (
                      <div>
                        <Link
                          to={`/edit/${slug}`}
                          state={{ id: item.id }}
                          style={{ width: "120px", padding: "10px" }}
                          className="btn btn-primary align-content-center mx-3 "
                        >
                          Edit
                        </Link>
                        <button
                          type="submit"
                          onClick={() => {
                            handleSave(item.id);
                          }}
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CentCompPreventiveList;
