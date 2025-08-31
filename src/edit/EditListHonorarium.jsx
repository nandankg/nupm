import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { formatDate } from "../data/formatDate";
import { editData, fetchData } from "../reducer/ListHonorariumReducer";

const ListHonorariumEdit = () => {
    const navigate = useNavigate();
    const [sno, setSno] = useState(1);
    const location = useLocation();
    const { id } = location.state;
    console.log(id);

    const dispatch = useDispatch();
    const listhonorium = useSelector((state) => state.listhonoriumstore || []);
    console.log(listhonorium.data.data);
    const [items, setItems] = useState([]);
    const itmm = listhonorium.data.data;
    console.log(items);

    useEffect(() => {
        dispatch(fetchData());
        setItems(listhonorium.data.data);
    }, []);

    const [slug, setSlug] = useState("");
    console.log(slug);
    useEffect(() => {
      if (listhonorium) {
        setSlug(listhonorium.slug);
      }
    }, [listhonorium]);

    useEffect(() => {
        setItems(listhonorium.data.data);
    }, [listhonorium])
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
        sno: 1,
        id: fd.id,
        date: formatDate(new Date().toString()),
        executive: fd.executive,
        non_executive: fd.nonexecutive,
        outsrcfac: fd.out,
        gc: fd.gc,
        Employ_id: fd.Employ_id,
        department: fd.department,
    }
    const [formValues, setFormValues] = useState(basicInitialValues);
    console.log(formValues);
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(editData(formValues));
        navigate(`/list/${slug}`);
    };
    return (
        <>
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-md-8 form-container">
                        <form onSubmit={handleSubmit}>
                            <div className=" mb-3 form-heading-container">
                                <h3 className="form-heading">Edit List of Honorarium Register</h3>
                                <div className="heading-line"></div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="executive" className="form-label">
                                        Executive
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="executive"
                                        value={formValues.executive}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, executive: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="nonexecutive" className="form-label">
                                        Non-Executive
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nonexecutive"
                                        value={formValues.non_executive}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, non_executive: e.target.value })
                                        }
                                    />
                                </div>
                                <br />
                                <div className="col-md-4">
                                    <label htmlFor="outsrcfac" className="form-label">
                                        Outsourced Faculty
                                    </label>
                                    <input
                                        type="Text"
                                        className="form-control"
                                        id="outsrcfac"
                                        value={formValues.outsrcfac}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, outsrcfac: e.target.value })
                                        }
                                    />
                                    <br />
                                </div>
                            </div>
                            <hr style={{ borderBlockStyle: 'double', borderBlockColor: '#f7b3a1', borderWidth: '5px' }} />
                            <div className="row mb-3  d-flex justify-content-around">
                                <div className="col-md-4">
                                    <label htmlFor="gc" className="form-label">
                                        GC
                                    </label>
                                    <input

                                        type="text"
                                        className="form-control"
                                        id="gc"
                                        value={formValues.gc}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, gc: e.target.value })
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
            </div >
        </>
    );
};

export default ListHonorariumEdit;