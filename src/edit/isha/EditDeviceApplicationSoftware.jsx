import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
} from "../../reducer/isha/DeviceApplicationSoftwareReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
const EditDeviceApplicationSoftware = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const Softwareupdatelist = useSelector((state) => state.Softwareupdate);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(Softwareupdatelist.data.data);
  const [items, setItems] = useState([]);
  const itmm = Softwareupdatelist.data.data;
  console.log(items);
  useEffect(() => {
    if (Softwareupdatelist) {
      setSlug(Softwareupdatelist.slug);
    }
    dispatch(fetchData());
    setItems(Softwareupdatelist.data.data);
  }, []);
  useEffect(() => {
    setItems(Softwareupdatelist.data.data);
  }, [Softwareupdatelist]);
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
    date: formatDate(new Date().toDateString()),
    version: fd.version,
    release_date: fd.release_date,
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
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Device Application Software
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-md-8 form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  {" "}
                  Edit : Device Application Software
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Software Version
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={formValues.version}
                    onChange={(e) =>
                      setFormValues({ ...formValues, version: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputempid" className="form-label">
                    SW. Release Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputempid"
                    value={formValues.release_date}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        release_date: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="time" style={{ textAlign: "center" }}>
                  <label for="inputhate" className="form-label">
                    Deployment
                  </label>
                </div>
                <div className="col-6" style={{ textAlign: "center" }}>
                  <label for="inputTimein" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputTimein"
                    value={formValues.startdate}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        startdate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6" style={{ textAlign: "center" }}>
                  <label for="inputTimeout" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputTimeout"
                    value={formValues.enddate}
                    onChange={(e) =>
                      setFormValues({ ...formValues, enddate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4" style={{ marginTop: "20px" }}>
                  <label for="inputTopic" className="form-label">
                    Release Note File Ref.No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTopic"
                    value={formValues.refno}
                    onChange={(e) =>
                      setFormValues({ ...formValues, refno: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4" style={{ marginTop: "20px" }}>
                  <label for="inputTopic" className="form-label">
                    PTW /SAF No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputTopic"
                    value={formValues.safno}
                    onChange={(e) =>
                      setFormValues({ ...formValues, safno: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4" style={{ marginTop: "20px" }}>
                  <label for="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    value={formValues.remarks}
                    onChange={(e) =>
                      setFormValues({ ...formValues, remarks: e.target.value })
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

export default EditDeviceApplicationSoftware;
