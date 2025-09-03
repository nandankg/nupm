import React from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Autocomplete,
  Chip,
  Box,
  Typography,
  InputAdornment
} from '@mui/material';
import { DatePicker, TimePicker, DateTimePicker } from '@mui/x-date-pickers';
import { useField, useFormikContext } from 'formik';
import {
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon,
  AttachMoney as MoneyIcon,
  Category as CategoryIcon,
  Store as StoreIcon,
  Scale as WeightIcon,
  Straighten as DimensionIcon,
  QrCode as QrCodeIcon,
  Warehouse as WarehouseIcon,
  LocalOffer as TagIcon
} from '@mui/icons-material';

const UniversalAFCStoreFormField = ({ 
  type, 
  name, 
  label, 
  options = [], 
  multiple = false,
  required = false,
  disabled = false,
  placeholder = '',
  rows = 3,
  ...props 
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();
  const hasError = meta.touched && !!meta.error;

  // Store-specific field type handlers
  const renderStoreSpecificField = () => {
    switch (type) {
      case 'inventory-item':
        return (
          <TextField
            {...field}
            fullWidth
            label={label}
            placeholder={placeholder || "Enter inventory item name"}
            error={hasError}
            helperText={hasError ? meta.error : ''}
            required={required}
            disabled={disabled}
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
          { value: 'TOOLS', label: 'Tools & Instruments' },
          { value: 'CLEANING_SUPPLIES', label: 'Cleaning Supplies' },
          { value: 'SAFETY_EQUIPMENT', label: 'Safety Equipment' }
        ];
        return (
          <FormControl fullWidth error={hasError} required={required} disabled={disabled}>
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              label={label}
              startAdornment={<CategoryIcon sx={{ mr: 1 }} />}
              {...props}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {hasError && <FormHelperText>{meta.error}</FormHelperText>}
          </FormControl>
        );

      case 'supplier-info':
        return (
          <TextField
            {...field}
            fullWidth
            label={label}
            placeholder={placeholder || "Enter supplier name/details"}
            error={hasError}
            helperText={hasError ? meta.error : ''}
            required={required}
            disabled={disabled}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShippingIcon />
                </InputAdornment>
              ),
            }}
            {...props}
          />
        );

      case 'cost-amount':
        return (
          <TextField
            {...field}
            fullWidth
            label={label}
            placeholder={placeholder || "0.00"}
            error={hasError}
            helperText={hasError ? meta.error : ''}
            required={required}
            disabled={disabled}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MoneyIcon />
                  ₹
                </InputAdornment>
              ),
            }}
            {...props}
          />
        );

      case 'quantity-field':
        return (
          <TextField
            {...field}
            fullWidth
            label={label}
            placeholder={placeholder || "0"}
            error={hasError}
            helperText={hasError ? meta.error : ''}
            required={required}
            disabled={disabled}
            type="number"
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

      case 'weight-measurement':
        return (
          <TextField
            {...field}
            fullWidth
            label={label}
            placeholder={placeholder || "0.00"}
            error={hasError}
            helperText={hasError ? meta.error : ''}
            required={required}
            disabled={disabled}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WeightIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  kg
                </InputAdornment>
              ),
            }}
            {...props}
          />
        );

      case 'dimension-field':
        return (
          <TextField
            {...field}
            fullWidth
            label={label}
            placeholder={placeholder || "L x W x H (cm)"}
            error={hasError}
            helperText={hasError ? meta.error : ''}
            required={required}
            disabled={disabled}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DimensionIcon />
                </InputAdornment>
              ),
            }}
            {...props}
          />
        );

      case 'barcode-qr':
        return (
          <TextField
            {...field}
            fullWidth
            label={label}
            placeholder={placeholder || "Scan or enter barcode/QR code"}
            error={hasError}
            helperText={hasError ? meta.error : ''}
            required={required}
            disabled={disabled}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <QrCodeIcon />
                </InputAdornment>
              ),
            }}
            {...props}
          />
        );

      case 'storage-location':
        const locationOptions = [
          { value: 'MAIN_WAREHOUSE', label: 'Main Warehouse' },
          { value: 'SECTION_A', label: 'Section A' },
          { value: 'SECTION_B', label: 'Section B' },
          { value: 'SECTION_C', label: 'Section C' },
          { value: 'COLD_STORAGE', label: 'Cold Storage' },
          { value: 'SECURE_VAULT', label: 'Secure Vault' },
          { value: 'STATION_STORE', label: 'Station Store' },
          { value: 'TEMP_STORAGE', label: 'Temporary Storage' }
        ];
        return (
          <FormControl fullWidth error={hasError} required={required} disabled={disabled}>
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              label={label}
              startAdornment={<WarehouseIcon sx={{ mr: 1 }} />}
              {...props}
            >
              {locationOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {hasError && <FormHelperText>{meta.error}</FormHelperText>}
          </FormControl>
        );

      case 'procurement-status':
        const statusOptions = [
          { value: 'REQUESTED', label: 'Requested' },
          { value: 'APPROVED', label: 'Approved' },
          { value: 'ORDERED', label: 'Ordered' },
          { value: 'RECEIVED', label: 'Received' },
          { value: 'INSPECTED', label: 'Inspected' },
          { value: 'ACCEPTED', label: 'Accepted' },
          { value: 'REJECTED', label: 'Rejected' },
          { value: 'CANCELLED', label: 'Cancelled' }
        ];
        return (
          <FormControl fullWidth error={hasError} required={required} disabled={disabled}>
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              label={label}
              {...props}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {hasError && <FormHelperText>{meta.error}</FormHelperText>}
          </FormControl>
        );

      case 'priority-level':
        const priorityOptions = [
          { value: 'LOW', label: 'Low Priority' },
          { value: 'MEDIUM', label: 'Medium Priority' },
          { value: 'HIGH', label: 'High Priority' },
          { value: 'URGENT', label: 'Urgent' },
          { value: 'CRITICAL', label: 'Critical' }
        ];
        return (
          <FormControl fullWidth error={hasError} required={required} disabled={disabled}>
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              label={label}
              {...props}
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {hasError && <FormHelperText>{meta.error}</FormHelperText>}
          </FormControl>
        );

      case 'unit-measurement':
        const unitOptions = [
          { value: 'PIECES', label: 'Pieces (pcs)' },
          { value: 'KILOGRAMS', label: 'Kilograms (kg)' },
          { value: 'GRAMS', label: 'Grams (g)' },
          { value: 'LITERS', label: 'Liters (L)' },
          { value: 'MILLILITERS', label: 'Milliliters (mL)' },
          { value: 'METERS', label: 'Meters (m)' },
          { value: 'CENTIMETERS', label: 'Centimeters (cm)' },
          { value: 'BOXES', label: 'Boxes' },
          { value: 'CARTONS', label: 'Cartons' },
          { value: 'ROLLS', label: 'Rolls' }
        ];
        return (
          <FormControl fullWidth error={hasError} required={required} disabled={disabled}>
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              label={label}
              {...props}
            >
              {unitOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {hasError && <FormHelperText>{meta.error}</FormHelperText>}
          </FormControl>
        );

      case 'tags-field':
        return (
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={field.value || []}
            onChange={(event, newValue) => {
              setFieldValue(name, newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  icon={<TagIcon />}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder || "Add tags..."}
                error={hasError}
                helperText={hasError ? meta.error : ''}
                required={required}
                disabled={disabled}
              />
            )}
            {...props}
          />
        );

      default:
        return renderStandardField();
    }
  };

  // Standard form field types
  const renderStandardField = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'url':
      case 'tel':
        return (
          <TextField
            {...field}
            type={type}
            fullWidth
            label={label}
            placeholder={placeholder}
            error={hasError}
            helperText={hasError ? meta.error : ''}
            required={required}
            disabled={disabled}
            {...props}
          />
        );

      case 'number':
        return (
          <TextField
            {...field}
            type="number"
            fullWidth
            label={label}
            placeholder={placeholder}
            error={hasError}
            helperText={hasError ? meta.error : ''}
            required={required}
            disabled={disabled}
            {...props}
          />
        );

      case 'textarea':
        return (
          <TextField
            {...field}
            fullWidth
            multiline
            rows={rows}
            label={label}
            placeholder={placeholder}
            error={hasError}
            helperText={hasError ? meta.error : ''}
            required={required}
            disabled={disabled}
            {...props}
          />
        );

      case 'select':
        return (
          <FormControl fullWidth error={hasError} required={required} disabled={disabled}>
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              label={label}
              {...props}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {hasError && <FormHelperText>{meta.error}</FormHelperText>}
          </FormControl>
        );

      case 'checkbox':
        if (multiple) {
          return (
            <FormControl error={hasError} required={required} disabled={disabled}>
              <FormLabel component="legend">{label}</FormLabel>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={field.value?.includes(option.value) || false}
                      onChange={(e) => {
                        const currentValue = field.value || [];
                        const newValue = e.target.checked
                          ? [...currentValue, option.value]
                          : currentValue.filter(v => v !== option.value);
                        setFieldValue(name, newValue);
                      }}
                      disabled={disabled}
                    />
                  }
                  label={option.label}
                />
              ))}
              {hasError && <FormHelperText>{meta.error}</FormHelperText>}
            </FormControl>
          );
        } else {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={field.value || false}
                  disabled={disabled}
                />
              }
              label={label}
              {...props}
            />
          );
        }

      case 'radio':
        return (
          <FormControl error={hasError} required={required} disabled={disabled}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
              {...field}
              {...props}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio disabled={disabled} />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {hasError && <FormHelperText>{meta.error}</FormHelperText>}
          </FormControl>
        );

      case 'autocomplete':
        return (
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label || option}
            value={options.find(option => option.value === field.value) || null}
            onChange={(event, newValue) => {
              setFieldValue(name, newValue ? newValue.value : '');
            }}
            multiple={multiple}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={hasError}
                helperText={hasError ? meta.error : ''}
                required={required}
              />
            )}
            {...props}
          />
        );

      case 'date':
        return (
          <DatePicker
            label={label}
            value={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              setFieldValue(name, date ? date.toISOString().split('T')[0] : '');
            }}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={hasError}
                helperText={hasError ? meta.error : ''}
                required={required}
              />
            )}
            {...props}
          />
        );

      case 'time':
        return (
          <TimePicker
            label={label}
            value={field.value ? new Date(`1970-01-01T${field.value}`) : null}
            onChange={(time) => {
              if (time) {
                const timeString = time.toTimeString().split(' ')[0].substring(0, 5);
                setFieldValue(name, timeString);
              } else {
                setFieldValue(name, '');
              }
            }}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={hasError}
                helperText={hasError ? meta.error : ''}
                required={required}
              />
            )}
            {...props}
          />
        );

      case 'datetime':
        return (
          <DateTimePicker
            label={label}
            value={field.value ? new Date(field.value) : null}
            onChange={(dateTime) => {
              setFieldValue(name, dateTime ? dateTime.toISOString() : '');
            }}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={hasError}
                helperText={hasError ? meta.error : ''}
                required={required}
              />
            )}
            {...props}
          />
        );

      case 'file':
        return (
          <Box>
            <input
              type="file"
              id={name}
              onChange={(event) => {
                setFieldValue(name, event.target.files[0]);
              }}
              style={{ display: 'none' }}
              disabled={disabled}
              {...props}
            />
            <label htmlFor={name}>
              <TextField
                fullWidth
                label={label}
                value={field.value?.name || ''}
                placeholder="Choose file..."
                error={hasError}
                helperText={hasError ? meta.error : ''}
                required={required}
                disabled={disabled}
                InputProps={{
                  readOnly: true,
                  style: { cursor: 'pointer' }
                }}
              />
            </label>
          </Box>
        );

      default:
        return (
          <TextField
            {...field}
            fullWidth
            label={label}
            placeholder={placeholder}
            error={hasError}
            helperText={hasError ? meta.error : ''}
            required={required}
            disabled={disabled}
            {...props}
          />
        );
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      {renderStoreSpecificField()}
    </Box>
  );
};

export default UniversalAFCStoreFormField;