import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
   
  addData,
} from "../../reducer/redux/tableDataSlice";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import stations from "../../data/station.json";
import { formatDate, formatTime } from "../../data/formatDate";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EquipmentFailureRegister = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  // useEffect(()=>{
  //   setInterval(()=>setTime(new Date()),1000)
  // },[])
  const dispatch = useDispatch();

  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  console.log(loanregister);
  

  const basicInitialValues = {
    failureDateTime: "",
    station:"",
    location: "",
    department: "",
    equipmentType: "",
    equipmentNo: "",
    failureDetails: "",
    reportedTo: "",
    reportedDateTime: "",
    scEmpNo: "",
    scName: "",
    actionTaken: "",
    actionDateTime: "",
    actionEmpNo: "",
    actionName: "",
    status1: "",
    closeDateTime: "",
    closeEmpNo: "",
    closeName: "",
    remarks: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
const handleSubmit = (e) => {
       e.preventDefault();
      dispatch(addData({formType:slug,values:formValues}));
          console.log("Form Data Submitted:", formValues);
         navigate(`/list/${slug}`);
     };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Equipment Failure
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
                  Equipment Failure Station Register
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
              <div className="col-md-4">
              <label for="inputlocation" className="form-label">
              Failure Date 
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="typeHint"
                    onChange={(e) =>
                      setFormValues({ ...formValues, failureDateTime: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
              <label for="inputlocation" className="form-label">
              Department
                  </label>
                  <select
                   
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="typeHint"
                    onChange={(e) =>
                      setFormValues({ ...formValues, department: e.target.value })
                    }
                    required
                  >
                    <option value="">Please Select</option>
                    <option value="operation">Operation</option>
                    <option value="operation">Telecom</option>
                    </select>
                </div>
                <div className="col-md-4">
                <label for="inputlocation" className="form-label">
              Station
                  </label>
                  <select
                   
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="typeHint"
                    onChange={(e) =>
                      setFormValues({ ...formValues, station: e.target.value })
                    }
                    required
                  >
                    <option value="">Please Select</option>
                    {stations.map(
                                          (station, index) =>
                                            station["Station Name"] && (
                                              <option key={index} value={station["STATION Code"]}>
                                                {station["Station Name"]}
                                              </option>
                                            )
                                        )}
                    </select>
                </div>
                </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputlocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="typeHint"
                    onChange={(e) =>
                      setFormValues({ ...formValues, location: e.target.value })
                    }
                  
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputtype" className="form-label">
                    Equipment Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtype"
                    aria-describedby="typeHint"
                    onChange={(e) =>
                      setFormValues({ ...formValues, equipmentType: e.target.value })
                    }
                   
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputnumber" className="form-label">
                    Equipment No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="numberHint"
                    id="inputnumber"
                    min="1"
                    onChange={(e) =>
                      setFormValues({ ...formValues, equipmentNo: e.target.value })
                    }
                   
                  />
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputdetail" className="form-label">
                    Nature & Details of Failure
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdetail"
                    onChange={(e) =>
                      setFormValues({ ...formValues, failureDetails: e.target.value })
                    }
                   
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputreportedto" className="form-label">
                    Reported To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reportedTo: e.target.value,
                      })
                    }
                   
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputreportedtime" className="form-label">
                    Reported Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputreportedtime"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reportedDateTime: e.target.value,
                      })
                    }
                   
                  />
                </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-6">
              <label for="inputlocation" className="form-label">
              SC Emp. No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="typeHint"
                    onChange={(e) =>
                      setFormValues({ ...formValues, scEmpNo: e.target.value })
                    }
                    
                  />
                </div>
                <div className="col-md-6">
              <label for="inputlocation" className="form-label">
              SC Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="typeHint"
                    onChange={(e) =>
                      setFormValues({ ...formValues, scName: e.target.value })
                    }
                   
                  />
                </div>
                </div>
              <div className="row mb-3">
                <h4>Action Taken:</h4>
                <div className="col-md-6">
                  <label for="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                    aria-describedby="date1Hint"
                    onChange={(e) =>
                      setFormValues({ ...formValues, actionDateTime: e.target.value })
                    }
                    
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputremarkstaff" className="form-label">
                  Concern Employee Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarksstaff"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        actionName: e.target.value,
                      })
                    }
                    
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputconcernid" className="form-label">
                    Concern Employee Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputconcernid"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        actionEmpNo: e.target.value,
                      })
                    }
                   
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputremark" className="form-label">
                  Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, status1: e.target.value })
                    }
                  
                  />
                </div>
              </div>
              <div className="row mb-3">
                <h4>Close</h4>
                <div className="col-md-4">
                  <label for="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                    aria-describedby="date1Hint"
                    onChange={(e) =>
                      setFormValues({ ...formValues, closeDateTime: e.target.value })
                    }
                    
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputremarkstaff" className="form-label">
                 Employee Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarksstaff"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        closeName: e.target.value,
                      })
                    }
                    
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputremarkstaff" className="form-label">
                   Employee ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarksstaff"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        closeEmpNo: e.target.value,
                      })
                    }
                    
                  />
                </div>
              </div>
              <div className="row mb-3">
               
                <div className="col-md-12">
                <label for="inputremarkstaff" className="form-label">
                Remarks

                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarksstaff"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        remarks: e.target.value,
                      })
                    }
                    
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

export default EquipmentFailureRegister;
