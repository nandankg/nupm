// QuarterlyMaintenanceOccBccEdit.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { editData } from '../../reducer/redux/tableDataSlice';
import BasicInfoSection from '../../comp/BasicInfoSection';
import SystemsTable from '../../comp/SystemsTable';
import PersonnelSection from '../../comp/PersonnelSection';

const getLastParameter = () => {
  const pathname = window.location.pathname;
  return pathname.split('/').filter(Boolean).pop()?.trim() || '';
};

const QuarterlyMaintenanceOccBccEdit = ({ formTitle = 'Quarterly Maintenance Schedule' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = location.state || {};
  
  const mjl11List = useSelector((state) => state.data);
  const [slug] = useState(getLastParameter);
  const [checkAll, setCheckAll] = useState(false);

  const filteredData = mjl11List.data?.data?.filter((item) => item.id === id)[0] || {};

  const [formData, setFormData] = useState({
    id:filteredData.id,
    location: filteredData.location || '',
    date: filteredData.date || '',
    systems: filteredData.systems ? JSON.parse(JSON.stringify(filteredData.systems)) : [], // Deep copy
    supervisor: filteredData.supervisor ? { ...filteredData.supervisor } : { name: '', empId: '', signature: '' },
    maintainer: filteredData.maintainer ? { ...filteredData.maintainer } : { name: '', empId: '', signature: '' },
  });

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSystemChange = (systemIndex, activityIndex, field, value, subField) => {
    setFormData((prev) => {
      // Create a deep copy of the systems array
      const updatedSystems = JSON.parse(JSON.stringify(prev.systems));
      
      if (subField) {
        // Handle nested object updates (like clstr.cpu, etc.)
        updatedSystems[systemIndex].activities[activityIndex][field] = {
          ...updatedSystems[systemIndex].activities[activityIndex][field],
          [subField]: value
        };
      } else {
        // Handle direct field updates (like remarks)
        updatedSystems[systemIndex].activities[activityIndex] = {
          ...updatedSystems[systemIndex].activities[activityIndex],
          [field]: value
        };
      }
      
      return { ...prev, systems: updatedSystems };
    });
  };

  const handlePersonnelChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const toggleCheckAll = () => setCheckAll((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editData({ formType: slug, values: formData }));
    navigate(`list/${slug}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        {formTitle}
      </Typography>
      <form onSubmit={handleSubmit}>
        <BasicInfoSection
          formData={formData}
          onChange={handleBasicInfoChange}
        />
        
        <SystemsTable
          systems={formData.systems}
          checkAll={checkAll}
          onToggleCheckAll={toggleCheckAll}
          onSystemChange={handleSystemChange}
        />

        <PersonnelSection
          title="Supervisor Details"
          data={formData.supervisor}
          onChange={(field, value) => handlePersonnelChange('supervisor', field, value)}
        />
        
        <PersonnelSection
          title="Maintainer Details"
          data={formData.maintainer}
          onChange={(field, value) => handlePersonnelChange('maintainer', field, value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

QuarterlyMaintenanceOccBccEdit.propTypes = {
  formTitle: PropTypes.string,
};

export default QuarterlyMaintenanceOccBccEdit;