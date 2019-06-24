//Declaring variables
const textInput = document.querySelector(".my-form");
const resultButton = document.querySelector(".result-button");
const answer = document.querySelector(".answer");
const error = document.querySelector(".error");

const operators = {
  "0": [0, [/ноль/g, /нулём/g, /нуля/g, /нулем/g]],
  "1": [0, [/один/g, /единица/g, /одного/g, /одним/g, /единицу/g, /единицой/g]],
  "2": [0, [/два/g, /двух/g, /двумя/g]],
  "3": [0, [/три/g, /трёх/g, /трех/g, /тремя/g]],
  "4": [0, [/четыре/g, /четырёх/g, /четырех/g, /четырьмя/g]],
  "5": [0, [/пять/g, /пяти/g, /пятью/g]],
  "6": [0, [/шесть/g, /шести/g, /шестью/g]],
  "7": [0, [/(^|\s)семь/g, /(^|\s)семи/g, /(^|\s)семью/g]],
  "8": [0, [/восемь/g, /восьми/g, /восемью/g]],
  "9": [0, [/девять/g, /девяти/g, /девятю/g]],
  "10": [0, [/десять/g, /десяти/g, /десятю/g]],
  "/": [2, [/разделить на/g, /поделить на/g, /разделить/g, /поделить/g]],
  "*": [2, [/умножить на/g, /помножить на/g, /помножить/g, /умножить/g]],
  "+": [1, [/плюс/g, /сложить с/g]],
  "-": [1, [/минус/g, /вычесть из/g]]
};

//-----------WORKSPACE-----------
function calc(str) {
  let newStr = replaceWordsWithValid(str);
  newStr = deleteMusor(newStr);
  if (newStr == "") {
    alertOnMistake("Ошибка ввода!");
    return null;
  }
  answer.innerHTML = newStr;
  let result = zames(newStr);
  if (!result) {
    alertOnMistake("Ошибка ввода!");
    return null;
  }

  return [newStr, Math.round(result * 100) / 100];
}

function performCalculation() {
  answer.style.backgroundColor = "";
  const finalAnswer = calc(textInput.value);
  if (finalAnswer) answer.innerHTML = `${finalAnswer[0]} = ${finalAnswer[1]}`;
  textInput.value = "";
}

//EVENT LISTENERS ON ENTER AND CLICK
textInput.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    performCalculation();
  }
});

resultButton.addEventListener("click", e => {
  performCalculation();
});

// ERROR
function alertOnMistake(str) {
  error.innerHTML = str;
  error.style.opacity = 1;
  setTimeout(() => (error.style.opacity = 0), 1000);
}

//Ubiraem musor
function deleteMusor(str) {
  return str.replace(/([^ 0-9*/+-.]+)/g, "");
}
//Replace all characters with valid operators for EVAL

function replaceWordsWithValid(str) {
  str = str.replace(/\s\s+/g, " ");
  for (let prop in operators) {
    if (!operators[prop][1]) continue;
    operators[prop][1].forEach(word => {
      str = str.replace(word, prop);
    });
  }
  return str;
}

function zames(str) {
  let temp;
  if (/([+-]?([0-9]*[.])?[0-9]+) +([+-]?([0-9]*[.])?[0-9]+)/g.test(str))
    return null;
  //проверка чтобы не было чисел стоящих через пробел
  let str1 = str.replace(/\s/g, ""); //убираем пробелы
  if (
    /(^[*/]|^[+-]{2})|([-+]{3,})|[*/][+-]{2}|([-+][*/])|[*/]{2,}|([-+*/]$)/g.test(
      str1
    )
  )
    return null; //завершает функцию когда видит вначале знаки умножения болюше одного подряд знака умножения и деления и в кноце знаков
  str1 = str1
    .replace(/(\+\-)|(\-\+)/g, "-")
    .replace(/-{2}/g, "+")
    .match(/[*/]|([+\-]?([0-9\.]+))/g); //основа основ. делит строку на числа и знаки умножения/деления
  //https://coderwall.com/p/prvrnw/remove-items-from-array-while-iterating-over-it
  for (let index = str1.length - 1; index >= 0; --index) {
    if (!operators[str1[index]]) continue;
    if (operators[str1[index]][0] == 2) {
      switch (str1[index]) {
        case "/":
          if (str1[index + 1] == "0") return null;
          temp = parseFloat(str1[index - 1]) / parseFloat(str1[index + 1]);
          temp = Math.round(temp * 100) / 100;
          break;
        case "*":
          temp = parseFloat(str1[index - 1]) * parseFloat(str1[index + 1]);
          temp = Math.round(temp * 100) / 100;
          break;
        default:
          return;
      }
      str1[index - 1] = temp + "";
      str1.splice(index, 2);
    }
  }

  return str1.reduce(function(sum, value) {
    return parseFloat(sum) + parseFloat(value);
  });
}

// if (!operators[str1[index]]) continue;
//   if (operators[str1[index]][0] == 1)
