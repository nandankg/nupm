import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useLocation, useNavigate } from "react-router-dom";

import { RiFileExcel2Fill } from "react-icons/ri";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { fetchData, saveData } from "../../reducer/monika/PmLogBookReducer";
const PmLogBook5List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "PmLogBookList.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const [fromDate, setFromDate] = useState(dayjs().startOf("day"));
  const [toDate, setToDate] = useState(dayjs().endOf("day"));
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const PmLogBook5List = useSelector((state) => state.PmLogBook);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const itmm = PmLogBook5List.data.data;

  console.log();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (PmLogBook5List.data && PmLogBook5List.data.data) {
      setItems(PmLogBook5List.data.data);
      setSlug(PmLogBook5List.slug);
      setFilteredItems(PmLogBook5List.data.data);
    }
  }, [PmLogBook5List]);
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
    const newData = items.filter((row) => {
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
    setFilteredItems(newData);
  };
  const labels = [
    "Check Fixing & Alignment of all modules of Gates",
    "Checking of all Cable connection and dressing",
    "Checking Silicon sealing of Gate Cabinet",
    "Checking of any opening inside gate cabinet",
    "Checking of Power Supply and Battery",
    "Check whether leaked oil appears on the flap mechanism",
    "Check AG cabinet case for corrosion",
    "Check the covering glass of the validator",
    "Check power source fan filter",
    "Check Lubrication of all locks with silicone oil",
    "Check Date and Time",
    "Check correct position of flap mechanism",
    "Cleaning of all modules of AFC Gate and cabinet",
    "Clean opto sensors of flap mechanism",
    "Clean plastic covers of sensors and transmitters in corridor",
    "Check ping to station computer",
    "Check whether Token Capture Unit (TCU) clearing mechanism is Normally closed",
    "Check lock functionality",
    "Check battery backup",
    "Audio Test",
    "Concession Lamp test",
    "Sector Door Test",
    "End Display Test",
    "Sensor Test",
    "Token Slot Test",
    "Token Bowl Test",
    "Token Passage Test",
    "Front Door Test",
    " PMU Test",
    "Card Reader Test",
    "Return Cup LED Test",
    "Shutdown",
    "Reboot",
    "Operation Mode Test",
    "Special Mode test",
    "Token Container Test",
    "Gate Mode Test",
    "Check operation and special mode for its default position",
    "Software - SC",
    "Master Push Button",
  ];

labels.map((lb,id)=>{
console.log(id+"."+lb)
})
  const handleSave = (id) => {
    dispatch(saveData(id));
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              PM Log Book-5
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        {/* <h3>PM Log Book-5 List</h3>
        <span className="line-box"></span> */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-3">
              <Link to="">
                {/* <button className="btn btn-primary">
              <FaFilter />
            </button> */}
              </Link>
              <DownloadTableExcel
                filename="PmLogBookList_table"
                sheet="PmLogBookList_table"
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
                style={{
                  border: "1px solid #0baa9a",
                }}
              >
                <MdPictureAsPdf size={"25px"} color="#850d04" />
              </button>
            </div>
          </div>
        </div>

        {filteredData.map((item, index) => {
          const value = item?.activities;
          return (
            <>
              <div ref={targetRef}>
                <table ref={tableRef}>
                  <thead>
                    <tr>
                      <th className="text-start" colspan="2">
                        FREQUENCY {item?.frequency}
                      </th>
                      <th className="text-start" colspan="1">
                        HALF YEARLY {item?.half_yearly}
                      </th>

                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>

                      <th className="text-start" colspan="2">
                        Annexure B{item?.annexure}
                      </th>
                    </tr>

                    <tr>
                      <th className="text-start" colspan="2">
                        DATE: {item?.date}
                      </th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th className="text-start" colspan="2">
                        DOCUMENT: O&M/AFC/OCC/SDC/CH02{item?.document}
                      </th>
                    </tr>

                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th className="text-start" colspan="2">
                        Ref:O&M/TELE-AFC/SOP/02
                        {item?.ref}
                      </th>
                    </tr>

                    <tr>
                      <th rowspan="2">Sr. No.</th>
                      <th rowspan="2">Activity</th>
                      <th rowspan="2">DESCRIPTION OF WORK</th>
                      <th colspan="5">GATE</th>
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
                    {labels.map((lb,idx)=>{
                    <tr>
                      <td>{idx}</td>
                      
                      
                      <td className="text-start">
                        {lb}
                      </td>

                      <td>{value?.[idx]?.G1}</td>
                      <td>{value?.[idx]?.G2}</td>
                      <td>{value?.[idx]?.G3}</td>
                      <td>{value?.[idx]?.G4}</td>
                      <td>{value?.[idx]?.G5}</td>

                      <td>{value?.[idx]?.remark}</td>
                      <td>{value?.[idx]?.action}</td>
                      <td>{value?.[idx]?.deficiency}</td>
                    </tr>
                    })}
                    <tr>
                    <td>1</td>
                    <td rowSpan={12}>Visual Inspection</td>
                     <td className="text-start">
                     "Check Fixing & Alignment of all modules of Gates",
                      </td>

                      <td>{value?.[0]?.G1}</td>
                      <td>{value?.[0]?.G2}</td>
                      <td>{value?.[0]?.G3}</td>
                      <td>{value?.[0]?.G4}</td>
                      <td>{value?.[0]?.G5}</td>

                      <td>{value?.[0]?.remark}</td>
                      <td>{value?.[0]?.action}</td>
                      <td>{value?.[0]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>2</td>

                      <td className="text-start">
                        Checking of all Cable connection and dressing
                      </td>
                      <td>{value?.[1]?.G1}</td>
                      <td>{value?.[1]?.G2}</td>
                      <td>{value?.[1]?.G3}</td>
                      <td>{value?.[1]?.G4}</td>
                      <td>{value?.[1]?.G5}</td>

                      <td>{value?.[1]?.remark}</td>
                      <td>{value?.[1]?.action}</td>
                      <td>{value?.[1]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="text-start">
                        Checking Silicon sealing of Gate Cabinet
                      </td>
                      <td>{value?.[2]?.G1}</td>
                      <td>{value?.[2]?.G2}</td>
                      <td>{value?.[2]?.G3}</td>
                      <td>{value?.[2]?.G4}</td>
                      <td>{value?.[2]?.G5}</td>

                      <td>{value?.[2]?.remark}</td>
                      <td>{value?.[2]?.action}</td>
                      <td>{value?.[2]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="text-start">
                        Checking of any opening inside gate cabinet
                      </td>
                      <td>{value?.[3]?.G1}</td>
                      <td>{value?.[3]?.G2}</td>
                      <td>{value?.[3]?.G3}</td>
                      <td>{value?.[3]?.G4}</td>
                      <td>{value?.[3]?.G5}</td>

                      <td>{value?.[3]?.remark}</td>
                      <td>{value?.[3]?.action}</td>
                      <td>{value?.[3]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="text-start">
                        Checking of Power Supply and Battery
                      </td>
                      <td>{value?.[4]?.G1}</td>
                      <td>{value?.[4]?.G2}</td>
                      <td>{value?.[4]?.G3}</td>
                      <td>{value?.[4]?.G4}</td>
                      <td>{value?.[4]?.G5}</td>

                      <td>{value?.[4]?.remark}</td>
                      <td>{value?.[4]?.action}</td>
                      <td>{value?.[4]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="text-start">
                        Check whether leaked oil appears on the flap mechanism
                      </td>
                      <td>{value?.[5]?.G1}</td>
                      <td>{value?.[5]?.G2}</td>
                      <td>{value?.[5]?.G3}</td>
                      <td>{value?.[5]?.G4}</td>
                      <td>{value?.[5]?.G5}</td>

                      <td>{value?.[5]?.remark}</td>
                      <td>{value?.[5]?.action}</td>
                      <td>{value?.[5]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="text-start">
                        Check AG cabinet case for corrosion
                      </td>
                      <td>{value?.[6]?.G1}</td>
                      <td>{value?.[6]?.G2}</td>
                      <td>{value?.[6]?.G3}</td>
                      <td>{value?.[6]?.G4}</td>
                      <td>{value?.[6]?.G5}</td>

                      <td>{value?.[6]?.remark}</td>
                      <td>{value?.[6]?.action}</td>
                      <td>{value?.[6]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="text-start">
                        Check the covering glass of the validator
                      </td>
                      <td>{value?.[7]?.G1}</td>
                      <td>{value?.[7]?.G2}</td>
                      <td>{value?.[7]?.G3}</td>
                      <td>{value?.[7]?.G4}</td>
                      <td>{value?.[7]?.G5}</td>

                      <td>{value?.[7]?.remark}</td>
                      <td>{value?.[7]?.action}</td>
                      <td>{value?.[7]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="text-start">
                        Check power source fan filter
                      </td>
                      <td>{value?.[8]?.G1}</td>
                      <td>{value?.[8]?.G2}</td>
                      <td>{value?.[8]?.G3}</td>
                      <td>{value?.[8]?.G4}</td>
                      <td>{value?.[8]?.G5}</td>

                      <td>{value?.[8]?.remark}</td>
                      <td>{value?.[8]?.action}</td>
                      <td>{value?.[8]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td className="text-start">
                        Check Lubrication of all locks with silicone oil
                      </td>
                      <td>{value?.[9]?.G1}</td>
                      <td>{value?.[9]?.G2}</td>
                      <td>{value?.[9]?.G3}</td>
                      <td>{value?.[9]?.G4}</td>
                      <td>{value?.[9]?.G5}</td>

                      <td>{value?.[9]?.remark}</td>
                      <td>{value?.[9]?.action}</td>
                      <td>{value?.[9]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="text-start">Check Date and Time</td>
                      <td>{value?.[10]?.G1}</td>
                      <td>{value?.[10]?.G2}</td>
                      <td>{value?.[10]?.G3}</td>
                      <td>{value?.[10]?.G4}</td>
                      <td>{value?.[10]?.G5}</td>

                      <td>{value?.[10]?.remark}</td>
                      <td>{value?.[10]?.action}</td>
                      <td>{value?.[10]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td className="text-start">
                        Check correct position of flap mechanism
                      </td>
                      <td>{value?.[11]?.G1}</td>
                      <td>{value?.[11]?.G2}</td>
                      <td>{value?.[11]?.G3}</td>
                      <td>{value?.[11]?.G4}</td>
                      <td>{value?.[11]?.G5}</td>

                      <td>{value?.[11]?.remark}</td>
                      <td>{value?.[11]?.action}</td>
                      <td>{value?.[11]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td rowSpan={3}>Cleaning</td>
                      <td className="text-start">
                        Cleaning of all modules of AFC Gate and cabinet
                      </td>
                      <td>{value?.[12]?.G1}</td>
                      <td>{value?.[12]?.G2}</td>
                      <td>{value?.[12]?.G3}</td>
                      <td>{value?.[12]?.G4}</td>
                      <td>{value?.[12]?.G5}</td>

                      <td>{value?.[12]?.remark}</td>
                      <td>{value?.[12]?.action}</td>
                      <td>{value?.[12]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td className="text-start">
                        Clean opto sensors of flap mechanism
                      </td>
                      <td>{value?.[13]?.G1}</td>
                      <td>{value?.[13]?.G2}</td>
                      <td>{value?.[13]?.G3}</td>
                      <td>{value?.[13]?.G4}</td>
                      <td>{value?.[13]?.G5}</td>

                      <td>{value?.[13]?.remark}</td>
                      <td>{value?.[13]?.action}</td>
                      <td>{value?.[13]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td className="text-start">
                        Clean plastic covers of sensors and transmitters in
                        corridor
                      </td>
                      <td>{value?.[14]?.G1}</td>
                      <td>{value?.[14]?.G2}</td>
                      <td>{value?.[14]?.G3}</td>
                      <td>{value?.[14]?.G4}</td>
                      <td>{value?.[14]?.G5}</td>

                      <td>{value?.[14]?.remark}</td>
                      <td>{value?.[14]?.action}</td>
                      <td>{value?.[14]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>16</td>
                      <td rowSpan={23}>Module Test (Maintenan ce Menu)</td>
                      <td className="text-start">
                        Check ping to station computer
                      </td>
                      <td>{value?.[15]?.G1}</td>
                      <td>{value?.[15]?.G2}</td>
                      <td>{value?.[15]?.G3}</td>
                      <td>{value?.[15]?.G4}</td>
                      <td>{value?.[15]?.G5}</td>

                      <td>{value?.[15]?.remark}</td>
                      <td>{value?.[15]?.action}</td>
                      <td>{value?.[15]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>17</td>
                      <td className="text-start">
                        Check whether Token Capture Unit (TCU) clearing
                        mechanism is normally closed
                      </td>
                      <td>{value?.[16]?.G1}</td>
                      <td>{value?.[16]?.G2}</td>
                      <td>{value?.[16]?.G3}</td>
                      <td>{value?.[16]?.G4}</td>
                      <td>{value?.[16]?.G5}</td>

                      <td>{value?.[16]?.remark}</td>
                      <td>{value?.[16]?.action}</td>
                      <td>{value?.[16]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>18</td>
                      <td className="text-start">Check lock functionality</td>
                      <td>{value?.[17]?.G1}</td>
                      <td>{value?.[17]?.G2}</td>
                      <td>{value?.[17]?.G3}</td>
                      <td>{value?.[17]?.G4}</td>
                      <td>{value?.[17]?.G5}</td>

                      <td>{value?.[17]?.remark}</td>
                      <td>{value?.[17]?.action}</td>
                      <td>{value?.[17]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>19</td>
                      <td className="text-start">Check battery backup</td>
                      <td>{value?.[18]?.G1}</td>
                      <td>{value?.[18]?.G2}</td>
                      <td>{value?.[18]?.G3}</td>
                      <td>{value?.[18]?.G4}</td>
                      <td>{value?.[18]?.G5}</td>
                      <td>{value?.[18]?.remark}</td>
                      <td>{value?.[18]?.action}</td>
                      <td>{value?.[18]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>20</td>
                      <td className="text-start">Audio Test</td>
                      <td>{value?.[19]?.G1}</td>
                      <td>{value?.[19]?.G2}</td>
                      <td>{value?.[19]?.G3}</td>
                      <td>{value?.[19]?.G4}</td>
                      <td>{value?.[19]?.G5}</td>

                      <td>{value?.[19]?.remark}</td>
                      <td>{value?.[19]?.action}</td>
                      <td>{value?.[19]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>21</td>
                      <td className="text-start">Concession Lamp test</td>
                      <td>{value?.[20]?.G1}</td>
                      <td>{value?.[20]?.G2}</td>
                      <td>{value?.[20]?.G3}</td>
                      <td>{value?.[20]?.G4}</td>
                      <td>{value?.[20]?.G5}</td>

                      <td>{value?.[20]?.remark}</td>
                      <td>{value?.[20]?.action}</td>
                      <td>{value?.[20]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>22</td>
                      <td className="text-start">Sector Door Test</td>
                      <td>{value?.[21]?.G1}</td>
                      <td>{value?.[21]?.G2}</td>
                      <td>{value?.[21]?.G3}</td>
                      <td>{value?.[21]?.G4}</td>
                      <td>{value?.[21]?.G5}</td>

                      <td>{value?.[21]?.remark}</td>
                      <td>{value?.[21]?.action}</td>
                      <td>{value?.[21]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>23</td>
                      <td className="text-start">End Display Test</td>
                      <td>{value?.[22]?.G1}</td>
                      <td>{value?.[22]?.G2}</td>
                      <td>{value?.[22]?.G3}</td>
                      <td>{value?.[22]?.G4}</td>
                      <td>{value?.[22]?.G5}</td>

                      <td>{value?.[22]?.remark}</td>
                      <td>{value?.[22]?.action}</td>
                      <td>{value?.[22]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>24</td>
                      <td className="text-start">Sensor Test</td>
                      <td>{value?.[23]?.G1}</td>
                      <td>{value?.[23]?.G2}</td>
                      <td>{value?.[23]?.G3}</td>
                      <td>{value?.[23]?.G4}</td>
                      <td>{value?.[23]?.G5}</td>

                      <td>{value?.[23]?.remark}</td>
                      <td>{value?.[23]?.action}</td>
                      <td>{value?.[23]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>25</td>
                      <td className="text-sart">Token Slot Test</td>
                      <td>{value?.[24]?.G1}</td>
                      <td>{value?.[24]?.G2}</td>
                      <td>{value?.[24]?.G3}</td>
                      <td>{value?.[24]?.G4}</td>
                      <td>{value?.[24]?.G5}</td>

                      <td>{value?.[24]?.remark}</td>
                      <td>{value?.[24]?.action}</td>
                      <td>{value?.[24]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>26</td>
                      <td className="text-start">Token Bowl Test</td>
                      <td>{value?.[25]?.G1}</td>
                      <td>{value?.[25]?.G2}</td>
                      <td>{value?.[25]?.G3}</td>
                      <td>{value?.[25]?.G4}</td>
                      <td>{value?.[25]?.G5}</td>

                      <td>{value?.[25]?.remark}</td>
                      <td>{value?.[25]?.action}</td>
                      <td>{value?.[25]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>27</td>
                      <td className="text-start"> Token Passage Test</td>
                      <td>{value?.[26]?.G1}</td>
                      <td>{value?.[26]?.G2}</td>
                      <td>{value?.[26]?.G3}</td>
                      <td>{value?.[26]?.G4}</td>
                      <td>{value?.[26]?.G5}</td>

                      <td>{value?.[26]?.remark}</td>
                      <td>{value?.[26]?.action}</td>
                      <td>{value?.[26]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>28</td>
                      <td className="text-start">Front Door Test</td>
                      <td>{value?.[27]?.G1}</td>
                      <td>{value?.[27]?.G2}</td>
                      <td>{value?.[27]?.G3}</td>
                      <td>{value?.[27]?.G4}</td>
                      <td>{value?.[27]?.G5}</td>

                      <td>{value?.[27]?.remark}</td>
                      <td>{value?.[27]?.action}</td>
                      <td>{value?.[27]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>29</td>
                      <td className="text-start">PMU Test</td>
                      <td>{value?.[28]?.G1}</td>
                      <td>{value?.[28]?.G2}</td>
                      <td>{value?.[28]?.G3}</td>
                      <td>{value?.[28]?.G4}</td>
                      <td>{value?.[28]?.G5}</td>

                      <td>{value?.[28]?.remark}</td>
                      <td>{value?.[28]?.action}</td>
                      <td>{value?.[28]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>30</td>
                      <td className="text-start"> Card Reader Test</td>
                      <td>{value?.[29]?.G1}</td>
                      <td>{value?.[29]?.G2}</td>
                      <td>{value?.[29]?.G3}</td>
                      <td>{value?.[29]?.G4}</td>
                      <td>{value?.[29]?.G5}</td>

                      <td>{value?.[29]?.remark}</td>
                      <td>{value?.[29]?.action}</td>
                      <td>{value?.[29]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>31</td>
                      <td className="text-start"> Return Cup LED Test</td>
                      <td>{value?.[30]?.G1}</td>
                      <td>{value?.[30]?.G2}</td>
                      <td>{value?.[30]?.G3}</td>
                      <td>{value?.[30]?.G4}</td>
                      <td>{value?.[30]?.G5}</td>

                      <td>{value?.[30]?.remark}</td>
                      <td>{value?.[30]?.action}</td>
                      <td>{value?.[30]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>32</td>
                      <td className="text-start">Shutdown</td>
                      <td>{value?.[31]?.G1}</td>
                      <td>{value?.[31]?.G2}</td>
                      <td>{value?.[31]?.G3}</td>
                      <td>{value?.[31]?.G4}</td>
                      <td>{value?.[31]?.G5}</td>

                      <td>{value?.[31]?.remark}</td>
                      <td>{value?.[31]?.action}</td>
                      <td>{value?.[31]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>33</td>
                      <td className="text-start">Reboot</td>
                      <td>{value?.[32]?.G1}</td>
                      <td>{value?.[32]?.G2}</td>
                      <td>{value?.[32]?.G3}</td>
                      <td>{value?.[32]?.G4}</td>
                      <td>{value?.[32]?.G5}</td>

                      <td>{value?.[32]?.remark}</td>
                      <td>{value?.[32]?.action}</td>
                      <td>{value?.[32]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>34</td>
                      <td className="text-start"> Operation Mode Test</td>
                      <td>{value?.[33]?.G1}</td>
                      <td>{value?.[33]?.G2}</td>
                      <td>{value?.[33]?.G3}</td>
                      <td>{value?.[33]?.G4}</td>
                      <td>{value?.[33]?.G5}</td>

                      <td>{value?.[33]?.remark}</td>
                      <td>{value?.[33]?.action}</td>
                      <td>{value?.[33]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>35</td>
                      <td className="text-start"> Special Mode test</td>
                      <td>{value?.[34]?.G1}</td>
                      <td>{value?.[34]?.G2}</td>
                      <td>{value?.[34]?.G3}</td>
                      <td>{value?.[34]?.G4}</td>
                      <td>{value?.[34]?.G5}</td>

                      <td>{value?.[34]?.remark}</td>
                      <td>{value?.[34]?.action}</td>
                      <td>{value?.[34]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="text-start">36</td>
                      <td className="text-start"> Token Container Test</td>
                      <td>{value?.[35]?.G1}</td>
                      <td>{value?.[35]?.G2}</td>
                      <td>{value?.[35]?.G3}</td>
                      <td>{value?.[35]?.G4}</td>
                      <td>{value?.[35]?.G5}</td>

                      <td>{value?.[35]?.remark}</td>
                      <td>{value?.[35]?.action}</td>
                      <td>{value?.[35]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>37</td>
                      <td className="text-start"> Gate Mode Test </td>
                      <td>{value?.[36]?.G1}</td>
                      <td>{value?.[36]?.G2}</td>
                      <td>{value?.[36]?.G3}</td>
                      <td>{value?.[36]?.G4}</td>
                      <td>{value?.[36]?.G5}</td>

                      <td>{value?.[36]?.remark}</td>
                      <td>{value?.[36]?.action}</td>
                      <td>{value?.[36]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>38</td>
                      <td className="text-start">
                        Check operation and special mode for its default
                        position
                      </td>
                      <td>{value?.[37]?.G1}</td>
                      <td>{value?.[37]?.G2}</td>
                      <td>{value?.[37]?.G3}</td>
                      <td>{value?.[37]?.G4}</td>
                      <td>{value?.[37]?.G5}</td>

                      <td>{value?.[37]?.remark}</td>
                      <td>{value?.[37]?.action}</td>
                      <td>{value?.[37]?.deficiency}</td>
                    </tr>

                    <tr>
                      <td>39</td>
                      <td rowSpan={2}>Emergency</td>
                      <td className="text-start"> Software - SC</td>
                      <td>{value?.[38]?.G1}</td>
                      <td>{value?.[38]?.G2}</td>
                      <td>{value?.[38]?.G3}</td>
                      <td>{value?.[38]?.G4}</td>
                      <td>{value?.[38]?.G5}</td>

                      <td>{value?.[38]?.remark}</td>
                      <td>{value?.[38]?.action}</td>
                      <td>{value?.[38]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td>40</td>
                      <td className="text-start">Master Push Button</td>
                      <td>{value?.[39]?.G1}</td>
                      <td>{value?.[39]?.G2}</td>
                      <td>{value?.[39]?.G3}</td>
                      <td>{value?.[39]?.G4}</td>
                      <td>{value?.[39]?.G5}</td>

                      <td>{value?.[39]?.remark}</td>
                      <td>{value?.[39]?.action}</td>
                      <td>{value?.[39]?.deficiency}</td>
                    </tr>
                    <tr>
                      <td colSpan={11}>
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
                      <td rowSpan={4} colspan={2}>
                        Staff on Duty
                      </td>
                      <td className="text-start">Name</td>
                      <td className="text-start" colspan={5}>
                        Designation
                      </td>
                      <td className="text-start" colSpan={2}>
                        Employee No
                      </td>
                      <td className="text-start" colSpan={1}></td>
                    </tr>
                    <tr>
                      <td>{item.staff1_name}</td>
                      <td colspan={5}>{item.staff1_desg}</td>
                      <td colspan={4}>{item.staff1_employee}</td>
                      <td colSpan={1}>{item.staff1_sign}</td>
                    </tr>
                    <tr>
                      <td>{item.staff2_name}</td>
                      <td colspan={5}>{item.staff2_desg}</td>
                      <td colspan={4}>{item.staff2_employee}</td>
                      <td colSpan={1}>{item.staff2_sign}</td>
                    </tr>
                    <tr>
                      <td>{item.staff3_name}</td>
                      <td colspan={5}>{item.staff3_desg}</td>
                      <td colspan={4}>{item.staff_employee}</td>
                      <td colSpan={1}>{item.staff3_sign}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <td className=" ">
                {item.status === "0" || user?.role == "Admin" ? (
                  <div className="d-flex gap-2">
                    <Link
                      to={`/edit/${slug}`}
                      state={{ id: item.id }}
                      className="btn btn-primary align-content-center"
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
    </>
  );
};

export default PmLogBook5List;
