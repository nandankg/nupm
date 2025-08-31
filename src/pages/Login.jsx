import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { login } from "../reducer/AuthReducer";
import {
  FaSignInAlt,
  FaUserPlus,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");

  const [showPassword, setShowPassword] = useState(false);
  const basicInitialValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(basicInitialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    let loginid = formValues.email;
    let password = formValues.password;
    console.log("login", loginid, password);
    dispatch(login({ loginid, password })).then((action) => {
      if(action.payload.success){
      console.log(action.payload);
      localStorage.setItem("accessToken", action.payload.api_token);
      localStorage.setItem("userdata", JSON.stringify(action.payload));
      }
      const timeout = setTimeout(() => {
        window.location.reload(); // Refresh the page
      }, 2000)
      navigate("/dashboard");
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="container1">
        <div role="presentation" className="bredcrumbs">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
              Home
            </Link>
            <Link underline="hover" color="inherit">
              Login
            </Link>
          </Breadcrumbs>
        </div>
        <div className="login-background">
          <div className="login-popup">
            <div className="login-video-section">
              <img src="/upmlogo.jpg" alt="UP Metro Logo" />
            </div>
            <div className="login-form-section">
              <h1>Login</h1>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group password-group">
                  <label htmlFor="password">Password</label>

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <button type="submit" className="login-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
