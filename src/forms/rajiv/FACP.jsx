import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

import { addData, addFACPRegister } from "../../reducer/rajiv/FACPReducer";

const FACP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const FACPList = useSelector((state) => state.FACPRegister);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (FACPList) {
      setSlug(FACPList.slug);
    }
  }, [FACPList]);
  const basicInitialValues = {
    date: formatDate(new Date().toString()),
    Employ_id: "",
    mcp_no: "",
    operated_location: "",
    operated_alarm: "",
    from_time: "",
    to_time: "",
    name_of_tc: "",
    empoyee_id_tc: "",
    remarks: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Replace 'addDocument' with the actual action creator from your redux slice
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              FACP Drill Register
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container"></div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="inputESC.NO" className="form-label">
                    Name Of SC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputESC.NO"
                    required
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        name_of_sc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="input Emp.Id." className="form-label">
                    Emp.Id.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input Emp.Id."
                    required
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Employ_id: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputMCP.No" className="form-label">
                    MCP.No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputMCP.No"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        mcp_no: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputOperatedLocation" className="form-label">
                    Operated (Location/Zone)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputOperatedLocation"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        operated_location: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputOperatedAlaram" className="form-label">
                    Operated (Alaram Yes/No)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputOperatedAlaram"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        operated_alarm: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputTimeFrom" className="form-label">
                    Time (From)
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputinputTimeFrom"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        from_time: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputTimeTo" className="form-label">
                    Time (To)
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputinputTimeTo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        to_time: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4">
                  <label htmlFor="inputNameOfTC" className="form-label">
                    Name Of TC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNameOfTC"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        name_of_tc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="inputEmpId" className="form-label">
                    Emp.Id Of Tc
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmpId"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        empoyee_id_tc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="inputRemarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemarks"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        remarks: e.target.value,
                      })
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

export default FACP;
