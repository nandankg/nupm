import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Breadcrumbs } from "@mui/material";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/redux/tableDataSlice";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditTrainId = () => {
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

  return (
    <>
       <div className="container">
             <div role="presentation " className="bredcrumbs">
               <Breadcrumbs aria-label="breadcrumb">
                 <Link underline="hover" color="inherit">
                   Train Id Change Record
                 </Link>
                 <Link underline="hover" color="inherit">
                   Register
                 </Link>
               </Breadcrumbs>
             </div>
             <div className="row justify-content-center">
               <div className="col-md-8 form-container">
                 <form onSubmit={handleSubmit}>
                   <div className=" mb-3 form-heading-container">
                     <h3 className="form-heading">
                       TRAIN ID CHANGE RECORD REGISTER
                     </h3>
                     <div className="heading-line"></div>
                   </div>
                   <div className="row">
                   <div className="col-md-4">
                       <label for="inputpreviousid" className="form-label">
                         Date
                       </label>
                       <input
                         type="date"
                         className="form-control"
                         id="inputpreviousid"
                         value={formValues.date}
                         onChange={(e) =>
                           setFormValues({
                             ...formValues,
                             date: e.target.value,
                           })
                         }
                         required
                       />
                     </div>
                     <div className="col-md-4">
                       <label for="inputpreviousid" className="form-label">
                       Time
                       </label>
                       <input
                         type="time"
                         className="form-control"
                         id="inputpreviousid"
                         value={formValues.time}
                         onChange={(e) =>
                           setFormValues({
                             ...formValues,
                             time: e.target.value,
                           })
                         }
                         required
                       />
                     </div>
                     <div className="col-md-4">
                       <label for="inputpreviousid" className="form-label">
                         Train Set
                       </label>
                       <input
                         type="number"
                         className="form-control"
                         id="inputpreviousid"
                         value={formValues.train_set}
                         onChange={(e) =>
                           setFormValues({
                             ...formValues,
                             train_set: e.target.value,
                           })
                         }
                         required
                       />
                     </div>
                   </div>
                   <div className="row mb-3">
                     <div className="col-md-6">
                       <label for="inputpreviousid" className="form-label">
                         PREVIOUS ASSOCIATED ID
                       </label>
                       <input
                         type="number"
                         className="form-control"
                         id="inputpreviousid"
                         value={formValues.previousid}
                         onChange={(e) =>
                           setFormValues({
                             ...formValues,
                             previousid: e.target.value,
                           })
                         }
                         required
                       />
                     </div>
                     <div className="col-md-6">
                       <label for="inputnewid" className="form-label">
                         NEW ASSOCIATED ID
                       </label>
                       <input
                         type="number"
                         className="form-control"
                         id="inputnewid"
                         min="1"
                         value={formValues.newid}
                         onChange={(e) =>
                           setFormValues({ ...formValues, newid: e.target.value })
                         }
                         
                       />
                     </div>
                   </div>
                   <div className="row mb-3">
                     <div className="col-md-12">
                       <label for="inputpurpose" className="form-label">
                         PURPOSE AND ACTION
                       </label>
                       <input
                         type="text"
                         className="form-control"
                         id="inputpurpose"
                         value={formValues.purpose}
                         onChange={(e) =>
                           setFormValues({ ...formValues, purpose: e.target.value })
                         }
                         required
                       />
                     </div>
                   </div>
                   <div className="row mb-3">
                     <div className="col-md-6">
                       <label for="inputname" className="form-label">
                         NAME OF TC
                       </label>
                       <input
                         type="text"
                         className="form-control"
                         id="inputname"
                         value={formValues.name_of_tc}
                         onChange={(e) =>
                           setFormValues({ ...formValues, name_of_tc: e.target.value })
                         }
                         required
                       />
                     </div>
                     <div className="col-md-6">
                       <label for="inputname" className="form-label">
                         EID OF TC
                       </label>
                       <input
                         type="number"
                         className="form-control"
                         id="inputname"
                         value={formValues.id_of_tc}
                         onChange={(e) =>
                           setFormValues({ ...formValues,  id_of_tc: e.target.value })
                         }
                         
                       />
                     </div>
                     </div>
                     <div className="row mb-3">
                     <div className="col-md-6">
                       <label for="inputname1" className="form-label">
                         NAME  OF APPROVING ACC
                       </label>
                       <input
                         type="text"
                         className="form-control"
                         id="inputname1"
                         value={formValues.name_of_acc}
                         onChange={(e) =>
                           setFormValues({ ...formValues,  name_of_acc: e.target.value })
                         }
                         required
                       />
                     </div>
                     <div className="col-md-6">
                       <label for="inputname1" className="form-label">
                         ID  OF APPROVING ACC
                       </label>
                       <input
                         type="number"
                         className="form-control"
                         id="inputname1"
                         value={formValues.id_of_acc}
                         onChange={(e) =>
                           setFormValues({ ...formValues,  id_of_acc: e.target.value })
                         }
                         required
                       />
                     </div>
                   </div>
                   <div className="col-12 text-center pt-3">
                     <button type="submit" className="btn btn-primary mt-3" style={{width:"100px", height: "50px", textAlign: "center"}}>
                       Save
                     </button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
    </>
  );
};

export default EditTrainId;
