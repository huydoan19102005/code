function Exercise6() {
    const companies = [
        { name: "Alpha", category: "Finance", start: 2001, end: 2010 },
        { name: "Beta", category: "Retail", start: 1999, end: 2005 },
        { name: "Gamma", category: "Tech", start: 2005, end: 2015 },
        { name: "Delta", category: "Health", start: 2003, end: 2008 },
        { name: "Epsilon", category: "Auto", start: 2000, end: 2012 }
    ];

    // Tạo bản sao đã sắp xếp theo end tăng dần
    const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);

    // Lấy 3 công ty đầu
    const top3 = sortedCompanies.slice(0, 3);

    return (
        <div>
            <h2>Exercise 6</h2>
            {top3.map((company, idx) => (
                <p key={idx}>{company.name} - {company.end}</p>
            ))}
        </div>
    );
}
export default Exercise6;