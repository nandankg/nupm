import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import station from "../../data/station.json";
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
const EditEquipment = () => {
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
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Equipment Failure
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
                  Equipment Failure Station Register
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
              <div className="col-md-6">
              <label for="inputlocation" className="form-label">
              Failure Date Time
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="typeHint"
                    value={formValues.failureDateTime}
                    onChange={(e) =>
                      setFormValues({ ...formValues, failureDateTime: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
              <label for="inputlocation" className="form-label">
              Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="typeHint"
                    value={formValues.department}
                    onChange={(e) =>
                      setFormValues({ ...formValues, department: e.target.value })
                    }
                    required
                  />
                </div>
                </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputlocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="typeHint"
                    value={formValues.location}
                    onChange={(e) =>
                      setFormValues({ ...formValues, location: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputtype" className="form-label">
                    Equipment Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtype"
                    aria-describedby="typeHint"
                    value={formValues.equipmentType}
                    onChange={(e) =>
                      setFormValues({ ...formValues, equipmentType: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputnumber" className="form-label">
                    Equipment No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="numberHint"
                    id="inputnumber"
                    value={formValues.equipmentNo}
                    min="1"
                    onChange={(e) =>
                      setFormValues({ ...formValues, equipmentNo: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputdetail" className="form-label">
                    Nature & Details of Failure
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdetail"
                    value={formValues.failureDetails}
                    onChange={(e) =>
                      setFormValues({ ...formValues, failureDetails: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputreportedto" className="form-label">
                    Reported To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    value={formValues.reportedTo}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reportedTo: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputreportedtime" className="form-label">
                    Reported Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputreportedtime"
                    value={formValues.reportedDateTime}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reportedDateTime: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-6">
              <label for="inputlocation" className="form-label">
              SC Emp. No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="typeHint"
                    value={formValues.scEmpNo}
                    onChange={(e) =>
                      setFormValues({ ...formValues, scEmpNo: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
              <label for="inputlocation" className="form-label">
              SC Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="typeHint"
                    value={formValues.scName}
                    onChange={(e) =>
                      setFormValues({ ...formValues, scName: e.target.value })
                    }
                    required
                  />
                </div>
                </div>
              <div className="row mb-3">
                <h4>Action Taken:</h4>
                <div className="col-md-6">
                  <label for="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                    aria-describedby="date1Hint"
                    value={formValues.actionDateTime}
                    onChange={(e) =>
                      setFormValues({ ...formValues, actionDateTime: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputremarkstaff" className="form-label">
                  Concern Employee Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarksstaff"
                    value={formValues.actionName}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        actionName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputconcernid" className="form-label">
                    Concern Employee Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputconcernid"
                    value={formValues.actionEmpNo}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        actionEmpNo: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputremark" className="form-label">
                  Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremark"
                    value={formValues.status1}
                    onChange={(e) =>
                      setFormValues({ ...formValues, status1: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <h4>Close</h4>
                <div className="col-md-4">
                  <label for="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                    aria-describedby="date1Hint"
                    value={formValues.closeDateTime}
                    onChange={(e) =>
                      setFormValues({ ...formValues, closeDateTime: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputremarkstaff" className="form-label">
                 Employee Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarksstaff"
                    value={formValues.closeName}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        closeName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputremarkstaff" className="form-label">
                   Employee ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarksstaff"
                    value={formValues.closeEmpNo}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        closeEmpNo: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
               
                <div className="col-md-12">
                <label for="inputremarkstaff" className="form-label">
                Remarks

                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarksstaff"
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
                <button type="submit" className="btn btn-primary mt-3" style={{width:"100px", height: "50px", textAlign: "center"}}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      );
};

export default EditEquipment;
