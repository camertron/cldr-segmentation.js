[![Build Status](https://travis-ci.org/camertron/cldr-segmentation.js.svg?branch=master)](https://travis-ci.org/camertron/cldr-segmentation.js)

cldr-segmentation
===

Text segmentation library for JavaScript.

## What is this thing?

This library provides CLDR-based text segmentation capabilities in JavaScript. Text segmentation is the process of identifying word, sentence, and other boundaries in a text. The segmentation rules are published by the Unicode consortium as part of the Common Locale Data Repository, or CLDR, and made freely available to the public.

## Why not just split on spaces or periods?

Good question. Most of the time, that'll probably work fine. However, it's not always obvious where words or sentences should start or end. Consider this sentence:

```text
I like Mrs. Murphy. She's nice.
```

Splitting only on periods will give you `["I like Mrs. ", "Murphy. ", "She's nice."]`, which probably isn't what you wanted - the period after `Mrs` doesn't indicate the end of the sentence.

In addition, other languages use different segmentation rules than English. For example, identifying sentence boundaries in Japanese is a little more difficult because sentences tend to end with `\u3002` - the ideographic full stop - as opposed to a period. The CLDR contains support for hundreds of languages, meaning you don't have to consider every language when dealing with international text.

## Examples

Cldr-segmentation is published as both a UMD module and an ES6 module, meaning it should work in node via `require` or `import` and the browser via a `<script>` tag. In the browser, use `window.cldrSegmentation` to access the library's functionality.

UMD module:

```javascript
const cldrSegmentation = require("cldr-segmentation");
```

ES6 module:

```javascript
import * as cldrSegmentation from 'cldr-segmentation'
```

### Sentence Segmentation

```javascript
cldrSegmentation.sentenceSplit("I like Mrs. Murphy. She's nice.");
// => ["I like Mrs. ", "Murphy. ", "She's nice."]
```

You'll notice that `Mrs.` was treated as the end of a sentence. To avoid this, use the suppressions for the language you care about. Suppressions are essentially arrays of strings. Each string represents a series of characters after which there should _not_ be a break. Using the English suppressions for the example above yields better results:

```javascript
var supp = cldrSegmentation.suppressions.en;
cldrSegmentation.sentenceSplit("I like Mrs. Murphy. She's nice.", supp);
// => ["I like Mrs. Murphy. ", "She's nice."]
```

If you'd like to iterate over each sentence instead of splitting, use a `BreakIterator`:

```javascript
var breakIter = new cldrSegmentation.BreakIterator(supp);
var str = "I like Mrs. Murphy, she's nice.";

breakIter.eachSentence(str, (sentence, start, stop) => {
  // do something
});
```

Suppressions for all languages are available via `cldrSegmentation.suppressions.all`.

## Other Types of Segmentation

Word, line, and grapheme cluster segmentation are supported:

```javascript
cldrSegmentation.wordSplit("I like Mrs. Murphy. She's nice.");
// => ["I", " ", "like", " ", "Mrs",  ".", " ", "Murphy", ".", "She's", " ", "nice", "."]
```

Also available are the `lineSplit` and `graphemeSplit` functions.

When using a break iterator:

```javascript
var breakIter = new cldrSegmentation.BreakIterator(supp);
var str = "I like Mrs. Murphy, she's nice.";

breakIter.eachWord(str, (word, start, stop) => {
  // do something
});
```

Also available are the `eachLine` and `eachGraphemeCluster` functions.

## Custom Suppressions

Suppressions are just strings after which a break should not occur. This library comes with a set of common suppressions for a variety of languages, but you may want to add your own. Suppression objects can be merged. For example, here's how to add "Dr." to the set of English suppressions:

```javascript
var customSupps = cldrSegmentation.Suppressions.create(['Dr.']);
var supps = cldrSegmentation.suppressions.en.merge(customSupps);
cldrSegmentation.sentenceSplit("We love Dr. Strange. He's cool.", supps);
```

## Custom Suppression Objects

Suppression objects are just plain 'ol Javascript objects with a single `shouldBreak` function that returns a boolean. The function is passed a cursor object positioned at the index of the proposed break. Cursors deal exclusively with Unicode codepoints, meaning your custom suppression logic will need to be implemented in those terms. For example, let's create a custom suppression function that doesn't allow breaks after sentences that end with the letter 't'.

```javascript
class TeeSuppression {
  shouldBreak(cursor) {
    var position = cursor.logicalPosition;

    // skip backwards past spaces and periods
    do {
      let cp = cursor.getCodePoint(position);
      position --;
    } while (cp === 32 || cp === 46);

    // we skipped one too many in the loop
    position ++;

    // if the ending character is 't', return false;
    // otherwise return true
    return cursor.getCodePoint(position) !== 116;
  }
}
```

Note that you don't have to use ES6 classes. It's equally valid to create a simple object:

```javascript
let teeSuppression = {
  shouldBreak: (cursor) => {
    // logic here
  }
}
```

## Running Tests

Tests are written in Jasmine and can be executed via [jasmine-node](https://github.com/mhevery/jasmine-node):

1. `npm install -g jasmine-node`
2. `jasmine-node spec`

## Authors

Written and maintained by Cameron C. Dutro ([@camertron](https://github.com/camertron)).

## License

Copyright 2017 Cameron Dutro, licensed under the MIT license.
