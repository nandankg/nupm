import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/akshra/AgentissueReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const EditAgentissue = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const AGentissueList = useSelector((state) => state.agent);

  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (AGentissueList) {
      setSlug(AGentissueList.slug);
    }
  }, [AGentissueList]);
  console.log(AGentissueList.data.data);
  const [items, setItems] = useState([]);
  const itmm = AGentissueList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(AGentissueList.data.data);
  }, []);
  useEffect(() => {
    setItems(AGentissueList.data.data);
  }, [AGentissueList]);
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
    sno: " Number",
    name: fd.name,
    designation: fd.designation,
    empid: fd.empid,
    date: fd.date1,
    signature: fd.signature,
    cardno: fd.cardno,
    date2: fd.date2,
    sign: fd.sign,
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
              AGENT ID ISSUE CARD
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
                <h3 className="form-heading">AGENT ID ISSUE CARD REGISTER</h3>
                <div className="heading-line"></div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputName" className="form-label">
                    NAME
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputName"
                    value={formValues.name}
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputDesignation" className="form-label">
                    DESIGNATION
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputDesignation"
                    value={formValues.designation}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        designation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputEmpid" className="form-label">
                    EMP ID
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputEmpid"
                    value={formValues.date2}
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputDate" className="form-label">
                    DATE
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputDate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputSignature" className="form-label">
                    SIGNATURE
                  </label>
                  <input
                    type="sign"
                    className="form-control"
                    id="inputSignature"
                    value={formValues.signature}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signature: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputCardno" className="form-label">
                    CARD NO.
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="inputCardno"
                    value={formValues.cardno}
                    onChange={(e) =>
                      setFormValues({ ...formValues, cardno: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputDate2" className="form-label">
                    DATE
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    id="inputDate2"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={formValues.date2}
                    onChange={(e) =>
                      setFormValues({ ...formValues, date2: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputSign" className="form-label">
                    SIGNATURE
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSign"
                    value={formValues.sign}
                    onChange={(e) =>
                      setFormValues({ ...formValues, sign: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary">
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

export default EditAgentissue;
