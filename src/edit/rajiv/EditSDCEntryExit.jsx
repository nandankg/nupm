import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchData,
  editData,
  saveData,
} from "../../reducer/rajiv/SDCEntryExitReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
const user = JSON.parse(localStorage.getItem("userdata"));
const EditSDCEntryExit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const sdcEntryExitList = useSelector((state) => state.sdcEntryExit);

  const [items, setItems] = useState([]);
  const itmm = sdcEntryExitList.data.data;

  useEffect(() => {
    dispatch(fetchData());
    setItems(sdcEntryExitList.data.data);
  }, []);
  const [slug, setSlug] = useState("");
  useEffect(() => {
    setItems(sdcEntryExitList.data.data);
    setSlug(sdcEntryExitList.slug);
  }, [sdcEntryExitList]);
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
  }
  const fd = filteredData[0];
  const basicInitialValues = {
    id: fd.id,
    name: fd.name,
    company_name: fd.company_name,
    job_profile: fd.job_profile,
    in_time: fd.in_time,
    out_time: fd.out_time,
    work: fd.work,
    mobile_no: fd.mobile_no,
    sign: fd.sign,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  const { toPDF, targetRef } = usePDF({
    filename: "SDC Entry Exit.pdf",
  });
  const handleSave = () => {
    dispatch(saveData(id));
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/">
              SDC Entry Exit
            </Link>
            <Link underline="hover" color="inherit" to="/">
              Edit
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
                    id="inputName"
                    value={formValues.name}
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
                    id="inputcmpname"
                    value={formValues.company_name}
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
                    value={formValues.job_profile}
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
                    value={formValues.in_time}
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
                    value={formValues.out_time}
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
                    value={formValues.work}
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
                    value={formValues.mobile_no}
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
               
                    <button type="submit" className="btn btn-primary">
                      SAVE
                    </button>
                    
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSDCEntryExit;
