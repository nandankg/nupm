import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/chanchal/CSCInitRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";

const CSCInitRegEdit = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const CSCInitRegList = useSelector((state) => state.cSCInitReg);
  console.log(CSCInitRegList.data.data);
  const [items, setItems] = useState([]);
  const itmm = CSCInitRegList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(CSCInitRegList.data.data);
  }, []);
  useEffect(() => {
    setItems(CSCInitRegList.data.data);
  }, [CSCInitRegList]);
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
    S_No: sNo,
    date: formatDate(new Date().toDateString()),
    S_start: fd.sns,
    S_end: fd.sne,
    BoxNo: fd.bn,
    DeviceNo: fd.dn,
    Date: fd.date,
    TotalQty: fd.tq,
    Rejected: fd.nrc,
    Initilised: fd.nic,
    Signature: fd.employeeid,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate("/list/card-initialization-tender-sdc");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
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
                  Edit : CSC Initialization Detail Register{" "}
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputS_start" className="form-label">
                    {" "}
                    Serial Number Card start{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.S_start}
                    id="inputS_start"
                    onChange={(e) =>
                      setFormValues({ ...formValues, S_start: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6 ">
                  <label for="inputS_end" className="form-label">
                    Serial Number Card End
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.S_end}
                    id="inputS_end"
                    onChange={(e) =>
                      setFormValues({ ...formValues, S_end: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputBoxNo" className="form-label">
                    Box No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.BoxNo}
                    id="inputBoxNo"
                    onChange={(e) =>
                      setFormValues({ ...formValues, BoxNo: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputDeviceNo" className="form-label">
                    Device No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.DeviceNo}
                    id="inputDeviceNo"
                    onChange={(e) =>
                      setFormValues({ ...formValues, DeviceNo: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputDate" className="form-label">
                    Date
                  </label>
                  <input
                    type="Date"
                    className="form-control"
                    value={formValues.Date}
                    id="inputDate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Date: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label for="inputTotalQty" className="form-label">
                    Total Qty.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.TotalQty}
                    id="inputTotalQty"
                    onChange={(e) =>
                      setFormValues({ ...formValues, TotalQty: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputRejected" className="form-label">
                    No. of Rejected Card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.Rejected}
                    id="inputRejected"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Rejected: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label for="inputInitilised" className="form-label">
                    No. of Initilised Card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.Initilised}
                    id="inputInitilised"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Initilised: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* <div className="row mb-3">
                <div className="col-6">
                  <label for="inputSignature" className="form-label">
                    Signature
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.employeeid}
                    id="inputSignature"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        employeeid: e.target.value,
                      })
                    }
                  />
                </div>
              </div> */}
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

export default CSCInitRegEdit;
