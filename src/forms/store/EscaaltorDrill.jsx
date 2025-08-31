import React, { useState } from "react";

import { addDrill } from "../../reducer/store/EscalatorDrillReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const EscaaltorDrill = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [sNo, setSNo] = useState(1);

  const basicInitialValues = {
    date: "",
    station: "",
    escalatorno: "",
    name: "",
    empid: "",
    pointno: "",
    from: "",
    to: "",
    onoff: "",
    emergency: "",
    totaltimetaken: "",
    nameoftc: "",
    empidtc: "",
    remarks: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addDrill(formValues));
    navigate("/drilllist");
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-8 form-container">
          <form onSubmit={handleSubmit}>
            <div className=" mb-3 form-heading-container">
              <h3 className="form-heading">Escalator Drill</h3>
              <div className="heading-line"></div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputStation" className="form-label">
                  STATION
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputaStation"
                  onChange={(e) =>
                    setFormValues({ ...formValues, station: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label for="inputEscNo" className="form-label">
                  Escalator No
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEscNo"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      escalatorno: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputname" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputname"
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label for="EID" className="form-label">
                  EMP ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEID"
                  onChange={(e) =>
                    setFormValues({ ...formValues, empid: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputPointNo" className="form-label">
                  POINT NO
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPointNo"
                  onChange={(e) =>
                    setFormValues({ ...formValues, pointno: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label for="inputfrom" className="form-label">
                  FROM
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputfrom"
                  onChange={(e) =>
                    setFormValues({ ...formValues, from: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputto" className="form-label">
                  TO
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputto"
                  onChange={(e) =>
                    setFormValues({ ...formValues, to: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label for="inputemer" className="form-label">
                  Emergency
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputemer"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      emergency: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputonoff" className="form-label">
                  Onn,Off
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputonoff"
                  onChange={(e) =>
                    setFormValues({ ...formValues, onoff: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label for="inputTTT" className="form-label">
                  TOTAL TIME TAKEN
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputTTT"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      totaltimetaken: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputNameOfTc" className="form-label">
                  NAME OF TC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputNameOfTc"
                  onChange={(e) =>
                    setFormValues({ ...formValues, nameoftc: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label for="inputEmpIdTc" className="form-label">
                  EMP ID TC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmpIdTc"
                  onChange={(e) =>
                    setFormValues({ ...formValues, empidtc: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-md-6">
              <label for="inputRemark" className="form-label">
                REMARKS
              </label>
              <input
                type="text"
                className="form-control"
                id="inputRemark"
                onChange={(e) =>
                  setFormValues({ ...formValues, remarks: e.target.value })
                }
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* </div>
        
      </div> */}
    </>
  );
};

export default EscaaltorDrill;
