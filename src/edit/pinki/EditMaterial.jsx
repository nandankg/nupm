import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  editData,
  fetchData,
} from "../../reducer/pinki/MaterialDistributionReducer";
import { formatDate } from "../../data/formatDate";

const EditMaterialTrainees = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const materialdistribution = useSelector(
    (state) => state.materialdistribution
  );
  console.log(materialdistribution.data.data);
  const [items, setItems] = useState([]);
  const itmm = materialdistribution.data.data;
  const [slug, setSlug] = useState("");
  console.log(slug);
  console.log(items);

  useEffect(() => {
    dispatch(fetchData());
    setItems(materialdistribution.data.data);
  }, [dispatch]);

  useEffect(() => {
    if (materialdistribution.data && materialdistribution.data.data) {
      setItems(materialdistribution.data.data);
      setSlug(materialdistribution.slug);
      // setFilteredItems(materialdistribution.data.data);
    }
  }, [materialdistribution]);

  let filteredData;
  if (itmm) {
    filteredData = itmm.filter((itm) => {
      return itm.id === id;
    });
    console.log(filteredData);
    console.log(filteredData[0]);
  }

  const fd = filteredData ? filteredData[0] : {};

  const basicInitialValues = {
    id: fd.id || "",
    sno: "1",
    issue_to: fd.issue_to || "",
    emp_id: fd.emp_id || "",
    designation: fd.designation || "",
    date: formatDate(new Date().toDateString()),
    item_name: fd.item_name || "",
    remark: fd.remark || "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  useEffect(() => {
    setFormValues(basicInitialValues);
  }, [fd]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate(`/list/${slug}`);
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Material Distribution to Trainees
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="mb-3 form-heading-container">
                <h3 className="form-heading">
                  {" "}
                  Material Distribution to Trainees Register
                </h3>
                <div className="heading-line"></div>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputissue" className="form-label">
                  Issue to
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputissue"
                  name="issue_to"
                  value={formValues.issue_to}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputempid" className="form-label">
                  Emp ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputempid"
                  name="emp_id"
                  value={formValues.emp_id}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputdesignation" className="form-label">
                  Designation
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputdesignation"
                  name="designation"
                  value={formValues.designation}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputdate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputdate"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputname" className="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputname"
                  name="item_name"
                  value={formValues.item_name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputremark" className="form-label">
                  Remark
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputremark"
                  name="remark"
                  value={formValues.remark}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary">
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

export default EditMaterialTrainees;
