const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = async function(opts, cb) {
  type = opts.type || 'viewTemplate';
  isSub = opts.isSub || false;
  let baseUrl = `.vtexcommercestable.com.br/admin/a/PortalManagement/GetTemplateList?type=${type}&IsSub=${isSub ? 1 : 0}`;
  let url = `https://${opts.store}${baseUrl}`;
  try {
    return request({
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': `VtexIdclientAutCookie=${opts.authCookie};`,
      },
      method: 'POST',
      url: url
    }, function(error, response, body){
      if(error) {
        console.error('Error when trying to retrieve template list', error);
      }
      const dom = new JSDOM(`<!DOCTYPE html>${body}`);
      let ul = dom.window.document.querySelector("ul");
      let results = {};
      ul.querySelectorAll("li").forEach((item) => {
        let name = item.querySelector('div').textContent;
        let id = item.querySelector('a')
          .attributes['href'].textContent.match(/templateId=(.*)/)[1];
        results[name] = id;
      });

      cb(results);
    });
  } catch(err) { 
    console.error(err);
  }
}
