import React, { useEffect, useState , useMemo} from "react";
import SideBar from "./SideBar";
import { Link, useNavigate } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout, deptformlist,formlist } from "../reducer/AuthReducer";
import { FaUserCircle } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { SkipLink } from "../shared/accessibility";

function getLastParameter() {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1];
}

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const [slugs, setSlugs] = useState(getLastParameter()?.trim());
  // Memoize localStorage parsing to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);
  console.log(user);
  const dept = user.department;
  console.log(dept);

  useEffect(() => {
    dispatch(deptformlist(dept));
  }, [dispatch, dept]);

  const formlist = useSelector((state) => state.auth.dform);
 
  const allformlist = useSelector((state) => state.auth.formlist.data);
 
  const getNameFromSlug = (slug) => {
    const item = formlist.find((item) => item.slug === slug);
    return item ? item.name : null;
  };

  const formname = getNameFromSlug(slugs);
  const date = new Date().toString();
  const formattedDateTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const handleConvertToPDF = () => {
    const input = document.body;
    html2canvas(input, {
      scale: 3, // Increased scale for better quality on wide pages
      useCORS: true,
      logging: false,
      width: input.scrollWidth, // Capture full width
      height: input.scrollHeight, // Capture full height
      windowWidth: input.scrollWidth, // Ensure viewport matches content width
      windowHeight: input.scrollHeight, // Ensure viewport matches content height
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
        const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
        const margin = 10;
        const headerHeight = 20; // Space for header
        const footerHeight = 15; // Increased space for footer to prevent overlap
        const maxContentWidth = pageWidth - 2 * margin;
        const maxContentHeight = pageHeight - headerHeight - footerHeight; // Reserve space for header and footer
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;

        // Calculate scaling factor to fit content within maxContentWidth
        const scaleFactor = Math.min(maxContentWidth / imgWidth, 1); // Don't upscale small content
        const scaledImgWidth = imgWidth * scaleFactor;
        const scaledImgHeight = imgHeight * scaleFactor;

        // Calculate number of pages needed based on scaled height
        const totalPages = Math.ceil(scaledImgHeight / maxContentHeight);

        for (let page = 0; page < totalPages; page++) {
          if (page > 0) {
            pdf.addPage();
          }

          // Add header (formname)
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(16);
          pdf.text(formname || "Document", pageWidth / 2, margin + 5, { align: "center" });

          // Add content for the current page
          const yOffset = page * maxContentHeight;
          pdf.addImage(
            imgData,
            "PNG",
            margin,
            margin + headerHeight, // Start content below header
            scaledImgWidth,
            scaledImgHeight,
            undefined,
            "FAST",
            0,
            -yOffset / scaleFactor // Adjust y-position for multi-page
          );

          // Add footer (user details and date)
          pdf.setFontSize(10);
          pdf.setFont("helvetica", "normal");
          const footerText = `Name: ${user.name} | Employee ID: ${user.employeeid} | Designation/Role: ${user.role || user.designation} | Date: ${formattedDateTime}`;
          pdf.text(footerText, pageWidth / 2, pageHeight - margin - 5, { align: "center" });
        }

        // Save the PDF
        pdf.save(`${formname || "document"}.pdf`);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
      });
  };

  return (
    <>
      <SkipLink />
      <div className="col-12 position-sticky top-0 px-0" style={{ zIndex: "999" }}>
        <header id="header" className="header fixed-top d-flex align-items-center" role="banner">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/home" className="logo d-flex align-items-center" aria-label="Go to home page">
              <img style={{ width: "60px" }} src={"/upmrc-logo.png"} alt="UPMRC Logo" />
            </Link>
          </div>

          <nav className="header-nav ms-auto" role="navigation" aria-label="Main navigation">
            <ul className="d-flex align-items-center">
              <li className="nav-item px-5">
                <i className="bi bi-calendar-date px-2" aria-hidden="true"></i>
                <time id="date" dateTime={new Date().toISOString()}>
                  {date.slice(0, 15)}
                </time>
              </li>

              <li className="nav-item px-3">
                <button 
                  className="btn btn-outline-success" 
                  onClick={handleConvertToPDF}
                  aria-label={`Export ${formname || 'current page'} as PDF`}
                  type="button"
                >
                   PDF
                </button>
              </li>

              <li className="nav-item dropdown pe-3">
                <button
                  className="nav-link nav-profile d-flex align-items-center pe-0 btn btn-link"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-haspopup="true"
                  aria-label="User menu"
                  type="button"
                >
                  <span className="d-none d-md-block px-3 ps-2" id="setting">
                    <IoSettingsSharp size={30} aria-hidden="true" />
                  </span>
                  <span className="visually-hidden">Settings menu</span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile" role="menu">
                  <li className="dropdown-header" role="presentation">
                    <h6>{user?.role}</h6>
                  </li>
                  <li role="presentation">
                    <hr className="dropdown-divider" />
                  </li>

                  <li role="presentation">
                    <Link 
                      className="dropdown-item d-flex align-items-center" 
                      to="/viewaccount"
                      role="menuitem"
                    >
                      <FaUserCircle className="me-2" aria-hidden="true" />
                      <span>View Account</span>
                    </Link>
                  </li>
                  <li role="presentation">
                    <hr className="dropdown-divider" />
                  </li>

                  <li role="presentation">
                    <button 
                      className="dropdown-item d-flex align-items-center w-100 border-0 bg-transparent"
                      onClick={handleLogout}
                      type="button"
                      role="menuitem"
                    >
                      <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
                      <span>Log Out</span>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </>
  );
}

export default Header;