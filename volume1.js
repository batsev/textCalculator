var textInput = document.querySelector(".my-input");
var myButton = document.querySelector(".my-button");
var answer = document.querySelector(".answer");

var numbers = {
  "0": "ноль",
  "1": "один",
  "2": "два",
  "3": "три",
  "4": "четыре",
  "5": "пять",
  "6": "шесть",
  "7": /(^|\s)семь/,
  "8": "восемь",
  "9": "девять"
};

var signs = {
  "/": "разделить на",
  "*": "умножить на",
  "+": "плюс",
  "-": "минус"
};

const alertOnMistake = () => {
  answer.style.backgroundColor = "rgb(224, 62, 62)";
};

function calc(str) {
  var newStr = str;
  for (let prop in signs) {
    newStr = newStr.replace(signs[prop], prop);
  }
  for (let porp in numbers) {
    newStr = newStr.replace(numbers[porp], porp);
  }
  console.log(newStr);
  try {
    var result = eval(newStr);
  } catch {
    console.log("Mistake");
    alertOnMistake();
    return "Ошибка ввода!";
  }
  return Math.round(result * 100) / 100;
}

const performCalculation = () => {
  answer.style.backgroundColor = "";
  answer.innerHTML = calc(textInput.value);
  textInput.value = "";
};
textInput.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    performCalculation();
  }
});

myButton.addEventListener("click", e => {
  performCalculation();
});
