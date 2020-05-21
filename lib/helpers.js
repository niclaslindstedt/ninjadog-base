/**
 * Get filename from path
 *
 * @param {string} path
 * @returns
 */
const filename = (path) => {
  if (path.match(/\\/)) {
    return path.substring(path.lastIndexOf('\\') + 1, path.length);
  }

  if (path.match(/\//)) {
    return path.substring(path.lastIndexOf('/') + 1, path.length);
  }

  return path;
};

// https://stackoverflow.com/a/5834507
function VarOperator(op) {
  this.operation = op;
  this.evaluate = function evaluate(param1, param2) {
    switch (this.operation) {
      case '+':
        return +param1 + +param2;
      case '-':
        return +param1 - +param2;
      case '*':
        return +param1 * +param2;
      case '/':
        return +param1 / +param2;
      case '<':
        return +param1 < +param2;
      case '>':
        return +param1 > +param2;
      case '=':
        return param1 === param2;
    }
  };
}

/**
 * Add a zero if under 10
 * @param {Number} number
 * @returns
 */
let zeroBefore = (number) => {
  return +number < 10 ? '0' + number : number;
};

module.exports = {
  filename,
  VarOperator,
  zeroBefore
};
