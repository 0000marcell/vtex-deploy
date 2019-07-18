const getTemplatesIds = require('../src/get-templates-ids');
const getAuthCookie = require('../src/get-auth-cookie');

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
