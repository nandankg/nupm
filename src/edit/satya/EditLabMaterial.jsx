import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import stationData from "../../station.json";
import {
  editData,
  fetchData,
} from "../../reducer/satya/LabMaterialTransactionReducer";

const EditLabMaterial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const LabRegister = useSelector((state) => state.labmaterial);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(LabRegister.data.data);
  const [items, setItems] = useState([]);
  const itmm = LabRegister.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(LabRegister.data.data);
  }, []);
  useEffect(() => {
    if (LabRegister) {
      setSlug(LabRegister.slug);
    }
  }, [LabRegister]);
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
    dtrno: fd.dtrno,
    failuredate: fd.failuredate,
    description: fd.description,
    quantity: fd.quantity,
    efr_no: fd.efr_no,
    receivedate: fd.receivedate,
    name: fd.name,
    desig: fd.desig,
    gearidLocation: fd.gearidLocation,
    issuedate: fd.issuedate,
    mdescription: fd.mdescription,
    quant: fd.quant,
    efrNo: fd.efrNo,
    invoiceDate: fd.invoiceDate, 
    invoiceno: fd.invoiceno,
    name1: fd.name1,
    desig1: fd.desig1,
    
    signissuer: fd.signissuer,
    signreceiver: fd.signreceiver,
    workLocation: fd.workLocation,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  const { toPDF, targetRef } = usePDF({
    filename: "Lab Material Transaction.pdf",
  });

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              LAB Material Transaction
            </Link>
            <Link underline="hover" color="inherit">
              Edit
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <button className="btn btn-primary" onClick={() => toPDF()}>
              <MdPictureAsPdf size={"25px"} color="#fff" />
              {/* Export To Pdf */}
            </button>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  EDIT: LAB Material Transaction Register
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputstrno" className="form-label">
                    DTR Register No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputstrno"
                    value={formValues.dtrno}
                    onChange={(e) =>
                      setFormValues({ ...formValues, dtrno: e.target.value })
                    }
                  />
                </div>
              </div>

              <h4 style={{ textAlign: "center" }}>RECEIPTS</h4>
              <div className="row">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="inputfailuredate" className="form-label">
                      Failure Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputfailuredate"
                      value={formValues.failuredate}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          failuredate: e.target.value,
                        })
                      }
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
                      value={formValues.description}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="inputquantity" className="form-label">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputquantity"
                      value={formValues.quantity}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          quantity: e.target.value,
                        })
                      }
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
                      value={formValues.efrno}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          efr_no: e.target.value,
                        })
                      }
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
                      value={formValues.receivedate}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          receivedate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div>
                    <label className="form-label">To Whom Received:</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputname"
                      placeholder="Name"
                      value={formValues.name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputname"
                      placeholder="Designation"
                      value={formValues.desig}
                      onChange={(e) =>
                        setFormValues({ ...formValues, desig: e.target.value })
                      }
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
                      value={formValues.gearidLocation}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          gearidLocation: e.target.value,
                        })
                      }
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
                      value={formValues.signissuer}
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
                    <label for="inputissuedate" className="form-label">
                      Date of Issue:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputissuedate"
                      value={formValues.issuedate}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          issuedate: e.target.value,
                        })
                      }
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
                      value={formValues.mdescription}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          mdescription: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="inputquantity" className="form-label">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputquantity"
                      value={formValues.quant}
                      onChange={(e) =>
                        setFormValues({ ...formValues, quant: e.target.value })
                      }
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
                      value={formValues.efrNo}
                      onChange={(e) =>
                        setFormValues({ ...formValues, efrNo: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div>
                    <label for="inputinvoicedate" className="form-label">
                      Invoice/Challan No. & Date:
                    </label>
                  </div>
                    
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      id="inputinvoiceno"
                      value={formValues.invoiceno}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          invoiceno: e.target.value,
                        })
                      }
                      required
                    /></div>
                    <div className="col-md-6">
                    <input
                      type="date"
                      className="form-control"
                      id="inputinvoicedate"
                      value={formValues.invoiceDate}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          invoiceDate: e.target.value,
                        })
                      }
                      required
                    /></div>
                </div>
                <div className="row mb-3">
                  <div>
                    <label className="form-label">To Whom Received:</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputname"
                      placeholder="Name"
                      value={formValues.name1}
                      onChange={(e) =>
                        setFormValues({ ...formValues, name1: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputname"
                      placeholder="Designation"
                      value={formValues.desig1}
                      onChange={(e) =>
                        setFormValues({ ...formValues, desig1: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label for="inputworklocation" className="form-label">
                      For What Work and Location:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.workLocation}
                      id="inputworklocation"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          workLocation: e.target.value,
                        })
                      }
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

export default EditLabMaterial;
