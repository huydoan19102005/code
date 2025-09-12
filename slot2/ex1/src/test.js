//1
const result = (a, b) => a + b;
console.log(result(3, 4));


//2
let greet = ( name, timeOfDay) => {
    console.log (`Good ${timeOfDay}, ${name}! `);

};
greet('Alice', 'morning')
greet('Bob', 'evening')

//3
let square = num => {
    return num *num;
};
console.log(square(5));
console.log(square(8));

//4
let sayHello = () => {
    console.log("Hello there");
};
sayHello();

//5
let person = {
    name: "John",
    age: 30,
    greet: function(){
        console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
    }
};