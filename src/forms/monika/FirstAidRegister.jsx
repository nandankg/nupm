import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/monika/FirstAidRegisterReducer";
import { formatDate } from "../../data/formatDate";

const FirstAidRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const FirstAidregister = useSelector((state) => state.FirstAid);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (FirstAidregister) {
      setSlug(FirstAidregister.slug);
    }
  }, [FirstAidregister]);

  const basicInitialValues = {
    date: formatDate(date.toString()),
    time: "",
    providedToName: "",
    providedToDesignation: "",
    providedByName: "",
    providedByDesignation: "",
    itemsConsumed: "",
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
                <div className="col-md-4">
                  <label htmlFor="inputDate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputTime" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputTime"
                    onChange={(e) =>
                      setFormValues({ ...formValues, time: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputProvidedToName" className="form-label">
                    First Aid Provided To (Name)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputProvidedToName"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        providedToName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
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
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        providedToDesignation: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputProvidedByName" className="form-label">
                    First Aid Provided By (Name)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputProvidedByName"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        providedByName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
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
};

export default FirstAidRegister;
