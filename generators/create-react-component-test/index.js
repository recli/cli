import * as helpers from '../../helpers';

const Generator = require('../index');

module.exports = class extends Generator {
  prompting() {
    // eslint-disable-next-line
    this._NAME = 'create-functional-test';
    this.answers = helpers.prompt(this)([
      {
        type: 'input',
        name: 'name',
        message: 'test name (no need to type .test):',
        validate: helpers.validate(name => {
          helpers.validateName(name);
          helpers.validateDashFormat(name);

          helpers.validateFileIsNew(
            helpers.appRoot(),
            `src/**/${name}.test.js`,
          );

          return true;
        }),
      },
      helpers.askFolders(this.settings, './src'),
    ]);
  }

  writing() {
    const { name, root } = this.answers;
    const customName = name.replace('.test', '');
    const rootPath = helpers.appRoot('./src/', root);

    helpers.copyTplFile(this)(
      'test.js',
      helpers.cwdFile(this)(`${rootPath}/${customName}.test.js`),
      this.answers,
    );
  }
};
