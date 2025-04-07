const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
  entry: {
    index: './src/index.js',
    reviews: './src/firebase-reviews.js', // Example: add entry for reviews page
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', // Will generate index.bundle.js, reviews.bundle.js, etc.
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Template for index.html
      filename: 'index.html', // Output file name in dist/
      chunks: ['index'], // Include only index.bundle.js
    }),
    new HtmlWebpackPlugin({
      template: './src/reviews.html', // Template for reviews.html
      filename: 'reviews.html', // Output file name in dist/
      chunks: ['reviews'], // Include only reviews.bundle.js
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000,
  },
};
