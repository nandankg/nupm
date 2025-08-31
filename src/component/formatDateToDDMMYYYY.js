// Function to convert any date format to DD/MM/YYYY
export const formatDateToDDMMYYYY = (dateInput) => {
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
  