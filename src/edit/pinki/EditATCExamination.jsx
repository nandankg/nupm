import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import { 
  editData, 
  fetchData
 } from "../../reducer/pinki/AtcExaminationReducer";

const EditATCExamination = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const atcexamination = useSelector(
    (state) => state.atcexamination);

  console.log(atcexamination.data.data);
  const [items, setItems] = useState([]);
  const itmm = atcexamination.data.data;


  useEffect(() => {
    dispatch(fetchData());
    setItems(atcexamination.data.data);
  }, []);
  const [slug, setSlug] = useState("");
  useEffect(() => {
    if (atcexamination.data && atcexamination.data.data) {
      setItems(atcexamination.data.data);
      setSlug(atcexamination.slug);
     
    }
  }, [atcexamination]);

  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

  const fd = filteredData ? filteredData[0] : {};

  const basicInitialValues = {
    id: fd.id || "",
    from1: fd.from1,
    upto1: fd.upto1,
    fitness1: fd.fitness1,
    from2: fd.from2,
    upto2: fd.upto2,
    fitness2: fd.fitness2,
    from3: fd.from3,
    upto3: fd.upto3,
    fitness3: fd.fitness3,
    from4: fd.from4,
    upto4: fd.upto4,
    fitness4: fd.fitness4,
    from5: fd.from5,
    upto5: fd.upto5,
    fitness5: fd.fitness5,
    from6: fd.from6,
    upto6: fd.upto6,
    fitness6: fd.fitness6,
    from7: fd.from7,
    upto7: fd.upto7,
    fitness7: fd.fitness7,
    from8: fd.from8,
    upto8: fd.upto8,
    fitness8: fd.fitness8,
    from9: fd.from9,
    upto9: fd.upto9,
    fitness9: fd.fitness9,
    from10: fd.from10,
    upto10: fd.upto10,
    fitness10: fd.fitness10,
    from11: fd.from11,
    upto11: fd.upto11,
    fitness11: fd.fitness11,
    from12: fd.from12,
    upto12: fd.upto12,
    fitness12: fd.fitness12,
    from13: fd.from13,
    upto13: fd.upto13,
    fitness13: fd.fitness13,
    from14: fd.from14,
    upto14: fd.upto14,
    fitness14: fd.fitness14,
    from15: fd.from15,
    upto15: fd.upto15,
    fitness15: fd.fitness15,
    from16: fd.from16,
    upto16: fd.upto16,
    fitness16: fd.fitness16,
    from17: fd.from17,
    upto17: fd.upto17,
    fitness17: fd.fitness17,
    from18: fd.from18,
    upto18: fd.upto18,
    fitness18: fd.fitness18,
    from19: fd.from19,
    upto19: fd.upto19,
    fitness19: fd.fitness19,
    from20: fd.from20,
    upto20: fd.upto20,
    fitness20: fd.fitness20,
    remark1: fd.remark1 || "",
    remark2: fd.remark2 || "",
    remark3: fd.remark3 || "",
    remark4: fd.remark4 || "",
    remark5: fd.remark5 || "",
    remark6: fd.remark6 || "",
    remark7: fd.remark7 || "",
    remark8: fd.remark8 || "",
    remark9: fd.remark9 || "",
    remark10: fd.remark10 || "",
    remark11: fd.remark11 || "",
    remark12: fd.remark12 || "",
    remark13: fd.remark13 || "",
    remark14: fd.remark14 || "",
    remark15: fd.remark15 || "",
    remark16: fd.remark16 || "",
    remark17: fd.remark17 || "",
    remark18: fd.remark18 || "",
    remark19: fd.remark19 || "",
    remark20: fd.remark20 || "",
    date: fd.date,
    tpd: fd.tpd,
    se: fd.se,
    formType: "atc-examination",
    employee_id: fd.employee_id,
    department: fd.department,
    unit: fd.unit,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

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
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
          <Link to={`/form/${slug}`}>
              ATC Examination
            </Link>
            <Link underline="hover" color="inherit">
             Certificate
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading">
                  ATC Examination Certificate 
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="one">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#01</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label htmlFor="inputfrom" className="form-label">
                      From (Date)
                    </label>
                    <input
                      type="datetime-local" // Changed to date
                      className="form-control"
                      id="inputfrom"
                      value={formValues.from1}
                      onChange={(e) =>
                        setFormValues({ ...formValues, from1: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputupto" className="form-label">
                      Up to (Date)
                    </label>
                    <input
                      type="datetime-local" // Changed to date
                      className="form-control"
                      id="inputupto"
                      value={formValues.upto1}
                      onChange={(e) =>
                        setFormValues({ ...formValues, upto1: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness1: e.target.value,
                        })
                      }
                    >
                      <option value="">{formValues.fitness1}</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.remark1}
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark1: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="two">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#02</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label htmlFor="inputfrom" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={formValues.from2}
                      id="inputfrom"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setFormValues({
                          ...formValues,
                          from2: newValue,
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputupto" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={formValues.upto2}
                      id="inputupto"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setFormValues({
                          ...formValues,
                          upto2: newValue,
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness2: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      value={formValues.remark2}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark2: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="three">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#03</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label htmlFor="inputfrom3" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom3"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from3: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputupto3" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto3"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto3: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness3: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark3: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="four">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#04</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label htmlFor="inputfrom4" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom4"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from4: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputupto4" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto4"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto4: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness4: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark4: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="five">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#05</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label htmlFor="inputfrom5" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom5"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from5: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputupto5" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto5"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto5: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness5: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark5: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="six">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#06</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label htmlFor="inputfrom6" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom6"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from6: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputupto6" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto6"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto6: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness6: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark6: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="seven">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#07</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label htmlFor="inputfrom7" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom7"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from7: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputupto7" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto7"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto7: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness7: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark7: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="eight">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#08</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label htmlFor="inputfrom8" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom8"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from8: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputupto8" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto8"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto8: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness8: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark8: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="nine">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#09</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label htmlFor="inputfrom9" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom9"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from9: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputupto9" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto9"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto9: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness9: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark9: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="ten">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#10</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label htmlFor="inputfrom10" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom10"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from10: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputupto10" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto10"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto10: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness10: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark10: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="el">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#11</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label for="inputfrom" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from11: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label for="inputupto" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto11: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness11: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark11: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="tw">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#12</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label for="inputfrom" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from12: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label for="inputupto" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto12: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness12: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark12: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="th">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#13</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label for="inputfrom" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from13: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label for="inputupto" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto13: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness13: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark13: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="fo">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#14</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label for="inputfrom" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from14: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label for="inputupto" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto14: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness14: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark14: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="fif">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#15</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label for="inputfrom" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from15: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label for="inputupto" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto15: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness15: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark15: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="si">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#16</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label for="inputfrom" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from16: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label for="inputupto" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto16: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness16: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark16: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="sev">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#17</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label for="inputfrom" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from17: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label for="inputupto" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto17: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness17: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark17: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="ei">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#18</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label for="inputfrom" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from18: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label for="inputupto" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto18: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness18: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark18: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="ni">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#19</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label for="inputfrom" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from19: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label for="inputupto" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto19: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness19: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark19: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="twe">
                <div className="row mb-12">
                  <h4 className="text-center form-heading">TS#20</h4> <br />
                  <br />
                  <div className="col-md-3">
                    <label for="inputfrom" className="form-label">
                      From (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputfrom"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from20: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label for="inputupto" className="form-label">
                      Up to (Date/Hours)
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="inputupto"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          upto20: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputfitness" className="form-label">
                      Fitness Given in ATP/ATO
                    </label>
                    <select
                      className="form-control"
                      id="inputfitness"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fitness20: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="ATP+ATO">1- ATP+ATO</option>
                      <option value="ATP ONLY">2- ATP ONLY</option>
                      {/* <option value="ATO ONLY">3- ATO ONLY</option> */}
                      <option value="UNDER RS MAINTENANCE">
                        3- UNDER RS MAINTENANCE
                      </option>
                      <option value="UNDER SIGNALLING MAINTENANCE">
                        4- UNDER SIGNALLING MAINTENANCE
                      </option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputRemark" className="form-label">
                      Remark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemark"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remark20: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              {/* ********************************************************************************** */}
              <div
                className="col-md-12"
                style={{ display: "flex", margin: "10px" }}
              >
                <div className="col-md-6">
                  <label for="inputtpd" className="form-label">
                    TPD
                  </label>
                  <input
                    style={{ width: "250px" }}
                    type="Text"
                    className="form-control "
                    id="inputtpd"
                    value={formValues.tpd}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        tpd: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputse" className="form-label">
                    SE/JE
                  </label>
                  <input
                    style={{ width: "250px" }}
                    type="Text"
                    className="form-control"
                    id="inputse"
                    value={formValues.se}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        se: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary mt-3">
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

export default EditATCExamination;
