import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import { addData, addlisthonoriumrud } from "../reducer/ListHonorariumReducer";
import Header from "../component/Header";
import { formatDate } from "../data/formatDate";

const ListHonorariumReg = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [executive, setExecutive] = useState(" ");
    const [non_executive, setNonExecutive] = useState(" ");
    const [outsrcfac, setOutSrcFac] = useState(" ");
    const [gc, setGC] = useState("");

    const listhonorium = useSelector((state) => state.listhonoriumstore);
    const [slug, setSlug] = useState("");
    console.log(slug);
    useEffect(() => {
      if (listhonorium) {
        setSlug(listhonorium.slug);
      }
    }, [listhonorium]);

    const basicInitialValues = {
        date: formatDate(new Date().toString()),
        executive: "",
        non_executive: "",
        outsrcfac: "",
        gc: "",
        Employ_id: "",
        department: "",
    };
    const [formValues, setFormValues] = useState(basicInitialValues);
    console.log(formValues);
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addData(formValues));
        navigate(`/list/${slug}`);
    };
    return (
        <>
            <div className="container">
                <div role="presentation " className="bredcrumbs">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit">
                            List Honorarium
                        </Link>
                        <Link underline="hover" color="inherit">
                            Register
                        </Link>
                    </Breadcrumbs>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 form-container">
                        <form onSubmit={handleSubmit}>
                            <div className=" mb-3 form-heading-container">
                                <h3 className="form-heading">List of Honorarium Register</h3>
                                <div className="heading-line"></div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="executive" className="form-label">
                                        Executive
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        id="executive"
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
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, outsrcfac: e.target.value })
                                        }
                                    />
                                     <br/>
                                </div>  
                               </div>
                             <hr style={{ borderBlockStyle: 'double', borderBlockColor: '#f7b3a1', borderWidth: '5px' }}/>
                             <div className="row mb-3  d-flex justify-content-around">
                                <div className="col-md-4">
                                    <label htmlFor="gc" className="form-label">
                                        GC
                                    </label>
                                    <input

                                        type="text"
                                        className="form-control"
                                        id="gc"
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

export default ListHonorariumReg;
