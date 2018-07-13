const express = require('express')
const app = express()
const xor = require('./xor.js')

app.use(express.static('public'));
app.get('/xor', function(req, res) {
  xor();
  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('Server listening on port 3000!');
});
