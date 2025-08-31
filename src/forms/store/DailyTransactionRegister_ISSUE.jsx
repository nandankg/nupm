import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import {
  fetchData,
  addData,
  fetchMaterial,
} from "../../reducer/store/DailyIssueReducer";
import { formatDate, formatTime } from "../../data/formatDate";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const DailyTransactionRegister_ISSUE = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [items, setItems] = useState([]);
  const [material, setMaterial] = useState([]);
  const dispatch = useDispatch();
  const daily = useSelector((state) => state.dailyissue);

  console.log(daily);

  const [slug, setSlug] = useState(getLastParameter().trim());

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchMaterial());
    // Re-fetch every 60 seconds

    // Cleanup interval on unmount
  }, [dispatch]);

  useEffect(() => {
    if (daily.data?.data) {
      setItems(daily.data.data);
      setMaterial(daily.material.data);
    }
  }, [daily]);

  const [matName, setMatName] = useState("");
  const basicInitialValues = {
    date: "",
    material_id: "",
    material_desc: matName,

    qty: "",
    challan_no: "",
    for_whatWork: "",
    challan_date: "",
    received_name: "",
    received_designation: "",
    ledger_no: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  let mtid = "";
  mtid = formValues.material_id;

  console.log(mtid);
  console.log(matName);
  const filterDataById = (id) => {
    const result = material.filter((item) => item.id === id);
    setMatName(result[0]?.materialName);
    setFormValues({
      ...formValues,
      material_desc: result[0]?.materialName,
    });
  };
  useEffect(() => {
    // alert(formValues.material_id)
    let mid = parseInt(formValues.material_id);
    filterDataById(mid);
  }, [formValues.material_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              DTR-Issue
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{ maxWidth: "95%" }}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading"> DTR-Issue </h3>
                <span className="line-box" style={{ width: "200px" }}></span>
              </div>
              <div className="row mb-3">
                <div class="col-md-6">
                  <label for="inputName" class="form-label">
                    Select Material
                  </label>
                  <select
                    className="form-control"
                    id="inputmaintenanceschedule"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        material_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Material</option>
                    {material?.map((itm) => (
                      <option value={itm.id}>{itm.materialName}</option>
                    ))}
                  </select>
                </div>
                
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Serial No.
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    name="serial_no"
                    value={formValues.serial_no}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        serial_no: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputempid" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="qty"
                    value={formValues.qty}
                    onChange={(e) =>
                      setFormValues({ ...formValues, qty: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12" style={{ textAlign: "center" }}>
                  <label htmlFor="inputhate" className="form-label">
                    <b>Invoice/Challan</b>
                  </label>
                </div>
                <div className="col-6" style={{ textAlign: "center" }}>
                  <label htmlFor="inputTimein" className="form-label">
                  Requisition Slip No/Handover Note No/FMTS No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="challan_no"
                    value={formValues.challan_no}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        challan_no: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6" style={{ textAlign: "center" }}>
                  <label htmlFor="inputTimeout" className="form-label">
                  Requisition Slip No/Handover Note No/FMTS No Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="challan_date"
                    value={formValues.challan_date}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        challan_date: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12" style={{ textAlign: "center" }}>
                  <label htmlFor="inputhate" className="form-label">
                    <b>To Whom Issued</b>
                  </label>
                </div>
                <div className="col-6" style={{ textAlign: "center" }}>
                  <label htmlFor="inputTimein" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="received_name"
                    value={formValues.received_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        received_name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6" style={{ textAlign: "center" }}>
                  <label htmlFor="inputTimeout" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="received_designation"
                    value={formValues.received_designation}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        received_designation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row md-3">
                <div className="col-6" style={{ textAlign: "center" }}>
                  <label htmlFor="inputTimein" className="form-label">
                  For What Work and Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="for_whatWork"
                    value={formValues.for_whatWork}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        for_whatWork: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6" style={{ textAlign: "center" }}>
                <label htmlFor="inputTimein" className="form-label">
                 Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="ledger_no"
                    value={formValues.ledger_no}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        ledger_no: e.target.value,
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

export default DailyTransactionRegister_ISSUE;
