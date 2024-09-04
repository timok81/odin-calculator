let currentOperand = 1;
let currentNum1 = "";
let currentNum2 = "";
let currentOperator = "";
let result = "";
const snarkMsg = "Nice try!"

const display = document.querySelector("#display");
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

//keyboard support
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
    if (display.textContent != "") {
        const newDisplayString = display.textContent.slice(0, (display.textContent.length - 1));
        clearDisplay();
        displayInput(newDisplayString);
    }
}

function addDecimal() {
    if (!display.textContent.includes(".")) {
        displayInput(".");
    }
}

function invertNumber() {
    if (currentOperand === 1) { display.textContent *= -1; }
    else { display.textContent *= -1; }
}

function resetAll() {
    currentNum1 = "";
    currentNum2 = "";
    currentOperator = "";
    result = "";
    display.textContent = "0";
    currentOperand = 1;
}

function displayInput(input) { display.textContent += input; }

function clearDisplay() { display.textContent = ""; }

function inputNumber(num) {
    if (display.textContent === "0") {
        clearDisplay();
    };
    if (currentOperand === 1) {
        if (display.textContent.length < 10) {
            displayInput(num);
        };
    }
    else {
        if (display.textContent.length < 12) {
            if (currentOperator !== "" && currentNum2 === "") {
                clearDisplay();
            }
            displayInput(num);
            if (currentNum2 === "") {
                currentNum2 = display.textContent;
            }
        }
    }
}

function inputOperator(operator) {
    if (currentOperator === "") {
        currentNum1 = display.textContent;
        currentOperand *= -1;
        clearDisplay();
        currentOperator = operator;
        displayInput(operator);
    }
    else if (currentNum1 != "" && currentNum2 != "" && currentOperator != "") {
        startOperation();
        inputOperator(operator);
    }
}

function startOperation() {
    if (currentOperator != "" && currentNum1 != "") {
        currentNum2 = display.textContent;
    }

    if (currentNum1 != "" && currentNum2 != "" && currentOperator != "") {
        clearDisplay();
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
    
    displayInput(result);
    currentNum1 = result;
    currentNum2 = "";
    currentOperator = "";
    result = "";    
}

function add(num1, num2) { return num1 + num2; }

function subtract(num1, num2) { return num1 - num2; }

function multiply(num1, num2) { return num1 * num2; }

function divide(num1, num2) { return num1 / num2; }
