import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  editData,
  fetchData,
} from "../../reducer/pinki/HandingTakingNoteReducer";
import { formatDate } from "../../data/formatDate";

const EditHandingTaking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const handingtakingnote = useSelector((state) => state.handingtakingnote);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (handingtakingnote) {
      setSlug(handingtakingnote.slug);
    }
  }, [handingtakingnote]);
  console.log(handingtakingnote.data.data);
  const [items, setItems] = useState([]);
  const itmm = handingtakingnote.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(handingtakingnote.data.data);
  }, [dispatch]);

  useEffect(() => {
    setItems(handingtakingnote.data.data);
  }, [handingtakingnote]);

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
    sno: fd.sno,
    item_des: fd.itemDescription,
    part_no: fd.partNo,
    serial_no: fd.serialNo,
    date: formatDate(new Date().toDateString()),
    location_from: fd.locationFrom,
    location_to: fd.locationTo,
    qty: fd.qty,
    def_ser_rep: fd.condition,
    auth_no_n_date: fd.authRefNo,
    remark: fd.remarks,
    // sign_handed: fd.sign_handed,
    name_handed: fd.name_handed,
    designation_handed: fd.designation_handed,
    emp_id_handed: fd.emp_id_handed,
    date_handed: fd.date_handed,
    // sign_taken: fd.sign_taken,
    name_taken: fd.name_taken,
    designation_taken: fd.designation_taken,
    empid_taken: fd.empid_taken,
    date_taken: fd.date_taken,
    counter_sign: fd.counter_sign ,
    forwarded_by: fd.forwarded_by,
    // am_mgr: fd.am_mgr
  };
  console.log(basicInitialValues);
  const [formValues, setFormValues] = useState(basicInitialValues);

  useEffect(() => {
    setFormValues(basicInitialValues);
  }, [fd]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
     <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Handing/ Taking Note PLL
          </Link>
          <Link underline="hover" color="inherit">
            Register
          </Link>
        </Breadcrumbs>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading">
                  Handing / Taking Over Note For PLL Items
                </h3>
                <div className="heading-line"></div>
              </div>
              {/* Form Fields */}

              <div className="col-md-6">
                <label htmlFor="inputdate" className="form-label">Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="inputdate"
                  value={formValues.date}
                  onChange={(e) => setFormValues({ ...formValues, date: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputides" className="form-label">
                  Item Description
                </label>
                <input
                  type="Text"
                  className="form-control"
                  id="inputides"
                  value={formValues.item_des}
                  onChange={(e) =>
                    setFormValues({ ...formValues, item_des: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputpartno" className="form-label">
                  Part No.
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputpartno"
                  value={formValues.part_no}
                  onChange={(e) =>
                    setFormValues({ ...formValues, part_no: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputserialno" className="form-label">
                  Serial No.
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputserialno"
                  value={formValues.serial_no}
                  onChange={(e) =>
                    setFormValues({ ...formValues, serial_no: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputlocation" className="form-label">
                  Location From
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputlocation"
                  value={formValues.location_from}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      location_from: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputlocationto" className="form-label">
                  Location To
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputlocationto"
                  value={formValues.location_to}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      location_to: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputqty" className="form-label">
                  Qty.
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputqty"
                  value={formValues.qty}
                  onChange={(e) =>
                    setFormValues({ ...formValues, qty: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputdsr" className="form-label">
                  Defective/Serviceable/Repaired
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputdsr"
                  value={formValues.def_ser_rep}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      def_ser_rep: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputauth" className="form-label">
                  Auth.Ref. No.
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputauth"
                  value={formValues.auth_no_n_date}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      auth_no_n_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputremark" className="form-label">
                  Remark
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputremark"
                  value={formValues.remark}
                  onChange={(e) =>
                    setFormValues({ ...formValues, remark: e.target.value })
                  }
                />
              </div>
              <div className="row ">
              <div className="col-12 text-center ">
          <h4>Handed Over By:</h4>
        </div>
                {/* <div className="col-md-6">
                  <label htmlFor="inputsign" className="form-label">
                    Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputsign"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        sign_handed: e.target.value,
                      })
                    }
                  />
                </div> */}
                <div className="col-md-4">
                  <label htmlFor="inputhname" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputhname"
                    value={formValues.name_handed}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        name_handed: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputdesig" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdesig"
                    value={formValues.designation_handed}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        designation_handed: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputempid" className="form-label">
                    Emp Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputempid"
                    value={formValues.emp_id_handed}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        emp_id_handed: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputhdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputhdate"
                    value={formValues.date_handed}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date_handed: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row">
              <div className="col-12 text-center">
                <h4 >Taken Over By:</h4>
                </div>
                {/* <div className="col-md-6">
                  <label htmlFor="inputtsign" className="form-label">
                    Sign
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtsign"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        sign_taken: e.target.value,
                      })
                    }
                  />
                </div> */}
                <div className="col-md-4">
                  <label htmlFor="inputtname" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtname"
                    value={formValues.name_taken}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        name_taken: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputtdesign" className="form-label">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtdesign"
                    value={formValues.designation_taken}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        designation_taken: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputtempid" className="form-label">
                    Emp Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputtempid"
                    value={formValues.empid_taken}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        empid_taken: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputtdate" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputtdate"
                    value={formValues.date_taken}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        date_taken: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              
              {/* 'Forwarded by' option */}
              <div className="col-md-6">
                <label htmlFor="forwarded_by" className="form-label">
                  Forwarded by (if any)
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formValues.forwarded_by}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      forwarded_by: e.target.value,
                    })
                  }
                />
              </div>
              {/* 'Counter sign' option */}
              <div className="col-md-6">
                <label htmlFor="counter_sign" className="form-label">
                  Counter Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formValues.counter_sign}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      counter_sign: e.target.value,
                    })
                  }
                />
              </div>
              {/* Submit button */}
              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHandingTaking;
