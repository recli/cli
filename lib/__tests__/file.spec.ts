import { writeData } from '../file';
import fs from 'fs';
import path from 'path';
import inquirer from "inquirer";


const templatePath = path.join(__dirname + '/filename3.js');
const defaultFileTemplate = `
import { template } from '../template';
/* re-cli:use-import */

const router = [
  './xxx.jsp',
  /* re-cli:use-path */
]
export {
  Module,
  /* re-cli:use-module-name */
};
`;

describe('file', () => {
  beforeEach(() => {
    fs.writeFileSync(templatePath, defaultFileTemplate);
  });

  test('same file check -- true', async () => {
    // @ts-ignore
    inquirer.prompt = jest.fn().mockReturnValueOnce({isOverwrite: true});

    await writeData(templatePath, 'xxx');

    expect(fs.readFileSync(templatePath, 'utf-8')).toBe(`xxx`);
  });

  test('same file check -- false', async () => {
    // @ts-ignore
    inquirer.prompt = jest.fn().mockReturnValueOnce({isOverwrite: false});

    await writeData(templatePath, 'xxx');

    expect(fs.readFileSync(templatePath, 'utf-8')).toBe(defaultFileTemplate);
  });

  afterAll(() => {
    fs.unlinkSync(templatePath);
  });
});
