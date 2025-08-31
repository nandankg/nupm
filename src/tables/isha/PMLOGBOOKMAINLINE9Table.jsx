import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { fetchData, saveData } from "../../reducer/isha/PMLBM9REducer";
const PMLOGBOOKMAINLINE9Table = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: " PMLOGBOOKMAINLINE9_List.pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const afcpreventive = useSelector((state) => state.PMbm9);
  const [slug, setSlug] = useState("");
  const itmm = afcpreventive.data.data;

  useEffect(() => {
    dispatch(fetchData());
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
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 1000)
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              AFC PREVENTIVE MAINTENANCE CHECKLIST (HALF YEARLY)
            </Link>
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              
            </Link>
          </Breadcrumbs>
        </div>
        <h3>
          {" "}
          AFC PREVENTIVE MAINTENANCE CHECKLIST (HALF YEARLY) (ANNEXURE-B)
        </h3>
        <span className="line-box" style={{ width: "900px" }}></span>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-3">
              <Link to="">
                {/*button className="btn btn-primary">
                <FaFilter />
              </button> */}
              </Link>
              <DownloadTableExcel
                filename=" PMLOGBOOKMAINLINE9_List"
                sheet=" PMLOGBOOKMAINLINE9_List"
                currentTableRef={tableRef.current}
              >
                <button
                  className="btn "
                  style={{ border: "1px solid #0baa9a " }}
                >
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
        </div>

        <div ref={targetRef}>
          <table ref={tableRef}>
            {filteredData?.map((item, index) => {
              const value = item?.activities;
              return (
                <>
                  <thead>
                    <tr>
                      <th colSpan="20">
                        AFC PREVENTIVE MAINTENANCE CHECKLIST (HALF YEARLY)
                        (ANNEXURE-B)
                      </th>
                    </tr>
                    <tr>
                      <th></th>
                      <th className="text-start" colspan="3">
                        STN. NAME: {item?.station}{" "}
                      </th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>DATE: {item?.date}</th>
                    </tr>
                    <tr>
                      <th rowspan="2">Sr. No.</th>
                      <th rowspan="2">Activity</th>
                      <th rowspan="2">DESCRIPTION OF WORK</th>
                      <th colspan="5">TVM</th>
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td rowSpan={10}>Visual Inspection</td>
                      <td className="text-start">
                        Check Fixing & Alignment of all modules of TVM
                      </td>

                      <td>{value?.[0]?.T1}</td>
                      <td>{value?.[0]?.T2}</td>
                      <td>{value?.[0]?.T3}</td>
                      <td>{value?.[0]?.T4}</td>
                      <td>{value?.[0]?.T5}</td>
                      <td>{value?.[0]?.remark}</td>
                      <td>{value?.[0]?.action}</td>
                      <td>{value?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>

                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>
                      <td>{value?.[1]?.T1}</td>
                      <td>{value?.[1]?.T2}</td>
                      <td>{value?.[1]?.T3}</td>
                      <td>{value?.[1]?.T4}</td>
                      <td>{value?.[1]?.T5}</td>
                      <td>{value?.[1]?.remark}</td>
                      <td>{value?.[1]?.action}</td>
                      <td>{value?.[1]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start">
                        Checking Silicon sealing of TVM Cabinet
                      </td>
                      <td>{value?.[2]?.T1}</td>
                      <td>{value?.[2]?.T2}</td>
                      <td>{value?.[2]?.T3}</td>
                      <td>{value?.[2]?.T4}</td>
                      <td>{value?.[2]?.T5}</td>
                      <td>{value?.[2]?.remark}</td>
                      <td>{value?.[2]?.action}</td>
                      <td>{value?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="text-start">
                        Checking of any opening inside TVM cabinet
                      </td>
                      <td>{value?.[3]?.T1}</td>
                      <td>{value?.[3]?.T2}</td>
                      <td>{value?.[3]?.T3}</td>
                      <td>{value?.[3]?.T4}</td>
                      <td>{value?.[3]?.T5}</td>
                      <td>{value?.[3]?.remark}</td>
                      <td>{value?.[3]?.action}</td>
                      <td>{value?.[3]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="text-start">
                        Checking of Power Supply and Battery
                      </td>
                      <td>{value?.[4]?.T1}</td>
                      <td>{value?.[4]?.T2}</td>
                      <td>{value?.[4]?.T3}</td>
                      <td>{value?.[4]?.T4}</td>
                      <td>{value?.[4]?.T5}</td>
                      <td>{value?.[4]?.remark}</td>
                      <td>{value?.[4]?.action}</td>
                      <td>{value?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="text-start">Check Station ID</td>
                      <td>{value?.[5]?.T1}</td>
                      <td>{value?.[5]?.T2}</td>
                      <td>{value?.[5]?.T3}</td>
                      <td>{value?.[5]?.T4}</td>
                      <td>{value?.[5]?.T5}</td>
                      <td>{value?.[5]?.remark}</td>
                      <td>{value?.[5]?.action}</td>
                      <td>{value?.[5]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="text-start">Check Device ID</td>
                      <td>{value?.[6]?.T1}</td>
                      <td>{value?.[6]?.T2}</td>
                      <td>{value?.[6]?.T3}</td>
                      <td>{value?.[6]?.T4}</td>
                      <td>{value?.[6]?.T5}</td>
                      <td>{value?.[6]?.remark}</td>
                      <td>{value?.[6]?.action}</td>
                      <td>{value?.[6]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="text-start">Check Date and Time</td>
                      <td>{value?.[7]?.T1}</td>
                      <td>{value?.[7]?.T2}</td>
                      <td>{value?.[7]?.T3}</td>
                      <td>{value?.[7]?.T4}</td>
                      <td>{value?.[7]?.T5}</td>
                      <td>{value?.[7]?.remark}</td>
                      <td>{value?.[7]?.action}</td>
                      <td>{value?.[7]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="text-start">
                        Check Passenger Information Display (PID)
                      </td>
                      <td>{value?.[8]?.T1}</td>
                      <td>{value?.[8]?.T2}</td>
                      <td>{value?.[8]?.T3}</td>
                      <td>{value?.[8]?.T4}</td>
                      <td>{value?.[8]?.T5}</td>
                      <td>{value?.[8]?.remark}</td>
                      <td>{value?.[8]?.action}</td>
                      <td>{value?.[8]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td className="text-start">
                        Check Lubrication of all locks with silicone oil
                      </td>
                      <td>{value?.[9]?.T1}</td>
                      <td>{value?.[9]?.T2}</td>
                      <td>{value?.[9]?.T3}</td>
                      <td>{value?.[9]?.T4}</td>
                      <td>{value?.[9]?.T5}</td>
                      <td>{value?.[9]?.remark}</td>
                      <td>{value?.[9]?.action}</td>
                      <td>{value?.[9]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td rowSpan={13}> Cleaning</td>
                      <td className="text-start">
                        Cleaning of all modules of TVM
                      </td>
                      <td>{value?.[10]?.T1}</td>
                      <td>{value?.[10]?.T2}</td>
                      <td>{value?.[10]?.T3}</td>
                      <td>{value?.[10]?.T4}</td>
                      <td>{value?.[10]?.T5}</td>
                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td className="text-start">
                        Cleaning of lexan covering board of display
                      </td>
                      <td>{value?.[11]?.T1}</td>
                      <td>{value?.[11]?.T2}</td>
                      <td>{value?.[11]?.T3}</td>
                      <td>{value?.[11]?.T4}</td>
                      <td>{value?.[11]?.T5}</td>
                      <td>{value?.[11]?.remark}</td>
                      <td>{value?.[11]?.action}</td>
                      <td>{value?.[11]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td className="text-start">
                        Cleaning of Coin hopper opto sensor
                      </td>
                      <td>{value?.[12]?.T1}</td>
                      <td>{value?.[12]?.T2}</td>
                      <td>{value?.[12]?.T3}</td>
                      <td>{value?.[12]?.T4}</td>
                      <td>{value?.[12]?.T5}</td>
                      <td>{value?.[12]?.remark}</td>
                      <td>{value?.[12]?.action}</td>
                      <td>{value?.[12]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td className="text-start">Cleaning of Cooling fans</td>
                      <td>{value?.[13]?.T1}</td>
                      <td>{value?.[13]?.T2}</td>
                      <td>{value?.[13]?.T3}</td>
                      <td>{value?.[13]?.T4}</td>
                      <td>{value?.[13]?.T5}</td>
                      <td>{value?.[13]?.remark}</td>
                      <td>{value?.[13]?.action}</td>
                      <td>{value?.[13]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td className="text-start">
                        Checking and Cleaning of Cooling fan filter
                      </td>
                      <td>{value?.[14]?.T1}</td>
                      <td>{value?.[14]?.T2}</td>
                      <td>{value?.[14]?.T3}</td>
                      <td>{value?.[14]?.T4}</td>
                      <td>{value?.[14]?.T5}</td>
                      <td>{value?.[14]?.remark}</td>
                      <td>{value?.[14]?.action}</td>
                      <td>{value?.[14]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>16</td>
                      <td className="text-start">Cleaning of BNR</td>
                      <td>{value?.[15]?.T1}</td>
                      <td>{value?.[15]?.T2}</td>
                      <td>{value?.[15]?.T3}</td>
                      <td>{value?.[15]?.T4}</td>
                      <td>{value?.[15]?.T5}</td>
                      <td>{value?.[15]?.remark}</td>
                      <td>{value?.[15]?.action}</td>
                      <td>{value?.[15]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>17</td>
                      <td className="text-start">
                        Cleaning of Bank card reader
                      </td>
                      <td>{value?.[16]?.T1}</td>
                      <td>{value?.[16]?.T2}</td>
                      <td>{value?.[16]?.T3}</td>
                      <td>{value?.[16]?.T4}</td>
                      <td>{value?.[16]?.T5}</td>
                      <td>{value?.[16]?.remark}</td>
                      <td>{value?.[16]?.action}</td>
                      <td>{value?.[16]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>18</td>
                      <td className="text-start">
                        Cleaning of BNR maintenance - rollers
                      </td>
                      <td>{value?.[17]?.T1}</td>
                      <td>{value?.[17]?.T2}</td>
                      <td>{value?.[17]?.T3}</td>
                      <td>{value?.[17]?.T4}</td>
                      <td>{value?.[17]?.T5}</td>
                      <td>{value?.[17]?.remark}</td>
                      <td>{value?.[17]?.action}</td>
                      <td>{value?.[17]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>19</td>
                      <td className="text-start">
                        Cleaning of Coin hopper opto senso
                      </td>
                      <td>{value?.[18]?.T1}</td>
                      <td>{value?.[18]?.T2}</td>
                      <td>{value?.[18]?.T3}</td>
                      <td>{value?.[18]?.T4}</td>
                      <td>{value?.[18]?.T5}</td>
                      <td>{value?.[18]?.remark}</td>
                      <td>{value?.[18]?.action}</td>
                      <td>{value?.[18]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>20</td>
                      <td className="text-start">
                        Cleaning of Printer and printer heating head
                      </td>
                      <td>{value?.[19]?.T1}</td>
                      <td>{value?.[19]?.T2}</td>
                      <td>{value?.[19]?.T3}</td>
                      <td>{value?.[19]?.T4}</td>
                      <td>{value?.[19]?.T5}</td>
                      <td>{value?.[19]?.remark}</td>
                      <td>{value?.[19]?.action}</td>
                      <td>{value?.[19]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>21</td>

                      <td className="text-start">Cleaning of Display</td>
                      <td>{value?.[20]?.T1}</td>
                      <td>{value?.[20]?.T2}</td>
                      <td>{value?.[20]?.T3}</td>
                      <td>{value?.[20]?.T4}</td>
                      <td>{value?.[20]?.T5}</td>
                      <td>{value?.[20]?.remark}</td>
                      <td>{value?.[20]?.action}</td>
                      <td>{value?.[20]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>22</td>
                      <td className="text-start">Cleaning of Token hopper</td>
                      <td>{value?.[21]?.T1}</td>
                      <td>{value?.[21]?.T2}</td>
                      <td>{value?.[21]?.T3}</td>
                      <td>{value?.[21]?.T4}</td>
                      <td>{value?.[21]?.T5}</td>
                      <td>{value?.[21]?.remark}</td>
                      <td>{value?.[21]?.action}</td>
                      <td>{value?.[21]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>22a</td>
                      <td className="text-start">Cleaning of Token Sorter</td>
                      <td>{value?.[22]?.T1}</td>
                      <td>{value?.[22]?.T2}</td>
                      <td>{value?.[22]?.T3}</td>
                      <td>{value?.[22]?.T4}</td>
                      <td>{value?.[22]?.T5}</td>
                      <td>{value?.[22]?.remark}</td>
                      <td>{value?.[22]?.action}</td>
                      <td>{value?.[22]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>23</td>
                      <td rowSpan={11}> Module Test(Maintenan ce Menu)</td>
                      <td className="text-start">
                        Check LAN Status (Ping Server)
                      </td>
                      <td>{value?.[23]?.T1}</td>
                      <td>{value?.[23]?.T2}</td>
                      <td>{value?.[23]?.T3}</td>
                      <td>{value?.[23]?.T4}</td>
                      <td>{value?.[23]?.T5}</td>
                      <td>{value?.[23]?.remark}</td>
                      <td>{value?.[23]?.action}</td>
                      <td>{value?.[23]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>24</td>
                      <td className="text-start">Component Status</td>
                      <td>{value?.[24]?.T1}</td>
                      <td>{value?.[24]?.T2}</td>
                      <td>{value?.[24]?.T3}</td>
                      <td>{value?.[24]?.T4}</td>
                      <td>{value?.[24]?.T5}</td>
                      <td>{value?.[24]?.remark}</td>
                      <td>{value?.[24]?.action}</td>
                      <td>{value?.[24]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>25</td>
                      <td className="text-start">Token Dispenser Test</td>
                      <td>{value?.[25]?.T1}</td>
                      <td>{value?.[25]?.T2}</td>
                      <td>{value?.[25]?.T3}</td>
                      <td>{value?.[25]?.T4}</td>
                      <td>{value?.[25]?.T5}</td>
                      <td>{value?.[25]?.remark}</td>
                      <td>{value?.[25]?.action}</td>
                      <td>{value?.[25]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>26</td>
                      <td className="text-start">Bank Note system Test</td>
                      <td>{value?.[26]?.T1}</td>
                      <td>{value?.[26]?.T2}</td>
                      <td>{value?.[26]?.T3}</td>
                      <td>{value?.[26]?.T4}</td>
                      <td>{value?.[26]?.T5}</td>
                      <td>{value?.[26]?.remark}</td>
                      <td>{value?.[26]?.action}</td>
                      <td>{value?.[26]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>27</td>
                      <td className="text-start">Payment Terminal Test</td>
                      <td>{value?.[27]?.T1}</td>
                      <td>{value?.[27]?.T2}</td>
                      <td>{value?.[27]?.T3}</td>
                      <td>{value?.[27]?.T4}</td>
                      <td>{value?.[27]?.T5}</td>
                      <td>{value?.[27]?.remark}</td>
                      <td>{value?.[27]?.action}</td>
                      <td>{value?.[27]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>28</td>
                      <td className="text-start">Printer Test</td>
                      <td>{value?.[28]?.T1}</td>
                      <td>{value?.[28]?.T2}</td>
                      <td>{value?.[28]?.T3}</td>
                      <td>{value?.[28]?.T4}</td>
                      <td>{value?.[28]?.T5}</td>
                      <td>{value?.[28]?.remark}</td>
                      <td>{value?.[28]?.action}</td>
                      <td>{value?.[28]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>29</td>
                      <td className="text-start">Audio Test</td>
                      <td>{value?.[29]?.T1}</td>
                      <td>{value?.[29]?.T2}</td>
                      <td>{value?.[29]?.T3}</td>
                      <td>{value?.[29]?.T4}</td>
                      <td>{value?.[29]?.T5}</td>
                      <td>{value?.[29]?.remark}</td>
                      <td>{value?.[29]?.action}</td>
                      <td>{value?.[29]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>30</td>
                      <td className="text-start"> Bowl LED Test</td>
                      <td>{value?.[30]?.T1}</td>
                      <td>{value?.[30]?.T2}</td>
                      <td>{value?.[30]?.T3}</td>
                      <td>{value?.[30]?.T4}</td>
                      <td>{value?.[30]?.T5}</td>
                      <td>{value?.[30]?.remark}</td>
                      <td>{value?.[30]?.action}</td>
                      <td>{value?.[30]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>31</td>
                      <td className="text-start"> Alarm Test</td>
                      <td>{value?.[31]?.T1}</td>
                      <td>{value?.[31]?.T2}</td>
                      <td>{value?.[31]?.T3}</td>
                      <td>{value?.[31]?.T4}</td>
                      <td>{value?.[31]?.T5}</td>
                      <td>{value?.[31]?.remark}</td>
                      <td>{value?.[31]?.action}</td>
                      <td>{value?.[31]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>32</td>
                      <td className="text-start">Coin Dispenser Test</td>
                      <td>{value?.[32]?.T1}</td>
                      <td>{value?.[32]?.T2}</td>
                      <td>{value?.[32]?.T3}</td>
                      <td>{value?.[32]?.T4}</td>
                      <td>{value?.[32]?.T5}</td>
                      <td>{value?.[32]?.remark}</td>
                      <td>{value?.[32]?.action}</td>
                      <td>{value?.[32]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>33</td>
                      <td className="text-start"> Card Reader Test</td>
                      <td>{value?.[33]?.T1}</td>
                      <td>{value?.[33]?.T2}</td>
                      <td>{value?.[33]?.T3}</td>
                      <td>{value?.[33]?.T4}</td>
                      <td>{value?.[33]?.T5}</td>
                      <td>{value?.[33]?.remark}</td>
                      <td>{value?.[33]?.action}</td>
                      <td>{value?.[33]?.deficiency}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <th className="text-start" colspan="3">
                         Staff NAME: {item?.staff1_name}{" "}
                      </th>
                      <th></th>
                      <th> Staff DESIG: {item?.staff1_desg}{" "}</th>
                      <th></th>
                      <th></th>
                      
                      
                      <th colSpan={3}>Staff ID: {item?.staff1_sign}</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th className="text-start" colspan="3">
                         Staff NAME: {item?.staff2_name}{" "}
                      </th>
                      <th></th>
                      <th> Staff DESIG: {item?.staff2_desg}{" "}</th>
                      <th></th>
                      <th></th>
                      
                      
                      <th colSpan={3}>Staff ID: {item?.staff2_sign}</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th className="text-start" colspan="3">
                         Staff NAME: {item?.staff3_name}{" "}
                      </th>
                      <th></th>
                      <th> Staff DESIG: {item?.staff3_desg}{" "}</th>
                      <th></th>
                      <th></th>
                      
                      
                      <th colSpan={3}>Staff ID: {item?.staff3_sign}</th>
                    </tr>
                  </tbody>

                  <tr>
                    <td className=" " colSpan={4}>
                      {item.status === "0" ? (
                        <div>
                          <Link
                            to={`/edit/pm-logbook-half-yearly-tvm-mainline`}
                            state={{ id: item.id }}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                          <button
                            type="submit"
                            onClick={() => handleSave(item.id)}
                            style={{ padding: "7px 15px", marginLeft: "10px" }}
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
          </table>
        </div>
      </div>
    </>
  );
};

export default PMLOGBOOKMAINLINE9Table;
