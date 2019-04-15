import path from 'path';
import glob from 'glob';
import colors from 'colors';

export const validateDashFormat = name => {
  if (!/^[a-z][a-z0-9-]*?[^-]?$/.test(name)) {
    throw new Error(
      'invalid format. must matched with expression regExp /^[a-z][a-z0-9-]*?[^-]?$/',
    );
  }
};

export const validateCamelFormat = name => {
  if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(name)) {
    throw new Error(
      'invalid format. must matched with expression regExp /^[a-zA-Z][a-zA-Z0-9]*$/',
    );
  }
};

export const validateFirstLetterUpper = name => {
  if (!/^[A-Z]/.test(name)) {
    throw new Error('invalid format. first letter must be in UpperCase');
  }
};

export const validateFirstLetterLower = name => {
  if (!/^[a-z]/.test(name)) {
    throw new Error('invalid format. first letter must be in LowerCase');
  }
};

export const validateName = name => {
  if (name !== name.trim()) {
    throw new Error('invalid format. spaces is not allowed');
  }

  if (!name.length) {
    throw new Error('must be not empty');
  }
};

export const validateFileIsNew = (dir, template) => {
  const files = glob.sync(path.join(dir, template));

  if (files.length) {
    const prepare = file => colors.red(path.relative(dir, file));

    throw new Error(`files [${files.map(prepare).join(', ')}] already exists!`);
  }
};

export const validate = validator => (...args) => {
  try {
    return validator(...args);
  } catch (err) {
    return err.message;
  }
};
