const clipboardy = require('clipboardy');
const ask = require('./ask');

/**
* get vtex authentication token
* from the user
*/
module.exports = async function() {
  try {
    let clipBoard = clipboardy.readSync(),
      authCookie = '';
    if(/^ey/.test(clipBoard)) {
      authCookie = clipBoard; 
      console.log(`Your token is: ${authCookie}`);
    } else {
      authCookie = await ask('Insert authentication cookie:')
    }
    return authCookie
  } catch(err) { console.error(err) }
}
