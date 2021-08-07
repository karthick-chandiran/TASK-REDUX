export const getTimeZoneOffsetInSeconds = () => {
  return new Date().getTimezoneOffset() * 60;
};
export const getTaskTimeInSeconds = (time) => {
  const [hour, min] = time.split(":");
  return (parseInt(hour) * 60 + parseInt(min)) * 60;
};
export const secondsToTime = (seconds) => {
  let mins = parseInt((seconds / 60) % 60);
  mins = mins < 10 ? "0" + mins : mins;
  let hours = parseInt(seconds / 3600);
  hours = hours < 10 ? "0" + hours : hours;
  return `${hours}:${mins}`;
};

export const getTimeDropdownValues = () => {
  const timeDiff = 30;
  const values = [];
  let hours, minutes, str;
  for (let tmin = 0; tmin < 24 * 60; tmin += timeDiff) {
    hours = parseInt(tmin / 60);
    minutes = tmin % 60;
    if (minutes < 10) {
      minutes = "0" + minutes; // adding leading zero
    }
    str = hours % 24 < 12 ? "AM" : "PM";
    hours = hours % 12;
    if (hours === 0) {
      hours = 12;
    }
    values.push({
      name: `${hours}:${minutes} ${str}`,
      value: tmin * 60 // seconds
    });
  }
  return values;
};

export const getFormattedDate = (date) => {
  const taskDate = date;
  let month = taskDate.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = taskDate.getDate();
  day = day < 10 ? "0" + day : day;
  return `${taskDate.getFullYear()}-${month}-${day}`;
};
