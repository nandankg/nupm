import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import stationData from "../../station.json";
import {
  addData,
  addLab,
} from "../../reducer/satya/LabMaterialTransactionReducer";

const LabMaterialTransactionRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LabRegister = useSelector((state) => state.labmaterial);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (LabRegister) {
      setSlug(LabRegister.slug);
    }
  }, [LabRegister]);

  const basicInitialValues = {
    dtrno: "",
    failuredate: "",
    description: "",
    quantity: "",
    efr_no: "",
    receivedate: "",
    name: "",
    desig: "",
    gearidLocation: "",
    issuedate: "",
    mdescription: "",
    quant: "",
    efrNo: "",
    invoiceDate: "",
    invoiceno: "",
    name1: "",
    desig1: "",
    sign1:"",
    signissuer:"",
    signreceiver:"",
    workLocation: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    console.log("submit");
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              LAB Material Transaction(Under Maintainance)
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
                  LAB Material Transaction Register
                </h3>
                <div className="heading-line"></div>
              </div>
             
                

              <h4 style={{ textAlign: "center" }}>RECEIPTS</h4>
              <div className="row mb-3">
                <div className="row mb-3">
                <div className="col-md-6">
                    <label for="inputfailuredate" className="form-label">
                      SR No:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputfailuredate"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          dtrno: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputfailuredate" className="form-label">
                      Failure Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputfailuredate"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          failuredate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputdescription" className="form-label">
                      Description of Material:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputdescription"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
               
                  <div className="col-md-6">
                    <label for="inputquantity" className="form-label">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputquantity"
                      min="1"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          quantity: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label for="inputefrno" className="form-label">
                      EFR No.:
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      id="inputefrno"
                      min="1"
                      onChange={(e) =>
                        setFormValues({ ...formValues, efr_no: e.target.value })
                      }
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label for="inputreceiveddate" className="form-label">
                      Date of Receiving:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputreceiveddate"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          receivedate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  </div>

                <div className="row mb-3">
                  <div>
                    <label className="form-label">From Whom Received:</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputname"
                      placeholder="Name"
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputname"
                      placeholder="Designation"
                      onChange={(e) =>
                        setFormValues({ ...formValues, desig: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="inputgearid" className="form-label">
                      Gear Id & Location:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputgearid"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          gearidLocation: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputgearid" className="form-label">
                    Station (where Gears was Installed):
                    </label>
                  
                    <select
                                                       className="form-control"
                                                       id="inputmonth"
                                                       value={formValues.signreceiver}
                                                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          signreceiver: e.target.value,
                        })
                      }
                                                     >
                                                     <option value="">Select Station</option>
                                                     {stationData
                                                       .filter((station) => station["Station Name"]) // Exclude entries with null station names
                                                       .map((station) => (
                                                         <option
                                                           key={station["STATION Code"]}
                                                           value={station["Station Name"]}
                                                         >
                                                           {station["Station Name"]}
                                                         </option>
                                                       ))}
                                                     </select>
                  </div>
                </div>
                  <div className="row mb-3">
                  <div className="col-md-12">
                    <label for="inputgearid" className="form-label">
                      Reason for Fault :
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputgearid"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          signissuer: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  </div>
              </div>

              <h4 style={{ textAlign: "center" }}>ISSUES</h4>
              <div className="row mb-3">
                <div className="row mb-3">
                <div className="col-md-6">
                    <label for="inputfailuredate" className="form-label">
                      SR No:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputfailuredate"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          dtrno: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputissuedate" className="form-label">
                      Date of Issue:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputissuedate"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          issuedate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputmdesciption" className="form-label">
                      Description of Material:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputmdesciption"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          mdescription: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
              
                  <div className="col-md-6">
                    <label for="inputquantity" className="form-label">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputquantity"
                      min="1"
                      onChange={(e) =>
                        setFormValues({ ...formValues, quant: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputefrno" className="form-label">
                      EFR No.:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputefrno"
                      min="1"
                      onChange={(e) =>
                        setFormValues({ ...formValues, efrNo: e.target.value })
                      }
                      required
                    />
                  </div>
                
              
                    
                  <div className="col-md-6">
                  <label for="inputinvoicedate" className="form-label">
                      Invoice/Challan No.
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputinvoiceno"
                      min="1"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          invoiceno: e.target.value,
                        })
                      }
                      required
                    /></div>
                    <div className="col-md-6">
                    <label for="inputinvoicedate" className="form-label">
                      Invoice Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputinvoicedate"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          invoiceDate: e.target.value,
                        })
                      }
                      required
                    /></div>
               
                  <div>
                    <label className="form-label">To Whom Issued:</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputname"
                      placeholder="Name"
                      onChange={(e) =>
                        setFormValues({ ...formValues, name1: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputname"
                      placeholder="Designation"
                      onChange={(e) =>
                        setFormValues({ ...formValues, desig1: e.target.value })
                      }
                      required
                    />
                  </div>
               
                  <div className="col-md-6">
                    <label for="inputworklocation" className="form-label">
                      For What Work and Location:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputworklocation"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          workLocation: e.target.value,
                        })
                      }
                    required
                    />
                  </div>
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

export default LabMaterialTransactionRegister;
