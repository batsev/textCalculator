//Declaring variables
const textInput = document.querySelector(".my-form");
const resultButton = document.querySelector(".result-button");
const answer = document.querySelector(".answer");
const error = document.querySelector(".error");

const operators = {
  "0": [/ноль/g, /нулём/g, /нуля/g, /нулем/g],
  "1": [/один/g, /единица/g, /одного/g, /одним/g, /единицу/g, /единицой/g],
  "2": [/два/g, /двух/g, /двумя/g],
  "3": [/три/g, /трёх/g, /трех/g, /тремя/g],
  "4": [/четыре/g, /четырёх/g, /четырех/g, /четырьмя/g],
  "5": [/пять/g, /пяти/g, /пятью/g],
  "6": [/шесть/g, /шести/g, /шестью/g],
  "7": [/(^|\s)семь/g, /(^|\s)семи/g, /(^|\s)семью/g],
  "8": [/восемь/g, /восьми/g, /восемью/g],
  "9": [/девять/g, /девяти/g, /девятю/g],
  "10": [/десять/g, /десяти/g, /десятю/g],
  "/": [/разделить на/g, /поделить на/g, /разделить/g, /поделить/g],
  "*": [/умножить на/g, /помножить на/g, /помножить/g, /умножить/g],
  "+": [/плюс/g, /сложить с/g],
  "-": [/минус/g, /вычесть из/g]
};

//-----------WORKSPACE-----------
function calc(str) {
  let newStr = replaceWordsWithValid(str);
  newStr = deleteMusor(newStr);
  if (newStr == "") {
    alertOnMistake("Ошибка ввода!");
    return null;
  }
  console.log(newStr);
  answer.innerHTML = newStr;
  try {
    var result = eval(newStr);
    if (result == Infinity || result == -Infinity) {
      alertOnMistake("На ноль делить нельзя!");
      return null;
    }
  } catch {
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
  for (let prop in operators) {
    operators[prop].forEach(word => {
      str = str.replace(word, prop);
    });
  }
  return str;
}
