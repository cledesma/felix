
let trainingData = [
  {input: [0,0], target: [0]},
  {input: [0,1], target: [1]},
  {input: [1,1], target: [0]},
  {input: [1,0], target: [1]}
]

function setup() {
  createCanvas(400, 400);
  nn = new NeuralNetwork(2, 2, 1);
  nn.learningRate = 0.05
  for (let i = 0; i < 100000; i++) {
    let data = random(trainingData);
    console.log("Count: " + i);
    nn.train(data.input, data.target);
  }
  console.log("0,1 (1) -> " + nn.predict([0,1]));
  console.log("1,0 (1) -> " + nn.predict([1,0]));
  console.log("1,1 (0) -> " + nn.predict([1,1]));
  console.log("0,0 (0) -> " + nn.predict([0,0]));
}

function draw(){
  background(51);
}

// testMatrix = new Matrix(3,3);
// testMatrix.randomize();
// testMatrix.print();
// testMatrix = Matrix.transpose(testMatrix);
// testMatrix.print();
// console.table(testMatrix.toArray());
// testMatrix = Matrix.fromArray([34,23,45,54,67]);
// testMatrix.print();
// testMatrix = Matrix.map(testMatrix, Matrix.testFunc1);
// testMatrix.print();
// testMatrix.map(Matrix.testFunc1);
// testMatrix.print();
// testMatrix = Matrix.subtract(testMatrix, testMatrix);
// testMatrix.print();
// testMatrix.add(1);
// testMatrix.print();
// testMatrix.add(testMatrix);
// testMatrix.print();
// testMatrix.multiply(6);
// testMatrix.print();
// testMatrix.multiply(testMatrix);
// testMatrix.print();
// testMatrix = Matrix.fromArray([[2,5],[6,7],[1,8]]);
// testMatrix.print();
// testMatrix = Matrix.transpose(testMatrix);
// testMatrix.print();
// testMatrixA = Matrix.fromArray([[1,2,1],[0,1,0],[2,3,4]]);
// testMatrixB = Matrix.fromArray([[2,5],[6,7],[1,8]]);
// testMatrixA.print();
// testMatrixB.print();
// testMatrix = Matrix.multiply(testMatrixA, testMatrixB);
// testMatrix.print();
