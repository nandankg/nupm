import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { submitMonthlyMaintenanceData } from "../redux/slices/maintenanceSlice";

const MonthlyMaintenanceStationForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    station: "",
    date: "",
    systems: [
      {
        system: "PAS",
        activities: [
          {
            activity: "Check announcements at all zones",
            previousValues: Array(5).fill(""),
            afterModification: Array(5).fill(""),
            remarks: "",
          },
          { activity: "Check the working of all microphones", remarks: "" },
          { activity: "SCR Mic", remarks: "" },
          { activity: "PSBT", remarks: "" },
          {
            activity:
              "Check & Record Max CPU and RAM Utilization values in HMI",
            cpu: "",
            ram: "",
            remarks: "",
          },
        ],
      },
      {
        system: "PIDS",
        activities: [
          {
            activity: "Check PIDS functionality by sending test commands",
            remarks: "",
          },
        ],
      },
      {
        system: "FOTS",
        activities: [
          {
            activity: "Verification of signal for main and standby paths",
            remarks: "",
          },
        ],
      },
      {
        system: "CCTV",
        activities: [
          {
            activity: "Check & Record Max CPU and RAM Utilization values",
            cpu: "",
            ram: "",
            remarks: "",
          },
        ],
      },
      {
        system: "Radio",
        activities: [
          { activity: "Verify Tower Aviation lamp status", remarks: "" },
          {
            activity: "Check RSSI level",
            rscpId: "",
            rssiValue: "",
            remarks: "",
          },
        ],
      },
    ],
    supervisor: {
      name: "",
      empId: "",
      signature: "",
    },
    maintainer: {
      name: "",
      empId: "",
      signature: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActivityChange = (systemIndex, activityIndex, field, value) => {
    const updatedSystems = [...formData.systems];
    updatedSystems[systemIndex].activities[activityIndex][field] = value;
    setFormData({ ...formData, systems: updatedSystems });
  };

  const handleArrayChange = (
    systemIndex,
    activityIndex,
    arrayField,
    index,
    value
  ) => {
    const updatedSystems = [...formData.systems];
    updatedSystems[systemIndex].activities[activityIndex][arrayField][index] =
      value;
    setFormData({ ...formData, systems: updatedSystems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitMonthlyMaintenanceData(formData));
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Container className="mt-4">
      <Typography variant="h4" className="text-center mb-4">
        Monthly Maintenance Schedule
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Station"
              name="station"
              value={formData.station}
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
          Systems and Activities
        </Typography>
        <Table className="table mt-3">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>System</strong>
              </TableCell>
              <TableCell>
                <strong>Activity</strong>
              </TableCell>
              <TableCell>
                <strong>Details</strong>
              </TableCell>
              <TableCell>
                <strong>Remarks</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.systems.map((system, systemIndex) =>
              system.activities.map((activity, activityIndex) => (
                <TableRow key={`${systemIndex}-${activityIndex}`}>
                  <TableCell>
                    {activityIndex === 0 ? system.system : ""}
                  </TableCell>
                  <TableCell>{activity.activity}</TableCell>
                  <TableCell>
                    {activity.previousValues && (
                      <>
                        <Typography>
                          <strong>Previous Values:</strong>
                        </Typography>
                        {activity.previousValues.map((value, index) => (
                          <TextField
                            key={index}
                            label={`Zone ${index + 1}`}
                            value={value}
                            onChange={(e) =>
                              handleArrayChange(
                                systemIndex,
                                activityIndex,
                                "previousValues",
                                index,
                                e.target.value
                              )
                            }
                            size="small"
                            fullWidth
                            className="mb-2"
                          />
                        ))}
                        <Typography>
                          <strong>After Modification:</strong>
                        </Typography>
                        {activity.afterModification.map((value, index) => (
                          <TextField
                            key={index}
                            label={`Zone ${index + 1}`}
                            value={value}
                            onChange={(e) =>
                              handleArrayChange(
                                systemIndex,
                                activityIndex,
                                "afterModification",
                                index,
                                e.target.value
                              )
                            }
                            size="small"
                            fullWidth
                            className="mb-2"
                          />
                        ))}
                      </>
                    )}
                    {activity.cpu !== undefined && (
                      <>
                        <TextField
                          label="CPU (%)"
                          value={activity.cpu}
                          onChange={(e) =>
                            handleActivityChange(
                              systemIndex,
                              activityIndex,
                              "cpu",
                              e.target.value
                            )
                          }
                          size="small"
                          fullWidth
                          className="mb-2"
                        />
                        <TextField
                          label="RAM (%)"
                          value={activity.ram}
                          onChange={(e) =>
                            handleActivityChange(
                              systemIndex,
                              activityIndex,
                              "ram",
                              e.target.value
                            )
                          }
                          size="small"
                          fullWidth
                        />
                      </>
                    )}
                    {activity.rscpId !== undefined && (
                      <>
                        <TextField
                          label="RSCP ID"
                          value={activity.rscpId}
                          onChange={(e) =>
                            handleActivityChange(
                              systemIndex,
                              activityIndex,
                              "rscpId",
                              e.target.value
                            )
                          }
                          size="small"
                          fullWidth
                          className="mb-2"
                        />
                        <TextField
                          label="RSSI Value (dBm)"
                          value={activity.rssiValue}
                          onChange={(e) =>
                            handleActivityChange(
                              systemIndex,
                              activityIndex,
                              "rssiValue",
                              e.target.value
                            )
                          }
                          size="small"
                          fullWidth
                        />
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={activity.remarks}
                      onChange={(e) =>
                        handleActivityChange(
                          systemIndex,
                          activityIndex,
                          "remarks",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Typography variant="h6" className="mt-4">
          Supervisor Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              label="Name"
              name="supervisorName"
              value={formData.supervisor.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  supervisor: { ...formData.supervisor, name: e.target.value },
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Emp ID"
              name="supervisorEmpId"
              value={formData.supervisor.empId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  supervisor: { ...formData.supervisor, empId: e.target.value },
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Signature"
              name="supervisorSignature"
              value={formData.supervisor.signature}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  supervisor: {
                    ...formData.supervisor,
                    signature: e.target.value,
                  },
                })
              }
              fullWidth
            />
          </Grid>
        </Grid>

        <Typography variant="h6" className="mt-4">
          Maintainer Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              label="Name"
              name="maintainerName"
              value={formData.maintainer.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maintainer: { ...formData.maintainer, name: e.target.value },
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Emp ID"
              name="maintainerEmpId"
              value={formData.maintainer.empId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maintainer: { ...formData.maintainer, empId: e.target.value },
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Signature"
              name="maintainerSignature"
              value={formData.maintainer.signature}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maintainer: {
                    ...formData.maintainer,
                    signature: e.target.value,
                  },
                })
              }
              fullWidth
            />
          </Grid>
        </Grid>

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

export default MonthlyMaintenanceStationForm;
