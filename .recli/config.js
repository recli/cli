import { configure } from '../lib/index';

function loadConfig() {
  // require('../examples/generators/mixins/index.js');
  // require('../examples/generators/moveFolderOfTemplates/index.js');
  // require('../examples/generators/moveTemplate/index.js');
  require('../examples/generators/**/index*');
}

configure(loadConfig, module);
