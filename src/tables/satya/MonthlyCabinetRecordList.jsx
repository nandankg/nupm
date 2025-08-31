import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";

import { fetchData, saveData } from "../../reducer/redux/tableDataSlice";
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
const MonthlyCabinetRecordList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  console.log(tableRef, tableRef.current);
  const { toPDF, targetRef } = usePDF({
    filename: "ATS Monthly Cabinet Record.pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));
  const cabinetrecord = useSelector((state) => state.data);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(cabinetrecord);
  const itmm = cabinetrecord.data.data;

  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
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
              ATS Cabinet Record
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3>ATS Cabinet Maintenance Records</h3>
        <span className="line-box"></span>
        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="ATS Monthly Cabinet Record"
            sheet="ATS Monthly Cabinet Record"
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
            <thead>
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <th className="text-start">Date: {item.date}</th>
                  <th className="text-start">Cabinet: {item.cabinet}</th>
                  <th className="text-start">Year: {item.year}</th>
                  <th className="text-start">Station: {item.station}</th>
                </tr>
              ))}
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <th className="text-start" colSpan={1}>
                    Month: {item.month}
                  </th>
                  <th className="text-start" colSpan={1}>
                    Emp. Id: {item.employee_id}
                  </th>
                  <th className="text-start" colSpan={2}>
                    Department: {item.department}
                  </th>
                </tr>
              ))}
              <tr>
                <th rowspan="2">S.No.</th>
                <th rowspan="2">Maintenance Activity</th>
                <th colSpan={2}>Done or Not</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <td>1</td>
                  <td className="text-start">Visual Inspection</td>
                  <td colSpan={2}>{item.done1}</td>
                </tr>
              ))}
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <td>2</td>
                  <td className="text-start">Dust Cleaning</td>
                  <td colSpan={2}>{item.done2}</td>
                </tr>
              ))}
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <td>3</td>
                  <td className="text-start">Electrical Connection</td>
                  <td colSpan={2}>{item.done3}</td>
                </tr>
              ))}
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <td>4</td>
                  <td className="text-start">Fan</td>
                  <td colSpan={2}>{item.done4}</td>
                </tr>
              ))}
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <td>5</td>
                  <td className="text-start">Eathing Connection</td>
                  <td colSpan={2}>{item.done5}</td>
                </tr>
              ))}
            </tbody>
            <thead>
              <tr>
                <th rowspan="2">S.No.</th>
                <th rowspan="2">Checks After Maintenance</th>
                <th colSpan={2}>Done or Not</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <td>1</td>
                  <td className="text-start">
                    {" "}
                    Verify system status from system view. It should be same as
                    before the maintenance
                  </td>
                  <td colSpan={2}>{item.done6}</td>
                </tr>
              ))}
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <td>2</td>
                  <td className="text-start">
                    Check ping status of central router, sever, central work
                    stations
                  </td>
                  <td colSpan={2}>{item.done7}</td>
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
          </table>
          {filteredItems.map((item, id) => (
            <tr>
              <td className=" ">
                {item.status === "0" && user.role !== "Admin" ? (
                  <div className="d-flex gap-2 align-items-center">
                    <Link
                      to={`/edit/ats-cabinet-maintenance-monthly`}
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
            </tr>
          ))}
        </div>
      </div>
    </>
  );
};

export default MonthlyCabinetRecordList;
