import { cliOf, validation, childProcess } from "../../../lib/index";

cliOf('run shell task', module)
  .ask({
    name: 'pickTask',
    message: 'Which task does we run?',
    type: 'list',
    choices: () => {
      return [
        'npm run build',
        'tsc --emitDeclarationOnly'
      ];
    }
  })
  .call(async (answers) => {
    await childProcess.spawn(answers.pickTask);
  })
  .call((answers) => {
    console.log(answers);
  });