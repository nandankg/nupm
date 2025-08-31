import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
} from "../../reducer/satya/SwUpdateRegisterReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";

const EditSwUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const swupdate = useSelector((state) => state.swregister);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(swupdate.data.data);
  const [items, setItems] = useState([]);
  const itmm = swupdate.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(swupdate.data.data);
  }, []);
  useEffect(() => {
    if (swupdate) {
      setSlug(swupdate.slug);
    }
  }, [swupdate]);
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
    version: fd.version,
    date: fd.date,
    startdate: fd.startdate,
    enddate: fd.enddate,
    refno: fd.refno,
    safno: fd.safno,
    remarks: fd.remarks,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: "Lift Rescue form.pdf",
  });

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Software Update
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
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">Edit: Software Update Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputversion" className="form-label">
                    Software Version
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputversion"
                    value={formValues.version}
                    onChange={(e) =>
                      setFormValues({ ...formValues, version: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputdate" className="form-label">
                    SW Release Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputdate"
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputstartdate" className="form-label">
                    Deployment Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputstatedate"
                    value={formValues.startdate}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        startdate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label for="inputenddate" className="form-label">
                    Deployment End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputenddate"
                    value={formValues.enddate}
                    onChange={(e) =>
                      setFormValues({ ...formValues, enddate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputrefno" className="form-label">
                    Release Note File Ref. No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputrefno"
                    value={formValues.refno}
                    onChange={(e) =>
                      setFormValues({ ...formValues, refno: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputsafno" className="form-label">
                    PTW/SAF No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputsafno"
                    value={formValues.safno}
                    onChange={(e) =>
                      setFormValues({ ...formValues, safno: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputremark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremark"
                    value={formValues.remarks}
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
                    }
                  />
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

export default EditSwUpdate;
