import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTrainId } from "../../reducer/store/TrainIdRecordRegReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const TrainIdRecordReglist = () => {
  const dispatch = useDispatch();
  const addTrainIdList = useSelector((state) => state.trainid);
  console.log(addTrainIdList);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const itms = JSON.parse(localStorage.getItem("addTrainIdList"));
    if (itms) {
      setItems(itms);
    }
  }, []);
  useEffect(() => {
    let l = addTrainIdList.length;
    if (l > 0)
      localStorage.setItem("addTrainIdList", JSON.stringify(addTrainIdList));
    else dispatch(addTrainId(items));
  }, [addTrainIdList]);

  console.log(items);
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/trainid/register">
              TRAIN ID RECORD REGISTER
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> TRAIN ID RECORD REGISTER</h3>
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
              <th>DATE</th>
              <th>PREVIOUS ASSOCIATED ID</th>
              <th>NEW ID ASSOCIATED ID</th>
              <th>PURPOSE AND ACTION</th>
              <th>NAME OF TC</th>
              <th>NAME OF APPROVING ACC</th>

              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{item.date}</td>
                <td>{item.paid}</td>
                <td>{item.newid}</td>
                <td>{item.purandact}</td>
                <td>{item.nameoftc}</td>

                <td>{item.nameofapprovingacc}</td>

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

export default TrainIdRecordReglist;
