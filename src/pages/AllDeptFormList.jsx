import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { formlist, deptlist } from "../reducer/AuthReducer";

const AllDeptFormList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const luser = JSON.parse(localStorage.getItem("userdata"));
  const user = useSelector((state) => state.auth);
  const formlst = useSelector((state) => state.auth.formlist.data);
  const deptlst = useSelector((state) => state.auth.deptlist.data);
  console.log(formlist);
  useEffect(() => {
    // Set a timeout to refresh the page after 20 seconds
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 10000); // 20000 milliseconds = 20 seconds

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    dispatch(formlist());
    dispatch(deptlist());
  }, [dispatch]);

  
  

  return (
    <>
      <div className="container">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="bredcrumb">
            <Link underline="hover" color="inherit" to="/">
              Home
            </Link>
            <Link underline="hover" color="inherit">
              Form List
            </Link>
          </Breadcrumbs>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 form-container">
            <ul className="list-group">
              {formlst?.map((item, index) => (
                <li className="list-group-item">
                  <Link to={"/form/item"}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllDeptFormList;
