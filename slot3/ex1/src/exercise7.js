
// 7) Spread vs. rest – bất biến & gộp mảng
// Tạo bản sao company0New với start += 1 mà KHÔNG làm đổi companies[0]
const company0New = { ...companies[0], start: companies[0].start + 1 };
console.log("companies[0]:", companies[0]);
console.log("company0New :", company0New);

// Hàm concatAll(...arrays) gộp mọi mảng truyền vào
const concatAll = (...arrays) => arrays.reduce((acc, arr) => acc.concat(arr), []);
console.log("concatAll([1,2],[3],[4,5]) =", concatAll([1, 2], [3], [4, 5]));



