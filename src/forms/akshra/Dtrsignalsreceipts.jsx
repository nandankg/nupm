import React, { useState, useEffect } from "react";

import {
  addDtrrece,
  addData,
} from "../../reducer/akshra/DtrsignalsreceiptsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const Dtrsignalsreceipts = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const DTrsignalsreceiptsList = useSelector((state) => state.dtrrec);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (DTrsignalsreceiptsList) {
      setSlug(DTrsignalsreceiptsList.slug);
    }
  }, [DTrsignalsreceiptsList]);
  //const [station, setStation] = useState("Ranchi");
  // const [afcgateno, setAfcgateno] = useState("123");
  const basicInitialValues = {
    date: formatDate(date.toDateString()),

    material: "",
    qty: "Number",
    ledger: "",
    challanno: "",
    challandate: "date",
    name: "",
    desig: "",
    //sign: "",
    work: "",
    //signof: "sign",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    // navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              DTR SIGNALS
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
                <h3 className="form-heading">DTR SIGNALS</h3>
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
                      setFormValues({ ...formValues, material: e.target.value })
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
                      setFormValues({ ...formValues, ledger: e.target.value })
                    }
                  />
                </div>
              </div>
              <b>Invoice</b>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputChallanno" className="form-label">
                    Challan NO
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputChallanno"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        challanno: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputChallandate" className="form-label">
                    Challan Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputChallandate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        challandate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <b>FROM WHOM RECEIVED</b>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
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
                      setFormValues({ ...formValues, desig: e.target.value })
                    }
                  />
                </div>
                {/*<div className="col-6">
                  <label htmlFor="inputSign" className="form-label">
                    Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSign"
                    onChange={(e) =>
                      setFormValues({ ...formValues, sign: e.target.value })
                    }
                  />
                </div>*/}
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputWork" className="form-label">
                    For What Work & Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputWork"
                    onChange={(e) =>
                      setFormValues({ ...formValues, work: e.target.value })
                    }
                  />
                </div>
                {/* <div className="col-6">
                  <label htmlFor="inputSignof" className="form-label">
                    Sign Of Receiver
                  </label>
                  <input
                    type="sign"
                    className="form-control"
                    id="inputSignof"
                    onChange={(e) =>
                      setFormValues({ ...formValues, signof: e.target.value })
                    }
                  />
                </div>*/}
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
export default Dtrsignalsreceipts;
