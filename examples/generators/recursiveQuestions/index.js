import { cliOf, useImport, usePath, useModuleName, useCustom } from "../../../lib/index";

const templatePaths = [
  './templates/moveTemplate1.js',
  './templates/moveTemplate2.js'
];

cliOf('Recursive generator', module)
  .setKey('begining')
  .ask({
    type: 'list',
    name: 'selectedTemplate',
    message: 'Please select template to move.',
    choices: templatePaths,
    default: templatePaths[0],
  })
  // moving selected template with saving hierarchy of folders
  .setAnswers((answers) => {
    const selectedTemplates = answers.selectedTemplates || [];
    selectedTemplates.push(answers.selectedTemplate);
    return {
      selectedTemplates,
    }
  })
  // moving selected template to destination folder with rename
  .ask({
    type: 'confirm',
    name: 'continue',
    message: 'Are you want to select more template?',
    default: false,
  })
  .check((answers, goTo) => {
    if (answers.continue) {
      goTo('begining')
    }
  })
  .setAnswers((answers) => {
    console.log(answers);
  })
