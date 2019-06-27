# convention-caser

```
// Package name: convential-caser
caser.toCamelCase('some string'); // => someString
caser.toUpperCamelCase('some string'); // => SomeString
caser.toKebabCase('some string'); // => some-string
caser.toTrainCase('some string'); // => SOME-STRING
caser.toSnakeCase('some string'); // => some_string
caser.toScreamingSnakeCase('some string'); // => SOME_STRING
caser.toDotCase('some string'); // => some.string
caser.toCamelCase('converts only pascal_cased words', 'pascal-case'); // => converts only pascalCased words
caser.toCamelCase('converts only kebab-cased words', caser.type.kebabCase); // => converts only kebabCased words
```