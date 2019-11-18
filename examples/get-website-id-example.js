const getWebsiteId = require('../src/get-website-id');
const getAuthCookie = require('../src/get-auth-cookie');

// Get the ids of the websites(mundinhos) 
async function run() {
  const authCookie = await getAuthCookie()
  getWebsiteId({
    authCookie: authCookie,
    store: 'modaoriginal'
  }, (results) => {
    console.log(results);
  });
}

run()
