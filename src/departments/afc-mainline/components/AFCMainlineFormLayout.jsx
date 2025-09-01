import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Grid,
  Divider,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Save as SaveIcon,
  Print as PrintIcon,
  ArrowBack as ArrowBackIcon,
  Description as FormIcon,
} from '@mui/icons-material';
import Header from '../../../component/Header';

/**
 * AFCMainlineFormLayout - Standardized layout for all AFC-Mainline department forms
 * Provides consistent branding, navigation, and form structure
 */
const AFCMainlineFormLayout = ({
  title,
  children,
  onSubmit,
  onPrint,
  loading = false,
  error = null,
  success = false,
  formId = null,
  showPrintButton = true,
  showBackButton = true,
  customActions = [],
  breadcrumbItems = [],
  className = '',
}) => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit && !loading) {
      onSubmit(event);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  // Handle print functionality
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  // Close success snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Show success snackbar when success prop changes
  React.useEffect(() => {
    if (success) {
      setSnackbarOpen(true);
    }
  }, [success]);

  return (
    <Box className={`afc-mainline-form-layout ${className}`}>
      <Header />
      
      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        {/* Breadcrumb Navigation */}
        <Paper elevation={1} sx={{ p: 2, mb: 3, backgroundColor: '#fff' }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/')}
              sx={{ textDecoration: 'none' }}
            >
              Dashboard
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/forms')}
              sx={{ textDecoration: 'none' }}
            >
              Forms
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/forms?category=AFC-Mainline')}
              sx={{ textDecoration: 'none' }}
            >
              AFC-Mainline
            </Link>
            {breadcrumbItems.map((item, index) => (
              <Link
                key={index}
                component="button"
                variant="body2"
                onClick={() => item.onClick && item.onClick()}
                sx={{ textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            ))}
            <Typography color="text.primary" variant="body2">
              {title}
            </Typography>
          </Breadcrumbs>

          {/* Form Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormIcon sx={{ fontSize: 32, color: '#1976d2' }} />
              <Box>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  AFC-Mainline Department • Railway Operations Management
                </Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {showBackButton && (
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={handleBack}
                  size="medium"
                >
                  Back
                </Button>
              )}
              {showPrintButton && (
                <Button
                  variant="outlined"
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                  size="medium"
                >
                  Print
                </Button>
              )}
              {customActions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'outlined'}
                  startIcon={action.icon}
                  onClick={action.onClick}
                  disabled={action.disabled || loading}
                  size="medium"
                >
                  {action.label}
                </Button>
              ))}
            </Box>
          </Box>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Main Form Content */}
        <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
          <form onSubmit={handleSubmit}>
            {/* AFC-Mainline Branding */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                UTTAR PRADESH METRO RAIL CORPORATION
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                AFC-Mainline Operations • {title}
              </Typography>
              <Divider sx={{ mt: 2, mb: 3 }} />
            </Box>

            {/* Form Content */}
            <Box sx={{ mb: 4 }}>
              {children}
            </Box>

            {/* Form Actions */}
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {formId && `Form ID: ${formId}`}
                  {formId && ' • '}
                  Last updated: {new Date().toLocaleDateString()}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={loading}
                  sx={{ minWidth: 120 }}
                >
                  {loading ? 'Saving...' : 'Save Form'}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>

        {/* Footer Information */}
        <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            AFC-Mainline Department • Form Management System v2.0 • 
            Built with Universal Component Architecture
          </Typography>
        </Paper>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Form saved successfully! All field data has been preserved.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AFCMainlineFormLayout;