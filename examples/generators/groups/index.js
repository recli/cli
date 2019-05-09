import { cliOf, validation, file } from "../../../lib/index";

cliOf('groups', module)
  .ask({
    name: 'nestedGenerator',
    message: 'Pick one of nesteds...',
    type: 'list',
    choices: () => file.getAvailableGenerators('examples/generators/**/index.js'),
  })
  .useGenerator((answers) => require(answers.nestedGenerator))
  .call((answers) => {
    console.log(answers);
  });