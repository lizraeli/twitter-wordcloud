/**
 * @function makeWordMap
 * @param  {string[]} words
 * @return {Object.<string, number>}
 */
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

/**
 * @function wordMapToPairs
 * @param  {Object.<string, number>} wordMap
 * @return {{text: string, value: number}[]}
 */
export const wordMapToPairs = wordMap =>
  Object.keys(wordMap).map(key => ({
    text: key,
    value: wordMap[key]
  }));

/**
 * @function makeFontSizeMapper
 * @param  {number} scale
 * @return {function}
 */
export const makeFontSizeMapper = scale => pair =>
  Math.log2(pair.value) * scale;

export const rotate = pair => pair.value % 360;
