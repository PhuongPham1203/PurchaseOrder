import { CurrencyLocalPipe } from './currency-local.pipe';

describe('CurrencyLocalPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyLocalPipe();
    expect(pipe).toBeTruthy();
  });
});
