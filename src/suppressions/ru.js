suppressions['ru'] = ( () => {
  let supp = Suppressions.create([
    'руб.',
    'янв.',
    'до н. э.',
    'дек.',
    'сент.',
    'тел.',
    'тыс.',
    'февр.',
    'нояб.',
    'н. э.',
    'н.э.',
    'апр.',
    'авг.',
    'окт.',
    'отд.',
    'проф.',
    'кв.',
    'ул.'
  ]);

  if (customSuppressions['ru']) {
    supp = supp.merge(customSuppressions['ru']);
  }

  supp.lock();
  return supp;
})();