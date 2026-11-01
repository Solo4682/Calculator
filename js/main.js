const expressionDisplay = document.getElementById("expression-display");
const resultDisplay = document.getElementById("result-display");
const calculatorButtons = document.querySelectorAll(".calc-key");
const historyList = document.getElementById("history-list");
const clearHistoryButton = document.getElementById ("clear-history");

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
                    const formattedResult = Number(result.toFixed(10)).toString();

                    addHistory("√(" + currentExpression + ")", formattedResult);

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

                if(Number.isFinite(result)) {
                    const formattedResult = Number(result.toFixed(10)).toString();

                    addHistory("sin(" + angle + "" + currentAngleMode + ")", formattedResult);

                    expressionDisplay.textContent = Number(result.toFixed(10)).toString();
                    resultDisplay.textContent = result.toFixed(10);
                }
                else{
                    resultDisplay.textContent = "Error";
                }
                return;
            }

            if (action == "cos") {
                
                const angle = Number(expressionDisplay.textContent);
                const radians = currentAngleMode === "DEG"
                    ? angle * Math.PI/180
                    : angle;

                const result = Math.cos(radians);

                if(Number.isFinite(result)) {
                    const formattedResult = Number(result.toFixed(10)).toString();

                    addHistory("sin(" + angle + "" + currentAngleMode + ")", formattedResult);

                    expressionDisplay.textContent = Number(result.toFixed(10)).toString();
                    resultDisplay.textContent = result.toFixed(10);
                }
                else{
                    resultDisplay.textContent = "Error";
                }

                return;
            }

            if (action == "tan") {

                const angle = Number(expressionDisplay.textContent);
                const radians = currentAngleMode === "DEG"
                    ? angle * Math.PI/180
                    : angle;

                const result = Math.tan(radians);

                if(Number.isFinite(result)) {
                    const formattedResult = Number(result.toFixed(10)).toString();

                    addHistory("sin(" + angle + "" + currentAngleMode + ")", formattedResult);

                    expressionDisplay.textContent = Number(result.toFixed(10)).toString();
                    resultDisplay.textContent = result.toFixed(10);
                }
                else {
                    resultDisplay.textContent = "Error";
                }

                return;
            }

            if (action == "log") {
                
                const number = Number(expressionDisplay.textContent);
                const result = Math.log10(number);

                if (Number.isFinite(result)) {
                    const formattedResult = Number(result.toFixed(10)).toString();

                    addHistory("log(" + number + ")", formattedResult);
                    
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

function addHistory(expression, result, save = true) {

    const emptyMessage = historyList.querySelector(".history-empty");

    if(emptyMessage) {
        emptyMessage.remove();
    }

    const historyEntry = document.createElement("button");
    historyEntry.type = "button";
    historyEntry.classList.add("history-entry");

    const expressionText = document.createElement("span");
    expressionText.classList.add("history-expression");
    expressionText.textContent = expression;

    const resultText = document.createElement("span");
    resultText.classList.add("history-result");
    resultText.textContent = "= " + result;

    historyEntry.append(expressionText, resultText);

    historyEntry.addEventListener("click", () => {
        expressionDisplay.textContent = result;
        resultDisplay.textContent = result;
    });

    historyList.prepend(historyEntry);
    let savedHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];
    if(save) {
            savedHistory.unshift ({
            expression: expression,
            result: result
        });

        savedHistory = savedHistory.slice(0,20);
        localStorage.setItem("calcHistory", JSON.stringify(savedHistory));
    }
        
    while(historyList.querySelectorAll(".history-entry").length>20){
        historyList.lastElementChild.remove();
    }
}

clearHistoryButton.addEventListener("click", () => {
    localStorage.removeItem("calcHistory");

    historyList.innerHTML = `
        <div class = "history-empty">
            <span class = "history-symbol"> ↻ </span>
            <h3> No calculations yet. </h3>
            <p> Your calculations will apear here as you work. </p>
        </div>
    `;
});

const savedHistory = JSON.parse(localStorage.getItem("calcHistory")) || [];

savedHistory.reverse().forEach(entry => {
    addHistory(entry.expression,entry.result,false);
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