class Cursor {
  constructor(text) {
    this.text = text;
    this.reset();
  }

  advance(amount = 1) {
    this.position += amount;
  }

  reset() {
    this.position = 0;
    this.matchCache = {};
  }

  isEof() {
    return this.position >= this.utfLength() - 1;
  }

  isEos() {
    return this.position >= this.text.length - 1;
  }

  // private

  utfLength() {
    return UtfString.length(this.text);
  }
}
