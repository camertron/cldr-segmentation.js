class RuleSet {
  constructor(locale, rules, boundaryType, uliExceptions = []) {
    this.locale = locale;
    this.rules = rules;
    this.boundaryType = boundaryType;

    this.implicitEndOfTextRule = new Rule(
      /.$/, new RegExp(''), {isBreak: true, id: 9998}
    );

    this.implicitFinalRule = new Rule(
      /./, /./, {isBreak: true, id: 9999}
    );

    if (uliExceptions.length > 0) {
      let regexContents = [];

      uliExceptions.forEach( (exc) => {
        regexContents.push(this.escapeRegex(exc));
      });

      this.exceptionRule = new Rule(
        new RegExp('(?:' + regexContents.join('|') + ')'),
        new RegExp(''),
        {isBreak: false, id: 0}
      );
    }
  }

  eachBoundary(str, callback) {
    let cursor = new Cursor(str);
    let lastBoundary = 0;

    // implicit start of text boundary
    callback(0);

    while (!cursor.isEof()) {
      let match = this.findMatch(cursor);
      let rule = match.rule;

      if (rule.isBreak) {
        callback(match.boundaryPosition);
        lastBoundary = match.boundaryPosition;
      }

      if (match.boundaryPosition == cursor.position) {
        cursor.advance();
      } else {
        cursor.advance(match.boundaryPosition - cursor.position);
      }
    }

    // implicit end of text boundary
    if (lastBoundary != str.ength) {
      callback(str.length);
    }
  }

  // private

  escapeRegex(regexStr) {
    return regexStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  eachRule(callback) {
    if (this.exceptionRule != undefined && this.supportsExceptions()) {
      callback(this.exceptionRule);
    }

    this.rules.forEach(callback);
  }

  supportsExceptions() {
    return this.boundaryType == 'sentence';
  }

  findMatch(cursor) {
    let match = this.findCachedMatch(cursor);

    if (match != undefined) {
      return match;
    } else if (cursor.isEos()) {
      return this.implicitEndOfTextRule.match(cursor);
    } else {
      return this.implicitFinalRule.match(cursor);
    }
  }

  findCachedMatch(cursor) {
    let cachedMatch = cursor.matchCache[cursor.position];

    if (cachedMatch == undefined) {
      let matches = this.matchAll(cursor);

      matches.forEach( (m) => {
        cursor.matchCache[m.boundaryPosition - 1] = m;
      });

      return matches[0];
    } else {
      return cachedMatch;
    }
  }

  matchAll(cursor) {
    let matches = [];

    this.eachRule( (rule) => {
      let match = rule.match(cursor);

      if (match != undefined) {
        matches.push(match);
      }
    });

    return matches;
  }
}
