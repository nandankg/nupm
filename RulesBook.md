.

## 🎯 PRIMARY OBJECTIVES

### Performance Optimization (ALL areas required):
- **Bundle size reduction**: Implement code splitting, lazy loading, tree shaking
- **Render speed improvement**: Optimize component re-renders, implement memoization
- **Memory usage optimization**: Prevent memory leaks, optimize state management
- **API call optimization**: Implement caching, debouncing, request deduplication

### Folder Structure Modernization:
- Restructure ALL directories following industry best practices
- Organize components, utils, services, hooks, constants, types, tests
- Implement feature-based or domain-driven folder architecture
- Ensure scalable and maintainable structure

## 🚨 CRITICAL PRESERVATION RULES (NON-NEGOTIABLE)

### Absolute Preservation Requirements:
1. **Form Fields**: NEVER modify, remove, or alter existing form field names, types, or validation rules
2. **Dropdown Options**: NEVER change dropdown values, labels, or option structures
3. **Important Checkboxes**: Maintain all existing checkboxes and their functionality
4. **Report Table Structure**: Preserve column order, data mapping, and table layout
5. **API Contracts**: Maintain existing API request/response structures
6. **Data Flow**: Preserve Redux state structure and data relationships

### UI/UX Improvements Allowed:
- Enhanced styling and visual design
- Better accessibility features
- Improved responsive design
- Smoother animations and transitions
- Better loading states and error handling
- Improved user feedback mechanisms


### Testing Strategy:
- Create comprehensive unit tests for all components
- Integration tests for complex workflows
- End-to-end tests for critical user journeys
- Performance testing and benchmarking
- Accessibility testing
- Visual regression testing

### State Management Optimization:
- Optimize Redux store structure
- Implement Redux Toolkit for better performance
- Add proper middleware for API handling
- Implement proper loading and error states
- Optimize selector patterns with Reselect
- Implement proper caching strategies

### Code Quality Standards:
- ESLint and Prettier configuration
- Consistent naming conventions
- Proper code documentation
- Remove dead code and unused dependencies
- Implement proper error handling
- Follow SOLID principles



### Dependencies Management:
- Update to latest stable versions of React, Redux, and related libraries
- Add performance monitoring tools (React DevTools Profiler)
- Include testing utilities (Jest, React Testing Library, Cypress)
- Add code quality tools (ESLint, Prettier, Husky)
- Consider adding utility libraries (lodash-es, date-fns, etc.)

## 📝 DEVELOPMENT PROCESS

###  Analysis & Planning:
1. Audit existing codebase for performance bottlenecks
2. Identify reusable component patterns
3. Plan folder structure migration strategy
4. Document existing functionality to preserve

###  Universal Components:
1. Create component library with proper typing
2. Implement design system consistency
3. Build comprehensive test suites
4. Document component usage

###  Structure Migration:
1. Gradually migrate files to new structure
2. Update import paths systematically
3. Ensure no functionality is broken
4. Run comprehensive tests after each migration

###  Performance Optimization:
1. Implement code splitting and lazy loading
2. Optimize component rendering patterns
3. Enhance API call efficiency
4. Reduce bundle size through optimization

### Testing & Validation:
1. Run full test suite
2. Performance benchmarking
3. User acceptance testing
4. Accessibility compliance verification

## 🔒 STRICT RESTRUCTURING RULES (MANDATORY COMPLIANCE)

### Rule 1: Data Integrity Protection
- **NEVER** modify existing database field mappings or API response structures
- **NEVER** change form field `name` attributes or validation schemas
- **NEVER** alter Redux action types or payload structures that affect existing data flow
- **ALWAYS** verify data integrity before and after any file moves
- **ALWAYS** maintain exact same state shape in Redux store

### Rule 2: Incremental Migration Protocol
- **NEVER** restructure more than one feature/module at a time
- **ALWAYS** complete full testing cycle before moving to next component
- **ALWAYS** create backup commits before major structural changes
- **NEVER** delete original files until new structure is fully tested and validated
- **ALWAYS** maintain parallel structure during transition period

### Rule 3: Import Path Management

- **ALWAYS** update all import statements when moving files
- **ALWAYS** use absolute imports with path aliases for shared components
- **NEVER** leave broken import references
- **ALWAYS** verify all imports resolve correctly after restructuring

