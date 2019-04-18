import { cliOf, useImport, usePath } from "../../decoration";

cliOf('generator-name', module, __dirname)
  .addQuestion({
    name: 'file',
    message: 'Move file',
    type: 'input'
  })
  .addQuestion({
    name: 'file2',
    message: 'Move file2',
    type: 'input'
  })
  .moveTemplates('../../fake/destination', ['./fake.template.js'])
  .updateFile('../../fake/destination/index.js', (answers) => [
    useImport(`./${answers.file2}`, answers.file2),
    usePath(`./${answers.file2}`),
  ])
  .addQuestion({
    name: 'file3',
    message: 'Are you enjoy it',
    type: 'confirmation'
  })