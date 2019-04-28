import * as hooks from '../hooks';

describe('test hooks', () => {
  test('useImport', async () => {
    const result = hooks.applyHooksToContent(`
      import { useX } from './x';
      /* recli:use-import */

      xxxx
    `, [hooks.useImport('./xxx.js', '{ ModuleName }')]);

    expect(result).toBe(`
      import { useX } from './x';
      import { ModuleName } from './xxx.js';
      /* recli:use-import */

      xxxx
    `)
  });

  test('usePath', async () => {
    const result = hooks.applyHooksToContent(`
      [
        '/my-file.xxx.js'
        /* recli:use-path */
      ]

      xxxx
    `, [hooks.usePath('./xxx.js')]);

    expect(result).toBe(`
      [
        '/my-file.xxx.js',
        './xxx.js'
        /* recli:use-path */
      ]

      xxxx
    `)
  });

  test('useModuleName', async () => {
    const result = hooks.applyHooksToContent(`
      [
        FileName
        /* recli:use-module-name */
      ]

      xxxx
    `, [hooks.useModuleName('AwesomeModule')]);

    expect(result).toBe(`
      [
        FileName,
        AwesomeModule
        /* recli:use-module-name */
      ]

      xxxx
    `)
  });
});