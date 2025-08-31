// utils/tableUtils.js
import dayjs from "dayjs";

/**
 * Filters table data based on search value and date range.
 * @param {Array} items - Array of table rows.
 * @param {string} searchValue - Search input value.
 * @param {string} fromDate - Start date for the filter.
 * @param {string} toDate - End date for the filter.
 * @returns {Array} - Filtered table rows.
 */
export const filterTableData = (items, searchValue, fromDate, toDate) => {
  return items.filter((row) => {
    const id = row.id ? row.id : "";
    const station = row.station ? row.station.toLowerCase() : "";
    const user_id = row.user_id ? row.user_id.toLowerCase() : "";
    const employee_name = row.employee_name ? String(row.employee_name) : "";

    const date = dayjs(row.date);

    const isInDateRange =
      fromDate && toDate
        ? (date.isAfter(fromDate, "day") || date.isSame(fromDate, "day")) &&
          (date.isBefore(toDate, "day") || date.isSame(toDate, "day"))
        : true;

    return (
      (id ||
        station.includes(searchValue.toLowerCase()) ||
        employee_name.includes(searchValue.toLowerCase()) ||
        user_id.includes(searchValue.toLowerCase())) &&
      isInDateRange
    );
  });
};
