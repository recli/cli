import * as helpers from '../../helpers';

const Generator = require('../index');

module.exports = class extends Generator {
  prompting() {
    // eslint-disable-next-line
    this._NAME = 'create-component';
    this.answers = helpers.prompt(this)([
      {
        type: 'input',
        name: 'name',
        message: 'component name:',
        validate: helpers.validate(name => {
          helpers.validateName(name);
          helpers.validateDashFormat(name);

          helpers.validateFileIsNew(
            helpers.appRoot(),
            `src/components/**/${name}.js`,
          );

          return true;
        }),
      },
      helpers.askFolders(this.settings, './src/components'),
    ]);
  }

  writing() {
    const { name, root } = this.answers;
    const rootPath = helpers.appRoot('./src/components/', root, name);
    helpers.copyTplFile(this)(
      'component.css',
      helpers.cwdFile(this)(`${rootPath}/${name}.css`),
      this.answers,
    );
    helpers.copyTplFile(this)(
      'component.d.ts',
      helpers.cwdFile(this)(`${rootPath}/${name}.d.ts`),
      this.answers,
    );
    helpers.copyTplFile(this)(
      'component.example.js',
      helpers.cwdFile(this)(`${rootPath}/${name}.example.js`),
      this.answers,
    );
    helpers.copyTplFile(this)(
      'component.js',
      helpers.cwdFile(this)(`${rootPath}/${name}.js`),
      this.answers,
    );
    helpers.copyTplFile(this)(
      'package.json',
      helpers.cwdFile(this)(`${rootPath}/package.json`),
      this.answers,
    );

    helpers.addRelRequire(this)(
      helpers.appRoot('./src/routes/kit/kit.js'),
      helpers.getRelativePath(
        helpers.appRoot('./src/components/'),
        helpers.cwdFile(this)(`${rootPath}/${name}.example.js`),
      ),
      `${helpers.formatClassName(name)}Example`,
    );
  }
};
