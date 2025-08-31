import React, { useState, useEffect } from "react";

import { fetchData, addData } from "../../reducer/redux/tableDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const user = JSON.parse(localStorage.getItem("userdata"));
const deprt = user?.department.toLowerCase();
const DtrIssueStore = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [formType, setFormType] = useState(
    "daily-transaction-register-telecom-issues"
  );
  //const [station, setStation] = useState("Ranchi");
  // const [afcgateno, setAfcgateno] = useState("123");
  const DtrIssueStoreList = useSelector((state) => state.data);
  const [slug, setSlug] = useState(getLastParameter().trim());
  console.log(slug);

  const basicInitialValues = {
    date: "",
    dtr_no: "abc",
    material_desc: "",
    qty: "",
    ledger_no: "",
    challan_no: "",
    challan_date: "",
    issued_name: "",
    issued_designation: "",
    for_whatWork: "",
    location: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData({ formType: slug, values: formValues }));
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              DTR {deprt} :Issue
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "75%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">DTR {deprt}:Issue</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputmaterial" className="form-label">
                    Description of Material
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputmaterial"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        material_desc: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputQty" className="form-label">
                    QTY.
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="inputQty"
                    onChange={(e) =>
                      setFormValues({ ...formValues, qty: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputLedger" className="form-label">
                    Ledger NO./Page
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLedger"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        ledger_no: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <b>INVOICE</b>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputChallanNo" className="form-label">
                    Challan NO
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputChallanNo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        challan_no: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputChallandate" className="form-label">
                    Challan NO
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputChallandate"
                    name="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        challan_date: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <b>To Whom Issued</b>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputIssueddname" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputIssueddname"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        issued_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputDesig" className="form-label">
                    Desig
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDesig"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        issued_designation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <b>WORK & LOCATION ALLOTTED</b>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputWork" className="form-label">
                    What Work
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputWork"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        for_whatWork: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputLocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLocation"
                    onChange={(e) =>
                      setFormValues({ ...formValues, location: e.target.value })
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
export default DtrIssueStore;
