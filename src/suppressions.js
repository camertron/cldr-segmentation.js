export const suppressions = {};

export class Suppressions {
  static create(list) {
    let forwardTrie = new Trie();
    let backwardTrie = new Trie();

    list.forEach((elem) => {
      let codePoints = utfstring.stringToCodePoints(elem);
      forwardTrie.add(codePoints, true);
      backwardTrie.add(codePoints.reverse(), true);
    });

    return new Suppressions(forwardTrie, backwardTrie, list);
  }

  constructor(forwardTrie, backwardTrie, list) {
    this.forwardTrie = forwardTrie;
    this.backwardTrie = backwardTrie;
    this.list = list;
  }

  lock() {
    this.forwardTrie.lock();
    this.backwardTrie.lock();
  }

  merge(otherSupp) {
    return new Suppressions(
      this.forwardTrie.merge(otherSupp.forwardTrie),
      this.backwardTrie.merge(otherSupp.backwardTrie),
      [...this.list, ...otherSupp.list]
    )
  }

  shouldBreak(cursor) {
    var idx = cursor.logicalPosition;

    // consider case when a space follows the '.'
    // (so we handle i.e. "Mr. Brown")
    if (cursor.getCodePoint(idx - 1) == 32) {
      idx -= 2;
    }

    var node = this.backwardTrie.root;
    var found;

    while (true) {
      if (idx < 0 || idx >= cursor.length) {
        found = false;
        break;
      }

      node = node.getChild(cursor.getCodePoint(idx));

      if (node == undefined) {
        found = false;
        break;
      }

      if (node.value) {
        found = true;
        break;
      }

      idx --;
    }

    if (idx != 0 && cursor.getCodePoint(idx - 1) != 32) {
      return true;
    }

    if (!found) {
      return true;
    }

    node = this.forwardTrie.root;

    while (true) {
      if (idx >= cursor.length) {
        return true;
      }

      node = node.getChild(cursor.getCodePoint(idx));

      if (node == undefined) {
        return true;
      }

      if (node.value) {
        return false;
      }

      idx ++;
    }
  }
}
