const reactToolboxVars = {
  "color-green": "rgb(80,184,72)",
  "color-primary": "rgb(20,78,140)",
  "color-primary-dark": "rgb(7,30,54)",
  "color-accent": "var(--color-green)",
  "color-accent-dark": "rgb(42,97,32)",
  "color-red": "rgb(182,72,72)",
  "color-blue": "var(--color-primary)",
  "color-yellow": "rgb(192, 170, 20)",
  "unit": "1rem"
};


module.exports = () => [
  require('postcss-cssnext')({
    browsers: 'last 2 versions, not ie <= 8',
    features: {
      customProperties: {
        variables: reactToolboxVars,
      },
    },
  }),
  require('precss')
];
