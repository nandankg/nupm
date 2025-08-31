import React, { useState } from "react";

const PaginationComponent = () => {
  // Simulating a large dataset
  const data = Array.from({ length: 2000 }, (_, i) => i + 1);

  // Pagination settings
  const itemsPerPage = 50; // Number of items per page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Display settings for page numbers
  const pageGroupSize = 15;

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(1);

  // Get current page data
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate start and end of the current group of pages
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  // Handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextGroup = () => {
    if (endPage < totalPages) {
      setCurrentGroup((prev) => prev + 1);
    }
  };

  const prevGroup = () => {
    if (startPage > 1) {
      setCurrentGroup((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Render page numbers dynamically
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <h1>Pagination Example</h1>
      <div className="data-list">
        {currentData.map((item) => (
          <div key={item} className="data-item">
            Item {item}
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={prevGroup} disabled={startPage === 1}>
          &lt;&lt;
        </button>
        {renderPageNumbers()}
        <button onClick={nextGroup} disabled={endPage === totalPages}>
          &gt;&gt;
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;






import React from "react";

// Recursive function to render table rows for an object
const renderTableRows = (data, parentKey = "") => {
  const rows = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          // Handle arrays
          rows.push(
            <tr key={fullKey}>
              <td>{fullKey}</td>
              <td>
                <table className="nested-table">
                  <tbody>
                    {value.map((item, index) => (
                      <tr key={`${fullKey}[${index}]`}>
                        <td>{`${fullKey}[${index}]`}</td>
                        <td>
                          {typeof item === "object" ? (
                            <table>
                              <tbody>{renderTableRows(item, `${fullKey}[${index}]`)}</tbody>
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
        } else {
          // Handle nested objects
          rows.push(
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
      } else {
        // Handle primitive values
        rows.push(
          <tr key={fullKey}>
            <td>{fullKey}</td>
            <td>{value}</td>
          </tr>
        );
      }
    }
  }

  return rows;
};

// Main component
const ObjectTable = ({ data }) => {
  return (
    <div>
      <h1>Object Key-Value Table</h1>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{renderTableRows(data)}</tbody>
      </table>
    </div>
  );
};

// Example Usage
const exampleData = {
  id: 1,
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "New York",
    zip: "10001",
  },
  skills: ["JavaScript", "React", "Node.js"],
  projects: [
    { name: "Project A", status: "Completed" },
    { name: "Project B", status: "In Progress" },
  ],
};

const App = () => <ObjectTable data={exampleData} />;

export default App;




///css
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
  text-align: left;
}

.nested-table {
  margin-left: 20px;
  border: none;
}

.nested-table td {
  border: none;
  padding: 4px;
}

