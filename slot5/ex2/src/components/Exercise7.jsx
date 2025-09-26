function Exercise7() {
    const companies = [
        { name: "Alpha", category: "Finance", start: 2001, end: 2010 },
        { name: "Beta", category: "Retail", start: 1999, end: 2005 },
        { name: "Gamma", category: "Tech", start: 2005, end: 2015 },
        { name: "Delta", category: "Health", start: 2003, end: 2008 },
        { name: "Epsilon", category: "Auto", start: 2000, end: 2012 }
    ];

    // Tạo company0New với start += 1, không làm đổi companies[0]
    const company0New = { ...companies[0], start: companies[0].start + 1 };

    // Hàm gộp mảng dùng rest và spread
    function concatAll(...arrays) {
        return [].concat(...arrays);
        // Hoặc: return arrays.flat();
    }

    const concatResult = concatAll([1,2],[3],[4,5]);

    return (
        <div>
            <h2>Exercise 7</h2>
            <p>companies[0]: {JSON.stringify(companies[0])}</p>
            <p>company0New: {JSON.stringify(company0New)}</p>
            <p>concatAll([1,2],[3],[4,5]): {JSON.stringify(concatResult)}</p>
        </div>
    );
}
export default Exercise7;