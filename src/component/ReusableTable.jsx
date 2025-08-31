import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * ReusableTable Component
 * Dynamically renders a table based on provided data and columns.
 *
 * Props:
 * - columns: Array of column definitions (each with `field` and `headerName`).
 * - data: Array of row objects (table data).
 * - slug: URL slug for the "View" button link.
 * - targetRef: Ref for the table container.
 * - tableRef: Ref for the table element.
 */
const ReusableTable = ({
  columns,
  currentItems,
  slug,
  targetRef,
  tableRef,
}) => {
  // Memoize localStorage parsing to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);

  return (
   
    <div ref={targetRef}>
      <table className="table" ref={tableRef}>
        <thead
          style={{
            position: "sticky",
            top: "0",
            backgroundColor: "#fff",
          }}
        >
          <tr>
            {columns.map((col) => (
              <th key={col.field} className="text-start">
                {col.headerName}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, index) => (
            <tr key={row.id || `row-${index}`}>
              {columns.map((col) => (
                <td key={col.field}>{row[col.field]}</td>
              ))}
              <td>
                { row.status==="1" || user?.employeeid == row.user_id
                 || user?.role == "Admin" ? (
                                  <Link
                                    to={`/view/${slug}`}
                                    state={{ id: row.id }}
                                    className="btn align-content-center"
                                    style={{
                                      width: "100px",
                                      height: "40px",
                                      textAlign: "center",
                                      backgroundColor: "#3cd14bff ",
                                      color: "white",
                                      fontSize: "15px",
                                    }}
                                  >
                                   {row.status==="1"?"View":"UnSaved"} 
                                  </Link>
                                  ) : (
                                                 <Link
                                    to={`/view/${slug}`}
                                    state={{ id: row.id }}
                                    className="btn align-content-center"
                                    style={{
                                      width: "100px",
                                      height: "40px",
                                      textAlign: "center",
                                      backgroundColor: "#FF7900 ",
                                      color: "white",
                                      fontSize: "12px",
                                      pointerEvents: 'none'
                                    }}
                                  >
                                 UnSaved
                                  </Link>
                                                 )}
                                </td>
                              </tr>
                            ))}
        </tbody>
      </table>
    </div>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  slug: PropTypes.string.isRequired,
  targetRef: PropTypes.object,
  tableRef: PropTypes.object,
};

export default React.memo(ReusableTable);
