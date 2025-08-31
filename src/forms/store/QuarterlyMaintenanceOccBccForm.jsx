import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
// import "bootstrap/dist/css/bootstrap.min.css";
import { addData } from "../../reducer/redux/tableDataSlice";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const QuarterlyMaintenanceOccBccForm = () => {
   const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkAll, setCheckAll] = useState(false);
const [slug, setSlug] = useState(getLastParameter().trim());
  const [formData, setFormData] = useState({
    location: "",
    date: "",
    systems: [
      {
        system: "PAS",
        activities: [
          { activity: "Checking of HMI functionalities", remarks: "" },
          {
            activity: "Making Live HMI Normal announcements",
            hmiNormal: "",
            hmiEmergency: "",
          },
          { activity: "Message preview and announcement", remarks: "" },
          { activity: "Message Scheduling & Repetition: ", remarks: "" },
          { activity: "Check message origin status in HMI ", remarks: "" },
          {
            activity: "Perform disk defragmentation and restart HMI. ",
            remarks: "",
          },
        ],
      },
      {
        system: "FOTS",
        activities: [
          {
            activity: "Checking the switching of Normal to standby path",
            remarks: "",
          },
          { activity: "Cleaning of Internal Fans", remarks: "" },
          { activity: "Check redundancy at EPSR level ", remarks: "" },
          { activity: "Perform Disk Defragmentation and Restart NMS", remarks: "" },
          { activity: " Perform Disk Defragmentation and Restart Server", remarks: "" },
        ],
      },
      {
        system: "TelePhone",
        activities: [
          { activity: "Perform disk deframentation and All telephone/CDRS Sever", remarks: "" },
          { activity: "Preform redundancy checks on IPMAX-2(CPUs)", remarks: "" },
          { activity: "Checking of Power Supply Voltage on Back panel of Media Gatway (45Vdc to -57Vdc)", voltage: "", remarks: "" },
          { activity: "Check and Record maximum CPU and RAM Utilization Values in All  telephone server", remarks: "" },
        ],
      },
      {
        system: "CCTV",
        activities: [
          {
            activity: "Check and record maximum CPU and RAM utilization",
            clstr: { cpu: "", ram: "" },
            entz: { cpu: "", ram: "" },
            bvms1: { cpu: "", ram: "" },
            bvms2: { cpu: "", ram: "" },
            remarks: "",
          },
          { activity: "Perform disk defragmentation and Restart HMIs", remarks: "" },
        ],
      },
      {
        system: "Clock",
        activities: [
          { activity: "External Cleaning of Digital clocks and check for synchronization", remarks: "" },
          { activity: "Check network ping test of MCLK", remarks: "" },
          { activity: "Voltage Measurements at data SPD/Terminal block output to measureTime Code Signal (shall be >24Vdc.) ", Vdc: "", remarks: "" },
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

  const handleNestedChange = (
    systemIndex,
    activityIndex,
    field,
    subField,
    value
  ) => {
    const updatedSystems = [...formData.systems];
    updatedSystems[systemIndex].activities[activityIndex][field][subField] =
      value;
    setFormData({ ...formData, systems: updatedSystems });
  };
  const toggleCheckAll = () => {
    setCheckAll(!checkAll);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addData({formType:slug,values:formData}));
    console.log("Form Data Submitted:", formData);
    navigate(`list/${slug}`);
  };

  return (
    <Container className="mt-4">
      <Typography variant="h4" className="text-center mb-4">
        Quarterly Maintenance Schedule
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
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
              
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input" checked={checkAll} onChange={toggleCheckAll} /> Check All
          </label>
          
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
                    {system.system === "PAS" &&
                      activity.hmiNormal !== undefined && (
                        <>
                          <TextField
                            label="HMI Normal"
                            value={activity.hmiNormal}
                            onChange={(e) =>
                              handleActivityChange(
                                systemIndex,
                                activityIndex,
                                "hmiNormal",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                          <TextField
                            label="HMI Emergency"
                            value={activity.hmiEmergency}
                            onChange={(e) =>
                              handleActivityChange(
                                systemIndex,
                                activityIndex,
                                "hmiEmergency",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                        </>
                      )}
                    {system.system === "TelePhone" &&
                      activity.voltage !== undefined && (
                        <TextField
                          label="Voltage (Vdc)"
                          value={activity.voltage}
                          onChange={(e) =>
                            handleActivityChange(
                              systemIndex,
                              activityIndex,
                              "voltage",
                              e.target.value
                            )
                          }
                          size="small"
                        />
                      )}
                    {system.system === "CCTV" &&
                      activity.clstr !== undefined && (
                        <>
                          <TextField
                            label="CLSTR: CPU"
                            value={activity.clstr.cpu}
                            onChange={(e) =>
                              handleNestedChange(
                                systemIndex,
                                activityIndex,
                                "clstr",
                                "cpu",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                          <TextField
                            label="CLSTR: RAM"
                            value={activity.clstr.ram}
                            onChange={(e) =>
                              handleNestedChange(
                                systemIndex,
                                activityIndex,
                                "clstr",
                                "ram",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                          <TextField
                            label="ENTZ: CPU"
                            value={activity.entz.cpu}
                            onChange={(e) =>
                              handleNestedChange(
                                systemIndex,
                                activityIndex,
                                "entz",
                                "cpu",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                          <TextField
                            label="ENTZ: RAM"
                            value={activity.entz.ram}
                            onChange={(e) =>
                              handleNestedChange(
                                systemIndex,
                                activityIndex,
                                "entz",
                                "ram",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                          <TextField
                            label="BVMS-1: CPU"
                            value={activity.bvms1.cpu}
                            onChange={(e) =>
                              handleNestedChange(
                                systemIndex,
                                activityIndex,
                                "bvms1",
                                "cpu",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                          <TextField
                            label="BVMS-1: RAM"
                            value={activity.bvms1.ram}
                            onChange={(e) =>
                              handleNestedChange(
                                systemIndex,
                                activityIndex,
                                "bvms1",
                                "ram",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                          <TextField
                            label="BVMS-2: CPU"
                            value={activity.bvms2.cpu}
                            onChange={(e) =>
                              handleNestedChange(
                                systemIndex,
                                activityIndex,
                                "bvms2",
                                "cpu",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                          <TextField
                            label="BVMS-2: RAM"
                            value={activity.bvms2.ram}
                            onChange={(e) =>
                              handleNestedChange(
                                systemIndex,
                                activityIndex,
                                "bvms2",
                                "ram",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                        </>
                      )}
                  </TableCell>
                  <TableCell>

                   <input
                  type="checkbox"
                  className="form-check-input"
                  checked={checkAll || formData[system]?.[activity] !== undefined}
                  onChange={(e) => handleInputChange(system, activity, e.target.checked ? "Checked" : "")}
                />
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

export default QuarterlyMaintenanceOccBccForm;
