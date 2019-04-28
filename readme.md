# ⌘ ReCli generator

> Powerful but simple cli boilerplate generator

* **Clear**: Human readable config file do what you mean
* **Useful**: Can insert code in already existing modules
* **Flexible**: Can transform reuse and extend answers on the fly

## Table of Contents
-   [Motivation](#motivation)
-   [Install](#install)
-   [Usage](#usage)
-   [Examples & Demos](./examples/generators)
-   [API](#api)
-   [Contribute](#contribute)
-   [License](#license)


## Motivation
Reduce file creation routine from dev process for one side. From other is to increase the code quality by automating new code injection. It allows you to have strict code agreements cross over their project, and decrease the onboarding process.

## Install
```sh
$ npm install --save @recli/cli
```
or if you use yarn
```sh
$ yarn add @recli/cli
```

After install you can start using it
```javascript
// using ES6 modules
import mitt from 'mitt'

// using CommonJS modules
const { cliOf } = require("@recli/cli");
```

## Usage
On init ou must pass [module](https://nodejs.org/api/globals.html#globals_module) to second argument.

For work with user inputs used [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/#questions). You can freely use it api [his API](https://github.com/SBoudrias/Inquirer.js/#questions) as is.


```javascript
cliOf('Create something', module) // global node.js module
  .ask({
    name: 'variableName',
    message: 'How we name it?',
    type: 'input'
  })
```

## API

Full API for generators are here:

```js
const { cliOf, useImport, usePath, useCustom } = require("@recli/cli");

cliOf('Create reducer', module)
  .ask({
    name: 'reducerName',
    message: 'Reducer name',
    type: 'input'
  })
  .setKey('key')
  .ask({
    name: 'model',
    message: 'Reducer data model',
    type: 'input'
  })
  .setAnswers((answers) => {
    // extend answers object with new data
    return {
      reducerName: answers.reducerName,
      model: answers.model,
      upperCaseReducerName: answers.reducerName.toUpperCase(),
      otherVariable: 'My name is John Cena',
    }
  });
  .move(['./reducer.template.js'], '../../fake/destination')
  .rename('../../fake/destination/reducer.template.js', (answers) => {
    return `${answers.reducerName}.js`;
  })
  .useHooks('../../fake/destination/store.js', (answers) => [
    useImport(`./${answers.file2}`, answers.file2),
    usePath(`./${answers.file2}`),
    useCustom({regex, content}),
  ])
  .ask({
    message: 'Witch styles do you use?',
    type: 'list',
    name: 'style',
    choices: [
      {name: 'style.template.scss', value: 'Scss'},
      {name: 'style.template.less', value: 'Less'},
    ],
  })
  .call((answers) => {
    // do any wiered stuff you need,
    // use setAnswers other vice to store result
    return axios.get(`./ping-hook/?${answers.style}`)
  })
  .check((answers, goTo) => {
    if (answers.continue) {
      goTo('begining')
    }
  })
  .move((answers) => [
    {from: './' + answers.style, to: 'style/' + answers.style}
  ], '../../fake/destination')
```

**Notes** all callback functions can be async or return promise, to apply pause on the task.

## Formatters & validators

Case conversion:
```js
var { to } = require('@recli/cli')

to.camel('what_the_heck')      // "whatTheHeck"
to.capital('what the heck')    // "What The Heck"
to.constant('whatTheHeck')     // "WHAT_THE_HECK"
to.dot('whatTheHeck')          // "what.the.heck"
to.inverse('whaT tHe HeCK')    // "WHAt ThE HeCK"
to.lower('whatTheHeck')        // "what the heck"
to.pascal('what.the.heck')     // "WhatTheHeck"
to.sentence('WHAT THE HECK.')  // "What the heck."
to.slug('whatTheHeck')         // "what-the-heck"
to.snake('whatTheHeck')        // "what_the_heck"
to.space('what.the.heck')      // "what the heck"
to.title('what the heck')      // "What the Heck"
to.upper('whatTheHeck')        // "WHAT THE HECK"
```

Validators:
```js
var { validation } = require('@recli/cli')

cliOf('validation', module)
  // adding question
  .ask({
    name: 'libraryName',
    message: 'Please enter the name of module you want to import.',
    type: 'input',
    validate: validation.validate([
      validation.isNoWhitespace,
      validation.isDashFormat,
      validation.isFirstLetterUpper,
      validation.isFirstLetterLower,
      validation.isFileIsNew('directory/**/components'),
      validation.isCamelFormat
    ]),
    default: 'lodash'
  })
```

## ⚛️ Hooks

The core feature all around is code injectors to existed files. We call it hooks, to be on hype.

It works like so. Let's imagine you have a file called `router.js`. After new `route` generation you want to append new route here.

So, let's add some hook to the `router.js`,

```js
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { HomeRoute } from './home-route';
/* recli:use-import */

function AppRouter() {
  return (
    <Router>
        <Route path="/about/" component={HomeRoute} />
        {/* recli:use-route */}
      </div>
    </Router>
  );
}

export default AppRouter;
```

So step after generation we expect to have like this

```js
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { HomeRoute } from './home-route';
import { NewRoute } from './new-route';
/* recli:use-import */

function AppRouter() {
  return (
    <Router>
        <Route path="/about/" component={HomeRoute} />
        <Route path="/new-route/" component={NewRoute} />
        {/* recli:use-route */}
      </div>
    </Router>
  );
}

export default AppRouter;
```

To make it done we have hooks:

- useImport -> useImport(`{ NewRoute }`, `./new-route`) -> import { NewRoute } from './new-route';
- usePath -> usePath(`./new-route`) -> `'./new-route',`
- useModuleName -> useModuleName(`NodeModule`) -> `NodeModule,`
- useCustom -> useCustom({ regex, content }) -> content

they are applied to file by

```js
  cliOf('My awesome task')
    ...
    .useHooks('path', (answers) => [
      useImport(`{${answers.camelCaseName}}`, `./${answers.name}.js`),
      usePath(`./${answers.name}.js`),
      useCustom({
        regex: /(\s*)(\/\*.*recli:use-module-name.*\*\/)/,
        content: `$1${moduleName}$1$2,`,
      }),
    ])
```

## 🚀 Setup

```js
npm install @recli/cli
// or
yarn add @recli/cli
```

it's possible to use it by global setup

```js
npm install @recli/cli -g
// or
yarn add @recli/cli -g
```

## Placing generators right way

The default agreements you should have `generators` folder at project root with your own generators are inside folders.

Other words, your generators should match the path: `generators/**/index*`

To override default behavior is simple (following same markup: https://storybook.js.org/docs/guides/guide-react/)

To do that, create a file at `.recli/config.js` with the following content:

```js
const { configure } = require("@recli/cli");

function loadStories() {
  require("../generators/**/index*");
  // You can require as many stories as you need.
}

configure(loadStories, module);
```

But the full file path will resolved to `node.js` module and will execute it.

Let's say you wan't to have generators like stand alone module, to share it cross over the projects you have. Let's say it have name: `@recli/xxx-generators`

The code markup can looks like:

- create a file at `index.js` with the following content:

  ```js
  const { configure } = require("recli");

  function loadStories() {
    require("./generators/**/*.gen.js");
  }

  configure(loadStories, module);
  ```

- make sure you have `package.json` main section like that:

  ```json
  "main": "index.js",
  ```

- the @recli/cli will try to find the generators in that node module by using the `path` you prodive at `index.js`

## Tech notes

You can't use modern syntax different to Node.js you have installed. Cause we doesn't use `babel`, `webpack` inside.

`@recli/cli` is written by using TS. So you will receive the extra IDE help by using TS for generators. But, you have to compile them. It should be simple for stand alone set of generators.

---

[MIT](./LICENSE)
