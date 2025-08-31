import { FaFilter, FaCheck, FaTimes } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";

import { fetchData, saveData } from "../../reducer/pinki/PMLogBookReducerSDC";

const PMLogBookListSDC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pmlogbook = useSelector((state) => state.pmlogbook);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "PM_LOGBOOK.pdf" });

  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [slug, setSlug] = useState("");
  const location = useLocation();
  const { id } = location.state;
  const user = JSON.parse(localStorage.getItem("userdata"));

  console.log(slug);
  console.log(pmlogbook.data.data);

  console.log(pmlogbook);

  const renderTickCross = (value) => {
    if (value === "Yes") {
      return <FaCheck style={{ color: "green" }} />;
    } else if (value === "No") {
      return <FaTimes style={{ color: "red" }} />;
    } else {
      return null;
    }
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (pmlogbook.data && pmlogbook.data.data) {
      setItems(pmlogbook.data.data);
      setFilteredItems(pmlogbook.data.data);
      setSlug(pmlogbook.slug);
    }
  }, [pmlogbook]);

  const itmm = pmlogbook.data.data;
  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }

  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`list/${slug}`);
  };
  console.log(items);
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              PREVENTIVE MAINTENACE WORKSHEET OF SDC SERVERS
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>

        <span className="line-box"></span>
        <div className="d-flex gap-3">
          <Link to="">
            {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
          </Link>
          <DownloadTableExcel
            filename="PMlogBookHalfYearly"
            sheet="PMlogBookHalfYearly"
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
          <h5>
            PREVENTIVE MAINTENANCE WORKSHEET OF SDC SERVERS (HALF YEARLY){" "}
          </h5>
          {filteredData?.map((item, index) => {
            const value = item?.activities1;
            const value2 = item?.activities2;
            return (
              <>
                <table ref={tableRef}>
                  <thead>
                    <tr>
                      <th className="text-start" colspan="6">
                        STN. NAME: {item?.station}{" "}
                      </th>
                      <th className="text-start" colspan="2">
                        DATE: {item?.date}
                      </th>
                      <th className="text-start small" colspan="2">
                        
                      Annexure: B
                      </th>
                      <th className="text-start small" colspan="2">
                      DOCUMENT: O&M/AFC/OCC/SDC/CH02 
                      </th>
                      <th className="text-start small" colspan="2">
                      Ref:O&M/TELE-AFC/SOP/02
                      </th>
                    </tr>
                    <tr>
                      <th rowspan="2">Sr. No.</th>
                      <th rowspan="2">Activity</th>
                      <th rowspan="2">DESCRIPTION OF WORK</th>
                      <th colspan={3}></th>
                      <th colspan={2}></th>
                      <th rowspan="2">REMARKS/ DEFICIENCIES</th>
                      <th rowspan="2">ACTION TAKEN</th>
                      <th rowspan="2" colspan={8}>
                        WHY DEFICIENCY COULD NOT BE RECTIFIED
                      </th>
                    </tr>
                    <tr>
                      <th>TPNR SC</th>
                      <th> MWYA SC</th>
                      <th>SDC-CC Server</th>
                      <th>SDC Switch</th>
                      <th>SDC-EC</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td rowSpan={4}>Visual Inspection</td>
                      <td className="text-start">
                        Check Date and Time of Server
                      </td>
                      <td>
                        {" "}
                        {renderTickCross(item?.activities1?.[0]?.TPNR_SC)}{" "}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[0]?.MWYA_SC)}
                      </td>
                      <td>
                        {renderTickCross(
                          item?.activities1?.[0]?.TOSDC_CC_ServerM3
                        )}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[0]?.SDC_Switch)}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[0]?.TOMSDC_EC5)}
                      </td>
                      <td>{value?.[0]?.remark}</td>
                      <td>{value?.[0]?.action}</td>
                      <td colspan={8}>{value?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>

                      <td className="text-start">check Switch rack fan</td>
                      <td>
                        {" "}
                        {renderTickCross(item?.activities1?.[1]?.TPNR_SC)}{" "}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[1]?.MWYA_SC)}
                      </td>
                      <td>
                        {renderTickCross(
                          item?.activities1?.[1]?.TOSDC_CC_ServerM3
                        )}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[1]?.SDC_Switch)}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[1]?.TOMSDC_EC5)}
                      </td>
                      <td>{value?.[1]?.remark}</td>
                      <td>{value?.[1]?.action}</td>
                      <td colspan={8}>{value?.[1]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start">
                        Check internal fan status of Switches
                      </td>
                      <td>
                        {" "}
                        {renderTickCross(item?.activities1?.[2]?.TPNR_SC)}{" "}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[2]?.MWYA_SC)}
                      </td>
                      <td>
                        {renderTickCross(
                          item?.activities1?.[2]?.TOSDC_CC_ServerM3
                        )}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[2]?.SDC_Switch)}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[2]?.TOMSDC_EC5)}
                      </td>
                      <td>{value?.[2]?.remark}</td>
                      <td>{value?.[2]?.action}</td>
                      <td colspan={8}>{value?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="text-start">
                        Checking of all cable connection and dressing.
                      </td>
                      <td>
                        {" "}
                        {renderTickCross(item?.activities1?.[3]?.TPNR_SC)}{" "}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[3]?.MWYA_SC)}
                      </td>
                      <td>
                        {renderTickCross(
                          item?.activities1?.[3]?.TOSDC_CC_ServerM3
                        )}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[3]?.SDC_Switch)}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[3]?.TOMSDC_EC5)}
                      </td>
                      <td>{value?.[3]?.remark}</td>
                      <td>{value?.[3]?.action}</td>
                      <td colspan={8}>{value?.[3]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td rowSpan={5}>Cleaning</td>
                      <td className="text-start">
                        Cleaning of Server (interior & exterior)
                      </td>
                      <td>
                        {" "}
                        {renderTickCross(item?.activities1?.[4]?.TPNR_SC)}{" "}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[4]?.MWYA_SC)}
                      </td>
                      <td>
                        {renderTickCross(
                          item?.activities1?.[4]?.TOSDC_CC_ServerM3
                        )}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[4]?.SDC_Switch)}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[4]?.TOMSDC_EC5)}
                      </td>

                      <td>{value?.[4]?.remark}</td>
                      <td>{value?.[4]?.action}</td>
                      <td colspan={8}>{value?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="text-start">
                        Cleaning and checking of sub modules of Server( Printer,
                        Keyb006F bv nard and )
                      </td>
                      <td>
                        {" "}
                        {renderTickCross(item?.activities1?.[5]?.TPNR_SC)}{" "}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[5]?.MWYA_SC)}
                      </td>
                      <td>
                        {renderTickCross(
                          item?.activities1?.[5]?.TOSDC_CC_ServerM3
                        )}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[5]?.SDC_Switch)}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[5]?.TOMSDC_EC5)}
                      </td>

                      <td>{value?.[5]?.remark}</td>
                      <td>{value?.[5]?.action}</td>
                      <td colspan={8}>{value?.[5]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="text-start">
                        Cleaning of SC HDD and check their proper fitment
                      </td>
                      <td>
                        {" "}
                        {renderTickCross(item?.activities1?.[6]?.TPNR_SC)}{" "}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[6]?.MWYA_SC)}
                      </td>
                      <td>
                        {renderTickCross(
                          item?.activities1?.[6]?.TOSDC_CC_ServerM3
                        )}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[6]?.SDC_Switch)}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[6]?.TOMSDC_EC5)}
                      </td>

                      <td>{value?.[6]?.remark}</td>
                      <td>{value?.[6]?.action}</td>
                      <td colspan={8}>{value?.[6]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="text-start">
                        Exterior Cleaning of Switches
                      </td>
                      <td>
                        {" "}
                        {renderTickCross(item?.activities1?.[7]?.TPNR_SC)}{" "}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[7]?.MWYA_SC)}
                      </td>
                      <td>
                        {renderTickCross(
                          item?.activities1?.[7]?.TOSDC_CC_ServerM3
                        )}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[7]?.SDC_Switch)}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[7]?.TOMSDC_EC5)}
                      </td>

                      <td>{value?.[7]?.remark}</td>
                      <td>{value?.[7]?.action}</td>
                      <td colspan={8}>{value?.[7]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="text-start">
                        External and internal cleaning of network switch racks
                      </td>
                      <td>
                        {" "}
                        {renderTickCross(item?.activities1?.[8]?.TPNR_SC)}{" "}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[8]?.MWYA_SC)}
                      </td>
                      <td>
                        {renderTickCross(
                          item?.activities1?.[8]?.TOSDC_CC_ServerM3
                        )}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[8]?.SDC_Switch)}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[8]?.TOMSDC_EC5)}
                      </td>

                      <td>{value?.[8]?.remark}</td>
                      <td>{value?.[8]?.action}</td>
                      <td colspan={8}>{value?.[8]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td rowSpan={3}>Module Test (Maintenance Menu)</td>
                      <td className="text-start">
                        Test different modes in device manager by applying and
                        releasing on
                      </td>
                      <td>
                        {" "}
                        {renderTickCross(item?.activities1?.[9]?.TPNR_SC)}{" "}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[9]?.MWYA_SC)}
                      </td>
                      <td>
                        {renderTickCross(
                          item?.activities1?.[9]?.TOSDC_CC_ServerM3
                        )}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[9]?.SDC_Switch)}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[9]?.TOMSDC_EC5)}
                      </td>

                      <td>{value?.[9]?.remark}</td>
                      <td>{value?.[9]?.action}</td>
                      <td colspan={8}>{value?.[9]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="text-start">
                        Check if all equipments are on LAN in Device manager
                      </td>
                      <td>
                        {" "}
                        {renderTickCross(item?.activities1?.[10]?.TPNR_SC)}{" "}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[10]?.MWYA_SC)}
                      </td>
                      <td>
                        {renderTickCross(
                          item?.activities1?.[10]?.TOSDC_CC_ServerM3
                        )}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[10]?.SDC_Switch)}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[10]?.TOMSDC_EC5)}
                      </td>

                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td colspan={8}>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>12</td>

                      <td className="text-start">
                        Check if Switches are working normal and all equipments
                        are on LAN and
                      </td>
                      <td>
                        {" "}
                        {renderTickCross(item?.activities1?.[11]?.TPNR_SC)}{" "}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[11]?.MWYA_SC)}
                      </td>
                      <td>
                        {renderTickCross(
                          item?.activities1?.[11]?.TOSDC_CC_ServerM3
                        )}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[11]?.SDC_Switch)}
                      </td>
                      <td>
                        {renderTickCross(item?.activities1?.[11]?.TOMSDC_EC5)}
                      </td>

                      <td>{value?.[11]?.remark}</td>
                      <td>{value?.[11]?.action}</td>
                      <td colspan={8}>{value?.[11]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td colSpan={17}>
                        <div
                          style={{
                            width: "100%",
                            height: "5px",
                            backgroundColor: "#a5a5a5",
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <b>Sr. No.</b>
                      </th>
                      <th>
                        <b>Activity</b>
                      </th>
                      <th>
                        <b>DESCRIPTION OF WORK</b>
                      </th>
                      <th>
                        <b>Interface Server</b>
                      </th>
                      <th>
                        <b>KMS (SDC)(Only) </b>
                      </th>
                      <th>
                        <b>AD Server (SDC) </b>
                      </th>
                      <th>
                        <b>BIM (SDC)</b>
                      </th>
                      <th>REMARKS/ DEFFICIENCIES </th>
                      <th>ACTION TAKEN</th>
                      <th colspan={8}>WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Visual Inspection</td>
                      <td className="text-start">
                        Check Date and Time of Server
                      </td>
                      <td>
                        {renderTickCross(item?.activities2?.[0]?.INTERFACE)}
                      </td>
                      <td>{renderTickCross(item?.activities2?.[0]?.KMS)}</td>
                      <td>{renderTickCross(item?.activities2?.[0]?.AD)}</td>
                      <td>{renderTickCross(item?.activities2?.[0]?.BIM)}</td>

                      <td>{value2?.[0]?.remark}</td>
                      <td>{value2?.[0]?.action}</td>
                      <td colspan={8}>{value2?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td rowspan={2}>Cleaning</td>
                      <td className="text-start">
                        Cleaning of Server (interior & exterior)
                      </td>
                      <td>
                        {renderTickCross(item?.activities2?.[1]?.INTERFACE)}
                      </td>
                      <td>{renderTickCross(item?.activities2?.[1]?.KMS)}</td>
                      <td>{renderTickCross(item?.activities2?.[1]?.AD)}</td>
                      <td>{renderTickCross(item?.activities2?.[1]?.BIM)}</td>

                      <td>{value2?.[1]?.remark}</td>
                      <td>{value2?.[1]?.action}</td>
                      <td colspan={8}>{value2?.[1]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>3</td>

                      <td className="text-start">
                        Cleaning and checking of sub modules of Server( Keyboard
                        and Mouse etc)
                      </td>
                      <td>
                        {renderTickCross(item?.activities2?.[2]?.INTERFACE)}
                      </td>
                      <td>{renderTickCross(item?.activities2?.[2]?.KMS)}</td>
                      <td>{renderTickCross(item?.activities2?.[2]?.AD)}</td>
                      <td>{renderTickCross(item?.activities2?.[2]?.BIM)}</td>

                      <td>{value2?.[2]?.remark}</td>
                      <td>{value2?.[2]?.action}</td>
                      <td colspan={8}>{value2?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td rowSpan={3}>Module Test (Maintenance Menu)</td>
                      <td className="text-start">
                        Check if all equipments are on LAN
                      </td>
                      <td>
                        {renderTickCross(item?.activities2?.[3]?.INTERFACE)}
                      </td>
                      <td>{renderTickCross(item?.activities2?.[3]?.KMS)}</td>
                      <td>{renderTickCross(item?.activities2?.[3]?.AD)}</td>
                      <td>{renderTickCross(item?.activities2?.[3]?.BIM)}</td>

                      <td>{value2?.[3]?.remark}</td>
                      <td>{value2?.[3]?.action}</td>
                      <td colspan={8}>{value2?.[3]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>5</td>

                      <td className="text-start">Check Fareon Module of BIM</td>
                      <td>
                        {renderTickCross(item?.activities2?.[4]?.INTERFACE)}
                      </td>
                      <td>{renderTickCross(item?.activities2?.[4]?.KMS)}</td>
                      <td>{renderTickCross(item?.activities2?.[4]?.AD)}</td>
                      <td>{renderTickCross(item?.activities2?.[4]?.BIM)}</td>

                      <td>{value2?.[4]?.remark}</td>
                      <td>{value2?.[4]?.action}</td>
                      <td colspan={8}>{value2?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>

                      <td className="text-start">
                        Check if Card reader of BIM are working
                      </td>
                      <td>
                        {renderTickCross(item?.activities2?.[5]?.INTERFACE)}
                      </td>
                      <td>{renderTickCross(item?.activities2?.[5]?.KMS)}</td>
                      <td>{renderTickCross(item?.activities2?.[5]?.AD)}</td>
                      <td>{renderTickCross(item?.activities2?.[5]?.BIM)}</td>

                      <td>{value2?.[5]?.remark}</td>
                      <td>{value2?.[5]?.action}</td>
                      <td colspan={8}>{value2?.[5]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td rowSpan={4} colspan={3}>
                        Staff on Duty
                      </td>
                      <td className="text-start">Name</td>
                      <td className="text-start" colspan={5}>
                        Desg
                      </td>
                      <td className="text-start" colSpan={5}>
                        {" "}
                        ID
                      </td>
                    </tr>
                    <tr>
                      <td>{item.staff1_name}</td>
                      <td colspan={5}>{item.staff1_desg}</td>
                      <td colSpan={5}>{item.staff1_sign}</td>
                    </tr>
                    <tr>
                      <td>{item.staff2_name}</td>
                      <td colspan={5}>{item.staff2_desg}</td>
                      <td colSpan={5}>{item.staff2_sign}</td>
                    </tr>
                    <tr>
                      <td>{item.staff3_name}</td>
                      <td colspan={5}>{item.staff3_desg}</td>
                      <td colSpan={5}>{item.staff3_sign}</td>
                    </tr>
                  </tbody>
                </table>
                <td className="d-flex gap-3 mt-3   justify-content-end">
                  {item.status == "0" ? (
                    <div className="d-flex ">
                      <Link
                        to={`/edit/${slug}`}
                        state={{ id: item.id }}
                        className="btn btn-primary align-content-center mx-3"
                      >
                        Edit
                      </Link>
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
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PMLogBookListSDC;
