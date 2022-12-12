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
    prices: './src/scripts/prices.js',
    contact: './src/scripts/contact.js',
    privacy: './src/scripts/privacy.js',
    imprint: './src/scripts/imprint.js',
    rating: './src/scripts/rating.js'
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
              modules: false,
              url: {
                filter: (url) => {
                  if (url.includes('.png')) return false
                  if (url.includes('.jpg')) return false
                  return true
                },
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          esModule: false,
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          inlineRequires: '/static/',
          partialDirs: [
            path.join(__dirname, 'src', 'partials'),
            path.join(__dirname, 'src', 'views'),
          ],
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
      filename: 'preise.html',
      template: 'src/views/preise.hbs',
      templateParameters: require('./src/data/prices'),
      chunks: ['prices'],
    }),
    new HtmlWebpackPlugin({
      filename: 'kontakt.html',
      template: 'src/views/kontakt.hbs',
      templateParameters: require('./src/data/contact'),
      chunks: ['contact'],
    }),
    new HtmlWebpackPlugin({
      filename: 'impressum.html',
      template: 'src/views/impressum.hbs',
      templateParameters: require('./src/data/impressum'),
      chunks: ['imprint'],
    }),
    new HtmlWebpackPlugin({
      filename: 'datenschutz.html',
      template: 'src/views/datenschutz.hbs',
      templateParameters: require('./src/data/datenschutz'),
      chunks: ['privacy'],
    }),
    new HtmlWebpackPlugin({
      filename: 'bewerten.html',
      template: 'src/views/bewerten.hbs',
      templateParameters: require('./src/data/rating'),
      chunks: ['rating'],
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
