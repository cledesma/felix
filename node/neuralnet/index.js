const express = require('express')
const app = express()
const lodash = require('lodash')
const xor = require('./xor.js')
const doodleClassification = require('./doodle-classification.js')

app.use(express.static('public'));
app.get('/xor', function(req, res) {
  xor();
  res.send('XOR');
});

app.get('/dc', function(req, res) {
  doodleClassification();
  res.send('Doodle Classification');
});

app.listen(3000, function() {
  console.log('Server listening on port 3000!');
});
