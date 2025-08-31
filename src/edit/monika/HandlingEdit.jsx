import React from "react";
import {
  fetchData,
  editData,
} from "../../reducer/monika/HandlingRegisterReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

function HandlingEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const HandlingRegisterList = useSelector((state) => state.handlingRegister);
  console.log(HandlingRegisterList.data.data);
  const [items, setItems] = useState([]);
  const itmm = HandlingRegisterList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(HandlingRegisterList.data.data);
  }, []);
  useEffect(() => {
    setItems(HandlingRegisterList.data.data);
    setSlug(HandlingRegisterList.slug);
  }, [HandlingRegisterList]);
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
    date: formatDate(fd.date),
    itemDescription: fd.itemDescription,
    partNo: fd.partNo,
    serialNo: fd.serialNo,
    locationFrom: fd.locationFrom,
    locationTo: fd.locationTo,
    qty: fd.qty,
    condition: fd.condition,
    authRefNo: fd.authRefNo,

    remarks: fd.remarks,
    handedOverBy:fd.handedOverBy,
    hname:fd.handedOverBy.name,
    hdesignation:fd.handedOverBy.designation,
    takenOverBy:fd.takenOverBy,
  
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues)); // Adjust this action based on your redux setup
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/form/handintaking-over-note"
            >
              Handing / Taking over Note
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                {/* <h3 className="form-heading">Handing / Taking Over Note</h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="inputItemDescription" className="form-label">
                    Item Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputItemDescription"
                    value={formValues.itemDescription}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        itemDescription: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputPartNo" className="form-label">
                    Part No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPartNo"
                    value={formValues.partNo}
                    onChange={(e) =>
                      setFormValues({ ...formValues, partNo: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputSerialNo" className="form-label">
                    Serial No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSerialNo"
                    value={formValues.serialNo}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        serialNo: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="inputLocationFrom" className="form-label">
                    Location From
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLocationFrom"
                    value={formValues.locationFrom}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        locationFrom: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputLocationTo" className="form-label">
                    Location To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLocationTo"
                    value={formValues.locationTo}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        locationTo: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputQty" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputQty"
                    value={formValues.qty}
                    onChange={(e) =>
                      setFormValues({ ...formValues, qty: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="inputCondition" className="form-label">
                    Condition
                  </label>
                  <select
                    className="form-control"
                    id="inputCondition"
                    value={formValues.condition}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        condition: e.target.value,
                      })
                    }
                  >
                    <option value="">Select...</option>
                    <option value="Defective">Defective</option>
                    <option value="Serviceable">Serviceable</option>
                    <option value="Repaired">Repaired</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputAuthRefNo" className="form-label">
                    Material ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAuthRefNo"
                    value={formValues.authRefNo}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        authRefNo: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputRemarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemarks"
                    value={formValues.remarks}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        remarks: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>Handed Over By</h5>
                  
                  <div className="mb-3">
                    <label htmlFor="inputHandedName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputHandedName"
                      value={formValues.handedOverBy.name}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          handedOverBy: {
                            ...formValues.handedOverBy,
                            name: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="inputHandedDesignation"
                      className="form-label"
                    >
                      Designation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputHandedDesignation"
                      value={formValues.handedOverBy.designation}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          handedOverBy: {
                            ...formValues.handedOverBy,
                            designation: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputHandedEmpId" className="form-label">
                      Emp ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputHandedEmpId"
                      value={formValues.handedOverBy.empId}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          handedOverBy: {
                            ...formValues.handedOverBy,
                            empId: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputHandedDate" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputHandedDate"
                      value={formValues.handedOverBy.date}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          handedOverBy: {
                            ...formValues.handedOverBy,
                            date: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <h5>Taken Over By</h5>
                  
                  <div className="mb-3">
                    <label htmlFor="inputTakenName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTakenName"
                      value={formValues.takenOverBy.name}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          takenOverBy: {
                            ...formValues.takenOverBy,
                            name: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="inputTakenDesignation"
                      className="form-label"
                    >
                      Designation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTakenDesignation"
                      value={formValues.takenOverBy.designation}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          takenOverBy: {
                            ...formValues.takenOverBy,
                            designation: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputTakenEmpId" className="form-label">
                      Emp ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTakenEmpId"
                      value={formValues.takenOverBy.empId}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          takenOverBy: {
                            ...formValues.takenOverBy,
                            empId: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputTakenDate" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputTakenDate"
                      value={formValues.takenOverBy.date}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          takenOverBy: {
                            ...formValues.takenOverBy,
                            date: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
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
}

export default HandlingEdit;
