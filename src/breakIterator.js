export class BreakIterator {
  constructor(locale, uliExceptions = []) {
    this.locale = locale;
    this.uliExceptions = uliExceptions;
  }

  eachSentence(str, callback) {
    let ruleSet = this.ruleSetFor('sentence');
    this.eachBoundary(ruleSet, str, callback);
  }

  eachWord(str, callback) {
    let ruleSet = this.ruleSetFor('word');
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
    return new RuleSet(
      this.locale, this.rulesFor(boundaryType),
      boundaryType, this.uliExceptions
    );
  }

  rulesFor(boundaryType) {
    switch (boundaryType) {
      case 'sentence':
        return sentenceBreakRuleSet;
      case 'word':
        return wordBreakRuleSet;
      default:
        throw new Error("Rule set named '" + boundaryType + "' could not be found.");
    }
  }
}
