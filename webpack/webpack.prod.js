const { merge } = require('webpack-merge');
const path = require('path');
const common = require(path.resolve(__dirname, 'webpack.common.js'));

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
});