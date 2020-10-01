( () => {
  let path = require('path');
  let dist = path.normalize(path.join(__dirname, '..', 'dist'));

  if (module.paths.indexOf(dist) < 0) {
    module.paths.push(dist);
  }

  let cldrSegmentation = require('cldr-segmentation');
  let englishSuppressions = cldrSegmentation.suppressions.en;

  let BreakIterator = cldrSegmentation.BreakIterator;

  let collect = (iter, funcName, str) => {
    let results = [];

    iter[funcName](str, (substr, start, stop) => {
      results.push([substr, start, stop]);
    });

    return results;
  }

  let collectSubstrings = (iter, funcName, str) => {
    let wordsAndIndices = collect(iter, funcName, str);
    let results = [];

    wordsAndIndices.forEach( (arr) => {
      results.push(arr[0]);
    });

    return results;
  }

  describe('BreakIterator', () => {
    describe("#eachSentence", () => {
      let iterator = new BreakIterator();

      it('splits a simple string into sentences', () => {
        let str = 'The. Quick. Brown. Fox.';

        expect(collectSubstrings(iterator, 'eachSentence', str)).toEqual(
          ['The. ', 'Quick. ', 'Brown. ', 'Fox.']
        );
      });

      it('does not split on commas, for example', () => {
        let str = 'The. Quick, brown. Fox.';

        expect(collectSubstrings(iterator, 'eachSentence', str)).toEqual(
          ['The. ', 'Quick, brown. ', 'Fox.']
        );
      });

      it('does not split periods in the midst of other letters, eg. in a URL', () => {
        let str = 'Visit us. Go to http://foo.bar.com.';

        expect(collectSubstrings(iterator, 'eachSentence', str)).toEqual(
          ["Visit us. ", "Go to http://foo.bar.com."]
        );
      });

      it('splits on sentences that end with other kinds of punctuation', () => {
        let str = 'Help us translate! Speak another language? You really, really rock.';

        expect(collectSubstrings(iterator, 'eachSentence', str)).toEqual([
          'Help us translate! ',
          'Speak another language? ',
          'You really, really rock.'
        ]);
      });

      describe('with English suppressions', () => {
        let iterator = new BreakIterator(englishSuppressions);

        it('does not split on certain abbreviations like Mr. and Mrs.', () => {
          let str = "I really like Mrs. Patterson. She's nice.";

          expect(collectSubstrings(iterator, 'eachSentence', str)).toEqual([
            "I really like Mrs. Patterson. ",
            "She's nice."
          ]);
        });
      });

      describe('without suppressions', () => {
        it('splits on certain abbreviations like Mr. and Mrs. (use suppressions to avoid this behavior)', () => {
          let str = "I really like Mrs. Patterson. She's nice.";

          expect(collectSubstrings(iterator, 'eachSentence', str)).toEqual([
            "I really like Mrs. ",
            "Patterson. ",
            "She's nice."
          ]);
        });
      });
    });

    describe('#eachWord', () => {
      let iterator = new BreakIterator();

      it('splits a simple string into words', () => {
        let str = 'the quick brown fox';

        expect(collectSubstrings(iterator, 'eachWord', str)).toEqual(
          ['the', ' ', 'quick', ' ', 'brown', ' ', 'fox']
        );
      });

      it('breaks around periods', () => {
        let str = 'The. Quick. Brown. Fox.';

        expect(collectSubstrings(iterator, 'eachWord', str)).toEqual([
          'The', '.', ' ', 'Quick', '.', ' ', 'Brown', '.', ' ', 'Fox', '.'
        ]);
      });

      it('does not break at apostrophes', () => {
        let str = "I like cats. They're cute.";

        expect(collectSubstrings(iterator, 'eachWord', str)).toEqual([
          'I', ' ', 'like', ' ', 'cats', '.', ' ', "They're", ' ', 'cute', '.'
        ]);
      });
    });
  });
})();
