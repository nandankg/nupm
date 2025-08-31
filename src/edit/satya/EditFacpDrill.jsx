import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/satya/FacpDrillReducer";
import { Breadcrumbs } from "@mui/material";
import { formatDate } from "../../data/formatDate";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import stationData from "../../station.json";

const EditFacpDrill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const FacpdrillList = useSelector((state) => state.facp);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(FacpdrillList.data.data);
  const [items, setItems] = useState([]);
  const itmm = FacpdrillList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(FacpdrillList.data.data);
  }, []);
  useEffect(() => {
    if (FacpdrillList) {
      setSlug(FacpdrillList.slug);
    }
  }, [FacpdrillList]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }
  const fd = filteredData?.[0] || {};
  const basicInitialValues = {
    id: fd.id,
    date: fd.id,
    station: fd.station,
    mcpno: fd.mcp_no,
    location: fd.operated_location,
    alarm: fd.operated_alarm,
    from: fd.from_time,
    to: fd.to_time,
    name: fd.name_of_sc,
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
    filename: "Facp Drill from.pdf",
  });

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              FACP DRILL
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
                <h3 className="form-heading">EDIT: FACP DRILL</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputstation" className="form-label">
                    Station:
                  </label>
                  <select
                    className="form-control"
                    id="inputstation"
                    value={formValues.station}
                    onChange={(e) =>
                      setFormValues({ ...formValues, station: e.target.value })
                    }
                  >
                  <option value="">Select Station</option>
                  {stationData
                    .filter((station) => station["Station Name"]) // Exclude entries with null station names
                    .map((station) => (
                      <option
                        key={station["STATION Code"]}
                        value={station["Station Name"]}
                      >
                        {station["Station Name"]}
                      </option>
                    ))}

                  </select>
                </div>
                <div className="col-md-6">
                  <label for="inputmcpno" className="form-label">
                    MCP No.:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputmcpno"
                    value={formValues.mcpno}
                    onChange={(e) =>
                      setFormValues({ ...formValues, mcpno: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <h4>Operated:</h4>
                <div className="col-md-6">
                  <label for="inputlocation" className="form-label">
                    Location/Zone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputlocation"
                    aria-describedby="locationHint"
                    value={formValues.location}
                    onChange={(e) =>
                      setFormValues({ ...formValues, location: e.target.value })
                    }
                  />
                </div>
                <div className="col-4">
                  <label for="radioNoLabel1" className="form-label">
                    Alarm:
                  </label>
                  <div>
                    <input
                      type="radio"
                      className="form-check-input ms-2"
                      id="radioNoLabel1"
                      value="Yes"
                      aria-label="..."
                      onChange={(e) =>
                        setFormValues({ ...formValues, alarm: e.target.value })
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
                          alarm: e.target.value,
                        })
                      }
                    />
                    No
                  </div>
                </div>
                <div className="row mb-3">
                  <h4>Time:</h4>
                  <div className="col-md-6">
                    <label for="inputfrom" className="form-label">
                      From
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="inputfromt"
                      value={formValues.from}
                      onChange={(e) =>
                        setFormValues({ ...formValues, from: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputto" className="form-label">
                      To
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="inputto"
                      value={formValues.to}
                      onChange={(e) =>
                        setFormValues({ ...formValues, to: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputname" className="form-label">
                    Name:
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
                <div className="col-md-6">
                  <label for="inputremarks" className="form-label">
                    Remarks:
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

export default EditFacpDrill;
