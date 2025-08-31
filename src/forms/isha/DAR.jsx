import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addDAR , addData} from "../../reducer/isha/DARReducer";
import { formatDate, formatTime } from "../../data/formatDate";
const DAR = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
 
  const dispatch = useDispatch();
  const dar = useSelector((state) => state.Dar);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (dar) {
      setSlug(dar.slug);
    }
  }, [dar]);
const basicInitialValues = {
    name: "",
    emp: "",
    designation: "",
    posted: "",
    mno: "",
    sf: "",
    mm: "",
    dfooi: "",
    pi: "",
    remark: "",
    reason: "",
    doa: "",
    daa: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
            D&AR
            </Link>
            <Link underline="hover" color="inherit" >
            Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{ maxWidth: "90%"}}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">D&AR</h3>
                <span className="line-box" style={{width:"100px"}}></span>
              </div>
              
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputMemoNo" className="form-label">
                    Minor/Major
                  </label>
                  <select class="form-select" name="currency"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        mm: e.target.value,
                      })
                    }>
                    <option value="">Select</option>
                    <option value="Minor"> Minor</option>
                    <option value="Major">Major</option>

                  </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="inputTimeout" className="form-label">
                      Date Of Appeal
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="inputTimeout"
                      onChange={(e) =>
                        setFormValues({ ...formValues, doa: e.target.value })
                      }
                    />
                  </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="inputAddress" className="form-label">
                  Posted At
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="inputAddress"
                  onChange={(e) =>
                    setFormValues({ ...formValues, posted: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputAddress" className="form-label">
                  M.NO
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="inputAddress"
                  onChange={(e) =>
                    setFormValues({ ...formValues, mno: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputMemoNo" className="form-label">
                 SF
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="inputMemoNo"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      sf: e.target.value,
                    })
                  }
                />
              </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="inputMemoNo" className="form-label">
                Date For Other Of Penality Impose
                </label>
                <select class="form-select"  name="country"
                  onChange={(e) =>
                    setFormValues({ ...formValues, dfooi: e.target.value })
                  }>
                  <option value="">Select</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputMemoNo" className="form-label">
                  Penality Imposed
                </label>
                <select class="form-select" name="currency"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      pi: e.target.value,
                    })
                  }>
                  <option value="">Select</option>
                  <option value="YES"> YES</option>
                  <option value="NO">NO</option>

                </select>
              </div>
              </div>
              <div className="row mb-3">
                
                <div className="col-md-12">
                <label htmlFor="inputCity" className="form-label">
                  Reason
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="inputCity"
                  onChange={(e) =>
                    setFormValues({ ...formValues, reason: e.target.value })
                  }
                />
              </div>
                <div className="col-md-12">
                  <label htmlFor="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="inputRemark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
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

export default DAR;
