function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((acc, fn) => fn(acc), initialValue);
    };
}

const process = pipe(
    x => x * 2,       
    x => x + 10,       
    x => x.toString(), 
    x => "Kết quả: " + x
);
console.log("=== TEST PIPE ===");
console.log(process(5)); 
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);   
        if (cache[key] !== undefined) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

console.log("\n=== TEST MEMOIZE ===");
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000)); 
console.log(expensiveCalc(1000000)); 
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

console.log("\n=== TEST DEBOUNCE ===");
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);
search("a");
search("ap");
search("app");
search("appl");
search("apple"); 
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn(); 
        } catch (error) {
            console.log(`Lần thử ${attempt} thất bại...`);
            if (attempt === maxAttempts) {
                throw new Error(`Đã thử ${maxAttempts} lần nhưng vẫn lỗi: ${error.message}`);
            }
        }
    }
}

console.log("\n=== TEST RETRY ===");
let callCount = 0;
const unstableAPI = async () => {
    callCount++;
    if (callCount < 3) {
        throw new Error("Mạng chập chờn");
    }
    return "Lấy dữ liệu thành công!";
};

(async () => {
    try {
        const result = await retry(unstableAPI, 3);
        console.log("Kết quả API:", result);
    } catch (err) {
        console.error(err.message);
    }
})();