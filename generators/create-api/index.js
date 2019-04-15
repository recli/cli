import * as helpers from '../../helpers';

const Generator = require('../index');

const formatReplace = (absFilePathForPatch, relPath) =>
  `export * from './${relPath}';`;

module.exports = class extends Generator {
  prompting() {
    // eslint-disable-next-line
    this._NAME = 'create-api';
    this.answers = helpers.prompt(this)([
      {
        type: 'input',
        name: 'name',
        message: 'endpoint single name (ex transaction-type):',
        validate: helpers.validate(name => {
          helpers.validateName(name);
          helpers.validateDashFormat(name);

          helpers.validateFileIsNew(helpers.appRoot(), `src/api/${name}.js`);

          return true;
        }),
      },
      {
        type: 'input',
        name: 'secondName',
        message: 'endpoint pluralize name (ex transaction-typeS):',
        validate: helpers.validate(name => {
          helpers.validateName(name);
          helpers.validateDashFormat(name);

          return true;
        }),
      },
    ]);
  }

  writing() {
    const { name } = this.answers;
    const rootPath = helpers.appRoot('./src/api/');
    helpers.copyTplFile(this)(
      'api.js',
      helpers.cwdFile(this)(`${rootPath}/${name}.js`),
      this.answers,
    );
    helpers.addRelRequire(this)(
      helpers.appRoot('./src/api/index.js'),
      `${name}`,
      `${helpers.formatClassName(name)}`,
      formatReplace,
    );
  }
};
