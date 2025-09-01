# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the UPMRC (Uttar Pradesh Metro Rail Corporation) application - a comprehensive React-based form management system for railway operations. The application manages various operational forms, registers, and maintenance records across different departments (Finance, Operations, Signalling, Telecom, Store).

### 🎉 **Modernization Status**
- **Signalling Department**: 100% COMPLETE ✅ (45/45 forms migrated)
- **Telecom Department**: 100% COMPLETE ✅ (33/33 forms migrated) 
- **Operations Department**: Partially modernized with universal components
- **Other Departments**: Legacy forms (Finance, Store) - pending modernization

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
├── departments/       # 🆕 MODERN ARCHITECTURE - Department-based organization
│   ├── signalling/    # ✅ COMPLETE: Signalling Department (45 forms)
│   │   ├── forms/     # Modern forms with universal components
│   │   ├── components/# SignallingFormLayout, UniversalSignallingFormField
│   │   └── utils/     # Department-specific utilities
│   ├── telecom/       # ✅ COMPLETE: Telecom Department (33 forms)
│   │   ├── forms/     # Modern forms with universal components
│   │   ├── components/# TelecomFormLayout, UniversalTelecomFormField
│   │   └── utils/     # Department-specific utilities
│   ├── operation/     # 🔄 PARTIAL: Operations Department (modernizing)
│   │   ├── forms/     # Mix of modern and legacy forms
│   │   └── components/# OperationFormLayout, UniversalOperationFormField
│   └── redux/         # Department-specific Redux slices
├── forms/             # 🔄 LEGACY - Extensive collection of operational forms
│   ├── rajiv/         # Legacy forms by developer/department
│   ├── manshi/        # (Being gradually migrated to departments/)
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
- **Modern Architecture**: Department-based organization with universal components
- **Legacy Architecture**: Developer-folder based organization (being migrated)
- Each form has corresponding Redux reducer for state management
- Extensive route mapping in `App.js` (main routing file)

### 🏗️ **Modern Universal Component Architecture**

#### Signalling Department (✅ Complete)
- **SignallingFormLayout**: Standardized container with branding and navigation
- **UniversalSignallingFormField**: Smart field component supporting 15+ specialized field types
- **45 Forms**: Complete PM maintenance schedules, safety registers, equipment forms
- **Field Types**: `signalling-system`, `safety-critical`, `equipment-id`, `technical-reading`

#### Telecom Department (✅ Complete)  
- **TelecomFormLayout**: Standardized container with telecom-specific branding
- **UniversalTelecomFormField**: Smart field component supporting 15+ specialized field types
- **33 Forms**: Daily operations, administrative core, PM maintenance, specialized systems
- **Field Types**: `telecom-system`, `voltage-reading`, `temperature-reading`, `location-type`

#### Operations Department (🔄 Partial)
- **OperationFormLayout**: Standardized container for operational forms
- **UniversalOperationFormField**: Basic universal field implementation
- **Mixed Status**: Some forms modernized, others still in legacy structure

### 🎯 **Universal Component Benefits**
- **60-70% Code Reduction** through component reusability
- **100% Field Preservation** methodology maintaining backward compatibility  
- **Consistent User Experience** across all department forms
- **Rapid Development** for new forms using existing components
- **Centralized Updates** - fix once, benefit all forms

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
- **Legacy Forms**: Organized by developer names (rajiv, manshi, satya, etc.) - being migrated
- **Modern Forms**: Organized by department with universal component architecture
- Each department has specific form requirements and specialized field types
- Heavy use of date manipulation and formatting utilities
- Export functionality (PDF, Excel) is central to most forms
- Print functionality integrated across forms
- **Migration Strategy**: Gradual migration from legacy to modern architecture

## 🚀 **Working with Modern Forms**

When creating new forms or modifying existing ones in the modern architecture:

### Signalling Forms (`src/departments/signalling/forms/`)
```jsx
import { SignallingFormLayout, UniversalSignallingFormField } from "../components";

const NewSignallingForm = () => {
  return (
    <SignallingFormLayout title="Form Title" onSubmit={handleSubmit}>
      <UniversalSignallingFormField 
        type="signalling-system" 
        name="system" 
        label="System Type" 
        required 
      />
    </SignallingFormLayout>
  );
};
```

### Telecom Forms (`src/departments/telecom/forms/`)
```jsx
import { TelecomFormLayout, UniversalTelecomFormField } from "../components";

const NewTelecomForm = () => {
  return (
    <TelecomFormLayout title="Form Title" onSubmit={handleSubmit}>
      <UniversalTelecomFormField 
        type="telecom-system" 
        name="equipment" 
        label="Equipment Type" 
        required 
      />
    </TelecomFormLayout>
  );
};
```

### Universal Field Types Available

#### Signalling Department
- `signalling-system`, `safety-critical`, `equipment-id`, `technical-reading`
- `maintenance-type`, `fault-category`, `priority-level`, `inspection-status`

#### Telecom Department  
- `telecom-system`, `voltage-reading`, `temperature-reading`, `location-type`
- `employee-id`, `technical-parameter`, `date-time`, `pm-frequency`

#### Common Types (All Departments)
- `text`, `email`, `password`, `number`, `date`, `time`, `textarea`
- `select`, `checkbox`, `radio`, `file`, `tel`, `url`