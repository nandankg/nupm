import React, { useState, useCallback , useMemo} from 'react';
import html2canvas from 'html2canvas';
import { logout, deptformlist } from "../reducer/AuthReducer";
import { jsPDF } from 'jspdf';

// Reusable PDFConverter component
const PDFConverter = ({ targetRef, filename = 'document.pdf', formname = 'Document', defaultPageSize = 'A4', defaultOrientation = 'portrait' }) => {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [orientation, setOrientation] = useState(defaultOrientation);
  const [scale, setScale] = useState(1); // Default scale: 100%

  // Page dimensions in points (1 pt = 1/72 inch, assuming 72 DPI for jsPDF)
  const pageDimensions = {
    A4: { width: orientation === 'portrait' ? 595 : 842, height: orientation === 'portrait' ? 842 : 595 },
    LETTER: { width: orientation === 'portrait' ? 612 : 792, height: orientation === 'portrait' ? 792 : 612 },
    A3: { width: orientation === 'portrait' ? 842 : 1191, height: orientation === 'portrait' ? 1191 : 842 },
  };
  // Memoize localStorage parsing to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);
  const formattedDateTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Function to generate PDF with scaling, multipage support, header, and footer
  const handleGeneratePDF = useCallback(async () => {
    if (!targetRef.current) return;

    // Store original styles
    const target = targetRef.current;
    const parent = target.parentElement;
    const originalParentStyles = {
      maxWidth: parent.style.maxWidth,
      overflow: parent.style.overflow,
      width: parent.style.width,
    };

    // Temporarily remove restrictions to capture full content
    parent.style.maxWidth = 'none';
    parent.style.overflow = 'visible';
    parent.style.width = `${Math.max(target.scrollWidth, target.offsetWidth, target.clientWidth)}px`;

    // Delay to ensure content is rendered
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Capture content with html2canvas
    const canvas = await html2canvas(target, {
      scrollX: 0,
      scrollY: 0,
      windowWidth: Math.max(target.scrollWidth, target.offsetWidth, target.clientWidth),
      windowHeight: Math.max(target.scrollHeight, target.offsetHeight, target.clientHeight),
      width: target.scrollWidth,
      height: target.scrollHeight,
      scale: window.devicePixelRatio * scale, // Apply user-selected scale
      useCORS: true,
    });

    // Restore original styles
    parent.style.maxWidth = originalParentStyles.maxWidth;
    parent.style.overflow = originalParentStyles.overflow;
    parent.style.width = originalParentStyles.width;

    // Initialize jsPDF
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'pt',
      format: pageSize.toLowerCase(),
    });

    const pageWidth = pageDimensions[pageSize].width;
    const pageHeight = pageDimensions[pageSize].height;
    const margin = 28; // Approx 10mm (28pt at 72 DPI)
    const headerHeight = 56; // Approx 20mm
    const footerHeight = 42; // Approx 15mm
    const maxContentWidth = pageWidth - 2 * margin;
    const maxContentHeight = pageHeight - headerHeight - footerHeight;

    // Calculate scaling to fit content within page width
    const contentWidth = canvas.width * scale;
    const contentHeight = canvas.height * scale;
    const scaleFactor = Math.min(maxContentWidth / contentWidth, 1); // Don't upscale
    const scaledContentWidth = contentWidth * scaleFactor;
    const scaledContentHeight = contentHeight * scaleFactor;

    // Calculate number of pages needed
    const pages = Math.ceil(scaledContentHeight / maxContentHeight);

    // Add content to PDF
    for (let i = 0; i < pages; i++) {
      if (i > 0) pdf.addPage();

      // Add header (formname)
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text(formname, pageWidth / 2, margin + 14, { align: "center" }); // 14pt offset from top margin

      // Add content for the current page
      const yOffset = i * maxContentHeight;
      pdf.addImage(
        canvas,
        'PNG',
        margin,
        margin + headerHeight, // Start content below header
        scaledContentWidth,
        scaledContentHeight,
        null,
        'FAST',
        0,
        -yOffset / scaleFactor // Adjust for multi-page
      );

      // Add footer (user details and date)
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const footerText = `Name: ${user?.name || 'Unknown'} | Employee ID: ${user?.employeeid || 'N/A'} | Designation/Role: ${user?.role || user?.designation || 'N/A'} | Date: ${formattedDateTime}`;
      pdf.text(footerText, pageWidth / 2, pageHeight - margin - 14, { align: "center" }); // 14pt above bottom margin
    }

    // Save PDF
    pdf.save(filename);
  }, [targetRef, filename, formname, pageSize, orientation, scale]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
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

      {/* Convert to PDF Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 sm:mt-0"
        onClick={handleGeneratePDF}
      >
        PDF
      </button>
    </div>
  );
};

export default PDFConverter;