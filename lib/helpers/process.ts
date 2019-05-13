import { yellow } from "colors";
import ora from 'ora';
import childProcess from 'child_process';

export function spawn(cmd: string, { data, end } = { } as {data?: (buffer: any) => any, end?: (res: any) => any}): Promise<any> {
  const [rootCommand, ...args] = cmd.split(' ');
  const spinner = getSpinner(`execute: ${yellow(cmd)}`);

  return new Promise(res => {
    const spawn = childProcess.spawn;
    const child = spawn(rootCommand, args);

    child.stdout.on('data', function (buffer: any) { data && data(buffer) });
    child.stdout.on('end', (...args: any) => {
      end && end(args);
      spinner.stop();
      res(args)
    });
  });
}

export function getSpinner (str: string) {
  return ora(str).start();
}