import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../data/formatDate";
import { editData, fetchData } from "../reducer/PoliceCtdRegReducer";
import { formatTime } from "../data/formatDate";

const PoliceCtdRegEdit = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [s_no, setSno] = useState(1);
  const [date, setDate] = useState(new Date());
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const policectd = useSelector((state) => state.policectdstate || []);
  console.log(policectd.data.data);
  const [items, setItems] = useState([]);
  const itmm = policectd.data.data;
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(policectd.data.data);
  }, []);

  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (policectd) {
      setSlug(policectd.slug);
    }
  }, [policectd]);

  useEffect(() => {
    setItems(policectd.data.data);
  }, [policectd]);
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
    //from api
    id: fd.id,
    date: formatDate(new Date().toString()),
    time: formatTime(new Date().toString()),
    pname: fd.name,
    address: fd.address,
    contno: fd.contactNo,
    handoverto: fd.handedTo,
    reason: fd.reason,
    handovermemo: fd.handing_over_Memo_no,
    sign: fd.sigofsc,
    remark: fd.remark,
    Employ_id: fd.Employ_id,
    department: fd.department,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValues.contno.length !== 10) {
      setError("Contact number must be exactly 10 digits.");
    } else {
      setError("");
      alert("Form submitted successfully!");
    }
    dispatch(editData(formValues));

    const newSrno = s_no + 1;
    setSno(newSrno);
    navigate(`/list/${slug}`);
  };
  const handleContactChange = (e) => {
    const value = e.target.value;
    // Allow only digits and limit to 10 characters
    if (/^\d{0,10}$/.test(value)) {
      setFormValues({ ...formValues, contno: value });
      setError(""); // Clear error while typing valid digits
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Edit Police Custody Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="name" className="form-label text-start">
                    Name of The Person
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formValues.pname}
                    placeholder="Name"
                    onChange={(e) =>
                      setFormValues({ ...formValues, pname: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="address"
                    placeholder="e.g.UP"
                    value={formValues.address}
                    onChange={(e) =>
                      setFormValues({ ...formValues, address: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="contno" className="form-label">
                    Contact No.
                  </label>
                  <input
                    type="contact"
                    placeholder="Enter contact number"
                    value={formValues.contno}
                    className="form-control"
                    onChange={handleContactChange}
                  />
                  {error && (
                    <p style={{ color: "red", marginTop: "5px" }}>{error}</p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="handoverto" className="form-label">
                    Handed Over To
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="handoverto"
                    value={formValues.handoverto}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        handoverto: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="reason" className="form-label">
                    Reason in Brief
                  </label>
                  <textarea
                    className="form-control"
                    id="reason"
                    value={formValues.reason}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        reason: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>
                <div className="col-md-4">
                  <label htmlFor="handovermemo" className="form-label">
                    Handed Over Memo No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.handovermemo}
                    id="handovermemo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        handovermemo: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label htmlFor="remark" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={formValues.date}
                    id="remark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-9">
                  <label htmlFor="remark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.remark}
                    id="remark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
                    }
                  />
                </div>
                <div className="col-12 text-center pt-3">
                  <button type="submit" className="btn btn-primary px-3">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoliceCtdRegEdit;
