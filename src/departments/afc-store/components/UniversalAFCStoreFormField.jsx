import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, RadioGroup, Radio, FormLabel, Grid, Box, Chip, FormHelperText, InputAdornment } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { 
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon,
  AttachMoney as MoneyIcon,
  Category as CategoryIcon,
  Store as StoreIcon 
} from '@mui/icons-material';

/**
 * UniversalAFCStoreFormField - Reusable form field component for AFC-Store department
 * Supports all field types found in AFC-Store forms with 100% field preservation
 */
const UniversalAFCStoreFormField = ({
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
  min,
  max,
  step,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value || '');
  
  // Handle value changes
  const handleChange = (newValue) => {
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Store-specific field types
  const renderStoreSpecificField = () => {
    switch (type) {
      case 'inventory-item':
        return (
          <TextField
            name={name}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth={fullWidth}
            label={label}
            placeholder={placeholder || "Enter inventory item name"}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            size={size}
            className={className}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InventoryIcon />
                </InputAdornment>
              ),
            }}
            {...props}
          />
        );

      case 'item-category':
        const categoryOptions = [
          { value: 'TICKETS_CARDS', label: 'Tickets & Cards' },
          { value: 'SPARE_PARTS', label: 'Spare Parts' },
          { value: 'CONSUMABLES', label: 'Consumables' },
          { value: 'EQUIPMENT', label: 'Equipment' },
          { value: 'STATIONERY', label: 'Stationery' },
          { value: 'TOOLS', label: 'Tools & Instruments' }
        ];
        
        return (
          <FormControl fullWidth={fullWidth} error={!!error} size={size} className={className}>
            <InputLabel required={required}>{label}</InputLabel>
            <Select
              name={name}
              value={value || ''}
              onChange={(e) => handleChange(e.target.value)}
              label={label}
              disabled={disabled}
              startAdornment={
                <InputAdornment position="start">
                  <CategoryIcon />
                </InputAdornment>
              }
              {...props}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      default:
        return null;
    }
  };

  // Standard field types
  const renderStandardField = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <TextField
            type={type}
            name={name}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth={fullWidth}
            label={label}
            placeholder={placeholder}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            size={size}
            multiline={multiline}
            rows={multiline ? rows : 1}
            className={className}
            {...props}
          />
        );

      case 'number':
        return (
          <TextField
            type="number"
            name={name}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth={fullWidth}
            label={label}
            placeholder={placeholder}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            size={size}
            className={className}
            inputProps={{
              min: min,
              max: max,
              step: step
            }}
            {...props}
          />
        );

      case 'textarea':
        return (
          <TextField
            name={name}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth={fullWidth}
            label={label}
            placeholder={placeholder}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            size={size}
            className={className}
            multiline
            rows={rows || 4}
            {...props}
          />
        );

      case 'select':
        return (
          <FormControl fullWidth={fullWidth} error={!!error} size={size} className={className}>
            <InputLabel required={required}>{label}</InputLabel>
            <Select
              name={name}
              value={value || ''}
              onChange={(e) => handleChange(e.target.value)}
              label={label}
              disabled={disabled}
              {...props}
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={typeof option === 'string' ? option : option.value}>
                  {typeof option === 'string' ? option : option.label}
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
                onChange={(e) => handleChange(e.target.checked)}
                disabled={disabled}
                {...props}
              />
            }
            label={label}
            className={className}
          />
        );

      case 'radio':
        return (
          <FormControl component="fieldset" error={!!error} className={className}>
            <FormLabel component="legend" required={required}>{label}</FormLabel>
            <RadioGroup
              name={name}
              value={value || ''}
              onChange={(e) => handleChange(e.target.value)}
              disabled={disabled}
              {...props}
            >
              {options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={typeof option === 'string' ? option : option.value}
                  control={<Radio />}
                  label={typeof option === 'string' ? option : option.label}
                />
              ))}
            </RadioGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case 'date':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={label}
              value={value ? new Date(value) : null}
              onChange={(newValue) => handleChange(newValue ? newValue.toISOString().split('T')[0] : '')}
              disabled={disabled}
              slotProps={{
                textField: {
                  fullWidth: fullWidth,
                  error: !!error,
                  helperText: error,
                  required: required,
                  size: size,
                  className: className,
                  ...props
                }
              }}
            />
          </LocalizationProvider>
        );

      case 'time':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label={label}
              value={value ? new Date(`2000-01-01T${value}`) : null}
              onChange={(newValue) => handleChange(newValue ? newValue.toTimeString().slice(0, 5) : '')}
              disabled={disabled}
              slotProps={{
                textField: {
                  fullWidth: fullWidth,
                  error: !!error,
                  helperText: error,
                  required: required,
                  size: size,
                  className: className,
                  ...props
                }
              }}
            />
          </LocalizationProvider>
        );

      case 'datetime-local':
        return (
          <TextField
            type="datetime-local"
            name={name}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth={fullWidth}
            label={label}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            size={size}
            className={className}
            InputLabelProps={{ shrink: true }}
            {...props}
          />
        );

      case 'tel':
        return (
          <TextField
            type="tel"
            name={name}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth={fullWidth}
            label={label}
            placeholder={placeholder}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            size={size}
            className={className}
            {...props}
          />
        );

      case 'url':
        return (
          <TextField
            type="url"
            name={name}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth={fullWidth}
            label={label}
            placeholder={placeholder}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            size={size}
            className={className}
            {...props}
          />
        );

      case 'file':
        return (
          <TextField
            type="file"
            name={name}
            onChange={(e) => handleChange(e.target.files[0])}
            fullWidth={fullWidth}
            label={label}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            size={size}
            className={className}
            InputLabelProps={{ shrink: true }}
            {...props}
          />
        );

      default:
        return (
          <TextField
            name={name}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth={fullWidth}
            label={label}
            placeholder={placeholder}
            error={!!error}
            helperText={error}
            required={required}
            disabled={disabled}
            size={size}
            className={className}
            {...props}
          />
        );
    }
  };

  // Render store-specific field first, then fall back to standard fields
  const storeField = renderStoreSpecificField();
  if (storeField) {
    return storeField;
  }

  return renderStandardField();
};

export default UniversalAFCStoreFormField;