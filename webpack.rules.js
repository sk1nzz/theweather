module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|.webpack)/,
    loaders: [{
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }]
  },
  {
    test: /\.(png|svg|jpe?g|gif|webm)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[hash]-[name].[ext]',
          outputPath: 'static',
          publicPath: '../static',
        },
      },
    ],
  },
];
