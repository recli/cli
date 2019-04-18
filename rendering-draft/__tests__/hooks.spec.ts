import * as hooks from '../hooks';

describe('test hooks', () => {
  test('useImport', async () => {
    const result = hooks.applyHooksToContent(`
      import { useX } from './x';
      /* re-cli:use-import */

      xxxx
    `, [hooks.useImport('./xxx.js', '{ ModuleName }')]);

    expect(result).toBe(`
      import { useX } from './x';
      import { ModuleName } from './xxx.js';
      /* re-cli:use-import */

      xxxx
    `)
  });

  test('usePath', async () => {
    const result = hooks.applyHooksToContent(`
      [
        '/my-file.xxx.js'
        /* re-cli:use-path */
      ]

      xxxx
    `, [hooks.usePath('./xxx.js')]);

    expect(result).toBe(`
      [
        '/my-file.xxx.js',
        './xxx.js'
        /* re-cli:use-path */
      ]

      xxxx
    `)
  });

  test('useModuleName', async () => {
    const result = hooks.applyHooksToContent(`
      [
        FileName
        /* re-cli:use-module-name */
      ]

      xxxx
    `, [hooks.useModuleName('AwesomeModule')]);

    expect(result).toBe(`
      [
        FileName,
        AwesomeModule
        /* re-cli:use-module-name */
      ]

      xxxx
    `)
  });
});