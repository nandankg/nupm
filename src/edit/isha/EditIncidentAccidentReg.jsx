import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { formatDate } from "../../data/formatDate";
import {
  editData,
  fetchData,
} from "../../reducer/isha/IncidentAccidentRegReducer";

const IncidentAccidentRegisterOperationEdit = () => {
  const navigate = useNavigate();
  const [sno, setSno] = useState(1);
  const location = useLocation();
  const [date, setdate] = useState(new Date());
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const loanreg = useSelector((state) => state.Incidentaccident);
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(loanreg.data.data);
  const [items, setItems] = useState([]);
  const itmm = loanreg.data.data;
  console.log(items);

  useEffect(() => {
    if (loanreg) {
      setSlug(loanreg.slug);
    }
    dispatch(fetchData());
    setItems(loanreg.data.data);
  }, []);
  useEffect(() => {
    setItems(loanreg.data.data);
  }, [loanreg]);
  let dt = [];
  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
  }
  const fd = filteredData[0];
  const basicInitialValues = {
    //from form
    sno: 1,
    id: fd.id,
    //below is the issuer date
    date: formatDate(fd.date),
    location: fd.location,
    repotime: fd.repotime,
    train: fd.train,
    trainset: fd.trainset,
    opname: fd.opname,
    emp_id: fd.emp_id,
    rectime: fd.rectime,
    detension: fd.detension,
    sigofcc: fd.sigofcc,
    detailincident: fd.detailincident,
    remark: fd.remark,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    const newSrno = sno + 1;
    setSno(newSrno);
    navigate(`/list/${slug}`);
  };
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Incident/accident
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container" style={{ maxWidth: "95%" }}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading">
                  Edit: Incident/Accident Register
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="inputStation" className="form-label">
                    Name of Train Operator
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputStation"
                    placeholder="Name"
                    value={formValues.opname}
                    onChange={(e) =>
                      setFormValues({ ...formValues, opname: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputgateno" className="form-label">
                    Emp ID of TO
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputgateno"
                    placeholder="Id"
                    value={formValues.emp_id}
                    onChange={(e) =>
                      setFormValues({ ...formValues, emp_id: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputgateno" className="form-label">
                    Train Set
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="inputgateno"
                    value={formValues.trainset}
                    onChange={(e) =>
                      setFormValues({ ...formValues, trainset: e.target.value })
                    }
                  />
                  <br />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputgateno" className="form-label">
                    Train No.
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputgateno"
                    value={formValues.train}
                    onChange={(e) =>
                      setFormValues({ ...formValues, train: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputgateno" className="form-label">
                    Rectified Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputgateno"
                    value={formValues.rectime}
                    onChange={(e) =>
                      setFormValues({ ...formValues, rectime: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputgateno" className="form-label">
                    Repot Time
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="inputgateno"
                    value={formValues.repotime}
                    onChange={(e) =>
                      setFormValues({ ...formValues, repotime: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-12" style={{ marginTop: "30px" }}>
                  <label for="inputlocation" className="form-lable">
                    Location
                  </label>
                  <select
                    className="citys"
                    id="inputlocation"
                    onChange={(e) =>
                      setFormValues({ ...formValues, location: e.target.value })
                    }
                  >
                    <optgroup label="Blue Line" style={{ color: "blue" }}>
                      <option value="select">Select</option>
                      <option value="ccsairport">CCS Airport</option>
                      <option value="Amausi">Amausi</option>
                      <option value="Transport Nagar">Transport Nagar</option>
                      <option value="Krishna Nagar">Krishna Nagar</option>
                      <option value="Singar Nagar">Singar Nagar</option>
                      <option value="Alambagh">Alambagh</option>
                      <option value="Alambagh ISBT">Alambagh ISBT</option>
                      <option value="Mawaiya">Mawaiya</option>
                      <option value="Durgapuri">Durgapuri</option>
                      <option value="Lucknow Charbagh Railway Stn">
                        Lucknow Charbagh Railway Stn
                      </option>
                    </optgroup>
                    <optgroup label="orange Line" style={{ color: "orange" }}>
                      <option value="Gautam Buddha Marg">
                        Gautam Buddha Marg
                      </option>
                      <option value="Aminabad">Aminabad</option>
                      <option value="Pandeyganj">Pandeyganj</option>
                      <option value="Lucknow CityRly Stn">
                        Lucknow CityRly Stn
                      </option>
                      <option value="Medical CollegeCrossing">
                        Medical CollegeCrossing
                      </option>
                      <option value="Nawajganj">Nawajganj</option>
                      <option value="thakurganj">thakurganj</option>
                      <option value="Balaganj">Balaganj</option>
                      <option value="Sarfarazganj">Sarfarazganj</option>
                      <option value="Musabagh">Musabagh</option>
                      <option value="VasantKunj">VasantKunj</option>
                    </optgroup>
                    <optgroup label="Red Line" style={{ color: "red" }}>
                      <option value="Hussain Ganj">Hussain Ganj</option>
                      <option value="Secretariat">Secretariat</option>
                      <option value="Hazratganj">Hazratganj</option>
                      <option value="KD Singh Stadium">KD Singh Stadium</option>
                      <option value="Lucknow University">
                        Lucknow University
                      </option>
                      <option value="IT College Jn">IT College Jn</option>
                      <option value="BadshahNagar">BadshahNagar</option>
                      <option value="Lekhraj">Lekhraj</option>
                      <option value="Mahanagar">Mahanagar</option>
                      <option value="RS MishraNagar">RS MishraNagar</option>
                      <option value="Indira Nagar">Indira Nagar</option>
                      <option value="Munshipulia">Munshipulia</option>
                    </optgroup>
                    <input
                      type="dropdown"
                      name="citys"
                      id="inputlocation"
                      value=""
                    />
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputgateno" className="form-label">
                    Detention
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="inputgateno"
                    value={formValues.detension}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        detension: e.target.value,
                      })
                    }
                  />
                  <br />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">
                    Detail of Incident
                  </label>
                  <input
                    type="Area"
                    className="form-control"
                    id="inputCity"
                    value={formValues.detailincident}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        detailincident: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-12">
                  <label htmlFor="inputCity" className="form-label">
                    Remark by CC/CDI
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.remark}
                    id="inputCity"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
                    }
                  />
                </div>
                <div className="col-12 text-center pt-3">
                  <button type="submit" className="btn btn-primary px-3">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncidentAccidentRegisterOperationEdit;
