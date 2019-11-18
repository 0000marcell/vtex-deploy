const request = require('request');
const logger = require('./logger');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = async function(opts, cb) {
  let baseUrl = '.vtexcommercestable.com.br/admin/a/PortalManagement/GetWebSiteList';
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

      const dom = new JSDOM(`<!DOCTYPE html>${body}`);
      let ul = dom.window.document.querySelector("ul");
      let results = {};
      ul.querySelectorAll("li").forEach((item) => {
        let name = item.querySelector('div').textContent;
        let id = item.querySelector('a')
          .attributes['href'].textContent.match(/websiteId=(.*)/)[1];
        results[name] = id;
      });

      cb(results);

      logger(opts, body)
    });
  } catch(err) { 
    console.error(`Template was not saved error: ${err}`); 
  }
}
