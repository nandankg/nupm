// PersonnelSection.jsx
import React from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const PersonnelSection = ({ title, data, onChange }) => (
  <>
    <Typography variant="h6" sx={{ mt: 4 }}>
      {title}
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <TextField
          label="Name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Emp ID"
          value={data.empId}
          onChange={(e) => onChange('empId', e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Signature"
          value={data.signature}
          onChange={(e) => onChange('signature', e.target.value)}
          fullWidth
        />
      </Grid>
    </Grid>
  </>
);

PersonnelSection.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PersonnelSection;