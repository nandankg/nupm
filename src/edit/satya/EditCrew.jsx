import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../reducer/redux/tableDataSlice";
import {
 
  editData,
  
} from "../../reducer/satya/CrewControlCcapReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const EditCrew = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const [slug, setSlug] =  useState(getLastParameter().trim());
  const crewcontrol = useSelector((state) => state.data);
  
  console.log(slug);
  console.log(crewcontrol);
  const [items, setItems] = useState([]);
  const itmm = crewcontrol.data.data;
  console.log(items);
  useEffect(() => {
     dispatch(fetchData({ formType: slug }));
   }, [dispatch]);
 
  let filteredData;
  console.log(itmm);
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
    date: fd.date,
    department: fd.deptt,
    purposeofreq: fd.purposeofreq,
    time: fd.time,
    toprovided: fd.toprovided,
    reason: fd.reason,
    nameofcc: fd.nameofcc,
    signofcc: fd.signofcc,
    remark: fd.remark,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));

    navigate(`/list/${slug}`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: "Unplanned TO Register form.pdf",
  });

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              CREW CONTROL CCAP
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
              <div ref={targetRef}>
                <div className=" mb-3 form-heading-container">
                  <h3 className="form-heading">
                    EDIT: UNPLANNED TRAIN OPERATOR DEMAND RECORD
                  </h3>
                  <div className="heading-line"></div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="inputDepartment" className="form-label">
                      Department
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputDepartment"
                      value={formValues.department}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          department: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputpurpose" className="form-label">
                      Purpose of Request
                    </label>
                    <input
                      type="Text"
                      className="form-control"
                      id="inputpurpose"
                      value={formValues.purposeofreq}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          purposeofreq: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="inputtoprovided" className="form-label">
                      Whether TO was provided or not
                    </label>
                    <div>
                      <input
                        className="form-check-input ms-2"
                        type="radio"
                        name="radioNoLabel"
                        id="radioNoLabel1"
                        value="Yes"
                        aria-label="..."
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            toprovided: e.target.value,
                          })
                        }
                      />
                      Yes
                      <input
                        className="form-check-input ms-2"
                        type="radio"
                        name="radioNoLabel"
                        id="radioNoLabel1"
                        value="No"
                        aria-label="..."
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            toprovided: e.target.value,
                          })
                        }
                      />
                      No
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label for="inputreason" className="form-label">
                      Reason, if TO not provided
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputreason"
                      value={formValues.reason}
                      onChange={(e) =>
                        setFormValues({ ...formValues, reason: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="inputnameofcc" className="form-label">
                      Name of CC
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputnameofcc"
                      value={formValues.nameofcc}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          nameofcc: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputremark" className="form-label">
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
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary mt-3" style={{width:"100px", height: "50px", textAlign: "center"}}>
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

export default EditCrew;
