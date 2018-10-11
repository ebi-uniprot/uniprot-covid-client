// @flow
const getRandomId = (): string => Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '');

export default getRandomId;
