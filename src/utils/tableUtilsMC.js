import dayjs from "dayjs";

/**
 * Filters table data based on search value and date range.
 * @param {Array} items - Table data to be filtered.
 * @param {string} searchValue - Search term for filtering.
 * @param {dayjs.Dayjs | null} fromDate - Start date for filtering.
 * @param {dayjs.Dayjs | null} toDate - End date for filtering.
 * @param {Array} columns - Columns to filter by (each column can have `field` and `isDate` keys).
 * @returns {Array} - Filtered data.
 */
export const filterTableData = (
  items,
  searchValue,
  fromDate,
  toDate,
  columns
) => {
  return items.filter((item) => {
    // Check if the row matches the search value
    const matchesSearch = columns[columns.length - 1].some(({ field, isDate }) => {
      if (isDate) return false; // Skip date fields for search
      const value = item[field] ? String(item[field]).toLowerCase() : "";
      return value.includes(searchValue.toLowerCase());
    });

    // Check if the row matches the date range
    const date = dayjs(item.date);
    const created_at = dayjs(item.created_at);
    const isInDateRange =
      fromDate && toDate
        ? (date.isAfter(fromDate, "day") ||
            date.isSame(fromDate, "day") ||
            created_at.isAfter(fromDate, "day") ||
            created_at.isSame(fromDate, "day")) &&
          (date.isBefore(toDate, "day") ||
            date.isSame(
              toDate,
              "day" ||
                created_at.isBefore(toDate, "day") ||
                created_at.isSame(toDate, "day")
            ))
        : true;

    return matchesSearch && isInDateRange;
  });
};
