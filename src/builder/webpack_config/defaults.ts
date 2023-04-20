import { destinationPath } from 'utils'

export const mainDefaults = (mode, env) => {
  return {
    mode,
    target: 'electron-main',
    entry: './src/main/index.js',
    output: {
      path: destinationPath('main', env),
      filename: 'index.js'
    },
    node: {
      __dirname: false,
      __filename: false
    },
    resolve: {
      modules: ['node_modules', './src/main', './resources']
    },
    plugins: []
  }
}

export const rendererDefaults = (mode, env) => {
  return {
    mode,
    target: 'electron-renderer',
    entry: './src/renderer/javascripts/index.tsx',
    output: {
      path: destinationPath('renderer', env),
      filename: 'index.tsx'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      modules: [
        'node_modules',
        './src/renderer/javascripts',
        './src/renderer/stylesheets',
        './src/renderer/images'
      ]
    },
    plugins: []
  }
}

export const preloadDefaults = (mode, env) => {
  return {
    mode,
    target: 'electron-preload',
    entry: './src/preload/index.js',
    output: {
      path: destinationPath('preload', env),
      filename: 'index.js'
    },
    node: {
      __dirname: false,
      __filename: false
    },
    plugins: []
  }
}
