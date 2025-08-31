import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { usePDF } from "react-to-pdf";
import { MdPictureAsPdf } from "react-icons/md";
import { fetchData } from "../../reducer/store/ActivityLogReducer";

// 🔹 Recursive function to render nested data
const renderTableRows = (data, parentKey = "") => {
  if (!data) return null;

  return Object.entries(data).map(([key, value]) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (Array.isArray(value)) {
      return (
        <tr key={fullKey}>
          <td>{fullKey}</td>
          <td>
            <table className="nested-table">
              <tbody>
                {value.map((item, index) => (
                  <tr key={`${fullKey}[${index}]`}>
                    <td>{`${fullKey}[${index}]`}</td>
                    <td>
                      {typeof item === "object" && item !== null ? (
                        <table>
                          <tbody>
                            {renderTableRows(item, `${fullKey}[${index}]`)}
                          </tbody>
                        </table>
                      ) : (
                        item
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <tr key={fullKey}>
          <td>{fullKey}</td>
          <td>
            <table className="nested-table">
              <tbody>{renderTableRows(value, fullKey)}</tbody>
            </table>
          </td>
        </tr>
      );
    }

    // Primitive value
    return (
      <tr key={fullKey}>
        <td>{fullKey}</td>
        <td>{String(value)}</td>
      </tr>
    );
  });
};

const ActivityLogDetail = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.activitylog);

  const { toPDF, targetRef } = usePDF({ filename: "activity.pdf" });

  const [record, setRecord] = useState(null);

  // Fetch data if not already present
  useEffect(() => {
    if (!data?.data || data.data.length === 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data]);

  // Extract the record matching the passed ID
  useEffect(() => {
    if (data?.data && id) {
      const found = data.data.find((item) => item.id === id);
      setRecord(found || null);
    }
  }, [data, id]);

  return (
    <div className="container">
      {/* Breadcrumbs */}
      <div role="presentation" className="breadcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/activity">Activity</Link>
          <Link to="/activity/list">List</Link>
          <span>Detail</span>
        </Breadcrumbs>
      </div>

      {/* Toolbar */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex gap-3">
          <button
            className="btn"
            onClick={() => toPDF()}
            style={{ border: "1px solid #0baa9a" }}
          >
            <MdPictureAsPdf size={25} color="#850d04" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div ref={targetRef} className="container border my-3 p-3" style={{ width: "95%" }}>
        <h1>Activity Log Detail</h1>

        {loading && <p>Loading activity details...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        {!loading && !record && <p>No record found for this ID.</p>}

        {record && (
          <div className="d-flex align-items-center justify-content-center">
            <table className="table table-bordered" cellPadding="5">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>{renderTableRows(record)}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogDetail;
