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
        use: {
          loader: 'babel-loader',
          options: {
            compact: true,
            presets: [
              ['@babel/preset-env', {modules: false}],
              ['@babel/preset-typescript', {allowNamespaces: true, allExtensions: true, isTSX: true, onlyRemoveTypeImports: true}],
              ['@babel/preset-react', {runtime: 'automatic'}]
            ],
            plugins: [
              'add-react-displayname',
              [
                'babel-plugin-styled-components',
                {
                  // Disable the dev-friendly classNames on styled-components
                  displayName: !isProduction,
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
        exclude: [/node_modules/]
      },
      {
        test: /\.tsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: true,
            presets: [
              ['@babel/preset-env', {modules: false}],
              ['@babel/preset-typescript', {allowNamespaces: true, allExtensions: true, isTSX: true, onlyRemoveTypeImports: true}],
              ['@babel/preset-react', {runtime: 'automatic'}]
            ],
            plugins: [
              'add-react-displayname',
              [
                'babel-plugin-styled-components',
                {
                  // Disable the dev-friendly classNames on styled-components
                  displayName: !isProduction,
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
        exclude: [/node_modules/]
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
                plugins: [
                  {
                    name: 'removeViewBox',
                    active: false
                  }
                ]
              }
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
  plugins: [
    // Suppress warnings about type-only exports
    new (class {
      apply(compiler) {
        compiler.hooks.done.tap('SuppressTypeExportWarnings', (stats) => {
          if (stats.compilation.warnings) {
            stats.compilation.warnings = stats.compilation.warnings.filter(
              (warning) => !warning.message.includes('export') || !warning.message.includes('was not found')
            );
          }
        });
      }
    })()
  ]
};
