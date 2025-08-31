import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  saveData,
} from "../../reducer/satya/LabMaterialTransactionReducer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { Breadcrumbs } from "@mui/material";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";

const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const LabMaterialTransactionList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "Lab Material Transaction.pdf",
  });
  const LabRegister = useSelector((state) => state.labmaterial);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);

  const itmm = LabRegister.data.data;

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
    navigate(`list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              LAB Material Transaction
            </Link>
            <Link underline="hover" color="inherit">
              View
            </Link>
          </Breadcrumbs>
        </div>
        <h3>LAB Material Transaction Register</h3>
        <span className="line-box"></span>
        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="Lab Material Transaction Table"
            sheet="Lab Material Transaction"
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
          <table
            className="table"
            ref={tableRef}
            style={{ overflowX: "scroll" }}
          >
            <thead>
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <th colSpan={6}>
                    LAB Material Transaction Register 
                  </th>
                 
                  <th colSpan={2}>Unit: Signal</th>
                </tr>
              ))}
              <tr>
                <th colSpan={9}>RECIPTS</th>
              </tr>
              <tr>
                <th>Date of Failure</th>
                <th>Description of Material</th>
                <th>Sr. No.</th>
                <th>Qty.</th>
                <th>EFR No.</th>
                <th>Date of Receiving</th>
                <th>To Whom Received</th>
                <th colSpan={2}>Gear Id & Location</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.failuredate}</td>
                  <td>{item.description}</td>
                  <td>{index + 1}</td>
                  <td>{item.quantity}</td>
                  <td>{item.efr_no}</td>
                  <td>{item.receivedate}</td>
                  <td>
                    {item.name}&nbsp;|&nbsp;{item.desig}
                  </td>
                  <td>{item.gearidLocation}</td>
                </tr>
              ))}
            </tbody>
            <thead>
              <tr>
                <th colSpan={9}>ISSUES</th>
              </tr>
              <tr>
                <th>Date of Issue</th>
                <th>Description of Material</th>
                <th>Sr. No.</th>
                <th>Qty.</th>
                <th>EFR No.</th>
                <th>Invoice/Challan No. & Date</th>
                <th>To Whom Received</th>
                <th>For What Work And Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.issuedate}</td>
                  <td>{item.mdescription}</td>
                  <td>{index + 1}</td>
                  <td>{item.quant}</td>
                  <td>{item.efrNo}</td>
                  <td>
                    {item.invoiceno}&nbsp;|&nbsp;{item.invoiceDate}
                  </td>
                  <td>
                    {item.name1}&nbsp;|&nbsp;{item.desig1}
                  </td>
                  <td>{item.workLocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredItems.map((item, index) => (
         <td className="">
                    {item.status === "0" || user?.role == "Admin" ? (
                      <div className="d-flex flex-column ">
                        <Link
                          to={`/edit/${slug}`}
                          state={{ id: item.id }}
                          className="btn btn-primary "
                        >
                          Edit
                        </Link>
                        <br />
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
                     ))}
        </div>
      </div>
    </>
  );
};

export default LabMaterialTransactionList;
