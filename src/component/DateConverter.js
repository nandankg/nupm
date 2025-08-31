import React, { useState } from 'react';

// Function to convert any date format to DD/MM/YYYY
const formatDateToDDMMYYYY = (dateInput) => {
  try {
    // Create a Date object from the input
    let date;
    if (typeof dateInput === 'string' || typeof dateInput === 'number') {
      date = new Date(dateInput);
    } else if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      throw new Error('Invalid date input');
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    // Return formatted date
    return `${day}/${month}/${year}`;
  } catch (error) {
    return 'Invalid Date';
  }
};

// Example component to demonstrate usage
const DateConverter = () => {
  const [input, setInput] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleConvert = () => {
    const result = formatDateToDDMMYYYY(input);
    setFormattedDate(result);
  };

  // Example dates for testing
  const testDates = [
    '2023-10-15', // YYYY-MM-DD
    '2023/10/15', // YYYY/MM/DD
    '10-15-2023', // MM-DD-YYYY
    new Date(), // Current date
    '2023-10-15T12:00:00Z', // ISO string
    1697371200000, // Timestamp (milliseconds)
    'invalid-date', // Invalid input
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Date Converter to DD/MM/YYYY</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Enter Date</label>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="e.g., 2023-10-15 or 10/15/2023"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleConvert}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Convert
        </button>
      </div>
      {formattedDate && (
        <div className="bg-gray-100 p-3 rounded">
          <strong>Formatted Date:</strong> {formattedDate}
        </div>
      )}
      <h3 className="text-xl font-semibold mt-6 mb-2">Test Cases</h3>
      <ul className="list-disc pl-5">
        {testDates.map((date, index) => (
          <li key={index}>
            Input: {date.toString()} → Output: {formatDateToDDMMYYYY(date)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DateConverter;