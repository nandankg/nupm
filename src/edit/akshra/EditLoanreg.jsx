import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/redux/tableDataSlice";
import { loanregistertelecom } from "../../utils/formUtils";
import Breadcrumbs from "@mui/material/Breadcrumbs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditLoanregTelecom = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [formValues, setFormValues] = useState({});

  // Fetch data on mount


  // Initialize form values when data is loaded
  useEffect(() => {
    if (loanregister?.data?.data) {
      const filteredData = loanregister.data.data.find(
        (item) => item.id === id
      );
      if (filteredData) {
        setFormValues(loanregistertelecom(filteredData));
      }
    }
  }, [loanregister, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    // navigate(`/list/${slug}`);
  };

  const handleSave = () => {
    dispatch(saveData(id));
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              LOAN REGISTER
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
                <h3 className="form-heading">EDIT: Loan Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputDate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputDate"
                    name="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputItemdes" className="form-label">
                    Item Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputItemdes"
                    value={formValues.itemdes}
                    onChange={(e) =>
                      setFormValues({ ...formValues, itemdes: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputMake" className="form-label">
                    Make/Model/Serial No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputMake"
                    value={formValues.make}
                    onChange={(e) =>
                      setFormValues({ ...formValues, make: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputReturable" className="form-label">
                    Returnable/Non Returnable
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputReturable"
                    value={formValues.returnable}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        returnable: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <b>SENDING DETAILS</b>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputSendto" className="form-label">
                    Send To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSendto"
                    value={formValues.sendto}
                    onChange={(e) =>
                      setFormValues({ ...formValues, sendto: e.target.value })
                    }
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="inputSendby" className="form-label">
                    Send By
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputSendby"
                    value={formValues.sendby}
                    onChange={(e) =>
                      setFormValues({ ...formValues, sendby: e.target.value })
                    }
                  />
                </div>
              </div>
              <b>RECEIVING DETAILS</b>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputReceivedate" className="form-label">
                    Receiving Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputReceivedate"
                    name="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={formValues.receivedate}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        receivedate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="inputReceiveby" className="form-label">
                    Received By
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputReceiveby"
                    value={formValues.receiveby}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        receiveby: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputRemarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemarks"
                    value={formValues.remarks}
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
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

export default EditLoanregTelecom;
