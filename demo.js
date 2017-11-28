var cldrSegmentation = require('./dist/cldr-segmentation.js');
var breakIter = new cldrSegmentation.BreakIterator('en');
var str = "I like Mrs. Murphy, she's nice.";
var results = [];

breakIter.eachWord(str, function(word, start, stop) {
  results.push([word, start, stop]);
});

console.log(results);
