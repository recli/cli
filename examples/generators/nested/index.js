import { cliOf, validation } from "../../../lib/index";

cliOf('nested', module)
  .ask({
    name: 'libraryName',
    message: 'Dummy question...',
    type: 'input',
    validate: validation.validate([
      validation.isNoWhitespace,
      validation.isDashFormat
    ]),
    default: 'd'
  })
  .useGenerator(() => require('../validation'))
  .ask({
    name: 'libraryName',
    message: 'Dummy question at the end...',
    type: 'input',
    validate: validation.validate([
      validation.isNoWhitespace,
      validation.isDashFormat
    ]),
    default: 'a'
  })
  .call((answers) => {
    console.log(answers);
  });