const createStyleTemplate = name => `@import 'src/Theme/MastodonTheme.scss';

#mastodon {
  .mastodon-${name} {


  }
}
`;

module.exports = createStyleTemplate;
