import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import stationData from "../../station.json";
import { addloan , addData} from "../../reducer/isha/LoanregReducer";
import { formatDate, formatTime } from "../../data/formatDate";
const Loanreg = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 15000); // Update every 15 seconds instead of 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const dispatch = useDispatch();
  const loan = useSelector((state) => state.Loanregister);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (loan) {
      setSlug(loan.slug);
    }
  }, [loan]);
  const basicInitialValues = {  
    
   
   date: formatDate(date.toDateString()),
   itemdes: "",
   quantity:"",
   empname_send:"",
   empid_send:"",
   receivefrom:"",
   empname_recieve:"",
   empid_recieve:"",
   make: "",
   model:"",
   serialNo:"",
   returnable: "",
   sendto: "",
   sendby:"",
   receivedate:"",
   receiveby:"",
   remarks:"",
   signon:"",



   
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              LOAN REGISTER
            </Link>
            <Link underline="hover" color="inherit">
            Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container"style={{ marginLeft: "0", marginRight: "0", maxWidth: "95%" }}>
          
            <form  onSubmit={handleSubmit}>
            <div className=" mb-3 form-heading-container">
              <h3 className="form-heading">LOAN REGISTER</h3>
              <span className="line-box" style={{ width: "250px" }}></span>
              </div>
              <div className="row mb-3">
              
              <div className="col-md-12">
                <label htmlFor="inputItemdes" className="form-label">
                 Item Description 
                </label>
                <input
                  type="text" required
                  className="form-control"
                  id="inputItemdes"
                  onChange={(e) =>
                    setFormValues({ ...formValues, itemdes : e.target.value })
                  }
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputItemdes" className="form-label">
                Quantity
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputItemdes"
                  onChange={(e) =>
                    setFormValues({ ...formValues, quantity : e.target.value })
                  }
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputItemdes" className="form-label">
                Denomination
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputItemdes"
                  onChange={(e) =>
                    setFormValues({ ...formValues, signon : e.target.value })
                  }
                />
              </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="inputMake" className="form-label">
                  Make
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputMake"
                  onChange={(e) =>
                    setFormValues({ ...formValues, make: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputMake" className="form-label">
                  Model
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputMake"
                  onChange={(e) =>
                    setFormValues({ ...formValues, model: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputMake" className="form-label">
                  Serial No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputMake"
                  onChange={(e) =>
                    setFormValues({ ...formValues, serialNo : e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputReturable" className="form-label">
                  Returnable/Non Returnable
                </label>
                <select
                  className="form-control"required
                  id="inputmonth"
                  onChange={(e) =>
                    setFormValues({ ...formValues, returnable: e.target.value })
                  }>
                 
                  <option>Returnable</option>
                  <option> Non Returnable</option>

                </select>
              </div>
              </div>
              <b>SENDING DETAILS</b>
              <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="inputSendto" className="form-label">
                  Send To
                </label>
                <select
                  
                  className="form-control"
                  
                  id="inputSendto"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,sendto: e.target.value })
                  }
                >
                 <option value="">Select Station</option>
                  {stationData
                    .filter((station) => station["STATION Code"]) // Exclude entries with null station names
                    .map((station) => (
                      <option
                        key={station["STATION Code"]}
                        value={station["STATION Code"]}
                      >
                        {station["STATION Code"]}
                      </option>
                    ))}
                </select>
              </div>

              
              <div className="col-6">
                <label htmlFor="inputSendby" className="form-label">
                  Send By
                </label>
                <select
                  
                  className="form-control"
                  
                  id="inputSendto"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,sendby: e.target.value })
                  }
                >
                 <option value="">Select Station</option>
                  {stationData
                    .filter((station) => station["STATION Code"]) // Exclude entries with null station names
                    .map((station) => (
                      <option
                        key={station["STATION Code"]}
                        value={station["STATION Code"]}
                      >
                        {station["STATION Code"]}
                      </option>
                    ))}
                </select>
                
              </div>
              
              
              <div className="col-6">
                <label htmlFor="inputSignon" className="form-label">
                  EMP Name
                </label>
                <input
                  type="sign"
                  className="form-control"
                  
                  id="inputSignon"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,empname_send: e.target.value })
                  }
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputSignon" className="form-label">
                 EMP ID
                </label>
                <input
                  type="sign"
                  className="form-control"
                  
                  id="inputSignon"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,empid_send: e.target.value })
                  }
                />
              </div>
              </div>
              <b>RECEIVING DETAILS</b>
              <div className="row mb-3">
              
              
              
              <div className="col-6">
                <label htmlFor="inputReceiveby" className="form-label">
                  Received By
                </label>
                <select
                  type="text"
                  className="form-control"
                  
                  id="inputReceiveby"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,receiveby: e.target.value })
                  }
                >
                 <option value="">Select Station</option>
                  {stationData
                    .filter((station) => station["STATION Code"]) // Exclude entries with null station names
                    .map((station) => (
                      <option
                        key={station["STATION Code"]}
                        value={station["STATION Code"]}
                      >
                        {station["STATION Code"]}
                      </option>
                    ))}
                </select>
                
              </div>  <div className="col-6">
                <label htmlFor="inputReceiveby" className="form-label">
                  Received From
                </label>
                <select
                  type="text"
                  className="form-control"
                  
                  id="inputReceiveby"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,receivefrom: e.target.value })
                  }
                >
                 <option value="">Select Station</option>
                  {stationData
                    .filter((station) => station["STATION Code"]) // Exclude entries with null station names
                    .map((station) => (
                      <option
                        key={station["STATION Code"]}
                        value={station["STATION Code"]}
                      >
                        {station["STATION Code"]}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-6">
                <label  htmlFor="inputReceivedate" className="form-label">
                Receiving Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputReceivedate"
                  name="date"
                  pattern="\d{4}-\d{2}-\d{2}"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,receivedate: e.target.value })
                  }
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputSignon" className="form-label">
                  EMP Name
                </label>
                <input
                  type="sign"
                  className="form-control"
                  
                  id="inputSignon"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,empname_recieve: e.target.value })
                  }
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputSignon" className="form-label">
                 EMP ID
                </label>
                <input
                  type="sign"
                  className="form-control"
                  
                  id="inputSignon"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,empid_recieve: e.target.value })
                  }
                />
              </div>
              </div>
              <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="inputRemarks" className="form-label">
                  Remarks
                </label>
                <input
                  type="text"
                  className="form-control"
                  
                  id="inputRemarks"
                  
                  
                  onChange={(e) =>
                    setFormValues({ ...formValues,remarks: e.target.value })
                  }
                />
              </div>
              </div>
              
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary">
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

export default Loanreg;