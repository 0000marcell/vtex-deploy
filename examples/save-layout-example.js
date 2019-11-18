const saveLayout = require('../src/save-layout');
const getAuthCookie = require('../src/get-auth-cookie');

async function run() {
  const authCookie = await getAuthCookie()

  saveLayout({
    authCookie: authCookie,
    store: 'modaoriginal'
  });
}

run()
