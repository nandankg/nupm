# Comprehensive Testing Strategy for Universal Forms Migration

## Current Testing Status

### Issues Identified
1. **Redux Store Context Missing**: Tests fail because App component requires Redux Provider wrapper
2. **Canvas API Missing**: JSDOM doesn't support HTMLCanvasElement methods needed by jsPDF
3. **Outdated Test**: Existing App.test.js looks for "learn react" text that doesn't exist

## Testing Framework Setup

### Current Setup
- **Testing Library**: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- **Test Runner**: Jest (via react-scripts)
- **Available Scripts**: `npm test`

### Required Test Environment Setup
```javascript
// src/setupTests.js additions needed
import { server } from './mocks/server'

// Mock canvas for jsPDF
HTMLCanvasElement.prototype.getContext = jest.fn()

// Establish API mocking before all tests
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

## Phase 1: Universal Form Component Tests

### Test Structure for Each Department
Create test files for each universal form component:

1. `src/features/operation/components/__tests__/UniversalOperationForm.test.jsx`
2. `src/features/finance/components/__tests__/UniversalFinanceForm.test.jsx`
3. `src/features/signalling/components/__tests__/UniversalSignallingForm.test.jsx`
4. `src/features/telecom/components/__tests__/UniversalTelecomForm.test.jsx`
5. `src/features/afc-sdc/components/__tests__/UniversalAfcSdcForm.test.jsx`
6. `src/features/afc-mainline/components/__tests__/UniversalAfcMainlineForm.test.jsx`
7. `src/features/afc-store/components/__tests__/UniversalAfcStoreForm.test.jsx`

### Test Coverage Areas

#### A. Component Rendering Tests
```javascript
describe('UniversalOperationForm', () => {
  const mockProps = {
    formType: 'equipment_failure_register',
    // other required props
  };

  test('renders form with correct title', () => {
    render(<UniversalOperationForm {...mockProps} />);
    expect(screen.getByRole('heading')).toHaveTextContent('Equipment Failure Register');
  });

  test('renders all required form fields', () => {
    render(<UniversalOperationForm {...mockProps} />);
    // Test for specific fields based on form configuration
    expect(screen.getByLabelText(/employee id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  });
});
```

#### B. Form Configuration Tests
```javascript
describe('Form Configuration Loading', () => {
  test('loads correct configuration for form type', () => {
    render(<UniversalOperationForm formType="bio-data-register" />);
    // Verify correct fields are displayed for this form type
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/designation/i)).toBeInTheDocument();
  });

  test('handles invalid form type gracefully', () => {
    render(<UniversalOperationForm formType="non-existent-form" />);
    expect(screen.getByText(/form not found/i)).toBeInTheDocument();
  });
});
```

#### C. Validation Tests
```javascript
describe('Form Validation', () => {
  test('validates required fields', async () => {
    render(<UniversalOperationForm formType="equipment_failure_register" />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/employee id is required/i)).toBeInTheDocument();
    });
  });

  test('validates employee ID format', async () => {
    render(<UniversalOperationForm formType="equipment_failure_register" />);
    const employeeIdField = screen.getByLabelText(/employee id/i);
    
    fireEvent.change(employeeIdField, { target: { value: 'invalid' } });
    fireEvent.blur(employeeIdField);
    
    await waitFor(() => {
      expect(screen.getByText(/invalid employee id format/i)).toBeInTheDocument();
    });
  });
});
```

#### D. Department-Specific Logic Tests
```javascript
describe('Department Specific Features', () => {
  test('calculates totals in finance forms', () => {
    render(<UniversalFinanceForm formType="expenditure-budget-register" />);
    // Test auto-calculation features
  });

  test('applies safety validations in signalling forms', () => {
    render(<UniversalSignallingForm formType="signal-failure" />);
    // Test safety-critical validations
  });
});
```

## Phase 2: Integration Tests

### Form Submission Tests
```javascript
describe('Form Submission Integration', () => {
  test('submits operation form successfully', async () => {
    render(<UniversalOperationForm formType="equipment_failure_register" />);
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/employee id/i), { 
      target: { value: 'ABC1234' } 
    });
    fireEvent.change(screen.getByLabelText(/date/i), { 
      target: { value: '2024-01-01' } 
    });
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/form submitted successfully/i)).toBeInTheDocument();
    });
  });
});
```

### Routing Integration Tests
```javascript
describe('Routing Integration', () => {
  test('navigates to correct universal form component', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route 
            path="/form/equipment-failure-register" 
            element={<UniversalOperationForm formType="equipment_failure_register" />} 
          />
        </Routes>
      </BrowserRouter>
    );
    
    // Test routing works correctly
  });
});
```

## Phase 3: E2E Testing Strategy

### Manual Testing Checklist

#### For Each Department Form:
- [ ] Form loads correctly with proper title
- [ ] All expected fields are present
- [ ] Field validation works as expected
- [ ] Form submission succeeds with valid data
- [ ] Form submission fails with invalid data and shows errors
- [ ] Auto-calculations work (where applicable)
- [ ] Department-specific features function correctly
- [ ] Breadcrumb navigation works
- [ ] Responsive design works on mobile/tablet

#### Cross-Department Testing:
- [ ] Similar form fields behave consistently
- [ ] Common validations (Employee ID, dates) work uniformly
- [ ] Error messages are consistent
- [ ] Success messages are consistent

### Performance Testing
```javascript
describe('Performance Tests', () => {
  test('form renders within acceptable time', () => {
    const start = performance.now();
    render(<UniversalOperationForm formType="equipment_failure_register" />);
    const end = performance.now();
    
    expect(end - start).toBeLessThan(100); // 100ms threshold
  });
});
```

## Phase 4: Migration Validation Tests

### Data Migration Tests
- Verify all 212+ forms are accessible through universal components
- Test that no legacy form paths are broken
- Validate that all form configurations are complete
- Test that all form types from the migration documentation work

### Feature Parity Tests
- Compare functionality between old individual forms and new universal components
- Test that no features were lost during migration
- Validate that all validation rules still apply
- Test that all auto-calculations still work

## Test Infrastructure Improvements Needed

### 1. Fix Current Test Environment
```javascript
// src/test-utils.js
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'

