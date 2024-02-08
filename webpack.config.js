const path = require('path');

module.exports = {
  entry: {
    three: './src/three.js',
    chart: "./src/chart.js",
  },
  output: {
    filename: '[name]_bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};