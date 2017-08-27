const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROJECT_ROOT = path.join(__dirname);
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'dist');

export default () => {
  return {
    entry: {
      main: ['./src/main.js'],
    },
    output: {
      path: OUTPUT_PATH,
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.jsx', '.js', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
      }),

      new HtmlWebpackPlugin({
        chunks: ['main'],
        filename: 'index.html',
        title: 'Vivid 2018 Audio',
        template: './src/index.html',
      }),
    ],
    devServer: {
      compress: true,
      port: 9000,
      hot: true,
      inline: true,
    },
  };
};
