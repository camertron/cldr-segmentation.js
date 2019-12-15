( () => {
  let path = require('path');
  let dist = path.normalize(path.join(__dirname, '..', 'dist'));

  if (module.paths.indexOf(dist) < 0) {
    module.paths.push(dist);
  }

  let cldrSegmentation = require('cldr-segmentation');
  let englishSuppressions = cldrSegmentation.suppressions.en;

  describe('#sentenceSplit', () => {
    it('splits correctly', () => {
      let str = "I like Mrs. Murphy. She's nice.";
      let result = cldrSegmentation.sentenceSplit(str);

      expect(result).toEqual(["I like Mrs. ", "Murphy. ", "She's nice."]);
    });

    it('splits correctly using uli exceptions', () => {
      let str = "I like Mrs. Murphy. She's nice.";
      let result = cldrSegmentation.sentenceSplit(str, englishSuppressions);

      expect(result).toEqual(["I like Mrs. Murphy. ", "She's nice."]);
    });
  });
})();
