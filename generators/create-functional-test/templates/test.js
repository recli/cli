import { getState } from 'store/index';

describe('<%= name %>', () => {
  test('default-test', async () => {
    const { wallets } = getState();

    expect(wallets.length).toBe(0);
  });
});

/**
 * For more details please read
 * https://facebook.github.io/jest/docs/en/api.html
 * https://jasmine.github.io/
 * Possible methods:
 *   afterAll(fn, timeout)
 *   afterEach(fn, timeout)
 *   beforeAll(fn, timeout)
 *   beforeEach(fn, timeout)
 *   describe(name, fn)
 *   describe.only(name, fn)
 *   describe.skip(name, fn)
 *   require.requireActual(moduleName)
 *   require.requireMock(moduleName)
 *   test(name, fn, timeout)
 *   test.only(name, fn, timeout)
 *   test.skip(name, fn)
 */
