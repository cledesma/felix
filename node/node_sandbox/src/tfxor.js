tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node'); // Load the binding

module.exports = function () {

    const model = tf.sequential();
    model.add(tf.layers.dense({
        inputShape: 2,
        units: 4,
        activation: 'sigmoid'
    }));
    model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    }));
    const learningRate = 0.1;
    model.compile({ 
        optimizer: tf.train.sgd(learningRate),
        loss: tf.losses.meanSquaredError
    });

    // train

    const xs = tf.tensor2d([
        [1,1],
        [0,0],
        [0,1],
        [1,0]
    ]);

    const ys = tf.tensor2d([
        [0],
        [0],
        [1],
        [1]
    ]);

    async function train() {
        for (let i = 0; i < 50000; i++) {
            const response = await model.fit(xs, ys);
            console.log("Iteration: " + i + " Error: " + response.history.loss[0]);
        }
    }

    train().then(() => {
        const inputs = tf.tensor2d([
            [1,1],
            [0,0],
            [0,1],
            [1,0]
        ]);
        let outputs = model.predict(inputs);
        outputs.print();
    });

};
