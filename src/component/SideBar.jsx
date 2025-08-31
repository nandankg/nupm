import React, { useState , useMemo} from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducer/AuthReducer";
import {
  MdOutlineAssignmentTurnedIn,
  MdAddLocationAlt,
  MdOutlineChecklistRtl,
} from "react-icons/md";
import { IoCreateSharp } from "react-icons/io5";
import {
  FaHome,
  FaUserPlus,
  FaUserEdit,
  FaUserMinus,
  FaUserCircle,
  FaSignOutAlt,
  FaList,
} from "react-icons/fa";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { Link } from "react-router-dom";

function SideBar() {
  // Memoize localStorage parsing to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);
  const userRole = user.role;
  console.log(userRole);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
      <div className="react-icon-container" onClick={toggleSidebar}>
        {isSidebarOpen ? <GoSidebarCollapse /> : <GoSidebarExpand />}
      </div>

      <div>
        {" "}
        <ul className="sidebar-nav list-group mt-5 pt-5">
          <li>
            <Link to="/dashboard">
              <FaHome className="react-icon" />
              <span>{userRole} Home</span>
            </Link>
          </li>

          {userRole == "Employee" ? (
            <>
              <li>
                <Link to="/employee/form/list">
                  {" "}
                  <MdOutlineAssignmentTurnedIn className="react-icon" />
                  <span> Assigned Form</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              {userRole == "SuperAdmin" ? (
                <>
                  <li>
                    <Link to="/admin/add">
                      <FaUserPlus className="react-icon" />
                      <span> Create Admin</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/Admin/list">
                      <FaList className="react-icon" />
                      <span> List Admin</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/station/add">
                      <MdAddLocationAlt
                        className="react-icon"
                        style={{ fontSize: "25px" }}
                      />
                      <span>Station Add</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/activity-log">
                      <MdOutlineChecklistRtl
                        className="react-icon"
                        style={{ fontSize: "25px" }}
                      />
                      <span>Activity Log</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/user/add">
                      <IoCreateSharp className="react-icon" />
                      <span> Create User</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/user/list">
                      <FaList className="react-icon" />
                      <span> List User</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/form/list">
                      <FaList className="react-icon" />
                      <span> All Form</span>
                    </Link>
                  </li>
                  <li>
                  <Link to="/admin/activity-log">
                    <FaList className="react-icon" />
                    <span> Activity Log</span>
                  </Link>
                </li> 
                </>
              )}
            </>
          )}

          <li>
            <Link to="#">
              {" "}
              <FaUserEdit className="react-icon" />
              <span> Change Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
