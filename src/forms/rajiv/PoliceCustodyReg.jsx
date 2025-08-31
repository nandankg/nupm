import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addData,
  addPoliceCustody,
} from "../../reducer/rajiv/PoliceCustodyRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../data/formatDate";

const PoliceCustodyReg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const policeCustodyRegList = useSelector((state) => state.policeCustodyReg);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (policeCustodyRegList) {
      setSlug(policeCustodyRegList.slug);
    }
  }, [policeCustodyRegList]);
  const basicInitialValues = {
    date: formatDate(new Date().toString()),
    time: formatTime(new Date().toString()),
    name: "",
    address: "",
    contactNo: "",
    handedTo: "",
    reason: "",
    handing_over_Memo_no: "",
    sigofsc: "",
    remark: "",
    Employ_id: "1",
    department: "Operation",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
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
              Police Custody
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
                {/* <h3 className="form-heading">Police Custody </h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputaddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    required
                    id="inputaddress"
                    onChange={(e) =>
                      setFormValues({ ...formValues, address: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputContact" className="form-label">
                    Contact No.
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    className="form-control"
                    id="inputContact"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        contactNo: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label for="inputhandedTo" className="form-label">
                    Handed Over to
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputhandedTo"
                    onChange={(e) =>
                      setFormValues({ ...formValues, handedTo: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputReason" className="form-label">
                    Reason in Breif
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputReason"
                    onChange={(e) =>
                      setFormValues({ ...formValues, reason: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputMemoNo" className="form-label">
                    Handing Over Memo No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputMemoNo"
                    min="1"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        handing_over_Memo_no: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-8">
                  <label for="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
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

export default PoliceCustodyReg;
