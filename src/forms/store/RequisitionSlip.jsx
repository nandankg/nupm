import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addParameter } from "../../reducer/store/ParameterReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
// import ParameterList from "./../tables/ParameterList";

const RequisitionSlip = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const basicInitialValues = {
    S_No: "",
    discriptionofmaterial: " ",
    demandedquantity: "",
    issuedquantity: "",
    dtrno: "",
    remarks: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addParameter(formValues));
    const newSrno = sNo + 1;
    setSNo(newSrno);

    navigate("/Requisition/list");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              requisition slip
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
                <h3 className="form-heading">Parameter</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputDOM" className="form-label">
                    Description of material
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDOM"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        discriptionofmaterial: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputDQ" className="form-label">
                    Demanded Quantity
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputDQ"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        demandedquantity: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4">
                  <label for="inputIssuedQuan" className="form-label">
                    Issued Quantity
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputIssuedQuan"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        issuedquantity: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-4">
                  <label for="inputDTR" className="form-label">
                    DTR No./Page No&Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDTR"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        dtrno: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label for="inputremark" className="form-label">
                  Remarks
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputremark"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      remarks: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary px-3 ">
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

export default RequisitionSlip;
