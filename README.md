# Caesar Caser
Simple but powerful utility for case style detection and converting.

## Install
```shell script
npm install caesar-caser --save
```
or if you use Yarn
```shell script
yarn add caesar-caser
```

## Usage
```javascript
const caser = require('caesar-caser');

// Converts string from one specific case to another
caser('fooBarBaz').convert('camel', 'constant'); // => FOO_BAR_BAZ

// Converts string to specific case with autodetection
caser('fooBarBaz').convertTo('pascal'); // => FooBarBaz
caser('FOO_BAR_BAZ').convertTo('kebab'); // => foo-bar-baz
caser('foo_bar_baz').convertTo('sentence'); // => Foo bar baz

// Detects case and return its name
caser('fooBarBaz').detect(); // => camel
caser('FOO_BAR_BAZ').detect(); // => constant
caser('Foo Bar Baz').detect(); // => cap-sentence

// Also you can specify priority case name if passed string is unobvious
// For example string 'foo' can be in camel, kebab, snake and other cases
caser('foo').detect(); // => camel
caser('foo').detect('snake'); // => snake
// But if caser detects exact case this argument will be omitted
caser('fooBarBaz').detect('snake'); // => camel

// Normalizes given string by splitting it to array of lowercased chunks
caser('fooBarBaz').normalize('camel'); // => ['foo', 'bar', 'baz']
```

## Available case rules
| Name             | Example     | Description                                              |
|------------------|-------------|----------------------------------------------------------|
| 'camel'          | fooBarBaz   | Camel case                                               |
| 'pascal'         | FooBarBaz   | Pascal case (sometimes called upper camel or bumpy case) |
| 'kebab'          | foo-bar-baz | Kebab case (also known as dash case)                     |
| 'train'          | FOO-BAR-BAZ | Train case                                               |
| 'snake'          | foo_bar_baz | Snake case (may also be called pothole case)             |
| 'constant'       | FOO_BAR_BAZ | Constant case (also known as screaming snake case)       |
| 'dot'            | foo.bar.baz | Dot case                                                 |
| 'upper-dot'      | FOO.BAR.BAZ | Upper dot case                                           |
| 'sentence'       | Foo bar baz | Sentence case                                            |
| 'cap-sentence'   | Foo Bar Baz | Like the sentence case but every word is capitalized     |
| 'upper-sentence' | FOO BAR BAZ | Like the sentence case but every word is in uppercase    |
| 'lower-sentence' | foo bar baz | Like the sentence case but every word is in lowercase    |

## Maintainers
[Igor Sebelev](https://github.com/adlite)

## License
MIT