const createIndexTemplate = name => `import Mastodon${name} from './${name}';

export default Mastodon${name};`

module.exports = createIndexTemplate;
