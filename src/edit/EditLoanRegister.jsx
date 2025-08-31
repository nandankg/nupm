import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../data/formatDate";
import { editData, fetchData } from "../reducer/LoanRegisterReducer";
import { formatTime } from "../data/formatDate";

const LoanRegisterEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sno, setSno] = useState(1);
  const [date, setDate] = useState(new Date());
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const loanreg = useSelector((state) => state.loanregisterstore || []);
  console.log(loanreg.data.data);
  const [items, setItems] = useState([]);
  const itmm = loanreg.data.data;
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(loanreg.data.data);
  }, []);

  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (loanreg) {
      setSlug(loanreg.slug);
    }
  }, [loanreg]);

  useEffect(() => {
    setItems(loanreg.data.data);
  }, [loanreg]);
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
    //from form
    sno: 1,
    id: fd.id,
    date: formatDate(new Date().toString()),
    issuetime: formatTime(new Date().toString()),
    itmname: fd.item_name,
    qty: fd.item_qty,
    name: fd.name,
    issuenamesign: fd.issue_to_name_sign,
    issuersign: fd.issuer_sign,
    returndate: fd.return_date,
    returntime: fd.return_time,
    blnqty: fd.balance_qty,
    formType: "loan-register-sdc",
    employee_id: fd.employee_id,
    returnsign: fd.return_by_sign,
    receiversign: fd.receiver_sign,
    remark: fd.remark,

    department: fd.department,
    unit: fd.unit,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(editData(formValues));
    const newSrno = sno + 1;
    setSno(newSrno);
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Loan Register
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
                <h3 className="form-heading">Loan Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="itemname" className="form-label">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="itemname"
                    value={formValues.itmname}
                    onChange={(e) =>
                      setFormValues({ ...formValues, itmname: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="qty" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={formValues.qty}
                    id="qty"
                    onChange={(e) =>
                      setFormValues({ ...formValues, qty: e.target.value })
                    }
                  />
                </div>
                <br />
                <div className="col-md-4">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.name}
                    id="name"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                  <br />
                </div>

                <hr
                  style={{
                    borderBlockStyle: "double",
                    borderBlockColor: "#f7b3a1",
                    borderWidth: "5px",
                  }}
                />
                <div className="col-md-4 ">
                  <label htmlFor="issuesign" className="form-label text-start">
                    Issue to Name Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.issuenamesign}
                    id="issuesign"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        issuenamesign: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="issuersign" className="form-label">
                    Issuer Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.issuersign}
                    id="issuersign"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        issuersign: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="issuedate" className="form-label">
                    Issuing Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={formValues.date}
                    id="issuedate"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="issuetime" className="form-label">
                    Issuing Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    value={formValues.issuetime}
                    id="issuetime"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        issuetime: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>
                <div className="col-md-4">
                  <label htmlFor="rtndate" className="form-label">
                    Return Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={formValues.returndate}
                    id="rtndate"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        returndate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="rtntime" className="form-label">
                    Return Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    value={formValues.returntime}
                    id="rtntime"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        returntime: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>

                <div className="col-md-4">
                  <label htmlFor="blnqty" className="form-label">
                    Balance QTY.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.blnqty}
                    id="blnqty"
                    onChange={(e) =>
                      setFormValues({ ...formValues, blnqty: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="iretunsign" className="form-label">
                    Return by Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.returnsign}
                    id="retunsign"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        returnsign: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="receiversign" className="form-label">
                    Receiver Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.receiversign}
                    id="receiversign"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        receiversign: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>
                <div className="col-md-12">
                  <label htmlFor="issuesign" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.remark}
                    id="issuesign"
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

export default LoanRegisterEdit;
