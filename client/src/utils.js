export const makeWordMap = words =>
  words.reduce(
    (map, word) =>
      word in map
        ? {
            ...map,
            [word]: map[word] + 1
          }
        : {
            ...map,
            [word]: 1
          },
    Object.create(null)
  );

export const wordMapToPairs = wordMap =>
  Object.keys(wordMap).map(key => ({
    text: key,
    value: wordMap[key]
  }));

export const makeFontSizeMapper = scale => word =>
  Math.log2(word.value) * scale;

export const rotate = word => word.value % 360;
