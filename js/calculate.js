let nums = [];
let ops = [];

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
