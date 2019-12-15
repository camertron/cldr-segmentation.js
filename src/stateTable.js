const BOF_REQUIRED_FLAG = 2;

class StateTable {
  constructor(values, flags) {
    this.values = values;
    this.flags = flags;
  }

  get(idx) {
    return this.values[idx];
  }

  isBofRequired() {
    return (this.flags & BOF_REQUIRED_FLAG) != 0;
  }
}
