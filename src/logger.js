const fs = require('fs');

module.exports = function(opts, body) {
  let log = `
    <style type="text/css">
      #divPortalMessage {
        display: block !important;
      }
    </style>
    <div>
      <h1>${opts.name}</h1>
      ${body}
    </div>
    <hr />
  `;

  fs.appendFile('./.vtex-deploy-log.html', log, function (err) {
    if (err) throw err;
  });
}


