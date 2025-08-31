import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Container, Grid, Button } from "@mui/material";
import { UniversalFinanceFormField, FinanceFormLayout } from "../components";
import stations from "../../../data/station.json";
import { addData, fetchData } from "../../../reducer/store/StationEarningReducer";

const StationEarningRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stationearning = useSelector((state) => state.stationearning);
  const [slug, setSlug] = useState("");

  // PRESERVED EXACT FIELD STRUCTURE - No changes to field names
  const [formData, setFormData] = useState({
    date: "",
    stationName: "",
    cashFareBox: "",
    souvenirSale: "",
    birthdayBooking: "",
    penalty: "",
    lostAndFound: "",
    other: "",
    scratchCard: "",
    upiQrTicket: "",
    posBankCard: "",
    email: "",
  });

  // Form validation states
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (stationearning) {
      setSlug(stationearning.slug);
    }
  }, [stationearning]);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    if (!formData.date) {
      errors.date = "Date is required";
    }
    
    if (!formData.stationName) {
      errors.stationName = "Station Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email format is invalid";
    }
    
    // Optional numeric fields validation
    const numericFields = [
      'cashFareBox', 'souvenirSale', 'birthdayBooking', 'penalty', 
      'lostAndFound', 'other', 'scratchCard', 'upiQrTicket', 'posBankCard'
    ];
    
    numericFields.forEach(field => {
      if (formData[field] && (isNaN(formData[field]) || parseFloat(formData[field]) < 0)) {
        errors[field] = `${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} must be a valid positive number`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // ENHANCED SUBMIT with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    dispatch(addData(formData))
      .then(() => {
        navigate(`/list/${slug}`);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Get field label with proper formatting
  const getFieldLabel = (key) => {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };

  // Determine field type
  const getFieldType = (key) => {
    if (key === "date") return "date";
    if (key === "email") return "email";
    return "text";
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Station Earning</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formData).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              {key === "stationName" ? (
                <div className="mb-3">
                  <label htmlFor="stationName" className="form-label">
                    Station Name
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    id="stationName"
                    name="stationName"
                    value={formData.stationName}
                    className={`form-control ${formErrors.stationName ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Station</option>
                    {stations.map((station, index) =>
                      station["Station Name"] && (
                        <option key={index} value={station["STATION Code"]}>
                          {station["Station Name"]}
                        </option>
                      )
                    )}
                  </select>
                  {formErrors.stationName && (
                    <div className="text-danger small mt-1" role="alert">
                      {formErrors.stationName}
                    </div>
                  )}
                </div>
              ) : (
                <TextField
                  fullWidth
                  label={getFieldLabel(key)}
                  variant="outlined"
                  name={key}
                  type={getFieldType(key)}
                  value={formData[key]}
                  onChange={handleChange}
                  InputLabelProps={key === "date" ? { shrink: true } : {}}
                  required={key === "date" || key === "email"}
                  error={!!formErrors[key]}
                  helperText={formErrors[key]}
                />
              )}
            </Grid>
          ))}
          <Grid item xs={12} className="text-center">
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default StationEarningRegisterForm;