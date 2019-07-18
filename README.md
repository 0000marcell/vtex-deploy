VTEX-DEPLOY
==============
script to deploy assets to vtex
based vtex-cms-sauce by [Mauricio Alvim](https://github.com/alvimm)

### Getting started
```
npm install vtex-deploy
```

## Save Templates

```
const saveTemplate = require('../src/save-template');
const getAuthCookie = require('../src/get-auth-cookie');

const HTML = `<!DOCTYPE html>
<html>
  <head>
    <title>VTEX</title>
  </head>
  <body>
    <h1>Template</h1>
  </body>
</html>
`;

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
```

## Save Subtemplates
```
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
```

## Save Shelf Templates 
```
const saveShelfTemplate = require('../src/save-shelf-template');
const getAuthCookie = require('../src/get-auth-cookie');

const HTML = `<div>
  <h1>ShelfTemplate!!!</h1>
</div>`;

async function run() {
  const authCookie = await getAuthCookie()

  // save subtemplate
  saveShelfTemplate({
    authCookie: authCookie,
    store: 'modaoriginal',
    name: 'new-subtemplate',
    html: HTML,
  });
}

run()
```

## License
MIT © [Marcell Monteiro Cruz](https://github.com/0000marcell)
