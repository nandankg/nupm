import React, { useRef, useCallback , useMemo} from "react";
import { Link } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { usePDF } from "react-to-pdf";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdPictureAsPdf } from "react-icons/md";

const FormTable = React.memo(({ data, config,  handleSave }) => {
  const tableRef = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: `${config.title.replace(/\s+/g, "_")}.pdf` });
// Memoize localStorage parsing to avoid parsing on every render
  const user = useMemo(() => {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : {};
  }, []);
  const renderHeader = useCallback((item) => (
    <>
      {config.headerFields.some(field => !field.key) && (
        <tr>
          {config.headerFields.filter(field => !field.key).map(({ value, colSpan }, index) => (
            <th key={`static-${index}`} className="text-center border p-2" colSpan={colSpan}>
              {value}
            </th>
          ))}
        </tr>
      )}
      <tr>
        {config.headerFields.filter(field => field.key).map(({ key, label, colSpan }) => (
          <th key={key} className="text-center border p-2" colSpan={colSpan}>
            {label}: {item[key] || "N/A"}
          </th>
        ))}
      </tr>
    </>
  ), [config.headerFields]);

  const renderActivitySection = useCallback((item, activityConfig) => {
    if (!activityConfig || !item[activityConfig.key] || !item[activityConfig.key].length) return null;

    const startIndex = activityConfig.startIndex || 0;
    const dataRows = item[activityConfig.key].slice(startIndex, startIndex + activityConfig.rows.length);

    return (
      <table className="min-w-full border-collapse border border-gray-200 mb-4">
        <thead>
          <tr>
            <th colSpan={3} className="border p-2" style={{  textAlign: "center" }}>
            Equipment
            </th>
            <th colSpan={17} className="border p-2">{`${activityConfig.label} (${activityConfig.reference})`}</th>
          </tr>
          <tr>
            <th rowSpan={2} className="border p-2">Sr. No.</th>
            <th rowSpan={2} className="border p-2">Activity</th>
            <th rowSpan={2} className="border p-2">Description of Work</th>
            <th colSpan={activityConfig.columns.length} className="border p-2 text-center">{activityConfig.label}</th>
            <th rowSpan={2} className="border p-2">Remarks/Deficiencies</th>
            <th rowSpan={2} className="border p-2">Action Taken</th>
            <th rowSpan={2} className="border p-2" colSpan={8}>Why Deficiency Could Not Be Rectified</th>
          </tr>
          <tr>
            {activityConfig.columns.map((col) => (
              <th key={col.key} className="border p-2">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((activity, index) => (
            activityConfig.rows[index] ? (
              <tr key={`${activityConfig.key}-${index + startIndex}`}>
                <td className="border p-2">{activityConfig.rows[index].srNo}</td>
                <td className="border p-2">{activityConfig.rows[index].activity}</td>
                <td className="border p-2 text-left">{activityConfig.rows[index].description}</td>
                {activityConfig.columns.map((col) => (
                  <td key={col.key} className="border p-2">{activity[col.key] || "N/A"}</td>
                ))}
                <td className="border p-2">{activity[activityConfig.remarkKey] || "N/A"}</td>
                <td className="border p-2">{activity[activityConfig.actionKey] || "N/A"}</td>
                <td className="border p-2" colSpan={8}>{activity[activityConfig.deficiencyKey] || "N/A"}</td>
              </tr>
            ) : null
          ))}
        </tbody>
      </table>
    );
  }, []);

  const renderStaffInfo = useCallback((item) => (
    <table className="min-w-full border-collapse border border-gray-200 mb-4">
      <tbody>
        <tr>
          <th rowSpan={4} colSpan={3} className="border p-2">Staff on Duty</th>
          <th colSpan={10} className="border p-2 text-center">Name</th>
          <th colSpan={5} className="border p-2 text-center">Designation</th>
          <th colSpan={5} className="border p-2 text-center">Employee Id</th>
        </tr>
        {config.staffFields.map(({ nameKey, desgKey, signKey, nameColSpan, desgColSpan, signColSpan }) => (
          item[nameKey] && (
            <tr key={nameKey}>
              <td colSpan={nameColSpan} className="border p-2">{item[nameKey] || "N/A"}</td>
              <td colSpan={desgColSpan} className="border p-2">{item[desgKey] || "N/A"}</td>
              <td colSpan={signColSpan} className="border p-2">{item[signKey] || "N/A"}</td>
            </tr>
          )
        ))}
      </tbody>
    </table>
  ), [config.staffFields]);

  if (!data.length) return <div className="text-center p-4">No data available</div>;

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">{config.title}</h3>
      <div className="w-full h-1 bg-gray-200 mb-4" />
      <div className="flex justify-between mb-4">
        <div className="flex gap-3">
          <DownloadTableExcel
            filename={`${config.formType}_table`}
            sheet={`${config.formType}_table`}
            currentTableRef={tableRef.current}
          >
            <button className="border border-teal-500 p-2 rounded">
              <RiFileExcel2Fill color="#0baa9a" size={25} />
            </button>
          </DownloadTableExcel>
          <button
            className="border border-teal-500 p-2 rounded"
            onClick={toPDF}
          >
            <MdPictureAsPdf size={25} color="#850d04" />
          </button>
        </div>
      </div>
      <div ref={targetRef} className="relative">
        <style>
          {`
            @media print {
              .pdf-header {
                position: fixed;
                top: 0;
                width: 100%;
                text-align: center;
                padding: 10px;
                background-color: #f8f8f8;
                border-bottom: 1px solid #ccc;
                font-size: 16px;
                font-weight: bold;
              }
              .pdf-footer {
                position: fixed;
                bottom: 0;
                width: 100%;
                padding: 10px;
                background-color: #f8f8f8;
                border-top: 1px solid #ccc;
                font-size: 12px;
              }
              .pdf-content {
                margin-top: 60px;
                margin-bottom: 60px;
              }
              @page {
                margin: 80px 20px 80px 20px;
              }
            }
          `}
        </style>
        <div className="pdf-header hidden print:block">
          {config.title}
        </div>
        <div className="pdf-content">
          {data.map((item) => (
            <div key={item.id} ref={tableRef}>
              {renderHeader(item)}
              {renderActivitySection(item, config.activities1)}
              {renderActivitySection(item, config.activities2)}
              {config.activities3 && renderActivitySection(item, config.activities3)}
              {renderStaffInfo(item)}
              {(item.status === "0" || user.role === "Admin") && (
                <div className="hidden print:hidden border p-2">
                  <Link
                    to={`${config.editPath}/${item.id}`}
                    className="bg-yellow-400 text-black px-4 py-2 rounded text-lg mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleSave(item.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded text-lg"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pdf-footer  print:block">
          <div className="flex justify-between text-bold p-3">
            <span>Employee Name: {user.employee_name || "N/A"}</span>
            <span>Employee ID: {user.employee_id || "N/A"}</span>
            <span>Department: {user.department || "N/A"}</span>
           <span>Generated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FormTable;