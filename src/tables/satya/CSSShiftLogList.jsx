import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  addCssshift,
  fetchData,
  saveData,
} from "../../reducer/satya/CSSShiftLogReducer";
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
const CSSShiftLogList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "CSS Shift Log Book.pdf",
  });
  const dispatch = useDispatch();
  const cssshift = useSelector((state) => state.csslog);

  const itmm = cssshift.data.data;

  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);

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
            <Link underline="hover" color="inherit" to="/cssshift">
              CSS Shift Logbook
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3>CSS Shift Logbook</h3>
        <span className="line-box"></span>
        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="CSS Shift Logbook"
            sheet="CSS Shift Logbook"
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
          <table ref={tableRef}>
            {filteredItems?.map((item, index) => {
              const value = item?.css_staff;
              const values = item?.section_staff;
              return (
                <div key={item.id}>
                  <thead>
                    <tr>
                      <th colSpan={1}>Date : {item?.date}</th>
                      <th colSpan={2}></th>
                    </tr>
                    <tr>
                      <th colSpan={1}>Shift: {item?.shift}</th>
                      <th colSpan={2}>Section: {item?.section}</th>
                    </tr>
                    <tr>
                      <th colSpan="3">CSS Staff</th>
                    </tr>
                    <tr>
                      <th style={{ width: "150px" }}>Serial</th>
                      <th style={{ width: "204px" }}>Staff On Duty</th>
                      <th style={{ width: "150px" }}>Designation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{value?.[0]?.cssstaffonduty}</td>
                      <td>{value?.[0]?.designation1}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>{value?.[1]?.cssstaffonduty}</td>
                      <td>{value?.[1]?.designation1}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>{value?.[2]?.cssstaffonduty}</td>
                      <td>{value?.[2]?.designation1}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      {" "}
                      <th colSpan="3"> Section Staff</th>
                    </tr>
                    <tr>
                      <th style={{ width: "150px" }}>Serial</th>
                      <th style={{ width: "204px" }}>Staff On Duty</th>
                      <th style={{ width: "150px" }}>Designation</th>
                      <th style={{ width: "150px" }}>Section</th>
                    </tr>
                    <tr>
                      <td>1</td>

                      <td>{values?.[0]?.sstaffonduty}</td>
                      <td>{values?.[0]?.designation2}</td>
                      <td colSpan={2}>{values?.[0]?.section1}</td>
                    </tr>
                    <tr>
                      <td>2</td>

                      <td>{values?.[1]?.sstaffonduty}</td>
                      <td>{values?.[1]?.designation2}</td>
                      <td colSpan={2}>{values?.[1]?.section1}</td>
                    </tr>
                    <tr>
                      <td>3</td>

                      <td>{values?.[2]?.sstaffonduty}</td>
                      <td>{values?.[2]?.designation2}</td>
                      <td colSpan={2}>{values?.[2]?.section1}</td>
                    </tr>
                  </thead>
                </div>
              );
            })}

            {filteredItems?.map((item, indexss) => {
              const value = item?.failures;
              return (
                <div key={item.id}>
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Failure Details</th>
                      <th style={{ width: "100px" }}>Time</th>
                      <th style={{ width: "246px" }}>Rectification/Remarks</th>
                      <th style={{ width: "100px" }}>Time</th>
                      <th style={{ width: "186px" }}>Attended By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{value?.[0]?.failuredetails}</td>
                      <td>{value?.[0]?.time1}</td>
                      <td>{value?.[0]?.remarks}</td>
                      <td>{value?.[0]?.time2}</td>
                      <td>{value?.[0]?.attendedby}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>{value?.[1]?.failuredetails}</td>
                      <td>{value?.[1]?.time1}</td>
                      <td>{value?.[1]?.remarks}</td>
                      <td>{value?.[1]?.time2}</td>
                      <td>{value?.[1]?.attendedby}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>{value?.[2]?.failuredetails}</td>
                      <td>{value?.[2]?.time1}</td>
                      <td>{value?.[2]?.remarks}</td>
                      <td>{value?.[2]?.time2}</td>
                      <td>{value?.[2]?.attendedby}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th>Instruction Remarks</th>
                      <th colSpan={2}>Shift Activities</th>
                      <th>Charge Handed Over By</th>
                      <th colSpan={2}>Charge Taken Over By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.instruction_remarks}</td>
                      <td colSpan={2}>{item.shiftactivities}</td>
                      <td>{item.chargehandedoverby}</td>
                      <td colSpan={2}>{item.chargetakenoverby}</td>
                    </tr>
                  </tbody>
                  <td className=" ">
                    {item.status === "0" || user.role === "Admin" ? (
                      <div className="d-flex gap-2 align-items-center">
                        <Link
                          to={`/edit/css-shift-logbook`}
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
          </table>
        </div>
      </div>
    </>
  );
};

export default CSSShiftLogList;
