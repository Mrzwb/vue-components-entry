module.exports = {
  presets: ['./preset', "@babel/preset-env",'@babel/preset-typescript'],
  plugins: ['@babel/plugin-transform-runtime','@babel/plugin-transform-object-assign']
};