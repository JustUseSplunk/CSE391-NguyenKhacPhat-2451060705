function calculate(num1, operator, num2) {

    if (typeof num1 !== 'number' || isNaN(num1) || typeof num2 !== 'number' || isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':

            if (num2 === 0) {
                return "Lỗi: Không thể chia cho 0";
            }
            return num1 / num2;
        case '%':
            if (num2 === 0) {
                return "Lỗi: Không thể chia cho 0";
            }
            return num1 % num2;
        case '**':
            return num1 ** num2;
        default:

            return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}


console.log(calculate(10, "+", 5));    
console.log(calculate(10, "/", 0));    
console.log(calculate(10, "^", 5));    
console.log(calculate("abc", "+", 5)); 
console.log(calculate(2, "**", 10));   