class NeuralNetworkTF {
    constructor(inputs, hidden, outputs, lr) {
        let tf = require('@tensorflow/tfjs-node');
        this.model = tf.sequential();
    }

}

module.exports = NeuralNetworkTF;