const createTestTemplate = (name, paramName) => `import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Mastodon${name} from '..'

let wrapper

beforeEach(() => {
  wrapper = mount(<Mastodon${name} />)
});

afterEach(() => {
  wrapper.unmount()
})

describe('<Mastodon${name} />', () => {

  it('renders and matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should include mastodon-${paramName} as className', () => {
    expect(wrapper.find('${name}').first().hasClass('mastodon-${paramName}')).toBe(true)
  });

});
`;

module.exports = createTestTemplate;
