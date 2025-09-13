let display = document.getElementById("calc-display-ID");
let buttons = document.querySelectorAll(".calc-button");
let currentInput = "";

buttons.forEach(button => button.addEventListener("click", handleClick));

function handleClick(event) {
    let btn = event.target;
    let value = btn.textContent.trim();

    if (btn.classList.contains("calc-button-number") || btn.classList.contains("calc-button-number-float")) {
        currentInput += value;
        display.textContent = currentInput;
        return;
    }

    if (btn.classList.contains("calc-button-operator")) {
        currentInput += value;
        display.textContent = currentInput;
        return;
    }

    if (value === "(" || value === ")") {
        currentInput += value;
        display.textContent = currentInput;
        return;
    }

    if (btn.classList.contains("calc-button-number-equal") && value === "=") {
        try {
            let parsedExpression = parseExpression(currentInput);
            let result = Function(`"use strict"; return (${parsedExpression})`)();
            display.textContent = result;
            currentInput = result.toString();
        } catch (err) {
            display.textContent = "Error";
            currentInput = "";
        }
        return;
    }

    if (value === "AC") {
        currentInput = "";
        display.textContent = "0";
        return;
    }

    if (value === "DEL") {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || "0";
        return;
    }
}

function parseExpression(expr) {
    expr = expr.replace(/×/g, "*");
    expr = expr.replace(/x/g, "*");
    expr = expr.replace(/÷/g, "/");
    expr = expr.replace(/–/g, "-");
    return expr;
}
