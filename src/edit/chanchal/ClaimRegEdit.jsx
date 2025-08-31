import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import stationData from "../../station.json";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/redux/tableDataSlice";
import { dtrissue } from "../../utils/formUtils";
import Breadcrumbs from "@mui/material/Breadcrumbs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const ClaimRegEdit = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [formValues, setFormValues] = useState({});

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch]);

  // Initialize form values when data is loaded
  useEffect(() => {
    if (loanregister?.data?.data) {
      const filteredData = loanregister.data.data.find(
        (item) => item.id === id
      );
      if (filteredData) {
        setFormValues(filteredData);
      }
    }
  }, [loanregister, id]);
  console.log(formValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData({ formType: slug, values: formValues }));
    navigate(`/list/${slug}`);
  };

    const handleSave = () => {
    dispatch(saveData(id));
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Claim Registration</h2>
      <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Claim Registration Register</h3>
                <div className="heading-line"></div>
              </div>
             
               
                
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputDate" className="form-label">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="inputDate"
                    value={formValues.dateAndTime}
                    onChange={(e) =>
                      setFormValues({ ...formValues, dateAndTime: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Name of Claimant
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={formValues.claimantName}
                    onChange={(e) =>
                      setFormValues({ ...formValues, claimantName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputdesOfArticle" className="form-label">
                    Description of Article
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdesOfArticle"
                    value={formValues.articleDescription}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        articleDescription: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputarticleLost" className="form-label">
                    Place Article Lost
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputarticleLost"
                    value={formValues.articleLostPlace}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        articleLostPlace: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-6">
                  <label for="inputDate" className="form-label">
                   Station
                  </label>
                  <select
                    
                    className="form-control"
                    id="inputDate"
                    value={formValues.station}
                    onChange={(e) =>
                      setFormValues({ ...formValues, station: e.target.value })
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
                <div className="col-md-6">
                  <label for="inputph_no" className="form-label">
                    Contact No.
                  </label>
                  <input
                    type="text"
                    name="numbers"
                    pattern="\d{10}"
                    required
                    className="form-control"
                    id="inputph_no"
                    value={formValues.contactNo}
                    onChange={(e) =>
                      setFormValues({ ...formValues, contactNo: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputaddress" className="form-label">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputaddress"
                    value={formValues.residentialAddress}
                    onChange={(e) =>
                      setFormValues({ ...formValues, residentialAddress: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
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
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputDate" className="form-label">
                  sc Emp ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDate"
                    value={formValues.scEmp}
                    onChange={(e) =>
                      setFormValues({ ...formValues, scEmp: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                  sc EMP Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={formValues.scName}
                    onChange={(e) =>
                      setFormValues({ ...formValues, scName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputDate" className="form-label">
                  Found Record SNo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDate"
                    value={formValues.foundRecordSNo}
                    onChange={(e) =>
                      setFormValues({ ...formValues, foundRecordSNo: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                  declaration Form
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={formValues.declarationForm}
                    onChange={(e) =>
                      setFormValues({ ...formValues, declarationForm: e.target.value })
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
        </div>    </div>  );
};

export default ClaimRegEdit;
