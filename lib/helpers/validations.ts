import path from "path";
import glob from "glob";
import { red } from "colors";
import { formatError } from "../error";

export const isDashFormat = (name: string) => {
  if (!/^[a-z][a-z0-9-]*?[^-]?$/.test(name)) {
    throw new Error(
      "invalid format. must matched with expression regExp /^[a-z][a-z0-9-]*?[^-]?$/"
    );
  }
};

export const isCamelFormat = (name: string) => {
  if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(name)) {
    throw new Error(
      "invalid format. must matched with expression regExp /^[a-zA-Z][a-zA-Z0-9]*$/"
    );
  }
};

export const isFirstLetterUpper = (name: string) => {
  if (!/^[A-Z]/.test(name)) {
    throw new Error("invalid format. first letter must be in UpperCase");
  }
};

export const isFirstLetterLower = (name: string) => {
  if (!/^[a-z]/.test(name)) {
    throw new Error("invalid format. first letter must be in LowerCase");
  }
};

export const isNoWhitespace = (name: string) => {
  if (name !== name.trim()) {
    throw new Error("invalid format. spaces is not allowed");
  }

  if (!name.length) {
    throw new Error("must be not empty");
  }
};

export const isFileIsNew = (dir: string) => (template: string) => {
  const files = glob.sync(path.join(dir, template));

  if (files.length) {
    const prepare = (file: string) => red(path.relative(dir, file));

    throw new Error(`files [${files.map(prepare).join(", ")}] already exists!`);
  }
};

const check = async (
  input: string,
  validators: Array<(input: string) => any>,
  count: number
) => {
  if (validators.length > count) {
    // it can be string
    // it allow us return back or skip some tasks
    const task = validators[count];

    /* Step */
    await task(input);
    count += 1;

    /* Next */
    await check(input, validators, count);
  } else {
    return true;
  }
};

export const validate = (
  validators: Array<(input: string) => any>
) => function (input: string) {
  try {
    return check(input, validators, 0).then(() => true);
  }
  catch (err) {
    return formatError(err);
  }
};
