var path = require('path');

module.exports = {
  entry: './render_measurements.js',
  output: {
    filename: '_bundle.js',
    path: path.resolve(__dirname)    
  }
};