const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
  display.textContent = displayValue;
}

function handleNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
}

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (firstValue === null && !isNaN(value)) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = nextOperator;
}

function calculate(first, second, operator) {
  if (operator === "+") return first + second;
  if (operator === "-") return first - second;
  if (operator === "*") return first * second;
  if (operator === "/") return first / second;
  if (operator === "%") return first % second;
  return second;
}

function handleDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

function resetCalculator() {
  displayValue = "0";
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
}

function deleteLastDigit() {
  displayValue = displayValue.slice(0, -1) || "0";
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const { action } = button.dataset;
    const buttonContent = button.textContent;

    button.classList.add("pressed");
    setTimeout(() => {
      button.classList.remove("pressed");
    }, 150);

    switch (action) {
      case "number":
        handleNumber(buttonContent);
        break;
      case "operator":
        handleOperator(buttonContent);
        break;
      case "decimal":
        handleDecimal();
        break;
      case "clear":
        resetCalculator();
        break;
      case "delete":
        deleteLastDigit();
        break;
      case "calculate":
        handleOperator(operator);
        operator = null;
        waitingForSecondValue = true;
        break;
      default:
        break;
    }

    updateDisplay();
  });
});

updateDisplay();
