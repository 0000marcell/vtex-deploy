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
  let baseUrl = '.vtexcommercestable.com.br/admin/a/PortalManagement/SaveTemplate';
  let url = `https://${opts.store}${baseUrl}`;

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
        templateId: generateNewTemplateId(opts.name),
        template: opts.html,   
        isSub: 'true',
        actionForm: 'Save',
        textConfirm: 'sim'
      }
    }, function(error, response, body){
      if(error) {
        console.error('Subtemplate was not saved: ', error);
      }
      if(response.statusCode === 200 && !/originalMessage/.test(body)) {
        console.log(`* Subtemplate ${opts.name} was saved on ${opts.store}`);
      } else {
        console.error(`* Subtemplate was not saved!`);
        console.error(`* check the logs! ./.vtex-deploy`);
      }

      logger(opts, body);
    });
  } catch(err) { 
    console.error(`Template was not saved error: ${err}`); 
  }
}
