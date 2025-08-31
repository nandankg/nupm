import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { adduser, formlist, deptlist, editUser } from "../reducer/AuthReducer";
import station from "../data/station.json";
import { useLocation } from "react-router-dom";

function EditUser() {
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
    assigned_forms: data?.assigned_forms || [],
  };

  const [formValues, setFormValues] = useState(basicInitialValues);
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    const filteredForms = formlst?.filter(
      (form) => form.category === luser?.department
    );
    setFilterList(filteredForms);

    // Set initial selected forms based on the data.assigned_forms
    if (filteredForms) {
      const initialAssignedForms = filteredForms.filter((form) =>
        data?.assigned_forms.includes(form.slug)
      );
      setFormValues((prevValues) => ({
        ...prevValues,
        assigned_forms: initialAssignedForms,
      }));
    }
  }, [formlst, data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const slugs = formValues.assigned_forms.map((form) => form.slug);
    dispatch(editUser({ ...formValues, assigned_forms: slugs })).then(
      (action) => {
        navigate("/user/list");
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormChange = (event, newValue) => {
    setFormValues({ ...formValues, assigned_forms: newValue });
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
              Edit User
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
              <div className="col-md-4 mb-3">
                <label htmlFor="inputdesign" className="form-label">
                  Station
                </label>
                <select
                  className="form-control"
                  id="inputdesign"
                  name="station"
                  value={formValues.station}
                  onChange={handleChange}
                >
                  <option>Select Station</option>
                  {station?.map((item) => (
                    <option
                      key={item["Station Name"]}
                      value={item["Station Name"]}
                    >
                      {item["Station Name"]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="inputdesign1" className="form-label">
                  designation
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputdesign1"
                  name="designation"
                  value={formValues.designation}
                  onChange={handleChange}
                />
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
                      value={formValues.assigned_forms}
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
    </div>
  );
}

export default EditUser;
