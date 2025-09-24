export function Exercise2() {

    //1. Tạo 1 mảng số nguyên in ra danh sách list
    const numbers = [1, 12, -10, 5, -15, 20, 3, 7, 8, -4];
    //2. Tính tổng các phần tử trong mảng
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    //3. Tính giá trị trung bình các phần từ trong mảng
    const average = sum / numbers.length;
    //4. Khai báo mảng chuỗi name, in ra danh sách các tên, theo thứ tự tâng dần theo Alphabet
    const names = ["Bảo", "Anh", "Đan", "Nam", "Hà", "Hùng", "Lan", "Minh", "Nam", "Phương"];
    names.sort();
    //5. Khai báo 1 mảng people chứa 10 đối tượng Students
    // Mỗi đối tượng student có các thuộc tính: id, name, age, grade
    //(id là số nguyên, namde là chuỗi, age là số nguyên, grade là số thực)
    const Students = [
        { id: 1, name: "Bảo", age: 20, grade: 10.0 },
        { id: 2, name: "Anh", age: 22, grade: 7.0 },
        { id: 3, name: "Đan", age: 21, grade: 9.0 },
        { id: 4, name: "Nam", age: 23, grade: 6.5 },
        { id: 5, name: "Hà", age: 20, grade: 8.0 },
        { id: 6, name: "Hùng", age: 22, grade: 7.5 },
        { id: 7, name: "Lan", age: 21, grade: 9.5 },
        { id: 8, name: "Minh", age: 23, grade: 6.0 },
        { id: 9, name: "Nam", age: 20, grade: 8.8 },
        { id: 10, name: "Phương", age: 22, grade: 7.8 },
    ];
    //In ra dánh sách Students có grade >= 7.5, sắp xếp theo grade giảm dần
    const topStudents = Students.filter(student => student.grade >= 7.5);
    topStudents.sort((a, b) => b.grade - a.grade);
    //Hiển thị danh sách topStudents dưới dảng bảng
    //Tính tổng trung bình grade của topStudents và hiển thị ở cuối bảng và chỉnh css
    const totalTopGrade = topStudents.reduce((acc, curr) => acc + curr.grade, 0);
    const averageTopGrade = totalTopGrade / topStudents.length;

    return (
        <div>
            <h2>Exercise 2</h2>
            <p>In mảng số nguyên</p>
            <ul>
                {numbers.map((number, i) => (
                    <li key={i}>Phần tử thứ {i} - {number}</li>
                ))}
            </ul>
            <p>Tổng các phần tử trong mảng: {sum}</p>
            <p>Giá trị trung bình các phần từ trong mảng: {average.toFixed(2)}</p>
            <p>In mảng tên đã sắp xếp theo thứ tự tăng dần Alphabet</p>
            <ul>
                {names.map((name, i) => (
                    <li key={i}> {name}</li>
                ))}
            </ul>
            <p>Hiển thị danh sách topStudents dưới dạng bảng</p>
            <table border="1" cellPadding="5" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>


                    {topStudents.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.grade}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3"><strong>Average Grade</strong></td>
                        <td><strong>{averageTopGrade.toFixed(2)}</strong></td>
                    </tr>
                </tfoot>
            </table>


        </div>
    );
}
export default Exercise2;