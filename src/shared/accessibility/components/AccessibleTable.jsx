import React from 'react';

const AccessibleTable = ({
  data = [],
  columns = [],
  caption,
  loading = false,
  emptyMessage = 'No data available',
  sortable = false,
  sortConfig = null,
  onSort = null,
  className = '',
  rowKeyField = 'id',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...otherProps
}) => {
  const handleSort = (key) => {
    if (!sortable || !onSort) return;
    onSort(key);
  };

  const getSortDirection = (key) => {
    if (!sortConfig || sortConfig.key !== key) return 'none';
    return sortConfig.direction;
  };

  const renderHeader = () => (
    <thead>
      <tr>
        {columns.map((column, index) => {
          const sortDirection = getSortDirection(column.key);
          const isSortable = sortable && column.sortable !== false;
          
          return (
            <th
              key={column.key || index}
              scope="col"
              className={isSortable ? 'sortable-header' : ''}
              onClick={isSortable ? () => handleSort(column.key) : undefined}
              aria-sort={sortDirection}
              tabIndex={isSortable ? 0 : undefined}
              role={isSortable ? 'button' : undefined}
              onKeyDown={isSortable ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSort(column.key);
                }
              } : undefined}
            >
              {column.label || column.header}
              {isSortable && (
                <span className="sort-indicator" aria-hidden="true">
                  {sortDirection === 'asc' ? ' ↑' : sortDirection === 'desc' ? ' ↓' : ' ↕'}
                </span>
              )}
              {isSortable && (
                <span className="visually-hidden">
                  {sortDirection === 'none' 
                    ? `Sort by ${column.label || column.header}` 
                    : `Sorted by ${column.label || column.header} ${sortDirection}ending`
                  }
                </span>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );

  const renderBody = () => {
    if (loading) {
      return (
        <tbody>
          <tr>
            <td 
              colSpan={columns.length} 
              className="text-center p-4"
              role="status"
              aria-live="polite"
            >
              <div className="d-flex justify-content-center align-items-center">
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Loading data...
              </div>
            </td>
          </tr>
        </tbody>
      );
    }

    if (!data || data.length === 0) {
      return (
        <tbody>
          <tr>
            <td 
              colSpan={columns.length} 
              className="text-center p-4 text-muted"
              role="status"
            >
              {emptyMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {data.map((row, rowIndex) => {
          const rowKey = row[rowKeyField] || `row-${rowIndex}`;
          return (
            <tr key={rowKey}>
              {columns.map((column, colIndex) => {
                const cellValue = row[column.key] || '';
                const cellContent = column.render 
                  ? column.render(cellValue, row, rowIndex)
                  : cellValue;

                return (
                  <td
                    key={`${rowKey}-${column.key || colIndex}`}
                    className={column.className}
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <div className="table-responsive">
      <table
        className={`table ${className}`}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        {...otherProps}
      >
        {caption && <caption>{caption}</caption>}
        {renderHeader()}
        {renderBody()}
      </table>
    </div>
  );
};

export default AccessibleTable;