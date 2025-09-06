import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Paper, Button, Divider } from '@mui/material';
import { Save as SaveIcon, Print as PrintIcon } from '@mui/icons-material';

// Import universal components
import { 
  UniversalAFCMainlineFormField, 
  AFCMainlineFormLayout,
  validateForm,
  fmtsBookValidation 
} from '../components';

// Import AFC-Mainline system slice
import { 
  addSystemData,
  selectSystemData,
  selectSystemLoading
} from '../redux/systemSlice';

/**
 * FMTS Book Mainline Form - Migrated to Universal Component Architecture
 * 
 * FIELD PRESERVATION: 100% - All original field names preserved exactly
 * Original Location: src/forms/pinki/FMTSReg.jsx
 * Form ID: 67 | Slug: fmts-book-mainline
 */
const FmtsBookMainlineForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fmts = useSelector((state) => state.fmtsbook || []);
  
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Set slug from Redux state (preserve existing logic)
  useEffect(() => {
    if (fmts) {
      setSlug(fmts.slug);
    }
  }, [fmts]);

  // FIELD PRESERVATION: Exact field structure from original form
  const [formValues, setFormValues] = useState({
    rdate: '',                    // Report date - PRESERVED
    hoby: '',                     // HO by field - PRESERVED
    pstatus: '',                  // Problem status - PRESERVED
    ostatus: '',                  // Overall status - PRESERVED
    doffault: '',                 // Date of fault - PRESERVED
    dofrectification: '',         // Date of rectification - PRESERVED
    rdetail: '',                  // Rectification details - PRESERVED
    remark: '',                   // Remarks - PRESERVED
    daterectified: '',            // Date rectified - PRESERVED
    ho: '',                       // HO field - PRESERVED
    hodate: '',                   // HO date - PRESERVED
    tobysign: 'sign',             // TO signature - PRESERVED
    hobysign: 'sign',             // HO signature - PRESERVED
    rectified_by: '',             // Rectified by person - PRESERVED
    isNewItem: null,              // New item boolean - PRESERVED
    isRepairedItem: null,         // Repaired item boolean - PRESERVED
    oldOsisFmtsNo: '',            // Old OSIS FMTS number - PRESERVED
    itemDetails: '',              // Item details - PRESERVED
  });

  // Handle field changes with validation
  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  // Handle form submission (preserve existing Redux integration)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Validate form using universal validation
    const validation = validateForm(formValues, fmtsBookValidation);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    try {
      // Preserve existing Redux dispatch pattern
      const formData = {
        ...formValues,
        slug: 'fmts-book-mainline',
        formType: 'fmts-book-mainline',
        submittedAt: new Date().toISOString(),
      };

      await dispatch(addSystemData({ 
        values: formData,
        formType: 'fmts-book-mainline' 
      }));
      
      setSuccess(true);
      
      // Auto-redirect after success (preserve existing behavior)
      setTimeout(() => {
        navigate('/list/fmts-book-mainline');
      }, 2000);

    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to save form. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle print functionality
  const handlePrint = () => {
    window.print();
  };

  return (
    <AFCMainlineFormLayout
      title="FMTS Book - Mainline"
      onSubmit={handleSubmit}
      onPrint={handlePrint}
      loading={loading}
      error={errors.submit}
      success={success}
      formId="AFC-ML-FMTS-001"
    >
      <Grid container spacing={3}>
        {/* Report Information Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Report Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="date"
            name="rdate"
            label="Report Date"
            value={formValues.rdate}
            onChange={handleFieldChange}
            error={errors.rdate}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="text"
            name="hoby"
            label="HO By"
            value={formValues.hoby}
            onChange={handleFieldChange}
            error={errors.hoby}
            required
            placeholder="Higher Official name"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="fault-status"
            name="pstatus"
            label="Problem Status"
            value={formValues.pstatus}
            onChange={handleFieldChange}
            error={errors.pstatus}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="select"
            name="ostatus"
            label="Overall Status"
            value={formValues.ostatus}
            onChange={handleFieldChange}
            error={errors.ostatus}
            options={['Open', 'Closed', 'Under Review']}
            required
          />
        </Grid>

        {/* Fault Details Section */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Fault Details
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="date"
            name="doffault"
            label="Date of Fault"
            value={formValues.doffault}
            onChange={handleFieldChange}
            error={errors.doffault}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="date"
            name="dofrectification"
            label="Date of Rectification"
            value={formValues.dofrectification}
            onChange={handleFieldChange}
            error={errors.dofrectification}
          />
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="rdetail"
            label="Rectification Details"
            value={formValues.rdetail}
            onChange={handleFieldChange}
            error={errors.rdetail}
            required
            placeholder="Detailed description of rectification steps taken..."
          />
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="textarea"
            name="remark"
            label="Remarks"
            value={formValues.remark}
            onChange={handleFieldChange}
            error={errors.remark}
            required
            rows={3}
            placeholder="Additional remarks and observations..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="date"
            name="daterectified"
            label="Date Rectified"
            value={formValues.daterectified}
            onChange={handleFieldChange}
            error={errors.daterectified}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="text"
            name="rectified_by"
            label="Rectified By"
            value={formValues.rectified_by}
            onChange={handleFieldChange}
            error={errors.rectified_by}
            placeholder="Person who performed rectification"
          />
        </Grid>

        {/* Item Information Section */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Item Information
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UniversalAFCMainlineFormField
            type="technical-details"
            name="itemDetails"
            label="Item Details"
            value={formValues.itemDetails}
            onChange={handleFieldChange}
            error={errors.itemDetails}
            required
            placeholder="Detailed item specifications and description..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="text"
            name="oldOsisFmtsNo"
            label="Old OSIS FMTS Number"
            value={formValues.oldOsisFmtsNo}
            onChange={handleFieldChange}
            error={errors.oldOsisFmtsNo}
            placeholder="e.g., OSIS-FMTS-2024-001"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="checkbox"
            name="isNewItem"
            label="New Item"
            value={formValues.isNewItem}
            onChange={handleFieldChange}
            error={errors.isNewItem}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <UniversalAFCMainlineFormField
            type="checkbox"
            name="isRepairedItem"
            label="Repaired Item"
            value={formValues.isRepairedItem}
            onChange={handleFieldChange}
            error={errors.isRepairedItem}
          />
        </Grid>

        {/* Approval Section */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Approvals & Signatures
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="text"
            name="ho"
            label="HO"
            value={formValues.ho}
            onChange={handleFieldChange}
            error={errors.ho}
            required
            placeholder="Higher Official name"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="date"
            name="hodate"
            label="HO Date"
            value={formValues.hodate}
            onChange={handleFieldChange}
            error={errors.hodate}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="employee-signature"
            name="tobysign"
            label="TO Signature"
            value={formValues.tobysign}
            onChange={handleFieldChange}
            error={errors.tobysign}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <UniversalAFCMainlineFormField
            type="employee-signature"
            name="hobysign"
            label="HO Signature"
            value={formValues.hobysign}
            onChange={handleFieldChange}
            error={errors.hobysign}
            required
          />
        </Grid>

        {/* Display business rule errors */}
        {(errors.dateConsistency || errors.statusLogic) && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: '#ffebee' }}>
              <Typography variant="body2" color="error">
                <strong>Validation Errors:</strong>
              </Typography>
              {errors.dateConsistency && (
                <Typography variant="body2" color="error">
                  • {errors.dateConsistency}
                </Typography>
              )}
              {errors.statusLogic && (
                <Typography variant="body2" color="error">
                  • {errors.statusLogic}
                </Typography>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </AFCMainlineFormLayout>
  );
};

export default FmtsBookMainlineForm;