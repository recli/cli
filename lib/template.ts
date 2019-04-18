import ejs from 'ejs';
import fs from 'fs';
import { writeData } from './file';

const template = ({from, to, data}: {from: string; to: string; data: Object}) => {
  const templateString = fs.readFileSync(from, 'utf-8');
  const renderedResult = ejs.render(templateString, data);

  return writeData(to, renderedResult);
};

export {
  template
}