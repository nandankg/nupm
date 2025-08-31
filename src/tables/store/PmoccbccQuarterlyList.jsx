import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { fetchData, saveData } from "../../reducer/redux/tableDataSlice";
import { Key } from "@mui/icons-material";
import { Input } from "@mui/material";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function PmoccbccQuarterlyList() {
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
    const [filteredItems, setFilteredItems] = useState([]);
  
    const itmm = mjl11List.data.data;
    let filteredData;
  
    if (itmm) {
      filteredData = itmm.filter((itm) => {
        return itm.id === id;
      });
     
    }
    useEffect(() => {
    filteredData[0].systems.map((fd,idx)=>{
     console.log(fd.activities);
    });
},[filteredData])
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

    return (
        <div className="container" style={{ maxWidth: "98%" }}>
          <div role="presentation" className="bredcrumbs">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit">
                PM OCC BCC Quetryly
              </Link>
              <Link underline="hover" color="inherit">
                View
              </Link>
            </Breadcrumbs>
          </div>
    
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex gap-3">
                <Link to="">
                  {/* <button className="btn btn-primary">
                    <FaFilter />
                  </button> */}
                </Link>
                <DownloadTableExcel
                  filename="PMMJ_table"
                  sheet="PMMJ_table"
                  currentTableRef={tableRef.current}
                >
                  <button className="btn" style={{ border: "1px solid #0baa9a " }}>
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
            
             
                <>
                <h5>PM OCC BCC Quetryly</h5>
                <table className="table">
                  <tr><td colSpan={2}>Date : {filteredData[0].date}</td><td colSpan={2}>Location :{filteredData[0].location} </td></tr>
                    <tr>
                        <td>
                            System
                        </td>
                        <td>Activity</td>
                        <td></td>
                        <td>Remark</td>
                    </tr>
                    {filteredData[0].systems.map((system,idx)=>(
                    <>
                    <tr>
<td rowSpan={system.activities.length+1}>{system.system}</td>
<td></td>
<td></td>
<td></td>
                    </tr>
                  {   system.activities.map((activity, activityIndex) => 
                      
                         
                     
                        <tr>

                        <td>{activity.activity}<br/>
                          {activity.hmiEmergency?(<><span>HMI Emergency : </span><input value={activity.hmiEmergency} style={{width:55}}/></>):("")}
                          {activity.hmiNormal?(<><span>HMI Normal : </span><input value={activity.hmiNormal} style={{width:55}}/></>):("")}
                          {activity.voltage?(<><span>Voltage : </span><input value={activity.voltage} style={{width:55}}/></>):("")}
                          {activity.bvms1?(<><span>bvms1 : CPU : </span><input value={activity.bvms1.cpu} style={{width:55}}/>RAM :<input value={activity.bvms1.ram} style={{width:55}}/></>):("")}
                          {activity.bvms1?(<><span>bvms2 : CPU : </span><input value={activity.bvms2.cpu} style={{width:55}}/>RAM :<input value={activity.bvms2.ram} style={{width:55}}/></>):("")}<br/>
                          {activity.clstr?(<><span>clstr : CPU : </span><input value={activity.clstr.cpu} style={{width:55}}/>RAM :<input value={activity.clstr.ram} style={{width:55}}/></>):("")}
                          {activity.entz?(<><span>entz : CPU : </span><input value={activity.entz.cpu} style={{width:55}}/>RAM :<input value={activity.entz.ram} style={{width:55}}/></>):("")}
                        </td>
                            <td></td>
                            <td>{activity.remarks}</td>
                        </tr>
                      
                       
                        )}
 </>
                        ))}
                       
                 <tr>
                  <td>Supervisor Name
                  </td><td>{filteredData[0].supervisor
.name}</td>
                  <td>Supervisor Emp ID
                  </td><td>{filteredData[0].supervisor
.empId}</td>
                 </tr>
                 <tr>
                  <td>Maintainer
                  Name
                  </td><td>{filteredData[0].maintainer

.name}</td>
                  <td>Maintainer Emp ID
                  </td><td>{filteredData[0].maintainer

.empId}</td>
                 </tr>
                </table>
                </>
              
                               {filteredData[0].status === "0" || user?.role == "Admin" ? (
                                 <div className="d-flex ">
                                   <Link
                                     to={`/edit/${slug}`}
                                     state={{ id:filteredData[0].id }}
                                     className="btn btn-primary align-content-center mx-3"
                                   >
                                     Edit
                                   </Link>
                                   <button
                                     className="btn btn-success"
                                     onClick={() => {
                                       handleSave(filteredData[0].id);
                                     }}
                                   >
                                     Submit
                                   </button>
                                 </div>
                               ) : (
                                 ""
                               )}
                            
                       
                     </div>  
           
            </div>
            
    )

}
export default PmoccbccQuarterlyList;