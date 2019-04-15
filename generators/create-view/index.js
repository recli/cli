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
    this._NAME = 'create-view';
    this.answers = helpers.prompt(this)([
      {
        type: 'input',
        name: 'name',
        message: 'view name:',
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
    const rootPath = helpers.appRoot('./src/routes/', root || name);

    if (isCss) {
      helpers.copyTplFile(this)(
        'view.css',
        helpers.cwdFile(this)(`${rootPath}/${name}.css`),
        this.answers,
      );
    }
    helpers.copyTplFile(this)(
      'view.js',
      helpers.cwdFile(this)(`${rootPath}/${name}.js`),
      this.answers,
    );
    helpers.addRelRequire(this)(
      helpers.appRoot('./src/routes/index.js'),
      `./${root || name}/${name}`,
      `${helpers.formatClassName(name)}`,
      formatReplace(root ? `${root}/${name}` : name),
    );
  }
};
