class Cursor {
  constructor(text) {
    this.text = text;
    this.length = text.length;
    this.codepoints = utfstring.stringToCodePoints(text);
    this.reset();
  }

  advance(amount = 1) {
    for (var i = 0; i < amount; i ++) {
      let cp = this.getCodePoint();

      if (cp > 0xFFFF) {
        this.actualPosition += 2;
      } else {
        this.actualPosition ++;
      }

      this.logicalPosition ++;
    }
  }

  retreat(amount = 1) {
    for (var i = 0; i < amount; i ++) {
      this.logicalPosition --;

      let cp = this.getCodePoint();

      if (cp > 0xFFFF) {
        this.actualPosition -= 2;
      } else {
        this.actualPosition --;
      }
    }
  }

  reset() {
    this.logicalPosition = 0;
    this.actualPosition = 0;
  }

  isEos() {
    return this.logicalPosition >= this.codepoints.length;
  }

  getCodePoint(pos = this.logicalPosition) {
    return this.codepoints[pos];
  }

  slice(start, finish) {
    return utfstring.codePointsToString(
      this.codepoints.slice(start, finish)
    );
  }
}
