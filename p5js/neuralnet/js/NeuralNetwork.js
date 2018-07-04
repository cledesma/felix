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
    this.learningRate = 0.1;
  }

  train(given, target) {

    // Feed Forward
    let input = Matrix.fromArray(given);
    let hidden = Matrix.multiply(this.weightsIH, input);
    hidden.add(this.biasH);
    hidden.map(sigmoid);
    let output = Matrix.multiply(this.weightsHO, hidden);
    output.add(this.biasO);
    output.map(sigmoid);
    return output;

    // Back Propagation H->O
    // Calculate error
    let outputError = Matrix.subtract(target, output);
    //Calculate gradient
    let gradient = Matrix.map(output, dsigmoid);
    gradient.multiply(outputError);
    gradient.multiply(learningRate);
    // Calculate deltas
    let weightHODelta = Matrix.multiply(gradient, Matrix.transpose(hidden));
    // Adjust weights by the deltas
    this.weightsHO.add(weightHODelta);
    // Adjust the bias by its deltas, which is just the gradient
    this.biasO.add(gradient);

    // I->H
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
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  dsigmoid(y) {
    return y * (1 - y);
  }
}
