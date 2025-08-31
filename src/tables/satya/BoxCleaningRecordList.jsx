import React, { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  fetchData,
  saveData,
} from "../../reducer/satya/BoxCleaningRecordReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";

const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const BoxCleaningRecordList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Indoor Box Cleaning.pdf" });
  const boxcleaning = useSelector((state) => state.boxindoor);
  const [slug, setSlug] = useState(getLastParameter().trim());

  const itmm = boxcleaning.data.data;

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
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 500)
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Cleaning Activity-Indoor
            </Link>
            <Link underline="hover" color="inherit">
              View
            </Link>
          </Breadcrumbs>
        </div>
        <h3>BOX CLEANING QUATERLY MAINTENANCE RECORD</h3>
        <span className="line-box"></span>
        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="Indoor Box Cleaning Table"
            sheet="Indoor Box Cleaning"
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
          <table className="table" ref={tableRef}>
            {filteredItems?.map((item, index) => (
              <div key={item.id}>
                <thead>
                  {filteredItems.map((item, index) => (
                    <tr key={item.id}>
                      <th colSpan={1} style={{ textAlign: "left" }}>
                        Schedule: {item.maintenanceschedule}
                      </th>
                      <th colSpan={1} style={{ textAlign: "left" }}>
                        Station: {item.station}
                      </th>
                      <th colSpan={1} style={{ textAlign: "left" }}>
                        Date of Maintenance: {item.dateofmaintenance}
                      </th>
                      <th colSpan={1} style={{ textAlign: "left" }}>
                        Cabinet: {item.cabinet}
                      </th>
                    </tr>
                  ))}
                  <tr>
                    <th rowspan="2">S.No.</th>
                    <th rowspan="2">Cleaning Activity-Indoor</th>
                    <th rowspan="2">Done or Not</th>
                    <th rowspan="2">Activity Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>1</td>
                      <td className="text-start">Cleaning of Boxes/Cubical </td>
                      <td>{item.checklist1}</td>
                      <td>{item.blank1}</td>
                    </tr>
                  ))}
                  {filteredItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>2</td>
                      <td className="text-start">
                        Checking of proper dressing of cubical{" "}
                      </td>
                      <td>{item.checklist2}</td>
                      <td>{item.blank2}</td>
                    </tr>
                  ))}
                  {filteredItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>3</td>
                      <td className="text-start">
                        Verification of terminal condition
                      </td>
                      <td>{item.checklist3}</td>
                      <td>{item.blank3}</td>
                    </tr>
                  ))}
                </tbody>
                <thead>
                  <tr>
                    <th colSpan={4}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={item.id}>
                      <td colSpan={4}>{item.remarks}</td>
                    </tr>
                  ))}
                </tbody>
                  <thead>
                  <tr>
                    <th colSpan={2}>Name</th>
                    <th >Designation</th>
                    <th >Emp ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={item.id}>
                      <td colSpan={2}>{item.name}</td>
                      <td >{item.designation}</td>
                      <td >{item.countersign}</td>
                    </tr>
                  ))}
                </tbody>
                <td className=" ">
                  {item.status === "0" && user.role !== "Admin" ? (
                    <div className="d-flex gap-2 align-items-center">
                      <Link
                        to={`/edit/indoor-box-cleaning`}
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
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default BoxCleaningRecordList;
