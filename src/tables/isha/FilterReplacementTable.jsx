import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";
import { fetchData, saveData } from "../../reducer/isha/FilterReplacementReducer";

function FilterReplacementTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "Filter_Replacement_Halfyearly_Table.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const FilterList = useSelector((state) => state.Filter);
  const [slug, setSlug] = useState("");

  const itmm = FilterList.data.data;
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
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" >
            Filter Replacement Half yearly MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit" >
            Table
          </Link>
        </Breadcrumbs>
      </div>
      <div className="mb-3 form-heading-container">
        <h3 className="form-heading"> Filter Replacement Half yearly MAINTENANCE RECORD</h3>
        <span className="line-box" style={{ width: "790px" }}></span>
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
              filename="Filter_Replacement_Halfyearly_table"
              sheet="Filter_Replacement_Halfyearly_table"
              currentTableRef={tableRef.current}
            >
              <button className="btn " style={{ border: "1px solid #0baa9a " }}>
                <RiFileExcel2Fill color="#0baa9a " size={25} />
              </button>
            </DownloadTableExcel>
            <button
              className="btn" onClick={() => toPDF()} style={{ border: "1px solid #0baa9a", }}>
              <MdPictureAsPdf size={"25px"} color="#850d04" />
            </button>
          </div>
        </div>
      </div>

      <div ref={targetRef} >
        <table className="table" ref={(tableRef)}>
          {filteredData?.map((item, data) => (
            <div key={data.id}>

              <thead>
                <tr>
                  <th> Maintenance Schedule: {item?.maintenanceschedule}</th>
                  <th>Date : {item?.dateofmaintenance} </th>
                  <th> Maintenance Schedule: {item?.maintenanceschedule}</th>
                  <th></th>
                  <th >Station: {item.station}</th>
                </tr>
                <tr>
                  <th style={{ width: "100px" }}>sno</th>
                  <th style={{ width: "600px" }} >Details of Maintenance Activity</th>
                  <th style={{ width: "200px" }}>Status</th>
                  <th style={{ width: "400px" }}>Value</th>
                </tr>

              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td className='text-start'> BTN door Filter replacement </td>
                  <td>{item.checklist1}</td>
                  <td>{item.blank1}</td>

                </tr>
                <tr>
                  <td>2</td>
                  <td className='text-start'> Filter replacement of ATS Cubicle</td>
                  <td>{item.checklist2}</td>
                  <td>{item.blank2}</td>

                </tr>
                <tr>

                  <td>3</td>
                  <td className='text-start'> CLC door Filter replacement</td>
                  <td>{item.checklist3}</td>
                  <td>{item.blank3}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className='text-start'> MSS Filter replacement </td>
                  <td>{item.checklist4}</td>
                  <td>{item.blank4}</td>

                </tr>
                <tr>

                  <td>5</td>
                  <td className='text-start'>  PDU Filter replacement</td>
                  <td>{item.checklist5}</td>
                  <td>{item.blank5}</td>
                </tr>

                <tr>
                  <td>
                    <b>Remarks :</b>
                  </td>
                  <td colspan={20}>{item?.remarks} </td>
                </tr>

              </tbody>

              <tr>
                <td className=" " colSpan={4}>
                  {item.status === "0" || user.role === "Admin" ? (
                    <div className="d-flex gap-2 align-items-center">
                      <Link to={`/edit/filter-replacement`}
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

            </div>
          ))}
        </table>
      </div>
    </div >
  );
}

export default FilterReplacementTable;