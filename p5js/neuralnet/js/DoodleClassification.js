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

function preload() {
  catsUnformatted = loadBytes('data/cats1000.bin');
  trainsUnformatted = loadBytes('data/trains1000.bin');
  rainbowsUnformatted = loadBytes('data/rainbows1000.bin');
}

function setup() {
  createCanvas(280, 280);
  background (255);

  prepareData(catsUnformatted, cats, CAT);
  prepareData(trainsUnformatted, trains, TRAIN);
  prepareData(rainbowsUnformatted, rainbows, RAINBOW);

  nn = new NeuralNetwork(784, 64, 3);

  let training = [];
  training = training.concat(cats.training);
  training = training.concat(trains.training);
  training = training.concat(rainbows.training);

  let testing = [];
  testing = testing.concat(cats.testing);
  testing = testing.concat(trains.testing);
  testing = testing.concat(rainbows.testing);

  let trainButton = select('#train');
  let epochCounter = 0;
  trainButton.mousePressed(function() {
    trainEpoch(training);
    epochCounter++;
    console.log("Epoch: " + epochCounter);
  });

  let testButton = select('#test');
  testButton.mousePressed(function() {
    let percent = testAll(testing);
    console.log("Percent: " + nf(percent, 2, 2) + "%");
  });

  let guessButton = select('#guess');
  guessButton.mousePressed(function() {
    let inputs = [];
    let img = get();
    img.resize(28, 28);
    img.loadPixels();
    for (let i = 0; i < len; i++) {
      let bright = img.pixels[i * 4];
      inputs[i] = (255 - bright) / 255.0;
    }
  });

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
  shuffle(training, true);
  for (let i = 0; i < training.length; i++) {
    let data = training[i];
    let inputs = Array.from(data).map(x => x / 255);
    let label = training[i].label;
    let targets = [0, 0, 0];
    targets[label] = 1;
    nn.train(inputs, targets);
  }
}

function testAll(testing) {
  let correct = 0;
  // Train for one epoch
  for (let i = 0; i < testing.length; i++) {
    let data = testing[i];
    let inputs = Array.from(data).map(x => x / 255);
    let label = testing[i].label;
    let guess = nn.feedforward(inputs);

    let m = max(guess);
    let classification = guess.indexOf(m);
    if (classification === label) {
      correct++;
    }
  }
  let percent = 100 * correct / testing.length;
  return percent;
}
