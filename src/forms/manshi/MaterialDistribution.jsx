import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../reducer/redux/tableDataSlice";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const MaterialDistribution = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [slug, setSlug] = useState(getLastParameter().trim());
    const PMsheetMonthlyList = useSelector((state) => state.data);
  const mat = useSelector((state) => state.mater);
  
  console.log(slug);
  

  const basicInitialValues = {
    Issued_By_Emp_No:"",
    Issued_To_Emp_No:"",
    Issued_By_Name:"",
    Issued_To_Name:"",
    Designation:"",
    Item_Type:"",
    Item_name:"",
    Batch:"",
    Remarks: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleSubmit = (e) => {
     e.preventDefault();
    dispatch(addData({formType:slug,values:formValues}));
        console.log("Form Data Submitted:", formValues);
        navigate(`/list/${slug}`);
   };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <div className="container ">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Material Distribution
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
                <h3 className="form-heading">Material Distribution</h3>
                <div className="heading-line"></div>
              </div>
              <div className="row mb-3 cont">
                <div className="col-md-6">
                  <label htmlFor="inputItem" className="form-label">
                  Item_name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputItem"
                    name="Item_name"
                    value={formValues.Item_name}
                    onChange={handleChange}
                    aria-label="Item"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputRemark" className="form-label">
                  Item Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputRemark"
                    name="Item_Type"
                    value={formValues.Item_Type}
                    onChange={handleChange}
                    aria-label="Remark"
                  />
                </div>
              </div>
              <div className="row mb-3 cont">
                <div className="col-md-6">
                  <label htmlFor="inputDateIn" className="form-label">
                  Designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDateIn"
                    name="Designation"
                    value={formValues.Designation}
                    onChange={handleChange}
                    aria-label="Date In"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="inputquantityIn" className="form-label">
                  Issued To Name 
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputquantityIn"
                    name="Issued_To_Name"
                    value={formValues.Issued_To_Name}
                    onChange={handleChange}
                    aria-label="quantityIn"
                  />
                </div>
              </div>
              <div className="row mb-3 cont">
                <div className="col-md-6">
                  <label htmlFor="inputdateOut" className="form-label">
                  Issued By Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdateOut"
                    name="Issued_By_Name"
                    value={formValues.Issued_By_Name}
                    onChange={handleChange}
                    aria-label="Date Out"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputquantityIn1" className="form-label">
                  Issued To Emp No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputquantityIn1"
                    name="Issued_To_Emp_No"
                    value={formValues.Issued_To_Emp_No}
                    onChange={handleChange}
                    aria-label="quantityIn1"
                  />
                </div>
              </div>
              <div className="row mb-3 cont">
                <div className="col-md-6">
                  <label htmlFor="inputdateOut" className="form-label">
                  Issued By Emp No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdateOut"
                    name="Issued_By_Emp_No"
                    value={formValues.Issued_By_Emp_No}
                    onChange={handleChange}
                    aria-label="Date Out"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputdateOut" className="form-label">
                  Batch
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdateOut"
                    name="Batch"
                    value={formValues.Batch}
                    onChange={handleChange}
                    aria-label="Date Out"
                  />
                </div>
                </div>
                <div className="row mb-3 cont">
                <div className="col-md-12">
                  <label htmlFor="inputdateOut" className="form-label">
                  Remark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputdateOut"
                    name="Remarks"
                    value={formValues.Remarks}
                    onChange={handleChange}
                    aria-label="Date Out"
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

export default MaterialDistribution;
