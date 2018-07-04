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

  train(targets) {
    // Feed Forward
    let inputs = Matrix.fromArray(inputArray);
    let hidden = Matrix.multiply(this.weightsIH, inputs);
    hidden.add(this.biasH);
    hidden.map(sigmoid);
    let outputs = Matrix.multiply(this.weightsHO, hidden);
    outputs.add(this.biasO);
    outputs.map(sigmoid);
    return outputs;

    // Back Propagation
    let outputErrors = Matrix.subtract(targets, outputs);
    let gradients = Matrix.map(outputs, dsigmoid);
    gradients.multiply(outputErrors);
    gradients.multiply(learningRate);
    // Calculate Deltas
    let hiddenT = Matrix.transpose(hidden);
    let weightHODeltas = Matrix.multiply(gradients, hiddenT);
    // Adjust weights by the Deltas
    this.weightsHO.add(weightHODeltas);
    // Adjust the bias by its deltas -> gradients
    this.biasO.add(gradients);

    //Calculate hidden layer errors
    let weightsHOT = Matrix.transpose(this.weightsHO);
    let hiddenErrors = Matrix.multiply(weightsHOT, outputErrors);
    //Calculate hidden gradient
    let hiddenGradient = Matrix.map(hidden, dsigmoid);
    hiddenGradient.multiply(hiddenErrors);
    hiddenGradient.multiply(this.learningRate);

    //Calculate I->H Deltas
    let inputsT = Matrix.transpose(inputs);
    let weightIHDeltas = Matrix.multiply(hiddenGradient, inputsT);

    this.weightsIH.add(weightIHDeltas);
    //Adjust the bias by its deltas -> gradients
    this.biasH.add(hiddenGradient);
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  dsigmoid(y) {
    return y * (1 - y);
  }
}
