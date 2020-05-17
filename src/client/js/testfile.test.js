const sum = require('./testfile');

test('input defined', () => {
  expect(sum('us')).toBe('us');
});