import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { addData } from "../../reducer/rajiv/SDCEntryExitReducer";

const SDCEntryExitReg = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const sdcEntryExitList = useSelector((state) => state.sdcEntryExit);

  const [slug, setSlug] = useState("");
  useEffect(() => {
    if (sdcEntryExitList) {
      setSlug(sdcEntryExitList.slug);
    }
  }, [sdcEntryExitList]);
  const basicInitialValues = {
    name: "",
    company_name: "",
    job_profile: "",
    in_time: "",
    out_time: "",
    work: "",
    mobile_no: "",
    sign: "sign",
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
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
              SDC Entry Exit
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
                {/* <h3 className="form-heading"> SDC Entry Exit Register</h3>
                <div className="heading-line"></div> */}
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputcmpname" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    required
                    id="inputcmpname"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        company_name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <label for="inputjobprofile" className="form-label">
                    Works As Job Profile
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputjobprofile"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        job_profile: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-4">
                  <label for="inputTimein" className="form-label">
                    In Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputTimein"
                    onChange={(e) =>
                      setFormValues({ ...formValues, in_time: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label for="inputTimeout" className="form-label">
                    Out Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputTimeout"
                    onChange={(e) =>
                      setFormValues({ ...formValues, out_time: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputWork" className="form-label">
                    Work
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputWork"
                    onChange={(e) =>
                      setFormValues({ ...formValues, work: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputNo" className="form-label">
                    Mobile No.
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    className="form-control"
                    id="inputNo"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        mobile_no: e.target.value,
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

export default SDCEntryExitReg;
