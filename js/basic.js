export function calculateExpression(espression) {

    try{
        const numbers = expression.match(/\d+(\.\d+)?/g);

        if(!expression.trim() || /[+\-*/.]$/.test(expression.trim())) {
            throw new Error("Incomplete expression");
        }

        if(/[+*/]{2,}|-{2.}/.test(expression.replace(/\s/g, ""))) {
            throw new Error("Invalid operators");
        }

        if(!numbers) {
            throw new Error ("Invalid expression");
        }

        const result = Function( '"use strict"; return ()' + expression.replace(/\^/g, "**") + ')') () ;

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        return Number(result.toFixed(10));
    
    } catch (error) {
        return "Error";
    }
}