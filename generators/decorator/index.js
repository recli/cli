import { cliOf, useImport, usePath, useCustom } from "../../dist/index";

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
  .move('../../fake/destination', ['./fake.template.js'])
  .useHooks('../../fake/destination/index.js', (answers) => [
    useImport(`./${answers.file2}`, answers.file2),
    usePath(`./${answers.file2}`),
    useCustom({regex, content}),
  ])
  .ask({
    name: 'file3',
    message: 'Are you enjoy it',
    type: 'confirmation'
  })
