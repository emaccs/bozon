const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src', 'index.ts'),
    dev: path.resolve(__dirname, 'src', 'dev', 'index.ts')
  },
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ]
            }
          },
          'ts-loader'
        ]
      }
    ]
  }
}
