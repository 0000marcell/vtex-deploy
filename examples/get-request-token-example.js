const getRequestToken = require('../src/get-request-token');
const getAuthCookie = require('../src/get-auth-cookie');
const saveFile = require('../src/save-file');
const fs = require('fs');

/** This token is used when you need to upload a file 
 * the calls to save the file are not working at the moment
 */
async function run() {
  const authCookie = await getAuthCookie()
  const fileData = fs.readFileSync('./examples/file-to-upload.css', 'utf8');

  // get request token
  getRequestToken({
    authCookie: authCookie,
    store: 'modaoriginal'
  }, (token) => {
    console.log('token: ', token);
    saveFile({
      authCookie: authCookie,
      store: 'modaoriginal',
      name: '_test.css',
      fileData: fileData,
      token: token
    });
  });
}

run()
