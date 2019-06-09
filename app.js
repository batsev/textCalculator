//Declaring variables
const textInput = document.querySelector(".form-input");
const formButton = document.querySelector(".form-button");
const resultButton = document.querySelector(".result-button");
const answer = document.querySelector(".answer");
const helper = document.querySelector(".helper");

const numbers = {
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
  "9": "девять",
  "10": "десять"
};

const signs = {
  "/": "разделить",
  "*": "умножить",
  "+": "плюс",
  "-": "минус"
};
//-----------WORKSPACE-----------

const addPronoun = str => {
  if (!Object.values(signs).includes(str)) return str;
  return str == "умножить" || str == "разделить" ? `${str} на` : str;
};

const delPronoun = str => {
  return str.replace("на", "");
};
//.........Replace .........
const replaceWithNumbers = str => {
  let newNum = numbers,
    newStr = str;
  newNum["7"] = /(^|\s)семь/;
  for (let porp in newNum) {
    newStr = newStr.replace(newNum[porp], porp);
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
const replaceAll = str => {
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
var check = 0; //проверка произвелся ли финальный подсчет
var check1 = 1; // проверка на ввод элемента (цифра или оператор)
const performCalculation = () => {
  if (check == -1) {
    answer.innerHTML = "";
    check = 0;
  }
  let elem = textInput.value;
  ////////
  if (check1 == 1) {
    if (!checkForNumber(elem)) {
      alertOnMistake("Неправильно введеное число!");
      return;
    }
    check1 = 0;
    helper.innerHTML = "Введите оператор";
  } else {
    if (!checkForSign(elem)) {
      alertOnMistake("Неправльное введеный оператор!");
      return;
    }
    elem = addPronoun(elem);
    check1 = 1;
    helper.innerHTML = "Введите число";
  }
  // if (!(checkForSign(elem) || checkForNumber(elem))) {
  //   alertOnMistake();
  //   return;
  // }
  // if (checkForSign(elem)) elem = addPronoun(elem);
  ////////
  answer.innerHTML += " " + elem;
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

resultButton.addEventListener("click", e => {
  if (check1 == 1) {
    alertOnMistake("Последним элементом не может быть оператор!");
  } else {
    let sum = replaceAll(delPronoun(answer.innerHTML));
    answer.innerHTML = Math.round(eval(sum) * 100) / 100;
    helper.innerHTML = "Введите число";
    check = -1;
    check1 = 1;
  }
});

//reset
document.querySelector(".reset-button").addEventListener("click", e => {
  check = 0;
  check1 = 1;
  helper.innerHTML = "Введите число";
  answer.innerHTML = "";
  textInput.value = "";
});

//ERROR
const alertOnMistake = str => {
  document.querySelector(".error").innerHTML = str;
  document.querySelector(".error").style.opacity = 1;
  setTimeout(() => (document.querySelector(".error").style.opacity = 0), 1000);
};
