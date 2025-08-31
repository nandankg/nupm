import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ReusableFilterBar = ({
  searchValue,
  setSearchValue,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      {/* Search Input */}
      <input
        type="text"
        className="form-control w-25"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {/* Date Range Filters */}
      <div className="d-flex align-items-center gap-3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* From Date */}
          <DatePicker
            label="From Date"
            value={fromDate ? dayjs(fromDate) : null} // Ensure value is a dayjs object
            onChange={(newValue) =>
              setFromDate(
                newValue ? newValue.startOf("day").toISOString() : null
              )
            }
          />
          {/* To Date */}
          <DatePicker
            label="To Date"
            value={toDate ? dayjs(toDate) : null} // Ensure value is a dayjs object
            onChange={(newValue) =>
              setToDate(newValue ? newValue.endOf("day").toISOString() : null)
            }
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default React.memo(ReusableFilterBar);

// import React from "react";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { Link } from "react-router-dom";
// import { DownloadTableExcel } from "react-export-table-to-excel";
// import { RiFileExcel2Fill } from "react-icons/ri";
// import { MdPictureAsPdf } from "react-icons/md";

// /**
//  * ReusableFilterBar Component
//  * Provides search, date filtering, and export functionality.
//  *
//  * Props:
//  * - searchValue: The current search input value.
//  * - setSearchValue: Function to update the search input value.
//  * - fromDate: The selected start date.
//  * - setFromDate: Function to update the start date.
//  * - toDate: The selected end date.
//  * - setToDate: Function to update the end date.
//  * - tableRef: A reference to the table for Excel export.
//  * - toPDF: Function to export the table to PDF.
//  */
// const ReusableFilterBar = ({
//   searchValue,
//   setSearchValue,
//   fromDate,
//   setFromDate,
//   toDate,
//   setToDate,
//   tableRef,
//   toPDF,
// }) => {
//   return (
//     <div className="d-flex justify-content-between align-items-center">
//       <input
//         type="search"
//         name="search"
//         value={searchValue}
//         onChange={(e) => setSearchValue(e.target.value)}
//         placeholder="Search Here."
//         className="form-control"
//       />
//       <div className="d-flex align-items-center gap-3">
//         <div className="date-box">
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="From Date"
//               value={fromDate}
//               onChange={(newValue) => setFromDate(newValue.startOf("day"))}
//               sx={{
//                 ".MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "#00b3a1",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "#00b3a1",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "#00b3a1",
//                   },
//                 },
//               }}
//             />
//             <DatePicker
//               label="To Date"
//               value={toDate}
//               onChange={(newValue) => setToDate(newValue.endOf("day"))}
//               sx={{
//                 ".MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "#00b3a1",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "#00b3a1",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "#00b3a1",
//                   },
//                 },
//               }}
//             />
//           </LocalizationProvider>
//         </div>

//         <div className="d-flex gap-3">
//           <DownloadTableExcel
//             filename="JobCard_table"
//             sheet="JobCard_table"
//             currentTableRef={tableRef}
//           >
//             <button className="btn" style={{ border: "1px solid #0baa9a" }}>
//               <RiFileExcel2Fill color="#0baa9a" size={25} />
//             </button>
//           </DownloadTableExcel>
//           <button
//             className="btn"
//             onClick={toPDF}
//             style={{
//               border: "1px solid #0baa9a",
//             }}
//           >
//             <MdPictureAsPdf size={25} color="#850d04" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReusableFilterBar;
