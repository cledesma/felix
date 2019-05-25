const express = require('express')
const app = express()
const lodash = require('lodash')

app.use(express.static('public'));

app.listen(5000, function() {
  console.log('Server listening on port 5000!');
});
