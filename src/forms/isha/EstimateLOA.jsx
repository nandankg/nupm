import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData, budgetheadList,subheadList, } from "../../reducer/isha/EstimateLOAReducer";
import { formatDate, formatTime } from "../../data/formatDate";
const EstimateLOARegister = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
const [budgetHead, setBudgetHead] = useState([]);
  const [subHead, setSubHead] = useState([]);
  const dispatch = useDispatch();
  const eloa = useSelector((state) => state.estimateloa);
  const [slug, setSlug] = useState("");
  const [bdata, setBdata] = useState("");
  const [blist, setBlist] = useState([]);
  const [loa, setLoa] = useState({});

  console.log(subHead);
  
  console.log(eloa);
  const bheadSubmit = (e)=>{
    const bgid=e.target.value;
    const floa = subHead.filter((itm) => {
      console.log(itm)
      return itm.id == bgid;
    });
    console.log(bgid)
console.log(floa)
    setBdata(floa);

  }
  // useEffect(() => {
  //   const floa = subHead.filter((itm) => {
  //     return itm.budgetHead_id === bgtid;
  //   });

  //   setBdata(floa);
  // }, [subHead]);
  useEffect(() => {
    if (bdata) {
      setFormValues({
        ...formValues,
        budgetHead_id:bdata[0]?.budgetHead_id,
       
        department: bdata[0]?.department,
        budgetHead: bdata[0]?.budgetHead,
        budgetSubhead: bdata[0]?.budgetSubhead,
        
      });
    }
  }, [bdata]);
  useEffect(() => {
    dispatch(budgetheadList());
  }, [dispatch]);
  useEffect(() => {
    if (eloa) {
      setSlug(eloa.slug);
      setBudgetHead(eloa?.budgethead);
      setSubHead(eloa?.subHead)
    }
  }, [eloa]);

  const basicInitialValues = {
    budgetHead_id:"",
    budgetHead: "",
    budgetSubhead: "",
    financialYear:"2025-26",
    department: "",
    WorkType: "",
    amountVetted: "",
    amountLoaIssued: "",
    partyName: "",
    date: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
     if(name==="budgetHead"){
      setSubHead([])
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    let budgeramt=parseFloat(bdata[0]?.balance_amount)
    formValues.amountLoaIssued=parseFloat(formValues.amountLoaIssued)
    if (formValues.amountVetted > budgeramt) {
      alert(" Amount vetted cannot be greater than Balance Budget Amount")
      setFormValues({
        ...formValues,
        amountVetted: 0,
      });
     
    }
  }, [formValues.amountVetted]);

  useEffect(() => {
    let budgeramt=parseFloat(bdata[0]?.balance_amount)
    formValues.amountVetted=parseFloat(formValues.amountVetted)
    formValues.amountLoaIssued=parseFloat(formValues.amountLoaIssued)
    if (formValues.amountLoaIssued > budgeramt) {
      alert("LOA Amount cant be greater than Balance Budget Amount")
      setFormValues({
        ...formValues,
        amountLoaIssued: 0,
      });
     
    }
  }, [formValues.amountLoaIssued]);
const getSubhead = (e) => {
    
    const depart=e.target.value;
    setFormValues({
      ...formValues,
      department: depart,
    });
    // Dispatch to Redux
    dispatch(subheadList({budgetHead:formValues.budgetHead,financialYear:formValues.financialYear,department:depart}))
      .then((response) => {
        setSubHead(response.payload.data);
        console.log(response.payload)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
   
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
    console.log(formValues)
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Estimate and LOA
            </Link>
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
              List
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "95%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Finance : Estimate and LOA </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Budget Head
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    id="inputName"
                    name="budgetHead"
                    value={formValues.budgetHead}
                      onChange={handleChange}
                    
                    required
                  >
                    <option value="">Select Budget Head</option>
                    {budgetHead?.map((item) => (
                    <option value={item}>
                      {item}
                    </option>
                  ))}
                  </select>
                </div>
                    <div className="col-md-6">
                <label>Financial Year</label>
                <select
                  name="financialYear"
                  className="form-control"
                  value={formValues.financialYear}
                  onChange={handleChange}
                >
                  <option value="">Select FY</option>
                 
                  
                  <option value="2025-26">2025-26</option>
                  
                </select>
              </div>
              </div>
              <div className="row mb-3">
                 <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    Department
                  </label>
                   <select
                  name="department"
                  className="form-control"
                  value={formValues.department}
                 
                  onChange={getSubhead}
                >
                  <option value="">Select Department</option>
                  <option value="signalling">Signalling</option>
                  <option value="telecom">Telecom</option>
                  <option value="Operation">Operation</option>
                  <option value="sdc">SDC</option>
                  <option value="Finance">Finance</option>
                  <option value="Mainline">Mainline</option>
                </select>
                </div>
                <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    Sub Head
                  </label>
                  <select
                  type="text"
                  className="form-control"
                  id="subHead"
                   name="subHead"
                  onChange={bheadSubmit}
                >
                  <option value=" ">Select Sub-Head</option>
                  {subHead?.map((sub,index)=>(
                    <option value={sub.id}>{sub.budgetSubhead}</option>
                  ))}
                  </select>
                </div>
               
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputTimein" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputTimein"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputTimeout" className="form-label">
                    Type Of Work
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTimeout"
                    onChange={(e) =>
                      setFormValues({ ...formValues, WorkType: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputTopic" className="form-label">
                 Balance Budget Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTopic"
                    value={bdata[0]?.balance_amount}
                    
                    readOnly
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputTopic" className="form-label">
                    Total Estimated Amount Vetted
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTopic"
                    value={formValues.amountVetted}
                    onChange={(e) =>
                     
                        setFormValues({ ...formValues, amountVetted: e.target.value })
                       
                   
                    }
                   
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputRemark" className="form-label">
                    Amount For Which LOA Issued
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={formValues.amountLoaIssued}
                    id="inputRemark"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        amountLoaIssued: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label for="inputTimein" className="form-label">
                    Party Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTimein"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        partyName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label for="inputTimein" className="form-label">
                    NOTE : Estimated Amount will be deducted form Original
                    Budget(Previous Form) if Revised Amount is not allotted
                  </label>
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary px-3">
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

export default EstimateLOARegister;
