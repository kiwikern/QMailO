import { configure } from './configure';

describe('deployment', () => {
  it('should work', () => {
    expect(configure()).toEqual('deployment');
  });
});
