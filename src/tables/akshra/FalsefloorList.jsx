import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, saveData } from "../../reducer/akshra/FalsefloorReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { DownloadTableExcel } from "react-export-table-to-excel";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const UnderFalseFloorCleaningList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "falsefloor_table.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));
  const dispatch = useDispatch();

  const addUnderFalseFloorCleaningList = useSelector(
    (state) => state.signallightstate
  );
  const [slug, setSlug] = useState(getLastParameter().trim());
  const itmm = addUnderFalseFloorCleaningList.data.data;
  console.log(addUnderFalseFloorCleaningList);

 useEffect(() => {
     const delayedFunction = () => {
       dispatch(fetchData());
     };
 
     // Set a timeout to call the function after 3 seconds
     const timeout = setTimeout(delayedFunction, 2000); // 3000ms = 3 seconds
 
     // Clean up the timeout if the component unmounts before the delay
     return () => clearTimeout(timeout); // Cleanup interval on unmount
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
    }, 1000)
  };

  const falsehalfactivity = [
    { activity: "Cleaning of under false floor in SER" },
    {
      activity:
        "Checking of proper routing of under false floor cables/Wires through cable tray",
    },
    { activity: "Checking for openings/holes in rooms for Rat/Rodent entry" },
    { activity: "Checking for possible water entry/seepage in rooms" },
  ];

  return (
    <div className="container" style={{ maxWidth: "80%" }}>
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to={`/form/${slug}`}>
            Under False Floor Cleaning Six Monthly Maintenance Record
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <h3>Under False Floor Cleaning Six Monthly Maintenance Record</h3>
      <span className="line-box"></span>

      <div className="d-flex align-items-center gap-3 mt-3">
        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="falsefloor_table"
            sheet="falsefloor_table"
            currentTableRef={tableRef.current}
          >
            <button className="btn" style={{ border: "1px solid #0baa9a " }}>
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
      </div>

      <div ref={targetRef}>
        {filteredItems?.map((data) => {
          return (
            <div key={data.id}>
              {/* <div ref={tableRef} key={indexsc}>
                    <div style={{ overflow: "scroll", height: "70vh" }}>*/}
              <table className="table" ref={tableRef}>
                <thead
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#fff",
                  }}
                >
                  <tr className="header-text p-2">
                    <th colSpan={2}>Revision-00</th>
                    <th colSpan={1}></th>
                    <th colSpan={1}>O&M/SIGNAL/LOG/MISC/24</th>
                  </tr>
                  <tr>
                    <th colSpan={4}>
                      Under False Floor Cleaning Six Monthly Maintenance Record
                    </th>
                  </tr>
                  <tr>
                    <th className="text-start">STATION: {data?.station}</th>
                    <th colSpan={6} className="text-start">
                      DATE: {data?.date}
                    </th>
                  </tr>
                  <tr>
                    <th rowSpan={2}>Details of Maintenance Activity</th>
                    <th rowSpan={2}>Value</th>
                    <th>
                      {data?.halfyearly[0]?.range || "Range (halfyearly)"}
                    </th>
                  </tr>
                  <tr>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {falsehalfactivity.map((item, index) => {
                    return (
                      <tr key={index}>
                        {/* <td> <b>{index + 1} </b></td> */}
                        <td className="text-start">
                          <b> {item.activity} </b>
                        </td>
                        <td colSpan={8}>
                          {data?.halfyearly && data.halfyearly[index]
                            ? data.halfyearly[index].checked
                            : "N/A"}
                        </td>

                        {/* Display status in the table body */}
                      </tr>
                    );
                  })}
                  <tr>
                    <th className="text-start">Remarks</th>
                    <td className="text-start" colSpan={4}>
                      {data?.remarks}
                    </td>
                  </tr>
                  {/*<tr>
                    <th className="text-start">Signature</th>
                    <td className="text-start" colSpan={4}>
                      {data?.signature}
                    </td>
                  </tr>*/}
                  <tr>
                    <th className="text-start">Name, Designation & Emp. No.</th>
                    <td className="text-start" colSpan={4}>
                      {data?.name}, {data?.designation}, {data?.empno}
                    </td>
                  </tr>
                  {/*<tr>
                    <th className="text-start">Counter Signature</th>
                    <td className="text-start" colSpan={4}>
                      {data?.countersign}
                    </td>
                  </tr>*/}
                </tbody>
              </table>

              <td className=" " colSpan={13}>
                {data.status === "0" ? (
                  <div>
                    <Link
                      to={`/edit/${slug}`}
                      state={{ id: data.id }}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      type="submit"
                      onClick={() => handleSave(data.id)}
                      style={{ padding: "7px 15px", marginLeft: "10px" }}
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
  );
};

export default UnderFalseFloorCleaningList;
