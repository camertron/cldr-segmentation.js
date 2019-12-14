var cldrSegmentation = require('./dist/cldr-segmentation.js');
var breakIter = new cldrSegmentation.BreakIterator('en');
var str = "I like Mrs. Murphy, she's nice.";
var results = [];

breakIter.eachSentence(str, function(str, start, stop) {
  results.push([str, start, stop]);
});

console.log(results);
