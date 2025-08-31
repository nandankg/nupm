import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData, budgetList } from "../../reducer/isha/EstimateLOAReducer";
import { formatDate, formatTime } from "../../data/formatDate";
const BudgetRegisterPayment = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();
  const eloa = useSelector((state) => state.estimateloa);
  const [slug, setSlug] = useState("");
  const [bgtid, setBgtid] = useState("");
  const [blist, setBlist] = useState([]);
  const [loa, setLoa] = useState({});

  console.log(blist);
  console.log(loa[0]?.budgetSubhead);
  console.log(loa);
  useEffect(() => {
    const floa = blist.filter((itm) => {
      return itm.budgetHead_id === bgtid;
    });

    setLoa(floa);
  }, [bgtid]);
  useEffect(() => {
    if (loa) {
      setFormValues({
        ...formValues,
        amountVetted: loa[0]?.amount,
        department: loa[0]?.department,
        budgetHead_id: bgtid,
        budgetSubhead: loa[0]?.budgetSubhead,
      });
    }
  }, [loa]);
  useEffect(() => {
    dispatch(budgetList());
  }, [dispatch]);
  useEffect(() => {
    if (eloa) {
      setSlug(eloa.slug);
      setBlist(eloa.budgetlist.data);
    }
  }, [eloa]);

  const basicInitialValues = {
    budgetHead_id: "",
    budgetSubhead: "",
    department: "",
    WorkType: "",
    amountVetted: "",
    amountLoaIssued: "",
    partyName: "",
    date: formatDate(new Date().toDateString()),
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
              Budget Register Payment
            </Link>
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
              List
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "95%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  Finance : Budget Register Payment
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputName" className="form-label">
                    Budget Head
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    id="inputName"
                    onChange={(e) => setBgtid(e.target.value)}
                    required
                  >
                    <option value="">Select Budget Head</option>
                    {blist?.map((item) => (
                      <option value={item.budgetHead_id}>
                        {item.budgetHead}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Sub Head
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputempid"
                    value={loa[0]?.budgetSubhead}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        budgetSubhead: loa[0]?.budgetSubhead,
                      })
                    }
                    readOnly
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputempid"
                    value={loa[0]?.department}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        department: loa[0]?.department,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputTimein" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputTimein"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputTopic" className="form-label">
                    Allotted Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTopic"
                    value={loa[0]?.balance_amount}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        amountVetted: loa[0]?.balance_amount,
                      })
                    }
                    readOnly
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputTimeout" className="form-label">
                    Party Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTimeout"
                    onChange={(e) =>
                      setFormValues({ ...formValues, WorkType: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputRemark" className="form-label">
                    LOA no/Contract Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        amountLoaIssued: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputTimein" className="form-label">
                    Voucher Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTimein"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        partyName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label for="inputTimein" className="form-label">
                    Payment Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTimein"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        partyName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label for="inputTimein" className="form-label"></label>
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

export default BudgetRegisterPayment;
