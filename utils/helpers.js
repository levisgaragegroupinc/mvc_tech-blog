module.exports = {
  format_time: (date) => {
    // 'toLocaleTimeString()' formats the time as H:MM:SS AM/PM
    return date.toLocaleTimeString();
  },
};
