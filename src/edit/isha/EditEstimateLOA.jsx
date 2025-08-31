import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { fetchData, editData } from "../../reducer/isha/EstimateLOAReducer";
import { formatDate } from "../../data/formatDate";
const EditEstimateLOARegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const EditestimateLOAR = useSelector((state) => state.estimateloa);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(EditestimateLOAR.data.data);
  const [items, setItems] = useState([]);
  const itmm = EditestimateLOAR.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(EditestimateLOAR.data.data);
  }, []);
  useEffect(() => {
    if (EditestimateLOAR) {
      setSlug(EditestimateLOAR.slug);
    }
    setItems(EditestimateLOAR.data.data);
  }, [EditestimateLOAR]);
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
    date: formatDate(new Date().toDateString()),
    budgetHead: fd.budgetHead,
    budgetSubhead: fd.budgetSubhead,
    department: fd.department,
    WorkType: fd.WorkType,
    amountVetted: fd.amountVetted,
    amountLoaIssued: fd.amountLoaIssued,
    partyName: fd.partyName,
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
            <Link underline="hover" color="inherit">
              Estimate and LOA
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
                <h3 className="form-heading">Edit : Estimate and LOA </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputName" className="form-label">
                    Budget Head
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={formValues.budgetHead}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        budgetHead: e.target.value,
                      })
                    }
                    readOnly
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Sub Head
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputempid"
                    value={formValues.budgetSubhead}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        budgetSubhead: e.target.value,
                      })
                    }
                    readOnly
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputempid"
                    value={formValues.department}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        department: e.target.value,
                      })
                    }
                    readOnly
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputTimein" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputTimein"
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputTimeout" className="form-label">
                    Type Of Work
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTimeout"
                    value={formValues.WorkType}
                    onChange={(e) =>
                      setFormValues({ ...formValues, WorkType: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputTopic" className="form-label">
                    Total Estimated Amount Vetted
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTopic"
                    value={formValues.amountVetted}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        amountVetted: e.target.value,
                      })
                    }
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputRemark" className="form-label">
                    Amount For Which LOA Issued
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    value={formValues.amountLoaIssued}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        amountLoaIssued: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label for="inputTimein" className="form-label">
                    Party Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTimein"
                    value={formValues.partyName}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        partyName: e.target.value,
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
export default EditEstimateLOARegister;
