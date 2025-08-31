import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/rajiv/CardInitializationReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const CardInitializationReg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchData = useSelector((state) => state.CardInitialization);
  const [slug, setSlug] = useState("");
  useEffect(() => {
    if (dispatchData) {
      setSlug(dispatchData.slug);
    }
  }, [dispatchData]);
  const basicInitialValues = {
    sns: "",
    sne: "",
    bn: "",
    dn: "",
    date: formatDate(new Date().toString()),
    tq: "",
    nrc: "",
    nic: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Card Initialization
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container"></div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label htmlFor="inputSerialNoStart" className="form-label">
                    SNo. Card Start
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSerialNoStart"
                    required
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        sns: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputSerialNoEnd" className="form-label">
                    SNo. Card End
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSerialNoEnd"
                    required
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        sne: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor="inputBoxNo" className="form-label">
                    Box No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputBoxNo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        bn: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputDeviceNo" className="form-label">
                    Device No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDeviceNo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        dn: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-2">
                  <label htmlFor="inputTotalQty" className="form-label">
                    Total Qty.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputTotalQty"
                    min="1"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        tq: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="inputNoOfRejectedCards"
                    className="form-label"
                  >
                    No. of Rejected Cards
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputNoOfRejectedCards"
                    min="1"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        nrc: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label
                    htmlFor="inputNoOfInitializedCards"
                    className="form-label"
                  >
                    No. of Initialized Cards
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputNoOfInitializedCards"
                    min="1"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        nic: e.target.value,
                      })
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

export default CardInitializationReg;
