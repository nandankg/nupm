import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData,saveData } from "../../reducer/redux/tableDataSlice";
import dayjs from "dayjs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReusableFilterBar from "../../component/ReusableFilterBar";
import TableStructure from "../../component/TableStructure";
import PDFConverter from '../../component/PDFConverter';
import PDFExportComponent from "../../component/PDFExportComponent";
import { BiSolidEdit } from "react-icons/bi";
import { FaCircleArrowRight } from "react-icons/fa6";
import ExcelExportComponent from "../../component/ExcelExportComponent";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function removehyphan(slug) {
  return slug.replace("-", "");
}
const ImprestRegList = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
 const targetRef = useRef();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const attendance = useSelector((state) => state.data);

  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  console.log(fromDate);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  console.log(ExcelExportComponent);

  // Fetch data when the component mounts
 useEffect(() => {
     const delayedFunction = () => {
       dispatch(fetchData({ formType: slug }));
     };
 
     // Set a timeout to call the function after 3 seconds
     const timeout = setTimeout(delayedFunction, 2000); // 3000ms = 3 seconds
 
     // Clean up the timeout if the component unmounts before the delay
     return () => clearTimeout(timeout); // Cleanup interval on unmount
    }, [dispatch]);

  // Update items and filteredItems when data changes
  useEffect(() => {
    if (attendance.data?.data) {
      setItems(attendance.data.data);
      
    }
  }, [attendance]);
  const itmm = attendance.data.data;
  let filteredItems;

  if (itmm) {
    filteredItems = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredItems);
  }

 
  const handleSave = (id) => {
        dispatch(saveData({ formType: slug,id}));
        alert("Data submitted!!")
      };
  return (
    <div className="container mt-5">
      <h1> Imprest Register</h1>

      {/* Filter Bar */}
      <ReusableFilterBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
<PDFConverter targetRef={targetRef} filename="data-report.pdf" defaultOrientation="landscape" />
<div className="container mt-4" ref={targetRef}>
      <table className="table table-bordered text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>Form ID</th>
            <th>Created At</th>
            <th>Imprest No.</th>
            <th>Bill No.</th>
            <th>Item Name</th>
            <th>Name & Address of Agency</th>
            <th>Qty (a)</th>
            <th>Rate (b)</th>
            <th>Amount c= (a*b)</th>
            <th>GST (d)</th>
            <th>Total Amount (c+d)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((itm,index)=>(
            <>
          <tr>
            <td rowSpan={itm.billdetail.length+1}>{itm.form_id}</td>
            <td rowSpan={itm.billdetail.length+1}>{itm.created_at}</td>
            <td rowSpan={itm.billdetail.length+1}>{itm.imprest_no}</td>
            <td colSpan={8}></td>
             <td rowSpan={itm.billdetail.length+1}>
                              {itm.status === "0" || user?.role == "Admin" ? (
                                             <>
                                             <Link
                                               to={`/edit/${slug}`}
                                               state={{ id: itm.id }}
                                               className="btn align-content-center"
                                               style={{
                                                 width: "40px",
                                                 height: "40px",
                                                 textAlign: "center",
                                                 backgroundColor: "#FF7900 ",
                                                 color: "white",
                                                 fontSize: "18px",
                                               }}
                                             ><BiSolidEdit />
                                              </Link>
                                             <button
                                               onClick={() => {
                                                 handleSave(itm.id);
                                               }}
                                               className="btn align-content-center mt-2"
                                               style={{
                                                 width: "40px",
                                                 height: "40px",
                                                 textAlign: "center",
                                                 backgroundColor: "#50C878",
                                                 color: "white",
                                                 fontSize: "18px",
                                               }}
                                             ><FaCircleArrowRight />
                                             </button>
                                             </>
                                              ) : (
                                               ""
                                             )}
                            </td>
            </tr>
            {itm.billdetail.map((bill,idx)=>(
             <tr>
              
              <td>{bill.billNo}</td>
            <td>{bill.item_name}</td>
            <td>{bill.name_Address}</td>
            <td>{bill.qty}</td>
            <td>{bill.rate}</td>
            <td>{bill.amount}</td>
            <td>{bill.gst}</td>
            <td>{bill.totalAmount}</td>
            </tr>
            ))}
                 
                 </>
          ))}
        </tbody>
      </table>
    </div>
      {/* Table Structure */}
    

      {/* PDF Export */}
      <PDFExportComponent
        contentId="section-to-export"
        filename="ImprestRegList .pdf"
      />
     
      
    </div>
  );
};

export default ImprestRegList;
