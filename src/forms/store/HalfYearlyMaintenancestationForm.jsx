// HalfYearlyMaintenanceForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';

import { addData } from '../../reducer/redux/tableDataSlice'; // Adjust the import path

const HalfYearlyMaintenancestationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    station: '',
    date: '',
    systems: [
      {
        name: 'PAS',
        activities: [
          {
            id: 1,
            label: '1. Checking the NCO, QSC and amplifier switch-over process',
            zone: { value: '', checked: false },
            done: false,
            remark: '',
          },
          {
            id: 2,
            label: '1. Check if Emergency message overrides Normal messages',
            zone: { value: '', checked: false },
            done: false,
            remark: '',
          },
        ],
      },
      {
        name: 'PIDS',
        activities: [
          {
            id: 1,
            label: '1. Checking the switching of Normal to standby path and vice-versa station level',
            done: false,
            remark: '',
          },
          {
            id: 2,
            label: '2. Cleaning of internal Fans',
            done: false,
            remark: '',
          },
        ],
      },
      {
        name: 'FOTS',
        activities: [
          {
            id: 1,
            label: '3. Check stacking status of DW switches',
            done: false,
            remark: '',
          },
        ],
      },
      {
        name: 'CCTV',
        activities: [
          {
            id: 1,
            label: '1. Physical inspection of all equipment in TER and SCR',
            done: false,
            remark: '',
          },
          {
            id: 2,
            label: '2. Inspection of Platform monitors internal modules',
            done: false,
            remark: '',
          },
          {
            id: 3,
            label: '3. Perform Defragmentation of Windows drives in NVR',
            done: false,
            remark: '',
          },
          {
            id: 4,
            label: '4. Perform disk defragmentation and restart HMI',
            done: false,
            remark: '',
          },
        ],
      },
      {
        name: 'Clock',
        activities: [
          {
            id: 1,
            label: '1. Cleaning of Racks and checking of all connections (Do not remove any connections)',
            done: false,
            remark: '',
          },
          {
            id: 2,
            label: '2. Check Data Circuit',
            done: false,
            remark: '',
          },
        ],
      },
      {
        name: 'Radio',
        activities: [
          {
            id: 1,
            label: '1. Inspection of all RF Connections',
            done: false,
            remark: '',
          },
        ],
      },
      {
        name: 'TELEPHONE',
        activities: [
          {
            id: 1,
            label: '1. Physical inspection of all equipment in TER and SCR',
            done: false,
            remark: '',
          },
          {
            id: 2,
            label: '2. Verify the call from IPBX to EPBX and vice-versa',
            done: false,
            remark: '',
          },
          {
            id: 3,
            label: '3. Verify the interface with CCTV to Help Phone',
            done: false,
            remark: '',
          },
        ],
      },
      {
        name: 'ACS',
        activities: [
          {
            id: 1,
            label: '1. Physical inspection of all AMC',
            done: false,
            remark: '',
          },
          {
            id: 2,
            label: '2. Verify the interface with Fire',
            done: false,
            remark: '',
          },
          {
            id: 3,
            label: '3. Verify interface with CCTV',
            done: false,
            remark: '',
          },
        ],
      },
      {
        name: 'OAT',
        activities: [
          {
            id: 1,
            label: '1. Checking the switching of Normal to standby path and vice-versa station level',
            done: false,
            remark: '',
          },
        ],
      },
      {
        name: 'Mics',
        activities: [
          {
            id: 1,
            label: '1. Check labelling of all cables inside each Rack',
            done: false,
            remark: '',
          },
          {
            id: 2,
            label: '2. Check status of Locks of Telecom Racks, Equipments at TER, UPS, Concourse & PF level',
            done: false,
            remark: '',
          },
        ],
      },
    ],
    notes: '',
    supervisor: { name: '', empId: '', signature: '', dateTime: '' },
    maintainer: { name: '', empId: '', signature: '', dateTime: '' },
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

  const handleZoneChange = (systemIndex, activityIndex, value) => {
    setFormData((prev) => {
      const updatedSystems = [...prev.systems];
      updatedSystems[systemIndex].activities[activityIndex] = {
        ...updatedSystems[systemIndex].activities[activityIndex],
        zone: { ...updatedSystems[systemIndex].activities[activityIndex].zone, value },
      };
      return { ...prev, systems: updatedSystems };
    });
  };

  const handleZoneCheck = (systemIndex, activityIndex, checked) => {
    setFormData((prev) => {
      const updatedSystems = [...prev.systems];
      updatedSystems[systemIndex].activities[activityIndex] = {
        ...updatedSystems[systemIndex].activities[activityIndex],
        zone: { ...updatedSystems[systemIndex].activities[activityIndex].zone, checked },
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
        zone: { ...activity.zone, checked },
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
      dispatch(addData(formData));
    
      navigate('/halfyearly-maintenance-list'); // Adjust route as needed
      alert('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        HALF YEARLY MAINTENANCE SCHEDULE
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
        DOC: Annexure-III, Version: 1.0 | DOCUMENT_NO: 08/M/Tele/CHO3
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={4}>
          <TextField
            label="Station"
            name="station"
            value={formData.station}
            onChange={handleBasicInfoChange}
            fullWidth
          />
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
            {formData.systems[0].activities[0].zone && <TableCell>Zone</TableCell>}
            <TableCell>Remarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formData.systems.map((system, systemIndex) => (
            <React.Fragment key={systemIndex}>
              <TableRow>
                <TableCell colSpan={5}>
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
                  {activity.zone && (
                    <TableCell>
                      <Checkbox
                        checked={activity.zone.checked || false}
                        onChange={(e) => handleZoneCheck(systemIndex, activityIndex, e.target.checked)}
                      />
                      <TextField
                        value={activity.zone.value || ''}
                        onChange={(e) => handleZoneChange(systemIndex, activityIndex, e.target.value)}
                        size="small"
                        sx={{ mr: 2, width: '100px' }}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <TextField
                      value={activity.remark || ''}
                      onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'remark', e.target.value)}
                      fullWidth
                      multiline
                      rows={2}
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
            value={formData.supervisor.name}
            onChange={(e) => handlePersonnelChange('supervisor', 'name', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Supervisor Emp ID"
            value={formData.supervisor.empId}
            onChange={(e) => handlePersonnelChange('supervisor', 'empId', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Supervisor Signature"
            value={formData.supervisor.signature}
            onChange={(e) => handlePersonnelChange('supervisor', 'signature', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Supervisor Date & Time"
            type="datetime-local"
            value={formData.supervisor.dateTime}
            onChange={(e) => handlePersonnelChange('supervisor', 'dateTime', e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Maintainer Name"
            value={formData.maintainer.name}
            onChange={(e) => handlePersonnelChange('maintainer', 'name', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Maintainer Emp ID"
            value={formData.maintainer.empId}
            onChange={(e) => handlePersonnelChange('maintainer', 'empId', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Maintainer Signature"
            value={formData.maintainer.signature}
            onChange={(e) => handlePersonnelChange('maintainer', 'signature', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Maintainer Date & Time"
            type="datetime-local"
            value={formData.maintainer.dateTime}
            onChange={(e) => handlePersonnelChange('maintainer', 'dateTime', e.target.value)}
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

export default HalfYearlyMaintenancestationForm;