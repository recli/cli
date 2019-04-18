describe('decoration', () => {
  test('just test', async() => {
    const fn = require('../examples/decorator/fake.module');
    expect(fn).toBeInstanceOf(Function);

    const config = fn();

    console.log(config);
    expect(config).toBeDefined();
  })
})