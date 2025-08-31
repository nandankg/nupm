import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchData, editData } from "../../reducer/monika/InspactionReducer";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../data/formatDate";

function InspactionEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const InspactionRegisterList = useSelector(
    (state) => state.InspactionRegister
  );
  console.log(InspactionRegisterList.data.data);
  const [items, setItems] = useState([]);
  const itmm = InspactionRegisterList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(InspactionRegisterList.data.data);
  }, []);
  useEffect(() => {
    setItems(InspactionRegisterList.data.data);
    setSlug(InspactionRegisterList.slug);
  }, [InspactionRegisterList]);
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
    observation: fd.observation,
    name: fd.name,
    remark: fd.remark,
    designation: fd.designation,
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
    
    sign:fd.sign,
    
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/form/inspection-register-mainline"
            >
              INSPECTION REGISTER
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
                {/* <h3 className="form-heading">Inspection Register</h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputobservation" className="form-label">
                    Enter Observation/Inspection
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="observation"
                    value={formValues.observation}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        observation: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className=" row mb-3">
                <div className="col-md-6">
                  <label for="inputname" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="remarks"
                    value={formValues.remark}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        remark: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-4">
                  <label for="inputreported to" className="form-label">
                  Inspected by
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    value={formValues.name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputreported to" className="form-label">
                  Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    value={formValues.designation}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        designation: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputreported to" className="form-label">
                  Emp ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputreportedto"
                    value={formValues.unit}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        unit: e.target.value,
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

export default InspactionEdit;
