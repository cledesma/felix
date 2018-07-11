const express = require('express')
const app = express()
const xor = require('./xor.js')

app.get('/', function(req, res) {
  xor();
  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('Server listening on port 3000!');
});
