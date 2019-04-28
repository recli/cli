import { cliOf, useImport, usePath } from "../../decoration";

cliOf('decorator', module)
  .ask({
    name: 'file',
    message: 'Move file',
    type: 'input'
  })
  .ask({
    name: 'file2',
    message: 'Move file2',
    type: 'input'
  })
  .move(['./fake.template.js'], '../../fake/destination')
  .useHooks('../../fake/destination/index.js', (answers) => [
    useImport(`./${answers.file2}`, answers.file2),
    usePath(`./${answers.file2}`),
  ])
  .ask({
    name: 'file3',
    message: 'Are you enjoy it',
    type: 'confirm'
  })
