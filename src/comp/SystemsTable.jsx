// SystemsTable.jsx
import React from 'react';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

const SystemsTable = ({ systems, checkAll, onToggleCheckAll, onSystemChange }) => (
  <>
    <Typography variant="h6" sx={{ mt: 4 }}>
      Systems and Activities
    </Typography>
    <Table sx={{ mt: 3 }}>
      <TableHead>
        <TableRow>
          <TableCell><strong>System</strong></TableCell>
          <TableCell><strong>Activity</strong></TableCell>
          <TableCell><strong>Details</strong></TableCell>
          <TableCell>
            <label>
              <input
                type="checkbox"
                checked={checkAll}
                onChange={onToggleCheckAll}
              /> Check All
            </label>
          </TableCell>
          <TableCell><strong>Remarks</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {systems.map((system, systemIndex) =>
          system.activities.map((activity, activityIndex) => (
            <TableRow key={`${systemIndex}-${activityIndex}`}>
              <TableCell>{activityIndex === 0 ? system.system : ''}</TableCell>
              <TableCell>{activity.activity}</TableCell>
              <TableCell>
                {system.system === 'PAS' && activity.hmiNormal !== undefined && (
                  <>
                    <TextField
                      label="HMI Normal"
                      value={activity.hmiNormal}
                      onChange={(e) => onSystemChange(systemIndex, activityIndex, 'hmiNormal', e.target.value)}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <TextField
                      label="HMI Emergency"
                      value={activity.hmiEmergency}
                      onChange={(e) => onSystemChange(systemIndex, activityIndex, 'hmiEmergency', e.target.value)}
                      size="small"
                    />
                  </>
                )}
                {/* Add similar conditional rendering for TelePhone and CCTV */}
              </TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  checked={checkAll}
                  readOnly
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={activity.remarks}
                  onChange={(e) => onSystemChange(systemIndex, activityIndex, 'remarks', e.target.value)}
                  fullWidth
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </>
);

SystemsTable.propTypes = {
  systems: PropTypes.array.isRequired,
  checkAll: PropTypes.bool.isRequired,
  onToggleCheckAll: PropTypes.func.isRequired,
  onSystemChange: PropTypes.func.isRequired,
};

export default SystemsTable;