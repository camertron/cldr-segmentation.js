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
}

class Trie {
  constructor(rootNode) {
    this.root = rootNode || new Node();
  }

  add(key, value) {
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
}
