import { cliOf, useImport, usePath, useCustom } from "../../../lib/index";

cliOf('mixins', module)
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
  .moveTemplates('../destinations', ['./templates/folderOfTemplates'])
