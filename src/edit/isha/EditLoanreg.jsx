import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/isha/LoanregReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import stationData from "../../station.json";


const EditLoanreg= () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    console.log(id);
    const dispatch = useDispatch();
    const LOanregList = useSelector((state) => state.Loanregister);
    const [slug, setSlug] = useState("");
    console.log(slug);
    console.log(LOanregList.data.data);
    const [items, setItems] = useState([]);
    const itmm = LOanregList.data.data;
    console.log(items);
    useEffect(() => {
      if (LOanregList) {
        setSlug(LOanregList.slug);
      }
      dispatch(fetchData());
      setItems(LOanregList.data.data);
    }, []);
    useEffect(() => {
      setItems(LOanregList.data.data);
    }, [LOanregList]);
    let dt = [];
    let filteredData;
    if (itmm) {
      filteredData = itmm.filter((itm) => {
        return itm.id === id;
      });
      console.log(filteredData);
      console.log(filteredData[0]);
    }
    const fd = filteredData[0];
    const basicInitialValues = {
      id: fd.id,
      sno: "Number",
      quantity:fd.quantity,
   empname_send:fd.empname_send,
   empid_send:fd.empid_send,
   receivefrom:fd.receivefrom,
   empname_recieve:fd.empname_recieve,
   empid_recieve:fd.empid_recieve,
      date: fd.date,
      itemdes: fd.itemdes,
      make: fd.make,
      model:fd.model,
      serialNo:fd.serialNo,
      returnable: fd.returnable,
      sendto: fd.sendto,
      sendby:fd.sendby,
      signon:fd.signon,
      receivedate:fd.receivedate,
      receiveby:fd.receiveby,
      signonduty:fd.signonduty,
      remarks:fd.remarks,
      
    };
    const [formValues, setFormValues] = useState(basicInitialValues);
    console.log(formValues);
    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(editData(formValues));
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
                 Edit
                </Link>
              </Breadcrumbs>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-8 form-container"style={{ marginLeft: "0", marginRight: "0", maxWidth: "95%" }}>
              
                <form  onSubmit={handleSubmit}>
                <div className=" mb-3 form-heading-container">
                  <h3 className="form-heading">EDIT : LOAN REGISTER</h3>
                  <span className="line-box" style={{ width: "350px" }}></span>
                  </div>
                  <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="inputItemdes" className="form-label">
                     Item Description 
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputItemdes"
                      value={formValues.itemdes}
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
                      type="text"
                      className="form-control"
                      id="inputItemdes"
                      value={formValues.quantity}
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
                      type="text"
                      className="form-control"
                      id="inputItemdes"
                      value={formValues.signon}
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
                  value={formValues.make}
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
                  value={formValues.model}
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
                  value={formValues.serialNo}
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
                      value={formValues.sendto}
                      
                      
                      onChange={(e) =>
                        setFormValues({ ...formValues,sendto: e.target.value })
                      }
                    >
                    <option value="">Select Station</option>
                  {stationData
                    .filter((station) => station["Station Name"]) // Exclude entries with null station names
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
                                    value={formValues.sendby}
                                    
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
                      value={formValues.empname_send}
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
                      value={formValues.empid_send}
                      onChange={(e) =>
                        setFormValues({ ...formValues,empid_send: e.target.value })
                      }
                    />
                  </div>
                  </div>
                  <b>RECEIVING DETAILS</b>
                  <div className="row mb-3">
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
                      value={formValues.receivedate}
                      
                      
                      onChange={(e) =>
                        setFormValues({ ...formValues,receivedate: e.target.value })
                      }
                    />
                  </div>
                  
                  
                  <div className="col-6">
                    <label htmlFor="inputReceiveby" className="form-label">
                      Received By
                    </label>
                    <select
                      
                      className="form-control"
                      
                      id="inputReceiveby"
                      value={formValues.receiveby}
                      
                      
                      onChange={(e) =>
                        setFormValues({ ...formValues,receiveby: e.target.value })
                      }
                    >
                    <option value="">Select Station</option>
                  {stationData
                    .filter((station) => station["Station Name"]) // Exclude entries with null station names
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
                                  <label htmlFor="inputReceiveby" className="form-label">
                                    Received From
                                  </label>
                                  <select
                                    type="text"
                                    className="form-control"
                                    
                                    id="inputReceiveby"
                                    value={formValues.receivefrom}
                                    
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
                    <label htmlFor="inputSignon" className="form-label">
                    EMP Name
                    </label>
                    <input
                      type="sign"
                      className="form-control"
                      id="inputSignon"
                      value={formValues.empname_recieve}
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
                      value={formValues.empid_recieve}
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
                      value={formValues.remarks}
                      
                      
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
    
    export default EditLoanreg;