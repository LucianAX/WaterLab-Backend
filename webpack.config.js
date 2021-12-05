var path = require('path');

module.exports = {
  entry: './server.js',
  output: {
    filename: '_bundle.js',
    path: path.resolve(__dirname)    
  }
};