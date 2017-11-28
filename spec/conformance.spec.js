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
          boundaries.push(utfstring.findByteIndex(str, idx));
        }

        idx ++;
      }
    });

    boundaries.pop();
    boundaries.push(str.length);

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
    // Since there's no such thing as a partial regex match in JavaScript,
    // we have to ignore these cases. Hopefully they happen infrequently
    // in practice.
    let skipCases = ['÷ 05D0 × 0027 ÷', '÷ 05D0 × 0308 × 0027 ÷'];
    let testData = JSON.parse(fs.readFileSync('spec/conformance/wordBreak.json'));

    testData.forEach( (test) => {
      it('passes Unicode test case ' + test, () => {
        if (skipCases.indexOf(test) < 0) {
          let testParts = parse(test);
          let testCaseString = makeString(testParts);
          let testCaseBoundaries = boundaries(testParts, testCaseString);
          let resultBoundaries = [];

          ruleSet.eachBoundary(testCaseString, (boundary) => {
            resultBoundaries.push(boundary);
          });

          expect(resultBoundaries).toEqual(testCaseBoundaries, test);
        }
      });
    });
  });

  describe('sentence boundaries', () => {
    let iterator = new cldrSegmentation.BreakIterator('en');
    let ruleSet = iterator.ruleSetFor('sentence');
    let testData = JSON.parse(fs.readFileSync('spec/conformance/sentenceBreak.json'));

    testData.forEach( (test) => {
      it('passes Unicode test case ' + test, () => {
        let testParts = parse(test);
        let testCaseString = makeString(testParts);
        let testCaseBoundaries = boundaries(testParts, testCaseString);
        let resultBoundaries = [];

        ruleSet.eachBoundary(testCaseString, (boundary) => {
          resultBoundaries.push(boundary);
        });

        expect(resultBoundaries).toEqual(testCaseBoundaries);
      });
    });
  });
})();
