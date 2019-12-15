suppressions['all'] = Suppressions.create(
  ( () => {
    var list = [];

    for (let locale in suppressions) {
      list = list.concat(suppressions[locale].list);
    }

    return list;
  })()
)
