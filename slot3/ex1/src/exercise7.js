
//exercise7
const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

// Bài 7: Spread vs Rest
const company0New = { ...companies[0], start: companies[0].start + 1 };
console.log("Original:", companies[0]);
console.log("New:", company0New);

const concatAll = (...arrays) => arrays.flat();
console.log(concatAll([1,2], [3], [4,5])); // [1,2,3,4,5]
// Bất biến với spread
const company0New = { ...companies[0], start: companies[0].start + 1 };
console.log("Original:", companies[0]);
console.log("New:", company0New);

// Gộp mảng với rest + spread
const concatAll = (...arrays) => arrays.flat();
console.log(concatAll([1,2], [3], [4,5])); // [1,2,3,4,5]

