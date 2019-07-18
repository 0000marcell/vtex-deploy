const saveSubtemplate = require('../src/save-subtemplate');
const getAuthCookie = require('../src/get-auth-cookie');

const HTML = `<div>
  <h1>Subtemplate!!!</h1>
</div>`;

async function run() {
  const authCookie = await getAuthCookie()

  // save subtemplate
  saveSubtemplate({
    authCookie: authCookie,
    store: 'modaoriginal',
    name: 'new-subtemplate',
    html: HTML,
  });
}

run()
