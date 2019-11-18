const request = require('request');
const logger = require('./logger');

// i need to get the folderid of each part to then get the layoutid
module.exports = async function(opts) {
  let baseUrl = 
    '.vtexcommercestable.com.br/admin/a/PortalManagement/FolderContent';
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
        dir: "site%3Acf259fcc38224ee9afc74ad92bbffe99%3A8540a09c6233440993e4c5d3ee844c3c/"
      }
    }, function(error, response, body){
      if(error) {
        console.error('Error when getting the folders: ', error);
      }
      // if(response.statusCode === 200 && !/originalMessage/.test(body)) {
      //   console.log(`* Template ${opts.name} was saved on ${opts.store}`);
      // } else {
      //   console.error(`* Template was not saved!`);
      //   console.error(`* check the logs! ./.vtex-deploy`);
      // }
      console.log('body>>>>>>>> ', body);

      logger(opts, body)
    });
  } catch(err) { 
    console.error(`Template was not saved error: ${err}`); 
  }
}
