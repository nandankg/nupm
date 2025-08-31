import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData,fetchData } from "../../reducer/store/DtrReceiptStoreReducer";
import { formatDate, formatTime } from "../../data/formatDate";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const DtrReceiptStore = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());

    const dispatch = useDispatch();
  const [items, setItems] = useState([]);
    const [slug, setSlug] = useState(getLastParameter().trim());
    console.log(items);
    const dtrreceipt = useSelector((state) => state.dtrreceipt);
useEffect(() => {
       
         dispatch(fetchData());
        // Re-fetch every 60 seconds
   
       // Cleanup interval on unmount
     }, [dispatch]);

     useEffect(() => {
         if (dtrreceipt.data?.data) {
           setItems(dtrreceipt.data.data);
           
         }
       }, [dtrreceipt]);
    const basicInitialValues = {
        date: formatDate(new Date().toDateString()),
        material_desc: "",
        material_id:"",
        serial_no:"",

        qty: "",
        challan_no: "",
        for_whatWork: "",
        challan_date: "",
        received_name: "",
        received_designation: "",
        ledger_no: "",
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
                                <label for="inputName" class="form-label">
                                    Material ID
                                </label>
                                <select 
                                className='form-control'
                                id="inputmaintenanceschedule"
                                onChange={(e) =>
                                  setFormValues({ ...formValues, material_id: e.target.value })
                                }
                              >
                                    <option value="">Select Material ID</option>
                                    <option value="MAT001">MAT001</option>
                                    <option value="MAT002">MAT002</option>
                                    <option value="MAT003">MAT003</option>
                                    <option value="MAT004">MAT004</option>
                                </select>

                            </div>
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
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="inputName" className="form-label">
                                        Description Of Material
                                    </label>
                                    <input
                                        type="text"required
                                        className="form-control"
                                        name="descriptionofmaterial"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, material_desc: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputempid" className="form-label">
                                        Quantity
                                    </label>
                                    <input
                                        type="Text"
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
                                        <b >Invioce</b>
                                    </label>
                                </div>
                                <div className="col-6" style={{ textAlign: "center" }}>
                                    <label htmlFor="inputTimein" className="form-label">
                                        ChallanNo.
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
                                        Date
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
                                        Ledger No.
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ledgerno"
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

export default DtrReceiptStore;
