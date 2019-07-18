const generateNewTemplateId = require('./generate-new-template-id');
const saveTemplate = require('./save-template');
const getLegacyTemplateId = require('./get-legacy-template-id');

/**
* Aparently this functions does nothing since legacy templates can't be 
* changed, needs confirmation
*/
module.exports = async function(templatename, HTML, isSub, 
  type = 'viewTemplate') {
  let templateId = await getLegacyTemplateId(templatename, type, isSub)
  try {
    const actionForm = type === 'shelfTemplate' ? 'Update' : 'Save'
    let { status, data } = await this.reqObj.post(endpoint, {
      templatename: templatename,
      templateId: templateId,
      template: HTML,   
      isSub: isSub,
      actionForm: actionForm,
      textConfirm: 'sim'
    });
    if(status !== 200) {
    }
  } catch(err) { 
    console.error(err);
  }
}
