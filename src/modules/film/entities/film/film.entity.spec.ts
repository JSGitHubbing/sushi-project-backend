import { Film } from './film.entity';

describe('Film', () => {
  it('should be defined', () => {
    expect(new Film()).toBeDefined();
  });
});
