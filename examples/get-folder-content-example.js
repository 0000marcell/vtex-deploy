const getFolderContent = require('../src/get-folder-content');
const getAuthCookie = require('../src/get-auth-cookie');


/*
 * Get the admin/a file tree 
 */
async function run() {
  const authCookie = await getAuthCookie()
  getFolderContent({
    authCookie: authCookie,
    store: 'modaoriginal'
  });
}

run()
