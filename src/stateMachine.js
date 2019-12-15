const START_STATE = 1;
const STOP_STATE = 0;
const NEXT_STATES = 4;
const ACCEPTING = 0;

class StateMachine {
  static getInstance(boundaryType) {
    let cache = StateMachine.getCache();

    if (cache[boundaryType] === undefined) {
      let rsrc = RuleSet[boundaryType];

      cache[boundaryType] = new StateMachine(
        boundaryType,
        new Metadata(rsrc.metadata),
        new StateTable(rsrc.forwardTable.table, rsrc.forwardTable.flags),
        new CategoryTable(rsrc.categoryTable)
      );
    }

    return cache[boundaryType];
  }

  static getCache() {
    if (this.cache === undefined) {
      this.cache = {};
    }

    return this.cache;
  }

  constructor(boundaryType, metadata, ftable, categoryTable) {
    this.boundaryType = boundaryType;
    this.metadata = metadata;
    this.ftable = ftable;
    this.categoryTable = categoryTable;
  }

  handleNext(cursor) {
    var initialPosition = cursor.actualPosition;
    var result = cursor.actualPosition;
    var state = START_STATE;
    var row = this.getRowIndex(state);
    var category = 3;
    var mode = 'run';

    if (this.ftable.isBofRequired()) {
      category = 2;
      mode = 'start';
    }

    while (state != STOP_STATE) {
      if (cursor.isEos()) {
        if (mode === 'stop') {
          break;
        }

        mode = 'stop';
        category = 1;
      } else if (mode === 'run') {
        category = this.categoryTable.get(cursor.getCodePoint());

        if ((category & 0x4000) != 0) {
          category &= ~0x4000;
        }

        cursor.advance();
      } else {
        mode = 'run';
      }

      state = this.ftable.get(row + NEXT_STATES + category);
      row = this.getRowIndex(state);

      if (this.ftable.get(row + ACCEPTING) == -1) {
        // match found
        result = cursor.actualPosition;
      }
    }

    while (cursor.actualPosition != result) {
      cursor.retreat();
    }

    // don't let cursor get stuck
    if (cursor.actualPosition === initialPosition) {
      cursor.advance();
    }

    return result;
  }

  // private

  getRowIndex(state) {
    return state * (this.metadata.getCategoryCount() + 4);
  }
}
