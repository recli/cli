describe('decoration', () => {
  test('just test', async() => {
    const fn = require('../generators/decorator/index');
    expect(fn).toBeInstanceOf(Function);

    const config = fn();
    expect(config).toBeDefined();
  })
})