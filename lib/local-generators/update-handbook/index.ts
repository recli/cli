import { cliOf } from "../../decoration";

cliOf('update-handbook')
  .addQuestion({
    name: 'confirm',
    message: 'Are you ready?',
    type: 'confirm'
  })
  .updateHandbook()
