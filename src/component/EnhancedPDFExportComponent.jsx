import React, { useMemo } from "react";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { MdPictureAsPdf } from "react-icons/md";

/**
 * EnhancedPDFExportComponent
 * Exports the content of a specified section to a PDF file with proper header/footer
 * Handles different report sizes and formats with Indian date formatting (dd-mm-yyyy)
 *
 * Props:
 * - contentId: The `id` of the section to be exported.
 * - filename: The desired filename for the exported PDF.
 * - formName: Name of the form for header
 * - formId: Form ID for footer
 * - pageSize: 'A4' | 'A3' | 'LETTER' (default: 'A4')
 * - orientation: 'portrait' | 'landscape' (default: 'portrait')
 */
const EnhancedPDFExportComponent = ({
  contentId,
  filename = "exported-content.pdf",
  formName = "Document",
  formId = "",
  pageSize = "A4",
  orientation = "portrait"
}) => {
  // Get user data with memoization to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);

  // Indian date formatting function (dd-mm-yyyy format)
  const formatDateToIndian = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  // Page dimensions based on size and orientation
  const getPageDimensions = () => {
    const dimensions = {
      A4: { width: 210, height: 297 },
      A3: { width: 297, height: 420 },
      LETTER: { width: 216, height: 279 }
    };
    
    const size = dimensions[pageSize] || dimensions.A4;
    return orientation === 'landscape' 
      ? { width: size.height, height: size.width }
      : size;
  };

  const handleExport = async () => {
    const content = document.getElementById(contentId);

    if (!content) {
      alert("Content not found! Please ensure the table/content is loaded.");
      return;
    }

    try {
      // Store original styles to restore later
      const originalStyles = {
        maxWidth: content.style.maxWidth,
        width: content.style.width,
        overflow: content.style.overflow,
        position: content.style.position
      };

      // Temporarily adjust styles for better capture
      content.style.maxWidth = 'none';
      content.style.width = 'auto';
      content.style.overflow = 'visible';
      content.style.position = 'static';

      // Wait for any dynamic content to render
      await new Promise(resolve => setTimeout(resolve, 500));

      // Capture content with html2canvas
      const canvas = await html2canvas(content, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: content.scrollWidth,
        height: content.scrollHeight,
        windowWidth: Math.max(content.scrollWidth, 1200),
        windowHeight: Math.max(content.scrollHeight, 800)
      });

      // Restore original styles
      Object.assign(content.style, originalStyles);

      const imgData = canvas.toDataURL("image/png", 0.95);
      const pageDimensions = getPageDimensions();
      
      // Initialize PDF with correct orientation and size
      const pdf = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: pageSize.toLowerCase()
      });

      const pageWidth = pageDimensions.width;
      const pageHeight = pageDimensions.height;
      
      // Margins and spacing
      const margin = 10;
      const headerHeight = 15;
      const footerHeight = 25;
      const availableWidth = pageWidth - (2 * margin);
      const availableHeight = pageHeight - headerHeight - footerHeight - (2 * margin);

      // Calculate content dimensions
      const imgWidth = availableWidth;
      const imgHeight = (canvas.height * availableWidth) / canvas.width;

      // Calculate number of pages needed for large content
      const totalPages = Math.ceil(imgHeight / availableHeight);
      
      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        if (pageIndex > 0) {
          pdf.addPage();
        }

        // Add Header
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.text(formName, pageWidth / 2, margin + 8, { align: "center" });
        
        // Add a line under header
        pdf.setLineWidth(0.5);
        pdf.line(margin, margin + 12, pageWidth - margin, margin + 12);

        // Calculate the portion of image for this page
        const yOffset = pageIndex * availableHeight;
        const remainingHeight = Math.min(availableHeight, imgHeight - yOffset);

        // Add content image for current page
        if (remainingHeight > 0) {
          pdf.addImage(
            imgData,
            'PNG',
            margin,
            margin + headerHeight,
            imgWidth,
            imgHeight,
            `page-${pageIndex}`,
            'FAST',
            0,
            -yOffset * (canvas.width / availableWidth)
          );
        }

        // Add Footer with Indian date format
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        
        const currentDate = formatDateToIndian(new Date());
        
        // First line of footer - Employee details
        const footerLine1 = `Employee ID: ${user?.employeeid || user?.profileid || 'N/A'} | Name: ${user?.name || 'Unknown'} | Station: ${user?.station || 'N/A'}`;
        pdf.text(footerLine1, pageWidth / 2, pageHeight - 15, { align: "center" });
        
        // Second line of footer - Form details and date
        const footerLine2 = `Form ID: ${formId || 'N/A'} | Date & Time: ${currentDate} | Page ${pageIndex + 1} of ${totalPages}`;
        pdf.text(footerLine2, pageWidth / 2, pageHeight - 8, { align: "center" });
        
        // Add footer line
        pdf.setLineWidth(0.3);
        pdf.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);
      }

      // Convert all dates in the PDF content to Indian format (if any date elements exist)
      // This is handled during content capture, but we can add metadata
      pdf.setProperties({
        title: formName,
        subject: `${formName} - Generated Report`,
        author: user?.name || 'UPMRC User',
        creator: 'UPMRC Application',
        creationDate: new Date(),
        keywords: `UPMRC, ${formName}, Report, ${formatDateToIndian(new Date())}`
      });

      // Save the PDF
      pdf.save(filename);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(`Failed to generate PDF: ${error.message}. Please try again or contact support.`);
    }
  };

  return (
    <Button
      onClick={handleExport}
      style={{
        border: "1px solid #0baa9a",
        minWidth: "45px",
        padding: "8px",
        borderRadius: "4px",
        backgroundColor: "#f8f9fa"
      }}
      title={`Export ${formName} to PDF`}
    >
      <MdPictureAsPdf size={25} color="#850d04" />
    </Button>
  );
};

export default EnhancedPDFExportComponent;