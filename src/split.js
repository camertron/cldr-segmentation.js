let split = (breakIter, funcName, str) => {
  let result = [];

  breakIter[funcName](str, (text, _start, _stop) => {
    result.push(text);
  });

  return result;
};

export const wordSplit = (str, uliExceptions = []) => {
  return split(new BreakIterator(uliExceptions), 'eachWord', str);
};

export const sentenceSplit = (str, uliExceptions = []) => {
  return split(new BreakIterator(uliExceptions), 'eachSentence', str);
};
