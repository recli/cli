import * as helpers from '../../helpers';

const Generator = require('../index');

const rules = [
  {
    name: /(\s*)(\/\*.*cli:custome:store.*\*\/)/,
    callback: (absFilePathForPatch, relPath, mdlName) =>
      `${mdlName}: ${mdlName},`,
  },
  {
    name: /(\s*)(\/\*.*cli:custome:actions.*\*\/)/,
    callback: (absFilePathForPatch, relPath, mdlName) =>
      `typeof ${mdlName}.actions &`,
  },
  {
    name: /(\s*)(\/\*.*cli:custome:state.*\*\/)/,
    callback: (absFilePathForPatch, relPath, mdlName) =>
      `typeof ${mdlName}.state &`,
  },
];

module.exports = class extends Generator {
  prompting() {
    // eslint-disable-next-line
    this._NAME = 'create-redux-store';
    this.answers = helpers.prompt(this)([
      {
        type: 'input',
        name: 'name',
        message: 'store name:',
        validate: helpers.validate(name => {
          helpers.validateName(name);
          helpers.validateDashFormat(name);

          helpers.validateFileIsNew(
            helpers.appRoot(),
            `src/store/**/${name}.js`,
          );

          return true;
        }),
      },
      helpers.askFolders(this.settings, './src/store'),
    ]);
  }

  writing() {
    const { name, root } = this.answers;
    const rootPath = helpers.appRoot('./src/store/', root || name);
    helpers.copyTplFile(this)(
      'store.js',
      helpers.cwdFile(this)(`${rootPath}/${name}.js`),
      this.answers,
    );

    helpers.addRelRequire(this)(
      helpers.appRoot('./src/store/loader.ts'),
      `./${root || name}/${name}`,
      `${helpers.formatCamelCase(name)}`,
      rules,
    );
  }
};
