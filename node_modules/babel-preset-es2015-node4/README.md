# babel-preset-es2015-node4 **(DEPRECATED)**

> Babel preset to make node@4 ES2015 compatible.

**DEPRECATED: Use the awesome [babel-preset-env](https://github.com/babel/babel-preset-env)!**

Node@4 has great [ES2015 support](https://nodejs.org/en/docs/es6/),
this module just adds missing features:
- destructing assignment
- rest & default parameters
- modules
- unicode and sticky regular expressions
- spread operator
- function.name

## Does not include regenerator!
[You can **not** blacklist plugins in babel@6.](https://github.com/babel/babel/issues/3016) To avoid cruft, this preset does not include *full* Generators support via regenerator.

If you rely on `%GeneratorPrototype%.return`, `yield *, iterator closing` or `yield *, iterator closing via throw()` (see [compat table](https://kangax.github.io/compat-table/es6/#test-generators)), you will have to `npm install` and include regenerator yourself:

```json
{
	"presets": ["es2015-node4"],
	"plugins": ["transform-regenerator"]
}
```

## Install

```sh
$ npm install --save-dev babel-preset-es2015-node4
```

## Usage

### Via `.babelrc` (recommended)

**.babelrc**

```json
{
  "presets": ["es2015-node4"]
}
```

### Via CLI

```sh
$ babel script.js --preset es2015-node4
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  presets: ['es2015-node4'],
})
```

## License

[MIT](./LICENSE)
