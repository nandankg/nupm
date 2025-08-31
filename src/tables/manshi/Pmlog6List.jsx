import { FaFilter, FaCheck, FaTimes } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { RiFileExcel2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  addPmlog6,
  fetchData,
  saveData,
} from "../../reducer/manshi/Pmlog6Reducer";
const Pmlog6List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Pmlog6.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const Pmlog6h = useSelector((state) => state.Pmlog6);
  const [slug, setSlug] = useState("");
  const itmm = Pmlog6h.data.data;
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
    navigate(`/list/${slug}`);
  };

  useEffect(() => {
    if (Pmlog6h.data && Pmlog6h.data.data) {
      setSlug(Pmlog6h.slug);
    }
  }, [Pmlog6h]);

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
              Pm log 6
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> Pm log Preventive Maintenance (Half Yearly) List</h3>
        <span className="line-box"></span>

        <div className="d-flex gap-3">
          <Link to="">
            {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
          </Link>
          <DownloadTableExcel
            filename="Pmlog 6"
            sheet="Pmlog 6"
            currentTableRef={tableRef.current}
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
          {filteredItems?.toReversed().map((item, index) => {
            const value = item?.activities;
            return (
              <>
                <table className="table" ref={tableRef}>
                  <thead>
                    <tr>
                      <th colspan="8" className="text-start">
                        Frequency
                      </th>
                      <th className="text-start" colspan="19">
                        Half Yearly
                      </th>
                      <th className="text-start" colspan="9">
                        Annexure: B
                      </th>
                    </tr>
                    <tr>
                      <th className="text-start" colspan="8">
                        DATE: {item?.date}
                      </th>
                      <th className="text-start" colspan="19"></th>
                      <th className="text-start" colspan="9">
                        DOCUMENT: O&M/AFC/OCC/SDC/CH02
                      </th>
                    </tr>
                    <tr>
                      <th className="text-start" colspan="8"></th>
                      <th className="text-start" colspan="19"></th>
                      <th className="text-start" colspan="9">
                        Ref:O&M/TELE-AFC/SOP/02
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={1}>Sr. No.</th>
                      <th colSpan={3}>Activity</th>
                      <th colSpan={10}>DESCRIPTION OF WORK</th>
                      <th colSpan={2}> TPNR TOM</th>
                      <th colSpan={2}>MWYA TOM</th>
                      <th colSpan={2}>TPNR EFO</th>
                      <th colspan={5}>REMARKS/ DEFICIENCIES</th>
                      <th colspan={5}>ACTION TAKEN</th>
                      <th colspan={5}>WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan={1}>1</td>
                      <td rowSpan={4} colspan={3}>
                        Visual Inspection
                      </td>
                      <td className="text-start" colspan={10}>
                        Fixing & Alignment of all modules of TOM
                      </td>

                      <td colSpan={2}> {item?.activities?.[0]?.TOM1} </td>
                      <td colSpan={2}>{item?.activities?.[0]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[0]?.EFO}</td>
                      <td colSpan={5}>{value?.[0]?.remark}</td>
                      <td colSpan={5}>{value?.[0]?.action}</td>
                      <td colSpan={5}>{value?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="text-start" colspan={10}>
                        Checking of all Cable connection and dressing
                      </td>
                      <td colSpan={2}> {item?.activities?.[1]?.TOM1} </td>
                      <td colSpan={2}>{item?.activities?.[1]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[1]?.EFO}</td>

                      <td colspan={5}>{value?.[2]?.remark}</td>
                      <td colspan={5}>{value?.[2]?.action}</td>
                      <td colspan={5}>{value?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start" colspan={10}>
                        Check Date and Time
                      </td>
                      <td colSpan={2}> {item?.activities?.[2]?.TOM1} </td>
                      <td colSpan={2}>{item?.activities?.[2]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[2]?.EFO}</td>
                      <td colspan={5}>{value?.[2]?.remark}</td>
                      <td colspan={5}>{value?.[2]?.action}</td>
                      <td colspan={5}>{value?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="text-start" colspan={10}>
                        Check Lubrication of all locks with silicone oil
                      </td>
                      <td colSpan={2}>{item?.activities?.[3]?.TOM1}</td>
                      <td colSpan={2}>{item?.activities?.[3]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[3]?.EFO}</td>

                      <td colspan={5}>{value?.[3]?.remark}</td>
                      <td colspan={5}>{value?.[3]?.action}</td>
                      <td colspan={5}>{value?.[3]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td rowSpan={2} colspan={3}>
                        Cleaning
                      </td>
                      <td className="text-start" colspan={10}>
                        Cleaning of all modules of TOM
                      </td>
                      <td colSpan={2}>{item?.activities?.[4]?.TOM1}</td>
                      <td colSpan={2}>{item?.activities?.[4]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[4]?.EFO}</td>

                      <td colspan={5}>{value?.[4]?.remark}</td>
                      <td colspan={5}>{value?.[4]?.action}</td>
                      <td colspan={5}>{value?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="text-start" colspan={10}>
                        Cleaning of Opto sensor, Antenna, Token tray, Reject
                      </td>
                      <td colSpan={2}>{item?.activities?.[5]?.TOM1}</td>
                      <td colSpan={2}>{item?.activities?.[5]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[5]?.EFO}</td>

                      <td colspan={5}>{value?.[5]?.remark}</td>
                      <td colspan={5}>{value?.[5]?.action}</td>
                      <td colspan={5}>{value?.[5]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td rowSpan={9} colspan={3}>
                        Module Test (Maintenance Menu)
                      </td>
                      <td className="text-start" colspan={10}>
                        CRW Test
                      </td>
                      <td colSpan={2}>{item?.activities?.[6]?.TOM1}</td>
                      <td colSpan={2}>{item?.activities?.[6]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[6]?.EFO}</td>

                      <td colspan={5}>{value?.[6]?.remark}</td>
                      <td colspan={5}>{value?.[6]?.action}</td>
                      <td colspan={5}>{value?.[6]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="text-start" colspan={10}>
                        PRINTER Test
                      </td>
                      <td colSpan={2}>{item?.activities?.[7]?.TOM1}</td>
                      <td colSpan={2}>{item?.activities?.[7]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[7]?.EFO}</td>

                      <td colspan={5}>{value?.[7]?.remark}</td>
                      <td colspan={5}>{value?.[7]?.action}</td>
                      <td colspan={5}>{value?.[7]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="text-start" colspan={10}>
                        TDM Test
                      </td>
                      <td colSpan={2}>{item?.activities?.[8]?.TOM1}</td>
                      <td colSpan={2}>{item?.activities?.[8]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[8]?.EFO}</td>

                      <td colspan={5}>{value?.[8]?.remark}</td>
                      <td colspan={5}>{value?.[8]?.action}</td>
                      <td colspan={5}>{value?.[8]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>10</td>

                      <td className="text-start" colspan={10}>
                        PDU Test
                      </td>
                      <td colSpan={2}>{item?.activities?.[9]?.TOM1}</td>
                      <td colSpan={2}>{item?.activities?.[9]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[9]?.EFO}</td>

                      <td colspan={5}>{value?.[9]?.remark}</td>
                      <td colspan={5}>{value?.[9]?.action}</td>
                      <td colspan={5}>{value?.[9]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="text-start" colspan={10}>
                        Touch Screen Test
                      </td>
                      <td colSpan={2}>{item?.activities?.[10]?.TOM1}</td>
                      <td colSpan={2}>{item?.activities?.[10]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[10]?.EFO}</td>

                      <td colspan={5}>{value?.[10]?.remark}</td>
                      <td colspan={5}>{value?.[10]?.action}</td>
                      <td colspan={5}>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td className="text-start" colspan={10}>
                        Counter Communication System Test
                      </td>
                      <td colSpan={2}>{item?.activities?.[11]?.TOM1}</td>
                      <td colSpan={2}>{item?.activities?.[11]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[11]?.EFO}</td>

                      <td colspan={5}>{value?.[11]?.remark}</td>
                      <td colspan={5}>{value?.[11]?.action}</td>
                      <td colspan={5}>{value?.[11]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td className="text-start" colspan={10}>
                        Keyboard, Mouse Test
                      </td>
                      <td colSpan={2}>{item?.activities?.[12]?.TOM1}</td>
                      <td colSpan={2}>{item?.activities?.[12]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[12]?.EFO}</td>

                      <td colspan={5}>{value?.[12]?.remark}</td>
                      <td colspan={5}>{value?.[12]?.action}</td>
                      <td colspan={5}>{value?.[12]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td className="text-start" colspan={10}>
                        Check LAN Status
                      </td>
                      <td colSpan={2}>{item?.activities?.[13]?.TOM1}</td>
                      <td colSpan={2}>{item?.activities?.[13]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[13]?.EFO}</td>

                      <td colspan={5}>{value?.[13]?.remark}</td>
                      <td colspan={5}>{value?.[13]?.action}</td>
                      <td colspan={5}>{value?.[13]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td className="text-start" colspan={10}>
                        Check Power strip
                      </td>
                      <td colSpan={2}>{item?.activities?.[14]?.TOM1}</td>
                      <td colSpan={2}>{item?.activities?.[14]?.TOM2}</td>
                      <td colSpan={2}>{item?.activities?.[14]?.EFO}</td>

                      <td colspan={5}>{value?.[14]?.remark}</td>
                      <td colspan={5}>{value?.[14]?.action}</td>
                      <td colspan={5}>{value?.[14]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td colspan={25}>Staff Name:-{item.staff1_name}</td>
                      <td colspan={5}>Designation:-{item.staff1_desg}</td>
                      <td colSpan={5}>Employee Id:-{item.staff1_sign}</td>
                    </tr>

                    <tr>
                      <td colspan={25}>Staff Name:-{item.staff2_name}</td>
                      <td colspan={5}>Designation:-{item.staff2_desg}</td>
                      <td colSpan={5}>Employee Id:-{item.staff2_sign}</td>
                    </tr>
                    <tr>
                      <td colspan={25}>Staff Name:-{item.staff3_name}</td>
                      <td colspan={5}>Designation:-{item.staff3_desg}</td>
                      <td colSpan={5}>Employee Id:-{item.staff3_sign}</td>
                    </tr>
                  </tbody>
                </table>
                <td>
                  {item.status === "0" ? (
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: item.id }}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={() => {
                          handleSave(item.id);
                        }}
                        style={{
                          padding: "6px 10px",
                          backgroundColor: "#339a63",
                          color: "white",
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
};

export default Pmlog6List;
