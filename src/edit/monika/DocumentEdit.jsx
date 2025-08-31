import React from "react";
import {
  fetchData,
  editData,
} from "../../reducer/monika/DocumentManagementReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDate } from "../../data/formatDate";

function DocumentEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);

  const DocumentManagementList = useSelector((state) => state.Document);
  console.log(DocumentManagementList.data.data);
  const [items, setItems] = useState([]);
  const itmm = DocumentManagementList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(DocumentManagementList.data.data);
  }, []);
  useEffect(() => {
    setItems(DocumentManagementList.data.data);
    setSlug(DocumentManagementList.slug);
  }, [DocumentManagementList]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

  const fd = filteredData[0];
  const basicInitialValues = {
    id: fd.id,
    date: formatDate(fd.date),
    filename: fd.filename,
    type: fd.type,
    sentby: fd.sentby,
    indate: fd.indate,
    intime: fd.intime,
    outdate: fd.outdate,
    outtime: fd.outtime,
    markedto: fd.markedto,
    remarks: fd.remarks,
    Employ_id: fd.Employ_id,
    department: fd.department,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Replace 'addDocument' with the actual action creator from your redux slice
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <cBreadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/form/inout-document">
              Document Management
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </cBreadcrumbs>
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
                    value={formValues.filename}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        filename: e.target.value,
                      })
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
                    value={formValues.type}
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
                    value={formValues.sentby}
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
                    value={formValues.indate}
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
                    value={formValues.intime}
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
                    value={formValues.outdate}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        outdate: e.target.value,
                      })
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
                    value={formValues.outtime}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        outtime: e.target.value,
                      })
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
                    value={formValues.markedto}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        markedto: e.target.value,
                      })
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
                    value={formValues.remarks}
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
}

export default DocumentEdit;
