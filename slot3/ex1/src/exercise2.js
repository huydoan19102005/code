
//exercise2
const sum = (...nums) => 
    nums.filter(n => typeof n === "number" && !isNaN(n))
    .reduce((acc, cur) => acc + cur, 0);

const avg = (...nums) => {
    const valid = nums.filter(n => typeof n === "number" && !isNaN(n));
    if (valid.length === 0) return 0;
    return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2);
};

console.log(sum(1,2,3));        // 6
console.log(sum(1,'x',4));      // 5
console.log(avg(1,2,3,4));      // 2.50
console.log(avg());             // 0
