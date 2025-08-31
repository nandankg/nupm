import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData, saveData } from "../../reducer/rajiv/FACPReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
const user = JSON.parse(localStorage.getItem("userdata"));
const EditFacp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const FACPList = useSelector((state) => state.FACPRegister);

  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState("");
  const itmm = FACPList.data.data;

  useEffect(() => {
    dispatch(fetchData());
    setItems(FACPList.data.data);
  }, []);
  useEffect(() => {
    setItems(FACPList.data.data);
    setSlug(FACPList.slug);
  }, [FACPList]);
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
  }
  const fd = filteredData[0];
  const basicInitialValues = {
    id: fd.id,
    date: fd.date,
    station: fd.station,
    mcp_no: fd.mcp_no,
    operated_location: fd.operated_location,
    operated_alarm: fd.operated_alarm,
    from_time: fd.from_time,
    to_time: fd.to_time,
    remarks: fd.remarks,
    Employ_id: fd.Employ_id,
    name_of_sc: fd.name_of_sc,
    Station_name: fd.Station_name,
    department: fd.department,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };
  const { toPDF, targetRef } = usePDF({
    filename: "FACP form.pdf",
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
              FACP Drill
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
              <div ref={targetRef}>
                <div className="mb-3 form-heading-container">
                  <h3 className="form-heading"> FACP Drill </h3>
                  <div className="heading-line"></div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="inputESC.NO" className="form-label">
                      Name Of SC
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputESC.NO"
                      value={formValues.name_of_sc}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          name_of_sc: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="input Emp.Id." className="form-label">
                      Emp.Id.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="input Emp.Id."
                      value={formValues.Employ_id}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          Employ_id: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputMCP.No" className="form-label">
                      MCP.No
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputMCP.No"
                      value={formValues.mcp_no}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          mcp_no: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="inputOperatedLocation"
                      className="form-label"
                    >
                      Operated (Location/Zone)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputOperatedLocation"
                      value={formValues.operated_location}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          operated_location: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="inputOperatedAlaram" className="form-label">
                      Operated (Alaram Yes/No)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputOperatedAlaram"
                      value={formValues.operated_alarm}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          operated_alarm: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="inputTimeFrom" className="form-label">
                      Time (From)
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="inputinputTimeFrom"
                      value={formValues.from_time}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          from_time: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="inputTimeTo" className="form-label">
                      Time (To)
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="inputinputTimeTo"
                      value={formValues.to_time}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          to_time: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-4">
                    <label htmlFor="inputNameOfTC" className="form-label">
                      Name Of TC
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputNameOfTC"
                      value={formValues.NameofTC}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          NameofTC: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="inputEmpId" className="form-label">
                      Emp.Id Of Tc
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmpId"
                      value={formValues.empidOFTC}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          empidOFTC: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="inputRemarks" className="form-label">
                      Remarks
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputRemarks"
                      value={formValues.remarks}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          remarks: e.target.value,
                        })
                      }
                    />
                  </div>
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

export default EditFacp;
