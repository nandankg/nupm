// MaintenanceEdit.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData, editData } from '../../reducer/redux/tableDataSlice'; // Adjust the import path
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Checkbox,
  Button,
  Grid,
} from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";

function getLastParameter() {
    const pathname = window.location.pathname;
    const pathSegments = pathname.split("/").filter(Boolean);
    return pathSegments[pathSegments.length - 1];
  }
const PmStationQuarterlyEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
   const navigate = useNavigate();
    const { id } = location.state;
  const [slug, setSlug] = useState(getLastParameter().trim());
  // const { PMsheetList } = useSelector((state) => state.data);
  const PMsheetList = useSelector((state) => state.data);
  const [editedData, setEditedData] = useState(null);
console.log(PMsheetList)
console.log(id)
console.log(editedData)
const filteredData = PMsheetList.data?.data?.filter((item) => item.id === id)[0] || {};
console.log(filteredData)
const [formData, setFormData] = useState({
    id:filteredData.id,
    station: filteredData.station || '',
    date: filteredData.date || '',
    systems: filteredData.systems ? JSON.parse(JSON.stringify(filteredData.systems)) : [], // Deep copy
    notes:filteredData.notes,
    SName: filteredData.SName ,
    SempId: filteredData.SName ,
    SdateTime: filteredData.SName ,
    MName: filteredData.MName,
    MempId: filteredData.MName,
    MdateTime: filteredData.MName
  });
// useEffect(() => {
//     if (PMsheetList && PMsheetList.length > 0) {
//       const record = PMsheetList.data?.data?.find((item) => item.id === id );
//       console.log(record)
//       if (record) {
//         setEditedData(JSON.parse(JSON.stringify(record))); // Deep copy
//       }
//     }
//   }, [PMsheetList, id]);

  

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

 
const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(editData({ formType: slug, values: setFormData }));
      console.log("Data Edited ")
    // navigate(`list/${slug}`);
    };
  return (
    <Container className="py-4">
      <Typography variant="h4" align="center" className="mb-4">
        QUARTERLY MAINTENANCE SCHEDULE EDIT
      </Typography>
      <Typography variant="subtitle1" align="center" className="mb-4">
        DOC: Annexure-III, Version: 1.0 | DOCUMENT_NO: 08/M/Tele/CHO2
      </Typography>

      <Paper elevation={3} className="p-3">
        <div className="row mb-3">
          <div className="col-md-4">
            <TextField
              label="Station"
              name="station"
              value={formData.station || ''}
              onChange={handleBasicInfoChange}
              fullWidth
            />
          </div>
          <div className="col-md-4">
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date || ''}
              onChange={handleBasicInfoChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className="col-md-4">
            <TextField
              label="DOC"
              value="Annexure-III, Version: 1.0"
              disabled
              fullWidth
            />
          </div>
        </div>

        <TableContainer component={Paper} className="table-responsive">
          <Table className="table table-striped table-hover">
            <TableHead>
              <TableRow>
                <TableCell className="bg-primary text-white">System</TableCell>
                <TableCell className="bg-primary text-white">Activity</TableCell>
                <TableCell className="bg-primary text-white">Done</TableCell>
                <TableCell className="bg-primary text-white">Remarks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.systems.map((system, systemIndex) =>
                system.activities.map((activity, activityIndex) => (
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
                          value={activity.hmiNormal || ''}
                          onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'hmiNormal', e.target.value)}
                          size="small"
                          sx={{ mr: 2, mb: 1, display: 'block' }}
                        />
                      )}
                      {activity.hmiEmergency && (
                        <TextField
                          label="HMI Emergency"
                          value={activity.hmiEmergency || ''}
                          onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'hmiEmergency', e.target.value)}
                          size="small"
                          sx={{ mr: 2, mb: 1, display: 'block' }}
                        />
                      )}
                      {activity.cpu && (
                        <TextField
                          label="CPU"
                          value={activity.cpu || ''}
                          onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'cpu', e.target.value)}
                          size="small"
                          sx={{ mr: 2, mb: 1, display: 'block' }}
                        />
                      )}
                      {activity.ram && (
                        <TextField
                          label="RAM"
                          value={activity.ram || ''}
                          onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'ram', e.target.value)}
                          size="small"
                          sx={{ mr: 2, mb: 1, display: 'block' }}
                        />
                      )}
                      {activity.voltage && (
                        <TextField
                          label="Voltage"
                          value={activity.voltage || ''}
                          onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'voltage', e.target.value)}
                          size="small"
                          sx={{ mr: 2, mb: 1, display: 'block' }}
                        />
                      )}
                      <TextField
                        label="Remark"
                        value={activity.remark || ''}
                        onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'remark', e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
        </Table>
        </TableContainer>

        <div className="mt-3">
          <TextField
            label="Notes"
            name="notes"
            value={formData.notes || ''}
            onChange={handleBasicInfoChange}
            fullWidth
            multiline
            rows={3}
          />
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <TextField
              label="Supervisor Name"
              value={formData.SName || ''}
              onChange={(e) => handleBasicInfoChange({ target: { name: 'supervisor.name', value: e.target.value } })}
              fullWidth
            />
            <TextField
              label="Supervisor Emp ID"
              value={formData.SempId
                 || ''}
              onChange={(e) => handleBasicInfoChange({ target: { name: 'supervisor.empId', value: e.target.value } })}
              fullWidth
              sx={{ mt: 2 }}
            />
            
            <TextField
              label="Supervisor Date & Time"
              type="datetime-local"
              value={formData.SdateTime
                 || ''}
              onChange={(e) => handleBasicInfoChange({ target: { name: 'supervisor.dateTime', value: e.target.value } })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ mt: 2 }}
            />
          </div>
          <div className="col-md-6">
            <TextField
              label="Maintainer Name"
              value={formData.
                MName
                 || ''}
              onChange={(e) => handleBasicInfoChange({ target: { name: 'maintainer.name', value: e.target.value } })}
              fullWidth
            />
            <TextField
              label="Maintainer Emp ID"
              value={formData.MempId
                || ''}
              onChange={(e) => handleBasicInfoChange({ target: { name: 'maintainer.empId', value: e.target.value } })}
              fullWidth
              sx={{ mt: 2 }}
            />
           
            <TextField
              label="Maintainer Date & Time"
              type="datetime-local"
              value={formData.
                MdateTime
                 || ''}
              onChange={(e) => handleBasicInfoChange({ target: { name: 'maintainer.dateTime', value: e.target.value } })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ mt: 2 }}
            />
          </div>
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="mt-3"
        >
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
};

export default PmStationQuarterlyEdit;