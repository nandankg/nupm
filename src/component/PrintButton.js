import React, { useState, useCallback } from 'react';
import ReactToPrint from 'react-to-print';

// Reusable PrintButton component
const PrintButton = ({ targetRef, defaultPageSize = 'A4', defaultOrientation = 'portrait' }) => {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [orientation, setOrientation] = useState(defaultOrientation);
  const [scale, setScale] = useState(1); // Default scale: 100%

  // Print-specific styles
  const getPrintStyles = useCallback(() => `
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      .print-content {
        transform: scale(${scale});
        transform-origin: top left;
        width: ${pageSize === 'A4' ? (orientation === 'portrait' ? '210mm' : '297mm') : 
                 pageSize === 'LETTER' ? (orientation === 'portrait' ? '8.5in' : '11in') : 
                 (orientation === 'portrait' ? '297mm' : '420mm')};
        height: ${pageSize === 'A4' ? (orientation === 'portrait' ? '297mm' : '210mm') : 
                  pageSize === 'LETTER' ? (orientation === 'portrait' ? '11in' : '8.5in') : 
                  (orientation === 'portrait' ? '420mm' : '297mm')};
        overflow: visible !important;
        page-break-after: always;
      }
      @page {
        size: ${pageSize} ${orientation};
        margin: 10mm;
      }
      nav, button, select, input, .no-print {
        display: none !important;
      }
    }
  `, [pageSize, orientation, scale]);

  // Handle before print
  const handleBeforePrint = useCallback(() => {
    if (!targetRef.current) {
      console.error('PrintButton: targetRef is not set');
      return null;
    }

    const target = targetRef.current;
    const parent = target.parentElement;
    const originalStyles = {
      maxWidth: parent.style.maxWidth,
      overflow: parent.style.overflow,
      width: parent.style.width,
    };

    // Remove restrictions to capture full content
    parent.style.maxWidth = 'none';
    parent.style.overflow = 'visible';
    parent.style.width = `${Math.max(target.scrollWidth, target.offsetWidth, target.clientWidth)}px`;

    // Inject print styles
    const style = document.createElement('style');
    style.innerHTML = getPrintStyles();
    document.head.appendChild(style);

    return { style, originalStyles };
  }, [targetRef, getPrintStyles]);

  // Handle after print
  const handleAfterPrint = useCallback((data) => {
    if (data?.style) document.head.removeChild(data.style);
    if (targetRef.current) {
      const parent = targetRef.current.parentElement;
      parent.style.maxWidth = data?.originalStyles.maxWidth || '';
      parent.style.overflow = data?.originalStyles.overflow || '';
      parent.style.width = data?.originalStyles.width || '';
    }
  }, [targetRef]);

  // Ensure targetRef is valid
  if (!targetRef) {
    console.error('PrintButton: targetRef is required');
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 no-print">
      {/* Page Size Selector */}
      <div>
        <label className="block mb-1 text-sm font-medium">Page Size:</label>
        <select
          className="border p-2 rounded w-full sm:w-32"
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
        >
          <option value="A4">A4</option>
          <option value="LETTER">Letter</option>
          <option value="A3">A3</option>
        </select>
      </div>

      {/* Orientation Selector */}
      <div>
        <label className="block mb-1 text-sm font-medium">Orientation:</label>
        <select
          className="border p-2 rounded w-full sm:w-32"
          value={orientation}
          onChange={(e) => setOrientation(e.target.value)}
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
      </div>

      {/* Scale Slider */}
      <div>
        <label className="block mb-1 text-sm font-medium">Scale: {Math.round(scale * 100)}%</label>
        <input
          type="range"
          min="0.25"
          max="1.5"
          step="0.05"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
          className="w-full sm:w-32"
        />
      </div>

      {/* Print Button */}
      <ReactToPrint
        trigger={() => (
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 sm:mt-0">
            Print
          </button>
        )}
        content={() => targetRef.current}
        onBeforeGetContent={async () => {
          const data = handleBeforePrint();
          return new Promise((resolve) => setTimeout(() => resolve(data), 500));
        }}
        onAfterPrint={handleAfterPrint}
      />
    </div>
  );
};

export default PrintButton;