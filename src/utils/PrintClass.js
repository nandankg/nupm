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
  export default ReusableTable;