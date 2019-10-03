const createJsTemplate = (name, paramName) => `import React from 'react';
import { ${name} } from 'carbon-components-react';

import './styles.scss'

const Mastodon${name} = props => (
  <div className="mastodon-${paramName}">
    <${name} {...props} />
  </div>
);

export default Mastodon${name};
`;

module.exports = createJsTemplate;