### Rule 4: Component Migration Safeguards
- **NEVER** change component props interface during restructuring
- **NEVER** modify component lifecycle behavior or hooks dependency arrays
- **ALWAYS** maintain exact same component export signatures
- **ALWAYS** preserve component display names for debugging
- **NEVER** change component default props or prop types

### Rule 5: Testing Continuity Requirements
- **ALWAYS** run existing test suite before any structural changes
- **NEVER** skip tests that were previously passing
- **ALWAYS** maintain or improve test coverage during restructuring
- **NEVER** disable or comment out existing tests without replacement
- **ALWAYS** verify all tests pass in new structure before proceeding

### Rule 6: Configuration Preservation
- **NEVER** modify webpack, babel, or build configuration without explicit approval
- **NEVER** change environment variable names or structures
- **ALWAYS** preserve existing build scripts and deployment processes
- **NEVER** alter existing routing configurations or route names
- **ALWAYS** maintain existing proxy settings and API endpoints

### Rule 7: Dependency Management Restrictions
- **NEVER** remove dependencies that are currently in use
- **NEVER** downgrade major versions of critical dependencies
- **ALWAYS** test thoroughly after adding new dependencies
- **NEVER** introduce dependencies that conflict with existing ones
- **ALWAYS** document reasons for any dependency changes

### Rule 8: File Naming Conventions Enforcement
- **ALWAYS** maintain consistent file naming patterns throughout project
- **NEVER** change existing file names that are referenced in build processes
- **ALWAYS** use PascalCase for component files
- **ALWAYS** use camelCase for utility and service files
- **NEVER** use spaces or special characters in file names

### Rule 9: Code Preservation During Restructuring
- **NEVER** refactor component logic while restructuring folders
- **NEVER** optimize algorithms or business logic during structural changes
- **ALWAYS** separate restructuring commits from logic optimization commits
- **NEVER** combine folder moves with feature additions or bug fixes
- **ALWAYS** focus purely on organizational changes during restructuring phase

### Rule 10: Rollback Preparedness
- **ALWAYS** maintain ability to rollback to previous structure
- **NEVER** make irreversible changes without backup strategy
- **ALWAYS** document each restructuring step for potential rollback
- **ALWAYS** test rollback procedure before major restructuring
- **NEVER** proceed if rollback strategy is not clearly defined

### Rule 11: Communication and Documentation
- **ALWAYS** document what files are moved and why
- **ALWAYS** update README and development documentation
- **NEVER** leave restructuring partially complete without documentation
- **ALWAYS** communicate changes that might affect other team members
- **ALWAYS** update IDE configuration files and workspace settings

### Rule 12: Performance Impact Monitoring
- **ALWAYS** benchmark performance before restructuring
- **NEVER** accept performance degradation during restructuring
- **ALWAYS** monitor bundle size after each major restructuring step
- **ALWAYS** verify build times don't increase significantly
- **NEVER** ignore performance warnings introduced during restructuring

### Rule 13: Production Readiness Verification
- **ALWAYS** verify production build works after restructuring
- **NEVER** assume development environment changes work in production
- **ALWAYS** test with minified/optimized builds
- **ALWAYS** verify environment-specific configurations still work
- **NEVER** deploy restructured code without full production-like testing



### Rule 15: Security Considerations
- **NEVER** expose sensitive configuration during restructuring
- **ALWAYS** maintain existing security middleware and authentication flows
- **NEVER** change permission or authorization logic during restructuring
- **ALWAYS** preserve existing input validation and sanitization
- **NEVER** introduce security vulnerabilities through structural changes

## ⚠️ VALIDATION CHECKLIST

Before considering the task complete, verify:
- [ ] All existing form fields remain unchanged
- [ ] All dropdown options are preserved
- [ ] All important checkboxes are functional
- [ ] Report tables display data correctly
- [ ] API integration works without changes
- [ ] Performance metrics show improvement
- [ ] All tests pass successfully
- [ ] No breaking changes in user workflows
- [ ] Code follows best practices and is well-documented

## 🎯 SUCCESS METRICS

Measure success by:
- Bundle size reduction (target: 20-30% smaller)
- Faster initial load time (target: 30% improvement)
- Reduced memory usage (target: 25% reduction)
- Improved Lighthouse scores (target: 90+ in all categories)
- Reduced API response times
- Improved developer experience and maintainability
- 100% preservation of existing functionality

Remember: **Optimization should never compromise functionality**. When in doubt, prioritize preserving existing behavior over performance gains.