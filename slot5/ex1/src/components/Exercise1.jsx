function Exercise1() {
  //tinh ham double
  const hamDouble = (x) => x * 2;
  //goi kiem tra ham double
  const isEven = (n) => n % 2 === 0;
  return (
    <div>
      <h2>Exercise 1</h2>
      <p>Kết quả hamDouble(5): {hamDouble(5)}</p>
      <p>Kết quả isEven(4): {isEven(4).toString() ? "Số chẳn" : "Số lẻ"}</p>
    </div>
  );
}
export default Exercise1;