let split = (breakIter, funcName, str) => {
  let result = [];

  breakIter[funcName](str, (text, _start, _stop) => {
    result.push(text);
  });

  return result;
};

export const wordSplit = (str, suppressions) => {
  return split(new BreakIterator(suppressions), 'eachWord', str);
};

export const sentenceSplit = (str, suppressions) => {
  return split(new BreakIterator(suppressions), 'eachSentence', str);
};

export const graphemeSplit = (str, suppressions) => {
  return split(new BreakIterator(suppressions), 'eachGraphemeCluster', str);
};

export const lineSplit = (str, suppressions) => {
  return split(new BreakIterator(suppressions), 'eachLine', str);
};
