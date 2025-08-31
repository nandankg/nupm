import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Grid,
} from "@mui/material";

const QuarterlyMaintenanceForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    station: "",
    date: "",
    supervisorName: "",
    supervisorEmpID: "",
    maintainerName: "",
    maintainerEmpID: "",
    notes: "",
    systems: [
      { system: "PAS", activity: "", remarks: "" },
      { system: "FOTS", activity: "", remarks: "" },
      { system: "Tele Phone", activity: "", remarks: "" },
      { system: "CCTV", activity: "", remarks: "" },
      { system: "Clock", activity: "", remarks: "" },
      { system: "Radio", activity: "", remarks: "" },
      { system: "ACDB", activity: "", remarks: "" },
      { system: "ACS", activity: "", remarks: "" },
      { system: "Video Wall", activity: "", remarks: "" },
      { system: "UPS", activity: "", remarks: "" },
      { system: "SMPS", activity: "", remarks: "" },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSystemChange = (index, field, value) => {
    const updatedSystems = [...formData.systems];
    updatedSystems[index][field] = value;
    setFormData({ ...formData, systems: updatedSystems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(submitMaintenanceData(formData)); // Dispatch the data to the Redux slice
    console.log("Form submitted:", formData);
  };

  return (
    <Container className="mt-4">
      <Typography variant="h4" className="mb-4 text-center">
        Quarterly Maintenance Schedule
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Station"
              name="station"
              value={formData.station}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
        </Grid>

        <Table className="table mt-4">
          <TableHead>
            <TableRow>
              <TableCell>System</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.systems.map((system, index) => (
              <TableRow key={index}>
                <TableCell>{system.system}</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={system.activity}
                    onChange={(e) =>
                      handleSystemChange(index, "activity", e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={system.remarks}
                    onChange={(e) =>
                      handleSystemChange(index, "remarks", e.target.value)
                    }
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Grid container spacing={3} className="mt-4">
          <Grid item xs={12} md={6}>
            <TextField
              label="Supervisor Name"
              name="supervisorName"
              value={formData.supervisorName}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Supervisor EMP ID"
              name="supervisorEmpID"
              value={formData.supervisorEmpID}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Maintainer Name"
              name="maintainerName"
              value={formData.maintainerName}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Maintainer EMP ID"
              name="maintainerEmpID"
              value={formData.maintainerEmpID}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <TextField
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          className="mt-4"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4"
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default QuarterlyMaintenanceForm;
