const { createHash } = require('crypto');

/**
* return a new template id based on the name of the template  
*/
module.exports = function(templatename) {
  let result = createHash('md5').update(templatename).digest('hex')
  return result;
}
