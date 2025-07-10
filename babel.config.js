module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    ['@babel/preset-typescript', {allowNamespaces: true, allExtensions: true, isTSX: true, onlyRemoveTypeImports: true}],
    ['@babel/preset-react', {runtime: 'automatic'}]
  ],
  plugins: [
    'add-react-displayname',
    [
      'babel-plugin-styled-components',
      {
        // Disable the dev-friendly classNames on styled-components
        displayName: true,
        // Minify the CSS
        minify: true,
        // Helps with dead code elimination
        // https://www.styled-components.com/docs/tooling#dead-code-elimination
        pure: true
      }
    ]
  ]
};
