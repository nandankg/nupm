import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { fetchData, editData,fetchMaterial } from "../../reducer/isha/DailyReceiptRedeucer";

const EditDailyTransactionRegister_RECEIPTS = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [material, setMaterial] = useState([]);
  const dailytaken = useSelector((state) => state.daliyreceipt);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(dailytaken.data.data);
  const [items, setItems] = useState([]);
  const[matName,setMatName]=useState("");
  const itmm = dailytaken.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(dailytaken.data.data);
    dispatch(fetchMaterial());
  }, []);


 

  useEffect(() => {
    if (dailytaken) {
      setSlug(dailytaken.slug);
    }
    setItems(dailytaken.data.data);
    setMaterial(dailytaken.material.data);
  }, [dailytaken]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  const filterDataById = (id) => {
    const result = material.filter(item => item.id === id);
    setMatName(result[0]?.materialName);
    setFormValues({
        ...formValues,
        material_desc: result[0]?.materialName,
      })
  };
  const fd = filteredData[0];
  const basicInitialValues = {

    id: fd.id,
    date: fd.date,
    serial_no:fd.serial_no,
    material_desc:fd.material_desc,
    material_id:fd.material_id,
    qty: fd.qty,
    challan_no: fd.challan_no,
    for_whatWork:fd.for_whatWork,
    challan_date: fd.challan_date,
    received_name:fd.received_name,
    received_designation:fd.received_designation,
    received_sign:fd.received_sign,
    ledger_no: fd.ledger_no,

   
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
                    <div class="col-md-6">
                        
                         

                    </div>
                    <div class="col-md-6">
                        <label for="inputName" class="form-label">
                          Material Description
                        </label>
                        <input
                        type="text" 
                        className='form-control'
                        id="inputmaintenanceschedule"
                        value={formValues.material_desc}
                        onChange={(e) =>
                          setFormValues({ ...formValues, material_desc: e.target.value })
                        }
                      />
                         

                    </div>
                   
      </div>
                 <div className="row mb-3">
                    <div className="col-md-6">
          <label for="inputName" className="form-label">
          Serial No.
          </label>
          <input
            type="text"required
            className="form-control"
            value={formValues.serial_no}
            name="serial_no"
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
                                value={formValues.qty}
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
                            Requisition Slip No
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="challanno"
                                value={formValues.challan_no}
                                onChange={(e) =>
                                    setFormValues({ ...formValues, challan_no: e.target.value })
                                }
                            />
                        </div>

                        <div className="col-md-6" style={{ textAlign: "center" }}>
                            <label htmlFor="inputTimeout" className="form-label">
                            Requisition Slip Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="challan_date"
                                value={formValues.challan_date}
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
                                name="received_name"
                                value={formValues.received_name}
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
                                value={formValues.received_designation}
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
                                name="for_whatWork"
                                value={formValues.for_whatWork}
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
                                        value={formValues.ledger_no}
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
export default EditDailyTransactionRegister_RECEIPTS;