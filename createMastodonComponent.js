#! /usr/bin/env node

const fs         = require('fs');
const path       = require('path');
const program    = require('commander');
const changeCase = require('change-case');

const {
  createStyleTemplate,
  createJsTemplate,
  createIndexTemplate,
  createTestTemplate,
} = require('./lib')

function init(name, options) {
  const paramName = changeCase.paramCase(name)

  const dir       = path.resolve(`./src/Mastodon/${name}`);
  const stylesExt = options.styles || "scss";
  const styles    = path.resolve(dir, `styles.${stylesExt}`)
  const js        = path.resolve(dir, `${name}.js`);
  const index     = path.resolve(dir, "index.js");
  const test      = path.resolve(`${dir}/__tests__`, `${name}Test.js`)

  const styleContent = createStyleTemplate(paramName);
  const jsContent = createJsTemplate(name, paramName);
  const indexContent = createIndexTemplate(name);
  const testContent = createTestTemplate(name, paramName);

  fs.mkdirSync(`./src/Mastodon/${name}`);
  fs.mkdirSync(`./src/Mastodon/${name}/__tests__`);
  fs.writeSync(fs.openSync(styles, "w"), styleContent);
  fs.writeSync(fs.openSync(js, "w"), jsContent);
  fs.writeSync(fs.openSync(index, "w"), indexContent);
  fs.writeSync(fs.openSync(test, "w"), testContent);
  console.log(`Mastodon ${name} component created`);
}

program
  .version('0.0.1')
  .option('-s, --styles [extension]', 'styles extension [default: scss]')
  .arguments('<name>')
  .action(init)
  .parse(process.argv);
