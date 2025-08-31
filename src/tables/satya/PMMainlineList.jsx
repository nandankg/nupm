import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import {
  addPM,
  fetchData,
  saveData,
} from "../../reducer/satya/PMMainlineReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";

const user = JSON.parse(localStorage.getItem("userdata"));
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const PMMainlineList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "AFC PREVENTIVE MAINTENANCE CHECKLIST (MONTHLY) (ANNEXURE-A).pdf",
  });
  const pmmainline = useSelector((state) => state.mainline);
  const [slug, setSlug] = useState(getLastParameter().trim());

  const itmm = pmmainline.data.data;

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
              AFC Preventive Maintenance (Monthly)
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3>AFC PREVENTIVE MAINTENANCE CHECKLIST (MONTHLY) (ANNEXURE-A)</h3>
        <span className="line-box"></span>
        <div className="d-flex gap-3">
          <DownloadTableExcel
            filename="AFC PREVENTIVE MAINTENANCE CHECKLIST (MONTHLY) (ANNEXURE-A) table"
            sheet="AFC PREVENTIVE MAINTENANCE CHECKLIST (MONTHLY) (ANNEXURE-A)"
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
            {filteredItems?.toReversed().map((item, index) => {
              const value = item?.activities1;
              return (
                <div key={item.id}>
                  <thead>
                    <tr>
                      <th className="text-start" colspan="3">
                        STN. NAME: {item?.stn_name}{" "}
                      </th>
                      <th className="text-start" colspan="1">
                        FREQUENCY: MONTHLY
                      </th>
                      <th className="text-start" colspan="4">
                        DATE: {item?.date}
                      </th>
                      <th className="text-start" colspan="2">
                        MONTH: {item?.month}
                      </th>
                      <th className="text-start" colspan="1">
                        Emp. Id: {item?.employee_id}
                      </th>
                      <th className="text-start" colspan="2">
                        Department: {item?.department}
                      </th>
                    </tr>
                    <tr>
                      <th rowspan="6">Equipment</th>
                      <th rowspan="2">Sr. No.</th>
                      <th rowspan="2">Activity</th>
                      <th rowspan="2">DESCRIPTION OF WORK</th>
                      <th colspan="6">SC</th>
                      <th rowspan="2">REMARKS/ DEFICIENCIES</th>
                      <th rowspan="2">ACTION TAKEN</th>
                      <th rowspan="2">WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
                    </tr>
                    <tr>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>6</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        rowSpan={7}
                        style={{
                          writingMode: "vertical-lr",
                          textAlign: "center",
                        }}
                      ></td>
                      <td>1</td>
                      <td rowSpan={3}>Visual Inspection</td>
                      <td className="text-start">
                        Check Fixing & Alignment of all modules of SC
                      </td>

                      <td>{value?.[0]?.SC1}</td>
                      <td>{value?.[0]?.SC2}</td>
                      <td>{value?.[0]?.SC3}</td>
                      <td>{value?.[0]?.SC4}</td>
                      <td>{value?.[0]?.SC5}</td>
                      <td>{value?.[0]?.SC6}</td>
                      <td>{value?.[0]?.remark}</td>
                      <td>{value?.[0]?.action}</td>
                      <td>{value?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>
                      <td>{value?.[1]?.SC1}</td>
                      <td>{value?.[1]?.SC2}</td>
                      <td>{value?.[1]?.SC3}</td>
                      <td>{value?.[1]?.SC4}</td>
                      <td>{value?.[1]?.SC5}</td>
                      <td>{value?.[1]?.SC6}</td>
                      <td>{value?.[1]?.remark}</td>
                      <td>{value?.[1]?.action}</td>
                      <td>{value?.[1]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>3</td>
                      <td className="text-start">Check Date and Time</td>
                      <td>{value?.[2]?.SC1}</td>
                      <td>{value?.[2]?.SC2}</td>
                      <td>{value?.[2]?.SC3}</td>
                      <td>{value?.[2]?.SC4}</td>
                      <td>{value?.[2]?.SC5}</td>
                      <td>{value?.[2]?.SC6}</td>
                      <td>{value?.[2]?.remark}</td>
                      <td>{value?.[2]?.action}</td>
                      <td>{value?.[2]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>4</td>
                      <td rowSpan={3}>Cleaning</td>
                      <td className="text-start">
                        External cleaning of all modules of SC
                      </td>
                      <td>{value?.[3]?.SC1}</td>
                      <td>{value?.[3]?.SC2}</td>
                      <td>{value?.[3]?.SC3}</td>
                      <td>{value?.[3]?.SC4}</td>
                      <td>{value?.[3]?.SC5}</td>
                      <td>{value?.[3]?.SC6}</td>
                      <td>{value?.[3]?.remark}</td>
                      <td>{value?.[3]?.action}</td>
                      <td>{value?.[3]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>5</td>
                      <td className="text-start">
                        Check working of redundant power supply of SC server
                      </td>
                      <td>{value?.[4]?.SC1}</td>
                      <td>{value?.[4]?.SC2}</td>
                      <td>{value?.[4]?.SC3}</td>
                      <td>{value?.[4]?.SC4}</td>
                      <td>{value?.[4]?.SC5}</td>
                      <td>{value?.[4]?.SC5}</td>
                      <td>{value?.[4]?.remark}</td>
                      <td>{value?.[4]?.action}</td>
                      <td>{value?.[4]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>6</td>
                      <td className="text-start">
                        Test different modes in device manager by applying and
                        releasing on equipments
                      </td>
                      <td>{value?.[5]?.SC1}</td>
                      <td>{value?.[5]?.SC2}</td>
                      <td>{value?.[5]?.SC3}</td>
                      <td>{value?.[5]?.SC4}</td>
                      <td>{value?.[5]?.SC5}</td>
                      <td>{value?.[5]?.SC6}</td>
                      <td>{value?.[5]?.remark}</td>
                      <td>{value?.[5]?.action}</td>
                      <td>{value?.[5]?.deficiency}</td>
                    </tr>
                  </tbody>
                </div>
              );
            })}

            {filteredItems?.toReversed().map((item, indexs) => {
              const value = item?.activities2;
              return (
                <div key={item.id}>
                  <thead>
                    <tr>
                      <th rowspan="6">Equipment</th>
                      <th rowspan="2">Sr. No.</th>
                      <th rowspan="2">Activity</th>
                      <th rowspan="2">DESCRIPTION OF WORK</th>
                      <th colspan="6">AVM</th>
                      <th rowspan="2">REMARKS/ DEFICIENCIES</th>
                      <th rowspan="2">ACTION TAKEN</th>
                      <th rowspan="2">WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
                    </tr>
                    <tr>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>6</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        rowSpan={9}
                        style={{
                          writingMode: "vertical-lr",
                          textAlign: "center",
                        }}
                      >
                        NETWORK (Ref:O&M/TELE-AFC/S)
                      </td>
                      <td>1</td>
                      <td rowSpan={6}>Visual Inspection</td>
                      <td className="text-start">
                        Check Fixing & Alignment of all modules of Switch Rack
                      </td>

                      <td>{value?.[0]?.AVM1}</td>
                      <td>{value?.[0]?.AVM2}</td>
                      <td>{value?.[0]?.AVM3}</td>
                      <td>{value?.[0]?.AVM4}</td>
                      <td>{value?.[0]?.AVM5}</td>
                      <td>{value?.[0]?.AVM6}</td>
                      <td>{value?.[0]?.remark1}</td>
                      <td>{value?.[0]?.action1}</td>
                      <td>{value?.[0]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>

                      <td>{value?.[1]?.AVM1}</td>
                      <td>{value?.[1]?.AVM2}</td>
                      <td>{value?.[1]?.AVM3}</td>
                      <td>{value?.[1]?.AVM4}</td>
                      <td>{value?.[1]?.AVM5}</td>
                      <td>{value?.[1]?.AVM6}</td>
                      <td>{value?.[1]?.remark1}</td>
                      <td>{value?.[1]?.action1}</td>
                      <td>{value?.[1]?.deficiency1}</td>
                    </tr>

                    <tr>
                      <td>3</td>
                      <td className="text-start">Check Date and Time</td>

                      <td>{value?.[2]?.AVM1}</td>
                      <td>{value?.[2]?.AVM2}</td>
                      <td>{value?.[2]?.AVM3}</td>
                      <td>{value?.[2]?.AVM4}</td>
                      <td>{value?.[2]?.AVM5}</td>
                      <td>{value?.[2]?.AVM6}</td>
                      <td>{value?.[2]?.remark1}</td>
                      <td>{value?.[2]?.action1}</td>
                      <td>{value?.[2]?.deficiency1}</td>
                    </tr>

                    <tr>
                      <td>4</td>
                      <td className="text-start">Check Station ID</td>

                      <td>{value?.[3]?.AVM1}</td>
                      <td>{value?.[3]?.AVM2}</td>
                      <td>{value?.[3]?.AVM3}</td>
                      <td>{value?.[3]?.AVM4}</td>
                      <td>{value?.[3].AVM5}</td>
                      <td>{value?.[3]?.AVM6}</td>
                      <td>{value?.[3]?.remark1}</td>
                      <td>{value?.[3]?.action1}</td>
                      <td>{value?.[3]?.deficiency1}</td>
                    </tr>

                    <tr>
                      <td>5</td>
                      <td className="text-start">Check Device ID</td>

                      <td>{value?.[4]?.AVM1}</td>
                      <td>{value?.[4]?.AVM2}</td>
                      <td>{value?.[4]?.AVM3}</td>
                      <td>{value?.[4]?.AVM4}</td>
                      <td>{value?.[4]?.AVM5}</td>
                      <td>{value?.[4]?.AVM6}</td>
                      <td>{value?.[4]?.remark1}</td>
                      <td>{value?.[4]?.action1}</td>
                      <td>{value?.[4]?.deficiency1}</td>
                    </tr>

                    <tr>
                      <td>6</td>
                      <td className="text-start">
                        "Check Lubrication of all locks with silicone oil",
                      </td>

                      <td>{value?.[5]?.AVM1}</td>
                      <td>{value?.[5]?.AVM2}</td>
                      <td>{value?.[5]?.AVM3}</td>
                      <td>{value?.[5]?.AVM4}</td>
                      <td>{value?.[5]?.AVM5}</td>
                      <td>{value?.[5]?.AVM6}</td>
                      <td>{value?.[5]?.remark1}</td>
                      <td>{value?.[5]?.action1}</td>
                      <td>{value?.[5]?.deficiency1}</td>
                    </tr>

                    <tr>
                      <td>7</td>
                      <td rowSpan={3}>Module Test (Maintenance Menu)</td>
                      <td className="text-start">Card Reader Test</td>
                      <td>{value?.[6]?.AVM1}</td>
                      <td>{value?.[6]?.AVM2}</td>
                      <td>{value?.[6]?.AVM3}</td>
                      <td>{value?.[6]?.AVM4}</td>
                      <td>{value?.[6]?.AVM5}</td>
                      <td>{value?.[6]?.AVM6}</td>
                      <td>{value?.[6]?.remark1}</td>
                      <td>{value?.[6]?.action1}</td>
                      <td>{value?.[6]?.deficiency1}</td>
                    </tr>

                    <tr>
                      <td>8</td>
                      <td className="text-start">
                        Passenger Information Display (PID) Test
                      </td>
                      <td>{value?.[7]?.AVM1}</td>
                      <td>{value?.[7]?.AVM2}</td>
                      <td>{value?.[7]?.AVM3}</td>
                      <td>{value?.[7]?.AVM4}</td>
                      <td>{value?.[7]?.AVM5}</td>
                      <td>{value?.[7]?.AVM6}</td>
                      <td>{value?.[7]?.remark1}</td>
                      <td>{value?.[7]?.action1}</td>
                      <td>{value?.[7]?.deficiency1}</td>
                    </tr>

                    <tr>
                      <td>9</td>
                      <td className="text-start">
                        Check LAN Status (Ping Server)
                      </td>
                      <td>{value?.[8]?.AVM1}</td>
                      <td>{value?.[8]?.AVM2}</td>
                      <td>{value?.[8]?.AVM3}</td>
                      <td>{value?.[8]?.AVM4}</td>
                      <td>{value?.[8]?.AVM5}</td>
                      <td>{value?.[8]?.AVM6}</td>
                      <td>{value?.[8]?.remark1}</td>
                      <td>{value?.[8]?.action1}</td>
                      <td>{value?.[8]?.deficiency1}</td>
                    </tr>
                  </tbody>
                </div>
              );
            })}

            {filteredItems?.toReversed().map((item, indexs) => {
              const value = item?.activities3;
              return (
                <div key={item.id}>
                  <thead>
                    <tr>
                      <th rowspan="6">Equipment</th>
                      <th rowspan="2">Sr. No.</th>
                      <th rowspan="2">Activity</th>
                      <th rowspan="2">DESCRIPTION OF WORK</th>
                      <th colspan="6">Switch</th>
                      <th rowspan="2">REMARKS/ DEFICIENCIES</th>
                      <th rowspan="2">ACTION TAKEN</th>
                      <th rowspan="2">WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
                    </tr>
                    <tr>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>6</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        rowSpan={7}
                        style={{
                          writingMode: "vertical-lr",
                          textAlign: "center",
                        }}
                      >
                        NETWORK (Ref:O&M/TELE-AFC/S)
                      </td>
                      <td>1</td>
                      <td rowSpan={3}>Visual Inspection</td>
                      <td className="text-start">
                        Check Fixing & Alignment of all modules of Switch Rack
                      </td>

                      <td>{value?.[0]?.S1}</td>
                      <td>{value?.[0]?.S2}</td>
                      <td>{value?.[0]?.S3}</td>
                      <td>{value?.[0]?.S4}</td>
                      <td>{value?.[0]?.S5}</td>
                      <td>{value?.[0]?.S6}</td>
                      <td>{value?.[0]?.remark2}</td>
                      <td>{value?.[0]?.action2}</td>
                      <td>{value?.[0]?.deficiency2}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>

                      <td>{value?.[1].S1}</td>
                      <td>{value?.[1]?.S2}</td>
                      <td>{value?.[1]?.S3}</td>
                      <td>{value?.[1]?.S4}</td>
                      <td>{value?.[1]?.S5}</td>
                      <td>{value?.[1]?.S6}</td>
                      <td>{value?.[1]?.remark2}</td>
                      <td>{value?.[1]?.action2}</td>
                      <td>{value?.[1]?.deficiency2}</td>
                    </tr>

                    <tr>
                      <td>3</td>
                      <td className="text-start">
                        Check internal fan status of Switches
                      </td>

                      <td>{value?.[2]?.S1}</td>
                      <td>{value?.[2]?.S2}</td>
                      <td>{value?.[2]?.S3}</td>
                      <td>{value?.[2]?.S4}</td>
                      <td>{value?.[2]?.S5}</td>
                      <td>{value?.[2]?.S6}</td>
                      <td>{value?.[2]?.remark2}</td>
                      <td>{value?.[2]?.action2}</td>
                      <td>{value?.[2]?.deficiency2}</td>
                    </tr>

                    <tr>
                      <td>4</td>
                      <td rowSpan={2}>Cleaning</td>
                      <td className="text-start">
                        Cleaning of Switch Rack and its fan
                      </td>

                      <td>{value?.[3]?.S1}</td>
                      <td>{value?.[3]?.S2}</td>
                      <td>{value?.[3]?.S3}</td>
                      <td>{value?.[3]?.S4}</td>
                      <td>{value?.[3]?.S5}</td>
                      <td>{value?.[3]?.S6}</td>
                      <td>{value?.[3]?.remark2}</td>
                      <td>{value?.[3]?.action2}</td>
                      <td>{value?.[3]?.deficiency2}</td>
                    </tr>

                    <tr>
                      <td>5</td>
                      <td className="text-start">
                        External cleaning of Switch
                      </td>

                      <td>{value?.[4]?.S1}</td>
                      <td>{value?.[4]?.S2}</td>
                      <td>{value?.[4]?.S3}</td>
                      <td>{value?.[4]?.S4}</td>
                      <td>{value?.[4]?.S5}</td>
                      <td>{value?.[4]?.S6}</td>
                      <td>{value?.[4]?.remark2}</td>
                      <td>{value?.[4]?.action2}</td>
                      <td>{value?.[4]?.deficiency2}</td>
                    </tr>

                    <tr>
                      <td>6</td>
                      <td rowSpan={2}>Module Test</td>
                      <td className="text-start">Test of redundant link</td>
                      <td>{value?.[5]?.S1}</td>
                      <td>{value?.[5]?.S2}</td>
                      <td>{value?.[5]?.S3}</td>
                      <td>{value?.[5]?.S4}</td>
                      <td>{value?.[5]?.S5}</td>
                      <td>{value?.[5]?.S6}</td>
                      <td>{value?.[5]?.remark2}</td>
                      <td>{value?.[5]?.action2}</td>
                      <td>{value?.[5]?.deficiency2}</td>
                    </tr>

                    <tr>
                      <td>7</td>
                      <td className="text-start">
                        Check if Switches are working normal and all equipments
                        are on LAN
                      </td>
                      <td>{value?.[6]?.S1}</td>
                      <td>{value?.[6]?.S2}</td>
                      <td>{value?.[6]?.S3}</td>
                      <td>{value?.[6]?.S4}</td>
                      <td>{value?.[6]?.S5}</td>
                      <td>{value?.[6]?.S6}</td>
                      <td>{value?.[6]?.remark2}</td>
                      <td>{value?.[6]?.action2}</td>
                      <td>{value?.[6]?.deficiency2}</td>
                    </tr>
                    <tr>
                      <th rowSpan={4} colspan={4}>
                        Staff on Duty
                      </th>
                      <th colspan={7}>Name</th>
                      <th colspan={2}>Designation</th>
                    </tr>
                    <tr>
                      <td colspan={7}>{item.staff1_name}</td>
                      <td colspan={2}>{item.staff1_desg}</td>
                    </tr>
                    <tr>
                      <td colspan={7}>{item.staff2_name}</td>
                      <td colspan={2}>{item.staff2_desg}</td>
                    </tr>
                    <tr>
                      <td colspan={7}>{item.staff3_name}</td>
                      <td colspan={2}>{item.staff3_desg}</td>
                    </tr>
                  </tbody>
                  <td className=" ">
                    {item.status === "0" && user.role == "Admin" ? (
                      <div className="d-flex gap-2 align-items-center">
                        <Link
                          to={`/edit/pm-logbook-monthly-other-mainline`}
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

export default PMMainlineList;
