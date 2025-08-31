import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { fetchData, addData,fetchMaterial } from "../../reducer/isha/DailyReceiptRedeucer";
import { formatDate, formatTime } from "../../data/formatDate";
const user = JSON.parse(localStorage.getItem("userdata"));

let deprt = user?.department.toLowerCase();
console.log(deprt);
let dp;

var txt1,txt2;
if (deprt === "afc-store") {
    txt1 = "Invoice /Challan No/Handover Note";
    txt2 = "'Invoice /Challan No/Handover Date";
}
if (deprt === "afc-mainline") {
  txt1 = "Requisition Slip No";
  txt2 = "Requisition Slip Date";
  
}
if (deprt === "signalling") {
    txt1 = "invoice/challan/HO No";
    txt2 = "invoice/challan/HO Date";
}
if (deprt === "operation") {
    txt1 = "Requisition Slip No";
    txt2 = "Requisition Slip Date";
}
if (deprt === "telecom") {
    txt1 = "Requisition Slip No";
    txt2 = "Requisition Slip Date";
}
function getLastParameter() {
    const pathname = window.location.pathname;
    const pathSegments = pathname.split("/").filter(Boolean);
    return pathSegments[pathSegments.length - 1];
  }
const DailyTransactionRegister_RECEIPTS = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
const [items, setItems] = useState([]);
const [material, setMaterial] = useState([]);
    const dispatch = useDispatch();
    const daily = useSelector((state) => state.daliyreceipt);
    
    console.log(material);
   

    const [slug, setSlug] = useState(getLastParameter().trim());
    let c=0
   

useEffect(() => {
    const delayedFunction = () => {
        dispatch(fetchData());
        dispatch(fetchMaterial());
    };

    // Set a timeout to call the function after 3 seconds
    const timeout = setTimeout(delayedFunction, 1000); // 3000ms = 3 seconds

    // Clean up the timeout if the component unmounts before the delay
    return () => clearTimeout(timeout); // Cleanup interval on unmount
   }, [dispatch]);



     useEffect(() => {
         if (daily.data?.data) {
           setItems(daily.data.data);
           setMaterial(daily.material.data);
         }
       }, [daily]);
   const[matName,setMatName]=useState("");
    const basicInitialValues = {
        date: "",
        material_desc: "",
        material_id:"",
        qty: "",
        challan_no: "",
        for_whatWork: "",
        challan_date: "",
        received_name: "",
        received_designation: "",
        received_sign:"",
        ledger_no: "",
    };
    const [formValues, setFormValues] = useState(basicInitialValues);
    console.log(formValues);
    let mtid="";
mtid=formValues.material_id;
const[filteredData,setFilteredData]=useState({});
const filterDataById = (id) => {
    const result = material.filter(item => item.id === id);
    setMatName(result[0]?.materialName);
    setFormValues({
        ...formValues,
        material_desc: result[0]?.materialName,
      })
  };
  useEffect(()=>{
    
    let mid =parseInt(formValues.material_id)
    filterDataById(mid)
  },[formValues.material_id])



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
                            DTR-Receipt
                        </Link>
                        <Link underline="hover" color="inherit" >
                        Register
                        </Link>
                    </Breadcrumbs>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 form-container" style={{ maxWidth: "95%" }}>
                        <form onSubmit={handleSubmit}>
                            <div className=" mb-3 form-heading-container">
                                <h3 className="form-heading"> DTR-Receipt </h3>
                                <span className="line-box" style={{ width: "200px" }}></span>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                  <label for="inputName" className="form-label">
                  Date
                  </label>
                  <input
                    type="date"required
                    className="form-control"
                    name="date"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                            <div class="col-md-4">
                                <label for="inputName" class="form-label">
                                  Select  Material
                                </label>
                                <select 
                                className='form-control'
                                id="inputmaintenanceschedule"
                                onChange={(e) =>
                                  setFormValues({ ...formValues, material_id: e.target.value })
                                }
                              >
                                    <option value="">Select Material</option>
                                    {material.map((itm)=>(<option value={itm.id}>{itm.materialName}</option>))}
                                   
                                </select>

                            </div>
                            {formValues.material_id === "" ? (
                <div className="col-md-4">
                  <label>New  Material</label>
                  <input
                    type="text"
                    name="material_desc"
                    className="form-control"
                    value={formValues.material_desc}
                    onChange={(e) =>
                        setFormValues({ ...formValues, material_desc: e.target.value })
                      }
                    required
                  />
                </div>
              ) : (
                <div className="col-md-4">
                  <label>Material Desc</label>
                  <input
                    type="text"
                    name="material_desc"
                    className="form-control"
                    value={matName}
                    onChange={(e) =>
                        setFormValues({ ...formValues, material_desc: e.target.value })
                      }
                    disabled
                  />
                </div>
              )}
              </div>
                         <div className="row mb-3">
                            <div className="col-md-6">
                  <label for="inputName" className="form-label">
                  Serial No.
                  </label>
                  <input
                    type="text"required
                    className="form-control"
                    name="descriptionofmaterial"
                    onChange={(e) =>
                      setFormValues({ ...formValues, serial_no: e.target.value })
                    }
                  />
                </div>
                            
                                <div className="col-md-6">
                                    <label htmlFor="inputempid" className="form-label">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="quantity"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, qty: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12" style={{ textAlign: "center" }}>
                                    <label htmlFor="inputhate" className="form-label">
                                        <b >Invoice</b>
                                    </label>
                                </div>
                                <div className="col-6" style={{ textAlign: "center" }}>
                                    <label htmlFor="inputTimein" className="form-label">
                                   {txt1}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="challanno"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, challan_no: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="col-md-6" style={{ textAlign: "center" }}>
                                    <label htmlFor="inputTimeout" className="form-label">
                                    {txt2}
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="date"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, challan_date: e.target.value })
                                        }
                                    />
                                </div>

                            </div>
                            <div className="row mb-3">
                                <div className="col-12" style={{ textAlign: "center" }}>
                                    <label htmlFor="inputhate" className="form-label">
                                        <b >From Whom Receive</b>
                                    </label>
                                </div>
                                <div className="col-6" style={{ textAlign: "center" }}>
                                    <label htmlFor="inputTimein" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, received_name: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="col-md-6" style={{ textAlign: "center" }}>
                                    <label htmlFor="inputTimeout" className="form-label">
                                        Designation
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="designation"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, received_designation: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row md-3">
                                <div className="col-6" style={{ textAlign: "center" }}>
                                    <label htmlFor="inputTimein" className="form-label">
                                        For What Work
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="forwhatwork"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, for_whatWork: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="col-6" style={{ textAlign: "center" }}>
                                <label htmlFor="inputTimein" className="form-label">
                                       Remarks
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ledger_no"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, ledger_no: e.target.value })
                                        }
                                    />
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

export default DailyTransactionRegister_RECEIPTS;
