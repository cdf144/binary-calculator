const resultText = document.getElementById("result-text");

function updateResultText(text) {
  resultText.textContent = text;
}

let nums = [];
let ops = [];

/**
 * Parse the expression and store the numbers and operators in separate arrays
 * @throws {Error} If the expression is invalid (contains redundant operators)
 */
function parseExpression() {
  const expr = resultText.textContent;
  nums = expr.split(/[\+\-\*\/]/).filter((num) => num !== "").map((num) =>
    parseInt(num, 2)
  );
  ops = expr.match(/[\+\-\*\/]/g);
  if (ops.length !== nums.length - 1) {
    throw new Error("Invalid expression (redundant operators are not allowed)");
  }
}

/**
 * Calculate the result of the expression
 */
function calculate() {
  try {
    parseExpression();
  } catch (e) {
    alert(e.message);
  }

  if (nums.length < 2) {
    return;
  }
  calculateMulDiv();
  calculateAddSub();
  updateResultText(nums[0].toString(2));
}

function calculateMulDiv() {
  const nums_stack = [], ops_stack = [];

  // Prioritize * and / operators
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
          nums_stack.push(Math.round(a / b));
      }
    }
  }

  nums = [...nums_stack].reverse();
  ops = [...ops_stack].reverse();
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
