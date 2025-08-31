import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";

/**
 * TableFilter Component
 * Dynamically filters table data based on user input for specific columns.
 *
 * Props:
 * - columns: Array of column definitions (each with `field` and `headerName`).
 * - data: Array of row objects (table data).
 */
const TableFilter = ({ columns, data }) => {
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  // Handle filter value change
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    const filtered = data.filter((row) =>
      Object.keys(filters).every((field) => {
        if (!filters[field]) return true; // Skip empty filters
        return String(row[field])
          .toLowerCase()
          .includes(filters[field].toLowerCase());
      })
    );
    setFilteredData(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({});
    setFilteredData(data);
  };

  return (
    <Box padding={3}>
      <Typography variant="h5" gutterBottom>
        Table Filter
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Grid container spacing={2}>
          {columns.map((col) => (
            <Grid item xs={12} sm={6} md={4} key={col.field}>
              <TextField
                label={`Filter by ${col.headerName}`}
                value={filters[col.field] || ""}
                onChange={(e) => handleFilterChange(col.field, e.target.value)}
                variant="outlined"
                fullWidth
                size="small"
              />
            </Grid>
          ))}
        </Grid>
        <Box marginTop={3} textAlign="right">
          <Button
            variant="contained"
            color="primary"
            onClick={applyFilters}
            style={{ marginRight: "10px" }}
          >
            Apply Filters
          </Button>
          <Button variant="outlined" color="secondary" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Filtered Table
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field}>{col.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length ? (
              filteredData.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((col) => (
                    <TableCell key={col.field}>
                      {row[col.field] || "—"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableFilter;
