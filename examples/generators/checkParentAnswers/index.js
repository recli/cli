import { cliOf, useImport, usePath, useModuleName, useCustom, validation, to } from "../../../lib/index";

cliOf('checkParentAnswers', module)
  .ask({
    name: 'propOne',
    message: 'Please input something',
    type: 'input',
    default: 'lodash'
  })
  .setAnswers((answers) => {
    return {
      parent: answers.useGeneratorParent && to.pascal(answers.useGeneratorParent.libraryName),
    }
  });
