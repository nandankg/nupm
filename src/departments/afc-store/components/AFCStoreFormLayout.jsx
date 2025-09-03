import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Container,
  Breadcrumbs,
  Link,
  Chip,
  Alert
} from '@mui/material';
import {
  Store as StoreIcon,
  Home as HomeIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon
} from '@mui/icons-material';

const AFCStoreFormLayout = ({ 
  title, 
  children, 
  showAlert = false, 
  alertMessage = '', 
  alertSeverity = 'info' 
}) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header Section */}
      <Paper elevation={1} sx={{ mb: 3, py: 3, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Container maxWidth="xl">
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <StoreIcon sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                AFC Store Management System
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Inventory, Procurement & Asset Management - Automated Fare Collection Store
              </Typography>
            </Box>
          </Box>
          
          <Box display="flex" alignItems="center" gap={2}>
            <Chip 
              icon={<StoreIcon />} 
              label="AFC-Store Department" 
              variant="outlined" 
              sx={{ 
                color: 'primary.contrastText', 
                borderColor: 'primary.contrastText',
                '& .MuiChip-icon': { color: 'primary.contrastText' }
              }} 
            />
            <Chip 
              icon={<InventoryIcon />} 
              label="Inventory Management" 
              variant="outlined" 
              sx={{ 
                color: 'primary.contrastText', 
                borderColor: 'primary.contrastText',
                '& .MuiChip-icon': { color: 'primary.contrastText' }
              }} 
            />
            <Chip 
              icon={<ShippingIcon />} 
              label="Procurement & Logistics" 
              variant="outlined" 
              sx={{ 
                color: 'primary.contrastText', 
                borderColor: 'primary.contrastText',
                '& .MuiChip-icon': { color: 'primary.contrastText' }
              }} 
            />
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="xl">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link 
            underline="hover" 
            color="inherit" 
            href="/dashboard"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <HomeIcon fontSize="small" />
            Dashboard
          </Link>
          <Link 
            underline="hover" 
            color="inherit" 
            href="/departments"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <StoreIcon fontSize="small" />
            AFC Store
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <InventoryIcon fontSize="small" />
            {title}
          </Typography>
        </Breadcrumbs>

        {/* Alert Message */}
        {showAlert && (
          <Alert severity={alertSeverity} sx={{ mb: 3 }}>
            {alertMessage}
          </Alert>
        )}

        {/* Form Title */}
        <Paper elevation={2} sx={{ mb: 3, p: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom color="primary">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            AFC Store Department - Comprehensive inventory management, procurement tracking, 
            and asset lifecycle management for Automated Fare Collection systems.
          </Typography>
        </Paper>

        {/* Form Content */}
        <Box>
          {children}
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 6, py: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            AFC Store Management System | UPMRC Operations | Inventory & Asset Management
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AFCStoreFormLayout;