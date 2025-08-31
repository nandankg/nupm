import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/redux/tableDataSlice";
import { formatDate } from "../../data/formatDate";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const TrainIdRegister = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [slug, setSlug] = useState(getLastParameter().trim());
    const LibraryBook = useSelector((state) => state.data);
  const dispatch = useDispatch();


  

  const basicInitialValues = {
    date:"",
    time:"",
    
    train_set:"",
   
    previousid: "",
    newid: "",
    purpose: "",
    name_of_tc: "",
    id_of_tc:"",
    name_of_acc: "",
    id_of_acc:"",

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
              Train Id Change Record
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
                  TRAIN ID CHANGE RECORD REGISTER
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row">
              <div className="col-md-4">
                  <label for="inputpreviousid" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputpreviousid"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputpreviousid" className="form-label">
                  Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputpreviousid"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        time: e.target.value,
                      })
                    }
                    
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputpreviousid" className="form-label">
                    Train Set
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputpreviousid"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        train_set: e.target.value,
                      })
                    }
                    
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputpreviousid" className="form-label">
                    PREVIOUS ASSOCIATED ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputpreviousid"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        previousid: e.target.value,
                      })
                    }
                    
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputnewid" className="form-label">
                    NEW ASSOCIATED ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputnewid"
                    onChange={(e) =>
                      setFormValues({ ...formValues, newid: e.target.value })
                    }
                    
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputpurpose" className="form-label">
                    PURPOSE AND ACTION
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputpurpose"
                    onChange={(e) =>
                      setFormValues({ ...formValues, purpose: e.target.value })
                    }
                    
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputname" className="form-label">
                    NAME OF TC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputname"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name_of_tc: e.target.value })
                    }
                    
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputname" className="form-label">
                    EID OF TC
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputname"
                    min="1"
                    onChange={(e) =>
                      setFormValues({ ...formValues,  id_of_tc: e.target.value })
                    }
                    
                  />
                </div>
                </div>
                <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputname1" className="form-label">
                    NAME  OF APPROVING ACC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputname1"
                    onChange={(e) =>
                      setFormValues({ ...formValues,  name_of_acc: e.target.value })
                    }
                    
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputname1" className="form-label">
                    ID  OF APPROVING ACC
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputname1"
                    onChange={(e) =>
                      setFormValues({ ...formValues,  id_of_acc: e.target.value })
                    }
                    
                  />
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

export default TrainIdRegister;
