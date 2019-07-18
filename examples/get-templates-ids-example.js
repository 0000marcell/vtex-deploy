const getTemplatesIds = require('../src/get-templates-ids');
const getAuthCookie = require('../src/get-auth-cookie');

async function run() {
  const authCookie = await getAuthCookie()

  // get templates id 
  getTemplatesIds({
    authCookie: authCookie,
    store: 'modaoriginal',
    type: 'viewTemplate',
    isSub: false
  }, (results) => {
    console.log(">>>>>>>>>> templates ");
    console.log(results);
  });

  // get subtemplates id 
  getTemplatesIds({
    authCookie: authCookie,
    store: 'modaoriginal',
    type: 'viewTemplate',
    isSub: true
  }, (results) => {
    console.log(">>>>>>>>>> subtemplates");
    console.log(results);
  });

  // get shelf templates 
  getTemplatesIds({
    authCookie: authCookie,
    store: 'modaoriginal',
    type: 'shelfTemplate',
    isSub: true
  }, (results) => {
    console.log(">>>>>>>>>> shelf templates");
    console.log(results);
  });
}

run()
