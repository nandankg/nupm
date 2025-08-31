import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchData, saveData } from "../../reducer/monika/EKTReducer";
import { useLocation, useNavigate } from "react-router-dom";

function EKTList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "EKTList.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);

  const EKTList = useSelector((state) => state.EKTRegister);
  const [data, setdata] = useState([]);
  const [filteredItems, setfilteredItems] = useState([]);
  const itmm = EKTList.data.data;

  console.log();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (EKTList.data && EKTList.data.data) {
      setdata(EKTList.data.data);
      setSlug(EKTList.slug);
      setfilteredItems(EKTList.data.data);
    }
  }, [EKTList]);

  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }
  useEffect(() => {
    handleFilter();
  }, [searchValue, fromDate, toDate]);
  const handleFilter = () => {
    const newData = data.filter((row) => {
      const station = row.station ? row.station.toLowerCase() : "";
      const esc_no = row.esc_no ? row.esc_no.toLowerCase() : "";
      const nameOfSc = row.name_of_sc ? row.name_of_sc.toLowerCase() : "";
      const date = dayjs(row.date);

      const isInDateRange =
        fromDate && toDate
          ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
            (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
          : true;

      return (
        (station.includes(searchValue.toLowerCase()) ||
          esc_no.includes(searchValue.toLowerCase()) ||
          nameOfSc.includes(searchValue.toLowerCase())) &&
        isInDateRange
      );
    });
    setfilteredItems(newData);
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };

  const halfYearlyActivities = [
    { category: " EKT No", activity: "EKT Functional Test" },
    { category: " EKT No ", activity: "Cleaning of EKT box" },
    {
      category: " EKT No",
      activity: "Checking of EKT box LED status",
    },
    {
      category: "EKT No",
      activity: "Checking of proper functioning of EKT Switch",
    },
    {
      category: "EKT No",
      activity: "EKT removal/insertion from VDU",
    },
    {
      category: "EKT No",
      activity: "EKT removal/insertion from ATS",
    },
    {
      category: "EKT No",
      activity: "Checking of any abnormality, wear tear of EKT box",
    },
  ];

  return (
    <div className="container" style={{ maxWidth: "98%" }}>
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            EKT MAINTENANCE
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>

      <div className="d-flex justify-content-between align-datas-center mt-3">
        <div className="d-flex align-datas-center gap-3">
          <div className="d-flex gap-3">
            <Link to="">
              {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
            </Link>
            <DownloadTableExcel
              filename="EKTList_table"
              sheet="EKTList_table"
              currentTableRef={tableRef.current}
            >
              <button className="btn" style={{ border: "1px solid #0baa9a " }}>
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
        </div>
      </div>

      <div ref={targetRef}>
        {filteredData?.map((data) => {
          return (
            <>
              <table className="table" ref={tableRef}>
                <thead>
                  <tr>
                    <th className="text-start" colspan={4}>
                      Point No : {data?.pointNo}{" "}
                    </th>
                    <th colSpan={8} className="text-centre">
                      EKT No: {data?.ektNo}
                    </th>
                    <th colSpan={14} className="text-start">
                      IXL {data?.ixl}
                    </th>
                  </tr>

                  <tr>
                    <th>Type</th>
                    <th>Periodic</th>
                    <th>Date </th>
                    <th>{data?.date}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>

                  <tr>
                    <td colSpan={2}>
                      <b>EKT No</b>
                    </td>
                  </tr>
                  {halfYearlyActivities?.map((item, index) => {
                    const months = [
                      "January-June",
                      "Feb",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July-December",
                      "August",
                      "Sep",
                      "Oct",
                      "Nov",
                      "December",
                    ];

                    let showCategory = true;

                    if (
                      index > 0 &&
                      halfYearlyActivities[index - 1].category === item.category
                    ) {
                      showCategory = false;
                    }

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {showCategory ? (
                          <td>{showCategory ? item.category : ""}</td>
                        ) : (
                          <td></td>
                        )}
                        <td colSpan={2}>{item?.activity}</td>
                        <td>{data?.halfYearly[index]?.range}</td>
                        {months?.map((month) => (
                          <React.Fragment key={month}>
                            {data?.halfYearly?.[index]?.range === month ? (
                              <td colSpan={12}>
                                {data?.halfYearly[index]?.status}
                              </td>
                            ) : (
                              <>
                                <td></td>
                                <td></td>
                              </>
                            )}
                          </React.Fragment>
                        ))}
                      </tr>
                    );
                  })}
                  <tr>
                    <td>Remarks</td>
                    <td className="text-start" colSpan={4}>
                      {data?.remarks}
                    </td>
                    <td colSpan={24}></td>
                  </tr>
                  <tr>
                    {/* <td>Signature</td>
                    <td className="text-start" colSpan={4}>
                      {data?.signature}
                    </td>
                    <td colSpan={24}></td> */}
                  </tr>
                  <tr>
                    <td>Name, Designation & Emp. No.</td>
                    <td className="text-start" colSpan={4}>
                      {data?.name}, {data?.designation} , {data.empno}
                    </td>
                    <td colSpan={24}></td>
                  </tr>
                </tbody>
              </table>
              <td className=" ">
                {data.status === "0" || user?.role == "Admin" ? (
                  <div className="d-flex gap-2">
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
            </>
          );
        })}
      </div>
    </div>
  );
}

export default EKTList;
