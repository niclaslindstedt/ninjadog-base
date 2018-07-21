exports.print = (fullstring = false, onlyNumbers = false) => {
  var temp = new Date();
  var dateStr = `${padStr(temp.getFullYear())}:${padStr(
    1 + temp.getMonth()
  )}:${padStr(temp.getDate())}, ${padStr(temp.getHours())}:${padStr(
    temp.getMinutes()
  )}:${padStr(temp.getSeconds())}`;

  if (onlyNumbers) {
    dateStr = dateStr.replace(/:/g, '').replace(/,\s/g, '');
  }

  return fullstring ? dateStr : dateStr.substr(12);
};

function padStr(i) {
  return i < 10 ? '0' + i : '' + i;
}
