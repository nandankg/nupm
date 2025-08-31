import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/satya/LatsReducer";
import { Breadcrumbs } from "@mui/material";
import { formatDate } from "../../data/formatDate";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import stationData from "../../station.json";

const EditLats = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const lats = useSelector((state) => state.vdu);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(lats.data.data);
  const [items, setItems] = useState([]);
  const itmm = lats.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(lats.data.data);
  }, []);
  useEffect(() => {
    if (lats) {
      setSlug(lats.slug);
    }
  }, [lats]);
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
    station: fd.station,
    name: fd.name_of_sc,
    empid: fd.Employ_id,
    from: fd.time_from,
    to: fd.time_to,
    result: fd.result,
    remarks: fd.remarks,
    tcid: fd.TCEmploy_id,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  const { toPDF, targetRef } = usePDF({
    filename: "Lats/Vdu form.pdf",
  });
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              LATS/VDU
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
                <h3 className="form-heading">EDIT: LATS/VDU</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputstation" className="form-label">
                    Station
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
                  <label for="inputname" className="form-label">
                    Name of SC
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
              </div>
              <div className="row mb-3">
                <h4>TIME CONTROL TRANSFER</h4>
                <div className="col-md-6">
                  <label for="inputfrom" className="form-label">
                    From
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputtime"
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
                <div className="col-md-12">
                  <label for="inputresult" className="form-label">
                    LATS/VDU Function/Result
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputresult"
                    value={formValues.result}
                    onChange={(e) =>
                      setFormValues({ ...formValues, result: e.target.value })
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

export default EditLats;
