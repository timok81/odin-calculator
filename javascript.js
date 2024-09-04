let currentOperand = 1;
let currentNum1 = "";
let currentNum2 = "";
let currentOperator = "";
let result = "";
const snarkMsg = "Nice try!"

const displayLower = document.querySelector("#displayLower");
const displayUpper = document.querySelector("#displayUpper");
const numberButtons = document.querySelectorAll(".numberButton")
const operatorButtons = document.querySelectorAll(".operatorButton");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const negOrPosButton = document.querySelector("#negOrPos");
const decimalButton = document.querySelector("#decimal");
const delButton = document.querySelector("#del");

numberButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        inputNumber(`${e.target.id}`)
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4" || e.key === "5" || e.key === "6" ||
        e.key === "7" || e.key === "6" || e.key === "8" || e.key === "9" || e.key === "0") { inputNumber(`${e.key}`) }

    else if (e.key === "+" || e.key === "-" || e.key === "x" || e.key === "/") { inputOperator(e.key) }
    else if (e.key === ".") { addDecimal() }
    else if (e.key === "Enter") { startOperation() }
    else if (e.key === "Backspace") { deleteInput() }
    else if (e.key === "c") { resetAll() }
}
);

operatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => { inputOperator(e.target.textContent) });
});

equalsButton.addEventListener("click", startOperation);
clearButton.addEventListener("click", resetAll);
negOrPosButton.addEventListener("click", invertNumber);
decimalButton.addEventListener("click", addDecimal);
delButton.addEventListener("click", deleteInput);

//---------------------------------------------------------------------------------//

function deleteInput() {
    if (displayLower.textContent != "") {
        const newDisplayString = displayLower.textContent.slice(0, (displayLower.textContent.length - 1));
        clearLowerDisplay();
        displayInputLower(newDisplayString);
    }
}

function addDecimal() {
    if (!displayLower.textContent.includes(".")) {
        displayInputLower(".");
    }
}

function invertNumber() {
    if (currentOperand === 1) { displayLower.textContent *= -1; }
    else {
        displayLower.textContent *= -1;
    }
}

function resetAll() {
    currentNum1 = "";
    currentNum2 = "";
    currentOperator = "";
    result = "";
    displayLower.textContent = "0";
    displayUpper.textContent = "0";
    currentOperand = 1;
}

function displayInputLower(input) { displayLower.textContent += input; }
function displayInputUpper(input) {
    let inputString = input.toString();
    if (inputString.length > 1 && inputString.charAt(0) === "-") {
        inputString = "(" + inputString + ")";
        input = inputString;
    }
    displayUpper.textContent += input;
}

function clearLowerDisplay() { displayLower.textContent = ""; }
function clearUpperDisplay() { displayUpper.textContent = ""; }

function inputNumber(num) {
    if (displayLower.textContent === "0" || displayLower.textContent === snarkMsg) {
        clearLowerDisplay();
    };
    if (currentOperand === 1) {
        if (displayLower.textContent.length < 10) {
            displayInputLower(num);
        };
    }
    else {
        if (displayLower.textContent.length < 12) {
            if (currentOperator !== "" && currentNum2 === "") {
                clearLowerDisplay();
                displayInputUpper(currentOperator);
            }
            displayInputLower(num);
            if (currentNum2 === "") {
                currentNum2 = displayLower.textContent;
            }
        }
    }
}

function inputOperator(operator) {
    if (currentOperator === "") {
        currentNum1 = displayLower.textContent;
        currentOperand *= -1;
        clearLowerDisplay();
        clearUpperDisplay();
        displayInputUpper(currentNum1);
        currentOperator = operator;
        displayInputLower(operator);
    }
    else if (currentNum1 != "" && currentNum2 != "" && currentOperator != "") {
        startOperation();
        inputOperator(operator);
    }
}

function startOperation() {
    if (currentOperator != "" && currentNum1 != "") {
        currentNum2 = displayLower.textContent;
    }

    if (currentNum1 != "" && currentNum2 != "" && currentOperator != "") {
        clearLowerDisplay();
        displayInputUpper(currentNum2);
        operate(Number(currentNum1), currentOperator, Number(currentNum2));
    }
    currentOperand *= -1;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "x":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
    }
    let resultString = result.toString();
    if (result.toString().length > 12) {
        let shortResult = resultString.slice(0, 12);
        result = Number(shortResult)
    }

    displayInputLower(result);
    currentNum1 = result;
    currentNum2 = "";
    currentOperator = "";
    if (result === Infinity) { displayLower.textContent = snarkMsg };
    result = "";
}

function add(num1, num2) { return num1 + num2; }

function subtract(num1, num2) { return num1 - num2; }

function multiply(num1, num2) { return num1 * num2; }

function divide(num1, num2) { return num1 / num2; }
