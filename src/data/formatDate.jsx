export const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const formatTime = (dateString) => {
  // Parse the date string
  const date = new Date(dateString);

  // Get hours, minutes, and seconds
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Add leading zeros if necessary
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Format the time as HH:MM:SS
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
};
