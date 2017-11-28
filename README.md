cldr-segmentation
===

Text segmentation library for JavaScript.

## What is this thing?

This library provides CLDR-based text segmentation capabilities in JavaScript. Text segmentation is the process of identifying word, sentence, and other boundaries in a text. The segmentation rules are published by the Unicode consortium as part of the Common Locale Data Repository, or CLDR, and made freely available.

## Why not just split on spaces or periods?

Good question. Most of the time, that'll probably work fine. However, it's not always obvious where words or sentences should start or end. Consider this sentence:

```text
I like Mrs. Murphy. She's nice.
```

Splitting only on periods will give you `["I like Mrs.", " Murphy.", " She's nice."]`, which probably isn't what you wanted - the period after `Mrs` doesn't indicate the end of the sentence.

In addition, other languages use different segmentation rules than English. For example, identifying sentence boundaries in Japanese is a little more difficult because sentences tend to end with `\u3002` - the ideographic full stop - as opposed to a period. The CLDR contains support for hundreds of languages, meaning you don't have to consider every language when dealing with international text.

## Examples

Cldr-segmentation is published as a UMD module meaning it should work in both node via `require` and the browser via a `<script>` tag. In the browser, use the `window.cldrSegmentation` to access the library's functionality.

### Word Segmentation

```javascript
var breakIter = new cldrSegmentation.BreakIterator('en');
var str = "I like Mrs. Murphy, she's nice.";
var results = [];

breakIter.eachSentence(str, function(word, start, stop) {
  results.push([word, start, stop]);
});

// results ==
```

## Running Tests

Tests are written in Jasmine and can be executed via [jasmine-node](https://github.com/mhevery/jasmine-node):

1. `npm install -g jasmine-node`
2. `jasmine-node spec`

## Authors

Written and maintained by Cameron C. Dutro ([@camertron](https://github.com/camertron)).

## License

Copyright 2017 Cameron Dutro, licensed under the MIT license.
