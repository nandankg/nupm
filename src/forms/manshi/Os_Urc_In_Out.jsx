import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import { Link } from "@mui/material";
import { addData, addIn_Out } from "../../reducer/manshi/In_OutReducer";

const Os_Urc_In_Out = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ino = useSelector((state) => state.inout);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (ino) {
      setSlug(ino.slug);
    }
  }, [ino]);

  const [formValues, setFormValues] = useState({
    IncomingDate: "",
    OsurcNumber: "",
    ReceivedBy: "",
    sign_date: "",
    ReceivedFrom: "",
    OutgoingDate: "",
    HandedOverTo: "",
    HandedOverBy: "",

    mailedby:"", 
    maileddate:"", 
    no_ofcases:"",
no_ofclearedcases:"",

  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
    setFormValues({
      serialNumber: "",
      IncomingDate: "",
      OsurcNumber: "",
      ReceivedBy: "",
      sign_date: "",
      ReceivedFrom: "",
    }); // Reset form after submission
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="container">
      <div role="presentation " className="bredcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Os Urc In Out
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
              <h3 className="form-heading">OS /URC IN-OUT REGISTER</h3>
              <div className="heading-line"></div>
            </div>
            <div className="row mb-3 cont">
              <div className="col-md-6">
                <label htmlFor="inputIncomingdate" className="form-label">
                  Incoming Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputIncomingdate"
                  name="IncomingDate"
                  value={formValues.IncomingDate}
                  onChange={handleChange}
                  aria-label="Incoming Date"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputOsurcNumber" className="form-label">
                  OS/URC Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputOsurcNumber"
                  name="OsurcNumber"
                  value={formValues.OsurcNumber}
                  onChange={handleChange}
                  aria-label="Osurc Number"
                />
              </div>
            </div>
            <div className="row mb-3 cont">
              <div className="col-md-6">
                <label htmlFor="inputReceivedBy" className="form-label">
                  Received By
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputReceivedBy"
                  name="ReceivedBy"
                  value={formValues.ReceivedBy}
                  onChange={handleChange}
                  aria-label="Received By"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputReceivedFrom" className="form-label">
                  Received From
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputReceivedFrom"
                  name="ReceivedFrom"
                  value={formValues.ReceivedFrom}
                  onChange={handleChange}
                  aria-label="Received From"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="OutgoingDate" className="form-label">
                  Outgoing Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="OutgoingDate"
                  name="OutgoingDate"
                  value={formValues.OutgoingDate}
                  onChange={handleChange}
                  aria-label="OutgoingDate"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="HandedOverTo" className="form-label">
                  Handed Over To
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="HandedOverTo"
                  name="HandedOverTo"
                  value={formValues.HandedOverTo}
                  onChange={handleChange}
                  aria-label="HandedOverTo"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="HandedOverBy" className="form-label">
                  Handed Over By
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="HandedOverBy"
                  name="HandedOverBy"
                  value={formValues.HandedOverBy}
                  onChange={handleChange}
                  aria-label="HandedOverBy"
                />
              </div>
            </div>


            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="OutgoingDate" className="form-label">
                No. of cases Received
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="OutgoingDate"
                  name="no_ofcases"
                  value={formValues.no_ofcases}
                  onChange={handleChange}
                  aria-label="OutgoingDate"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="HandedOverTo" className="form-label">
                No. of cleared cases
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="HandedOverTo"
                  name="no_ofclearedcases"
                  value={formValues.no_ofclearedcases  }
                  onChange={handleChange}
                  aria-label="HandedOverTo"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="HandedOverBy" className="form-label">
                Note Mailed date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="HandedOverBy"
                  name="maileddate"
                  value={formValues.maileddate}
                  onChange={handleChange}
                  aria-label="HandedOverBy"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="HandedOverBy" className="form-label">
                Note Mailed by
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="HandedOverBy"
                  name="mailedby"
                  value={formValues.mailedby}
                  onChange={handleChange}
                  aria-label="HandedOverBy"
                />
              </div>
            </div>
            <div className="row mb-3 cont">
            
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn-primary px-3">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Os_Urc_In_Out;
