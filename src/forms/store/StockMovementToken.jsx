import React, { useState } from 'react';

const StockMovementForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    station: '',
    openingStockOK: '',
    openingStockDefective: '',
    openingStockEmergency: '',
    tokenMovements: Array(10).fill({
      equipment: '',
      noOfTokens: '',
      from: '',
      to: '',
      time: '',
      empNo: '',
      containerNo: '',
    }),
    closingStockLocation: Array(8).fill({
      contNo: '',
      qty: '',
      location: '',
    }),
    netOpeningStockOK: '',
    receivedFromGates: '',
    receivedFromOtherStation: '',
    refundedCancelledTokens: '',
    looseTokens: '',
    receivedFromRCC: '',
    tokenLeftInGates: '',
    sentToOtherStation: '',
    totalTokenSale: '',
    grossClosingStock: '',
    okGrossClosingStock: '',
    netOKGrossClosingStock: '',
    closingStockNetOK: '',
    closingStockDefective: '',
    closingStockEmergency: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTokenMovementChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTokenMovements = [...formData.tokenMovements];
    updatedTokenMovements[index][name] = value;
    setFormData({ ...formData, tokenMovements: updatedTokenMovements });
  };

  const handleClosingStockLocationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedClosingStockLocation = [...formData.closingStockLocation];
    updatedClosingStockLocation[index][name] = value;
    setFormData({ ...formData, closingStockLocation: updatedClosingStockLocation });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to your API here
    console.log(formData); // Placeholder for API call
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... (Date, Station, Opening Stock fields) */}
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="station">Station:</label>
        <input type="text" id="station" name="station" value={formData.station} onChange={handleChange} />
      </div>
      {/* ... (Opening stock inputs - OK, Defective, Emergency) */}

      {/* Token Movement Table */}
      <table>
        <thead>
          <tr>
            {/* ... (Table headers) */}
          </tr>
        </thead>
        <tbody>
          {formData.tokenMovements.map((movement, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  name="equipment"
                  value={movement.equipment}
                  onChange={(e) => handleTokenMovementChange(index, e)}
                />
              </td>
              {/* ... (Other token movement inputs) */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Closing Stock Location Table */}
      <table>
        <thead>
          <tr>
            {/* ... (Table headers) */}
          </tr>
        </thead>
        <tbody>
          {formData.closingStockLocation.map((location, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  name="contNo"
                  value={location.contNo}
                  onChange={(e) => handleClosingStockLocationChange(index, e)}
                />
              </td>
              {/* ... (Other closing stock location inputs) */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ... (Other input fields: Net Opening Stock, Received From, etc.) */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default StockMovementForm;