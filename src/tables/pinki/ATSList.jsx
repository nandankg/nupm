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
import { fetchData, saveData } from "../../reducer/pinki/ATSReducer";

function ATSList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "ATSHalfYearly.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const atshalfyearly = useSelector((state) => state.atshalfyearly);
  const [slug, setSlug] = useState("");

  const itmm = atshalfyearly.data.data;
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  let [filtereddatas, setFiltereddatas] = useState([]);

  console.log(slug);
  console.log(atshalfyearly.data.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (itmm) {
    filtereddatas = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filtereddatas);
  }
  useEffect(() => {
    if (atshalfyearly.data && atshalfyearly.data.data) {
      setSlug(atshalfyearly.slug);
    }
  }, [atshalfyearly]);

  const handleSave = (id) => {
    dispatch(saveData(id));
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 1000)
  };

  const halfyearlyActivities = [
    {
      category: "Visual Checks",
      activity: "Notice the status of CLC & ZC/LC links in system view",
    },
    {
      category: "Visual Checks",
      activity: "Notice all the indications of FEP/Server/Workstation",
    },
    {
      category: "Visual Checks",
      activity: "Check power supply status",
    },
    {
      category: "FEP/VDU/SERVER/WORKSTATION",
      activity: "Switch-off the FEP/VDU/Server/Workstation ",
    },
    {
      category: "FEP/VDU/SERVER/WORKSTATION",
      activity: "Remove Cables(Power, Ethernet etc.)",
    },
    {
      category: "FEP/VDU/SERVER/WORKSTATION",
      activity: "Blow dust from motherboard using power blower",
    },
    {
      category: "FEP/VDU/SERVER/WORKSTATION",
      activity: "Blow dust from floppy/CD using power blower",
    },
    {
      category: "FEP/VDU/SERVER/WORKSTATION",
      activity: "Blow the dust cover using low power blower",
    },

    {
      category: "FEP/VDU/SERVER/WORKSTATION",
      activity: "Put the cover back",
    },
    {
      category: "FEP/VDU/SERVER/WORKSTATION",
      activity: "Clean the cover & KVM/Monitor screen with a cloth",
    },
    {
      category: "FEP/VDU/SERVER/WORKSTATION",
      activity: "Plugin all cables",
    },
    {
      category: "FEP/VDU/SERVER/WORKSTATION",
      activity:
        "Ensure the FEP/Server/Workstations are working fine and all application are running.",
    },
    {
      category: "Checks after maintenance:-",
      activity:
        "Verify system status from system view. It should be same as the before the maintenance.",
    },
    {
      category: "Checks after maintenance:-",
      activity: "Check ping status of Router, Server, FEP, Workstations.",
    },
    {
      category: "Checks after maintenance:-",
      activity:
        "Check each FEP/Server individually on load. All MMI indications should be proper with each FEP at LATS & CATS Workstations.",
    },

    {
      category: "Checks after maintenance:-",
      activity:
        "Check switching between both the FEP at LATS and CATS workstations.",
    },
  ];
  console.log(filtereddatas);
  return (
    <div className="container" style={{ maxWidth: "75%" }}>
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to={`/form/${slug}`}>
            ATS Half Yearly
          </Link>
          <Link underline="hover" color="inherit">
            List
          </Link>
        </Breadcrumbs>
      </div>
      <h3>ATS Half Yearly Maintenance</h3>
      <span className="line-box"></span>

      <div className="d-flex gap-3">
        <Link to="">
          {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
        </Link>
        <DownloadTableExcel
          filename="ATSHalfYearly"
          sheet="ATSHalfYearly"
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
        {filtereddatas?.map((data, index) => {
          return (
            <div key={index}>
              <table className="table" ref={tableRef}>
                <thead>
                  <tr>
                    <th className="text-start" colSpan={6}>
                      Date : {data?.date}
                    </th>
                  </tr>
                  <tr>
                    <th className="text-start" colSpan={6}>
                      Equipment : {data?.equipment}
                    </th>
                  </tr>
                  <tr>
                    <th className="text-start" colSpan={4}>
                      Station : {data?.station}
                    </th>

                    <th className="text-start">{data?.name}</th>
                  </tr>
                  {/* <tr>
                    <th colSpan={"4"}></th>
                    <th colSpan={2}>{data?.name}</th>
                  
                  </tr> */}
                  <tr>
                    <th>S.NO.</th>

                    <th colSpan={3}>Details of Maintenance Activity</th>

                    <th colSpan={2}>Status</th>
                    {/* <th >Date</th> */}
                  </tr>
                </thead>
                <tbody>
                  {halfyearlyActivities.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td className="text-start" colSpan={"3"}>
                          {" "}
                          {item.activity}
                        </td>
                        {/* <td >{data?.halfyearly[index]?.date}</td> */}
                        <td>{data?.halfyearly[index]?.status}</td>
                         <td>{data?.halfyearly[index]?.remark}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={2} className="text-start">
                      <b>Remarks : </b> {data?.remarks}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-start">
                      <b>Signature : </b> {data?.employee_id}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-start">
                      <b> Designation , EmpNo : </b>
                      {data?.designation}, {data?.empno}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={2} className="text-start">
                      <b>Counter Name : </b>
                      {data?.csign}
                    </td>
                  </tr>
                </tbody>
              </table>
              <td className=" ">
                {data.status === "0" || user.role === "Admin" ? (
                  <div className="d-flex">
                    <Link
                      to={`/edit/${slug}`}
                      state={{ id: data.id }}
                      className="btn btn-primary align-content-center"
                    >
                      Edit
                    </Link>
                    <button
                      type="submit"
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

export default ATSList;
