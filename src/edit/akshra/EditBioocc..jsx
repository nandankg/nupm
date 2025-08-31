import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/akshra/BiodataoccReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const EditBioocc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const BIodataoccList = useSelector((state) => state.bioocc);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (BIodataoccList) {
      setSlug(BIodataoccList.slug);
    }
  }, [BIodataoccList]);
  console.log(BIodataoccList.data.data);
  const [items, setItems] = useState([]);
  const itmm = BIodataoccList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(BIodataoccList.data.data);
  }, []);
  useEffect(() => {
    setItems(BIodataoccList.data.data);
  }, [BIodataoccList]);
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
    id: fd.id,
    sno: "Number",
    empid: fd.empid,
    name: fd.name,
    designation: fd.designation,
    present: fd.present,
    permanent: fd.permanent,
    contactno: fd.contactno,
    dob: fd.dob,
    doa: fd.doa,
    joining: fd.joining,
    doc: fd.doc,
    trainingfirstaid: fd.trainingfirstaid,
    trainingfirefighting: fd.trainingfirefighting,
    dom: fd.dom,
    remark: fd.remark,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
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
          <div className="col-md-8 form-container">
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
                    value={formValues.empid}
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
                    value={formValues.name}
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
                    value={formValues.designation}
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
                    value={formValues.present}
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
                    value={formValues.permanent}
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
                    value={formValues.contactno}
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
                    value={formValues.dob}
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
                    value={formValues.doa}
                    onChange={(e) =>
                      setFormValues({ ...formValues, doa: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputJoining" className="form-label">
                    Joining Station
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={formValues.joining}
                    onChange={(e) =>
                      setFormValues({ ...formValues, joining: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputDoc" className="form-label">
                    Date of Competancy
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={formValues.doc}
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
                    value={formValues.trainingfirstaid}
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
                    Training Fighting
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputIndate"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={formValues.trainingfirefighting}
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
                    value={formValues.dom}
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
                    value={formValues.remark}
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

export default EditBioocc;
