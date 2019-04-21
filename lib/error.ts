import PrettyError from "pretty-error";
const pe = new PrettyError();
// @ts-ignore
pe.filter((traceLine: Object | any, lineNumber: number) => {
  // if we know which package this trace line comes from, and it isn't
  if (typeof traceLine.packageName !== 'undefined' && traceLine.packageName !== 're-cli') {
     // then skip this line
     return true;
  }
});

export const formatError = (err: Error) => {
  const renderedError = pe.render(err);
  console.log(renderedError);
}
