import React,{ useRef,useCallback,useEffect , useMemo} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {saveData,fetchData} from "../reducer/isha/EstimateLOAReducer";
import { logout, deptformlist } from "../reducer/AuthReducer";
import { BiSolidEdit } from "react-icons/bi";
import { FaCircleArrowRight } from "react-icons/fa6";
import PDFConverter from "./PDFConverter";
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
const TableStructureLOA = ({
  columns,
  currentItems,
  slug,
 
  tableRef,
}) => {
   // Memoize localStorage parsing to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);
 const dept = user.department;
  const dispatch = useDispatch();
  const targetRef = useRef();
  const tableData = useSelector((state) => state.tableData || {});
useEffect(() => {
    dispatch(deptformlist(dept));
  }, [dispatch, dept]);

  const formlist = useSelector((state) => state.auth.dform);
  console.log(formlist);

  const getNameFromSlug = (slug) => {
    const item = formlist.find((item) => item.slug === slug);
    return item ? item.name : null;
  };

  const formname = getNameFromSlug(slug);
  const handleSave = useCallback(async (id,xloa) => {
    try {
      // Dispatch saveData and wait for completion
      await dispatch(saveData({id,xloa})).unwrap();
      // Re-fetch data to update the table
      await dispatch(fetchData()).unwrap();
      alert("Data submitted successfully!");
    } catch (error) {
      alert("Failed to submit data: " + error.message);
    }
  }, [dispatch, slug]);
 
  return (
    <div>
      <PDFConverter targetRef={targetRef} filename={formname} formname={formname}  />
      <div id="section-to-export" ref={targetRef}>
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
                   {(row.status === "0"&& user?.employeeid == row.user_id)
 || user?.role == "Admin" ? (
                                 <>
                                 <Link
                                   to={`/edit/${slug}`}
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
                                 <button
                                   onClick={() => {
                                     handleSave(row.id,row.amountLoaIssued);
                                   }}
                                   className="btn align-content-center mt-2"
                                   style={{
                                     width: "40px",
                                     height: "40px",
                                     textAlign: "center",
                                     backgroundColor: "#50C878",
                                     color: "white",
                                     fontSize: "18px",
                                   }}
                                 ><FaCircleArrowRight />
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
    </div>
  );
};

TableStructureLOA.propTypes = {
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

export default React.memo(TableStructureLOA);
