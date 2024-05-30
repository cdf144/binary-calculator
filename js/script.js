const resultText = document.getElementById("result-text");

function updateResultText(text) {
  resultText.textContent = text;
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
