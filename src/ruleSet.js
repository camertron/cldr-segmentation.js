export class RuleSet {
  static create(boundaryType, suppressions) {
    return new RuleSet(
      StateMachine.getInstance(boundaryType), suppressions
    );
  }

  constructor(stateMachine, suppressions) {
    this.stateMachine = stateMachine;
    this.suppressions = suppressions || new NullSuppressions();
  }

  eachBoundary(str, callback) {
    let cursor = new Cursor(str);

    // Let the state machine find the first boundary for the line
    // boundary type. This helps pass nearly all the Unicode
    // segmentation tests, so it must be the right thing to do.
    // Normally the first boundary is the implicit start of text
    // boundary, but potentially not for the line rules?
    if (this.stateMachine.boundaryType !== 'line') {
      callback(0);
    }

    while (!cursor.isEos()) {
      this.stateMachine.handleNext(cursor);

      if (this.suppressions.shouldBreak(cursor)) {
        callback(cursor.actualPosition);
      }
    }
  }

  getBoundaryType() {
    return this.stateMachine.boundaryType;
  }
}
