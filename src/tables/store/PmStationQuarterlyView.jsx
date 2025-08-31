

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
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import PDFExportComponent from "../../component/PDFExportComponent";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function PmStationQuarterlyView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = location.state;
   
  const mjl11List = useSelector((state) => state.data);
    const [slug, setSlug] = useState(getLastParameter().trim());
    const user = JSON.parse(localStorage.getItem("userdata"));
  
  
   
    const { toPDF, targetRef } = usePDF({
      filename:
        "pm-occ-bcc-quarterly.pdf",
    });
  
    const [items, setItems] = useState([]);
    const [item, setItem] = useState([]);
    const tableRef = useRef(null);
    const [filteredItems, setFilteredItems] = useState([]);
    console.log(item)
    useEffect(() => {
      dispatch(fetchData({ formType: slug }));
    }, [dispatch]);
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
    <Container className="py-4">
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
      <Typography variant="h4" align="center" className="mb-4">
        QUARTERLY MAINTENANCE SCHEDULE DISPLAY
      </Typography>
      <Typography variant="subtitle1" align="center" className="mb-4">
        DOC: Annexure-III, Version: 1.0 | DOCUMENT_NO: 08/M/Tele/CHO2
      </Typography>

      {data.map((record, index) => (
        <div key={index} className="mb-5">
          <Paper elevation={3} className="p-3">
            <div className="row mb-3">
              <div className="col-md-4">
                <strong>Station:</strong> {record.station || 'N/A'}
              </div>
              <div className="col-md-4">
                <strong>Date:</strong> {record.date || 'N/A'}
              </div>
              <div className="col-md-4">
                <strong>DOC:</strong> Annexure-III, Version: 1.0
              </div>
            </div>

            <TableContainer component={Paper} className="table-responsive">
              <Table className="table table-striped table-hover">
                <TableHead>
                  <TableRow>
                    <TableCell className="bg-primary text-white">System</TableCell>
                    <TableCell className="bg-primary text-white">Activity</TableCell>
                    <TableCell className="bg-primary text-white">Done</TableCell>
                    <TableCell className="bg-primary text-white">Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {record.systems.map((system, systemIndex) =>
                    system.activities.map((activity, activityIndex) => (
                      <TableRow key={`${systemIndex}-${activityIndex}`}>
                        <TableCell>{activityIndex === 0 ? system.name : ''}</TableCell>
                        <TableCell>{activity.label}</TableCell>
                        <TableCell>{activity.done ? 'Yes' : 'No'}</TableCell>
                        <TableCell>
                          {activity.hmiNormal && <span>HMI Normal: {activity.hmiNormal}<br /></span>}
                          {activity.hmiEmergency && <span>HMI Emergency: {activity.hmiEmergency}<br /></span>}
                          {activity.cpu && <span>CPU: {activity.cpu}<br /></span>}
                          {activity.ram && <span>RAM: {activity.ram}<br /></span>}
                          {activity.voltage && <span>Voltage: {activity.voltage}<br /></span>}
                          {activity.remark && <span>Remark: {activity.remark}</span>}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <div className="mt-3">
              <strong>Notes:</strong> {record.notes || 'N/A'}
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <strong>Supervisor:</strong><br />
                Name: {record.SName || 'N/A'}<br />
                Emp ID: {record.SempId|| 'N/A'}<br />
                
                Date & Time: {record.SdateTime || 'N/A'}
              </div>
              <div className="col-md-6">
                <strong>Maintainer:</strong><br />
                Name: {record.MName || 'N/A'}<br />
                Emp ID: {record.MempId || 'N/A'}<br />
               
                Date & Time: {record.MdateTime || 'N/A'}
              </div>
            </div>
          </Paper>
        </div>
      ))}
      </div>
       <tr>
                                      <td className=" " colSpan={5}>
                                        {data[0].status === "0" || user.role === "Admin" ? (
                                          <div className="d-flex gap-2 align-items-center">
                                            <Link
                                              to={`/edit/pm-station-quarterly`}
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
          
    </Container>  );
};



export default PmStationQuarterlyView;
