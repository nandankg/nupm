import React, { useRef } from "react";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { MdPictureAsPdf } from "react-icons/md";

/**
 * PDFExportComponent
 * Exports the content of a specified section to a PDF file.
 *
 * Props:
 * - contentId: The `id` of the section to be exported.
 * - filename: The desired filename for the exported PDF.
 */
const PDFExportComponent = ({
  contentId,
  filename = "exported-content.pdf",
}) => {
  const handleExport = async () => {
    const content = document.getElementById(contentId);

    if (!content) {
      alert("Content not found!");
      return;
    }

    try {
      const canvas = await html2canvas(content, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allows cross-origin resources
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <Button
      class="btn"
      style={{
        border: "1px solid #0baa9a",
      }}
      onClick={handleExport}
    >
      <MdPictureAsPdf size={25} color="#850d04" />
    </Button>
  );
};

export default PDFExportComponent;
