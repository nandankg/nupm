import React , { useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {saveData} from "../reducer/redux/tableDataSlice";
/**
 * ReusableTable Component: Dynamically creates tables with single or multi-row headers.
 * @param {Array} headers - Array of arrays for table headers (each sub-array represents a row of headers).
 * @param {Array} data - Array of objects containing table data.
 */
const ReusableTableMC = ({ headers, data, slug}) => {
  // Memoize localStorage parsing to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);
  const dispatch = useDispatch( );
    const handleSave = (id) => {
      dispatch(saveData({ formType: slug,id}));
    };

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        {/* Table Header */}
        <thead>
          {headers.map((headerRow, rowIndex) => (
            <tr key={rowIndex}>
              {headerRow.map((header, colIndex) => (
                <th
                  key={colIndex}
                  colSpan={header.colSpan || 1} // Handle column span
                  rowSpan={header.rowSpan || 1} // Handle row span
                  className="text-center align-middle"
                >
                  {header.headerName}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers[headers.length - 1].map((header, colIndex) => (
                <td key={colIndex} className="text-center align-middle">
                  {row[header.field] || "-"}
                </td>
              ))}
              <td>
              {row.status === "0" || user?.role == "Admin" ? (
                <>
                <Link
                  to={`/edit/${slug}`}
                  state={{ id: row.id }}
                  className="btn align-content-center"
                  style={{
                    width: "80px",
                    height: "40px",
                    textAlign: "center",
                    backgroundColor: "#FF7900 ",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    handleSave(row.id);
                  }}
                  className="btn align-content-center"
                  style={{
                    width: "80px",
                    height: "40px",
                    textAlign: "center",
                    backgroundColor: "#50C878",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Submit
                </button>
                </>
                 ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReusableTableMC.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        headerName: PropTypes.string.isRequired,
        field: PropTypes.string, // Used for mapping table data
        colSpan: PropTypes.number, // For column spanning
        rowSpan: PropTypes.number, // For row spanning
      })
    )
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  slug: PropTypes.string.isRequired,
};

export default React.memo(ReusableTableMC);
