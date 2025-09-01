import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Button, 
  Checkbox,
  FormControlLabel,
  FormGroup,
  Alert,
  Divider,
  Chip,
  Card,
  CardContent,
  CardHeader,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress
} from '@mui/material';
import { 
  Save as SaveIcon,
  Build as MaintenanceIcon,
  CheckCircle as CheckIcon,
  ExpandMore as ExpandMoreIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';

// Import universal components
import { 
  UniversalAFCMainlineFormField, 
  AFCMainlineFormLayout 
} from "../components";
import { validateForm } from "../validation";
import { addData } from "../../../reducer/pinki/AfcPreventiveReducer";
import { formatDate } from "../../../data/formatDate";
import stations from "../../../station.json";

const PmLogbookHalfYearlyGateMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Field preservation: Exact field structure from legacy form
  const initialFormState = {
    stn_name: "rnc",
    date: formatDate(new Date().toDateString()),
    month: new Date().toLocaleString("default", { month: "long" }),
    activities: Array(41).fill({
      G1: "No",
      G2: "No", 
      G3: "No",
      G4: "No",
      G5: "No",
      G6: "No",
      G7: "No",
      G8: "No",
      G9: "No",
      G10: "No",
      remark: "",
      action: "",
      deficiency: "",
    }),
    sg1: "",
    sg2: "",
    staff1_name: "--",
    staff1_desg: "--", 
    staff1_sign: "--",
    staff2_name: "--",
    staff2_desg: "--",
    staff2_sign: "--", 
    staff3_name: "--",
    staff3_desg: "--",
    staff3_sign: "--",
  };

  const [formValues, setFormValues] = useState(initialFormState);

  // Preserve exact labels from legacy form
  const labels = [
    "Check Fixing & Alignment of all modules of Gates",
    "Checking of all Cable connection and dressing",
    "Checking Silicon sealing of Gate Cabinet",
    "Checking of any opening inside gate cabinet",
    "Checking of Power Supply and Battery",
    "Check whether leaked oil appears on the flap mechanism",
    "Check Date and Time",
    "Check correct position of flap mechanism",
    "Check Lubrication of all Locks with Silicone oil",
    "Check AG Cabinet case for corrosion",
    "Check Power Source fan filter ",
    "Cleaning of all modules of AFC Gate and cabinet",
    "Clean sensor of Limit PCB of flap mechanism",
    "Clean plastic covers of sensors and transmitters in corridor",
    "Check ping to station computer",
    "Check whether Token Capture Unit (TCU) clearing mechanism is Normally closed",
    "Check lock functionality",
    "Check battery backup",
    "Audio Test",
    "Concession Lamp test",
    "Gate Test (Sector Door Test)",
    "End Display Test",
    "Sensor Test",
    "Token Slot Test - Bowl Test",
    "Token Slot Test - Left Containet Test",
    "Token Slot Test - Right Containet Test",
    "Token Bowl Test - Light Test",
    "Token Bowl Test - Door Test",
    "Front Door Test",
    "Power Management Unit (PMU) Test",
    "Card Reader Test",
    "Return Cup LED Test",
    "Shutdown",
    "Reboot",
    "Operation Mode Test",
    "Special Mode test",
    "Token Container Test",
    "Gate Mode Test",
    "Check operation and special mode for its default position",
    "Software - SC",
    "Master Push Button",
  ];

  // Handle basic field changes
  const handleBasicFieldChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    
    // Clear field error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle activity input changes (preserve legacy logic exactly)
  const handleInputChange = (workKey, index, key, value = null) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [key]: value !== null ? value : item[key] === "No" ? "Yes" : "No",
        };
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };

  // Handle select all changes (preserve legacy logic exactly) 
  const handleSelectAllChange = (workKey, index, isChecked) => {
    const updatedWorkArray = formValues[workKey].map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item };
        for (let key in updatedItem) {
          if (key.startsWith("G")) {
            updatedItem[key] = isChecked ? "Yes" : "No";
          }
        }
        return updatedItem;
      }
      return item;
    });

    setFormValues({ ...formValues, [workKey]: updatedWorkArray });
  };

  // Calculate completion statistics
  const getActivityStats = (activityIndex) => {
    const activity = formValues.activities[activityIndex];
    const gateKeys = ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"];
    const completedGates = gateKeys.filter(key => activity[key] === "Yes").length;
    return {
      completed: completedGates,
      total: 10,
      percentage: (completedGates / 10) * 100
    };
  };

  const getOverallStats = () => {
    let totalCompleted = 0;
    let totalActivities = labels.length * 10; // 41 activities * 10 gates each
    
    formValues.activities.forEach((activity, index) => {
      if (index < labels.length) {
        const stats = getActivityStats(index);
        totalCompleted += stats.completed;
      }
    });

    return {
      completed: totalCompleted,
      total: totalActivities,
      percentage: Math.round((totalCompleted / totalActivities) * 100)
    };
  };

  // Form validation
  const validatePMForm = () => {
    const newErrors = {};
    
    if (!formValues.stn_name) {
      newErrors.stn_name = "Station name is required";
    }
    if (!formValues.date) {
      newErrors.date = "Date is required";
    }
    if (!formValues.month) {
      newErrors.month = "Month is required";
    }

    // Staff validation
    if (!formValues.staff1_name || formValues.staff1_name === "--") {
      newErrors.staff1_name = "Staff 1 name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission (preserve legacy Redux action exactly)
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validatePMForm()) {
      return;
    }

    setLoading(true);
    try {
      // Use exact same Redux action as legacy form
      await dispatch(addData(formValues));
      navigate("/list");
    } catch (error) {
      setErrors({ submit: 'Error saving PM logbook data.' });
    } finally {
      setLoading(false);
    }
  };

  const overallStats = getOverallStats();

  return (
    <AFCMainlineFormLayout 
      title="AFC Preventive Maintenance (Half Yearly)" 
      onSubmit={handleSubmit}
      loading={loading}
    >
      <Grid container spacing={3}>
        {/* Header Information */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center">
              <MaintenanceIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                <strong>AFC Preventive Maintenance (Half Yearly):</strong> Comprehensive GATE maintenance checklist covering all AFC gate operations and equipment.
              </Typography>
            </Box>
          </Alert>
        </Grid>

        {/* Overall Progress */}
        <Grid item xs={12}>
          <Card elevation={2} sx={{ mb: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Overall Progress</Typography>
                <Chip 
                  icon={<AssessmentIcon />}
                  label={`${overallStats.percentage}% Complete`}
                  color={overallStats.percentage > 80 ? "success" : overallStats.percentage > 50 ? "warning" : "error"}
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={overallStats.percentage} 
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {overallStats.completed} of {overallStats.total} gate checks completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Basic Information */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <UniversalAFCMainlineFormField
                  type="custom-select"
                  name="stn_name"
                  label="STN Name"
                  value={formValues.stn_name}
                  onChange={handleBasicFieldChange}
                  error={errors.stn_name}
                  options={stations
                    .filter((station) => station["Station Name"])
                    .map((station) => ({
                      value: station["STATION Code"],
                      label: station["Station Name"]
                    }))}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <UniversalAFCMainlineFormField
                  type="date"
                  name="date"
                  label="Date"
                  value={formValues.date}
                  onChange={handleBasicFieldChange}
                  error={errors.date}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <UniversalAFCMainlineFormField
                  type="month"
                  name="month"
                  label="Month"
                  value={formValues.month}
                  onChange={handleBasicFieldChange}
                  error={errors.month}
                  required
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Maintenance Activities */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Maintenance Activities ({labels.length} Activities)
            </Typography>
            
            {labels.map((label, index) => {
              const activityStats = getActivityStats(index);
              const activity = formValues.activities[index];
              const isAllSelected = ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"]
                .every((g) => activity[g] === "Yes");

              return (
                <Accordion key={index} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                      <Typography variant="body1" sx={{ mr: 2 }}>
                        <strong>{index + 1}.</strong> {label}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip 
                          size="small"
                          label={`${activityStats.completed}/10`}
                          color={activityStats.completed === 10 ? "success" : "default"}
                        />
                        <LinearProgress 
                          variant="determinate" 
                          value={activityStats.percentage}
                          sx={{ width: 100, height: 6 }}
                        />
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {/* Gate Selection Row */}
                      <Grid item xs={12}>
                        <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                          <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isAllSelected}
                                  onChange={(e) => handleSelectAllChange("activities", index, e.target.checked)}
                                />
                              }
                              label={isAllSelected ? "Uncheck All" : "Check All"}
                            />
                            <Divider orientation="vertical" flexItem />
                            <Typography variant="body2" color="textSecondary">
                              Gate Selection:
                            </Typography>
                          </Box>
                          
                          <FormGroup row>
                            {["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"].map((gateId) => (
                              <FormControlLabel
                                key={gateId}
                                control={
                                  <Checkbox
                                    checked={activity[gateId] === "Yes"}
                                    onChange={() => handleInputChange("activities", index, gateId)}
                                  />
                                }
                                label={gateId}
                              />
                            ))}
                          </FormGroup>
                        </Box>
                      </Grid>

                      {/* Input Fields Row */}
                      <Grid item xs={12} md={4}>
                        <UniversalAFCMainlineFormField
                          type="textarea"
                          name="remark"
                          label="Remarks/Deficiencies"
                          value={activity.remark}
                          onChange={(name, value) => handleInputChange("activities", index, name, value)}
                          rows={2}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <UniversalAFCMainlineFormField
                          type="textarea"
                          name="action"
                          label="Action Taken"
                          value={activity.action}
                          onChange={(name, value) => handleInputChange("activities", index, name, value)}
                          rows={2}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <UniversalAFCMainlineFormField
                          type="textarea"
                          name="deficiency"
                          label="Why Deficiency Could Not Be Rectified"
                          value={activity.deficiency}
                          onChange={(name, value) => handleInputChange("activities", index, name, value)}
                          rows={2}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Paper>
        </Grid>

        {/* Swing Gate Section */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Swing Gate Serviceability</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Check the serviceability and fitment
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <UniversalAFCMainlineFormField
                  type="text"
                  name="sg1"
                  label="SG1"
                  value={formValues.sg1}
                  onChange={handleBasicFieldChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UniversalAFCMainlineFormField
                  type="text"
                  name="sg2"
                  label="SG2"
                  value={formValues.sg2}
                  onChange={handleBasicFieldChange}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Staff Information */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Staff Information</Typography>
            <Grid container spacing={2}>
              {[1, 2, 3].map((staffNum) => (
                <Grid item xs={12} md={4} key={staffNum}>
                  <Card elevation={1}>
                    <CardHeader 
                      title={`Staff ${staffNum}`}
                      titleTypographyProps={{ variant: 'subtitle1' }}
                    />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <UniversalAFCMainlineFormField
                            type="text"
                            name={`staff${staffNum}_name`}
                            label="Name"
                            value={formValues[`staff${staffNum}_name`]}
                            onChange={handleBasicFieldChange}
                            error={errors[`staff${staffNum}_name`]}
                            required={staffNum === 1}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <UniversalAFCMainlineFormField
                            type="text"
                            name={`staff${staffNum}_desg`}
                            label="Designation"
                            value={formValues[`staff${staffNum}_desg`]}
                            onChange={handleBasicFieldChange}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <UniversalAFCMainlineFormField
                            type="text"
                            name={`staff${staffNum}_sign`}
                            label="Signature"
                            value={formValues[`staff${staffNum}_sign`]}
                            onChange={handleBasicFieldChange}
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save PM Logbook'}
            </Button>
          </Box>
        </Grid>

        {/* Form Errors */}
        {errors.submit && (
          <Grid item xs={12}>
            <Alert severity="error">{errors.submit}</Alert>
          </Grid>
        )}
      </Grid>
    </AFCMainlineFormLayout>
  );
};

export default PmLogbookHalfYearlyGateMainlineForm;