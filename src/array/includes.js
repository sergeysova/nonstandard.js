const { CMI } = require('../tools');

module.exports = CMI(Array.prototype, 'includes', function(searchElements)
{
  if (!Array.isArray(searchElements)) {
    searchElements = [searchElements];
  }
  return searchElements.every(element => this.indexOf(element) > -1);
});