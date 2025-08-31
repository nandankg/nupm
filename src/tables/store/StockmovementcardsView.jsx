
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import {
  fetchData,

  saveData,
} from "../../reducer/redux/tableDataSlice";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const StockmovementcardsView = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const navigate = useNavigate();
  const location = useLocation();
  const { toPDF, targetRef } = usePDF({
      filename:
        "Stockmovementcards.pdf",
    });
  const { id } = location.state;
  const [stockData, setStockData] = useState([]);
console.log(loanregister)
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [formData, setFormData] = useState({});

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch]);


  const itmm = loanregister.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }

  // // Initialize form values when data is loaded
  // useEffect(() => {
  //   if (loanregister?.data?.data) {
  //     id=parseInt(id)
  //     const filteredData = loanregister.data.data.find(
  //       (item) => item.id === id
  //     );
  //     if (filteredData) {
  //       setFormData(filteredData);
  //     }
  //   }
  // }, [loanregister, id]);
  // console.log(formData);
  

   const handleSave = () => {
       dispatch(saveData({slug,id}));
       alert(slug)
         navigate(`list/${slug}`);
         // Refresh the page
     
     };
   


  return (
    
    <div className="container mt-4">

      <button
                      className="btn"
                      onClick={() => toPDF()}
                      style={{
                        border: "1px solid #0baa9a",
                      }}
                    >
                      <MdPictureAsPdf size={"25px"} color="#850d04" />
                    </button>
                    <div ref={targetRef}>
<h4>Stock Movement Cards </h4>

  {/* Use a Bootstrap container for centering */}
     
     {filteredData.map((item, index) => ( 
      <>
   <table className="table table-bordered">
        <thead>
         <tr>
          <th>Date</th>
          <th>Station</th>
          <th>SC Emp</th>
          <th>SC Name</th>
          <th>CRA Emp</th>
          <th>CRA Name</th>
          <th>Shift Timming</th>
         </tr>
         <tr>
         <td>{item.date}</td> {/* Date column */}
              <td>{item.station}</td> {/* Station column */}
              <td>{item.scEmp}</td> {/* SC Emp column */}
              <td>{item.scName}</td> {/* SC Name column */}
              <td>{item.craEmp}</td> {/* CRA Emp column */}
              <td>{item.craName}</td> {/* CRA Name column */}
              <td>{item.shiftTiming}</td>
         </tr>
         </thead>
         </table>
         <table  className="table table-bordered">
          <thead>
          <tr> {/* New row for opening stock headers */}
            
            <th colSpan="5">Opening Stock</th>
            <th colSpan="2"></th>
            <th colSpan="5">Closing Stock</th>
          </tr>
          <tr> {/* New row for opening stock values */}
             {/* Empty space */}
            <th>SV</th>
            <th>SSC</th>
            <th>BL</th>
            <th>T1</th>
            <th>T3</th>
            <th colSpan="2"></th> {/* Empty space */}
            <th>SV</th>
            <th>SSC</th>
            <th>BL</th>
            <th>T1</th>
            <th>T3</th>
          </tr>
        </thead>
        <tbody>
        
            <>
       
              <tr>
              {/* ... (Existing columns) ... */}
              <td>{item.openingStock[0].SV}</td> {/* Opening Stock SV */}
              <td>{item.openingStock[0].SSC}</td> {/* Opening Stock SSC */}
              <td>{item.openingStock[0].BL}</td> {/* Opening Stock BL */}
              <td>{item.openingStock[0].T1}</td> {/* Opening Stock T1 */}
              <td>{item.openingStock[0].T3}</td> {/* Opening Stock T3 */}
              <th colSpan="2">Fresh</th>
              <td>{item.closingStock[0].SV}</td> {/* Closing Stock SV */}
              <td>{item.closingStock[0].SSC}</td> {/* Closing Stock SSC */}
              <td>{item.closingStock[0].BL}</td> {/* Closing Stock BL */}
              <td>{item.closingStock[0].T1}</td> {/* Closing Stock T1 */}
              <td>{item.closingStock[0].T3}</td> {/* Closing Stock T3 */}
            </tr>
            <tr>
              {/* ... (Existing columns) ... */}
              <td>{item.openingStock[1].SV}</td> {/* Opening Stock SV */}
              <td>{item.openingStock[1].SSC}</td> {/* Opening Stock SSC */}
              <td>{item.openingStock[1].BL}</td> {/* Opening Stock BL */}
              <td>{item.openingStock[1].T1}</td> {/* Opening Stock T1 */}
              <td>{item.openingStock[1].T3}</td> {/* Opening Stock T3 */}
              <th colSpan="2">Deface </th>
              <td>{item.closingStock[1].SV}</td> {/* Closing Stock SV */}
              <td>{item.closingStock[1].SSC}</td> {/* Closing Stock SSC */}
              <td>{item.closingStock[1].BL}</td> {/* Closing Stock BL */}
              <td>{item.closingStock[1].T1}</td> {/* Closing Stock T1 */}
              <td>{item.closingStock[1].T3}</td> {/* Closing Stock T3 */}
            </tr>
            <tr>
              {/* ... (Existing columns) ... */}
              <td>{item.openingStock[2].SV}</td> {/* Opening Stock SV */}
              <td>{item.openingStock[2].SSC}</td> {/* Opening Stock SSC */}
              <td>{item.openingStock[2].BL}</td> {/* Opening Stock BL */}
              <td>{item.openingStock[2].T1}</td> {/* Opening Stock T1 */}
              <td>{item.openingStock[2].T3}</td> {/* Opening Stock T3 */}
              <th colSpan="2">Defective   </th>
              <td>{item.closingStock[2].SV}</td> {/* Closing Stock SV */}
              <td>{item.closingStock[2].SSC}</td> {/* Closing Stock SSC */}
              <td>{item.closingStock[2].BL}</td> {/* Closing Stock BL */}
              <td>{item.closingStock[2].T1}</td> {/* Closing Stock T1 */}
              <td>{item.closingStock[2].T3}</td> {/* Closing Stock T3 */}
            </tr>
            </>
         
        </tbody>
        </table>
        </>
      ))}
      
      <table className="table table-bordered"> {/* Apply Bootstrap table styles */}
        <thead>
          <tr>
            <th rowSpan="2">S.No</th>
            <th rowSpan="2">ISSUE CARD ID</th>
            <th rowSpan="2">Card Type</th>
            <th rowSpan="2">Tick if sold</th>
            <th rowSpan="2">Status</th>
             {/* Empty header for the space */}
            <th rowSpan="2">CSC ID</th>
            <th rowSpan="2">AFC Amt</th>
            <th rowSpan="2">Refended CSC Details</th>
            <th rowSpan="2">Diff (If any)</th>
          </tr>
         
        </thead>
        <tbody>
          {filteredData[0].transactions.map((item, index) => (
            <tr key={index}> {/* Important: Add a unique key for each row */}
              <td>{index+1}</td>
              <td>{item.issueCardId}</td>
              <td>{item.cardType}</td>
              <td>
                <input 
                  type="checkbox" 
                  checked={item.sold} 
                  onChange={(e) => {
                    // Handle checkbox change here (update state, etc.)
                    const updatedStockData = [...stockData];
                    updatedStockData[index].sold = e.target.checked;
                    setStockData(updatedStockData);
                  }} 
                />
              </td>
              <td>{item.status}</td>
             
              <td>{item.cscId}</td>
              <td>{item.afcAmt}</td>
              <td>{item.actual}</td>
              <td>{item.diff}</td>
            </tr>
           
          ))}
           <tr>
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
                                    onClick={
                                      handleSave}
                                    >
                                    Submit
                                  </button>
                                </div>
                              ) : (
                                ""
                              )}
                            </td>
                            </tr>
        </tbody>
      </table>
      </div>
    </div>
 
     
  );
};

export default StockmovementcardsView;
