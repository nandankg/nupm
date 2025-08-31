import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { addAfcpreventive, fetchData, saveData } from "../../reducer/isha/PREVENTIVEMAINTENACE_CC_CCHSReducer";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
const PREVENTIVEMAINTENACE_CC_CCHSTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: " AfcPrevenPREVENTIVEMAINTENACE_CC_CCHS_Table.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const afcpreventive = useSelector((state) => state.PMLOGBOOK9);
  const [slug, setSlug] = useState("");
  const itmm = afcpreventive.data.data;

  useEffect(() => {
    dispatch(fetchData());
    setSlug(afcpreventive.slug);
  }, [dispatch]);

  let filteredData;

  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" >
              PREVENTIVE MAINTENACE WORKSHEET OF CC/CCHS  WORKSTATIONS, CC BIM,TIM & CPD ( HALF YEARLY)
            </Link>
            <Link underline="hover" color="inherit" >
              Table
            </Link>
          </Breadcrumbs>
          <div className="d-flex align-items-center gap-3">

<div className="d-flex gap-3">
  <Link to="">
    {/*button className="btn btn-primary">
    <FaFilter />
  </button> */ }
  </Link>
  <DownloadTableExcel
    filename="PREVENTIVEMAINTENACE_CC_CCHS_Table"
    sheet="PREVENTIVEMAINTENACE_CC_CCHS_Table"
    currentTableRef={tableRef.current}
  >
    <button className="btn " style={{ border: "1px solid #0baa9a " }}>
      <RiFileExcel2Fill color="#0baa9a " size={25} />
    </button>
  </DownloadTableExcel>
  <button className="btn" onClick={() => toPDF()} style={{ border: "1px solid #0baa9a", }}>
    <MdPictureAsPdf size={"25px"} color="#850d04" />
  </button>
