module.exports = {
  format_date: (date) => {
    // 'toLocaleTimeString()' formats the time as H:MM:SS AM/PM
    return date.toLocaleDateString();
  },
};
