const historyList = document.getElementById("history-list");
const expressionDisplay = document.getElementById("expression-display");
const resultDisplay = document.getElementById("result-display");

export function addHistory(expression, result, save = true) {
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

export function initialiseHistory() {

    const clearHistoryButton = document.getElementById("clear-history");

    
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

}

