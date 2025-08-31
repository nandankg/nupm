import { useSelector } from "react-redux";
import { logout, formlist, deptlist, emplist } from "../reducer/AuthReducer";
import React, { useEffect, useState , useMemo} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function ListUser() {
  const employeelist = useSelector((state) => state.auth.emplist.data);
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");
  // Memoize localStorage parsing to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);
  useEffect(() => {
    dispatch(formlist());
    dispatch(deptlist());
    dispatch(emplist(user?.department));
  }, [token]);
  console.log(employeelist);
  return (
  
 <div className="list_container">
      <h1>Userlist</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>station</th>
          </tr>
        </thead>
        <tbody>
          {employeelist?.map((item, index) => (
            <tr key={index}>

              <td>{item.name}</td>
              <td>
                <Link to={"/user/edit"} state={{ data: item }}>
                  {item.email}
                </Link>
              </td>
              <td>{item.department}</td>
              <td>{item.designation}</td>
              <td>{item.station}</td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
  
  );
}

export default ListUser;
