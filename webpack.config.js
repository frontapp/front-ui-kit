const path = require('path');

const isProduction = process.argv.indexOf('--mode=production') !== -1;

module.exports = {
  entry: './src/index.ts',
  devtool: !isProduction ? 'inline-source-map' : undefined,
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    "styled-components": {
      commonjs: "styled-components",
      commonjs2: "styled-components",
      amd: "styled-components"
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: true,
            presets: [['@babel/preset-env', {modules: false}], '@babel/preset-typescript', ["@babel/preset-react", {runtime: "automatic"}]],
            plugins: [
              "add-react-displayname",
              [
                'babel-plugin-styled-components',
                {
                // Disable the dev-friendly classNames on styled-components
                  displayName: false,
                  // Minify the CSS
                  minify: true,
                  // Helps with dead code elimination
                  // https://www.styled-components.com/docs/tooling#dead-code-elimination
                  pure: true
                }
              ]
            ]
          }
        },
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.svg$/i,
        issuer: /\.tsx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              jsx: true,
              svgo: true,
              svgoConfig: {
                // We want to keep the view box for the components.
                plugins: [{
                  name: 'removeViewBox',
                  active: false
                }]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ],
    generator: {
      'asset/resource': {
        outputPath: 'assets/'
      }
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      type: 'commonjs'
    }
  }
};
