var cldrSegmentation = require('./dist/cldr-segmentation.js');
var breakIter = new cldrSegmentation.BreakIterator(cldrSegmentation.suppressions.en);
var str = "I like Mrs. Patterson, she's nice.";

breakIter.eachSentence(str, function(str, start, stop) {
  console.log("'" + str + "': " + start + ", " + stop);
});

breakIter.eachWord(str, function(str, start, stop) {
  console.log("'" + str + "': " + start + ", " + stop);
});
