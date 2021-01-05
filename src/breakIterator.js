var utfstring = require('utfstring');

if (utfstring == null && typeof window !== 'undefined' && window !== null) {
  utfstring = window.UtfString;
}

export class BreakIterator {
  constructor(suppressions) {
    this.suppressions = suppressions;
  }

  eachSentence(str, callback) {
    let ruleSet = this.ruleSetFor('sentence');
    this.eachBoundary(ruleSet, str, callback);
  }

  eachWord(str, callback) {
    let ruleSet = this.ruleSetFor('word');
    this.eachBoundary(ruleSet, str, callback);
  }

  eachGraphemeCluster(str, callback) {
    let ruleSet = this.ruleSetFor('grapheme');
    this.eachBoundary(ruleSet, str, callback);
  }

  eachLine(str, callback) {
    let ruleSet = this.ruleSetFor('line');
    this.eachBoundary(ruleSet, str, callback);
  }

  // private

  eachBoundary(ruleSet, str, callback) {
    let start = 0;
    let current, next;

    ruleSet.eachBoundary(str, (boundary) => {
      // this replicates the same behavior as an each_cons(2) enumerator in Ruby
      if (current == undefined) {
        current = boundary;
        return;
      } else if (next == undefined) {
        next = boundary;
      } else {
        current = next;
        next = boundary;
      }

      callback(str.substring(current, next), current, next);
    });
  }

  ruleSetFor(boundaryType) {
    let ruleSetCache = this.getRuleSetCache();

    if (ruleSetCache[boundaryType] === undefined) {
      ruleSetCache[boundaryType] = RuleSet.create(
        boundaryType, this.suppressions
      );
    }

    return ruleSetCache[boundaryType];
  }

  getRuleSetCache() {
    if (this.ruleSetCache === undefined) {
      this.ruleSetCache = {};
    }

    return this.ruleSetCache;
  }
}
