( () => {
  let path = require('path');
  let dist = path.normalize(path.join(__dirname, '..', 'dist'));

  if (module.paths.indexOf(dist) < 0) {
    module.paths.push(dist);
  }

  const cldrSegmentation = require('cldr-segmentation');
  const englishSuppressions = cldrSegmentation.suppressions.en;
  const germanSuppressions = cldrSegmentation.suppressions.de;

  describe('#sentenceSplit', () => {
    it('splits correctly', () => {
      let str = "I like Mrs. Murphy. She's nice.";
      let result = cldrSegmentation.sentenceSplit(str);

      expect(result).toEqual(["I like Mrs. ", "Murphy. ", "She's nice."]);
    });

    it('splits correctly using suppressions', () => {
      let str = "I like Mrs. Murphy. She's nice.";
      let result = cldrSegmentation.sentenceSplit(str, englishSuppressions);

      expect(result).toEqual(["I like Mrs. Murphy. ", "She's nice."]);
    });

    it('splits correctly using custom suppressions', () => {
      let str = "I like Dr. Murphy. She's nice.";
      let result = cldrSegmentation.sentenceSplit(str, englishSuppressions);

      expect(result).toEqual(["I like Dr. Murphy. ", "She's nice."]);
    });

    it('splits correctly when a suppression occurs just before a potential break', () => {
      let str = 'Hi, my name is Philipp. Just because I can.';
      let result = cldrSegmentation.sentenceSplit(str, englishSuppressions);

      expect(result).toEqual(['Hi, my name is Philipp. ', 'Just because I can.']);
    });

    it('splits correctly when a German suppression occurs just before a potential break', () => {
      let str = "Dies ist ein test Satz. Und hier ein Zweiter.";
      let result = cldrSegmentation.sentenceSplit(str, germanSuppressions);

      expect(result).toEqual(["Dies ist ein test Satz. ", "Und hier ein Zweiter."]);
    });
  });
})();
