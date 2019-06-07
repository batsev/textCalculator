//Declaring variables
var textInput = document.querySelector(".form-input");
var formButton = document.querySelector(".form-button");
var resultButton = document.querySelector(".result-button");
var answer = document.querySelector(".answer");
var check = document.querySelector(".check");

var numbers = {
  "0": "ноль",
  "1": "один",
  "2": "два",
  "3": "три",
  "4": "четыре",
  "5": "пять",
  "6": "шесть",
  //"7": /(^|\s)семь/,
  "7": "семь",
  "8": "восемь",
  "9": "девять"
};

var signs = {
  "/": "разделить",
  "*": "умножить",
  "+": "сложить",
  "-": "вычесть"
};
//-----------WORKSPACE-----------
//.........Replace .........
const replaceWithNumbers = str => {
  let newStr = str;
  for (let porp in numbers) {
    newStr = newStr.replace(numbers[porp], porp);
  }
  return newStr;
};
const replaceWithSigns = str => {
  let newStr = str;
  for (let prop in signs) {
    newStr = newStr.replace(signs[prop], prop);
  }
  return newStr;
};
//test
const replaceAllTest = str => {
  let newStr = replaceWithNumbers(str);
  newStr = replaceWithSigns(newStr);
  return newStr;
};
//,,,,,,,,,,,,,,CHECK,,,,,,,,,,

const checkForNumber = str => {
  return /^-{0,1}\d+$/.test(str) || Object.values(numbers).includes(str)
    ? true
    : false;
};

const checkForSign = str => {
  return Object.values(signs).includes(str) || str in signs ? true : false;
};

//.........ОПЕРАЦИИ................

const performCalculation = () => {
  //   let number = textInput.value;

  answer.innerHTML += replaceAllTest(textInput.value);
  textInput.value = "";
};

//EVENT LISTENERS ON ENTER AND CLICK
textInput.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    performCalculation();
  }
});

formButton.addEventListener("click", e => {
  performCalculation();
});

//reset
document.querySelector(".reset-button").addEventListener("click", e => {
  answer.innerHTML = "";
  textInput.value = "";
});

//ERROR
const alertOnMistake = () => {
  document.querySelector(".error").style.opacity = 1;
  setTimeout(() => (document.querySelector(".error").style.opacity = 0), 1000);
};
