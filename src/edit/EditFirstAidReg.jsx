import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import { formatDate } from "../data/formatDate";
import { editData, fetchData } from "../reducer/FirstAidRegisterReducer";
import { formatTime } from "../data/formatDate";

const FirstAidRegisterEdit = () => {
    const navigate = useNavigate();
    const [sno, setSno] = useState(1);
    const location = useLocation();
    const [date, setDate] = useState(new Date());
    const { id } = location.state;
    console.log(id);
    const dispatch = useDispatch();
    const loanreg = useSelector((state) => state.firstaidstore || []);
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
        console.log(slug);
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
        date: formatDate(new Date().toString()),
        time: formatTime(new Date().toString()),
        name1: fd.providedToName,
        designation1: fd.providedToDesignation,
        name2: fd.providedByName,
        designation2: fd.providedByDesignation,
        itemsConsumed: fd.itemsConsumed,
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
                                <h3 className="form-heading">Edit First Aid Register</h3>
                                <div className="heading-line"></div>
                            </div>
                            <div className="row mb-3">

                                <div className="col-md-6">
                                    <label htmlFor="inputStation" className="form-label">
                                        First Aid Provided To
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputname1"
                                        value={formValues.name1}
                                        placeholder="name e.g. ram"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, name1: e.target.value })
                                        }
                                    />

                                    <br /><br />
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputdestination1"
                                        value={formValues.designation1}
                                        placeholder="Enter Designation"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, designation1: e.target.value })
                                        }
                                    />


                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="firstaidby" className="form-label">
                                        First Aid Provided By
                                    </label>
                                    <input
                                        type="Text"
                                        className="form-control"
                                        id="firstaidby"
                                        value={formValues.name2}
                                        placeholder="name"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, name2: e.target.value })
                                        }
                                    />
                                    <br /><br />
                                    <input
                                        type="Text"
                                        className="form-control"
                                        id="inputdestination2"
                                        value={formValues.designation2}
                                        placeholder="Enter Designation"
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, designation2: e.target.value })
                                        }
                                    />
                                    <br />
                                </div>
                            </div>
                            <div className="row mb-3">
                            <div className="col-md-4">
                                <label htmlFor="department" className="form-label">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="department"
                                    value={formValues.department}
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            department: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="emp_id" className="form-label">
                                    Employ Id
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="emp_id"
                                    value={formValues.Employ_id}
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            Employ_id: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="date" className="form-label">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    value={formValues.date}
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            date: e.target.value
                                        })
                                    }
                                />
                            </div>
                            </div>
                            <div className="row md-3">
                                <p className="text-center">You save a life, Great Work!</p>

                                <div className="row mb-3">

                                    <div className="col-md-12">
                                        <label htmlFor="inputCity" className="form-label">
                                            Items & Quantity consumed
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputCity"
                                            value={formValues.itemsConsumed}
                                            onChange={(e) =>
                                                setFormValues({ ...formValues, itemsConsumed: e.target.value })
                                            }
                                        />
                                    </div>

                                </div>


                                <div className="col-12 text-center pt-3">
                                    <button type="submit" className="btn btn-primary">
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

export default FirstAidRegisterEdit;
