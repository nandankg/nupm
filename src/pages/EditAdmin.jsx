import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import {
  adduser,
  formlist,
  deptlist,
  editUser,
  editadmin,
} from "../reducer/AuthReducer";
import { useLocation } from "react-router-dom";

function EditAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const luser = JSON.parse(localStorage.getItem("userdata"));
  const location = useLocation();
  const { data } = location.state;
  const formlst = useSelector((state) => state.auth.formlist.data);
  const deptlst = useSelector((state) => state.auth.deptlist.data);

  useEffect(() => {
    dispatch(formlist());
    dispatch(deptlist());
  }, [dispatch]);

  const basicInitialValues = {
    id: data?.id,
    email: data?.email,
    name: data?.name,
    role: data?.role,
    empoyee_id: data?.user_id,
    designation: data?.designation,
    station: data?.station,
    department: data?.department,
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    const filteredForms = formlst?.filter(
      (form) => form.category === luser?.department
    );
    setFilterList(filteredForms);

    // Set initial selected forms based on the data.assigned_forms
  }, [formlst, data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(editUser(formValues)).then((action) => {
      navigate("/Admin/list");
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  console.log(formValues);
  return (
    <div>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="bredcrumb">
            <Link underline="hover" color="inherit" to="/">
              Home
            </Link>
            <Link underline="hover" color="inherit">
              Edit Admin
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-3">
                <label htmlFor="inputname" className="form-label">
                  Employee Id
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputname"
                  name="employee_id"
                  value={formValues.empoyee_id}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="inputdesign" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputdesign"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputdesign1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputdesign1"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="inputdesign" className="form-label">
                  Department
                </label>
                <select
                  className="form-control"
                  id="inputdesign"
                  name="department"
                  value={formValues.department}
                  disabled
                >
                  <option>Select Department</option>
                  {deptlst?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="f-btn btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAdmin;
