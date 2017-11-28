class Rule {
  constructor(left, right, options = {}) {
    this.left = left;
    this.right = right;
    this.isBreak = options.isBreak;
    this.id = options.id;
  }

  match(cursor) {
    let leftMatch = this.matchSide(this.left, cursor.text, cursor.position);

    if (leftMatch == undefined) {
      return null;
    }

    let leftMatchOffset = this.offset(leftMatch, cursor.position);
    let rightMatch = this.matchSide(this.right, cursor.text, leftMatchOffset[1]);

    if (rightMatch == undefined) {
      return null;
    }

    let rightMatchOffset = this.offset(rightMatch, leftMatchOffset[1]);
    let offset = [leftMatchOffset[0], rightMatchOffset[1]];
    let position = leftMatchOffset[1];

    return new RuleMatch(this, offset, position);
  }

  // private

  offset(match, defaultValue) {
    if (match != undefined) {
      return [match.index, match.index + match[0].length];
    } else {
      return [defaultValue, defaultValue];
    }
  }

  matchSide(side, text, position) {
    if (side != undefined) {
      // Duplicate the regex with the global flag set. This is required
      // because exec() is used below, which is the only regex matching
      // function that will allow us to start matching at an offset other
      // than zero (by setting lastIndex). Yes, Javascript is dumb. Use Ruby.
      let newSide = new RegExp(side.source, side.flags + 'g');
      newSide.lastIndex = position;

      let sideMatch = newSide.exec(text);

      if (sideMatch != undefined && sideMatch.index == position) {
        return sideMatch;
      }
    }
  }
}
