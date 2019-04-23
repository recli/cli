import { cliOf, useImport, usePath, useCustom } from "../../../lib/index";

cliOf('moveFolderOfOptions', module)
  .ask({
    type: 'confirm',
    name: 'Move file',
    message: 'Now we will move whole folder of templates. Press "any" to continue.',
  })
  // moving folder with all templates inside
  .move('../../destinations/folderOfTemplates', ['./folderOfTemplates'])
