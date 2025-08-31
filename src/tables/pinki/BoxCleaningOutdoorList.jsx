import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { fetchData, saveData } from "../../reducer/redux/tableDataSlice";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
function BoxCleaningOutdoorList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "BoxCleaningOutdoor.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const boxcleaning = useSelector((state) => state.data);
  console.log(boxcleaning);
  const [slug, setSlug] = useState(getLastParameter().trim());
  const itmm = boxcleaning.data.data;
  const [datas, setDatas] = useState([]);
  const [filtereddatas, setFiltereddatas] = useState([]);

  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch]);

  console.log(slug);
  console.log(boxcleaning.data.data);
  // to check data is fetched properly or not

  useEffect(() => {
    if (itmm) {
      // Modify the state correctly with setFiltereddatas
      const filtered = itmm.filter((itm) => itm.id === id);
      setFiltereddatas(filtered);
      console.log(filtered);
    }
  }, [itmm, id]);

  const handleSave = (id) => {
    dispatch(saveData({ formType: slug, id }));
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 500)
  };

  const boxCleaningActivities = [
    {
      category: "Cleaning activity:- Outdoor Boxes",
      activity: "Cleaning of Boxes/Cubicles",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes",
      activity: "Checking of proper dressing of Cubicles",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes",
      activity: "Verification of terminal condition",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes",
      activity: "Verification of Earthing of Box ",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes",
      activity: "Verification of availability of connection details in the Box",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes1",
      activity: "Cleaning of Boxes/Cubicles",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes1",
      activity: "Checking of proper dressing of Cubicles",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes1",
      activity: "Verification of terminal condition",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes1",
      activity: "Verification of Earthing of Box ",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes1",
      activity: "Verification of availability of connection details in the Box",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes2",
      activity: "Cleaning of Boxes/Cubicles",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes2",
      activity: "Checking of proper dressing of Cubicles",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes2",
      activity: "Verification of terminal condition",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes2",
      activity: "Verification of Earthing of Box ",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes2",
      activity: "Verification of availability of connection details in the Box",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes3",
      activity: "Cleaning of Boxes/Cubicles",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes3",
      activity: "Checking of proper dressing of Cubicles",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes3",
      activity: "Verification of terminal condition",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes3",
      activity: "Verification of Earthing of Box ",
    },
    {
      category: "Cleaning activity:- Outdoor Boxes3",
      activity: "Verification of availability of connection details in the Box",
    },
  ];
  console.log(filtereddatas);
  return (
    <div className="container" style={{ maxWidth: "75%" }}>
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to={`/form/${slug}`}>
            OUTDOOR JUNCTION/REPEATER BOX CLEANING MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit">
         
          </Link>
        </Breadcrumbs>
      </div>
      <h3>OUTDOOR JUNCTION/REPEATER BOX CLEANING </h3>
      <span className="line-box"></span>
      <div className="d-flex gap-3">
        <Link to="">
          {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
        </Link>
        <DownloadTableExcel
          filename="BoxCleaningOutdoor"
          sheet="BoxCleaningOutdoor"
          currentTableRef={targetRef.current}
        >
          <button className="btn " style={{ border: "1px solid #0baa9a " }}>
            <RiFileExcel2Fill color="#0baa9a " size={25} />
          </button>
        </DownloadTableExcel>
        <button
          className="btn"
          onClick={() => toPDF()}
          style={{
            border: "1px solid #0baa9a",
          }}
        >
          <MdPictureAsPdf size={"25px"} color="#850d04" />
        </button>
      </div>

      <div ref={targetRef}>
        {filtereddatas?.map((data) => {
          console.log("Data for each record:", data); // log to check structure
          return (
            <div key={data.id}>
              <table className="table" ref={tableRef}>
                <thead>
                  <tr>
                    <th className="text-start" colSpan={2}>
                      Station : {data?.station}
                    </th>
<th className="text-start" colSpan={2}>
                      Name of Cabinet : {data?.pointNo}
                    </th>
                    <th className="text-start" colSpan={4}>
                      Date of Maintenance : {data?.date_of_maintenance}
                    </th>
                  </tr>

                  <tr>
                    <th colSpan={"4"}>Halfyearly Range</th>
                    <th colSpan={2}>{data?.csign}</th>
                  </tr>
                  <tr>
                    <th>S.NO.</th>

                    <th colSpan={3}>Cleaning Activities: Outdoor Boxes</th>
                    <th>Outdoor Cabinet Name</th>
                    <th>Check List</th>
                    {/* <th colSpan={2}>Date</th> */}
                  </tr>
                </thead>
                <tbody>
                  {boxCleaningActivities.map((item, index) => {
                    console.log("Box cleaning activity:", item);
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-start" colSpan={"3"}>
                          {" "}
                          {item.activity}
                        </td>
                        <td>{data?.halfyearly[index]?.boxName}</td>
                        <td>{data?.halfyearly[index]?.checklistStatus}</td>

                        {/* <td >{data?.halfyearly[index]?.date}</td> */}
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={2} className="text-start">
                      <b>Remarks : </b> {data?.remarks}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-start">
                      <b>Name : </b> {data?.name}
                    </td>

                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-start">
                      <b> Designation : </b>
                      {data?.designation}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={2} className="text-start">
                      <b>EmpNo : </b>
                      {data?.empno}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-start">
                      <b>Counter Name : </b>
                      {data?.employee_name}
                    </td>

                    <td></td>
                  </tr>
                </tbody>
              </table>
              <td className=" ">
                {data.status === "0" || user.role === "Admin" ? (
                  <div className="d-flex">
                    <Link
                      to={`/edit/${slug}`}
                      state={{ id: data.id }}
                      className="btn btn-primary align-content-center"
                    >
                      Edit
                    </Link>
                    <button
                      type="submit"
                      onClick={() => {
                        handleSave(data.id);
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
  );
}

export default BoxCleaningOutdoorList;
