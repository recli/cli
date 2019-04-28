import { cliOf, useImport, usePath, useModuleName, useCustom } from "../../../lib/index";

cliOf('updateTemplate', module)
  // adding question
  .ask({
    name: 'libraryName',
    message: 'Please enter the name of module you want to import.',
    type: 'input',
    default: 'lodash'
  })
  // adding another question
  .ask({
    name: 'importAs',
    message: 'Please enter variable name for importing module.',
    type: 'input',
    default: '_'
  })
  // updating selected file
  .useHooks('../../destinations/updateTemplateFile.js', (answers) => [
    // adding some library into template
    useImport(answers.importAs, answers.libraryName),
    // adding 'path' string
    usePath('somePath'),
    // adding module from library
    useModuleName('someModule'),
    // using of custom insertion by using regExp (using String.replace)
    useCustom({
      regex: /(\s*)(\/\*.*recli:use-custom.*\*\/)/,
      content: `$1'WhereAmI???'$1$2`,
    }),
  ])
