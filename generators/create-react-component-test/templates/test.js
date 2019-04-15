import React from 'react';
import renderer from 'react-test-renderer';
import Link from 'components/link';

/**
 * To solve withStyles problem please read about
 * https://github.com/kriasoft/react-starter-kit/issues/378
 */
/**
 * For advanced testing please read about
 * https://github.com/airbnb/enzyme
 */

/**
 * https://facebook.github.io/jest/docs/en/tutorial-react.html
 * When you run yarn test or jest, this will produce an output file like this:
 * __tests__/__snapshots__/*.test.js.snap
 * The next time you run the tests, the rendered output will be compared to the previously created snapshot
 */
test('<%= name %>', () => {
  const component = renderer.create(
    <Link to="http://www.facebook.com">Facebook</Link>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
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
