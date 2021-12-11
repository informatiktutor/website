const path = require('path')
const { mergeWithRules } = require('webpack-merge')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const { variables, common } = require('./webpack.common.js')

const merge = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: 'prepend',
    },
  },
  plugins: 'prepend',
})

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  module: {
    rules: [
      {
        test: variables.module.rules.styles.test,
        use: ['style-loader'],
      },
    ],
  },
  plugins: [
    new BrowserSyncPlugin(
      {
        proxy: 'http://localhost:9000',
        host: 'localhost',
        port: 3000,
        notify: false,
        open: false,
      },
      {
        reload: true,
      }
    ),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'static')
    },
    compress: false,
    liveReload: false,
    port: 9000,
    hot: true,
  },
})
