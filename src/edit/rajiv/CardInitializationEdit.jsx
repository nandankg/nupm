import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/rajiv/CardInitializationReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";

const user = JSON.parse(localStorage.getItem("userdata"));
const CardInitilizationEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const cardInitializationList = useSelector(
    (state) => state.CardInitialization
  );
  const [slug, setSlug] = useState("");
  useEffect(() => {
    if (cardInitializationList) {
      setSlug(cardInitializationList.slug);
    }
  }, [cardInitializationList]);
  const [items, setItems] = useState([]);
  const itmm = cardInitializationList.data.data;
  useEffect(() => {
    dispatch(fetchData());
    setItems(cardInitializationList.data.data);
  }, []);
  useEffect(() => {
    setItems(cardInitializationList.data.data);
  }, [cardInitializationList]);
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
  }
  const fd = filteredData[0];
  const basicInitialValues = {
    id: fd.id,
    sns: fd.sns,
    sne: fd.sne,
    bn: fd.bn,
    dn: fd.dn,
    date: formatDate(new Date().toString()),
    tq: fd.tq,
    nrc: fd.nrc,
    nic: fd.nic,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: "card initlaization form.pdf",
  });
  const handleSave = () => {
    dispatch(saveData(id));
  };
  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/">
              Card Initialization
            </Link>
            <Link underline="hover" color="inherit" to="/">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <button className="btn btn-primary" onClick={() => toPDF()}>
              <MdPictureAsPdf size={"25px"} color="#fff" />
              {/* Export To Pdf */}
            </button>
            <form onSubmit={handleSubmit}>
              <div ref={targetRef}>
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
                      value={formValues.sns}
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
                      value={formValues.sne}
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
                      value={formValues.bn}
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
                      value={formValues.dn}
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
                      value={formValues.tq}
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
                      value={formValues.nrc}
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
                      value={formValues.nic}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          nic: e.target.value,
                        })
                      }
                    />
                  </div>
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

export default CardInitilizationEdit;
