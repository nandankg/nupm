import React , { useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {saveData} from "../reducer/redux/tableDataSlice";
import { BiSolidEdit } from "react-icons/bi";
import { FaCircleArrowRight } from "react-icons/fa6";
/**
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
const TableStructureLog = ({
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
    const dispatch = useDispatch( );
      const handleSave = (id) => {
        dispatch(saveData({ formType: slug,id}));
      };
  return (
    <div>
      <div id="section-to-export">
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
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.field}>{row[col.field]}</td>
                ))}
                <td>
                  {row.status === "0" || user?.role === "Admin" ? (
                                 <>
                                 <Link
                                   to={"/view/admin/activity-log"}
                                   state={{ id: row.id }}
                                   className="btn align-content-center"
                                   style={{
                                     width: "40px",
                                     height: "40px",
                                     textAlign: "center",
                                     backgroundColor: "#FF7900 ",
                                     color: "white",
                                     fontSize: "18px",
                                   }}
                                 ><BiSolidEdit />
                                  </Link>
                                 
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
    </div>
  );
};

TableStructureLog.propTypes = {
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

export default React.memo(TableStructureLog);
