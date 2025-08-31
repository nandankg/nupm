import React from "react";
import {
  fetchData,
  editData,
} from "../../reducer/monika/FirstAidRegisterReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

function FirstAidEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] = useState("");

  console.log(slug);
  const FirstAidRegisterList = useSelector((state) => state.FirstAid);
  console.log(FirstAidRegisterList.data.data);
  const [items, setItems] = useState([]);
  const itmm = FirstAidRegisterList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(FirstAidRegisterList.data.data);
  }, []);
  useEffect(() => {
    setItems(FirstAidRegisterList.data.data);
    setSlug(FirstAidRegisterList.slug);
  }, [FirstAidRegisterList]);
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
    time: fd.time,
    providedToName: fd.providedToName,
    providedToDesignation: fd.providedToDesignation,
    providedByName: fd.providedByName,
    providedByDesignation: fd.providedByDesignation,
    itemsConsumed: fd.itemsConsumed,
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
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/form/first-aid-register"
            >
              First Aid Register
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
                {/* <h3 className="form-heading">First Aid Register</h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputDate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDate"
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputTime" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputTime"
                    value={formValues.time}
                    onChange={(e) =>
                      setFormValues({ ...formValues, time: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputProvidedToName" className="form-label">
                    First Aid Provided To (Name)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputProvidedToName"
                    value={formValues.providedToName}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        providedToName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="inputProvidedToDesignation"
                    className="form-label"
                  >
                    First Aid Provided To (Designation)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputProvidedToDesignation"
                    value={formValues.providedToDesignation}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        providedToDesignation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputProvidedByName" className="form-label">
                    First Aid Provided By (Name)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputProvidedByName"
                    value={formValues.providedByName}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        providedByName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="inputProvidedByDesignation"
                    className="form-label"
                  >
                    First Aid Provided By (Designation)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputProvidedByDesignation"
                    value={formValues.providedByDesignation}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        providedByDesignation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="inputItemsConsumed" className="form-label">
                    Items & Quantity Consumed
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputItemsConsumed"
                    value={formValues.itemsConsumed}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        itemsConsumed: e.target.value,
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

export default FirstAidEdit;
