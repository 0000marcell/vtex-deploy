const request = require('request');
const logger = require('./logger');

// TODO: i need a way of retrieving
// siteId -- found a way
// placeHolderId
// layoutId

// control id mapping 
// maybe its not the same for every site, needs more testing 
let controlIdMapping = {
  "collection": "2a673f22-79a1-4519-93bc-7d30edd9e2c2"
}

module.exports = async function(opts) {
  let baseUrl = '.vtexcommercestable.com.br/admin/a/PortalManagement/SaveLayoutSetting';
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
        coltrolIdSelectedList: "0676c307-010f-4b11-b869-a3c1da6551ea[:][:][:]-||-0676c307-010f-4b11-b869-a3c1da6551ea[:]2a673f22-79a1-4519-93bc-7d30edd9e2c2[:][:]test",
        placeHolderId: "0676c307-010f-4b11-b869-a3c1da6551ea",
        siteId: "cf259fcc-3822-4ee9-afc7-4ad92bbffe99",
        templateId: "7ce52a06-efc6-429c-85f6-cc43f8dabb41",
        layoutId: "1cc5e02a50c7452aaa08d4cdae19eb30",
        "X-Requested-With": "XMLHttpRequest"
      }
    }, function(error, response, body){
      if(error) {
        console.error('Save Layout: ', error);
      }
      if(response.statusCode === 200 && !/originalMessage/.test(body)) {
        console.log(`* Save Layout was saved on ${opts.store}`);
      } else {
        console.error(`* Save Layout was not saved!`);
        console.error(`* check the logs! ./.vtex-deploy`);
      }

      logger(opts, body)
    });
  } catch(err) { 
    console.error(`Template was not saved error: ${err}`); 
  }
}
