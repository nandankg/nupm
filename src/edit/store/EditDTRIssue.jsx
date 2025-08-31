import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/redux/tableDataSlice";
import { dtrissue } from "../../utils/formUtils";
import Breadcrumbs from "@mui/material/Breadcrumbs";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditDTRIssue = () => {
  const [slug, setSlug] = useState(getLastParameter().trim());
  const loanregister = useSelector((state) => state.data);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [formValues, setFormValues] = useState({});

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchData({ formType: slug }));
  }, [dispatch]);

  // Initialize form values when data is loaded
  useEffect(() => {
    if (loanregister?.data?.data) {
      const filteredData = loanregister.data.data.find(
        (item) => item.id === id
      );
      if (filteredData) {
        setFormValues(filteredData);
      }
    }
  }, [loanregister, id]);
  console.log(formValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData({ formType: slug, values: formValues }));
    navigate(`/list/${slug}`);
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
                  <input
                  type="text"
                    className="form-control"
                    id="inputmaintenanceschedule"
                    value={formValues.material_desc}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        material_id: e.target.value,
                      })
                    }
                  />
                
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
                    name="descriptionofmaterial"
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
                    type="Text"
                    className="form-control"
                    name="quantity"
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
                    <b>Invoice/Challan </b>
                  </label>
                </div>
                <div className="col-6" style={{ textAlign: "center" }}>
                  <label htmlFor="inputTimein" className="form-label">
                  Requisition Slip No/Handover Note No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="challanno"
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
                  Requisition Slip No/Handover Note No Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
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
                    name="name"
                    value={formValues.issued_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        issued_name: e.target.value,
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
                    name="designation"
                    value={formValues.issued_designation}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        issued_designation: e.target.value,
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
                    name="forwhatwork"
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
export default EditDTRIssue;
