#! /usr/bin/env node

const fs         = require("fs");
const path       = require("path");
const program    = require("commander");
const changeCase = require("change-case");

function init(name, options) {

  const lowerName = changeCase.lowerCase(name);
  const parsedName = changeCase.upperCaseFirst(lowerName);

  const dir       = path.resolve(`./src/Mastodon/${parsedName}`);
  const stylesExt = options.styles || "scss";
  const styles    = path.resolve(dir, `styles.${stylesExt}`)
  const js        = path.resolve(dir, `${parsedName}.js`);
  const index     = path.resolve(dir, "index.js");
  const test      = path.resolve(`${dir}/__tests__`, `${parsedName}Test.js`)

const scssContent = `@import 'src/Theme/MastodonTheme.scss';

#mastodon {
  .mastodon-${changeCase.paramCase(lowerName)} {


  }
}
`;

const jsContent = `import React from 'react';
import { ${parsedName} } from 'carbon-components-react';

import './styles.scss'

const Mastodon${parsedName} = props => (
  <div className="mastodon-${changeCase.paramCase(lowerName)}">
    <${parsedName} {...props} />
  </div>
);

export default Mastodon${parsedName};
`;

const indexContent = `import Mastodon${parsedName} from './${parsedName}';

export default Mastodon${parsedName};
`;

const testContent = `import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Mastodon${parsedName} from '..'

let wrapper

beforeEach(() => {
  wrapper = mount(<Mastodon${parsedName} />)
});

afterEach(() => {
  wrapper.unmount()
})

describe('<Mastodon${parsedName} />', () => {

  it('renders and matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should include mastodon-${changeCase.paramCase(lowerName)} as className', () => {
    expect(wrapper.find('${parsedName}').first().hasClass('mastodon-${changeCase.paramCase(lowerName)}')).toBe(true)
  });


});
`;

  fs.mkdirSync(`./src/Mastodon/${parsedName}`);
  fs.mkdirSync(`./src/Mastodon/${parsedName}/__tests__`);
  fs.writeSync(fs.openSync(styles, "w"), scssContent);
  fs.writeSync(fs.openSync(js, "w"), jsContent);
  fs.writeSync(fs.openSync(index, "w"), indexContent);
  fs.writeSync(fs.openSync(test, "w"), testContent);
  console.log(`Mastodon ${parsedName} component created`);
}

program
  .version('0.0.1')
  .option('-s, --styles [extension]', 'styles extension [default: scss]')
  .arguments('<name>')
  .action(init)
  .parse(process.argv);
