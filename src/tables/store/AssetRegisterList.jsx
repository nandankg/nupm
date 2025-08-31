import { FaFilter } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addAssetRegister } from "../../reducer/store/AssetRegisterReducer";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const AssetRegisterList = () => {
  const dispatch = useDispatch();
  const assetRegisterState = useSelector((state) => state.assetregister);
  const addAssetRegisterList = assetRegisterState?.data || assetRegisterState || [];
  console.log('Asset Register List:', addAssetRegisterList);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const itms = JSON.parse(localStorage.getItem("addAssetRegisterList"));
    if (itms) {
      setItems(itms);
    }
  }, []);
  
  useEffect(() => {
    const listData = Array.isArray(addAssetRegisterList) ? addAssetRegisterList : [];
    let l = listData.length;
    if (l > 0) {
      localStorage.setItem(
        "addAssetRegisterList",
        JSON.stringify(listData)
      );
    } else if (items.length > 0) {
      // Migrate old data format if needed
      items.forEach(item => dispatch(addAssetRegister(item)));
    }
  }, [addAssetRegisterList, items, dispatch]);

  console.log(items);
  return (
    <>
      <div className="container">
        <div role="presentation " className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/assetregister/register"
            >
              ASSETS REGISTER
            </Link>
            <Link underline="hover" color="inherit">
              List
            </Link>
          </Breadcrumbs>
        </div>
        <h3> ASSET REGISTER LIST</h3>
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
              <th colSpan={9}></th>
            </tr>
            <tr>
              <th colSpan={2}>
                Department:S&T
                <br />
                Station Name............
              </th>
              <th colSpan={6}></th>
              <th rowSpan={1}>
                Unit:-TELE-AFC
                <br />
                Name of Article..........
              </th>
            </tr>

            <tr>
              <th>S_No</th>
              <th>Date of installation</th>
              <th>Description Of material</th>
              <th>Make</th>
              <th>Serial No</th>
              <th>QTY.</th>
              <th>Location</th>
              <th>Remarks</th>

              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{item.Dateofinstallation}</td>
                <td>{item.DescriptionOfMaterial}</td>
                <td>{item.make}</td>
                <td>{item.seialno}</td>
                <td>{item.qty}</td>

                <td>{item.location}</td>
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

export default AssetRegisterList;
