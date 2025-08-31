import React from "react";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import { RiFileExcel2Fill } from "react-icons/ri";
/**
 * ExcelExportComponent
 * Exports data from any table into an Excel file.
 *
 * Props:
 * - data: Array of objects representing the table data.
 * - columns: Array of column definitions (each with `field` and `headerName`).
 * - fileName: Name of the generated Excel file (default: "table-data.xlsx").
 */
const ExcelExportComponent = ({
  data,
  columns,
  fileName = "table-data.xlsx",
}) => {
  const handleExport = () => {
    if (!data || !data.length) {
      alert("No data available to export!");
      return;
    }
    console.log("ExcelExportComponent rendered");
    // Create a worksheet from the data
    const worksheetData = data.map((row) => {
      const formattedRow = {};
      columns.forEach(({ field, headerName }) => {
        formattedRow[headerName] = row[field] || "";
      });
      return formattedRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the Excel file
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <button
      onClick={handleExport}
      className="btn"
      style={{ border: "1px solid #0baa9a " }}
    >
      <RiFileExcel2Fill color="#0baa9a " size={25} />
    </button>
  );
};

ExcelExportComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
    })
  ).isRequired,
  fileName: PropTypes.string,
};

export default ExcelExportComponent;
