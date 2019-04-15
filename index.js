require('babel-register')({
  ignore: false,
  only: [/generators/, /helpers/],
});
module.exports = require('./generators');
