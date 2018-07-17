module.exports = function() {

  const len = 784;
  const totalData = 1000;

  const CAT = 0;
  const RAINBOW = 1;
  const TRAIN = 2

  let catsUnformatted;
  let trainsUnformatted;
  let rainbowsUnformatted;

  let cats = {};
  let trains = {};
  let rainbows = {};

  let nn;

  catsUnformatted = loadBytes('data/cats1000.bin');
  trainsUnformatted = loadBytes('data/trains1000.bin');
  rainbowsUnformatted = loadBytes('data/rainbows1000.bin');
  prepareData(catsUnformatted, cats, CAT);
  prepareData(trainsUnformatted, trains, TRAIN);
  prepareData(rainbowsUnformatted, rainbows, RAINBOW);

  NeuralNetwork = require('./lib/NeuralNetwork.js');
  nn = new NeuralNetwork(784, 64, 3);

  let training = [];
  training = training.concat(cats.training);
  training = training.concat(trains.training);
  training = training.concat(rainbows.training);

  let testing = [];
  testing = testing.concat(cats.testing);
  testing = testing.concat(trains.testing);
  testing = testing.concat(rainbows.testing);
}

function train() {
  trainEpoch(training);
  epochCounter++;
  console.log("Epoch: " + epochCounter);
}

function test() {
  let percent = testAll(testing);
  console.log("Percent: " + nf(percent, 2, 2) + "%");
}

function guess() {
  let inputs = [];
  let img = get();
  img.resize(28, 28);
  img.loadPixels();
  for (let i = 0; i < len; i++) {
    let bright = img.pixels[i * 4];
    inputs[i] = (255 - bright) / 255.0;
  }
  let guess = nn.predict(inputs);
  let m = max(guess);
  let classification = guess.indexOf(m);
  if (classification === CAT) {
    console.log("cat");
  } else if (classification === TRAIN) {
    console.log("train");
  } else if (classification === RAINBOW) {
    console.log("rainbow");
  }

}

function prepareData(unformattedData, formattedData, label) {
  formattedData.training = [];
  formattedData.testing = [];
  for (let i = 0; i < totalData; i++) {
    let offset = i * len;
    let threshold = floor (0.8 * totalData);
    if (i < threshold) {
      formattedData.training[i] = unformattedData.bytes.subarray(offset, offset + len);
      formattedData.training[i].label = label;
    } else {
      formattedData.testing[i - threshold] = unformattedData.bytes.subarray(offset, offset + len);
      formattedData.testing[i - threshold].label = label;
    }
  }
}

function trainEpoch(training) {
  let data = lodash.sample(training);
  training = lodash.shuffle(training);
  // train n epochs
  n = 10
  for (let j = 0; j < n; j++) {
    // Train for one epoch
    for (let i = 0; i < training.length; i++) {
      let data = training[i];
      let input = Array.from(data).map(x => x / 255);
      let label = training[i].label;
      let target = [0, 0, 0];
      target[label] = 1;
      console.log("Epoch: " + j + " Count: " + i + "/" + training.length);
      nn.train(input, target);
    }
  }
}

function testAll(testing) {
  let correct = 0;
  // Train for one epoch
  for (let i = 0; i < testing.length; i++) {
    let data = testing[i];
    let input = Array.from(data).map(x => x / 255);
    let label = testing[i].label;
    let guess = nn.predict(input);

    let m = max(guess);
    let classification = guess.indexOf(m);
    console.log(guess);
    console.log("Classification: " + classification + " label: " + label);
    if (classification == label) {
      correct++;
    }
  }
  console.log(testing.length);
  console.log(correct);
  let percent = 100 * correct / testing.length;
  return percent;
}
