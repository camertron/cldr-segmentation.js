export class NullSuppressions {
  static instance;

  constructor() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = this;
  }

  shouldBreak(_cursor) {
    return true;
  }
}
