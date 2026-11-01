export function calculateScientific(action, expression, angleMode) {

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
            ? number*Math>PI/180
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

    else {
        return { result : "Error" };
    }

    if( !Number.isFinite(result)) {
        return { result: "Error" };
    }

    result = Number(result.isFinite(10));

    return {
        result: result,
        expression: historyExpression
    };
}