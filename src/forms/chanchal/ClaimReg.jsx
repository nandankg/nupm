import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import {
  fetchData,
  addData
} from "../../reducer/redux/tableDataSlice";
import stationData from "../../station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const ClaimRegReg = () => {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
 
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);

  const basicInitialValues = {
    station: '',
      dateAndTime: '',
      claimantName: '',
      articleDescription: '',
      articleLostPlace: '',
      contactNo: '',
      residentialAddress: '',
      scEmp: '',
      scName: '',
      foundRecordSNo: '',
      declarationForm: '',
      remarks: ''
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);

 const handleSubmit = (e) => {
        e.preventDefault();
       dispatch(addData({formType:slug,values:formValues}));
           console.log("Form Data Submitted:", formValues);
         navigate(`/list/${slug}`);
      };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Claim Registration Register
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
                   
                    className="form-control"
                    id="inputph_no"
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
                    onChange={(e) =>
                      setFormValues({ ...formValues, foundRecordSNo: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                 
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

export default ClaimRegReg;
