




const listInt = [1,2,3,4,5];
const listSquare = listInt.map(x=>x);
consolt.log(listSquare);

listInt.filter(x=>x%2 ===0).forEach(x=>console.log(x));
const sum = listInt.reduce((acc,x) => acc+x,0);
console.log(sum);