import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { adduser, formlist, deptlist } from "../reducer/AuthReducer";

const Adduser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const luser = JSON.parse(localStorage.getItem("userdata"));
  const user = useSelector((state) => state.auth);
  const formlst = useSelector((state) => state.auth.formlist.data);
  const deptlst = useSelector((state) => state.auth.deptlist.data);

  useEffect(() => {
    dispatch(formlist());
    dispatch(deptlist());
  }, [dispatch]);

  const basicInitialValues = {
    email: "",
    name: "",
    role: 3,
    empoyee_id: "",
    password: "",
    designation: "-",
    department: luser?.department,
    assigned_forms: [],
    station: "1",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(adduser(formValues)).then((action) => {
      navigate("/dashboard");
      console.log(action.payload);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  console.log(formValues);

  const handleFormChange = (event, newValue) => {
    const slugs = newValue.map((form) => form.slug);
    setFormValues({ ...formValues, assigned_forms: slugs });
  };

  const [filterList, setFilterList] = useState([]);
  useEffect(() => {
    const filteredForms = formlst?.filter(
      (form) => form.category == luser?.department
    );
    setFilterList(filteredForms);
  }, [formlst]);
  console.log(filterList);

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="bredcrumb">
            <Link underline="hover" color="inherit" to="/">
              Home
            </Link>
            <Link underline="hover" color="inherit">
              Add User
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
                  name="empoyee_id"
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
              <div className="col-md-6">
                <label htmlFor="inputdesign" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputdesign"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
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
                  {deptlst?.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
              </div>
              <div className="col-md-12">
                {filterList && (
                  <Stack spacing={3} sx={{ width: 500 }}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={filterList || []}
                      getOptionLabel={(option) => option.name}
                      filterSelectedOptions
                      name="assigned_forms"
                      onChange={handleFormChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Assign Form"
                          placeholder="Search"
                        />
                      )}
                    />
                  </Stack>
                )}
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
    </>
  );
};

export default Adduser;
