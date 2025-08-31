import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/redux/tableDataSlice";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}


const Library = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  
   const [slug, setSlug] = useState(getLastParameter().trim());
    const LibraryBook = useSelector((state) => state.data);

  const basicInitialValues = {
    
    titleOfTheBookIssued: "",
    uniqueNo: "",
    issuedToName: "",
    empId: "",
    Designation: "",
    dateofissue: "",
    dateofreturn: "",
    Action:"",
    Contact_Number_of_Issued_Person:"",
    Date_of_Issue_For_Same_days:"",
    Date_of_Return_For_Same_days:"",
    Action_For_Same_days:"",
    Employ_id: "",
    department: "",
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
              Library Book Issue
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
                {/* <h3 className="form-heading">Library Book Issues Register</h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputtitleOfTheBookIssued" className="form-label">
                    Title Of The Book Issued
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="  titleOfTheBookIssued"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        titleOfTheBookIssued: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputuniqueNo" className="form-label">
                    Unique No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="uniqueNo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        uniqueNo: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                </div>
                <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputissuedToName" className="form-label">
                    Issued To Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="issuedToName"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        issuedToName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
            
                <div className="col-md-4">
                  <label for="inputempId" className="form-label">
                    Emp Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="empId"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        empId: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-4">
                  <label for="inputDesignation" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=" Designation"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Designation: e.target.value,
                      })
                    }
                    required
                  />
                </div> 
                {/* <div className="col-3">
                  <label for="inputDesignation" className="form-label">
                    Signature
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=" Designation"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        sign: e.target.value,
                      })
                    }
                    required
                  />
                </div> */}
                </div>
                <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputdateofissue" className="form-label">
                    Date of Issue
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id=" dateofissue"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        dateofissue: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label for="inputdateofreturn" className="form-label">
                    Date of Return
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateofreturn"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        dateofreturn: e.target.value,
                      })
                    }
                    
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputdateofreturn" className="form-label">
                  Action
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dateofreturn"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Action: e.target.value,
                      })
                    }
                    
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputtitleOfTheBookIssued" className="form-label">
                  Contact Number of Issued Person
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="  titleOfTheBookIssued"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Contact_Number_of_Issued_Person: e.target.value,
                      })
                    }
                   
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputuniqueNo" className="form-label">
                  Date of Issue For Same days
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="uniqueNo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Date_of_Issue_For_Same_days: e.target.value,
                      })
                    }
                  
                  />
                </div>
                </div>
                <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputtitleOfTheBookIssued" className="form-label">
                  Date of Return For Same days
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="  titleOfTheBookIssued"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Date_of_Return_For_Same_days: e.target.value,
                      })
                    }
                   
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputuniqueNo" className="form-label">
                  Action For Same days
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="uniqueNo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Action_For_Same_days: e.target.value,
                      })
                    }
                    
                  />
                </div>
                </div>
                <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputtitleOfTheBookIssued" className="form-label">
                  Employ_id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="  titleOfTheBookIssued"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Employ_id: e.target.value,
                      })
                    }
                   
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputuniqueNo" className="form-label">
                  Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="uniqueNo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        department: e.target.value,
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

export default Library;
