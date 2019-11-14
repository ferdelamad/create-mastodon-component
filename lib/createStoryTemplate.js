const createStoryTemplate = name => `import {
  Description,
  Meta,
  Preview,
  Props,
  Story,
} from '@storybook/addon-docs/blocks';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, optionsKnob } from '@storybook/addon-knobs';

import Mastodon${name} from './'

<Meta title="${name}" decorators={[withKnobs]}/>

# Mastodon ${name}

<Description of={Mastodon${name}} />

<Story name="${name} with knobs">
  <Mastodon${name}> Insert info here </Mastodon${name}>
</Story>


<Preview>
  <Story name="name of my story">
    <Mastodon${name}> Insert info here </Mastodon${name}>
  </Story>
</Preview>

<!--<Props of={Mastodon${name}} />-->

[Carbon Button documentation](http://react.carbondesignsystem.com/docs-to-the-original-component)
`;

module.exports = createStoryTemplate;
