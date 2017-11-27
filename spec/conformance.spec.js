( () => {
  let path = require('path');
  let dist = path.normalize(path.join(__dirname, '..', 'dist'));

  if (module.paths.indexOf(dist) < 0) {
    module.paths.push(dist);
  }

  let cldrSegmentation = require('cldr-segmentation');
  let utfstring = require('utfstring');
  let fs = require('fs');

  let parse = (testData) => {
    let results = [];

    testData.split(/([÷×])/).forEach( (part) => {
      part = part.trim();

      if (part.length > 0) {
        if (/[÷×]/.test(part)) {
          results.push(part);
        } else {
          results.push(
            utfstring.codePointsToString([parseInt(part, 16)])
          );
        }
      }
    });

    return results;
  };

  let boundaries = (testParts, str) => {
    let idx = 0;
    let boundaries = [];

    testParts.forEach( (part) => {
      if (/[÷×]/.test(part)) {
        if (part == '÷') {
          if (idx >= str.length - 1) {
            boundaries.push(str.length);
          } else {
            boundaries.push(utfstring.findByteIndex(str, idx));
          }
        }

        idx ++;
      }
    });

    return boundaries;
  };

  let makeString = (testParts) => {
    let parts = [];

    for (var idx in testParts) {
      if (idx % 2 == 1) {
        parts.push(testParts[idx]);
      }
    }

    return parts.join('');
  };

  describe('word boundaries', () => {
    let iterator = new cldrSegmentation.BreakIterator('en');
    let ruleSet = iterator.ruleSetFor('word');

    // These cases don't work because they end in single quotes (0027).
    // Conformant implementations (eg ICU) seem to allow partial regex
    // matching, or allow matches to run off the end of the string.
    // Since there's no such thing as a partial regex match in Ruby,
    // we have to ignore these cases. Hopefully they happen infrequently
    // in practice.
    let skipCases = ['÷ 05D0 × 0027 ÷', '÷ 05D0 × 0308 × 0027 ÷'];

    function arraysEqual(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length != b.length) return false;

      // If you don't care about the order of the elements inside
      // the array, you should sort both arrays here.

      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    it('passes all unicode test cases', () => {
      let testData = JSON.parse(fs.readFileSync('spec/conformance/word_break.json'));
      let failed = 0;
      let total = 0;

      testData.forEach( (test) => {
        total ++;
        try {
          if (skipCases.indexOf(test) < 0) {
            let testParts = parse(test);
            let testCaseString = makeString(testParts);
            let testCaseBoundaries = boundaries(testParts, testCaseString);
            let resultBoundaries = [];

            ruleSet.eachBoundary(testCaseString, (boundary) => {
              resultBoundaries.push(boundary);
            });

            if (!arraysEqual(resultBoundaries, testCaseBoundaries)) {
              debugger;
              failed ++;
            }

            expect(resultBoundaries).toEqual(testCaseBoundaries, test);
          }
        } catch(e) {
          failed ++;
        }
      });

      console.log("Failed: " + failed, " Total: " + total);
    });
  });

  // describe('sentence boundaries', () => {
  //   let iterator = new cldrSegmentation.BreakIterator('en');
  //   let ruleSet = iterator.ruleSetFor('sentence');

  //   it('passes all unicode test cases', () => {
  //     let testData = JSON.parse(fs.readFileSync('spec/conformance/sentence_break.json'));

  //     testData.forEach( (test) => {
  //       let testParts = parse(test);
  //       let testCaseBoundaries = boundaries(testParts);
  //       let testCaseString = makeString(testParts);
  //       let resultBoundaries = [];

  //       ruleSet.eachBoundary(testCaseString, (boundary) => {
  //         resultBoundaries.push(boundary);
  //       });

  //       expect(resultBoundaries).toEqual(testCaseBoundaries);
  //     });
  //   });
  // });
})();
