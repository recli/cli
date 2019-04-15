import * as helpers from '../../helpers';

const Generator = require('../index');

const formatReplace = routeName => (absFilePathForPatch, relPath) => `{
      path: '/${routeName}',
      load: () =>
        import(/* webpackChunkName: 'app' */ '${relPath}'),
    },`;

module.exports = class extends Generator {
  prompting() {
    // eslint-disable-next-line
    this._NAME = 'create-form';
    this.answers = helpers.prompt(this)([
      {
        type: 'input',
        name: 'name',
        message: 'form name (-form postfix adds anyway):',
        validate: helpers.validate(name => {
          helpers.validateName(name);
          helpers.validateDashFormat(name);

          helpers.validateFileIsNew(
            helpers.appRoot(),
            `src/routes/**/${name}.js`,
          );

          return true;
        }),
      },
      helpers.askFolders(this.settings, './src/routes'),
      {
        type: 'confirm',
        message: 'add *.css file ?',
        name: 'isCss',
        default: true,
      },
    ]);
  }

  writing() {
    const { name, root, isCss } = this.answers;
    const formName = `${name.replace('-form', '')}-form`;
    const rootPath = helpers.appRoot('./src/routes/', root || formName);

    if (isCss) {
      helpers.copyTplFile(this)(
        'form.css',
        helpers.cwdFile(this)(`${rootPath}/${formName}.css`),
        this.answers,
      );
    }
    helpers.copyTplFile(this)(
      'form.js',
      helpers.cwdFile(this)(`${rootPath}/${formName}.js`),
      this.answers,
    );
    helpers.addRelRequire(this)(
      helpers.appRoot('./src/routes/index.js'),
      `./${root || formName}/${formName}`,
      `${helpers.formatClassName(formName)}`,
      formatReplace(root ? `${root}/${formName}` : formName),
    );
  }
};
