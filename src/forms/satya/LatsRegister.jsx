import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { addData, addLats } from "../../reducer/satya/LatsReducer";
import { formatDate } from "../../data/formatDate";
import stationData from "../../station.json";

const LatsRegister = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);

  const dispatch = useDispatch();
  const lats = useSelector((state) => state.vdu);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (lats) {
      setSlug(lats.slug);
    }
  }, [lats]);

  const basicInitialValues = {
    S_No: sNo,
    date: formatDate(new Date().toDateString()),
    station: "",
    name: "",
    empid: "",
    from: "",
    to: "",
    result: "",
    remarks: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    const newSrno = sNo + 1;
    setSNo(newSrno);

    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              LATS/VDU
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
                <h3 className="form-heading">LATS/VDU</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputstation" className="form-label">
                    Station
                  </label>
                  <select
                  placeholder="Select Station"
                  className="form-control"
                  id="inputstnname"
                  value={formValues.station}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      station: e.target.value,
                    })
                  }
                  required
                >
                <option value="">Select Station</option>
                {stationData
                  .filter((station) => station["Station Name"]) // Exclude entries with null station names
                  .map((station) => (
                    <option
                      key={station["STATION Code"]}
                      value={station["Station Name"]}
                    >
                      {station["Station Name"]}
                    </option>
                  ))}

                </select>
                </div>
                <div className="col-md-6">
                  <label for="inputname" className="form-label">
                    Name of SC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputname"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <h4>TIME CONTROL TRANSFER</h4>
                <div className="col-md-6">
                  <label for="inputfrom" className="form-label">
                    From
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputtime"
                    onChange={(e) =>
                      setFormValues({ ...formValues, from: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputto" className="form-label">
                    To
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputto"
                    onChange={(e) =>
                      setFormValues({ ...formValues, to: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <div className="col-md-12">
                    <label for="inputresult" className="form-label">
                      LATS/VDU Function/Result
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputresult"
                      onChange={(e) =>
                        setFormValues({ ...formValues, result: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputremarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
                    }
                    required
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
    </>
  );
};

export default LatsRegister;
