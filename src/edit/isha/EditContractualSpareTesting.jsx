import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, saveData,editData } from "../../reducer/redux/tableDataSlice";
import stationData from "../../station.json";
import Breadcrumbs from "@mui/material/Breadcrumbs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditContractualSpareTest = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
     const navigate = useNavigate();
        const location = useLocation();
        const { id } = location.state;
      console.log(id)
       
        const user = JSON.parse(localStorage.getItem("userdata"));
        const dispatch = useDispatch();
        const assetreg = useSelector((state) => state.data);
        const [formValues, setFormValues] = useState({});
  
      console.log(assetreg.data.data[0])
        // Fetch data on mount
        useEffect(() => {
          dispatch(fetchData({ formType: slug }));
        }, [dispatch]);
      
        // Initialize form values when data is loaded
        useEffect(() => {
          if (assetreg?.data?.data) {
            const filteredData = assetreg.data.data.find((item) => item.id === id);
            if (filteredData) {
              console.log(filteredData)
              setFormValues(filteredData);
            }
          }
        }, [assetreg, id]);
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormValues((prev) => ({
            ...prev,
            [name]: value,
          }));
        };
      
       console.log(formValues)   
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Submitted Data:", formValues);
      dispatch(editData({formType:slug,values:formValues}));
      navigate(`/list/${slug}`);
    };
  
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Contractual Spare Testing-signals
            </Link>
            <Link underline="hover" color="inherit">
              Edit
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "95%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                {/* <h3 className="form-heading">
                  Edit : Contractual Spare Testing Register-signals
                </h3>
                <span className="line-box" style={{ width: "700px" }}></span> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label for="inputName" className="form-label">
                    Item Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={formValues.item_description}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        item_description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label for="inputName" className="form-label">
                    Testing Details
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={formValues.testing_detail}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        testing_detail: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label for="inputempid" className="form-label">
                    Item Serial No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputempid"
                    value={formValues.item_serialName}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        item_serialName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label for="inputTopic" className="form-label">
                    Testing Locat./Gear ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTopic"
                    value={formValues.testingLocation}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        testingLocation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3 d-flex ">
                <div className="time col-md-6" style={{ textAlign: "center" }}>
                  <label for="inputhate" className="form-label">
                    TESTED TIME
                  </label>
                  <div className="d-flex gap-2">
                    <div className="col-md-5">
                      <label for="inputTimein" className="form-label">
                        From
                      </label>
                      <input
                        type="time"
                        required
                        className="form-control"
                        value={formValues.testedFrom}
                        id="inputTimein"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            testedFrom: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-5">
                      <label for="inputTimeout" className="form-label">
                        TO
                      </label>
                      <input
                        type="time"
                        required
                        className="form-control"
                        id="inputTimeout"
                        value={formValues.testedTo}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            testedTo: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="time col-md-6" style={{ textAlign: "center" }}>
                  <label for="inputhate" className="form-label">
                    TESTED DATE
                  </label>
                  <div className="d-flex gap-2 ">
                    <div className="col-md-5">
                      <label for="inputTimein" className="form-label">
                        From
                      </label>
                      <input
                        type="date"
                        required
                        className="form-control"
                        id="inputTimein"
                        value={formValues.dateFrom}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            dateFrom: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-5">
                      <label for="inputTimeout" className="form-label">
                        TO
                      </label>
                      <input
                        type="date"
                        required
                        className="form-control"
                        id="inputTimeout"
                        value={formValues.dateTo}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            dateTo: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3" style={{ marginTop: "20px" }}>
                  <label for="inputRemark" className="form-label">
                    Final Status
                  </label>
                  <select
                    class="form-select"
                    id="country"
                    name="country"
                    value={formValues.FinalStatus}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        FinalStatus: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="OK">OK</option>
                    <option value="NOK">NOK</option>
                  </select>
                </div>
                <div className="col-md-9" style={{ marginTop: "20px" }}>
                  <label for="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    value={formValues.remark}
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
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

export default EditContractualSpareTest;
