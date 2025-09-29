const path = require('path');

const isProduction = process.argv.indexOf('--mode=production') !== -1;

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  devtool: !isProduction ? 'inline-source-map' : undefined,
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components'
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
        use: 'ts-loader',
        exclude: /node_modules/
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
              svgo: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/inline'
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
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      type: 'commonjs'
    }
  },
  plugins: []
};
