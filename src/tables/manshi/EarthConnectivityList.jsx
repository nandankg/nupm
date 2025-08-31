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
import { fetchData, saveData } from "../../reducer/manshi/EarthReducer";

function EarthConnectivityList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "EarthConnectivity.pdf" });
  const user = JSON.parse(localStorage.getItem("userdata"));

  const dispatch = useDispatch();
  const EarthC = useSelector((state) => state.Earth);
  const [slug, setSlug] = useState("");
  const itmm = EarthC.data.data;
useEffect(() => {
    const delayedFunction = () => {
      dispatch(fetchData({ formType: slug }));
    };

    // Set a timeout to call the function after 3 seconds
    const timeout = setTimeout(delayedFunction, 2000); // 3000ms = 3 seconds

    // Clean up the timeout if the component unmounts before the delay
    return () => clearTimeout(timeout); // Cleanup interval on unmount
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
    }, 500)
  };

  useEffect(() => {
    if (EarthC.data && EarthC.data.data) {
      setSlug(EarthC.slug);
    }
  }, [EarthC]);

  const quarterlyActivities = [
    {
      label:
        "Verification of availability of earth/Earth BAR in good condition",
    },
    {
      label:
        "Writing of earth values with permanent marker/paint at the earth point",
    },
    { label: "Verification of earth connectivity and continuity" },
    {
      label:
        "Verification of earth connectivity of all cubicle/Equipment with earth strip in SER",
    },
    { label: "Value of earth resistance(yearly)" },
  ];

  return (
    <div className="container" style={{ maxWidth: "98%" }}>
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Earth Connectivity & Continuity Quarterly MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit">
            View
          </Link>
        </Breadcrumbs>
      </div>
      <div className="mb-3 form-heading-container">
        {/* <h3 className="form-heading">
          Earth Connectivity & Continuity Quarterly MAINTENANCE RECORD
        </h3>
        <div className="heading-line"></div> */}
      </div>

      <div className="d-flex gap-3">
        <Link to="">
          {/* <button className="btn btn-primary">
                <FaFilter />
              </button> */}
        </Link>
        <DownloadTableExcel
          filename="Earth connectivity"
          sheet="Earth connectivity"
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
                    <th className="text-start" colSpan={2}>
                      Station : {data?.station}
                    </th>

                    <th className="text-start" colSpan={2}>
                      Date : {data?.date}
                    </th>
                    <th colspan={"5"}>{data?.name}</th>
                  </tr>

                  <tr>
                    <th>S.NO.</th>

                    <th colSpan={3}>Details of Maintenance Activity</th>

                    <th colSpan={2}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterlyActivities.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td className="text-start" colSpan={"3"}>
                          {" "}
                          {item.label}
                        </td>

                        <td colspan={"2"}>
                          {data?.quarterly && data.quarterly[index]
                            ? data.quarterly[index].date
                            : "N/A"}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={2} className="text-start">
                      <b>Remarks : </b>
                    </td>
                    <td> {data?.remarks}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-start">
                      <b>Name : </b>
                    </td>

                    <td>{data?.csign}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-start">
                      <b> Designation , Emp ID : </b>
                    </td>

                    <td>
                      {" "}
                      <b>
                        {data?.designation}, {data?.empno}
                      </b>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={2} className="text-start">
                      <b>Counter Signature : </b>
                    </td>

                    <td>
                      <b>{data?.csign}</b>{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
              <td className="d-flex gap-3 mt-3   justify-content-end">
                {user.role == "Admin" || data.status == "0" ? (
                  <div className="d-flex ">
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

export default EarthConnectivityList;
