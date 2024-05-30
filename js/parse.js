/**
 * Parse the expression and store the numbers and operators in separate arrays
 * @returns {boolean} true if the expression is parsed successfully and need to be
 * computed, false otherwise
 */
function parseExpression() {
  const expr = resultText.textContent;
  if (!expr) {
    return false;
  }

  const numsMatches = expr.match(/\d+/g);
  nums = numsMatches ? numsMatches.map((num) => parseInt(num, 2)) : [];

  ops = expr.match(/[\+\-\*\/]/g) || [];
  if (nums.length === 1 && ops.length === 0) {
    return false;
  }
  if (nums.length === 0 && ops.length > 0) {
    alert("Syntax error: missing numbers");
    return false;
  }

  try {
    checkValidity(expr, nums, ops);
  } catch (e) {
    alert(e.message);
    return false;
  }

  return true;
}

/**
 * Checks the validity of a binary mathematical expression.
 *
 * @param {string} expr - The expression to be checked.
 * @param {number[]} nums - An array of numbers in the expression.
 * @param {string[]} ops - An array of operators in the expression.
 * @throws {Error} If there is a syntax error in the expression.
 */
function checkValidity(expr, nums, ops) {
  const startsWithOperator = /^[\+\-\*\/]/.test(expr);
  if (startsWithOperator) {
    if (!(["+", "-"].includes(ops[0]))) {
      throw new Error(
        "Syntax error: only + and - operators are allowed at the beginning",
      );
    }
    updateFirstNumber(nums, ops);
  }

  if (ops.length !== nums.length - 1) {
    throw new Error(
      "Syntax error: there may be redundant operators or missing numbers",
    );
  }
}

/**
 * Updates the first number in the array by adding the shifted operator to it.
 * @param {number[]} nums - The array of numbers.
 * @param {string[]} ops - The array of operators.
 */
function updateFirstNumber(nums, ops) {
  nums[0] = Number(ops.shift() + nums[0]);
}