</div>
</div>
<div ref={targetRef}>
          <h3>  PREVENTIVE MAINTENACE WORKSHEET OF CC/CCHS WORKSTATIONS,CC BIM,TIM & CPD</h3>
          <span className="line-box" style={{ width: "100%" }}></span>
        
        <div className="d-flex justify-content-between">


          </div>
        
          <table ref={(tableRef)}>
            {filteredData?.map((item, index) => {
              const value = item?.activities1;
              return (
                <>

                  <thead>

                    <tr>
                      <th className="text-start" colspan="2" style={{ textAlign: "left" }}>
                        DATE: {item?.date}
                      </th>
                      <th className="text-start" colspan="4">
                        Station NAME: {item?.station}{" "}
                      </th>
                      <th className="text-start" colspan="4">
                        
                      Annexure: B 
                      </th>
                      <th className="text-start" colspan="4">
                      DOCUMENT: O&M/AFC/OCC/SDC/CH02 
                      </th>
                      <th className="text-start" colspan="4">
                      Ref:O&M/TELE-AFC/SOP/02
                      </th>
                    </tr>

                    <tr>
                      <th rowspan="2">Sr. No.</th>
                      <th rowspan="2">Activity</th>
                      <th rowspan="2">DESCRIPTION OF WORK</th>
                      <th colspan="10">CC/CCHS</th>
                      <th rowspan="2">REMARKS/ DEFICIENCIES</th>
                      <th rowspan="2">ACTION TAKEN</th>
                      <th rowspan="2">WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
                    </tr>
                    <tr style={{fontSize:8}}>
                    
                      <th>CCWS-1</th>
                      <th>CCWS-2</th>
                      <th>CCWS-3</th>
                      <th>CCWS-4</th>
                      <th>CCWS-5</th>
                      <th>CCWS-6</th>
                      <th>CCWS-7</th>
                      <th>CCHSWS-1</th>
                      <th>CCHSWS-2</th>
                      <th>CCHSWS-3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <td>1</td>
                      <td rowSpan={2}>Visual Inspection</td>
                      <td className="text-start">
                        Check Date and Time
                      </td>

                      <td>{value?.[0]?.CC1}</td>
                      <td>{value?.[0]?.CC2}</td>
                      <td>{value?.[0]?.CC3}</td>
                      <td>{value?.[0]?.CC4}</td>
                      <td>{value?.[0]?.CC5}</td>
                      <td>{value?.[0]?.CC6}</td>
                      <td>{value?.[0]?.CC7}</td>
                      <td>{value?.[0]?.CCH1}</td>
                      <td>{value?.[0]?.CCH2}</td>
                      <td>{value?.[0]?.CCH3}</td>
                      <td>{value?.[0]?.remark}</td>
                      <td>{value?.[0]?.action}</td>
                      <td>{value?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>

                      <td className="text-start">
                        Check Physical condition of all connecting cables and their dressing
                      </td>
                      <td>{value?.[1]?.CC1}</td>
                      <td>{value?.[1]?.CC2}</td>
                      <td>{value?.[1]?.CC3}</td>
                      <td>{value?.[1]?.CC4}</td>
                      <td>{value?.[1]?.CC5}</td>
                      <td>{value?.[1]?.CC6}</td>
                      <td>{value?.[1]?.CC7}</td>
                      <td>{value?.[1]?.CCH1}</td>
                      <td>{value?.[1]?.CCH2}</td>
                      <td>{value?.[1]?.CCH3}</td>
                      <td>{value?.[1]?.remark}</td>
                      <td>{value?.[1]?.action}</td>
                      <td>{value?.[1]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td rowSpan={2}>Cleaning </td>
                      <td className="text-start">
                        Cleaning of  WS CPU (interior & exterior)
                      </td>
                      <td>{value?.[2]?.CC1}</td>
                      <td>{value?.[2]?.CC2}</td>
                      <td>{value?.[2]?.CC3}</td>
                      <td>{value?.[2]?.CC4}</td>
                      <td>{value?.[2]?.CC5}</td>
                      <td>{value?.[2]?.CC6}</td>
                      <td>{value?.[2]?.CC7}</td>
                      <td>{value?.[2]?.CCH1}</td>
                      <td>{value?.[2]?.CCH2}</td>
                      <td>{value?.[2]?.CCH3}</td>
                      <td>{value?.[2]?.remark}</td>
                      <td>{value?.[2]?.action}</td>
                      <td>{value?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="text-start">
                        Cleaning and checking of sub modules of WS ( Keyboard and Mouse etc)
                      </td>
                      <td>{value?.[3]?.CC1}</td>
                      <td>{value?.[3]?.CC2}</td>
                      <td>{value?.[3]?.CC3}</td>
                      <td>{value?.[3]?.CC4}</td>
                      <td>{value?.[3]?.CC5}</td>
                      <td>{value?.[3]?.CC6}</td>
                      <td>{value?.[3]?.CC7}</td>
                      <td>{value?.[3]?.CCH1}</td>
                      <td>{value?.[3]?.CCH2}</td>
                      <td>{value?.[3]?.CCH3}</td>
                      <td>{value?.[3]?.remark}</td>
                      <td>{value?.[3]?.action}</td>
                      <td>{value?.[3]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td rowSpan={4}>Module Test (Maintenance Menu) </td>
                      <td className="text-start">
                        Check if all equipments are on LAN
                      </td>
                      <td>{value?.[4]?.CC1}</td>
                      <td>{value?.[4]?.CC2}</td>
                      <td>{value?.[4]?.CC3}</td>
                      <td>{value?.[4]?.CC4}</td>
                      <td>{value?.[4]?.CC5}</td>
                      <td>{value?.[4]?.CC6}</td>
                      <td>{value?.[4]?.CC7}</td>
                      <td>{value?.[4]?.CCH1}</td>
                      <td>{value?.[4]?.CCH2}</td>
                      <td>{value?.[4]?.CCH3}</td>
                      <td>{value?.[4]?.remark}</td>
                      <td>{value?.[4]?.action}</td>
                      <td>{value?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="text-start">
                        Check if Fare on client and their sub modules are working
                      </td>
                      <td>{value?.[5]?.CC1}</td>
                      <td>{value?.[5]?.CC2}</td>
                      <td>{value?.[5]?.CC3}</td>
                      <td>{value?.[5]?.CC4}</td>
                      <td>{value?.[5]?.CC5}</td>
                      <td>{value?.[5]?.CC6}</td>
                      <td>{value?.[5]?.CC7}</td>
                      <td>{value?.[5]?.CCH1}</td>
                      <td>{value?.[5]?.CCH2}</td>
                      <td>{value?.[5]?.CCH3}</td>
                      <td>{value?.[5]?.remark}</td>
                      <td>{value?.[5]?.action}</td>
                      <td>{value?.[5]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="text-start">Check if task scheduler are working ( where it is applicable) </td>
                      <td>{value?.[6]?.CC1}</td>
                      <td>{value?.[6]?.CC2}</td>
                      <td>{value?.[6]?.CC3}</td>
                      <td>{value?.[6]?.CC4}</td>
                      <td>{value?.[6]?.CC5}</td>
                      <td>{value?.[6]?.CC6}</td>
                      <td>{value?.[6]?.CC7}</td>
                      <td>{value?.[6]?.CCH1}</td>
                      <td>{value?.[6]?.CCH2}</td>
                      <td>{value?.[6]?.CCH3}</td>
                      <td>{value?.[6]?.remark}</td>
                      <td>{value?.[6]?.action}</td>
                      <td>{value?.[6]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="text-start">
                        Check if ping services are working (where it is applicable)
                      </td>
                      <td>{value?.[7]?.CC1}</td>
                      <td>{value?.[7]?.CC2}</td>
                      <td>{value?.[7]?.CC3}</td>
                      <td>{value?.[7]?.CC4}</td>
                      <td>{value?.[7]?.CC5}</td>
                      <td>{value?.[7]?.CC6}</td>
                      <td>{value?.[7]?.CC7}</td>
                      <td>{value?.[7]?.CCH1}</td>
                      <td>{value?.[7]?.CCH2}</td>
                      <td>{value?.[7]?.CCH3}</td>
                      <td>{value?.[7]?.remark}</td>
                      <td>{value?.[7]?.action}</td>
                      <td>{value?.[7]?.deficiency}</td>
                    </tr>
                  </tbody>
                  
                </>
                
              );
            })}

            {filteredData?.map((item, indexs) => {
              const value = item?.activities2;
              return (
                <>
<tr></tr>
                  <thead>
                    <tr>
                      <th rowspan="1">Sr. No.</th>
                      <th rowspan="1">Activity</th>
                      <th rowspan="1">DESCRIPTION OF WORK</th>
                      <th colspan="4"></th>
                      <th className="text-start" colspan="5">REMARKS/ DEFICIENCIES</th>
                      <th className="text-start" colspan="2">ACTION TAKEN</th>
                      <th className="text-start" colspan="2">WHY DEFICIENCY COULD NOT BE RECTIFIED</th>
                    </tr>
                    <tr style={{fontSize:6}}>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>CC BIM-1</th>
                      <th>CC BIM-2</th>
                      <th>CC TIM</th>
                      <th>CPD</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td rowSpan={3}>Visual Inspection</td>
                      <td className="text-start">
                        Check Date and Time
                      </td>

                      <td>{value?.[0]?.C1}</td>
                      <td>{value?.[0]?.C2}</td>
                      <td>{value?.[0]?.C3}</td>
                      <td>{value?.[0]?.C4}</td>
                      <td className="text-start" colspan="5">{value?.[0]?.remarks}</td>
                      <td className="text-start" colspan="2">{value?.[0]?.actions}</td>
                      <td className="text-start" colspan="2">{value?.[0]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>2</td>

                      <td className="text-start">
                        Check Physical condition of all connecting cables and their dressing
                      </td>
                      <td>{value?.[1]?.C1}</td>
                      <td>{value?.[1]?.C2}</td>
                      <td>{value?.[1]?.C3}</td>
                      <td>{value?.[1]?.C4}</td>
                      <td className="text-start" colspan="5">{value?.[1]?.remarks}</td>
                      <td className="text-start" colspan="2">{value?.[1]?.actions}</td>
                      <td className="text-start" colspan="2">{value?.[1]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start">
                        Fixing & Alignment of all modules of BIM,TIM (belt, roller, stacker, hopper etc)
                      </td>
                      <td>{value?.[2]?.C1}</td>
                      <td>{value?.[2]?.C2}</td>
                      <td>{value?.[2]?.C3}</td>
                      <td>{value?.[2]?.C4}</td>
                      <td className="text-start" colspan="5">{value?.[2]?.remarks}</td>
                      <td className="text-start" colspan="2">{value?.[2]?.actions}</td>
                      <td className="text-start" colspan="2">{value?.[2]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td rowSpan={2}> Cleaning</td>
                      <td className="text-start">
                        Cleaning of  CPU (interior & exterior)
                      </td>
                      <td>{value?.[3]?.C1}</td>
                      <td>{value?.[3]?.C2}</td>
                      <td>{value?.[3]?.C3}</td>
                      <td>{value?.[3]?.C4}</td>
                      <td className="text-start" colspan="5">{value?.[3]?.remarks}</td>
                      <td className="text-start" colspan="2">{value?.[3]?.actions}</td>
                      <td className="text-start" colspan="2">{value?.[3]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>5</td>

                      <td className="text-start">
                        Cleaning and checking of sub modules ( BIM device , CPD device, TDM, Keyboard and Mouse etc)
                      </td>
                      <td>{value?.[4]?.C1}</td>
                      <td>{value?.[4]?.C2}</td>
                      <td>{value?.[4]?.C3}</td>
                      <td>{value?.[4]?.C4}</td>
                      <td className="text-start" colspan="5">{value?.[4]?.remarks}</td>
                      <td className="text-start" colspan="2">{value?.[4]?.actions}</td>
                      <td className="text-start" colspan="2">{value?.[4]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td rowSpan={4}> Module Test (Maintenance Menu) </td>
                      <td className="text-start">
                        Check if all equipments are on LAN
                      </td>
                      <td>{value?.[5]?.C1}</td>
                      <td>{value?.[5]?.C2}</td>
                      <td>{value?.[5]?.C3}</td>
                      <td>{value?.[5]?.C4}</td>
                      <td className="text-start" colspan="5">{value?.[5]?.remarks}</td>
                      <td className="text-start" colspan="2">{value?.[5]?.actions}</td>
                      <td className="text-start" colspan="2">{value?.[5]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>7</td>

                      <td className="text-start">
                        Check if FareON client and their sub modules are working
                      </td>
                      <td>{value?.[6]?.C1}</td>
                      <td>{value?.[6]?.C2}</td>
                      <td>{value?.[6]?.C3}</td>
                      <td>{value?.[6]?.C4}</td>
                      <td className="text-start" colspan="5">{value?.[6]?.remarks}</td>
                      <td className="text-start" colspan="2">{value?.[6]?.actions}</td>
                      <td className="text-start" colspan="2">{value?.[6]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>8</td>

                      <td className="text-start">
                        Test the functionality of the devices
                      </td>
                      <td>{value?.[7]?.C1}</td>
                      <td>{value?.[7]?.C2}</td>
                      <td>{value?.[7]?.C3}</td>
                      <td>{value?.[7]?.C4}</td>
                      <td className="text-start" colspan="5">{value?.[7]?.remarks}</td>
                      <td className="text-start" colspan="2">{value?.[7]?.actions}</td>
                      <td className="text-start" colspan="2">{value?.[7]?.deficiency1}</td>
                    </tr>
                    <tr>
                      <td>9</td>

                      <td className="text-start">
                        Check if external CRW is working
                      </td>
                      <td>{value?.[8]?.C1}</td>
                      <td>{value?.[8]?.C2}</td>
                      <td>{value?.[8]?.C3}</td>
                      <td>{value?.[8]?.C4}</td>
                      <td className="text-start" colspan="5">{value?.[8]?.remarks}</td>
                      <td className="text-start" colspan="2">{value?.[8]?.actions}</td>
                      <td className="text-start" colspan="2">{value?.[8]?.deficiency1}</td>
                    </tr>
                    <tr>
                    <td rowSpan={4} colspan={3}>
                     
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
                  <tr></tr>

                  <tr>
                    <td className=" " colSpan={16}>
                    {item.status === "0" || user.role === "Admin" ? (
                    <div className="d-flex gap-2 align-items-center">
                      <Link to={`/edit/pm-logbook-workstations-half-yearly-sdc`}
                        state={{ id: item.id }}
                        className="btn align-content-center"
                        style={{ width: "100px", height: "50px", textAlign: "center", backgroundColor: "#f4d03f", color: "black", fontSize: "20px" }}
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        onClick={() => {
                          handleSave(item.id);
                        }}
                        className="btn btn-primary"
                        style={{ width: "100px", height: "50px", textAlign: "center", fontSize: "18px" }}
                      >
                        Submit
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                </>
              );
            })}


          </table >
        </div>
        </div>
      </div >

    </>
  );
};

export default PREVENTIVEMAINTENACE_CC_CCHSTable;
