const path = require('path')
const glob = require('glob')
const { mergeWithRules } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

const { variables, common } = require('./webpack.common.js')

const merge = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: 'prepend',
    },
  },
  plugins: 'append',
})

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: variables.module.rules.styles.test,
        use: [MiniCssExtractPlugin.loader],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.[contenthash].css',
      chunkFilename: '[id].chunk.[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [path.join(__dirname, 'src', 'static')],
    }),
    // FIXME PurgeCSS removes svg icon classes for whatever reason
    // new PurgecssPlugin({
    //   paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, {
    //     nodir: true,
    //   }),
    // }),
  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        // styles: {
        //   name: 'styles',
        //   test: /\.(sc|c)ss$/,
        //   chunks: 'all',
        // },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  output: {
    publicPath: '/',
  },
  devServer: {
    compress: true,
    liveReload: true,
    port: 3000,
  },
})
