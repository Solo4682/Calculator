import { addHistory, initialiseHistory } from "./history.js";
import { calculateExpression } from "./basic.js";
import { calculateScientific } from "./scientific.js";

const expressionDisplay = document.getElementById("expression-display");
const resultDisplay = document.getElementById("result-display");
const calculatorButtons = document.querySelectorAll(".calc-key");

initialiseHistory();

console.log("CalcForge JavaScript loaded successfully");

const angleMode = document.getElementById("angle-mode");

let currentAngleMode = "DEG";

angleMode.addEventListener("click", () => {
    currentAngleMode = currentAngleMode === "DEG" ? "RAD" : "DEG";
    angleMode.textContent = currentAngleMode;
});

const clearButton = document.getElementById("clear-button");

const scientificActions = [
    "sqrt",
    "sin",
    "cos",
    "tan",
    "log",
    "sin-inverse",
    "cos-inverse",
    "tan-inverse",
    "ln",
    "log-base",
    "factorial",
    "pi",
    "e"
];

calculatorButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;
        const value = button.dataset.value;

        // Scientific calculations
        if (scientificActions.includes(action)) {

            const expression = expressionDisplay.textContent;

            let base = null;

            if (action === "log-base") {
                const baseInput = prompt("Enter the logarithm base:");

                if (baseInput === null || baseInput.trim() === "") {
                    return;
                }

                base = Number(baseInput);

                if (!Number.isFinite(base) || base <= 0 || base === 1) {
                    resultDisplay.textContent = "Error";
                    return;
                }
            }

            const calculation = calculateScientific(
                action,
                expression,
                currentAngleMode,
                base
            );

            if (calculation.result !== "Error") {

                expressionDisplay.textContent = calculation.result.toString();
                resultDisplay.textContent = calculation.result.toString();

                addHistory(calculation.expression, calculation.result);
            }

            else {
                resultDisplay.textContent = "Error";
            }

            return;
        }

        // Basic calculation
        if (action === "calculate") {

            const expression = expressionDisplay.textContent;
            const result = calculateExpression(expression);

            resultDisplay.textContent = result;

            if (result !== "Error") {
                addHistory(expression, result);
                expressionDisplay.textContent = result.toString();
            }

            return;
        }

        // Backspace
        if (action === "backspace") {

            expressionDisplay.textContent =
                expressionDisplay.textContent.trimEnd().slice(0, -1) || "0";

            return;
        }

        // Number and operator input
        if (value !== undefined) {

            let currentExpression = expressionDisplay.textContent.trimEnd();

            if (currentExpression === "0") {
                currentExpression = "";
            }

            expressionDisplay.textContent = currentExpression + value;
        }

    });

});

// Clear calculator
clearButton.addEventListener("click", () => {

    expressionDisplay.textContent = "0";
    resultDisplay.textContent = "0";

});

// Keyboard support
document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (/^[0-9.+\-*/()]$/.test(key)) {

        const currentExpression = expressionDisplay.textContent;

        expressionDisplay.textContent =
            (currentExpression === "0" ? "" : currentExpression) + key;

    }

    else if (key === "Enter") {
        document.querySelector('[data-action="calculate"]').click();
    }

    else if (key === "Backspace") {
        document.querySelector('[data-action="backspace"]').click();
    }

    else if (key === "Escape") {
        clearButton.click();
    }

});

// Calculator modes
const modeButtons = document.querySelectorAll(".mode-button");
const keypadSections = document.querySelectorAll(".keypad-section");

modeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedMode = button.dataset.mode;

        modeButtons.forEach(modeButton => {
            modeButton.classList.remove("active");
        });

        button.classList.add("active");

        keypadSections.forEach(section => {

            section.classList.toggle(
                "active",
                section.dataset.keypad === selectedMode
            );

        });

    });

});