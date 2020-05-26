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
    let iterator = new cldrSegmentation.BreakIterator();
    let ruleSet = iterator.ruleSetFor('word');
    let testData = JSON.parse(fs.readFileSync('spec/conformance/wordBreak.json'));

    testData.forEach( (test) => {
      it('passes Unicode test case ' + test, () => {
        let testParts = parse(test);
        let testCaseString = makeString(testParts);
        let testCaseBoundaries = boundaries(testParts, testCaseString);
        let resultBoundaries = [];

        ruleSet.eachBoundary(testCaseString, (boundary) => {
          resultBoundaries.push(boundary);
        });

        expect(resultBoundaries).toEqual(testCaseBoundaries, test);
      });
    });
  });

  describe('sentence boundaries', () => {
    let iterator = new cldrSegmentation.BreakIterator();
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

  describe('grapheme cluster boundaries', () => {
    let iterator = new cldrSegmentation.BreakIterator();
    let ruleSet = iterator.ruleSetFor('grapheme');
    let testData = JSON.parse(fs.readFileSync('spec/conformance/graphemeBreak.json'));

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

  describe('line boundaries', () => {
    let iterator = new cldrSegmentation.BreakIterator();
    let ruleSet = iterator.ruleSetFor('line');
    let testData = JSON.parse(fs.readFileSync('spec/conformance/lineBreak.json'));
    let skipCases = [
      '× 002D ÷ 0023 ÷',
      '× 002D × 0308 ÷ 0023 ÷',
      '× 002D ÷ 00A7 ÷',
      '× 002D × 0308 ÷ 00A7 ÷',
      '× 002D ÷ 50005 ÷',
      '× 002D × 0308 ÷ 50005 ÷',
      '× 002D ÷ 0E01 ÷',
      '× 002D × 0308 ÷ 0E01 ÷',
      '× 002C ÷ 0030 ÷',
      '× 002C × 0308 ÷ 0030 ÷',
      '× 200B × 0020 ÷ 002C ÷',
      '× 0065 × 0071 × 0075 × 0061 × 006C × 0073 × 0020 × 002E ÷ 0033 × 0035 × 0020 ÷ 0063 × 0065 × 006E × 0074 × 0073 ÷',
      '× 0061 × 002E ÷ 0032 × 0020 ÷',
      '× 0061 × 002E ÷ 0032 × 0020 ÷ 0915 ÷',
      '× 0061 × 002E ÷ 0032 × 0020 ÷ 672C ÷',
      '× 0061 × 002E ÷ 0032 × 3000 ÷ 672C ÷',
      '× 0061 × 002E ÷ 0032 × 3000 ÷ 307E ÷',
      '× 0061 × 002E ÷ 0032 × 3000 ÷ 0033 ÷',
      '× 0041 × 002E ÷ 0031 × 0020 ÷ BABB ÷',
      '× BD24 ÷ C5B4 × 002E × 0020 ÷ 0041 × 002E ÷ 0032 × 0020 ÷ BCFC ÷',
      '× BD10 ÷ C694 × 002E × 0020 ÷ 0041 × 002E ÷ 0033 × 0020 ÷ BABB ÷',
      '× C694 × 002E × 0020 ÷ 0041 × 002E ÷ 0034 × 0020 ÷ BABB ÷',
      '× 0061 × 002E ÷ 0032 × 3000 ÷ 300C ÷',
      '× 1F1F7 × 1F1FA ÷ 1F1F8 ÷',
      '× 1F1F7 × 1F1FA ÷ 1F1F8 × 1F1EA ÷',
      '× 1F1F7 × 1F1FA × 200B ÷ 1F1F8 × 1F1EA ÷'
    ];

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

          expect(resultBoundaries).toEqual(testCaseBoundaries);
        }
      });
    });
  });
})();
