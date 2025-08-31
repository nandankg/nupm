import React, { useState, useEffect } from "react";

import { addBiodata, addData } from "../../reducer/akshra/BiodataoccReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";

const Biodataocc = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);

  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [station, setStation] = useState("Ranchi");
  //const [afcgateno, setAfcgateno] = useState("123");
  const BIodataoccList = useSelector((state) => state.bioocc);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (BIodataoccList) {
      setSlug(BIodataoccList.slug);
    }
  }, [BIodataoccList]);
  const basicInitialValues = {
    //date: date.toDateString(),
    //sno: sNo,
    empid: "empid",
    name: " current user",
    designation: "",
    present: "",
    permanent: "",
    contactno: "",
    dob: formatDate(date.toDateString()),
    doa: formatDate(date.toDateString()),
    joining: formatDate(date.toDateString()),
    doc: formatDate(date.toDateString()),
    trainingfirstaid: formatDate(date.toDateString()),
    trainingfirefighting: formatDate(date.toDateString()),
    dom: formatDate(date.toDateString()),
    remark: "",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
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
              BIO DATA REGISTER(OCC)
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "75%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">BIO DATA REGISTER (OCC)</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputEmpno" className="form-label">
                    Emp.No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmpno"
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor=" inputName" className="form-label">
                    Name
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                </div>
                <div className="col -6">
                  <label htmlFor="inputDesignation" className="form-label">
                    Designation
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="inputDesignation"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        designation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <b>ADDRESS</b>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="inputPresent" className="form-label">
                    Present
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="caddress"
                    id="inputPresent"
                    onChange={(e) =>
                      setFormValues({ ...formValues, present: e.target.value })
                    }
                  />
                </div>

                <div className="col -md -6">
                  <label htmlFor="inputPermanent" className="form-label">
                    Permanent
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="caddress"
                    id="inputPermanent"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        permanent: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col- 6">
                  <label htmlFor="inputContactno" className="form-label">
                    Contact No.
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="numbers"
                    id="inputContactno"
                    title="ten numbers"
                    pattern="\d{10}"
                    required
                    autoComplete="off"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        contactno: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <b>IMPORTANT DATES</b>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputDob" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({ ...formValues, dob: e.target.value })
                    }
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="inputDoa" className="form-label">
                    Date of Appointment
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({ ...formValues, doa: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputJoining" className="form-label">
                    Competancy Valid Till
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({ ...formValues, joining: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputDoc" className="form-label">
                    Date of Competancy SC
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({ ...formValues, doc: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputDoc" className="form-label">
                    Date of Competancy TO
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({ ...formValues, doc: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputTrainingfirstaid" className="form-label">
                    Training First Aid
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        trainingfirstaid: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputTrainingfighting" className="form-label">
                    Training Fire Fighting
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        trainingfirefighting: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputDom" className="form-label">
                    Date of Medical
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={(e) =>
                      setFormValues({ ...formValues, dom: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
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

export default Biodataocc;
