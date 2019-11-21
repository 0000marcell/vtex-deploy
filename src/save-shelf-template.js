const generateNewTemplateId = require('./generate-new-template-id');
const request = require('request');
const logger = require('./logger');


/**
 * store, store name
 * name, name of the template
 * html, content to save
* {
    store: 'modaoriginal',
    name: 'new-template',
    html: HTML,
  } 
*/
module.exports = async function(opts) {
  let baseUrl = '.vtexcommercestable.com.br/admin/a/PortalManagement/SaveShelfTemplate';
  let url = `https://${opts.store}${baseUrl}`;
  let templateId = opts.id || generateNewTemplateId(opts.name);
  let actionForm = (opts.id) ? 'Update' : 'Save';  
  let templateCssClass = opts.cssClass || 'shelf'; 

  try {
    request({
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': `VtexIdclientAutCookie=${opts.authCookie};`,
      },
      method: 'POST',
      url: url,
      form: {
        templatename: opts.name,
        templateId: templateId,
        template: opts.html,   
        isSub: 'true',
        roundCorners: false,
        actionForm: actionForm,
        textConfirm: 'sim',
        templateCssClass: templateCssClass
      }
    }, function(error, response, body){
      if(error) {
        console.error(`Shelf Template ${opts.name} was not saved: `, error);
      }
      if(response.statusCode === 200 && !/originalMessage/.test(body)) {
        console.log(`* Shelf Template ${opts.name} was saved on ${opts.store}`);
      } else {
        console.error(`* Shelf Template ${opts.name} was not saved!`);
        console.error(`* check the logs! ./.vtex-deploy`);
      }

      logger(opts, body)
    });
  } catch(err) { 
    console.error(`Shelf Template was not saved error: ${err}`); 
  }
}
