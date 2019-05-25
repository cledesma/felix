const lodash = require('lodash')

module.exports = function() {
  let trainingData = [
    {input: [0,0], target: [0]},
    {input: [0,1], target: [1]},
    {input: [1,0], target: [1]},
    {input: [1,1], target: [0]}
  ]

  NeuralNetwork = require('./lib/NeuralNetwork.js');
  nn = new NeuralNetwork(2, 2, 1);
  nn.learningRate = 0.01
  for (let i = 0; i < 10000000; i++) {
    // Randomize
    let data = lodash.sample(trainingData);
    console.log("Count: " + i);
    nn.train(data.input, data.target);
  }
  console.log("0,1 (1) -> " + nn.predict([0,1]));
  console.log("1,0 (1) -> " + nn.predict([1,0]));
  console.log("1,1 (0) -> " + nn.predict([1,1]));
  console.log("0,0 (0) -> " + nn.predict([0,0]));

};
