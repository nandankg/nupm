// MaintenanceForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import stationData from "../../station.json";
import {
  Container,
  Typography,
  Grid,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Checkbox,
  Select,
  MenuItem,
} from '@mui/material';

import { addData } from '../../reducer/redux/tableDataSlice' // Adjust the import path
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}
const PmStationQuarterlyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const [slug, setSlug] = useState(getLastParameter().trim());
  const [formData, setFormData] = useState({
    station: '',
    date: '',
    systems: [
      {
        name: 'PAS',
        activities: [
          { id: 1, label: '1. Checking of HMI functionalities', done: false, remark: '' },
          { id: 2, label: '1 a) Making Live announcements', done: false, hmiNormal: '', remark: '' },
          { id: 3, label: '1 b) Message recording, preview and announcement: HMI Emergency', done: false, hmiEmergency: '', remark: '' },
          { id: 4, label: '1 c) Message Scheduling & Repetition:', done: false, remark: '' },
          { id: 5, label: '2) Check message origin status in HMI', done: false, remark: '' },
          { id: 6, label: '3) Cleaning of all ANS as per the recommendation', done: false, remark: '' },
          { id: 7, label: '4) External cleaning of speakers at all Zones', done: false, remark: '' },
          { id: 8, label: '5) Perform disk defragmentation and restart HMI', done: false, remark: '' },
          { id: 9, label: '6) Cleaning of external surface of display boards', done: false, remark: '' },
          { id: 10, label: '7) login individual SWs for Alarms', done: false, remark: '' },
        ],
      },
      {
        name: 'PIDS',
        activities: [{ id: 1, label: '1) Cleaning of external surface of display boards', done: false, remark: '' }],
      },
      {
        name: 'FOTS',
        activities: [
          { id: 1, label: '1) Check Redundant power supply status of DSW', done: false, remark: '' },
          { id: 2, label: '2) Checking of Power Supply Voltage on back panel of Media Gateway (45Vdc to 57Vdc)', done: false, remark: '' },
        ],
      },
      {
        name: 'Tele-Phone',
        activities: [
          { id: 1, label: '1) Testing of Emergency telephone in tunnel', done: false, remark: '' },
          { id: 2, label: '2) Physical inspection of IDF & MDF', done: false, remark: '' },
          { id: 3, label: '3) External cleaning of all Platform monitors', done: false, remark: '' },
        ],
      },
      {
        name: 'CCTV',
        activities: [
          { id: 1, label: '1) Check for Focusing & alignment of all cameras in Platform, Concourse, Staff & Entry/Exit Areas', done: false, remark: '' },
          { id: 2, label: '2) Check Record CPU and RAM Utilization values in NVR (shall be <80%)', done: false, cpu: '', ram: '', remark: '' },
          { id: 3, label: '3) Check network ping test of MCL, K & SMCLK', done: false, remark: '' },
          { id: 4, label: '4) Voltage Measurements at data SPDS (Terminal block output to measure)', done: false, voltage: '', remark: '' },
        ],
      },
      {
        name: 'Clock',
        activities: [
          { id: 1, label: '1) Check the tightness of nuts which holds the clocks (Platform)', done: false, remark: '' },
          { id: 2, label: '2) Check for Correctness/tightness of MCBs', done: false, remark: '' },
        ],
      },
      {
        name: 'ACDB',
        activities: [{ id: 1, label: '1) Measure the Output Voltages and observe for any Abnormalities', done: false, remark: '' }],
      },
      {
        name: 'ACS',
        activities: [{ id: 1, label: '1) Verify the Buzzer functioning', done: false, remark: '' }],
      },
      {
        name: 'UPS',
        activities: [{ id: 1, label: '1) Load Test of Battery Bank-1 & Battery Bank-2', done: false, remark: '' }],
      },
      {
        name: 'SMPS',
        activities: [{ id: 1, label: '1) Load Test of Battery Bank-1 & Battery Bank-2', done: false, remark: '' }],
      },
    ],
    notes: '',
    SName:'',
    SempId:'',
    SdateTime:'',
    MName: '',
    MempId: '',
    MdateTime:'',
    
  });

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSystemChange = (systemIndex, activityIndex, field, value) => {
    setFormData((prev) => {
      const updatedSystems = [...prev.systems];
      updatedSystems[systemIndex].activities[activityIndex] = {
        ...updatedSystems[systemIndex].activities[activityIndex],
        [field]: value,
      };
      return { ...prev, systems: updatedSystems };
    });
  };

  const handleActivityCheck = (systemIndex, activityIndex, checked) => {
    setFormData((prev) => {
      const updatedSystems = [...prev.systems];
      updatedSystems[systemIndex].activities[activityIndex] = {
        ...updatedSystems[systemIndex].activities[activityIndex],
        done: checked,
      };
      return { ...prev, systems: updatedSystems };
    });
  };

  const handleCheckAll = (systemIndex, checked) => {
    setFormData((prev) => {
      const updatedSystems = [...prev.systems];
      updatedSystems[systemIndex].activities = updatedSystems[systemIndex].activities.map((activity) => ({
        ...activity,
        done: checked,
      }));
      return { ...prev, systems: updatedSystems };
    });
  };

  const handlePersonnelChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addData({formType:slug,values:formData}));
          console.log("Form Data Submitted:", formData);
          navigate(`/list/${slug}`);
     
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        QUARTERLY MAINTENANCE SCHEDULE
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
        DOC: Annexure-III, Version: 1.0 | DOCUMENT_NO: 08/M/Tele/CHO2
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={4}>
        <Select
            label="Station"
            name="station"
            value={formData.station}
            onChange={handleBasicInfoChange}
            fullWidth
            displayEmpty
            renderValue={(value) => value || 'Select Station'}
          >
            <MenuItem value="" disabled>
              Select Station
            </MenuItem>
            {stationData
                    .filter((station) => station["Station Name"]) // Exclude entries with null station names
                    .map((station) => (
              <MenuItem key={station["STATION Code"]}
              value={station["Station Name"]}>
                {station["Station Name"]}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleBasicInfoChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="DOC"
            value="Annexure-III, Version: 1.0"
            disabled
            fullWidth
          />
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>System</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell>Done</TableCell>
            <TableCell>Remarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formData.systems.map((system, systemIndex) => (
            <React.Fragment key={systemIndex}>
              <TableRow>
                <TableCell colSpan={4}>
                  <Checkbox
                    checked={system.activities.every((activity) => activity.done)}
                    onChange={(e) => handleCheckAll(systemIndex, e.target.checked)}
                  />
                  {system.name} - Check All
                </TableCell>
              </TableRow>
              {system.activities.map((activity, activityIndex) => (
                <TableRow key={`${systemIndex}-${activityIndex}`}>
                  <TableCell>{activityIndex === 0 ? system.name : ''}</TableCell>
                  <TableCell>{activity.label}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={activity.done || false}
                      onChange={(e) => handleActivityCheck(systemIndex, activityIndex, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    {activity.hmiNormal && (
                      <TextField
                        label="HMI Normal"
                        value={activity.hmiNormal}
                        onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'hmiNormal', e.target.value)}
                        size="small"
                        sx={{ mr: 2 }}
                      />
                    )}
                    {activity.hmiEmergency && (
                      <TextField
                        label="HMI Emergency"
                        value={activity.hmiEmergency}
                        onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'hmiEmergency', e.target.value)}
                        size="small"
                        sx={{ mr: 2 }}
                      />
                    )}
                    {activity.cpu && (
                      <TextField
                        label="CPU"
                        value={activity.cpu}
                        onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'cpu', e.target.value)}
                        size="small"
                        sx={{ mr: 2 }}
                      />
                    )}
                    {activity.ram && (
                      <TextField
                        label="RAM"
                        value={activity.ram}
                        onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'ram', e.target.value)}
                        size="small"
                        sx={{ mr: 2 }}
                      />
                    )}
                    {activity.voltage && (
                      <TextField
                        label="Voltage"
                        value={activity.voltage}
                        onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'voltage', e.target.value)}
                        size="small"
                        sx={{ mr: 2 }}
                      />
                    )}
                    <TextField
                      value={activity.remark}
                      onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'remark', e.target.value)}
                      fullWidth
                      multiline
                    />
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      <TextField
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleBasicInfoChange}
        fullWidth
        multiline
        rows={3}
        sx={{ mt: 4, mb: 2 }}
      />

      <Typography variant="h6" sx={{ mt: 4 }}>Personnel</Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <TextField
            label="Supervisor Name"
              name="SName"
            value={formData.SName}
            onChange={handleBasicInfoChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Supervisor Emp ID"
            name="SempId"
            value={formData.SempId}
            onChange={handleBasicInfoChange}
            fullWidth
          />
        </Grid>
       
        <Grid item xs={6}>
          <TextField
            label="Supervisor Date & Time"
            type="datetime-local"
            name="SdateTime"
            value={formData.SdateTime}
            onChange={handleBasicInfoChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Maintainer Name"
             name="MName"
            value={formData.MName}
            onChange={handleBasicInfoChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Maintainer Emp ID"
            name="MempId"
            value={formData.MempId}
            onChange={handleBasicInfoChange}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={6}>
          <TextField
            label="Maintainer Date & Time"
            type="datetime-local"
              name="MdateTime"
            value={formData.MdateTime}
            onChange={handleBasicInfoChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 4, mb: 4 }}
      >
        Save
      </Button>
    </Container>
  );
};

export default PmStationQuarterlyForm;