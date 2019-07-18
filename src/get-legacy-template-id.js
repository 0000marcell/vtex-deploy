const getTemplates = require('./get-templates');

module.exports = async function(templatename, type, isSub = false) {
  try {
    let templatesList = await getTemplates(type, isSub)
    let regex = 
      new RegExp(`(${templatename})([\\s\\S]+?)(templateId=)([\\s\\S]+?(?="))`);
    let templateId = templatesList.match(regex)[4];

    if (!templateId) {
      throw new Error('template not found!');
    } 
    return templateId;
  } catch(err) { 
    console.error(`Couldn't get template id: ${err}`);
  }
}
