import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, saveData } from "../../reducer/pinki/AtcExaminationReducer";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { RiFileExcel2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const AtcExaminationList = () => {
  const navigate = useNavigate();
  const [slug, setSlug] = useState(getLastParameter().trim());
  const location = useLocation();
  const { id } = location.state || {};
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Atc_Examination.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const atcexamination = useSelector((state) => state.atcexamination);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const itmm = atcexamination.data.data;
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

  console.log(items);

  // useEffect(() => {
  //   if (atcexamination.data && atcexamination.data.data) {
  //     setSlug(atcexamination.slug);
  //   }
  // }, [atcexamination]);

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/form/${slug}`}>
              ATC Examination
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> ATC Examination Certificate </h3>
        <span className="line-box"></span>
        

        <div className="d-flex gap-3">
          <Link to="">
            {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
          </Link>
          <DownloadTableExcel
            filename="AtcExamination"
            sheet="AtcExamination"
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
          <h5>"It is certified that following train sets are checked for ATC On-board system fitness. These trains are fit for revenue services."</h5>
          {filteredItems?.toReversed().map((item, index) => {
            // const value = item?.work1;
            return (
              <>
                <table style={{ width: "100%" }} ref={tableRef}>
                  <thead>
                    <tr>
                      <th colSpan={2}>Sr. No.</th>
                      <th colSpan={2}>Train Set</th>
                      <th colSpan={2}>From (Date/Hours)</th>
                      <th colSpan={2}>Up to (Date/Hours)</th>
                      <th colSpan={2}>No. of Cars</th>
                      <th colSpan={2}>Fitness Given in ATO/ATO</th>
                      <th colSpan={2}>Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={2}>1</td>
                      <td colSpan={2} className="text-start">
                        TS#01
                      </td>
                      <td colSpan={2}>{item.from1}</td>
                      <td colSpan={2}>{item.upto1}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness1}</td>
                      <td colSpan={2}>{item.remark1}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>2</td>

                      <td colSpan={2} className="text-start">
                        TS#02
                      </td>
                      <td colSpan={2}>{item.from2}</td>
                      <td colSpan={2}>{item.upto2}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness2}</td>
                      <td colSpan={2}>{item.remark2}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>3</td>
                      <td colSpan={2} className="text-start">
                        TS#03
                      </td>
                      <td colSpan={2}>{item.from3}</td>
                      <td colSpan={2}>{item.upto3}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness3}</td>
                      <td colSpan={2}>{item.remark3}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>4</td>
                      <td colSpan={2} className="text-start">
                        TS#04
                      </td>
                      <td colSpan={2}>{item.from4}</td>
                      <td colSpan={2}>{item.upto4}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness4}</td>
                      <td colSpan={2}>{item.remark4}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>5</td>
                      <td colSpan={2} className="text-start">
                        TS#05
                      </td>
                      <td colSpan={2}>{item.from5}</td>
                      <td colSpan={2}>{item.upto5}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness5}</td>
                      <td colSpan={2}>{item.remark5}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>6</td>
                      <td colSpan={2} className="text-start">
                        TS#06
                      </td>
                      <td colSpan={2}>{item.from6}</td>
                      <td colSpan={2}>{item.upto6}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness6}</td>
                      <td colSpan={2}>{item.remark6}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>7</td>
                      <td colSpan={2} className="text-start">
                        {" "}
                        TS#07
                      </td>
                      <td colSpan={2}>{item.from7}</td>
                      <td colSpan={2}>{item.upto7}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness7}</td>
                      <td colSpan={2}>{item.remark7}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>8</td>
                      <td colSpan={2} className="text-start">
                        TS#08
                      </td>
                      <td colSpan={2}>{item.from8}</td>
                      <td colSpan={2}>{item.upto8}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness8}</td>
                      <td colSpan={2}>{item.remark8}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>9</td>

                      <td colSpan={2} className="text-start">
                        TS#09
                      </td>
                      <td colSpan={2}>{item.from9}</td>
                      <td colSpan={2}>{item.upto9}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness9}</td>
                      <td colSpan={2}>{item.remark9}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>10</td>
                      <td colSpan={2} className="text-start">
                        TS#10
                      </td>
                      <td colSpan={2}>{item.from10}</td>
                      <td colSpan={2}>{item.upto10}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness10}</td>
                      <td colSpan={2}>{item.remark10}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>11</td>
                      <td colSpan={2} className="text-start">
                        TS#11
                      </td>
                      <td colSpan={2}>{item.from11}</td>
                      <td colSpan={2}>{item.upto11}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness11}</td>
                      <td colSpan={2}>{item.remark11}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>12</td>

                      <td colSpan={2} className="text-start">
                        TS#12
                      </td>
                      <td colSpan={2}>{item.from12}</td>
                      <td colSpan={2}>{item.upto12}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness12}</td>
                      <td colSpan={2}>{item.remark12}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>13</td>
                      <td colSpan={2} className="text-start">
                        TS#13
                      </td>
                      <td colSpan={2}>{item.from13}</td>
                      <td colSpan={2}>{item.upto13}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness13}</td>
                      <td colSpan={2}>{item.remark13}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>14</td>
                      <td colSpan={2} className="text-start">
                        {" "}
                        TS#14
                      </td>
                      <td colSpan={2}>{item.from14}</td>
                      <td colSpan={2}>{item.upto14}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness14}</td>
                      <td colSpan={2}>{item.remark14}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>15</td>
                      <td colSpan={2} className="text-start">
                        {" "}
                        TS#15
                      </td>
                      <td colSpan={2}>{item.from15}</td>
                      <td colSpan={2}>{item.upto15}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness15}</td>
                      <td colSpan={2}>{item.remark15}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>16</td>
                      <td colSpan={2} className="text-start">
                        {" "}
                        TS#16
                      </td>
                      <td colSpan={2}>{item.from16}</td>
                      <td colSpan={2}>{item.upto16}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness16}</td>
                      <td colSpan={2}>{item.remark16}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>17</td>
                      <td colSpan={2} className="text-start">
                        {" "}
                        TS#17
                      </td>
                      <td colSpan={2}>{item.from17}</td>
                      <td colSpan={2}>{item.upto17}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness17}</td>
                      <td colSpan={2}>{item.remark17}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>18</td>
                      <td colSpan={2} className="text-start">
                        {" "}
                        TS#18
                      </td>
                      <td colSpan={2}>{item.from18}</td>
                      <td colSpan={2}>{item.upto18}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness18}</td>
                      <td colSpan={2}>{item.remark18}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>19</td>
                      <td colSpan={2} className="text-start">
                        {" "}
                        TS#19
                      </td>
                      <td colSpan={2}>{item.from19}</td>
                      <td colSpan={2}>{item.upto19}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness19}</td>
                      <td colSpan={2}>{item.remark19}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>20</td>
                      <td colSpan={2} className="text-start">
                        TS#20
                      </td>
                      <td colSpan={2}>{item.from20}</td>
                      <td colSpan={2}>{item.upto20}</td>
                      <td colSpan={2}>4</td>
                      <td colSpan={2}>{item.fitness20}</td>
                      <td colSpan={2}>{item.remark20}</td>
                    </tr>
                    {/* <div className="action-container">
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-success">Save</button>
                </div> */}
                  </tbody>
                </table>
                <div
                  className="outer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "50px",
                  }}
                >
                  <div className="left">
                    <label htmlFor="">PPIO/Inspection</label> <br />
                    <label htmlFor="">TPD</label> <br />
                    <span>{item.tpd}</span>
                  </div>
                  <div className="right">
                    <label htmlFor="">SE/JE(Signal)</label> <br />
                    {item.se}
                  </div>
                </div>
                <td>
                  {item.status === "0" || user.role === "Admin" ? (
                    <div className="d-flex justify-content-center gap-2">
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
      </div>
    </>
  );
};

export default AtcExaminationList;
