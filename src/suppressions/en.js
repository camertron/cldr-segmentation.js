suppressions['en'] = ( () => {
  let supp = Suppressions.create([
    'L.',
    'Long.',
    'Link.',
    'Lib.',
    'Lt.',
    'Lev.',
    'Alt.',
    'All.',
    'Approx.',
    'Act.',
    'Aug.',
    'Abs.',
    'A.',
    'Adj.',
    'Adv.',
    'AD.',
    'AB.',
    'AA.',
    'As.',
    'E.',
    'Ex.',
    'Exec.',
    'Est.',
    'Ed.',
    'Etc.',
    'O.',
    'Ok.',
    'Org.',
    'Or.',
    'OK.',
    'Op.',
    'On.',
    'Maj.',
    'Mart.',
    'Mar.',
    'Misc.',
    'Min.',
    'MR.',
    'M.',
    'Mrs.',
    'Mr.',
    'Md.',
    'Mt.',
    'Mgr.',
    'Ms.',
    'Mb.',
    'P.O.',
    'P.M.',
    'P.V.',
    'Prof.',
    'Pro.',
    'Ph.D.',
    'Phys.',
    'PC.',
    'Pvt.',
    'PP.',
    'J.D.',
    'J.K.',
    'J.B.',
    'Jam.',
    'Jan.',
    'Job.',
    'Joe.',
    'Jun.',
    'Card.',
    'Cap.',
    'Capt.',
    'Cont.',
    'Conn.',
    'Col.',
    'Comm.',
    'C.O.D.',
    'C.F.',
    'Dec.',
    'Def.',
    'Dept.',
    'DC.',
    'D.',
    'Do.',
    'Diff.',
    'Sept.',
    'Sep.',
    'S.',
    'Sgt.',
    'Sq.',
    'Hat.',
    'Hz.',
    'Hon.B.A.',
    'G.',
    'Gb.',
    'Go.',
    'By.',
    'B.',
    'Var.',
    'VS.',
    'N.V.',
    'N.Y.',
    'Num.',
    'Nov.',
    'Nr.',
    'Up.',
    'U.',
    'Fn.',
    'Feb.',
    'Fri.',
    'F.',
    'Z.',
    'Kb.',
    'K.',
    'I.',
    'In.',
    'Id.',
    'Is.',
    'exec.',
    'X.',
    'vs.',
    'R.L.',
    'R.T.',
    'Rev.',
    'Rep.',
    'Yr.',
    'pp.',
    'To.',
    'T.',
    'Q.',
    'a.m.'
  ]);

  if (customSuppressions['en']) {
    supp = supp.merge(customSuppressions['en']);
  }

  supp.lock();
  return supp;
})();