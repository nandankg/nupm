import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/monika/HandlingRegisterReducer";
import { formatDate } from "../../data/formatDate";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const HandlingRegister = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const handlingRegister = useSelector((state) => state.handlingRegister);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);
 
  const basicInitialValues = {
    date: formatDate(date.toString()),
    itemDescription: "",
    partNo: "",
    serialNo: "",
    locationFrom: "",
    locationTo: "",
    qty: "",
    condition: "",
    authRefNo: "",

    remarks: "",
    handedOverBy: {
      sign: "",
      name: "",
      designation: "",
      empId: "",
      date: "",
    },
    takenOverBy: {
      sign: "",
      name: "",
      designation: "",
      empId: "",
      date: "",
    },
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues)); // Adjust this action based on your redux setup
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
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
                    onChange={(e) =>
                      setFormValues({ ...formValues, serialNo: e.target.value })
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
                    min="1"
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
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>Handed Over By</h5>
                  {/* <div className="mb-3">
                    <label htmlFor="inputHandedSign" className="form-label">
                      Sign
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputHandedSign"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          handedOverBy: {
                            ...formValues.handedOverBy,
                            sign: e.target.value,
                          },
                        })
                      }
                    />
                  </div> */}
                  <div className="mb-3">
                    <label htmlFor="inputHandedName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputHandedName"
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
                  {/* <div className="mb-3">
                    <label htmlFor="inputTakenSign" className="form-label">
                      Sign
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTakenSign"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          takenOverBy: {
                            ...formValues.takenOverBy,
                            sign: e.target.value,
                          },
                        })
                      }
                    />
                  </div> */}
                  <div className="mb-3">
                    <label htmlFor="inputTakenName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTakenName"
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
};

export default HandlingRegister;
