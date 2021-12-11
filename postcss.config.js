module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        browsers: [
          'cover 100% in DE',
          'not dead',
        ]
      },
    ],
    [
      'autoprefixer',
      {},
    ]
  ],
};
