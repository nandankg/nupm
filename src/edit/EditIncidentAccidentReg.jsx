import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { formatDate } from "../data/formatDate";
import { editData, fetchData } from "../reducer/IncidentAccidentRegReducer";
import { formatTime } from "../data/formatDate";

const IncidentAccidentRegisterEdit = () => {
    const navigate = useNavigate();
    const [sno, setSno] = useState(1);
    const location = useLocation();
    const [date, setdate] = useState(new Date());
    const { id } = location.state;
    console.log(id);
    const dispatch = useDispatch();
    const loanreg = useSelector((state) => state.inacregstore || []);
    console.log(loanreg.data.data);
    const [items, setItems] = useState([]);
    const itmm = loanreg.data.data;
    console.log(items);

    useEffect(() => {
        dispatch(fetchData());
        setItems(loanreg.data.data);
    }, []);

    const [slug, setSlug] = useState("");
    console.log(slug);
    useEffect(() => {
      if (loanreg) {
        setSlug(loanreg.slug);
      }
    }, [loanreg]);

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
        console.log(filteredData[0]);
    }
    const fd = filteredData[0];
    const basicInitialValues = {
        //from form
        sno: 1,
        id: fd.id,
        //below is the issuer date
        date: formatDate(new Date().toDateString()),
        location: fd.location,
        repotime: formatTime(new Date().toDateString()),
        train: fd.train,
        trainset: fd.trainset,
        opname: fd.opname,
        emp_id: fd.emp_id,
        rectime: fd.rectime,
        detension: fd.detension,
        sigofcc: fd.sigofcc,
        detailincident: fd.detailincident,
        remark: fd.remark,
        Employ_id: fd.Employ_id,
        department: fd.department,
    }
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
              
                <div className="row justify-content-center">
                    <div className="col-md-8 form-container">
                        <form onSubmit={handleSubmit}>
                            <div className=" mb-3 form-heading-container">
                                <h3 className="form-heading">Edit Incident/Accident Register</h3>
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
                                </div><div className="col-md-4">
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
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputgateno"
                                        value={formValues.location}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, location: e.target.value })
                                        }
                                    />
                                    <br />
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
                                            setFormValues({ ...formValues, detension: e.target.value })
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
                                            setFormValues({ ...formValues, detailincident: e.target.value })
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

export default IncidentAccidentRegisterEdit;