class CategoryTable {
  constructor(values) {
    this.values = values;
  }

  get(codepoint) {
    return this.find(codepoint)[2];
  }

  // private

  find(codepoint) {
    var lo = 0, hi = this.values.length;

    while (lo <= hi) {
      let mid = Math.floor((hi + lo) / 2);
      let current = this.values[mid];

      if (codepoint < current[0]) {
        hi = mid - 1;
      } else if (codepoint > current[1]) {
        lo = mid + 1;
      } else {
        return current;
      }
    }

    // we should realistically never get here
    return null;
  }
}
