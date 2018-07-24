class NeuralNetworkTF {

    constructor(inputs, hidden, outputs, lr) {

        this.tf = require('@tensorflow/tfjs');
        require('@tensorflow/tfjs-node'); // Load the binding

        this.model = this.tf.sequential();
        this.tf.tensor([[[1, 2], [3, 4]]]).print();
    }

}
module.exports = NeuralNetworkTF;