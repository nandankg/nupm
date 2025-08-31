import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { addLift3 } from "../../reducer/manshi/LiftRescue3Reducer";
const LiftRescue3list = () => {
  const dispatch = useDispatch();
  const Lift3d = useSelector((state) => state.Lift3);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itms = JSON.parse(localStorage.getItem("Lift3d"));
    if (itms) {
      setItems(itms);
    }
  }, []);

  useEffect(() => {
    let l = Lift3d.length;
    if (l > 0) localStorage.setItem("Lift3d", JSON.stringify(Lift3d));
    else dispatch(addLift3(items));
  }, [Lift3d]);

  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/lift3/register">
              Lift Rescue Drill
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> Lift Rescue Drill List</h3>
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
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th rowSpan="2">S. No.</th>
                <th rowSpan="2" style={{ minWidth: "200px" }}>
                  Date
                </th>
                <th rowSpan="2">Station</th>
                <th rowSpan="2">Name of SC</th>
                <th rowSpan="2">Emp ID</th>
                <th rowSpan="2">Lift No.</th>
                <th colSpan="2">Time</th>
                <th rowSpan="2">Total Time taken</th>
                <th rowSpan="2">Name of TC</th>
                <th rowSpan="2">Emp ID of TC</th>
                <th rowSpan="2">Remark</th>
                <th rowSpan="2">Action</th>
              </tr>
              <tr>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ minWidth: "200px" }}>{item.date}</td>
                  <td>{item.station}</td>
                  <td>{item.nameofsc}</td>
                  <td>{item.empid}</td>
                  <td>{item.liftno}</td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                  <td>{item.totaltimetaken}</td>
                  <td>{item.nameoftc}</td>
                  <td>{item.empidTC}</td>
                  <td>{item.remark}</td>
                  <td style={{ position: "relative", verticalAlign: "middle" }}>
                    <div className="d-flex gap-2">
                      <button className="btn btn-primary">Edit</button>
                      <button className="btn btn-success">Save</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LiftRescue3list;
