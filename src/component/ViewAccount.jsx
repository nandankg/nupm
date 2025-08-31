import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../reducer/AuthReducer";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ViewAccount.css";

export const ViewAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);

  const [formValues, setFormValues] = useState({
    name: "",
    user_id: "",
    email: "",
    role: "",
    station: "",
    designation: "",
    department: ""
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    retypeNewPassword: ""
  });
  
  // New state for password visibility
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    retypeNewPassword: false
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setFormValues({
        name: userData.name || "",
        user_id: userData.user_id || "",
        email: userData.email || "",
        role: userData.role || "",
        station: userData.station || "",
        designation: userData.designation || "",
        department: userData.department || ""
      });
    }
  }, [userData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verify current password and check if new passwords match
    if (passwords.newPassword !== passwords.retypeNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Simulate password change success
    setTimeout(() => {
      toast.success("Password changed successfully!");
      setShowPasswordFields(false);
      setPasswords({
        currentPassword: "",
        newPassword: "",
        retypeNewPassword: ""
      });
      navigate("/dashboard");
    }, 1000);
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [field]: !passwordVisibility[field]
    });
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "1":
        return "Admin";
      case "2":
        return "Super Admin";
      case "3":
        return "Employee";
      default:
        return "Unknown Role";
    }
  };

  return (
    <div className="view-account-container">
      <h2 className="view-account-header">Account Details</h2>
      <form className="view-account-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <span className="form-value">
              <b>Name:</b> {formValues.name}
            </span>
          </div>
          <div className="form-group">
            <span className="form-value">
              <b>User ID:</b> {formValues.user_id}
            </span>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <span className="form-value">
              <b>Email:</b> {formValues.email}
            </span>
          </div>
          <div className="form-group">
            <span className="form-value">
              <b>Role:</b> {getRoleLabel(formValues.role)}
            </span>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <span className="form-value">
              <b>Station:</b> {formValues.station}
            </span>
          </div>
          <div className="form-group">
            <span className="form-value">
              <b>Designation:</b> {formValues.designation}
            </span>
          </div>
        </div>
        <div className="form-row full-width">
          <div className="form-group">
            <span className="form-value">
              <b>Department:</b> {formValues.department}
            </span>
          </div>
        </div>

        {/* Password Fields */}
        {showPasswordFields && (
          <div className="password-fields">
            <div className="password-group">
              <input
                type={passwordVisibility.currentPassword ? "text" : "password"}
                name="currentPassword"
                placeholder="Current Password"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                className="password-input"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("currentPassword")}
                className="password-toggle" style={{ top: "45%",}}
              >
                {passwordVisibility.currentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="password-group">
              <input
                type={passwordVisibility.newPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="password-input"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
                className="password-toggle" style={{ top: "45%",}}
              >
                {passwordVisibility.newPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="password-group">
              <input
                type={passwordVisibility.retypeNewPassword ? "text" : "password"}
                name="retypeNewPassword"
                placeholder="Retype New Password"
                value={passwords.retypeNewPassword}
                onChange={handlePasswordChange}
                className="password-input"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("retypeNewPassword")}
                className="password-toggle" style={{ top: "45%",}}
              >
                {passwordVisibility.retypeNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="fs-btn btn">
                Save New Password
              </button>
            </div>
          </div>
        )}

        {!showPasswordFields && (
          <div className="col-12 text-center">
            <button
              type="button"
              className="fs-btn btn"
              onClick={() => setShowPasswordFields(true)}
            >
              Change Password
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ViewAccount;
