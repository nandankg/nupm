import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/rajiv/LoanRegisterReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
const EditLoanRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const loanRegisterList = useSelector((state) => state.loanRegister);
  console.log(loanRegisterList.data.data);
  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState("");

  const itmm = loanRegisterList.data.data;
  useEffect(() => {
    dispatch(fetchData());
    setItems(loanRegisterList.data.data);
  }, []);
  useEffect(() => {
    setItems(loanRegisterList.data.data);
    setSlug(loanRegisterList.slug);
  }, [loanRegisterList]);
  let filteredData;
  console.log(itmm);
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
    date: fd.date,
    issue_date: fd.issue_date,
    issue_time: fd.issue_time,
    item_name: fd.item_name,
    item_qty: fd.item_qty,
    name: fd.name,
    issuer_sign: fd.issuer_sign,
    return_date: fd.return_date,
    return_time: fd.return_time,
    balance_qty: fd.balance_qty,
    return_by_sign: fd.return_by_sign,
    receiver_sign: fd.receiver_sign,
    remark: fd.remark,
    formType: "loan-register-sdc",
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: "Loan Register form.pdf",
  });
  return (
    <>
      <div className="form-top-box pb-3 pt-5">
        <div className="row justify-content-center align-items-center">
          <div
            className="col-md-7 p-5 form-box"
            style={{ backgroundColor: "white" }}
          >
            <button className="btn btn-primary" onClick={() => toPDF()}>
              <MdPictureAsPdf size={"25px"} color="#fff" />
              {/* Export To Pdf */}
            </button>
            <form onSubmit={handleSubmit}>
              <div ref={targetRef}>
                <div className="mb-3 form-heading-container"></div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label htmlFor="inputName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      className="form-control"
                      id="inputName"
                      value={formValues.name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputItemname" className="form-label">
                      Item Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputItemname"
                      value={formValues.item_name}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          item_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputitemqty" className="form-label">
                      Item Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputitemqty"
                      value={formValues.item_qty}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          item_qty: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label
                      htmlFor="inputissue_name_sign"
                      className="form-label"
                    >
                      Issue to Name Sign
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputissue_name_sign"
                      value={formValues.issue_name_sign}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          issue_name_sign: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputreturn_date" className="form-label">
                      Return Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputreturn_date"
                      value={formValues.return_date}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          return_date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputreturn_time" className="form-label">
                      Return Time
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="inputreturn_time"
                      value={formValues.return_time}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          return_time: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="inputbalance_qty" className="form-label">
                      Balance Qty
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputbalance_qty"
                      value={formValues.balance_qty}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          balance_qty: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputreturn_by_sign" className="form-label">
                      Return By Sign
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputreturn_by_sign"
                      value={formValues.return_by_sign}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          return_by_sign: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputreceiver_sign" className="form-label">
                      Receiver Sign
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputreceiver_sign"
                      value={formValues.receiver_sign}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          receiver_sign: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <label htmlFor="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    value={formValues.remark}
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

export default EditLoanRegister;
