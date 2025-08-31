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
import { fetchData, saveData } from "../../reducer/monika/DCSReducer";
import { useLocation, useNavigate } from "react-router-dom";

function DCSList() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("userdata"));

  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "PmLogBookList.pdf" });

  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const DCSList = useSelector((state) => state.DCS);
  const [datas, setdatas] = useState([]);
  const [filtereddatas, setFiltereddatas] = useState([]);

  const itmm = DCSList.data.data;

  console.log(filtereddatas);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (DCSList.data && DCSList.data.data) {
      setdatas(DCSList.data.data);
      setSlug(DCSList.slug);
      setFiltereddatas(DCSList.data.data);
    }
  }, [DCSList]);

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
    const newData = datas.filter((row) => {
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
    setFiltereddatas(newData);
  };
  const handleSave = (id) => {
    dispatch(saveData(id));
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 500)
  };

  const MaintenanceYearlyActivities = [
    {
      label:
        "Visual inspection of Radio Modem, Lightening Arrestor, RF feeder cables, Jumper cables , Antenna and support brackets",
    },
    {
      label: "Visual inspection of spare ODC cable (Sig) & LC Duplex cable(MM)",
    },
    {
      label: "Check the earthing of all equipments",
    },
    {
      label: "Checking for Antenna Alignment",
    },
    {
      label: "Cleaning of TRE Boxes and Antenna (Sig & Multimedia)",
    },
    {
      label:
        "Tightening of RF feeder cable connectors, RF Jumper cable connectors and Lightening Arrestors (if required) - Splitter connected cable 5nm, Antenna connected cable 2nm",
    },
    {
      label:
        "Checking for condition & tightening of all the fittings and bolts",
    },
    {
      label: "Checking of all the LED indication of modem (Sig & Multimedia)",
    },
    {
      label:
        "DCS  Splicing & Power Box Frame is properly fastened and secured with parapet through Nuts [4]",
    },
    {
      label:
        "DCS  ODRAP Box (SIG & MM) Frame  is properly fastened and secured with parapet through nuts(Priority Section) [4]",
    },
    {
      label:
        "DCS  ODRAP Box (SIG) Frame  is properly fastened and secured with parapet through nuts (Balance Section)[4]",
    },
    {
      label:
        "DCS  ODRAP Box (MM) Frame  is properly fastened and secured with parapet through nuts (Balance Section) [4]",
    },
    {
      label:
        "DCS Splicing & Power box is properly secured with Splicing & Power box frame through nut & bolts. [4]",
    },
    {
      label:
        "DCS  ODRAP box (SIG & MM) is properly secured with ODRAP box frame through nut & bolts. (Priority Section) [4]",
    },
    {
      label:
        "DCS  ODRAP box (SIG) is properly secured with ODRAP box (SIG) frame through nut & bolts. (Balance Section) [4]",
    },
    {
      label:
        "DCS  ODRAP box (MM) is properly secured with ODRAP box(MM) frame through nut & bolts. (Balance Section) [4]",
    },
    {
      label:
        "DCS Support Bracket-SIG is properly secured with OHE mast through nut & bolts.[8]",
    },
    {
      label:
        "DCS Support Bracket-MM is properly secured with OHE mast through nut & bolts.[8]",
    },
    {
      label:
        "DCS Antenna fixer-SIG is properly secured with Support bracket-SIG through nut & bolts.[2]",
    },
    {
      label:
        "DCS Antenna fixer-MM is properly secured with Support bracket-MM through nut & bolts.[2]",
    },
    {
      label:
        "DCS SIG Antennas with antenna bracket are properly secured with Antena fixer through nut & bolts.[28]",
    },
    {
      label:
        "DCS MM Antennas with antenna bracket are properly secured with Antena fixer through nut & bolts.[32]",
    },
    {
      label: "Secure DCS-SIG Antenna Cover with plastic cable tie",
    },
    {
      label: "Secure DCS-MM Antenna Cover with plastic cable tie",
    },
    {
      label: "Check any other nut bolt tightness (if any)",
    },
  ];

  const range = ["Jan-Dec"];

  return (
    <>
      <div className="container" style={{ maxWidth: "98%" }}>
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              DCS TRE YEARLY MAINTENANCE RECORD
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
                filename="DCSList_table"
                sheet="DCSList_table"
                currentTableRef={tableRef.current}
              >
                <button
                  className="btn"
                  style={{ border: "1px solid #0baa9a " }}
                >
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
                      <th colSpan={2} className="text-start">
                        Revision - 00
                      </th>
                      <th>O&M/SIGNAL/ LOG /DCS/14</th>
                    </tr>
                    <tr>
                      <th colSpan={3}>DCS TRE YEARLY MAINTENANCE RECORD </th>
                    </tr>
                    <tr>
                      <th className="text-start">
                        DCS RAP NO. {data?.dcpRapNo}
                      </th>
                      <th className="text-centre" colSpan={2}>
                        MAINTENANCE SCHEDULE : YEARLY
                      </th>
                    </tr>

                    <tr>
                      <th colSpan={2}></th>
                      <th>JAN-DEC</th>
                    </tr>
                    <tr>
                      <th className="text-centre" colSpan={2}>
                        Details of Maintenance Activity
                      </th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* activity 1  */}

                    {MaintenanceYearlyActivities?.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td className="text-start"> {item.label}</td>
                          <td>{data.activities[index]?.value}</td>
                        </tr>
                      );
                    })}

                    <tr>
                      <td colSpan={2} className="text-start">
                        <b>Remarks : </b> {data?.remarks}
                      </td>
                      <td></td>
                    </tr>
                    {/* <tr>
                      <td colSpan={2} className="text-start">
                        <b>Signature : </b> {data?.sign}
                      </td>

                      <td></td>
                    </tr> */}
                    <tr>
                      <td colSpan={2} className="text-start">
                        <b>Name, Designation , EmpNo : </b> {data?.name},
                        {data?.designation}, {data?.empno}
                      </td>

                      <td></td>
                    </tr>

                    <tr>
                      <td colSpan={2} className="text-start">
                        <b>Counter Signature : </b>
                        {data?.csign}
                      </td>

                      <td></td>
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
    </>
  );
}

export default DCSList;
