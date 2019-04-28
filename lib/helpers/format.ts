import { toCamelCase } from './case/to-camel-case';
import { toCapitalCase } from './case/to-capital-case';
import { toConstantCase } from './case/to-constant-case';
import { toDotCase } from './case/to-dot-case';
import { toNoCase } from './case/to-no-case';
import { toPascalCase } from './case/to-pascal-case';
import { toSentenceCase } from './case/to-sentence-case';
import { toSlugCase } from './case/to-slug-case';
import { toSnakeCase } from './case/to-snake-case';
import { toSpaceCase } from './case/to-space-case';
import { toUpperCase } from './case/to-upper-case';
import { toLowerCase } from './case/to-lower-case';
import { toInverseCase } from './case/to-inverse-case';

export const to = {
  camel: toCamelCase,
  capital: toCapitalCase,
  constant: toConstantCase,
  dot: toDotCase,
  no: toNoCase,
  pascal: toPascalCase,
  sentence: toSentenceCase,
  slug: toSlugCase,
  snake: toSnakeCase,
  space: toSpaceCase,
  upper: toUpperCase,
  lower: toLowerCase,
  inverse: toInverseCase,
}