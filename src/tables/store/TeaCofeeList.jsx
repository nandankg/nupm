import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTeaCofee } from "../../reducer/store/TeaCofeesReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const TeaCofeeList = () => {
  const dispatch = useDispatch();
  const addTeaCofeeList = useSelector((state) => state.teacofee);
  console.log(addTeaCofeeList);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const itms = JSON.parse(localStorage.getItem("addTeaCofeeList"));
    if (itms) {
      setItems(itms);
    }
  }, []);
  useEffect(() => {
    let l = addTeaCofeeList.length;
    if (l > 0)
      localStorage.setItem("addTeaCofeeList", JSON.stringify(addTeaCofeeList));
    else dispatch(addTeaCofee(items));
  }, [addTeaCofeeList]);

  console.log(items);
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/teacofee/register">
              TEA/COFEE
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> TEA/COFEE LIST</h3>
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
              <th>ITEM</th>
              <th>Quantity</th>
              <th>Date In</th>
              <th>Quantity</th>
              <th>Date Out</th>
              <th>Remarks</th>

              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{item.item}</td>
                <td>{item.quantity}</td>
                <td>{item.datein}</td>
                <td>{item.quantity}</td>
                <td>{item.dateout}</td>

                <td>{item.remark}</td>

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

export default TeaCofeeList;
