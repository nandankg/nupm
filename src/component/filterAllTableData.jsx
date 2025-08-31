import dayjs from "dayjs";

/**
 * Filters table data based on dynamic columns and search conditions.
 *
 * @param {Array} items - The data to be filtered (table rows).
 * @param {string} searchValue - The global search input value.
 * @param {string} fromDate - Start date for filtering (optional).
 * @param {string} toDate - End date for filtering (optional).
 * @param {Array} columnConfig - Configuration for columns to filter (each item includes `field` and `isDate`).
 * @returns {Array} - The filtered rows.
 */
const filterAllTableData = (
  items,
  searchValue,
  fromDate,
  toDate,
  columnConfig
) => {
  return items.filter((row) => {
    // Check if any column matches the search value
    const matchesSearch = columnConfig.some(({ field }) => {
      const value = row[field] ? String(row[field]).toLowerCase() : "";
      return value.includes(searchValue.toLowerCase());
    });

    // Check if the row matches the date range
    const matchesDateRange = columnConfig.some(({ field, isDate }) => {
      if (isDate && row[field]) {
        const date = dayjs(row[field]);
        return (
          (!fromDate ||
            date.isAfter(fromDate, "day") ||
            date.isSame(fromDate, "day")) &&
          (!toDate ||
            date.isBefore(toDate, "day") ||
            date.isSame(toDate, "day"))
        );
      }
      return true; // Skip non-date fields for date range filtering
    });

    return matchesSearch && matchesDateRange;
  });
};

export default filterAllTableData;
