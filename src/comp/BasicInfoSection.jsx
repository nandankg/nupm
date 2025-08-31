// BasicInfoSection.jsx
import React from 'react';
import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const BasicInfoSection = ({ formData, onChange }) => (
  <Grid container spacing={3}>
    <Grid item xs={6}>
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={onChange}
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
        onChange={onChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        required
      />
    </Grid>
  </Grid>
);

BasicInfoSection.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BasicInfoSection;

