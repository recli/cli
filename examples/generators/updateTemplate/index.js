import { cliOf, useImport, usePath, useModuleName, useCustom } from "../../../lib/index";

cliOf('updateTemplate', module)
  // adding question
  .addQuestion({
    name: 'libraryName',
    message: 'Please enter the name of module you want to import.',
    type: 'input',
    default: 'lodash'
  })
  // adding another question
  .addQuestion({
    name: 'importAs',
    message: 'Please enter variable name for importing module.',
    type: 'input',
    default: '_'
  })
  // updating selected file
  .updateFile('../../destinations/updateTemplateFile.js', (answers) => [
    // adding some library into template
    useImport(answers.importAs, answers.libraryName),
    // adding 'path' string
    usePath('somePath'),
    // adding module from library
    useModuleName('someModule'),
    // using of custom insertion by using regExp (using String.replace)
    useCustom({
      regex: /(\s*)(\/\*.*re-cli:use-custom.*\*\/)/,
      content: `$1'WhereAmI???'$1$2`,
    }),
  ])
