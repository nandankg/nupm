import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
// import "bootstrap/dist/css/bootstrap.min.css";
import { addData } from "../../reducer/redux/tableDataSlice";
import stationData from "../../station.json";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const UpsMaintenanceForm = () => {
   const navigate = useNavigate();
  const dispatch = useDispatch();
const [slug, setSlug] = useState(getLastParameter().trim());
  const [formData, setFormData] = useState({
    station: "",
    month: "",
    date: "",
    additionalData: {
      averageTemp: "",
      chargingCurrentAfterLoadTest: "",
      batteryTerminalsCleaned: "",
      looseConnectionChecked: "",
      cellLeakageChecked: "",
      loadDuringTestUPS1: {
        U: "",
        V: "",
        W: "",
      },
      loadDuringTestUPS2: {
        U: "",
        V: "",
        W: "",
      },
      batteryVoltageBeforeLoadTest: "",
      batteryVoltageAfterLoadTest: "",
      batteryChargePercentage: "",
    },
    rows: [
      {
        cellNo: Array.from({ length: 18 }, () => ""),
        onFloatVoltage: Array.from({ length: 18 }, () => ""),
        initialReadingOnLoad: Array.from({ length: 18 }, () => ""),
        after1Point5Hours: Array.from({ length: 18 }, () => ""),
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdditionalDataChange = (name, value) => {
    setFormData({
      ...formData,
      additionalData: {
        ...formData.additionalData,
        [name]: value,
      },
    });
  };

  const handleNestedDataChange = (parent, key, value) => {
    setFormData({
      ...formData,
      additionalData: {
        ...formData.additionalData,
        [parent]: {
          ...formData.additionalData[parent],
          [key]: value,
        },
      },
    });
  };

  const handleRowChange = (rowIndex, field, colIndex, value) => {
    const updatedRows = [...formData.rows];
    updatedRows[rowIndex][field][colIndex] = value;
    setFormData({ ...formData, rows: updatedRows });
  };

  const handleAddRow = () => {
    setFormData({
      ...formData,
      rows: [
        ...formData.rows,
        {
          cellNo: Array.from({ length: 18 }, () => ""),
          onFloatVoltage: Array.from({ length: 18 }, () => ""),
          initialReadingOnLoad: Array.from({ length: 18 }, () => ""),
          after1Point5Hours: Array.from({ length: 18 }, () => ""),
        },
      ],
    });
  };
  let tr = 0;
  console.log(formData)
  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(addData({formType:slug,values:formData}));
       console.log("Form Data Submitted:", formData);
       navigate(`/list/${slug}`);
  };

  return (
    <Container className="mt-4">
      <Typography variant="h4" className="mb-4 text-center">
        UPS System Maintenance Record
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <select
              className="form-control"
              id="inputstation"
              value={formData.station}
              onChange={(e) =>
                setFormData({ ...formData, station: e.target.value })
              }
              required
            >
              <option value="">Select Station</option>
              {stationData
                .filter((station) => station["Station Name"]) // Exclude entries with null station names
                .map((station) => (
                  <option
                    key={station["STATION Code"]}
                    value={station["Station Name"]}
                  >
                    {station["Station Name"]}
                  </option>
                ))}
            </select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Month"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
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

        <Typography variant="h6" className="mt-4">
          Additional Data
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Average Temp"
              name="averageTemp"
              value={formData.additionalData.averageTemp}
              onChange={(e) =>
                handleAdditionalDataChange("averageTemp", e.target.value)
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Charging Current After Load Test"
              name="chargingCurrentAfterLoadTest"
              value={formData.additionalData.chargingCurrentAfterLoadTest}
              onChange={(e) =>
                handleAdditionalDataChange(
                  "chargingCurrentAfterLoadTest",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Battery Terminals Cleaned"
              name="batteryTerminalsCleaned"
              value={formData.additionalData.batteryTerminalsCleaned}
              onChange={(e) =>
                handleAdditionalDataChange(
                  "batteryTerminalsCleaned",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Loose Connection Checked"
              name="looseConnectionChecked"
              value={formData.additionalData.looseConnectionChecked}
              onChange={(e) =>
                handleAdditionalDataChange(
                  "looseConnectionChecked",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cell Leakage Checked"
              name="cellLeakageChecked"
              value={formData.additionalData.cellLeakageChecked}
              onChange={(e) =>
                handleAdditionalDataChange("cellLeakageChecked", e.target.value)
              }
              fullWidth
            />
          </Grid>
        </Grid>

        <Typography variant="h6" className="mt-4">
          Load During Test UPS1
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              label="U"
              name="U"
              value={formData.additionalData.loadDuringTestUPS1.U}
              onChange={(e) =>
                handleNestedDataChange(
                  "loadDuringTestUPS1",
                  "U",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="V"
              name="V"
              value={formData.additionalData.loadDuringTestUPS1.V}
              onChange={(e) =>
                handleNestedDataChange(
                  "loadDuringTestUPS1",
                  "V",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="W"
              name="W"
              value={formData.additionalData.loadDuringTestUPS1.W}
              onChange={(e) =>
                handleNestedDataChange(
                  "loadDuringTestUPS1",
                  "W",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>
        </Grid>

        <Typography variant="h6" className="mt-4">
          Load During Test UPS2
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              label="U"
              name="U"
              value={formData.additionalData.loadDuringTestUPS2.U}
              onChange={(e) =>
                handleNestedDataChange(
                  "loadDuringTestUPS2",
                  "U",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="V"
              name="V"
              value={formData.additionalData.loadDuringTestUPS2.V}
              onChange={(e) =>
                handleNestedDataChange(
                  "loadDuringTestUPS2",
                  "V",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="W"
              name="W"
              value={formData.additionalData.loadDuringTestUPS2.W}
              onChange={(e) =>
                handleNestedDataChange(
                  "loadDuringTestUPS2",
                  "W",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>
        </Grid>

        <Typography variant="h6" className="mt-4">
          Battery Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Battery Voltage Before Load Test"
              name="batteryVoltageBeforeLoadTest"
              value={formData.additionalData.batteryVoltageBeforeLoadTest}
              onChange={(e) =>
                handleAdditionalDataChange(
                  "batteryVoltageBeforeLoadTest",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Battery Voltage After Load Test"
              name="batteryVoltageAfterLoadTest"
              value={formData.additionalData.batteryVoltageAfterLoadTest}
              onChange={(e) =>
                handleAdditionalDataChange(
                  "batteryVoltageAfterLoadTest",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Battery Charge %"
              name="batteryChargePercentage"
              value={formData.additionalData.batteryChargePercentage}
              onChange={(e) =>
                handleAdditionalDataChange(
                  "batteryChargePercentage",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>
        </Grid>

        <Table className="table mt-4">
          <TableHead>
            <TableRow>
              <TableCell>Row Type</TableCell>
              {Array.from({ length: 18 }, (_, i) => (
                <TableCell key={i + 1}>Cell {i + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.rows.map((row, rowIndex) => (
              <>
                <TableRow key={`onFloatVoltage-${rowIndex}`}>
                  <TableCell>ON FLOAT (VOLTAGE)</TableCell>
                  {row.onFloatVoltage.map((value, colIndex) => (
                    <TableCell key={colIndex}>
                      <TextField
                        value={value}
                        onChange={(e) =>
                          handleRowChange(
                            rowIndex,
                            "onFloatVoltage",
                            colIndex,
                            e.target.value
                          )
                        }
                        size="small"
                        variant="outlined"
                        placeholder={`${colIndex + 1 + 18 * rowIndex}`}
                      />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow key={`initialReadingOnLoad-${rowIndex}`}>
                  <TableCell>INITIAL READING (ON LOAD)</TableCell>
                  {row.initialReadingOnLoad.map((value, colIndex) => (
                    <TableCell key={colIndex}>
                      <TextField
                        value={value}
                        onChange={(e) =>
                          handleRowChange(
                            rowIndex,
                            "initialReadingOnLoad",
                            colIndex,
                            e.target.value
                          )
                        }
                        size="small"
                        variant="outlined"
                        placeholder={`${colIndex + 1 + 18 * rowIndex}`}
                      />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow key={`after1Point5Hours-${rowIndex}`}>
                  <TableCell>AFTER 1.5 HRS (ON LOAD)</TableCell>
                  {row.after1Point5Hours.map((value, colIndex) => (
                    <TableCell key={colIndex}>
                      <TextField
                        value={value}
                        onChange={(e) =>
                          handleRowChange(
                            rowIndex,
                            "after1Point5Hours",
                            colIndex,
                            e.target.value
                          )
                        }
                        size="small"
                        variant="outlined"
                        placeholder={`${colIndex + 1 + 18 * rowIndex}`}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddRow}
          className="mt-3"
        >
          Add Row
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-3 ms-3"
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default UpsMaintenanceForm;
