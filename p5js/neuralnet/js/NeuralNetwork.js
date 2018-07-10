class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.weightsIH = new Matrix(hiddenNodes, inputNodes);
    this.weightsHO = new Matrix(outputNodes, hiddenNodes);
    this.weightsIH.randomize();
    this.weightsHO.randomize();
    this.biasH = new Matrix(this.hiddenNodes, 1);
    this.biasO = new Matrix(this.outputNodes, 1);
    this.biasH.randomize();
    this.biasO.randomize();
    this.learningRate = 0.05;
  }

  predict(inputArray) {
    let input = Matrix.fromArray(inputArray);
    let hidden = Matrix.multiply(this.weightsIH, input);
    hidden.add(this.biasH);
    hidden.map(sigmoid);
    let output = Matrix.multiply(this.weightsHO, hidden);
    output.add(this.biasO);
    output.map(sigmoid);
    return output.toArray();
  }

  train(inputArray, targetArray) {
    // Feed Forward
    let input = Matrix.fromArray(inputArray);
    let hidden = Matrix.multiply(this.weightsIH, input);
    hidden.add(this.biasH);
    hidden.map(sigmoid);
    let output = Matrix.multiply(this.weightsHO, hidden);
    output.add(this.biasO);
    output.map(sigmoid);

    // Back Propagation H->O
    // Calculate error
    let target = Matrix.fromArray(targetArray);
    let outputError = Matrix.subtract(target, output);
    //Calculate gradient
    let gradient = Matrix.map(output, dsigmoid);
    gradient.multiply(outputError);
    gradient.multiply(this.learningRate);

    // Calculate deltas
    let weightHODelta = Matrix.multiply(gradient, Matrix.transpose(hidden));
    // Adjust weights by the deltas
    this.weightsHO.add(weightHODelta);
    // Adjust the bias by its deltas, which is just the gradient
    this.biasO.add(gradient);

    // Back Propagation I->H
    //Calculate error
    let hiddenError = Matrix.multiply(Matrix.transpose(this.weightsHO), outputError);
    //Calculate gradient
    let hiddenGradient = Matrix.map(hidden, dsigmoid);
    hiddenGradient.multiply(hiddenError);
    hiddenGradient.multiply(this.learningRate);
    //Calculate deltas
    let weightIHDelta = Matrix.multiply(hiddenGradient, Matrix.transpose(input));
    // Adjust weights by the deltas
    this.weightsIH.add(weightIHDelta);
    // Adjust the bias by its deltas, which is just the gradient
    this.biasH.add(hiddenGradient);

    // console.log("Learning Rate: " + this.learningRate + " Output Error: " + outputError.data);
  }

}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
  return y * (1 - y);
}
