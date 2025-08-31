import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Typography,
    Grid,
  } from "@mui/material";
  
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
function PmDepotQuarterlyView() {
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
    const PAGE_SIZE = 36;
    const [currentPage, setCurrentPage] = useState(1);
    const rows = filteredData[0].rows;
    const totalCells = rows.reduce((sum, row) => sum + row.cellNo.length, 0);
    const totalPages = Math.ceil(totalCells / PAGE_SIZE);
  
    const flattenedData = rows.flatMap(row =>
      row.cellNo.map((_, idx) => ({
        cellNo: row.cellNo[idx] || "-",
        onFloatVoltage: row.onFloatVoltage[idx] || "-",
        initialReadingOnLoad: row.initialReadingOnLoad[idx] || "-",
        after1Point5Hours: row.after1Point5Hours[idx] || "-",
      }))
    );
  
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    const paginatedData = flattenedData.slice(startIdx, endIdx);
    return (
      <div className="container mt-4">
     
      <h5>Additional Data</h5>
      <table className="table table-bordered">
        <tbody>
          <tr><th>Station :{filteredData[0].station} </th><th>Date : {filteredData[0].date}</th></tr>
          {Object.entries(filteredData[0].additionalData).map(
            ([key, value]) => (
              <tr key={key}>
                <td className="fw-bold">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </td>
                <td>
                  {typeof value === "object" ? JSON.stringify(value) : value}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <h5 className="mt-3">Battery Data</h5>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {[...Array(3)].map((_, index) => (
              <>
                <th>Cell No</th>
                <th>On Float Voltage</th>
                <th>Initial Reading On Load</th>
                <th>After 1.5 Hours</th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(PAGE_SIZE / 3) }, (_, rowIdx) => {
            const rowStart = rowIdx * 3;
            return (
              <tr key={rowIdx}>
                {Array.from({ length: 3 }, (_, colIdx) => {
                  const idx = rowStart + colIdx;
                  return idx < paginatedData.length ? (
                    <>
                      <td>{idx+1+(currentPage-1)*36}</td>
                      <td>{paginatedData[idx].onFloatVoltage}</td>
                      <td>{paginatedData[idx].initialReadingOnLoad}</td>
                      <td>{paginatedData[idx].after1Point5Hours}</td>
                    </>
                  ) : (
                    <>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      <td className="d-flex gap-3 mt-3 justify-content-end">
                  {filteredData[0].status === "0" || user?.role == "Admin" ? (
                    <div className="d-flex ">
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: filteredData[0].id }}
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
                </td>
    </div>
    )

}
export default PmDepotQuarterlyView;