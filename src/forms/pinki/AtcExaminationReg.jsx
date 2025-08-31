import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../../reducer/pinki/AtcExaminationReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formatDate } from "../../data/formatDate";

const AtcExaminationReg = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const atcexamination = useSelector((state) => state.atcexamination);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (atcexamination) {
      setSlug(atcexamination.slug);
    }
  }, [atcexamination]);
  const initialFormState = {
    sl_no: "----",
    from1: "",
    upto1: "",
    fitness1: "",
    from2: "",
    upto2: "",
    fitness2: "",
    from3: "",
    upto3: "",
    fitness3: "",
    from4: "",
    upto4: "",
    fitness4: "",
    from5: "",
    upto5: "",
    fitness5: "",
    from6: "",
    upto6: "",
    fitness6: "",
    from7: "",
    upto7: "",
    fitness7: "",
    from8: "",
    upto8: "",
    fitness8: "",
    from9: "",
    upto9: "",
    fitness9: "",
    from10: "",
    upto10: "",
    fitness10: "",
    from11: "",
    upto11: "",
    fitness11: "",
    from12: "",
    upto12: "",
    fitness12: "",
    from13: "",
    upto13: "",
    fitness13: "",
    from14: "",
    upto14: "",
    fitness14: "",
    from15: "",
    upto15: "",
    fitness15: "",
    from16: "",
    upto16: "",
    fitness16: "",
    from17: "",
    upto17: "",
    fitness17: "",
    from18: "",
    upto18: "",
    fitness18: "",
    from19: "",
    upto19: "",
    fitness19: "",
    from20: "",
    upto20: "",
    fitness20: "",
    remark1: "", //Added
    remark2: "",
    remark3: "",
    remark4: "",
    remark5: "",
    remark6: "",
    remark7: "",
    remark8: "",
    remark9: "",
    remark10: "",
    remark11: "",
    remark12: "",
    remark13: "",
    remark14: "",
    remark15: "",
    remark16: "",
    remark17: "",
    remark18: "",
    remark19: "",
    remark20: "",
    date: formatDate(new Date().toDateString()),
    tpd: "",
    se: "",
  };

  const [formValues, setFormValues] = useState(initialFormState);
  console.log(formValues);

  const handleInputChange = (workKey, index, key, value = null) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [key]: value !== null ? value : item[key] === "No" ? "Yes" : "No",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));

    navigate(`/list/${slug}`);
  };

  const labels = [
    {
      Train_set: "TS#01",
      from1: formatDate(new Date().toDateString()),
      upto1: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness1: "",
    },
    {
      Train_set: "TS#02",
      from2: formatDate(new Date().toDateString()),
      upto2: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness2: "",
    },

    {
      Train_set: "TS#03",
      from3: formatDate(new Date().toDateString()),
      upto3: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness3: "",
    },
    {
      Train_set: "TS#04",
      from4: formatDate(new Date().toDateString()),
      upto4: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness4: "",
    },
    {
      Train_set: "TS#05",
      from5: formatDate(new Date().toDateString()),
      upto5: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness5: "",
    },
    {
      Train_set: "TS#06",
      from6: formatDate(new Date().toDateString()),
      upto6: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness6: "",
    },
    {
      Train_set: "TS#07",
      from7: formatDate(new Date().toDateString()),
      upto7: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness7: "",
    },

    {
      Train_set: "TS#08",
      from8: formatDate(new Date().toDateString()),
      upto8: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness8: "",
    },
    {
      Train_set: "TS#09",
      from9: formatDate(new Date().toDateString()),
      upto9: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness9: null,
    },
    {
      Train_set: "TS#10",
      from10: formatDate(new Date().toDateString()),
      upto10: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness10: "",
    },
    {
      Train_set: "TS#11",
      from11: formatDate(new Date().toDateString()),
      upto11: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness11: "",
    },
    {
      Train_set: "TS#12",
      from12: formatDate(new Date().toDateString()),
      upto12: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness12: "",
    },
    {
      Train_set: "TS#13",
      from13: formatDate(new Date().toDateString()),
      upto13: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness13: "",
    },
    {
      Train_set: "TS#14",
      from14: formatDate(new Date().toDateString()),
      upto14: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness14: "",
    },
    {
      Train_set: "TS#15",
      from15: formatDate(new Date().toDateString()),
      upto15: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness15: "",
    },
    {
      Train_set: "TS#16",
      from16: formatDate(new Date().toDateString()),
      upto16: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness16: "",
    },
    {
      Train_set: "TS#17",
      from17: formatDate(new Date().toDateString()),
      upto17: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness17: "",
    },
    {
      Train_set: "TS#18",
      from18: formatDate(new Date().toDateString()),
      upto18: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness18: "",
    },
    {
      Train_set: "TS#19",
      from19: formatDate(new Date().toDateString()),
      upto19: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness19: "",
    },
    {
      Train_set: "TS#20",
      from20: formatDate(new Date().toDateString()),
      upto20: formatDate(new Date().toDateString()),
      no_cars: "4",
      fitness20: "",
    },
  ];

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              ATC Examination
            </Link>
            <Link underline="hover" color="inherit">
              Register
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
                <p> "It is certified that following train sets are checked for ATC On-board system fitness. These trains are fit for revenue services."</p>
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
                      Remarks
                    </label>
                    <input
                      type="text"
                      className="form-control"
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
                    required
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

export default AtcExaminationReg;
