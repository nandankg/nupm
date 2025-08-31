import { FaFilter } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData, editData } from "../../reducer/isha/GrievanceReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const EditGrievance = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    console.log(id);
    const dispatch = useDispatch();
    const grievancee = useSelector((state) => state.grievance);
    const [slug, setSlug] = useState("");
    console.log(slug);
    console.log(grievancee.data.data);
    const [items, setItems] = useState([]);
    const itmm = grievancee.data.data;
    console.log(items);
    useEffect(() => {
      dispatch(fetchData());
      setItems(grievancee.data.data);
    }, []);
    useEffect(() => {
      if (grievancee) {
        setSlug(grievancee.slug);
      }
      setItems(grievancee.data.data);
    }, [grievancee]);
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
    date: fd.date,
    Test_date:fd.Test_date,
    employee_no:fd.employee_no,
    noe: fd.noe,
    des: fd.des,
    gd: fd.gd,
    sign: fd.sign,
    remark: fd.remark,
    io: fd.io,
};
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
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
            GRIEVANCE
            </Link>
            <Link underline="hover" color="inherit">
              Register
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container"style={{ marginLeft: "0", marginRight: "0", maxWidth: "95%" }}>
            <form onSubmit={handleSubmit}>
              <div className=" mb-3 form-heading-container">
                <h3 className="form-heading"> Edit : GRIEVANCE REGISTER</h3>
                <span className="line-box"style={{width:"400px"}}></span>
              </div> 
              <div className="row mb-3">
              <div className="col-md-4">
                <label for="inputchangeTo" className="form-label">
                Emp Name
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputchangeTo"
                  value={formValues.noe}
                  onChange={(e) =>
                    setFormValues({ ...formValues, noe: e.target.value })
                  }
                 
                />
              </div>
                <div className="col-4">
                <label for="inputreason" className="form-label">
                Designation
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputreason"
                  value={formValues.des}
                  onChange={(e) =>
                    setFormValues({ ...formValues, des: e.target.value })
                  }
                 
                />
              </div>
              <div className="col-4">
                <label for="inputreason" className="form-label">
                Emp ID
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputreason"
                  value={formValues.employee_no}
                  onChange={(e) =>
                    setFormValues({ ...formValues, employee_no: e.target.value })
                  }
                 
                />
              </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputchangeTo" className="form-label">
                Test Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputen"
                  value={formValues.Test_date}
                  onChange={(e) =>
                    setFormValues({ ...formValues, Test_date: e.target.value })
                  }
                 
                />
              </div>
              
            
                <div className="col-6">
                <label for="inputreason" className="form-label">
                Grievance Details
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="intputgd"
                  value={formValues.gd}
                    name="gd"
                  onChange={(e) =>
                    setFormValues({ ...formValues, gd: e.target.value })
                  }
                  required
                />
              </div>
              <div className="row mb-3">
              <div className="col-md-6">
                <label for="inputchangeTo" className="form-label">
                Inspecting offical Name
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputchangeTo"
                  value={formValues.io}
                  onChange={(e) =>
                    setFormValues({ ...formValues, io: e.target.value })
                  }
                 
                />
              </div>
                
              <div className="col-6">
                <label for="inputreason" className="form-label">
                Emp ID
                </label>
                <input
                  type="text"required
                  className="form-control"
                  id="inputreason"
                  value={formValues.sign}
                  onChange={(e) =>
                    setFormValues({ ...formValues, sign: e.target.value })
                  }
                 
                />
              </div>
              </div>
              <div className="col-md-12">
                  <label for="inputRemark" className="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                   value={formValues.remark}
                    name="remark"
                    onChange={(e) =>
                      setFormValues({ ...formValues, remark: e.target.value })
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
export default EditGrievance;














