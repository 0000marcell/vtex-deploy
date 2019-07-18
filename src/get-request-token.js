const request = require('request'); 
const logger = require('./logger');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = async function(opts, cb) {
  try {
    // const authCookie = await getAuthCookie()
    // api.setHeader('Cookie', `VtexIdclientAutCookie=${authCookie};`)

    // const { data } = await api
    //   .post('/admin/a/PortalManagement/AddFile?fileType=css');

    // const $ = cheerio.load(data)
    // const requestToken = $('#fileUploadRequestToken').val()
    // if (!requestToken) throw new Error('Couldn\'t get request token!')

    // return requestToken

    let baseUrl = '.vtexcommercestable.com.br/admin/a/PortalManagement/AddFile?fileType=css';
    let url = `https://${opts.store}${baseUrl}`;

    request({
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': `VtexIdclientAutCookie=${opts.authCookie};`,
      },
      method: 'POST',
      url: url,
    }, function(error, response, body){
      if(error) {
        console.error('Get Request: ', error);
      }

      if(response.statusCode === 200 && !/originalMessage/.test(body)) {
        console.log(`* Get token ${opts.name} was saved on ${opts.store}`);
      } else {
        console.error(`* Get token!`);
        console.error(`* check the logs! ./.vtex-deploy`);
        
      }

      logger(opts, body)

      const dom = new JSDOM(`<!DOCTYPE html>${body}`);

      cb(dom.window.document
          .querySelector('#fileUploadRequestToken').getAttribute('value'));
    });
  } catch(err) { 
    console.error(`Couldn't get request token: ${err}`) 
  }
}
