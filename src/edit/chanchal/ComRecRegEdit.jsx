import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/chanchal/ComRecRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { formatDate } from "../../data/formatDate";

const ComRecRegEdit = () => {
  const navigate = useNavigate();
  const [sNo, setSNo] = useState(1);
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const dispatch = useDispatch();
  const ComRecRegList = useSelector((state) => state.comRecReg);
  console.log(ComRecRegList.data.data);
  const [items, setItems] = useState([]);
  const itmm = ComRecRegList.data.data;
  console.log(items);
  useEffect(() => {
    dispatch(fetchData());
    setItems(ComRecRegList.data.data);
  }, []);
  useEffect(() => {
    setItems(ComRecRegList.data.data);
  }, [ComRecRegList]);
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
    id: fd.id,
    S_No: sNo,
    Name: fd.name,
    Empid: fd.empid,
    Designation: fd.designation,
    CompType: fd.competencytype,
    CompValFrom: fd.competencyvalidfrom,
    NextComDueDate: fd.competencyduedate,
  };
  const [formValues, setFormValues] = useState(basicInitialValues);
  console.log(formValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editData(formValues));
    navigate("/list/competency-record-register");
  };

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Competency Record Register
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
                <h3 className="form-heading">
                  Edit : Competency Record Register
                </h3>
                <div className="heading-line"></div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    {" "}
                    Name{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.Name}
                    id="inputName"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Name: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputEmp" className="form-label">
                    {" "}
                    Emp id{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formValues.Empid}
                    id="inputEmp"
                    onChange={(e) =>
                      setFormValues({ ...formValues, Empid: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 ">
                  <label for="inputDesignation" className="form-label">
                    Designation
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.Designation}
                    id="inputlocation"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        Designation: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputCompType" className="form-label">
                    Competency Type
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    value={formValues.CompType}
                    id="inputCompType"
                    onChange={(e) =>
                      setFormValues({ ...formValues, CompType: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label for="inputCompValFrom" className="form-label">
                    Competency Valid From
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={formValues.CompValFrom}
                    id="inputCompValFrom"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        CompValFrom: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label for="inputNextComDueDate" className="form-label">
                    Next Competency Due Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={formValues.NextComDueDate}
                    id="inputNextComDueDate"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        NextComDueDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-12 text-center pt-3">
                <button type="submit" className="btn btn-primary px-3">
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

export default ComRecRegEdit;
