// makes sure the timeUnit is returned in the form of two digits
const checkForSingleDigit = (timeUnit) => {
    timeUnit < 10 
        ? timeUnit = "0" + timeUnit
        : timeUnit = timeUnit.toString();
    return timeUnit;
};

// Get current date in format YYYY-MM-DD HH:MM:SS
// to fit SQLite as a date of type TEXT
let today = new Date();

const year = today.getFullYear();
let month = checkForSingleDigit(today.getMonth() + 1);
let day = checkForSingleDigit(today.getDate());

let hour = checkForSingleDigit(today.getHours());
let minutes = checkForSingleDigit(today.getMinutes());
let seconds = checkForSingleDigit(today.getSeconds());

const timestamp = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

module.exports = timestamp;