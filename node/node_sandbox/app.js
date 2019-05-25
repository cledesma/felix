const express = require('express')
const app = express()
const lodash = require('lodash')
const xor = require('./src/xor.js')
const tfxor = require('./src/tfxor.js')
const doodleClassification = require('./src/doodle-classification.js')

app.use(express.static('public'));
app.get('/xor', function(req, res) {
  xor();
  res.send('XOR');
});

app.get('/tfxor', function(req, res) {
  tfxor();
  res.send('Tensorflow XOR');
});

app.get('/dc', function(req, res) {
  doodleClassification();
  res.send('Doodle Classification');
});

app.listen(5000, function() {
  console.log('Server listening on port 5000!');
});
