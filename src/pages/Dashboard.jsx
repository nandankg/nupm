import React, { useEffect, useState , useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Dsatyle.css";
import {
  logout,
  formlist,
  deptlist,
  emplist,
  adminlist,
  stationlist,
  liststation,
} from "../reducer/AuthReducer";
import { FaUser, FaFileAlt, FaUsers, FaMapMarkerAlt } from "react-icons/fa"; // Import icons

const Dashboard = () => {
  const token = localStorage.getItem("accessToken");
  // Memoize localStorage parsing to avoid parsing on every render
  const luser = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const data = useSelector((state) => state.auth.data);
  const formlst = useSelector((state) => state.auth.formlist);

  const [atoken, setAtoken] = useState("");
  const [adminCount, setAdminCount] = useState(0);
  const [formCount, setFormCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [stationCount, setStationCount] = useState(0);

  useEffect(() => {
    dispatch(formlist());
    dispatch(deptlist());
    dispatch(emplist(luser?.department));
    dispatch(adminlist(luser?.department));
    dispatch(liststation());

    // Simple counting using setTimeout
    const countTo = {
      admin: 10,
      form: 150,
      user: 20,
      station: 21,
    };

    const countUp = (setter, max, delay) => {
      let current = 0;
      const increment = () => {
        if (current < max) {
          setter(current + 1);
          current += 1;
          setTimeout(increment, delay);
        }
      };
      increment();
    };

    countUp(setAdminCount, countTo.admin, 80);
    countUp(setFormCount, countTo.form, 80);
    countUp(setUserCount, countTo.user, 80);
    countUp(setStationCount, countTo.station, 80);
  }, [token, dispatch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 main-content">
          <h1>Welcome to the {luser.name} Dashboard</h1>
          <div className="Dash">
            <div className="dashboard-box-container">
              <div className="dashboard-box">
                <div className="icon">
                  <FaUser />
                </div>
                <h3>Total Admin</h3>
                <p className="count">{adminCount}</p>
              </div>
              <div className="dashboard-box">
                <div className="icon">
                  <FaFileAlt />
                </div>
                <h3>Total Form</h3>
                <p className="count">{formCount}</p>
              </div>
              <div className="dashboard-box">
                <div className="icon">
                  <FaUsers />
                </div>
                <h3>Total User</h3>
                <p className="count">{userCount}</p>
              </div>
              <div className="dashboard-box">
                <div className="icon">
                  <FaMapMarkerAlt />
                </div>
                <h3>Total Station</h3>
                <p className="count">{stationCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
