import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { formatDate } from "../data/formatDate";
import {
    fetchData,
    editData,
    saveData,
  } from "../reducer/redux/tableDataSlice";
  import { dtrissue } from "../utils/formUtils";
 
  function getLastParameter() {
    const pathname = window.location.pathname;
    const pathSegments = pathname.split("/").filter(Boolean);
    return pathSegments[pathSegments.length - 1];
  }
  const HonoriumRegEdit = () => {
    const [slug, setSlug] = useState(getLastParameter().trim());
    const loanregister = useSelector((state) => state.data);
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
  
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("userdata"));
    const [formValues, setFormValues] = useState({});
  
    // Fetch data on mount
    useEffect(() => {
      dispatch(fetchData({ formType: slug }));
    }, [dispatch]);
  
    // Initialize form values when data is loaded
    useEffect(() => {
      if (loanregister?.data?.data) {
        const filteredData = loanregister.data.data.find(
          (item) => item.id === id
        );
        if (filteredData) {
          setFormValues(filteredData);
        }
      }
    }, [loanregister, id]);
    console.log(formValues);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(editData({ formType: slug, values: formValues }));
      navigate(`/list/${slug}`);
    };
  
      const handleSave = () => {
      dispatch(saveData(id));
    };return (
        <>
           <div className="container">
       
       <div className="row justify-content-center">
         <div className="col-md-8 form-container">
           <form onSubmit={handleSubmit}>
             <div className=" mb-3 form-heading-container">
               <h3 className="form-heading">HONORARIUM Register</h3>
               <div className="heading-line"></div>
             </div>
             <div className="row mb-3">
             <div className="col-md-6">
                 <label htmlFor="empid" className="form-label">
                   Emp.Id.
                 </label>
                 <input
                   type="Text"
                   className="form-control"
                   id="empid"
                   placeholder="Id"
                   value={formValues.Emp_Id}
                   onChange={(e) =>
                     setFormValues({ ...formValues, Emp_Id: e.target.value })
                   }
                 />
               </div>
               <div className="col-md-6">
                 <label htmlFor="name" className="form-label">
                   Name
                 </label>
                 <input
                   type="text"
                   className="form-control"
                   id="name"
                   placeholder="Name"
                   value={formValues.Name}
                   onChange={(e) =>
                     setFormValues({ ...formValues, Name: e.target.value })
                   }
                 />
               </div>
               </div>
               <div className="row mb-3">
               <div className="col-md-4">
                 <label htmlFor="designation" className="form-label">
                   Designation
                 </label>
                 <input
                   type="Text"
                   className="form-control"
                   id="designation"
                   value={formValues.Designation}
                   placeholder="e.g. Officer"
                   onChange={(e) =>
                     setFormValues({
                       ...formValues,
                       Designation: e.target.value,
                     })
                   }
                 />
               </div>
               <div className="col-md-4">
                 <label htmlFor="empid" className="form-label">
                   Type
                 </label>
                 <input
                   type="Text"
                   className="form-control"
                   id="empid"
                   placeholder="Id"
                   value={formValues.Type}
                   onChange={(e) =>
                     setFormValues({ ...formValues, Type: e.target.value })
                   }
                 />
               </div>
               

               <div className="col-md-4">
                 <label htmlFor="duration" className="form-label">
                   Duration
                 </label>
                 <input
                   type="text"
                   className="form-control"
                   id="duration"
                   value={formValues.Duration}
                   onChange={(e) =>
                     setFormValues({ ...formValues, Duration: e.target.value })
                   }
                 />
               </div>
             </div>
             <div className="row mb-3">
               <div className="col-md-12">
                 <label htmlFor="topiccovered" className="form-label">
                   Topic Covered
                 </label>
                 <input
                   type="text"
                   className="form-control"
                   id="topiccovered"
                 
                   value={formValues.Topic_Covered}
                   onChange={(e) =>
                     setFormValues({
                       ...formValues,
                       Topic_Covered: e.target.value,
                     })
                   }
                 />
                 <br />
               </div>
             </div>
             <hr
               style={{
                 borderBlockStyle: "double",
                 borderBlockColor: "#f7b3a1",
                 borderWidth: "5px",
               }}
             />
             <div className="row mb-3">
               <div className="col-md-4">
                 <label htmlFor="date" className="form-label">
                   Date
                 </label>
                 <input
                   type="date"
                   required
                   className="form-control"
                   id="date"
                   value={formValues.Date}
                   onChange={(e) =>
                     setFormValues({
                       ...formValues,
                       Date: e.target.value,
                     })
                   }
                 />
               </div>
               <div className="col-md-4">
                 <label htmlFor="tfrom" className="form-label">
                   Time From
                 </label>
                 <input
                   type="time"
                   className="form-control"
                   id="tfrom"
                   value={formValues.Time_From}
                   onChange={(e) =>
                     setFormValues({
                       ...formValues,
                       Time_From: e.target.value,
                     })
                   }
                 />
               </div>
               <div className="col-md-4">
                 <label htmlFor="tto" className="form-label">
                   Time To
                 </label>
                 <input
                   type="time"
                   className="form-control"
                   id="tto"
                   value={formValues.Time_to}
                   onChange={(e) =>
                     setFormValues({
                       ...formValues,
                       Time_to: e.target.value,
                     })
                   }
                 />
               </div>
             </div>
             
             <div className="row mb-3">
             <div className="col-md-6">
                 <label htmlFor="classroom" className="form-label">
                   Classroom
                 </label>
                 <input
                   type="text"
                   className="form-control"
                   id="classroom"
                   value={formValues.Classroom}
                   onChange={(e) =>
                     setFormValues({
                       ...formValues,
                       Classroom: e.target.value,
                     })
                   }
                 />
               </div>
               
               <div className="col-md-6">
                 <label htmlFor="classroom" className="form-label">
                   Batch
                 </label>
                 <input
                   type="text"
                   className="form-control"
                   id="classroom"
                   value={formValues.Batch}
                   onChange={(e) =>
                     setFormValues({
                       ...formValues,
                       Batch: e.target.value,
                     })
                   }
                 />
               </div>
             </div>
             <div className="row mb-3">
               <div className="col-md-6">
                 <label htmlFor="tfrom" className="form-label">
                 Review_by
                 </label>
                 <input
                   type="text"
                   className="form-control"
                   id="tfrom"
                   value={formValues.Review_by}
                   onChange={(e) =>
                     setFormValues({
                       ...formValues,
                       Review_by: e.target.value,
                     })
                   }
                 />
               </div>
               <div className="col-md-6">
                 <label htmlFor="tto" className="form-label">
                 Approved_By
                 </label>
                 <input
                   type="text"
                   className="form-control"
                   id="tto"
                   value={formValues.Approved_By}
                   onChange={(e) =>
                     setFormValues({
                       ...formValues,
                       Approved_By: e.target.value,
                     })
                   }
                 />
               </div>
             </div>
             <div className="row mb-3">
               <div className="col-md-12">
                 <label htmlFor="remark" className="form-label">
                   Remark
                 </label>
                 <input
                   type="text"
                   className="form-control"
                   id="remark"
                   value={formValues.Remark}
                   onChange={(e) =>
                     setFormValues({ ...formValues, Remark: e.target.value })
                   }
                 />
               </div>
               <div className="col-12 text-center pt-3">
                 <button type="submit" className="btn btn-primary px-3">
                   Save
                 </button>
               </div>
             </div>
           </form>
         </div>
       </div>
     </div>


        </>
    );
};

export default HonoriumRegEdit;