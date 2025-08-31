import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { addData, addHonorarium } from "../../reducer/manshi/HonorariumReducer";
import { formatDate } from "../../data/formatDate";

const Honorarium = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Honod = useSelector((state) => state.Hono);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (Honod) {
      setSlug(Honod.slug);
    }
  }, [Honod]);
  const [formValues, setFormValues] = useState({
    date: formatDate(new Date().toDateString()),
    executive: "",
    nonexecutive: "",
    gc: "",
    out: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addData(formValues));
    navigate(`/list/${slug}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <div className="container ">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              HONORARIUM
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
                <h3 className="form-heading">Honorarium Register</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputexecutive" className="form-label">
                    Executive
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputexecutive"
                    name="executive"
                    value={formValues.executive}
                    onChange={handleChange}
                    aria-label="executive"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="outsourcefaculty" className="form-label">
                    Non Executive
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nonexecutive"
                    name="nonexecutive"
                    value={formValues.nonexecutive}
                    onChange={handleChange}
                    aria-label="nonexecutive"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputgc" className="form-label">
                    GC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputgc"
                    name="gc"
                    value={formValues.gc}
                    onChange={handleChange}
                    aria-label="gc"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="out" className="form-label">
                    OutSourced Faculty
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="out"
                    name="out"
                    value={formValues.out}
                    onChange={handleChange}
                    aria-label="out"
                  />
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn-primary px-3">
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

export default Honorarium;