const AllTheProviders = ({children}) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}
```

### 2. Mock API Calls
```javascript
// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  rest.post('/api/forms/:formType', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        message: 'Form submitted successfully',
        id: '12345'
      })
    )
  })
]
```

### 3. Test Data Factory
```javascript
// src/test-utils/factories.js
export const createFormData = (formType, overrides = {}) => {
  const baseData = {
    employeeId: 'ABC1234',
    date: '2024-01-01',
    station: 'Central Station',
  }
  
  const typeSpecificData = {
    'equipment_failure_register': {
      equipmentType: 'Signal',
      failureDescription: 'Test failure'
    },
    // ... other form types
  }
  
  return {
    ...baseData,
    ...typeSpecificData[formType],
    ...overrides
  }
}
```

## Execution Plan

### Step 1: Fix Test Environment (Priority: High)
1. Create proper test utilities with Redux Provider wrapper
2. Mock canvas API for jsPDF compatibility
3. Update existing App.test.js to work with current app structure

### Step 2: Component Unit Tests (Priority: High)  
1. Start with Operation department (24 forms)
2. Move to Finance department (4 forms) 
3. Continue with remaining departments

### Step 3: Integration Tests (Priority: Medium)
1. Form submission flows
2. Routing integration
3. Cross-component interactions

### Step 4: E2E Manual Testing (Priority: Medium)
1. Manual testing checklist execution
2. Performance testing
3. Mobile/responsive testing

### Step 5: Migration Validation (Priority: Low)
1. Comprehensive form coverage verification
2. Feature parity validation
3. Performance comparison

## Success Metrics

- **Unit Test Coverage**: >80% coverage for all universal form components
- **Integration Test Coverage**: All major user flows tested
- **Zero Regression**: All migrated forms maintain original functionality
- **Performance**: Forms load within 100ms
- **User Experience**: Consistent behavior across all departments

## Recommended Tools

- **Testing**: Jest, React Testing Library, MSW (for API mocking)
- **E2E**: Cypress or Playwright (future consideration)
- **Performance**: React DevTools Profiler, Lighthouse CI
- **Coverage**: Built-in Jest coverage reporting