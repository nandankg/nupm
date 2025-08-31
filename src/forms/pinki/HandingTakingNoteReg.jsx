import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import { addData } from "../../reducer/pinki/HandingTakingNoteReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const HandingTakingNoteReg = () => {
  const navigate = useNavigate();
  const [sno, setSno] = useState(1); // Serial number auto-assigned
  const [slug, setSlug] = useState();
  const [formValues, setFormValues] = useState({
    sno: sno,
    item_des: "",
    part_no: "",
    serial_no: "",
    date: formatDate(new Date().toDateString()),
    location_from: "",
    location_to: "",
    qty: "",
    def_ser_rep: "",
    auth_no_n_date: "",
    remark: "",
    // sign_handed: "",
    name_handed: "",
    designation_handed: "",
    emp_id_handed: "",
    date_handed: formatDate(new Date().toDateString()),
    // sign_taken: "",
    name_taken: "",
    designation_taken: "",
    empid_taken: "",
    date_taken: formatDate(new Date().toDateString()),
    forwarded_by: "", // Added 'Forwarded by' option
    counter_sign: "", // Added 'Counter sign' option
  });

  const [empDetails, setEmpDetails] = useState({
    name_taken: "",
    designation_taken: "",
    empid_taken: "",
  }); // To auto-fill employee details

  const dispatch = useDispatch();
  const handingTakingNote = useSelector((state) => state.handingtakingnote);

  useEffect(() => {
    setFormValues((prevState) => ({
      ...prevState,
      sno: sno, // Auto-assign serial number
    }));
  }, [sno]);

  useEffect(() => {
    if (handingTakingNote) {
      setSlug(handingTakingNote.slug);
    }
  }, [handingTakingNote]);

  const handleEmpNoChange = (e) => {
    const empNo = e.target.value;
    setFormValues((prevState) => ({
      ...prevState,
      empid_taken: empNo,
    }));

    // Example: Auto-fill employee details using the entered Employee No.
    if (empNo === "123") {
      setEmpDetails({
        name_taken: "John Doe",
        designation_taken: "Manager",
        empid_taken: empNo,
      });
    }
  };
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };
  console.log(slug);

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
                <label htmlFor="inputdate" className="form-label">
                  Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputdate"
                  onChange={(e) =>
                    setFormValues({ ...formValues, date: e.target.value })
                  }
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
                  required
                  min="1"
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
                  min="1"
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
                  min="1"
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
                  min="1"
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
                  <h4>Taken Over By:</h4>
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

export default HandingTakingNoteReg;
