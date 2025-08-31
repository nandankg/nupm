# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the UPMRC (Uttar Pradesh Metro Rail Corporation) application - a comprehensive React-based form management system for railway operations. The application manages various operational forms, registers, and maintenance records across different departments (Finance, Operations, Signalling, Telecom, Store).

## Development Commands

```bash
# Start development server (opens http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (one-way operation)
npm run eject
```

## Architecture Overview

### Technology Stack
- **Frontend**: React 18.3.1 with Create React App
- **State Management**: Redux Toolkit with extensive reducer setup
- **Routing**: React Router DOM v6 with lazy-loaded components
- **UI Libraries**: Material-UI (@mui/material), React Bootstrap
- **Data Processing**: Papa Parse (CSV), XLSX, jsPDF, html2canvas
- **Date Handling**: date-fns, dayjs

### Project Structure

```
src/
├── component/          # Reusable UI components and utilities
├── pages/             # Main application pages (Dashboard, Login, User management)
├── forms/             # Extensive collection of operational forms
│   ├── rajiv/         # Forms by developer/department
│   ├── manshi/
│   ├── satya/
│   ├── chanchal/
│   ├── pinki/
│   ├── isha/
│   ├── monika/
│   ├── akshra/
│   └── store/         # Store/inventory related forms
├── reducer/           # Redux reducers organized by module
├── store/             # Redux store configuration
├── shared/            # Shared utilities and constants
└── tables/            # Table components
```

### Authentication & Routing
- Token-based authentication using localStorage
- Protected routes with automatic redirects
- Role-based access control (Admin, Employee roles)
- Lazy-loaded components with Suspense for performance

### Form System Architecture
- **200+ operational forms** covering various railway operations
- Forms organized by department and functionality
- Each form has corresponding Redux reducer for state management
- Extensive route mapping in `Napp.js` (main routing file)

### Key Form Categories
- **Maintenance Records**: PM logs, equipment failure registers, preventive maintenance
- **Operations**: Station diary, incident reports, manual point operations
- **Finance**: Budget registers, transaction records, loan registers  
- **Safety**: First aid, incident/accident reports, drill registers
- **Inventory**: Stock movement, asset registers, requisition slips

### State Management Pattern
- Centralized Redux store with 100+ reducers
- Each form/feature has dedicated reducer
- Organized by developer folders matching form structure
- Authentication state managed separately

### Component Patterns
- Extensive use of lazy loading for performance
- Consistent form structure across different operational areas
- Shared utility components for PDF export, Excel export, date formatting
- Material-UI and Bootstrap hybrid approach

### Development Notes
- Forms are organized by developer names (rajiv, manshi, satya, etc.)
- Each department has specific form requirements
- Heavy use of date manipulation and formatting utilities
- Export functionality (PDF, Excel) is central to most forms
- Print functionality integrated across forms