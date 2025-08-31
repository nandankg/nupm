import React , { useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveData } from "../reducer/redux/tableDataSlice";

const ReusableTableMCCC = ({ headers, data, slug }) => {
  // Memoize localStorage parsing to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);
  const dispatch = useDispatch();

  const handleSave = (id) => {
    dispatch(saveData({ formType: slug, id }));
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          {headers.map((headerRow, rowIndex) => (
            <tr key={rowIndex}>
              {headerRow.map((header, colIndex) => (
                <th
                  key={colIndex}
                  colSpan={header.colSpan || 1}
                  rowSpan={header.rowSpan || 1}
                  className="text-center align-middle"
                >
                  {header.headerName}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers[headers.length - 1].map((header, colIndex) => {
                let value = row[header.field] || "-";

                if (header.field === "openingStock" || header.field === "closingStock") {
                  value = Object.entries(row[header.field] || {}).map(([key, val]) => (
                    <div key={key}>{`${key}: ${val}`}</div>
                  ));
                } else if (header.field === "transactions") {
                  value = row[header.field]?.map((tx, index) => (
                    <div key={index}>
                      {Object.entries(tx).map(([key, val]) => (
                        <div key={key}>{`${key}: ${val || "-"}`}</div>
                      ))}
                    </div>
                  ));
                }

                return (
                  <td key={colIndex} className="text-center align-middle">
                    {value}
                  </td>
                );
              })}
              <td>
                {row.status === "0" || user?.role === "Admin" ? (
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
                      onClick={() => handleSave(row.id)}
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

ReusableTableMCCC.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        headerName: PropTypes.string.isRequired,
        field: PropTypes.string,
        colSpan: PropTypes.number,
        rowSpan: PropTypes.number,
      })
    )
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  slug: PropTypes.string.isRequired,
};

export default React.memo(ReusableTableMCCC);
