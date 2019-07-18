const saveShelfTemplate = require('../src/save-shelf-template');
const getAuthCookie = require('../src/get-auth-cookie');
const getTemplatesIds = require('../src/get-templates-ids');

const HTML = `<div>
  <h1>ShelfTemplate6 !!!</h1>
</div>`;

async function run() {
  const authCookie = await getAuthCookie()

  // before saving a shelf template you must known if 
  // the shelf name you are trying to save already exist
  // if it does you need to save it with the same id
  getTemplatesIds({
    authCookie: authCookie,
    store: 'modaoriginal',
    type: 'shelfTemplate',
    isSub: true
  }, (shelfs) => {
    let id = '';
    if(shelfs['new-shelf3']) {
      id = shelfs['new-shelf'];
    }
    saveShelfTemplate({
      authCookie: authCookie,
      store: 'modaoriginal',
      name: 'new-shelf3',
      html: HTML,
      id: id,
      cssClass: 'shelf-default'
    });
  });
}

run()
