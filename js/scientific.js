export function calculateScientific(action, expression, angleMode) {

    if (action === "pi") {
        return {
            reult: Number(Math.PI.toFixed(10)),
            expression: "π"
        };
    }

    if (action === "e") {
        return {
            result: Number(Math.E.toFixed(10)),
            expression: "e"
        };
    }

    const number = Number(expression);
    let result;
    let historyExpression;

    if(!Number.isFinite(number)) {
        return { result : "Error"};
    }

    if(action == "sqrt") {
        result = Math.sqrt(number);
        historyExpression = `√(${number})`;
    }

    else if(action == "sin") {
        const angle = angleMode == "DEG"
            ? number * Math.PI / 180
            : number;
        
        result = Math.sin(angle);
        historyExpression = `sin(${number} ${angleMode})`;
    }

    else if (action == "cos") {
        const angle = angleMode == "DEG"
            ? number*Math.PI/180
            : number;

        result = Math.cos(angle);
        historyExpression = `cos(${number} ${angleMode})`;
    }

    else if (action == "tan") {
        const angle = angleMode == "DEG"
            ? number * Math.PI/180
            : number;

        result =Math.tan(angle);
        historyExpression = `tan(${number} ${angleMode})`;
    }

    else if (action == "sin-inverse") {
        result = Math.asin(number);
        historyExpression = `sin⁻¹(${number})`;

        if(angleMode == "DEG") {
            result = result * 180 / Math.PI;
        }
    }

    else if (action == "cos-inverse") {
        result = Math.acos(number);
        historyExpression = `cos⁻¹(${number})`; 

        if(angleMode == "DEG") {
            result = result * 180 / Math.PI;
        }
    }

    else if (action == "tan-inverse") {
        result = Math.atan(number);
        historyExpression = `tan⁻¹(${number})`;

        if(angleMode == "DEG") {
            result = result * 180 / Math.PI;
        }
    }

    else if(action == "log") {
        if(number <= 0) {
            return { result: "Error" };
        }
        result = Math.log10(number);
        historyExpression = `log(${number})`;
    }

    else if(action == "ln") {
        if(number <= 0) {
            return { result: "Error" };
        }
        result = Math.log(number);
        historyExpression = `ln(${number})`;
    }

    else if (action === "log-base") {
        if(
            !Number.isFinite(base)|| base <= 0 || base === 1 || number <= 0
        ) {
            return { result: "Error" };
        }

        result = Math.log(number) / Math.log(base);
        historyExpression = `log(${number}) base ${base}`;
    }

    else if (action === "factorial") {
        if(number < 0 || !Number.isInteger(number)) 
        {
            return { result: "Error" };
        }

        result = 1;
        
        for(let i = 2; i <= number; i++) {
            result *= i;
        }

        historyExpression = `${number}!`;
    }

    else {
        return { result : "Error" };
    }

    if( !Number.isFinite(result)) {
        return { result: "Error" };
    }

    result = Number(result.toFixed(10));

    return {
        result: result,
        expression: historyExpression
    };
}