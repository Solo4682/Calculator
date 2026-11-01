const expressionDisplay = document.getElementById("expression-display");
const resultDisplay = document.getElementById("result-display");
const calculatorButtons = document.querySelectorAll(".calc-key");

console.log("CalcForge JavaScript loaded successfully");

const angleMode = document.getElementById("angle-mode");

    let currentAngleMode = "DEG";
    angleMode.addEventListener("click", () => {
        currentAngleMode = currentAngleMode ==="DEG" ? "RAD" : "DEG";
        angleMode.textContent = currentAngleMode;

    console.log("Current angle mode: ", currentAngleMode);
    });

const clearButton = document.getElementById("clear-button");

    calculatorButtons.forEach(button => {

        button.addEventListener("click", () => {

            const value = button.dataset.value;
            const action = button.dataset.action;

            if (action == "sqrt") {
                const currentExpression = expressionDisplay.textContent;
                const result = Math.sqrt(Number(currentExpression));

                if(Number.isFinite(result)) {
                    expressionDisplay.textContent = Number(result.toFixed(10)).toString();
                    resultDisplay.textContent = result.toFixed(10);
                }
                else {
                    resultDisplay.textContent = "Error";
                }

                return; 
            }

            if (action == "sin") {
                
                const angle = Number(expressionDisplay.textContent);
                const radians = currentAngleMode === "DEG"
                    ? angle * Math.PI/180
                    : angle;
                
                const result = Math.sin(radians);

                expressionDisplay.textContent = Number(result.toFixed(10)).toString();
                resultDisplay.textContent = result.toFixed(10);

                return;
            }

            if (action == "cos") {
                
                const angle = Number(expressionDisplay.textContent);
                const radians = currentAngleMode === "DEG"
                    ? angle * Math.PI/180
                    : angle;

                const result = Math.cos(radians);

                expressionDisplay.textContent = Number(result.toFixed(10)).toString();
                resultDisplay.textContent = result.toFixed(10);

                return;
            }

            if (action == "tan") {

                const angle = Number(expressionDisplay.textContent);
                const radians = currentAngleMode === "DEG"
                    ? angle * Math.PI/180
                    : angle;

                const result = Math.tan(radians);

                expressionDisplay.textContent = Number(result.toFixed(10)).toString();
                resultDisplay.textContent = result.toFixed(10);

                return;
            }

            if (action == "log") {
                
                const number = Number(expressionDisplay.textContent);
                const result = Math.log10(number);

                if (Number.isFinite(result)) {
                    expressionDisplay.textContent = Number(result.toFixed(10)).toString();
                    resultDisplay.textContent = result.toFixed(10);
                }
                else {
                    resultDisplay.textContent = "Error";
                }

                return;
            }

            if (action == "calculate") {

                const expression = expressionDisplay.textContent;
                const result = calculateExpression(expression);
                
                resultDisplay.textContent = result;
                
                if (result !== "Error"){
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

function calculateExpression(expression) {

    try {
        const numbers = expression.match(/\d+(\.\d+)?/g);

        if (!expression.trim () || /[+\-*/.]$/.test(expression.trim())) {
            throw new Error ("Incomplete expression");
        }
        if(/[+*/]{2,}|-{2,}/.test(expression.replace(/\s/g, ""))) {
            throw new Error ("Invalid operators");
        }
        if (!numbers) {
            throw new Error ("Invalid expression");
        }

        const result = Function ('"use strict"; return ( '  +expression.replace(/\^/g, "**") + ')')();

        if(!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        return Number(result.toFixed(10));
    
    } catch (error) {
        return "Error";
    }
}

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