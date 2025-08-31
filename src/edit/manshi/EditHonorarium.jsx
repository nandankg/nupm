import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";
import { editData, fetchData } from "../../reducer/manshi/HonorariumReducer";

const EditHonorarium = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const Honod = useSelector((state) => state.Hono);
  const [slug, setSlug] = useState("");
  console.log(slug);
  useEffect(() => {
    if (Honod) {
      setSlug(Honod.slug);
    }
  }, [Honod]);
  console.log(Honod.data.data);
  const [items, setItems] = useState([]);
  const itmm = Honod.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(Honod.data.data);
  }, [dispatch]);

  useEffect(() => {
    setItems(Honod.data.data);
  }, [Honod]);

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
    id: fd.id,
    date: fd.date,
    executive: fd.executive,
    nonexecutive: fd.nonexecutive,
    gc: fd.gc,
    out: fd.out,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container ">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to={`/list/${slug}`}>
              Honorarium
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
                <button type="submit" className="btn btn-primary px-3">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHonorarium;
