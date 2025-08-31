import React, { useState } from "react";

import { addCard } from "../../reducer/store/CardRefundReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const CardRefund = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [sNo, setSNo] = useState(1);
  const dispatch = useDispatch();

  const basicInitialValues = {
    sno: "",
    date: "",
    receiptno: "",
    cscid: "",
    phycondition: "",
    passangername: "",
    contactno: "",
    senttorcc: "",
    recfromrcc: "",
    typeofcard: "",
    refund: "",
    bal: "",
    totalrefund: "",
    refundno: "",
    refundondate: "",
    amrefund: "",
    sigofscsm: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCard(formValues));
    navigate("/cardrefund");
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Unreadable Card Refund Details
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
                <h3 className="form-heading">Unreadable Card refund</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputDate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDate"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputRMno" className="form-label">
                    Receipt Memo No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRMno"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        receiotno: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputCSC_ID" className="form-label">
                    CSC Engraved ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCSC_ID"
                    onChange={(e) =>
                      setFormValues({ ...formValues, cscid: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputPhyCond" className="form-label">
                    Physical condition
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPhyCon"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        phycondition: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputpassanger" className="form-label">
                    Passanger Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputpassanger"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        passangername: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputcontact" className="form-label">
                    Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="contactno"
                    title="Please enter a 10-digit number"
                    pattern=" [0-9]{10}"
                    maxlength="10"
                    id="inputcontact"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        contactno: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputSendRCC" className="form-label">
                    Send to RCC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSendRCC"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        senttorcc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputrecRcc" className="form-label">
                    Received from RCC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputresRCC"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        recfromrcc: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputTypeOfCard" className="form-label">
                    Type Of Card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTypeOfCard"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        typeofcard: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputRefundableSecurity" className="form-label">
                    Refundable Security
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRefundableSecurity"
                    onChange={(e) =>
                      setFormValues({ ...formValues, refund: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputBalance" className="form-label">
                    Balance
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputBalance"
                    onChange={(e) =>
                      setFormValues({ ...formValues, bal: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputTotalRefundAm" className="form-label">
                    Total Refundable Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTotalRefundAm"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        totalrefund: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputRefundMemo" className="form-label">
                    Refund Memo No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRefundMemo"
                    onChange={(e) =>
                      setFormValues({ ...formValues, refundno: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputRefundedOnDate" className="form-label">
                    Refunded On Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputRefundedOnDate"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        refundondate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputAmRefunded" className="form-label">
                    Total Amount Refunded
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAmRefunded"
                    onChange={(e) =>
                      setFormValues({ ...formValues, amrefund: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputTotalSignOfScSm" className="form-label">
                    Sign of SC/SM
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSignOfScSm"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        sigofscsm: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-12">
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

export default CardRefund;
