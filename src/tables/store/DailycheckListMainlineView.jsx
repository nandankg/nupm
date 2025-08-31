import React, { useEffect,useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MdPictureAsPdf } from "react-icons/md";


import { initializeFormValues } from "../../utils/formUtils";

import station from "../../data/station.json";
import { fetchData, saveData,editData } from "../../reducer/redux/tableDataSlice";


function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}


const DailycheckListMainlineView = () => {
   const navigate = useNavigate();
      const location = useLocation();
      const { id } = location.state;
    console.log(id)
      const [slug, setSlug] = useState(getLastParameter().trim());
      const user = JSON.parse(localStorage.getItem("userdata"));
      const dispatch = useDispatch();
      const assetreg = useSelector((state) => state.data);
      const [formValues, setFormValues] = useState({});
     const tableRef = useRef(null);
       const { toPDF, targetRef } = usePDF({
         filename: "Daily Mainline Checklist.pdf",
       });
    const[checklistData,setChecklistData]=useState([])
      console.log(assetreg)
      // Fetch data on mount
      useEffect(() => {
        dispatch(fetchData({ formType: slug }));
      }, [dispatch]);
    
      // Initialize form values when data is loaded
      useEffect(() => {
        if (assetreg?.data?.data) {
          const filteredData = assetreg.data.data.find((item) => item.id === id);
          if (filteredData) {
            setFormValues(filteredData);
            setChecklistData(filteredData)
          }
        }
      }, [assetreg, id]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
     console.log(formValues)
    
      const handleSave = () => {
       dispatch(saveData({ formType:slug,  id }));
           navigate(`/list/${slug}`);
      };
   
  

  if (checklistData.length === 0) {
    return <div className="container mt-4 text-center">No data available</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex gap-3">
                    <Link to="">
                      {/* <button className="btn btn-primary">
                      <FaFilter />
                    </button> */}
                    </Link>
                    
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
              
      <h3 className="text-center mb-4">Daily Checklist Data Mainline</h3>
      <table className="table table-bordered">
            <thead>
              <tr>
                <th>Station Name:</th>
                <th> {checklistData.station || "N/A"}</th>
                <th>Date:</th>
                <th>{checklistData.date || "N/A"}</th>
              </tr>
            </thead>
            </table>
     
      
      {checklistData.data.map((systemData, systemIndex) => (
        <div key={systemIndex} className="mb-5">
          <h5>{systemData.system}</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Activity Carried Out</th>
                <th>Status (M)</th>
                <th>Status (E)</th>
              </tr>
            </thead>
            <tbody>
              {systemData.activities.map((activity, activityIndex) => (
                <tr key={activityIndex}>
                  <td>{activityIndex + 1}</td>
                  <td>{activity.name}</td>
                  <td>{activity.statusM ? "✓" : "X"}</td>
                  <td>{activity.statusE ? "✓" : "X"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-2">
            <strong>Deficiency Observed:</strong>{" "}
            {systemData.deficiencyObserved || "N/A"}
          </div>
          <div className="mb-2">
            <strong>Action Taken:</strong> {systemData.actionTaken || "N/A"}
          </div>
        </div>
        
      ))}
      <div  className="mb-5">
        <h5></h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Employee ID </th>{checklistData.employee_id_e || "N/A"} <th> </th>
              <th>Employee Name </th>{checklistData.employee_name_e || "N/A"} <th> </th>
      </tr>
      </thead>
      </table>
      </div>
    </div>
     <div className="d-flex gap-3 mt-3   justify-content-end">
                      {checklistData.status == "0" || user?.role == "Admin" ? (
                        <div className="d-flex ">
                          <Link
                            to={`/edit/${slug}`}
                            state={{ id: checklistData.id }}
                            className="btn btn-primary align-content-center mx-3"
                          >
                            Edit
                          </Link>
                          <button
                            type="submit"
                            onClick={() => {
                              handleSave(checklistData.id);
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
    </div>
  );
};

export default DailycheckListMainlineView;
