const getAuthCookie = require('../src/get-auth-cookie');
const saveTemplate = require9'../src/save-template');

async function run() {
  const authCookie = await getAuthCookie()

  // save template
  saveTemplate({
    authCookie: authCookie,
    store: 'modaoriginal',
    name: 'new-template',
    html: HTML,
  });
}

run()
