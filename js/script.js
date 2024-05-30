const resultText = document.getElementById("result-text");

function updateResultText(text) {
  resultText.textContent = text;
}

let nums = [];
let ops = [];

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

function calculate() {
  if (parseExpression() === false) {
    return;
  }
  try {
    calculateMulDiv();
    calculateAddSub();
  } catch (e) {
    alert(e.message);
    return;
  }
  updateResultText(nums[0].toString(2));
}

function calculateMulDiv() {
  const nums_stack = [];
  const ops_stack = [];

  for (let i = 0; i < nums.length; i++) {
    nums_stack.push(nums[i]);
    if (i > 0) {
      ops_stack.push(ops[i - 1]);
    }

    if (["*", "/"].includes(ops_stack[ops_stack.length - 1])) {
      const op = ops_stack.pop();
      const b = nums_stack.pop();
      const a = nums_stack.pop();
      switch (op) {
        case "*":
          nums_stack.push(a * b);
          break;
        case "/":
          if (b === 0) {
            throw new Error("Warning: division by zero");
          }
          nums_stack.push(Math.round(a / b));
          break;
      }
    }
  }

  nums = [...nums_stack];
  ops = [...ops_stack];
}

function calculateAddSub() {
  while (nums.length > 1) {
    const a = nums.shift();
    const b = nums.shift();
    const op = ops.shift();
    switch (op) {
      case "+":
        nums.unshift(a + b);
        break;
      case "-":
        nums.unshift(a - b);
        break;
    }
  }
}

const buttons = document.getElementById("btn-grid").querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;
    switch (buttonText) {
      case "0":
      case "1":
      case "+":
      case "-":
      case "*":
      case "/":
        updateResultText(resultText.textContent + buttonText);
        break;
      case "C":
        updateResultText("");
        break;
      case "=":
        calculate();
        break;
    }
  });
});
