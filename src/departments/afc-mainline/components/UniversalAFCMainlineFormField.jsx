import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, RadioGroup, Radio, FormLabel, Grid, Box, Chip, FormHelperText } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import stationData from '../../../station.json';

/**
 * UniversalAFCMainlineFormField - Reusable form field component for AFC-Mainline department
 * Supports all field types found in AFC-Mainline forms with 100% field preservation
 */
const UniversalAFCMainlineFormField = ({
  type = 'text',
  name,
  label,
  value,
  onChange,
  error = '',
  required = false,
  disabled = false,
  placeholder = '',
  options = [],
  validation = {},
  className = '',
  fullWidth = true,
  size = 'medium',
  multiline = false,
  rows = 1,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  // Handle field change with validation
  const handleChange = (event, newValue = null) => {
    const fieldValue = newValue !== null ? newValue : event?.target?.value || event;
    onChange(name, fieldValue);
  };

  // Station options for AFC-Mainline operations
  const stationOptions = stationData || [
    'Charbagh', 'Hussainganj', 'Sachivalaya', 'Hazratganj', 'Lalbagh',
    'Mawaiya', 'Daliganj', 'Transport Nagar', 'Amausi'
  ];

  // Equipment status options for AFC operations
  const equipmentStatusOptions = ['OK', 'Fault', 'Maintenance', 'Out of Service'];
  const yesNoOptions = ['Yes', 'No'];
  const pmFrequencyOptions = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half-yearly', 'Annual'];
  
  // AFC Equipment types
  const afcEquipmentOptions = [
    'TVM (Ticket Vending Machine)',
    'TOM (Ticket Office Machine)', 
    'AVM (Add Value Machine)',
    'Gate (Entry/Exit Gate)',
    'BOM (Booking Office Machine)',
    'CCTV',
    'PA System',
    'SCADA System'
  ];

  // Fault/Problem status options
  const faultStatusOptions = [
    'New', 'In Progress', 'Pending Parts', 'Resolved', 'Closed', 'Escalated'
  ];

  // Render field based on type
  const renderField = () => {
    switch (type) {
      case 'station-name':
        return (
          <FormControl fullWidth={fullWidth} error={!!error} size={size}>
            <InputLabel required={required}>{label}</InputLabel>
            <Select
              name={name}
              value={value || ''}
              onChange={handleChange}
              label={label}
              disabled={disabled}
              {...props}
            >
              {stationOptions.map((station) => (
                <MenuItem key={station} value={station}>
                  {station}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case 'equipment-status':
        return (
          <FormControl fullWidth={fullWidth} error={!!error} size={size}>
            <InputLabel required={required}>{label}</InputLabel>
            <Select
              name={name}
              value={value || ''}
              onChange={handleChange}
              label={label}
              disabled={disabled}
              {...props}
            >
              {equipmentStatusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case 'yes-no':
        return (
          <FormControl component="fieldset" error={!!error}>
            <FormLabel component="legend" required={required}>{label}</FormLabel>
            <RadioGroup
              name={name}
              value={value || 'No'}
              onChange={handleChange}
              row
            >
              {yesNoOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio size={size} disabled={disabled} />}
                  label={option}
                />
              ))}
            </RadioGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case 'afc-equipment':
        return (
          <FormControl fullWidth={fullWidth} error={!!error} size={size}>
            <InputLabel required={required}>{label}</InputLabel>
            <Select
              name={name}
              value={value || ''}
              onChange={handleChange}
              label={label}
              disabled={disabled}
              {...props}
            >
              {afcEquipmentOptions.map((equipment) => (
                <MenuItem key={equipment} value={equipment}>
                  {equipment}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case 'pm-frequency':
        return (
          <FormControl fullWidth={fullWidth} error={!!error} size={size}>
            <InputLabel required={required}>{label}</InputLabel>
            <Select
              name={name}
              value={value || ''}
              onChange={handleChange}
              label={label}
              disabled={disabled}
              {...props}
            >
              {pmFrequencyOptions.map((frequency) => (
                <MenuItem key={frequency} value={frequency}>
                  {frequency}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case 'fault-status':
        return (
          <FormControl fullWidth={fullWidth} error={!!error} size={size}>
            <InputLabel required={required}>{label}</InputLabel>
            <Select
              name={name}
              value={value || ''}
              onChange={handleChange}
              label={label}
              disabled={disabled}
              {...props}
            >
              {faultStatusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case 'employee-signature':
        return (
          <Box>
            <TextField
              name={name}
              label={label}
              value={value || ''}
              onChange={handleChange}
              error={!!error}
              helperText={error}
              required={required}
              disabled={disabled}
              fullWidth={fullWidth}
              size={size}
              placeholder="Employee Name & Signature"
              InputProps={{
                endAdornment: <Chip label="Sign" size="small" variant="outlined" />
              }}
              {...props}
            />
          </Box>
        );

      case 'technical-details':
        return (
          <TextField
            name={name}
            label={label}
            value={value || ''}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            fullWidth={fullWidth}
            size={size}
            multiline
            rows={4}
            placeholder="Enter technical details, rectification steps, or remarks..."
            {...props}
          />
        );

      case 'date':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={label}
              value={value || null}
              onChange={(newValue) => handleChange(null, newValue)}
              disabled={disabled}
              slotProps={{
                textField: {
                  fullWidth: fullWidth,
                  size: size,
                  error: !!error,
                  helperText: error,
                  required: required,
                  name: name,
                }
              }}
              {...props}
            />
          </LocalizationProvider>
        );

      case 'time':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label={label}
              value={value || null}
              onChange={(newValue) => handleChange(null, newValue)}
              disabled={disabled}
              slotProps={{
                textField: {
                  fullWidth: fullWidth,
                  size: size,
                  error: !!error,
                  helperText: error,
                  required: required,
                  name: name,
                }
              }}
              {...props}
            />
          </LocalizationProvider>
        );

      case 'select':
        return (
          <FormControl fullWidth={fullWidth} error={!!error} size={size}>
            <InputLabel required={required}>{label}</InputLabel>
            <Select
              name={name}
              value={value || ''}
              onChange={handleChange}
              label={label}
              disabled={disabled}
              {...props}
            >
              {options.map((option) => (
                <MenuItem key={option.value || option} value={option.value || option}>
                  {option.label || option}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                name={name}
                checked={!!value}
                onChange={(e) => handleChange(e, e.target.checked)}
                disabled={disabled}
                size={size}
                {...props}
              />
            }
            label={label}
          />
        );

      case 'textarea':
        return (
          <TextField
            name={name}
            label={label}
            value={value || ''}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            fullWidth={fullWidth}
            size={size}
            multiline
            rows={rows}
            placeholder={placeholder}
            {...props}
          />
        );

      case 'number':
        return (
          <TextField
            name={name}
            label={label}
            type="number"
            value={value || ''}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            fullWidth={fullWidth}
            size={size}
            placeholder={placeholder}
            {...props}
          />
        );

      case 'email':
        return (
          <TextField
            name={name}
            label={label}
            type="email"
            value={value || ''}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            fullWidth={fullWidth}
            size={size}
            placeholder={placeholder}
            {...props}
          />
        );

      default: // 'text' type
        return (
          <TextField
            name={name}
            label={label}
            value={value || ''}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            fullWidth={fullWidth}
            size={size}
            multiline={multiline}
            rows={multiline ? rows : 1}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={className}
            {...props}
          />
        );
    }
  };

  return (
    <Box className={`universal-afc-mainline-field ${className}`}>
      {renderField()}
    </Box>
  );
};

export default UniversalAFCMainlineFormField;