const getAuthCookie = require('../src/get-auth-cookie');
const saveFile = require('../src/save-file');
const fs = require('fs');

async function run() {
  const authCookie = await getAuthCookie()
  const fileData = fs.readFileSync('./examples/file-to-upload.css');

  // save template
  saveFile({
    authCookie: authCookie,
    store: 'modaoriginal',
    name: '_test.css',
    fileData: fileData,
  });
}

run()
