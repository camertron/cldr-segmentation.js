( () => {
  let path = require('path');
  let dist = path.normalize(path.join(__dirname, '..', 'dist'));

  if (module.paths.indexOf(dist) < 0) {
    module.paths.push(dist);
  }

  let cldrSegmentation = require('cldr-segmentation');

  describe('#wordSplit', () => {
    it('splits correctly', () => {
      let str = "I like Mrs. Murphy. She's nice.";
      let result = cldrSegmentation.wordSplit(str);

      expect(result).toEqual(
        ['I', ' ', 'like', ' ', 'Mrs', '.', ' ', 'Murphy', '.', ' ', "She's", ' ', 'nice', '.']
      );
    });
  });
})();
