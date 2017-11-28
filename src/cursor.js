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

  isEos() {
    return this.position >= this.text.length - 1;
  }
}
