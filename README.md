# Function Path

[![npm](https://img.shields.io/npm/v/function-path.svg)](https://www.npmjs.com/package/function-path)
[![license](https://img.shields.io/github/license/sbstjn/function-path.svg)](https://github.com/sbstjn/function-path/blob/master/LICENSE.md)
[![CircleCI](https://img.shields.io/circleci/project/github/sbstjn/function-path.svg)](https://circleci.com/gh/sbstjn/function-path)
[![Coveralls](https://img.shields.io/coveralls/sbstjn/function-path.svg)](https://coveralls.io/github/sbstjn/function-path)

With `function-path` you can deep link into functions and nested objects.

## Install

```
$ > yarn add function-path
```

```
$ > npm install function-path
```

## Usage

Let's say you have a file `scripts/output.js` with the following contents:

```js
function handler () {
  return 'yeah'
}

module.exports.nested = { handler }
```

You can access the `handler` function using `function-path` with `scripts/output.nested.handler`:

```js
const handler = require('function-path').require('scripts/output.nested.handler')
```

## License

Feel free to use the code, it's released using the [MIT license](LICENSE.md).

## Contribution

You are more than welcome to contribute to this project! 😘 🙆

To make sure you have a pleasant experience, please read the [code of conduct](CODE_OF_CONDUCT.md). It outlines core values and believes and will make working together a happier experience.

