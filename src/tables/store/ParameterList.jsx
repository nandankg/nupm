import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addParameter } from "../../reducer/store/ParameterReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const ParameterList = () => {
  const dispatch = useDispatch();
  const addParameterList = useSelector((state) => state.parameter);
  console.log(addParameterList);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const itms = JSON.parse(localStorage.getItem("addParameterList"));
    if (itms) {
      setItems(itms);
    }
  }, []);
  useEffect(() => {
    let l = addParameterList.length;
    if (l > 0)
      localStorage.setItem(
        "addParameterList",
        JSON.stringify(addParameterList)
      );
    else dispatch(addParameter(items));
  }, [addParameterList]);

  console.log(items);
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/parameter/register">
              Parameter
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> PARAMETER</h3>
        <span className="line-box"></span>
        <div className="d-flex justify-content-between">
          <input type="search" name="search" placeholder="Search Here." />
          <div className="d-flex gap-3">
            <Link to="">
              <button className="btn btn-primary">
                <FaFilter />
              </button>
            </Link>
            <Link to="">
              <button className="btn btn-primary">Export</button>
            </Link>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>S_No</th>
              <th>Date</th>
              <th>Parameter Version</th>
              <th>Validity From</th>
              <th>Parameter Description</th>
              <th>Device Updated</th>

              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{item.date}</td>
                <td>{item.parameterversion}</td>
                <td>{item.validityform}</td>
                <td>{item.parameterdescription}</td>
                <td>{item.deviceupdated}</td>

                <td className=" ">
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-success">Save</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ParameterList;
