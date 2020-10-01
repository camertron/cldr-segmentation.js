suppressions['it'] = ( () => {
  let supp = Suppressions.create([
    'N.B.',
    'N.d.A.',
    'N.d.T.',
    'N.d.E.',
    'div.',
    'd.p.R.',
    'd.C.',
    'dott.',
    'dr.',
    'a.C.',
    'arch.',
    'ag.',
    'avv.',
    'all.',
    'fig.',
    'c.c.p.',
    'Cfr.',
    'C.P.',
    'vol.',
    'ver.',
    'Geom.',
    'O.d.G.',
    'S.p.A.',
    'S.M.A.R.T.',
    'S.A.R.',
    'Sig.',
    'rag.',
    'Mod.',
    'pag.',
    'p.',
    'tav.',
    'tab.',
    'DC.',
    'D.',
    'mitt.',
    'Ing.',
    'int.',
    'on.',
    'L.',
    'Ltd.',
    'Liv.',
    'U.S.',
    'sez.'
  ]);

  if (customSuppressions['it']) {
    supp = supp.merge(customSuppressions['it']);
  }

  supp.lock();
  return supp;
})();