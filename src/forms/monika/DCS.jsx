import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { addData } from "../../reducer/monika/DCSReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MaintenanceYearlyActivities = [
  {
    label:
      "Visual inspection of Radio Modem, Lightening Arrestor, RF feeder cables, Jumper cables , Antenna and support brackets",
  },
  {
    label: "Visual inspection of spare ODC cable (Sig) & LC Duplex cable(MM)",
  },
  {
    label: "Check the earthing of all equipments",
  },
  {
    label: "Checking for Antenna Alignment",
  },
  {
    label: "Cleaning of TRE Boxes and Antenna (Sig & Multimedia)",
  },
  {
    label:
      "Tightening of RF feeder cable connectors, RF Jumper cable connectors and Lightening Arrestors (if required) - Splitter connected cable 5nm, Antenna connected cable 2nm",
  },
  {
    label: "Checking for condition & tightening of all the fittings and bolts",
  },
  {
    label: "Checking of all the LED indication of modem (Sig & Multimedia)",
  },
  {
    label:
      "DCS  Splicing & Power Box Frame is properly fastened and secured with parapet through Nuts [4]",
  },
  {
    label:
      "DCS  ODRAP Box (SIG & MM) Frame  is properly fastened and secured with parapet through nuts(Priority Section) [4]",
  },
  {
    label:
      "DCS  ODRAP Box (SIG) Frame  is properly fastened and secured with parapet through nuts (Balance Section)[4]",
  },
  {
    label:
      "DCS  ODRAP Box (MM) Frame  is properly fastened and secured with parapet through nuts (Balance Section) [4]",
  },
  {
    label:
      "DCS Splicing & Power box is properly secured with Splicing & Power box frame through nut & bolts. [4]",
  },
  {
    label:
      "DCS  ODRAP box (SIG & MM) is properly secured with ODRAP box frame through nut & bolts. (Priority Section) [4]",
  },
  {
    label:
      "DCS  ODRAP box (SIG) is properly secured with ODRAP box (SIG) frame through nut & bolts. (Balance Section) [4]",
  },
  {
    label:
      "DCS  ODRAP box (MM) is properly secured with ODRAP box(MM) frame through nut & bolts. (Balance Section) [4]",
  },
  {
    label:
      "DCS Support Bracket-SIG is properly secured with OHE mast through nut & bolts.[8]",
  },
  {
    label:
      "DCS Support Bracket-MM is properly secured with OHE mast through nut & bolts.[8]",
  },
  {
    label:
      "DCS Antenna fixer-SIG is properly secured with Support bracket-SIG through nut & bolts.[2]",
  },
  {
    label:
      "DCS Antenna fixer-MM is properly secured with Support bracket-MM through nut & bolts.[2]",
  },
  {
    label:
      "DCS SIG Antennas with antenna bracket are properly secured with Antena fixer through nut & bolts.[28]",
  },
  {
    label:
      "DCS MM Antennas with antenna bracket are properly secured with Antena fixer through nut & bolts.[32]",
  },
  {
    label: "Secure DCS-SIG Antenna Cover with plastic cable tie",
  },
  {
    label: "Secure DCS-MM Antenna Cover with plastic cable tie",
  },
  {
    label: "Check any other nut bolt tightness (if any)",
  },
];

function DCS() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const DCSList = useSelector((state) => state.DCS);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (DCSList) {
      setSlug(DCSList.slug);
    }
  }, [DCSList]);
  const [formValues, setFormValues] = useState({
    activities: MaintenanceYearlyActivities.map(() => ({
      value: "",
    })),
    dcpRapNo: "",
    date: "",
    remarks: "",
    sign: "",
    name: "",
    designation: "",
    empno: "",
    csign: "",
  });

  const handleChange = (index, field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      activities: prevValues.activities.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit formValues with your API
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  const inputStyle = {
    width: "100%",
    maxWidth: "300px",
  };
  console.log(formValues);
  return (
    <div className="container">
      <div role="presentation" className="bredcrumbs">
        <Breadcrumbs aria-label="bredcrumb">
          <Link underline="hover" color="inherit" to="#">
            DCS TRE YEARLY MAINTENANCE RECORD
          </Link>
          <Link underline="hover" color="inherit" to="#">
            Register
          </Link>
        </Breadcrumbs>
      </div>
      <div className="row justify-content-center">
        <div className="form-container" style={{ maxWidth: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  style={inputStyle}
                  name="date"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="dcpRapNo" className="form-label">
                  DCS RAP NO.
                </label>
                <input
                  type="number"
                  className="form-control"
                  style={inputStyle}
                  name="dcpRapNo"
                  min="1"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      dcpRapNo: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            {MaintenanceYearlyActivities.map((activity, index) => (
              <div key={index} className="mb-3">
                <div className="row">
                  <label className="form-label mb-1 col-md-10 text-start">
                    {activity.label}
                  </label>
                  <div className="col-md-2">
                    {/* <input
                      type="text"
                      className="form-control"
                      style={inputStyle}
                      name={`activity${index + 1}Date`}
                      onChange={(e) =>
                        handleChange(index, "value", e.target.value)
                      }
                      value={formValues.activities[index].value}
                    /> */}
                    <select
                      name={`activity${index + 1}Date`}
                      onChange={(e) =>
                        handleChange(index, "value", e.target.value)
                      }
                      value={formValues.activities[index].value}
                    >
                      <option value="">Select</option>
                      <option value="Checked OK">Checked OK</option>
                      <option value="Checked Not OK">Checked Not OK</option>
                      <option value="NA">NA</option>
                      <option value="NA">Done</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="remark" className="form-label">
                  Remark
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={inputStyle}
                  name="remark"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      remarks: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DCS;
