import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  revisedBudget,
  editData,
  budgetheadList,
  subheadList,
  newsubheadList,
  fetchData,
} from "../../reducer/store/BudgetAllotmentReducer";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);

const BudgetAllotmentForm = () => {
  const navigate = useNavigate();
  const [bgtid, setBgtid] = useState("");
  const [slug, setSlug] = useState("");
  const [department, setDepartment] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [budgetHead, setBudgetHead] = useState([]);
  const [subHead, setSubHead] = useState([]);
  console.log("Subhead")
   console.log(subHead);
  const [loa, setLoa] = useState({});
  const eloa = useSelector((state) => state.budgetallotment);
  const [formData, setFormData] = useState({
    budgetHead_id:"",
    budgetHead: "",
    budgetSubhead: "",
    financialYear: "2025-26",
    department: "",
    budgetType: "original",
    amount: "",
  });
  console.log(eloa);
  console.log(budgetHead);
  console.log(subHead);
  const dispatch = useDispatch();

  const bheadSubmit = (e)=>{
    let bid=e.target.value;
    console.log(bid)
  bid=parseInt(bid)
    const floa = subHead.filter((itm) => {
      
      return itm.id === bid;
    });
    setLoa(floa);
    console.log(floa)
    console.log(floa[0].budgetSubhead)
   
    setFormData({
      ...formData,
      budgetSubhead: floa[0]?.budgetSubhead,
    });
    let amt=floa[0]?.amount;
    let bamt=floa[0]?.balance_amount;
    amt=parseInt(amt)
  if(amt>0 && bamt>0){
    alert("Budget Allotment Already done Balance Amount :"+bamt)

  }
  else if(amt>0 && bamt<=0){
    {
      alert("Budget Allotment Exhausted Balance Amount :"+bamt)
  
    }
  }
  }
      const handleFilterChange = (e) => {
                const { name, value } = e.target;
               setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            };

            // const filteredData = budgetData.filter(item => 
            //     (!formData.budgetHead || item.budgetHead.toLowerCase().includes(formData.budgetHead.toLowerCase())) &&
            //     (!formData.budgetSubhead || item.budgetSubhead.toLowerCase().includes(formData.budgetSubhead.toLowerCase())) &&
            //     (!formData.financialYear || item.financialYear.includes(formData.financialYear)) &&
            //     (!formData.department || item.department.toLowerCase().includes(formData.department.toLowerCase()))
            // );
            // console.log(filteredData)
            
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==="budgetHead"){
      setSubHead([])
    }
      
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    dispatch(budgetheadList());
  }, [dispatch]);
  useEffect(() => {
    setFormData({
      ...formData,
      budgetHead_id: loa[0]?.id,
    });
  }, [loa]);
  useEffect(() => {
    
      setSlug(eloa?.slug);
      setBudgetHead(eloa?.budgethead);
      setSubHead(eloa?.subHead)
      setBudgetData(eloa?.data)

  
  }, [eloa]);
console.log(formData)
  const getSubhead = (e) => {
    const dept=e.target.value;
    setFormData({
      ...formData,
      department:e.target.value,
    });
    if(formData.budgetType==="original"){
 dispatch(newsubheadList({budgetHead:formData.budgetHead}))
      .then((response) => {
        setSubHead(response.payload.data);
        console.log(response.payload)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    }
else{
    const dept=e.target.value;
    setFormData({
      ...formData,
      department:e.target.value,
    });
    // Dispatch to Redux
    dispatch(subheadList({budgetHead:formData.budgetHead,financialYear:formData.financialYear,department:dept}))
      .then((response) => {
        setSubHead(response.payload.data);
        console.log(response.payload)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
   
  }};
console.log(formData)

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dispatch to Redux
    if(formData.budgetType==="revised"){
      dispatch(revisedBudget({id:formData.budgetHead_id,budgetSubhead:formData.budgetSubhead,financialYear:formData.financialYear,department:formData.department,amount:formData.amount}))
      .then((response) => {
        alert(response.payload.message)
        console.log("Revised Budget Allotment submitted", response);
        if(response.payload.success){
          navigate(`/list/expenditure-budget-register`);
        }
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
      });
    }
    else{
    dispatch(editData(formData))
      .then((response) => {
        alert(response.payload.message)
        console.log("Budget Allotment submitted", response);
          if(response.payload.success){
          navigate(`/list/expenditure-budget-register`);
        }
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
      });
    }
    // navigate(`/list/expenditure-budget-register`);
  };

  return (
    <div className="container">
      <h1>Finance Department</h1>
      <h3 className="form-heading">Budget Allotment</h3>
      <div className="row justify-content-center">
        <div
          className="col-md-8 form-container"
          style={{ marginLeft: "0", marginRight: "0", maxWidth: "75%" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-8">
                <label>Budget Type</label>
                <br />
                <input
                  type="radio"
                  name="budgetType"
                  value="original"
                  checked={formData.budgetType === "original"}
                  onChange={handleChange}
                />
                Original Budget Allotment
                <input
                  type="radio"
                  name="budgetType"
                  value="revised"
                  className="ms-3"
                  checked={formData.budgetType === "revised"}
                  onChange={handleChange}
                />
                Revised Budget Allotment
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputName" className="form-label">
                  Select  Budget Head
                </label>
                <select
                  type="text"
                  className="form-control"
                  name="budgetHead"
                  onChange={handleChange}
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
                  value={formData.financialYear}
                  onChange={handleChange}
                >
                  <option value="">Select FY</option>
                 
                 
                  <option value="2025-26">2025-26</option>
                   
                </select>
              </div>
          
                
              </div>
       
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Department</label>
                <select
                  name="department"
                  className="form-control"
                  value={formData.department}
                 
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
                <label>Sub Head</label>
              
                {formData.budgetType==="original"?( <>
                    <select
                  type="text"
                  className="form-control"
                  id="subHead"
                   name="budgetSubhead"
                  onChange={handleChange}
                > 
                  <option value=" ">Select Sub-Head</option>
                  {subHead?.map((sub)=>(
                    <option value={sub}>{sub}</option>
                  ))}</select></> ):(<>  <select
                  type="text"
                  className="form-control"
                  id="subHead"
                   name="budgetHead_id"
                  onChange={bheadSubmit}
                >
                    <option value=" ">Select Sub-Head</option>
                  {subHead?.map((sub,index)=>(
                    <option value={sub.id}>{sub.budgetSubhead}</option>
                  ))} </select></>
                  )
  }
                 
                  </div>
              
            </div>
             <div className="row mb-3">
             
               
               
                {loa[0]?.amount>0 && loa[0]?.balance_amount>0?(
                  <>
                   <div className="col-md-12">
                  <label>Balance Amount</label>
                  <input
                  type="number"
                  name="amount"
                  className="form-control"
                  value={loa[0].balance_amount}
                  onChange={handleChange}
                  readOnly
                />  <label>New Allotment Amount</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  value={formData.amount}
                  onChange={handleChange}
                />
                </div>
                </>):(
                  <>
                   <div className="col-md-12">
                  <label>New Allotment Amount</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  value={formData.amount}
                  onChange={handleChange}
                />
                </div>
                </>)}
                
            
            </div>
           
            
<button type="submit">Save</button>
            
          </form>
          <p>
            Note: Revised Budget allotment will be done only if Original budget
            is exhausted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetAllotmentForm;
