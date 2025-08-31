import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExcelExportButton = ({ data, defaultFileName = 'export', allColumns }) => {
  const [selectedColumns, setSelectedColumns] = useState(allColumns.map(col => col.key));
  const [fileName, setFileName] = useState(defaultFileName);

  // Custom header mapping
  const headerMap = allColumns.reduce((acc, col) => ({
    ...acc,
    [col.key]: col.label || col.key
  }), {});

  const exportToExcel = () => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    // Filter data to include only selected columns
    const filteredData = data.map(item =>
      selectedColumns.reduce((acc, key) => ({
        ...acc,
        [headerMap[key]]: item[key]
      }), {})
    );

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData, {
      header: selectedColumns.map(key => headerMap[key]),
    });

    // Apply styling
    const colWidths = selectedColumns.map(key => ({
      wch: Math.max(headerMap[key].length, 10) // Minimum width of 10
    }));
    worksheet['!cols'] = colWidths;

    // Bold headers
    selectedColumns.forEach((key, index) => {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
      worksheet[cellRef].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: 'FFFF00' } }, // Yellow background
        alignment: { horizontal: 'center' }
      };
    });

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  };

  // Handle column selection
  const toggleColumn = (key) => {
    if (selectedColumns.includes(key)) {
      setSelectedColumns(selectedColumns.filter(col => col !== key));
    } else {
      setSelectedColumns([...selectedColumns, key]);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 no-print">
      {/* File Name Input */}
      <div>
        <label className="block mb-1 text-sm font-medium">File Name:</label>
        <input
          type="text"
          className="border p-2 rounded w-full sm:w-32"
          value={fileName}
          onChange={(e) => setFileName(e.target.value || defaultFileName)}
        />
      </div>

      {/* Column Selector */}
      <div>
        <label className="block mb-1 text-sm font-medium">Columns:</label>
        <div className="flex flex-wrap gap-2">
          {allColumns.map(col => (
            <label key={col.key} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedColumns.includes(col.key)}
                onChange={() => toggleColumn(col.key)}
                className="mr-1"
              />
              {col.label || col.key}
            </label>
          ))}
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={exportToExcel}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 sm:mt-0"
      >
        Export to Excel
      </button>
    </div>
  );
};

export default ExcelExportButton;