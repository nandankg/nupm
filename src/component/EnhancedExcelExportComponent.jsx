import React, { useMemo } from "react";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import { RiFileExcel2Fill } from "react-icons/ri";
import { formatToIndianDate, getCurrentIndianDate } from "../utils/dateUtils";

/**
 * EnhancedExcelExportComponent
 * Exports data from any table into an Excel file with proper metadata and Indian date formatting.
 * Includes employee information, form details, and timestamp in header rows.
 * All dates are converted to dd-mm-yyyy format for Indian users.
 *
 * Props:
 * - data: Array of objects representing the table data.
 * - columns: Array of column definitions (each with `field` and `headerName`).
 * - fileName: Name of the generated Excel file.
 * - formName: Name of the form for metadata.
 * - formId: Form ID for tracking.
 * - includeSerialNumber: Whether to add S.No column (default: true).
 */
const EnhancedExcelExportComponent = ({
  data,
  columns,
  fileName = "table-data.xlsx",
  formName = "Data Export",
  formId = "",
  includeSerialNumber = true
}) => {
  // Get user data with memoization
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);

  // Function to convert date values in data to Indian format
  const formatDataDates = (rowData, columns) => {
    const formattedRow = {};
    
    columns.forEach(({ field, headerName }) => {
      let value = rowData[field] || "";
      
      // Check if this might be a date field based on field name or value
      if (value && (
        field.toLowerCase().includes('date') ||
        field.toLowerCase().includes('time') ||
        headerName.toLowerCase().includes('date') ||
        headerName.toLowerCase().includes('time')
      )) {
        // Try to format as Indian date
        const indianDate = formatToIndianDate(value);
        if (indianDate) {
          value = indianDate;
        }
      }
      
      formattedRow[headerName] = value;
    });
    
    return formattedRow;
  };

  const handleExport = () => {
    if (!data || !data.length) {
      alert("No data available to export!");
      return;
    }

    try {
      console.log("Starting Excel export for:", formName);

      // Prepare column headers
      let finalColumns = [...columns];
      if (includeSerialNumber) {
        finalColumns = [{ field: 'serial', headerName: 'S.No' }, ...columns];
      }

      // Prepare main data with Indian date formatting
      const worksheetData = data.map((row, index) => {
        let formattedRow = formatDataDates(row, columns);
        
        if (includeSerialNumber) {
          formattedRow = { 'S.No': index + 1, ...formattedRow };
        }
        
        return formattedRow;
      });

      // Create metadata header section
      const currentDateTime = getCurrentIndianDate(true);
      const exportDate = getCurrentIndianDate(false);
      
      // Create empty row structure for metadata
      const createEmptyRow = () => {
        const row = {};
        finalColumns.forEach(col => {
          row[col.headerName] = "";
        });
        return row;
      };

      // Metadata rows
      const metadataRows = [
        {
          [finalColumns[0].headerName]: "UPMRC - Uttar Pradesh Metro Rail Corporation Limited",
          ...Object.fromEntries(finalColumns.slice(1).map(col => [col.headerName, ""]))
        },
        createEmptyRow(), // Empty separator row
        {
          [finalColumns[0].headerName]: "Report Details:",
          [finalColumns[1]?.headerName || finalColumns[0].headerName]: formName,
          ...Object.fromEntries(finalColumns.slice(2).map(col => [col.headerName, ""]))
        },
        {
          [finalColumns[0].headerName]: "Form ID:",
          [finalColumns[1]?.headerName || finalColumns[0].headerName]: formId || "N/A",
          ...Object.fromEntries(finalColumns.slice(2).map(col => [col.headerName, ""]))
        },
        {
          [finalColumns[0].headerName]: "Total Records:",
          [finalColumns[1]?.headerName || finalColumns[0].headerName]: data.length.toString(),
          ...Object.fromEntries(finalColumns.slice(2).map(col => [col.headerName, ""]))
        },
        createEmptyRow(), // Empty separator row
        {
          [finalColumns[0].headerName]: "Export Information:",
          ...Object.fromEntries(finalColumns.slice(1).map(col => [col.headerName, ""]))
        },
        {
          [finalColumns[0].headerName]: "Exported by:",
          [finalColumns[1]?.headerName || finalColumns[0].headerName]: user?.name || "Unknown User",
          ...Object.fromEntries(finalColumns.slice(2).map(col => [col.headerName, ""]))
        },
        {
          [finalColumns[0].headerName]: "Employee ID:",
          [finalColumns[1]?.headerName || finalColumns[0].headerName]: user?.employeeid || user?.profileid || "N/A",
          ...Object.fromEntries(finalColumns.slice(2).map(col => [col.headerName, ""]))
        },
        {
          [finalColumns[0].headerName]: "Department:",
          [finalColumns[1]?.headerName || finalColumns[0].headerName]: user?.department || "N/A",
          ...Object.fromEntries(finalColumns.slice(2).map(col => [col.headerName, ""]))
        },
        {
          [finalColumns[0].headerName]: "Station:",
          [finalColumns[1]?.headerName || finalColumns[0].headerName]: user?.station || "N/A",
          ...Object.fromEntries(finalColumns.slice(2).map(col => [col.headerName, ""]))
        },
        {
          [finalColumns[0].headerName]: "Export Date:",
          [finalColumns[1]?.headerName || finalColumns[0].headerName]: exportDate,
          ...Object.fromEntries(finalColumns.slice(2).map(col => [col.headerName, ""]))
        },
        {
          [finalColumns[0].headerName]: "Export Time:",
          [finalColumns[1]?.headerName || finalColumns[0].headerName]: currentDateTime,
          ...Object.fromEntries(finalColumns.slice(2).map(col => [col.headerName, ""]))
        },
        createEmptyRow(), // Empty separator row
        createEmptyRow(), // Another separator row before data
        // Data header row will be automatically created by XLSX
        ...worksheetData
      ];

      // Create worksheet from data
      const worksheet = XLSX.utils.json_to_sheet(metadataRows);

      // Apply styling to metadata rows
      const range = XLSX.utils.decode_range(worksheet['!ref']);
      
      // Style the metadata section (first 13 rows)
      for (let R = 0; R < 13; R++) {
        for (let C = 0; C <= range.e.c; C++) {
          const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
          if (worksheet[cellRef]) {
            // Different styles for different types of metadata rows
            if (R === 0) {
              // Title row
              worksheet[cellRef].s = {
                font: { bold: true, size: 14, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: "1F4E79" } },
                alignment: { horizontal: 'center', vertical: 'center' },
                border: {
                  top: { style: 'thin' },
                  bottom: { style: 'thin' },
                  left: { style: 'thin' },
                  right: { style: 'thin' }
                }
              };
            } else if (R === 2 || R === 6) {
              // Section headers
              worksheet[cellRef].s = {
                font: { bold: true, size: 11, color: { rgb: "000000" } },
                fill: { fgColor: { rgb: "D5E3F0" } },
                alignment: { horizontal: 'left' },
                border: {
                  top: { style: 'thin' },
                  bottom: { style: 'thin' },
                  left: { style: 'thin' },
                  right: { style: 'thin' }
                }
              };
            } else if (R > 2 && R < 6 || R > 6 && R < 12) {
              // Data rows
              worksheet[cellRef].s = {
                font: { size: 10 },
                fill: { fgColor: { rgb: "F2F2F2" } },
                alignment: { horizontal: 'left' },
                border: {
                  top: { style: 'thin' },
                  bottom: { style: 'thin' },
                  left: { style: 'thin' },
                  right: { style: 'thin' }
                }
              };
            }
          }
        }
      }

      // Style the data header row (row 14, 0-indexed = 13)
      for (let C = 0; C <= range.e.c; C++) {
        const cellRef = XLSX.utils.encode_cell({ r: 13, c: C });
        if (worksheet[cellRef]) {
          worksheet[cellRef].s = {
            font: { bold: true, size: 11, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4472C4" } },
            alignment: { horizontal: 'center', vertical: 'center' },
            border: {
              top: { style: 'medium' },
              bottom: { style: 'medium' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
          };
        }
      }

      // Set column widths
      const colWidths = finalColumns.map((col, index) => {
        if (index === 0 && includeSerialNumber) {
          return { wch: 8 }; // Narrow for S.No
        }
        return { wch: Math.max(col.headerName.length + 5, 15) };
      });
      worksheet['!cols'] = colWidths;

      // Create workbook and append worksheet
      const workbook = XLSX.utils.book_new();
      const sheetName = formName.length > 31 ? formName.substring(0, 31) : formName;
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

      // Add workbook properties
      workbook.Props = {
        Title: formName,
        Subject: `${formName} - UPMRC Report`,
        Author: user?.name || 'UPMRC User',
        Manager: user?.department || 'UPMRC',
        Company: 'Uttar Pradesh Metro Rail Corporation Limited',
        Category: 'UPMRC Reports',
        Keywords: `UPMRC,${formName},Report,${exportDate}`,
        Comments: `Generated on ${currentDateTime} by ${user?.name || 'UPMRC User'}`,
        CreatedDate: new Date()
      };

      // Write the Excel file with proper filename
      const finalFilename = fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
      XLSX.writeFile(workbook, finalFilename);

      console.log(`Excel file exported successfully: ${finalFilename}`);
      
    } catch (error) {
      console.error("Excel export error:", error);
      alert(`Failed to export Excel file: ${error.message}. Please try again or contact support.`);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="btn"
      style={{
        border: "1px solid #0baa9a",
        minWidth: "45px",
        padding: "8px",
        borderRadius: "4px",
        backgroundColor: "#f8f9fa"
      }}
      title={`Export ${formName} to Excel with metadata`}
    >
      <RiFileExcel2Fill color="#0baa9a" size={25} />
    </button>
  );
};

EnhancedExcelExportComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
    })
  ).isRequired,
  fileName: PropTypes.string,
  formName: PropTypes.string,
  formId: PropTypes.string,
  includeSerialNumber: PropTypes.bool
};

export default EnhancedExcelExportComponent;