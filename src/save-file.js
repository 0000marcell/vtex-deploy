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
  let baseUrl = '.vtexcommercestable.com.br/admin/a/FilePicker/UploadFile';
  let url = `https://${opts.store}${baseUrl}`;
  let requestToken = opts.token;

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
        path: '/admin/a/FilePicker/UploadFile',
        Filename: opts.name,
        fileext: '*.jpg;*.png;*.gif;*.jpeg;*.ico;*.js;*.css',
        folder: '/uploads',
        Upload: 'Submit Query',
        requestToken: opts.authCookie,
        Filedata: opts.fileData 
      }
    }, function(error, response, body){
      if(error) {
        console.error('File was not saved: ', error);
      }

      if(response.statusCode === 200 && !/originalMessage/.test(body)) {
        console.log(`* File ${opts.name} was saved on ${opts.store}`);
      } else {
        console.error(`* File was not saved!`);
        console.error(`* check the logs! ./.vtex-deploy`);
      }

      logger(opts, body)
    });
  } catch(err) { 
    console.error(`File was not saved error: ${err}`); 
  }
}
