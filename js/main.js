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
        currentAngleMode = currentAngleMode ==="DEG" ? "RAD" : "DEG";
        angleMode.textContent = currentAngleMode;

    console.log("Current angle mode: ", currentAngleMode);
    });

const clearButton = document.getElementById("clear-button");

    calculatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const action = button.dataset.action;
            const value = button.dataset.value;

            if(["sqrt", "sin", "cos", "tan", "log", "sin-inverse", "cos-inverse", "tan-inverse"].includes(action)) {

                const calculation = calculateScientific(action,expressionDisplay.textContent,currentAngleMode);

                if(calculation.result !== "Error") {
                    expressionDisplay.textContent = calculation.result.toString();
                    resultDisplay.textContent = calculation.result.toString();
                    addHistory(calculation.expression, calculation.result);
                }
                else {
                    resultDisplay.textContent = "Error" ;
                }
                return;
            }

            if (action == "calculate") {

                const expression = expressionDisplay.textContent;
                const result = calculateExpression(expression);
                
                resultDisplay.textContent = result;
                
                if (result !== "Error"){
                    addHistory(expression, result);
                    expressionDisplay.textContent = result.toString();
                }

                return;
            }

            if(action === "backspace") {
              expressionDisplay.textContent = expressionDisplay.textContent.trimEnd().slice(0, -1) || "0";
            
              return;
            }

            if (value !== undefined) {

                let currentExpression = expressionDisplay.textContent.trimEnd();

                if( currentExpression === "0") {
                currentExpression = "";
                }
        
                expressionDisplay.textContent = currentExpression + value;
            }

        });

    });

    clearButton.addEventListener("click", () => {
        expressionDisplay.textContent = "0";
        resultDisplay.textContent = "0";
});


document.addEventListener("keydown", (event) => {

    const key = event.key;

    if(/^[0-9.+\-*/()]$/.test(key)) {
        const currentExpression = expressionDisplay.textContent;

        expressionDisplay.textContent = (currentExpression === "0" ? "" : currentExpression) + key;

    }

    else if (key == "Enter") {
        document.querySelector('[data-action="calculate"]').click();
    }

    else if (key == "Backspace") {
        document.querySelector('[data-action = "backspace"]').click();
    }

    else if (key == "Escape") {
        clearButton.click();
    }
});

const modeButtons = document.querySelectorAll (".mode-button");
const keypadSections = document.querySelectorAll(".keypad-section");

modeButtons.forEach(button => {

    button.addEventListener ("click", () => {

        const selectedMode = button.dataset.mode;

        modeButtons.forEach(modeButton => {
            modeButton.classList.remove("active");
        });

        button.classList.add("active");

        keypadSections.forEach(section => {
            section.classList.toggle (
                "active",
                section.dataset.keypad === selectedMode
            );
        });
    });
});



