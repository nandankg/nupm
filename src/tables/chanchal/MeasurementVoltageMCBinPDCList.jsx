import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  fetchData,
  saveData,
} from "../../reducer/chanchal/MeasurementVoltageMCBinPDCReducer";
import { RiFileExcel2Fill } from "react-icons/ri";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";
import PDFExportComponent from "../../component/PDFExportComponent";
function MeasurementVoltageMCBinPDCList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename: "MeasurementVoltageMCBinPDCList.pdf",
  });
  const user = JSON.parse(localStorage.getItem("userdata"));
  const dispatch = useDispatch();
  const MeasurementVoltageMCBinPDCList = useSelector((state) => state.MCBinPDC);
  const [slug, setSlug] = useState("");
  const itmm = MeasurementVoltageMCBinPDCList.data.data;
  console.log(MeasurementVoltageMCBinPDCList);

  // console.log(items);
  // const user = { role: "Admin" }; // Mock user object
  useEffect(() => {
    if (MeasurementVoltageMCBinPDCList) {
      setSlug(MeasurementVoltageMCBinPDCList.slug);
    }
  }, [MeasurementVoltageMCBinPDCList]);
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
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 1000)
  };

  const halfyearlyactivity = [
    { activity: "  Check lamp indication on PDC" },
    { activity: "  ELD Status" },
    { activity: "  IMD status" },
    { activity: "  VMR Status" },
    { activity: "  Masurement of Incomer Voltage from UPS on MCB No." },
  ];

  const mcbactivity = [{ activity: "  MCB 2" }, { activity: "  MCB 3" }];

  const mcb2activity = [
    { activity: "  MCB 1" },
    { activity: "  MCB 4" },
    { activity: "  MCB 5" },
    { activity: "  MCB 6" },
  ];

  const mcb3activity = [
    { activity: "  MCB 7" },
    { activity: "  MCB 8" },
    { activity: "  MCB 9" },
    { activity: "  MCB 10" },
    { activity: "  MCB 11" },
    { activity: "  MCB 12" },
    { activity: "  MCB 13" },
    { activity: "  MCB 14" },
    { activity: "  MCB 15" },
    { activity: "  MCB 16" },
    { activity: "  MCB 17" },
    { activity: "  MCB 18" },
    { activity: "  MCB 19" },
    { activity: "  MCB 20" },
    { activity: "  MCB 21" },
    { activity: "  MCB 22" },
    { activity: "  MCB 23" },
    { activity: "  MCB 24" },
    { activity: "  MCB 25" },
  ];

  return (
    <div className="container" style={{ maxWidth: "80%" }}>
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Measurement of Voltage at MCB in PDC SIX MONTHLY MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit">
            View
          </Link>
        </Breadcrumbs>
      </div>
      {/* <h3>
        {" "}
        Measurement of Voltage at MCB in PDC SIX MONTHLY MAINTENANCE RECORD{" "}
      </h3>
      <span className="line-box"></span> */}

      <div className="d-flex gap-3">
        <Link to="">
          {/* <button className="btn btn-primary">
                                <FaFilter />
                            </button> */}
        </Link>
        <DownloadTableExcel
          filename="MeasurementVoltageMCBinPDCList"
          sheet="MeasurementVoltageMCBinPDCList"
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

      <div ref={targetRef} id="section-to-export">
        {filteredItems?.map((data) => {
          return (
            <div key={data.id}>
              {/* <div ref={tableRef}>
                        <div style={{ overflow: "scroll", height: "70vh" }}> */}
              <table className="table">
                <thead
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#fff",
                  }}
                >
                  <tr>
                    <th className="text-start" colSpan={2}>
                      Revision - 00
                    </th>
                    <th colSpan={2}></th>
                    <th colSpan={3}>O&M/SIGNAL/LOG/MISC/{data?.id} </th>
                  </tr>
                  <tr>
                    <th colSpan={8}>
                      Measurement of Voltage at MCB in PDC SIX MONTHLY
                      MAINTENANCE RECORD{" "}
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={1} className="text-start">
                      DATE : {data?.date}
                    </th>

                    <th colSpan={3}> </th>
                    <th colSpan={3} className="text-start">
                      STATION : {data?.station}
                    </th>
                  </tr>
                  <tr>
                    {/* <th rowSpan={2}> S.No.</th> */}
                    <th rowSpan={2}> Details of Maintenance Activity </th>
                    <th colSpan={3}> </th>
                    <th colSpan={3}> Halfyearly : {data?.range}</th>
                  </tr>
                  <tr>
                    <th colSpan={6}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {halfyearlyactivity.map((item, index) => {
                    return (
                      <tr key={index}>
                        {/* <td> <b>{index + 1} </b></td> */}
                        <td className="text-start">
                          <b> {item.activity} </b>
                        </td>
                        <td colSpan={8}>
                          {data?.halfyearly && data.halfyearly[index]
                            ? data.halfyearly[index].checked
                            : "N/A"}
                        </td>
                      </tr>
                    );
                  })}

                  <tr className="text-center fw-bold">
                    <td colSpan={1}> </td>
                    <th colSpan={1}> R-Y </th>
                    <th colSpan={1}> Y-B </th>
                    <th colSpan={1}> R-B </th>
                    <th colSpan={1}> R-N </th>
                    <th colSpan={1}> Y-N </th>
                    <th colSpan={1}> B-N </th>
                  </tr>

                  {mcbactivity.map((item, index) => {
                    return (
                      <tr key={index}>
                        {/* <td> <b>{index + 1} </b></td> */}
                        <td className="text-start">
                          <b> {item.activity} </b>
                        </td>
                        <td>
                          {data?.mcb && data.mcb[index]
                            ? data.mcb[index].r_y
                            : "N/A"}
                        </td>
                        <td>
                          {data?.mcb && data.mcb[index]
                            ? data.mcb[index].y_b
                            : "N/A"}
                        </td>
                        <td>
                          {data?.mcb && data.mcb[index]
                            ? data.mcb[index].r_b
                            : "N/A"}
                        </td>
                        <td>
                          {data?.mcb && data.mcb[index]
                            ? data.mcb[index].r_n
                            : "N/A"}
                        </td>
                        <td>
                          {data?.mcb && data.mcb[index]
                            ? data.mcb[index].y_n
                            : "N/A"}
                        </td>
                        <td>
                          {data?.mcb && data.mcb[index]
                            ? data.mcb[index].b_n
                            : "N/A"}
                        </td>
                      </tr>
                    );
                  })}

                  <tr className="text-center fw-bold">
                    <td colSpan={1}> </td>
                    <th colSpan={2}> R-Y</th>
                    <th colSpan={2}> Y-B</th>
                    <th colSpan={2}> R-B</th>
                  </tr>
                  {mcb2activity.map((item, index) => {
                    return (
                      <tr key={index}>
                        {/* <td> <b>{index + 1} </b></td> */}
                        <td className="text-start">
                          <b> {item.activity} </b>
                        </td>
                        <td colSpan={2}>
                          {data?.mcb2 && data.mcb2[index]
                            ? data.mcb2[index].r_y2
                            : "N/A"}
                        </td>
                        <td colSpan={2}>
                          {data?.mcb2 && data.mcb2[index]
                            ? data.mcb2[index].y_b2
                            : "N/A"}
                        </td>
                        <td colSpan={2}>
                          {data?.mcb2 && data.mcb2[index]
                            ? data.mcb2[index].r_b2
                            : "N/A"}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="text-center fw-bold">
                    <td colSpan={1}> </td>
                    <th colSpan={3}> AC/DC</th>
                    <th colSpan={3}> Value</th>
                  </tr>

                  {mcb3activity.map((item, index) => {
                    return (
                      <tr key={index}>
                        {/* <td> <b>{index + 1} </b></td> */}
                        <td className="text-start">
                          <b> {item.activity} </b>
                        </td>
                        <td colSpan={3}>
                          {data?.mcb3 && data.mcb3[index]
                            ? data.mcb3[index].volt
                            : "N/A"}
                        </td>
                        <td colSpan={3}>
                          {data?.mcb3 && data.mcb3[index]
                            ? data.mcb3[index].val
                            : "N/A"}
                        </td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td colSpan={1} className="text-start fw-bold">
                      Remarks
                    </td>
                    <td className="text-start" colSpan={6}>
                      {data?.remarks}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={1} className="text-start fw-bold">
                      Name
                    </td>
                    <td className="text-start" colSpan={6}>
                      {data?.name}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={1} className="text-start fw-bold">
                      Emp. No.
                    </td>
                    <td className="text-start" colSpan={6}>
                      {data?.empno}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={1} className="text-start fw-bold">
                      Designation
                    </td>
                    <td className="text-start" colSpan={6}>
                      {data?.designation}
                    </td>
                  </tr>
                  {/* <tr>
                    <td colSpan={1} className="text-center fw-bold">
                      Signature
                    </td>
                    <td className="text-start" colSpan={6}>
                      {data?.signature}
                    </td>
                  </tr> 
                  <tr>
                    <td colSpan={1} className="text-center fw-bold">
                      Counter Signature
                    </td>
                    <td className="text-start" colSpan={6}>
                      {data?.countersign}
                    </td>
                  </tr>*/}
                </tbody>
              </table>
              <td className=" mb-3">
                {data.status === "0" || user.role == "Admin" ? (
                  <div>
                    <Link
                      to={`/edit/${slug}`}
                      state={{ id: data.id }}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary mx-3"
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MeasurementVoltageMCBinPDCList;
