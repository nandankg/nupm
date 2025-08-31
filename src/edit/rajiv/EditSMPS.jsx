import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/rajiv/SMPSReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { MdPictureAsPdf } from "react-icons/md";
import { usePDF } from "react-to-pdf";
const EditSMPS = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const dispatch = useDispatch();
  const list = useSelector((state) => state.SMPS);
  const smps = [
    {
      category: "Details of Maintenance Activity",
      label: "All Indications (Availabilty)",
    },
    {
      category: "Redundancy check",
      label: "Input-1 Switched OFF  & Input-2 Switch ON",
    },
    {
      category: "Redundancy check",
      label: "Output Voltage",
    },
    {
      category: "Redundancy check",
      label: "Input-1 Switched ON & Input-2 Switch OFF",
    },
    {
      category: "Redundancy check",
      label: "Output Voltage",
    },
  ];
  const [items, setItems] = useState([]);
  const [slug, setSlug] = useState("");
  const itmm = list.data.data;

  useEffect(() => {
    dispatch(fetchData());
    setItems(list.data.data);
  }, []);
  useEffect(() => {
    setItems(list.data.data);
    setSlug(list.slug);
  }, [list]);
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
  }
  const fd = filteredData[0];
  const basicInitialValues = {
    id: fd.id,
    smps: fd.smps,
    station: fd.station,
    date: fd.date,
    activity: fd.activity,
    remarks: fd.remarks,
    signature: fd.signature,
    name: fd.name,
    designation: fd.designation,
    empno: fd.emp,
    csign: fd.csign,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: "SMPS.pdf",
  });

  const ranges = ["Jan-Jun", "Jul-Dec"];
  const [Range, setRange] = useState("Jan-Jun");

  const quarterlyRangeHandler = (event) => {
    const value = event.target.value;

    // Update the `range` value for all activities
    setFormValues((prevValues) => ({
      ...prevValues,
      activity: prevValues.activity.map((activity) => ({
        ...activity,
        range: value, // Update the range for each activity
      })),
    }));
  };

  const handleChange = (index, field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      activity: prevValues.activity.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleRemarkChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };
  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/">
              SMPS SIX MONTHLY MAINTENANCE RECORD
            </Link>
            <Link underline="hover" color="inherit" to="/">
              Edit
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div
            className="form-container"
            style={{ marginLeft: "0", marginRight: "0", maxWidth: "100%" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="">
                  <select
                    name="quarterlyRange"
                    onChange={quarterlyRangeHandler}
                    style={{ width: "200px" }}
                    value={formValues?.activity[0]?.range || ""} // Use the updated `formValues` state
                  >
                    {ranges.map((range, index) => (
                      <option key={index} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>

                  <input
                    type="date"
                    name="date"
                    value={formValues.date}
                    className=" mx-3"
                    onChange={(e) =>
                      setFormValues({ ...formValues, date: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    name="smps"
                    className=" mx-3"
                    value={formValues.smps}
                    onChange={(e) =>
                      setFormValues({ ...formValues, smps: e.target.value })
                    }
                    placeholder="Enter SMPS No."
                  />
                </div>
              </div>
              {smps.map((activity, index) =>
                index == 1 ? (
                  <>
                    <div className="row mb-3">
                      <labe className="form-label">Redundancy check</labe>
                    </div>
                    <div key={index} className="mb-3">
                      <label
                        className="form-label mb-0 d-flex justify-content-between align-items-center"
                        style={{ textAlign: "left" }}
                      >
                        {activity.label}
                        <div className="d-flex gap-3">
                          <input
                            type="text"
                            name={`value-${index}`}
                            onChange={(e) =>
                              handleChange(index, "value", e.target.value)
                            }
                            value={formValues.activity[index].value}
                          />
                        </div>
                      </label>
                    </div>
                  </>
                ) : (
                  <div key={index} className="mb-3">
                    <label
                      className="form-label mb-0 d-flex justify-content-between align-items-center"
                      style={{ textAlign: "left" }}
                    >
                      {activity.label}
                      <div className="d-flex gap-3">
                        <input
                          type="text"
                          name={`value-${index}`}
                          onChange={(e) =>
                            handleChange(index, "value", e.target.value)
                          }
                          value={formValues.activity[index].value}
                        />
                      </div>
                    </label>
                  </div>
                )
              )}
              <div className="row my-3">
                <div className="col-md-12">
                  <label>Remarks:</label>
                  <input
                    type="text"
                    name="remarks"
                    className="form-control"
                    value={formValues.remarks}
                    onChange={(e) =>
                      handleRemarkChange("remarks", e.target.value)
                    }
                  />
                </div>
              </div>
              {/* <div className="row my-3">
                <div className="col-md-3">
                  <label className="form-label">Signature:</label>
                  <input
                    type="text"
                    name="signature"
                    className="form-control"
                    value={formValues.signature}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        signature: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formValues.name}
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Designation:</label>
                  <input
                    type="text"
                    name="designation"
                    className="form-control"
                    value={formValues.designation}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        designation: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Counter Sign:</label>
                  <input
                    type="text"
                    name="csign"
                    className="form-control"
                    value={formValues.csign}
                    onChange={(e) =>
                      setFormValues({ ...formValues, csign: e.target.value })
                    }
                  />
                </div>
              </div> */}
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSMPS;
