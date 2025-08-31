import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import {
  addData,
  addDocument,
} from "../../reducer/monika/DocumentManagementReducer";
import { formatDate } from "../../data/formatDate";

const DocumentManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const DocumentManagementList = useSelector((state) => state.Document);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (DocumentManagementList) {
      setSlug(DocumentManagementList.slug);
    }
  }, [DocumentManagementList]);

  const basicInitialValues = {
    date: formatDate(date.toString()),
    filename: "",
    type: "",
    sentby: "",
    indate: "",
    intime: "",
    outdate: "",
    outtime: "",
    markedto: "",
    remarks: "",
    Employ_id: "",
    department: "",
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
              Document Management
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
                {/* <h3 className="form-heading">Document Register</h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="inputFileName" className="form-label">
                    File Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFileName"
                    onChange={(e) =>
                      setFormValues({ ...formValues, filename: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputType" className="form-label">
                    Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputType"
                    onChange={(e) =>
                      setFormValues({ ...formValues, type: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputSentBy" className="form-label">
                    Sent By
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSentBy"
                    onChange={(e) =>
                      setFormValues({ ...formValues, sentby: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputInDate" className="form-label">
                    In Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputInDate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, indate: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputInTime" className="form-label">
                    In Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputInTime"
                    onChange={(e) =>
                      setFormValues({ ...formValues, intime: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputOutDate" className="form-label">
                    Out Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputOutDate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, outdate: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputOutTime" className="form-label">
                    Out Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputOutTime"
                    onChange={(e) =>
                      setFormValues({ ...formValues, outtime: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputMarkedTo" className="form-label">
                    Marked To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputMarkedTo"
                    onChange={(e) =>
                      setFormValues({ ...formValues, markedto: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
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

export default DocumentManagement;
