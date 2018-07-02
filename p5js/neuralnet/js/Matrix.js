class Matrix {

  let rows = 0;
  let cols = 0;
  let data = [];

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        data[i][j] = 0;
      }
    }
    console.table("Data: ", data);
  }
}
