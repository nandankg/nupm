import React, { useEffect , useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminlist, logout, deptlist, formlist } from "../reducer/AuthReducer";
import { Link } from "react-router-dom";

function AdminList() {
  const AdminList = useSelector((state) => state.auth.adminlist.data);
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");
  // Memoize localStorage parsing to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);
  useEffect(() => {
    dispatch(adminlist());
  }, [token]);
  console.log(user);

  return (
    <div className="list_container">
      <h1>Admin List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Employee ID</th>
            <th>Station</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {AdminList?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.department}</td>
              <td>{item.designation}</td>
              <td>{item.user_id}</td>
              <td>{item.station}</td>
              <td>
                <Link to="/Admin/edit" state={{ data: item }}>
                  <button className="btn btn-primary">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminList;
