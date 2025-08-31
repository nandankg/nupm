import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
} from "../../reducer/store/BudgetAllotmentReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
const BudgetAllotmentEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const policeCustodyRegList = useSelector((state) => state.budgetallotment);
  const [slug, setSlug] = useState("");

  const [items, setItems] = useState([]);
  const itmm = policeCustodyRegList.data.data;
  console.log(items);
  console.log(itmm);
  useEffect(() => {
    dispatch(fetchData());
    setItems(policeCustodyRegList.data.data);
  }, []);
  useEffect(() => {
    setItems(policeCustodyRegList.data.data);
    setSlug(policeCustodyRegList.slug);
  }, [policeCustodyRegList]);
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

    budgetHead_id: fd.budgetHead_id,

    budgetHead: fd.budgetHead,
    budgetSubhead: fd.budgetSubhead,
    financialYear: fd.financialYear,
    department: fd.department,
    budgetType: "original",
    amount: fd.amount,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: "Budget Allotment.pdf",
  });
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Budget Allotment
            </Link>
            <Link underline="hover" color="inherit">
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
              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Budget Head</label>
                  <input
                    type="text"
                    name="budgetHead"
                    className="form-control"
                    value={formValues.budgetHead}
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label>Sub Head</label>
                  <input
                    type="text"
                    name="subHead"
                    className="form-control"
                    value={formValues.budgetSubhead}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        budgetSubhead: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Financial Year</label>
                  <select
                    name="financialYear"
                    className="form-control"
                    value={formValues.financialYear}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        financialYear: e.target.value,
                      })
                    }
                  >
                    <option value="">Select FY</option>
                    <option value="2023-24">2023-24</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label>Department</label>
                  <select
                    name="department"
                    className="form-control"
                    value={formValues.department}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        department: e.target.value,
                      })
                    }
                  >
                   <option value="">Select Department</option>
                  <option value="signalling">Signalling</option>
                  <option value="telecom">Telecom</option>
                  <option value="Operation">Operation</option>
                  <option value="sdc">SDC</option>
                  <option value="Finance">Finance</option>
                  <option value="Mainline">Mainline</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-8">
                  <label>Budget Type</label>
                  <br />
                  <input
                    type="radio"
                    name="budgetType"
                    value="original"
                    checked={formValues.budgetType === "original"}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        budgetType: e.target.value,
                      })
                    }
                  />
                  Original Budget Allotment
                  <input
                    type="radio"
                    name="budgetType"
                    value="revised"
                    className="ms-3"
                    checked={formValues.budgetType === "revised"}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        budgetType: e.target.value,
                      })
                    }
                  />
                  Revised Budget Allotment
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label>Amount</label>
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={formValues.amount}
                    onChange={(e) =>
                      setFormValues({ ...formValues, amount: e.target.value })
                    }
                  />
                </div>
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetAllotmentEdit;
