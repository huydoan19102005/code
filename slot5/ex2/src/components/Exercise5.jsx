function Exercise5() {
    const people = [
        { name: "Ann", age: 19 },
        { name: "Bob", age: 12 },
        { name: "Jane", age: 15 },
        { name: "Tom", age: 22 },
        { name: "Sue", age: 17 }
    ];

    // Lọc tuổi teen và map sang chuỗi "Tên (tuổi)"
    const teens = people
        .filter(person => person.age >= 13 && person.age <= 19)
        .map(person => `${person.name} (${person.age})`);


    // lấy người số 2
    const secondPerson = people[1];

    // kiểm tra người 2 có phải tuổi teen ko 
    const isSecondTeen = secondPerson.age >= 13 && secondPerson.age <= 19;

    return (
        <div>
            <h2>Exercise 5</h2>
            <p>Người số 2: {secondPerson.name} ({secondPerson.age})</p>
            <p>
                {isSecondTeen ? 'Người số 2 là tuổi teen.' : 'Người số 2 không phải tuổi teen.'}
            </p>
            {teens.map((str, idx) => (
                <p key={idx}>{str}</p>
            ))}
        </div>
    );
}
export default Exercise5;