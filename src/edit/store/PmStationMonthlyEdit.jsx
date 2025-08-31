// MaintenanceEditForm.jsx
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

import { fetchData, saveData,editData } from "../../reducer/redux/tableDataSlice";
import { Key } from "@mui/icons-material";
import { Input } from "@mui/material";
import PDFExportComponent from "../../component/PDFExportComponent";
function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

const PmStationMonthlyEdit = () => {
 
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  const PMsheetList = useSelector((state) => state.data);
  const [slug, setSlug] = useState(getLastParameter().trim());
const filteredData = PMsheetList.data?.data?.filter((item) => item.id === id)[0] || {};

  const [formData, setFormData] = useState({
    id:filteredData.id,
    station: filteredData.station || '',
    date: filteredData.date || '',
    systems: filteredData.systems ? JSON.parse(JSON.stringify(filteredData.systems)) : [], // Deep copy
    SName: filteredData.SName ,
    MName: filteredData.MName 
  });
  



  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSystemChange = (systemIndex, activityIndex, field, value, subField) => {
    setFormData((prev) => {
      const updatedSystems = JSON.parse(JSON.stringify(prev.systems));
      const activity = updatedSystems[systemIndex].activities[activityIndex];
      
      if (subField) {
        if (field === 'subCheckboxes' || field === 'subInputValues') {
          activity[field] = { ...activity[field], [subField]: value };
        } else if (field === 'BCC1' || field === 'BCC2') {
          activity[field].values[subField] = value;
        }
      } else {
        activity[field] = value;
      }
      
      return { ...prev, systems: updatedSystems };
    });
  };

  const handlePersonnelChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(editData({ formType: slug, values: formData }));
      console.log("Data Edited ")
    navigate(`list/${slug}`);
    };

 
  if (!formData) return <div>No data found</div>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Maintenance Edit Form - {formData.form_id}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6}>
            <TextField
              label="Station"
              name="station"
              value={formData.station || ''}
              onChange={handleBasicInfoChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date || ''}
              onChange={handleBasicInfoChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mb: 2 }}>Systems and Activities</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>System</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.systems.map((system, systemIndex) =>
              system.activities.map((activity, activityIndex) => (
                <TableRow key={`${systemIndex}-${activityIndex}`}>
                  <TableCell>{activityIndex === 0 ? system.name : ''}</TableCell>
                  <TableCell>{activity.label}</TableCell>
                  <TableCell>
                    {/* BCC1 and BCC2 for PAS */}
                    {(activity.BCC1 || activity.BCC2) && (
                      <Grid container spacing={1}>
                        {activity.BCC1 && (
                          <Grid item xs={6}>
                            <Typography>{activity.BCC1.label}</Typography>
                            {activity.BCC1.zones.map((zone, i) => (
                              <TextField
                                key={i}
                                label={zone}
                                value={activity.BCC1.values[i] || ''}
                                onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'BCC1', e.target.value, i)}
                                size="small"
                                fullWidth
                                sx={{ mb: 1 }}
                              />
                            ))}
                          </Grid>
                        )}
                        {activity.BCC2 && (
                          <Grid item xs={6}>
                            <Typography>{activity.BCC2.label}</Typography>
                            {activity.BCC2.zones.map((zone, i) => (
                              <TextField
                                key={i}
                                label={zone}
                                value={activity.BCC2.values[i] || ''}
                                onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'BCC2', e.target.value, i)}
                                size="small"
                                fullWidth
                                sx={{ mb: 1 }}
                              />
                            ))}
                          </Grid>
                        )}
                      </Grid>
                    )}

                    {/* Sub Checkboxes */}
                    {activity.sub && activity.subCheckboxes && (
                      <Grid container spacing={1}>
                        {activity.sub.map((item) => (
                          <Grid item key={item}>
                            <label>
                              <Checkbox
                                checked={activity.subCheckboxes[item] || false}
                                onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'subCheckboxes', e.target.checked, item)}
                              />
                              {item}
                            </label>
                          </Grid>
                        ))}
                      </Grid>
                    )}

                    {/* Sub Input Values */}
                    {activity.subInput && activity.subInputValues && (
                      <Grid container spacing={1}>
                        {activity.subInput.map((item) => (
                          <Grid item xs={6} key={item}>
                            <TextField
                              label={item}
                              value={activity.subInputValues[item] || ''}
                              onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'subInputValues', e.target.value, item)}
                              size="small"
                              fullWidth
                            />
                          </Grid>
                        ))}
                      </Grid>
                    )}

                    {/* Simple Checkbox for checked field */}
                    {activity.checked && (
                      <label>
                        <Checkbox
                          checked={activity.checked === 'yes'}
                          onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'checked', e.target.checked ? 'yes' : 'no')}
                        />
                        Completed
                      </label>
                    )}
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={activity.remark || ''}
                      onChange={(e) => handleSystemChange(systemIndex, activityIndex, 'remark', e.target.value)}
                      fullWidth
                      multiline
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Personnel Section */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Personnel</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Supervisor Name"
              value={formData.SName || ''}
              onChange={(e) => handlePersonnelChange('SName', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Supervisor Emp ID"
              value={formData.SempId || ''}
              onChange={(e) => handlePersonnelChange('SempId', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Maintainer Name"
              value={formData.MName || ''}
              onChange={(e) => handlePersonnelChange('MName', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Maintainer Emp ID"
              value={formData.MempId || ''}
              onChange={(e) => handlePersonnelChange('MempId', e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>

        <TextField
          label="Notes"
          name="notes"
          value={formData.notes || ''}
          onChange={handleBasicInfoChange}
          fullWidth
          multiline
          rows={3}
          sx={{ mt: 4 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 4, mb: 4 }}
        >
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default PmStationMonthlyEdit;