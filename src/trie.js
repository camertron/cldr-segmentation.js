class Node {
  constructor(value, children) {
    this.value = value;
    this.children = children || {};
  }

  setChild(key, child) {
    this.children[key] = child;
  }

  getChild(key) {
    return this.children[key];
  }

  copy() {
    let childrenCopy = {};

    for (const key in this.children) {
      childrenCopy[key] = this.children[key].copy();
    }

    return new Node(this.value, childrenCopy);
  }

  forEach(callback) {
    this._forEach(callback, []);
  }

  _forEach(callback, path) {
    if (this.value) {
      callback(path, this.value);
    }

    for (const key in this.children) {
      this.children[key]._forEach(callback, [...path, key]);
    }
  }
}

class Trie {
  constructor(rootNode) {
    this.root = rootNode || new Node();
    this.locked = false;
  }

  add(key, value) {
    if (this.locked) {
      throw 'Cannot add items to a locked trie'
    }

    let current = this.root;

    for (let i = 0; i < key.length; i ++) {
      let next = current.getChild(key[i]);

      if (next) {
        current = next;
      } else {
        let newNode = new Node();
        current.setChild(key[i], newNode);
        current = newNode;
      }
    }

    current.value = value;
  }

  lock() {
    this.locked = true;
  }

  copy() {
    return new Trie(this.root.copy());
  }

  forEach(callback) {
    this.root.forEach(callback);
  }

  merge(otherTrie) {
    let result = this.copy();

    otherTrie.forEach((key, value) => {
      result.add(key, value);
    });

    return result;
  }
}
