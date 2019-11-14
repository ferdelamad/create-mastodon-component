#! /usr/bin/env node

const fs         = require('fs');
const path       = require('path');
const program    = require('commander');
const changeCase = require('change-case');

const {
  createJsTemplate,
  createTestTemplate,
  createIndexTemplate,
  createStoryTemplate,
  createStyleTemplate,
} = require('./lib')

function init(name, options) {
  const paramName = changeCase.paramCase(name)

  const dir       = path.resolve(`./src/Mastodon/${name}`);
  const stylesExt = options.styles || "scss";

  const js        = path.resolve(dir, `${name}.js`);
  const test      = path.resolve(dir, `${name}.test.js`)
  const index     = path.resolve(dir, `index.js`);
  const story     = path.resolve(dir, `${name}.stories.mdx`)
  const styles    = path.resolve(dir, `styles.${stylesExt}`)

  const jsContent    = createJsTemplate(name, paramName);
  const testContent  = createTestTemplate(name, paramName);
  const storyContent = createStoryTemplate(name);
  const indexContent = createIndexTemplate(name);
  const styleContent = createStyleTemplate(paramName);

  fs.mkdirSync(`./src/Mastodon/${name}`);
  fs.writeSync(fs.openSync(styles, "w"), styleContent);
  fs.writeSync(fs.openSync(js, "w"), jsContent);
  fs.writeSync(fs.openSync(index, "w"), indexContent);
  fs.writeSync(fs.openSync(test, "w"), testContent);
  fs.writeSync(fs.openSync(story, "w"), storyContent);
  console.log(`Mastodon ${name} component created`);
}

program
  .version('0.0.1')
  .option('-s, --styles [extension]', 'styles extension [default: scss]')
  .arguments('<name>')
  .action(init)
  .parse(process.argv);
