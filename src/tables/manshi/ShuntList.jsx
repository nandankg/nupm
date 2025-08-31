import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchData, saveData } from "../../reducer/manshi/ShuntReducer";

function ShuntList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "ShuntSignal.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const Shunt = useSelector((state) => state.Shunt);
  const [slug, setSlug] = useState("");
  const itmm = Shunt.data.data;
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

  useEffect(() => {
    if (Shunt.data && Shunt.data.data) {
      setSlug(Shunt.slug);
    }
  }, [Shunt]);

  const quarterlyActivities = [
    { label: "Cleaning of Aspect Housing & LED Unit." },
    { label: "LED Functioning." },
    { label: "Earthing Verification" },
    { label: "Cleaning of MSB" },
    { label: "Tightening of all terminations inside MSB & Signal Unit" },
    { label: "Proper illumination of LED" },
    { label: "Tightening of all Nuts & Bolts." },
    { label: "Healthiness of all Supports, Brackets & Foundation etc." },
    { label: "Corrosion Observed/Painting Needed" },
    { label: "Voltage Check in LED Unit Pivot Aspect." },
    { label: "Current Check in LED Unit Pivot Aspect" },
    { label: "Voltage Check in LED Unit ON Aspect" },
    { label: "Current Check in LED Unit ON Aspect" },
    { label: "Voltage Check in LED Unit OFF Aspect" },
    { label: "Current Check in LED Unit OFF Aspect." },
  ];

  return (
    <div className="container" style={{ maxWidth: "98%" }}>
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to={`/form/${slug}`}>
            Shunt Signal
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <div className="mb-3 form-heading-container">
        <h3 className="form-heading">
          SHUNT SIGNAL MAINTENANCE RECORD QUARTERLY
        </h3>
        <div className="heading-line"></div>
      </div>

      <div className="d-flex gap-3">
        <DownloadTableExcel
          filename="Shunt signal"
          sheet="Shunt signal"
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

      <div ref={targetRef}>
        {filteredItems?.map((data) => {
          return (
            <div key={data.id}>
              <table className="table" ref={tableRef}>
                <thead>
                  <tr>
                    <th className="text-start" colSpan={4}>
                      Signal Number : {data?.signalNo}
                    </th>

                    <th className="text-start" colSpan={1}>
                      Date : {data?.ektNo}
                    </th>
                    <th colSpan={5}>{data?.name}</th>
                  </tr>
                  <tr>
                    <th>S.NO.</th>
                    <th colSpan={3}>Details of Maintenance Activity</th>
                    <th colSpan={2}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterlyActivities.map((item, index) => {
                    const activity = data?.quarterly && data.quarterly[index];
                    const unit = item.label.includes("Voltage")
                      ? "Volt"
                      : item.label.includes("Current")
                      ? "mA"
                      : "";

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-start" colSpan={"3"}>
                          {item.label}
                        </td>
                        <td colSpan={"4"}>
                          {activity ? activity.val : "N/A"}
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <b> {unit}</b>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={2} className="text-start">
                      <b>Remarks : </b>
                    </td>
                    <td colSpan={20}>{data?.remarks}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-start">
                     
                    </td>
                    <td colSpan={20}></td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-start">
                      <b>Designation : </b>
                    </td>
                    <td colSpan={20}>{data?.designation}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-start">
                      <b> Employee No. : </b>
                      {data?.user_id}
                    </td>
                    <td colSpan={5} className="text-start">
                      <b> Employee Name : </b>
                      {data?.csign}
                    </td>
                  </tr>
                </tbody>
              </table>
              <td className="d-flex gap-3 mt-3 justify-content-end">
                {data.status === "0" ? (
                  <div className="d-flex">
                    <Link
                      to={`/edit/${slug}`}
                      state={{ id: data.id }}
                      className="btn btn-primary align-content-center mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      type="submit"
                      onClick={() => {
                        handleSave(data.id);
                      }}
                      className="btn btn-success"
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
      </div>
    </div>
  );
}

export default ShuntList;
