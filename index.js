const getAuthCookie = require('./src/get-auth-cookie');
const saveTemplate = require('./src/save-template');  
const saveSubtemplate = require('./src/save-subtemplate');
const saveShelfTemplate = require('./src/save-shelf-template');


module.exports = {
  getAuthCookie: getAuthCookie,
  saveTemplate: saveTemplate,
  saveSubtemplate: saveSubtemplate,
  saveShelfTemplate: saveShelfTemplate
}
