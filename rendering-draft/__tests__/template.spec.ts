import { template } from '../template';
import fs from 'fs';
import path from 'path';

const templatePath = path.join(__dirname + '/filename.js');
const templatePath2 = path.join(__dirname + '/filename2.js');

describe('render template', () => {
  beforeAll(() => {
    fs.writeFileSync(templatePath, `
      import { template } from '../template';
      const xxx = <%= name %>

      export xxx;
    `);
  });

  test('template function', async () => {
    await template({from: templatePath, to: templatePath2, data: {
      name: '123',
    }});

    expect(fs.readFileSync(templatePath2, 'utf-8')).toBe(`
      import { template } from '../template';
      const xxx = 123

      export xxx;
    `);
  });

  afterAll(() => {
    fs.unlinkSync(templatePath);
    fs.unlinkSync(templatePath2);
  });
});
