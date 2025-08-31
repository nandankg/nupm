import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  addShiftlog,
  fetchData,
  saveData,
} from "../../reducer/satya/ShiftLogBookReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const ShiftLogBookList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "shift_logbook.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));
  const shiftlog = useSelector((state) => state.shiftbook);
  const [slug, setSlug] = useState(getLastParameter().trim());
const [fshift,setFshift]=useState([])
const[failures,setFailures]=useState([])
  const itmm = shiftlog.data.data;
  console.log(shiftlog)
  useEffect(() => {
    dispatch(fetchData());
   
  }, [dispatch]);

  let filteredItems;

  if (itmm) {
    filteredItems = itmm.filter((itm) => {
      return itm.id === id;
    });
  }
    console.log(filteredItems);


  useEffect(() => {
    // Filter out rows where all fields are null
    if(filteredItems){
const filtItem = filteredItems[0].staff.filter(
  (item) =>
    Object.values(item).some((value) => value !== null)
);
setFshift(filtItem);
}
},[filteredItems])

useEffect(() => {
if(filteredItems){
const filtItem = filteredItems[0]?.failures.filter(
(item) =>
  Object.values(item).some((value) => value !== null)
);
setFailures(filtItem);
}
},[filteredItems])
  const handleSave = (id) => {
    dispatch(saveData(id));
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 1000)
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              Shift Log Book
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3>SHIFT LOG BOOK</h3>
        <span className="line-box"></span>
        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="shift_logbook table"
            sheet="shift_logbook"
            currentTableRef={tableRef.current}
          >
            <button className="btn " style={{ border: "1px solid #0baa9a " }}>
              <RiFileExcel2Fill color="#0baa9a " size={25} />
            </button>
          </DownloadTableExcel>
          <button
            className="btn"
            onClick={() => toPDF()}
            style={{ border: "1px solid #0baa9a" }}
          >
            <MdPictureAsPdf size={"25px"} color="#850d04" />
          </button>
        </div>

        <div ref={targetRef}>
          <h4>Shift Log Book</h4>
          {filteredItems?.map((item, index) => {
            const value = item?.staff;
            const values = item?.failures;
            return (
              <div key={item.id}>
                <table
                  className="table"
                  ref={tableRef}
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th colSpan={2}>Date: {item?.date}</th>
                      <th colSpan={1}>Shift: {item?.shift}</th>
                     
                      <th colSpan={5}>Section: {item?.section}</th>
                    </tr>
                    <tr>
                      <th>Sr. No.</th>
                      <th> Staff On Duty</th>
                      <th>Designation</th>
                    </tr>
                    {fshift.map((stf,idx)=>(<tr>
                      
                      <td>{idx+1}</td>
                      <td>{stf.cssstaffonduty}</td>
                      <td>{stf.designation1}</td>
                    </tr>))}
                    

                  
                    
                    <tr>
                      <th>Sr. No.</th>
                      <th colSpan={2}>Failure Details</th>
                      <th>Failure Time</th>
                      <th colSpan={2}>Remarks</th>
                      <th>Rectification Time</th>
                      <th>Attended By</th>
                    </tr>
                  </thead>
                  <tbody>
                  {failures.map((vl,idx)=>(
                    <tr>
                      <td>{idx+1}</td>
                      <td colSpan={2}>{vl?.failuredetails}</td>
                      <td>{vl?.time1}</td>
                      <td colSpan={2}>{vl?.remarks}</td>
                      <td>{vl?.time2}</td>
                      <td>{vl?.attendedby}</td>
                    </tr>
                  ))}
                                    </tbody>
                  <thead>
                    <tr>
                      <th colSpan={2}>Any Specific Instruction/PTW Remarks</th>
                      <th colSpan={2}>Any Extra Detail/Remarks</th>
                      <th>Charge Handed Over By</th>
                        <th>Employee Id</th>
                      <th>Charge Taken Over By</th>
                      <th>Employee Id</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={2}>{item.instruction_remarks}</td>
                      <td colSpan={2}>{item.extra_remarks}</td>
                      <td>{item.chargehandedoverby}</td>
                      <td>{item.sign1}</td>
                      <td>{item.chargetakenoverby}</td>
                      <td>{item.sign2}</td>
                      <td>{item.department}</td>
                    </tr>
                  </tbody>
                </table>
                <td className=" ">
                  {item.status === "0" && user.role == "Admin" ? (
                    <div className="d-flex gap-2 align-items-center">
                      <Link
                        to={`/edit/shift-log-book-sdc`}
                        state={{ id: item.id }}
                        className="btn align-content-center"
                        style={{
                          width: "100px",
                          height: "50px",
                          textAlign: "center",
                          backgroundColor: "#FF7900 ",
                          color: "white",
                          fontSize: "20px",
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        onClick={() => {
                          handleSave(id);
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShiftLogBookList;
