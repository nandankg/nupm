import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addDrill } from "../../reducer/store/EscalatorDrillReducer";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const EscalatorDrillList = () => {
  const dispatch = useDispatch();
  const drill = useSelector((state) => state.escdrill);
  console.log(drill);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const itms = JSON.parse(localStorage.getItem("drill"));
    if (itms) {
      setItems(itms);
    }
  }, []);
  useEffect(() => {
    let l = drill.length;
    if (l > 0) localStorage.setItem("drill", JSON.stringify(drill));
    else dispatch(addDrill(items));
  }, [drill]);
  console.log(items);
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/escalatordrill/register"
            >
              Card Refund details
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> ESCALATOR DRILL</h3>
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
                <th rowSpan={2}>STATION</th>
                <th rowSpan={2}>ESCALATOR NO</th>
                <th rowSpan={2}>NAME OF SC</th>
                <th rowSpan={2}>EMP ID</th>
                <th rowSpan={2}>POINT NO</th>

                <th colspan={2}>TIME</th>

                <th rowSpan={2}>Total Time Taken</th>
                <th colSpan={2}>Operation MODE</th>

                <th rowSpan={2}>NAME OF TC</th>
                <th rowSpan={2}>EMP ID OF TC</th>
                <th rowSpan={2}>REMARKS</th>
                <th style={{ width: "150px" }}></th>
              </tr>
              <tr>
                <th rowSpan={1}>FROM</th>
                <th rowspan={1}>TO</th>
                <th rowspan={1}>Off,On</th>
                <th rowspan={1}>Emergency</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  {/* <td>{index + 1}</td> */}

                  <td>{item.station}</td>
                  <td>{item.escalatorno}</td>
                  <td>{item.name}</td>

                  <td>{item.empid}</td>
                  <td>{item.pointno}</td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                  <td>{item.onoff}</td>
                  <td>{item.emergency}</td>
                  <td>{item.totaltimetaken}</td>
                  <td>{item.nameoftc}</td>
                  <td>{item.empidtc}</td>
                  <td>{item.remarks}</td>
                  <td className=" ">
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-success">Save</button>
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
export default EscalatorDrillList;
