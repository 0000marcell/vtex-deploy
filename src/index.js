const apisauce = require('apisauce');
const saveTemplate = require('./save-template');
const saveShelfTemplate = require('./save-shelf-template');
const saveFile = require('./save-file');

// Create and configure an apisauce-based api object.
const create = function(baseURL) {
  this.reqObj = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    timeout: 10000
  });

  // Transforms JSON request data into x-www-form-urlencoded
  this.reqObj.addRequestTransform(request => {
    let str = []
    for (const p in request.data) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(request.data[p]));
    }
    request.data = str.join('&')
  });

  // The public API
  return {
    saveTemplate: saveTemplate.bind(this),
    saveShelfTemplate: saveShelfTemplate.bind(this),
    saveFile: saveFile.bind(this)
  };
}

module.exports = {
  create
}
