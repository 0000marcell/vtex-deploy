const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = async function(opts, cb) {
  let type = opts.type || 'viewTemplate';
  let isSub = opts.isSub || false;
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
      //TODO: 
      if(error) {
        console.error(`Error trying to retrieve ${type} list`, error);
      }
      if((response.statusCode > 399 && response.statusCode < 601)) {
        console.error(`* error getting ${type} ids (${response.statusCode})`);
      }
      if(/\/admin\/login\?portal/.test(body)){
        console.warn(`* invalid or expired cookie (${response.statusCode})`);
      }
      const dom = new JSDOM(`<!DOCTYPE html>${body}`);
      let results = {};
      let ul = dom.window.document.querySelector("ul");
      if(ul == null){
        console.error(`* no valid ${type} ids to show`);
      }
      else{
        ul.querySelectorAll("li").forEach((item) => {
          let name = item.querySelector('div').textContent;
          let id = item.querySelector('a')
            .attributes['href'].textContent.match(/templateId=(.*)/)[1];
          results[name] = id;
        });
      }

      if(typeof cb == 'function'){
        cb(results);
      }
    });
  } catch(err) { 
    console.error(err);
    if(typeof cb == 'function'){
      cb({});
    }
  }
}
