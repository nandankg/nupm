import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import {
  editData,
  fetchData,
  saveData,
} from "../../reducer/satya/SEREntryPageReducer";

const EditSERPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const SERentry = useSelector((state) => state.SERpage);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(SERentry.data.data);
  const [items, setItems] = useState([]);
  console.log(items);
  const itmm = SERentry.data.data;
  useEffect(() => {
    dispatch(fetchData());
    setItems(SERentry.data.data);
  }, []);
  useEffect(() => {
    if (SERentry) {
      setSlug(SERentry.slug);
    }
  }, [SERentry]);
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
    name: fd.Name,
    empid: fd.EmpID,
    desig: fd.DesignationDepartment,
    entrytime: fd.EntryTime,
    purpose: fd.PurposeOfVisit,
    exittime: fd.ExitTime,
    visitorsign: fd.VisitorsSign,
    signonduty: fd.SignOnDuty,
    remarks: fd.Remark,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  const { toPDF, targetRef } = usePDF({
    filename: "SER Entry Page.pdf",
  });
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              SER Room Entry
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
                <h3 className="form-heading">EDIT: SER Room Entry Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label for="inputname" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputname"
                    value={formValues.name}
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputempid" className="form-label">
                    Employee Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputempid"
                    value={formValues.empid}
                    onChange={(e) =>
                      setFormValues({ ...formValues, empid: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label for="inputdesig" className="form-label">
                    Desig./Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdesig"
                    value={formValues.desig}
                    onChange={(e) =>
                      setFormValues({ ...formValues, desig: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputentrytime" className="form-label">
                    Entry Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputentrytime"
                    value={formValues.entrytime}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        entrytime: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label for="inputexittime" className="form-label">
                    Exit Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputexittime"
                    value={formValues.exittime}
                    onChange={(e) =>
                      setFormValues({ ...formValues, exittime: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label for="inputpurpose" className="form-label">
                    Purpose Of Visit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputpurpose"
                    value={formValues.purpose}
                    onChange={(e) =>
                      setFormValues({ ...formValues, purpose: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputvisitorsign" className="form-label">
                    Visitor Sign.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputvisitorsign"
                    value={formValues.visitorsign}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        visitorsign: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <label for="inputremarks" className="form-label">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputremarks"
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

export default EditSERPage;
