import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  logout,
  formlist,
  deptlist,
  emplist,
  stationlist,
  liststation,
} from "../reducer/AuthReducer";
import React, { useEffect, useState , useMemo} from "react";
import { useDispatch } from "react-redux";
function StationList() {
  const station = useSelector((state) => state.auth.liststation.data);
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");
  // Memoize localStorage parsing to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);
  useEffect(() => {
    dispatch(liststation());
  }, [token]);
  console.log(station);

  return (
    <>
      <div className="list_container">
        <h1>Station List</h1>
        <table className="table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Station Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {station?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="text-start">{item.station}</td>

                <td>
                  <Link to="/station/edit" state={{ data: item }}>
                    <button className="btn btn-primary">Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StationList;
