const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const variables = {
  module: {
    rules: {
      styles: {
        test: /\.(sa|sc|c)ss$/,
      },
    },
  },
}

const common = {
  entry: {
    index: './src/scripts/index.js',
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: variables.module.rules.styles.test,
        use: [
          // style-loader or mini-css-extract-loader
          // prepended by either prod or dev config.
          {
            loader: 'css-loader',
            options: {
              // https://webpack.js.org/loaders/css-loader/#importloaders
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        loader: 'file-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          inlineRequires: '/static/',
          partialDirs: [path.join(__dirname, 'src', 'partials')],
          helperDirs: [path.join(__dirname, 'src', 'helpers')],
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/views/index.hbs',
      templateParameters: require('./src/data/index'),
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'kontakt.html',
      template: 'src/views/kontakt.hbs',
      chunks: [],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
    filename: '[name].bundle.[contenthash].js',
    chunkFilename: '[id].chunk.[chunkhash].js',
    sourceMapFilename: '[file].map',
  },
}

module.exports = {
  variables,
  common,
}
