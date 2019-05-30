const tfModel = tf.sequential();
const learningRate = 0.5;
const inputShape = 2;
const hiddenShape = 4;
const outputShape = 1;
const activation = 'sigmoid'
const optimizer = tf.train.sgd(learningRate)
const loss = tf.losses.meanSquaredError
const epoch = 1000

const xs = tf.tensor2d([
    [1,1],
    [0,0],
    [0,1],
    [1,0],
]);
const ys = tf.tensor2d([
    [0],
    [0],
    [1],
    [1]
]);

async function train(){
    for (let i = 0; i < epoch; i++) {
        const response = await tfModel.fit(xs,ys);
        console.log("i: " + i + " e: " + response.history.loss[0]);
    }
}

tfModel.add(tf.layers.dense({
    inputShape: inputShape,
    units: hiddenShape,
    activation: activation
}));
tfModel.add(tf.layers.dense({
    units: outputShape,
    activation: activation
}));
tfModel.compile({
    optimizer: optimizer,
    loss: loss
});
train().then(function(){
    const input = tf.tensor2d([
        [1,1],
        [0,0],
        [1,0],
        [0,1]
    ]);
    let output = tfModel.predict(input)
    output.print();
});

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
}