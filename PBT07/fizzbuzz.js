console.log("--- CLASSIC FIZZBUZZ ---");
function classicFizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        let output = ""; 
        if (i % 3 === 0) output += "Fizz";
        if (i % 5 === 0) output += "Buzz";
        console.log(output || i);
    }
}
console.log("\n--- CUSTOM FIZZBUZZ ---");

function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = "";
        for (let j = 0; j < rules.length; j++) {
            let currentRule = rules[j];
            if (i % currentRule.divisor === 0) {
                output += currentRule.word;
            }
        }
        console.log(`${i} = ${output || i}`);
    }
}
const myRules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];
customFizzBuzz(35, myRules);