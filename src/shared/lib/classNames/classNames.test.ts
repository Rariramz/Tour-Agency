import { classNames } from './classNames';

describe('classNames', () => {
  describe.each([
    ['main', {}, [], 'main'],
    ['main', { dark: true }, [], 'main dark'],
    ['main', { dark: true, active: true }, [], 'main dark active'],
    ['main', { dark: true }, ['red'], 'main red dark'],
    ['main', { dark: true, active: true }, ['red'], 'main red dark active'],
    [
      'main',
      { dark: true, active: true },
      ['red', 'white'],
      'main red white dark active'
    ]
  ])('all params passed', (cls, mods, additional, expected) => {
    test(`(${JSON.stringify(cls)}, ${JSON.stringify(mods)}, ${JSON.stringify(
      additional
    )})`, () => {
      expect(classNames(cls, mods, additional)).toBe(expected);
    });
  });

  describe('only cls passed', () => {
    test(`("main")`, () => {
      expect(classNames('main')).toBe('main');
    });
  });
});
