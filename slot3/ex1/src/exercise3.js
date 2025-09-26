
const person = {
    name: "Costas",
    address: {
    street: "Lalaland 12"
    }
};

//exercise3
const { address: { street, city = "Unknown City" } } = person;

console.log("Street:", street); // Lalaland 12
console.log("City:", city);     // Unknown City
