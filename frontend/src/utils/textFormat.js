export function timeFormat (input_date) {
  let date = new Date(input_date.replace('Z', '')).getTime()
  let current_date = new Date().getTime()
  let seconds = Math.floor((current_date - date) / 1000);
  let interval
  
  interval = seconds / 86400;
  if (interval > 1) {
    return dateFormat(date);
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

export function dateFormat (date) {
  let d = new Date(date),
    month = '' + (d.getMonth()),
    day = '' + d.getDate(),
    year = d.getFullYear();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  month = months[month]

  if (day.endsWith('1')){
    day = day + 'st';
  } else if (day.endsWith('2')) {
    day = day + 'nd';
  } else if (day.endsWith('3')) {
    day = day + 'rd';
  } else {
    day = day + 'th';
  }
  
  let dateResult = day + " " + month + ", " +  year
  return dateResult;
}