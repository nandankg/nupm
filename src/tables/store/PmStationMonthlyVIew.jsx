

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { fetchData, saveData } from "../../reducer/redux/tableDataSlice";
import { Key } from "@mui/icons-material";
import { Input } from "@mui/material";
import PDFExportComponent from "../../component/PDFExportComponent";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function PmStationMonthlyVIew() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = location.state;
  
  const mjl11List = useSelector((state) => state.data);
    const [slug, setSlug] = useState(getLastParameter().trim());
    const user = JSON.parse(localStorage.getItem("userdata"));
  
 
    const tableRef = useRef(null);
    const { toPDF, targetRef } = usePDF({
      filename:
        "pm-occ-bcc-quarterly.pdf",
    });
  
    const [items, setItems] = useState([]);
    const [item, setItem] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    console.log(item)
    
    const itmm = mjl11List.data.data;
    let filteredData;
    
    if (itmm) {
      filteredData = itmm.filter((itm) => {
        return itm.id === id;
      });
     console.log(filteredData)
     
    }

    
  
    useEffect(() => {
      if (mjl11List.data && mjl11List.data.data) {
        setItems(mjl11List.data.data);
        setFilteredItems(mjl11List.data.data);
      }
    }, [mjl11List]);
  
    const handleSave = (id) => {
      dispatch(saveData(id));
      navigate(`list/${slug}`);
    };
    return <MaintenanceTable data={filteredData} />;
}
const MaintenanceTable = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slug, setSlug] = useState(getLastParameter().trim());
    const user = JSON.parse(localStorage.getItem("userdata"));
    const handleSave = (id) => {
      dispatch(saveData(id));
      navigate(`list/${slug}`);
    };
  return (
    <div className="container mt-4">
      <div className="d-flex gap-3">
              <DownloadTableExcel
                filename="pmdepotmonthly_table"
                sheet="pmdepotmonthly_table"
                
              >
                <button
                  className="btn"
                  style={{ border: "1px solid #0baa9a " }}
                >
                  <RiFileExcel2Fill color="#0baa9a " size={25} />
                </button>
              </DownloadTableExcel>

              <PDFExportComponent
                contentId="section-to-export"
                filename="PMSheetQuaterly.pdf"
              />
            </div>
          <div id="section-to-export">
      <h2 className="mb-3">Pm Station Monthly Data </h2>
      <div  className="mb-4">
          <h4 className=" text-dark p-2" style={{backgroundColor:"00a896"}}></h4>
          <table className="table table-bordered table-striped">
            <thead className="table-light">
            <tr>
                    <th colSpan={3} style={{ textAlign: "left" }}>
                      Station:
                      {data[0].station}
                    </th>
                    <th colSpan={3} style={{ textAlign: "left" }}>
                      Date:
                      {data[0].date}
                    </th>
                  </tr>
                  </thead>
                  </table>
                  </div>
      {data[0].systems.map((system) => (
        <div key={system.id} className="mb-4">
          <h4 className=" text-dark p-2" style={{backgroundColor:"00a896"}}>{system.name}</h4>
          <table className="table table-bordered table-striped">
            <thead className="table-light">
            
              <tr>
                <th>#</th>
                <th>Activity</th>
                <th>Sub-Items</th>
                <th>Checked</th>
                <th>Remarks</th>
                
              </tr>
            </thead>
            <tbody>
              {system.activities.map((activity, index) => (
                <tr key={activity.id}>
                  <td>{index + 1}</td>
                  <td>{activity.label}</td>
                  <td>
                    {activity.sub && (
                      <ul>
                        {activity.sub.map((subItem) => (
                          <li key={subItem}>
                            {subItem}: {activity.subCheckboxes[subItem] ? "✔" : "✖"}
                          </li>
                        ))}
                      </ul>
                    )}
                    {activity.subInput && (
                      <ul>
                        {activity.subInput.map((inputKey) => (
                          <li key={inputKey}>
                            {inputKey}: {activity.subInputValues[inputKey] || "N/A"}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td>{activity.checked === "yes" ? "✔" : "✖"}</td>
                  <td>{activity.remark || "N/A"}</td>
                 
                </tr>
              ))}
               
            </tbody>
          </table>
        </div>
      ))}
      </div>
      <tr>
                                <td className=" " colSpan={5}>
                                  {data[0].status === "0" || user.role === "Admin" ? (
                                    <div className="d-flex gap-2 align-items-center">
                                      <Link
                                        to={`/edit/pm-station-monthly`}
                                        state={{ id: data[0].id }}
                                        className="btn align-content-center"
                                        style={{
                                          width: "100px",
                                          height: "50px",
                                          textAlign: "center",
                                          backgroundColor: "#f4d03f",
                                          color: "black",
                                          fontSize: "20px",
                                        }}
                                      >
                                        Edit
                                      </Link>
                                      <button
                                        type="submit"
                                        onClick={() => {
                                          handleSave(data[0].id);
                                        }}
                                        className="btn btn-primary"
                                        style={{
                                          width: "100px",
                                          height: "50px",
                                          textAlign: "center",
                                          fontSize: "18px",
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
    </div>
  );
};



export default PmStationMonthlyVIew;
