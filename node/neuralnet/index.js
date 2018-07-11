const express = require('express')
const app = express()
const nnDemo = require('./xor.js')

app.get('/', function(req, res) {
  nnDemo();
  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('Server listening on port 3000!');
});
