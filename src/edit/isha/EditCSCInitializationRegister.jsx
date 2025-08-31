import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  fetchData,
  editData,
} from "../../reducer/isha/CSCInitializationDetailRegisterReducer";
import { formatDate } from "../../data/formatDate";
const EditCSCInitializationDetailRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const CSCInitialization = useSelector(
    (state) => state.CSCInitializationDetail
  );
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(CSCInitialization.data.data);
  const [items, setItems] = useState([]);
  const itmm = CSCInitialization.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(CSCInitialization.data.data);
  }, []);
  useEffect(() => {
    if (CSCInitialization) {
      setSlug(CSCInitialization.slug);
    }
    setItems(CSCInitialization.data.data);
  }, [CSCInitialization]);
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
    sns: fd.sns,
    sne: fd.sne,
    bn: fd.bn,
    dn: fd.dn,
    tq: fd.tq,
    nrc: fd.nrc,
    nic: fd.nic,
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
            <Link underline="hover" color="inherit" to="/csclist">
              CSC Initialization Detail Register
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
                  Edit: CSC Initialization Detail Register
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Serial Number Card Start
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputName"
                    value={formValues.sns}
                    onChange={(e) =>
                      setFormValues({ ...formValues, sns: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    Serial Number Card End
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputempid"
                    value={formValues.sne}
                    onChange={(e) =>
                      setFormValues({ ...formValues, sne: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputTimein" className="form-label">
                    Box No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputTimein"
                    value={formValues.bn}
                    onChange={(e) =>
                      setFormValues({ ...formValues, bn: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputTimeout" className="form-label">
                    Device No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputTimeout"
                    value={formValues.dn}
                    onChange={(e) =>
                      setFormValues({ ...formValues, dn: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputTopic" className="form-label">
                    Total Quantity.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputTopic"
                    value={formValues.tq}
                    onChange={(e) =>
                      setFormValues({ ...formValues, tq: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputRemark" className="form-label">
                    No. of Rejected Card
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputRemark"
                    value={formValues.nrc}
                    onChange={(e) =>
                      setFormValues({ ...formValues, nrc: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputRemark" className="form-label">
                    No. of Initilised Card
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputRemark"
                    value={formValues.nic}
                    onChange={(e) =>
                      setFormValues({ ...formValues, nic: e.target.value })
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
export default EditCSCInitializationDetailRegister;
