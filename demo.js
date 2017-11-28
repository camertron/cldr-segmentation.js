var cldrSegmentation = require('./dist/cldr-segmentation.js');
var breakIter = new cldrSegmentation.BreakIterator('en', cldrSegmentation.uliExceptions.en);
var str = "I like Mrs. Murphy, she's nice.";

breakIter.eachSentence(str, function(word, _start, _stop) {
  console.log(word);
});
