module.exports = function () {
    let tf = require('@tensorflow/tfjs');
    // Load the binding
    require('@tensorflow/tfjs-node');
    this.model = tf.sequential();
    tf.tensor([[[1, 2], [3, 4]]]).print();
};