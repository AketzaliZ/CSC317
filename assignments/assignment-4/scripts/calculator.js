function $(id) {
  return document.getElementById(id);
}

function addValue(value) {
  $("display").value += value;
}

function ac() {
  $("calculation").value = "";
  $("display").value = "";
}

function flipSign() {
  const display = $("display");
  if (!display.value) return;
  display.value = secureEval(display.value) * -1;
}

function percentage() {
  const display = $("display");
  if (!display.value) return;
  display.value = secureEval(display.value) / 100;
}

function calculate() {
  const display = $("display");
  const calculation = $("calculation");
  calculation.value = display.value;
  display.value = secureEval(display.value);
}

function secureEval(expression) {
  const safePattern = /^[0-9+\-*/%.() ]+$/;
  if (!safePattern.test(expression)) {
    return "Error";
  }
  try {
    return Function('"use strict"; return (' + expression + ')')();
  } catch {
    return "Error";
  }
}

function flashButton(id) {
  const button = $(id);
  if (!button) return;
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 100);
}

document.addEventListener("keydown", function(event) {
  const key = event.key;

  const keyMap = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "+": "plus",
    "-": "minus",
    "*": "multiply",
    "/": "divide",
    "%": "percentage",
    ".": "dot",
    "Enter": "equals",
    "Escape": "clear"
  };

  if ("0123456789+-*/.%".includes(key)) {
    addValue(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Escape") {
    ac();
  } else if (key === "Backspace") {
    const display = $("display");
    display.value = display.value.slice(0, -1);
  }

  const btnId = keyMap[key];
  if (btnId) flashButton(btnId);
});
