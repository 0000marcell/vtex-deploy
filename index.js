const getAuthCookie = require('./src/get-auth-cookie');
const getTemplateIds = require('./src/get-templates-ids');
const saveTemplate = require('./src/save-template');
const saveSubtemplate = require('./src/save-subtemplate');
const saveShelfTemplate = require('./src/save-shelf-template');

module.exports = {
  getAuthCookie: getAuthCookie,
  getTemplateIds: getTemplateIds,
  saveTemplate: saveTemplate,
  saveSubtemplate: saveSubtemplate,
  saveShelfTemplate: saveShelfTemplate
};