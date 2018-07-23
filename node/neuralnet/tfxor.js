

module.exports = function() {
    // NeuralNetworkTF = require('./ib/NeuralNetworkTF.js');
    const tf = require('@tensorflow/tfjs');
    tf.tensor([1,2,3,4]).print();
};