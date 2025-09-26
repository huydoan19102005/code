function Exercise4() {
    const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 64, 32];
    const [first, , third = 0, ...restAges] = ages;
    return(
        <div>
            <h2> Exercise 4</h2>
            <p>First: {first}</p>
            <p>Third: {third}</p>
            <p>RestAges: {JSON.stringify(restAges)}</p>
        </div>
    );         
}
export default Exercise4;